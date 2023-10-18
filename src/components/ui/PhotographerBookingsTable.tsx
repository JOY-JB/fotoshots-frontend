"use client";

import {
  useAcceptBookingMutation,
  useCompleteBookingMutation,
  useGetBookingsByPhotographerQuery,
  useRejectBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { BookingStatus, IBooking } from "@/types";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Divider, Select, Space, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const PhotographerBookingsTable = () => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] =
    useState<boolean>(false);
  const [bookingIdToAccept, setBookingIdToAccept] = useState("");
  const [bookingIdToReject, setBookingIdToReject] = useState("");
  const [bookingIdToCompleted, setBookingIdToCompleted] = useState("");

  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<any>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const { userId } = getUserInfo() as any;

  const [acceptBooking] = useAcceptBookingMutation();
  const [rejectBooking] = useRejectBookingMutation();
  const [completeBooking] = useCompleteBookingMutation();

  const query: Record<string, any> = {
    limit: pageLimit,
    page,
    sortBy,
    sortOrder,
  };

  if (dateFilter) {
    query.date = dateFilter;
  }

  if (statusFilter) {
    query.status = statusFilter;
  }

  const { data, isLoading } = useGetBookingsByPhotographerQuery({
    userId,
    arg: query,
  });

  const bookingsData = data?.bookings?.filter((item) => {
    const { status } = item;
    return (
      status !== "CANCELED" && status !== "COMPLETED" && status !== "REJECTED"
    );
  });

  const handleReset = () => {
    setSortBy("");
    setSortOrder("");
    setDateFilter(undefined);
    setStatusFilter(undefined);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageLimit(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, short: any) => {
    const { order, field } = short;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const handleAcceptBooking = (bookingId: string) => {
    setIsAcceptModalOpen(true);
    setBookingIdToAccept(bookingId);
  };

  const handleRejectBooking = (bookingId: string) => {
    setIsRejectModalOpen(true);
    setBookingIdToReject(bookingId);
  };

  const handleCompletedBooking = (bookingId: string) => {
    setIsCompletedModalOpen(true);
    setBookingIdToCompleted(bookingId);
  };

  const handleAcceptOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsAcceptModalOpen(false);
    try {
      const res = await acceptBooking(bookingIdToAccept).unwrap();
      res && message.success("Booking accepted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsRejectModalOpen(false);
    try {
      const res = await rejectBooking(bookingIdToReject).unwrap();
      res && message.success("Booking rejected successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsCompletedModalOpen(false);
    try {
      const res = await completeBooking(bookingIdToCompleted).unwrap();
      res && message.success("Booking completed successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsAcceptModalOpen(false);
    setIsCompletedModalOpen(false);
    setIsRejectModalOpen(false);
  };

  const bookingListColumns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (data: string) => dayjs(data).format("MMM DD, YYYY "),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (data: string) => dayjs(data).format("hh:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (data: string) => dayjs(data).format("hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "User Name",
      render: (data: IBooking) => data?.user?.name,
    },
    {
      title: "Service Title",
      render: (data: IBooking) => data?.service?.title,
    },
    {
      title: "Action",
      render: (data: IBooking) => (
        <div>
          <div>
            {data.status === "ACCEPTED" ? (
              <Button
                type="primary"
                onClick={() => handleCompletedBooking(data.id)}
              >
                <CheckSquareOutlined />
                Completed
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={() => handleAcceptBooking(data.id)}
                  style={{ marginRight: "7px" }}
                >
                  <CheckCircleOutlined />
                  Accept
                </Button>
                <Button
                  type="dashed"
                  danger
                  onClick={() => handleRejectBooking(data.id)}
                >
                  <CloseCircleOutlined />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  const statusOptions = [
    { value: BookingStatus.PENDING, label: "PENDING" },
    { value: BookingStatus.ACCEPTED, label: "ACCEPTED" },
    { value: BookingStatus.ADJUSTED, label: "ADJUSTED" },
  ];

  return (
    <>
      <ActionBar title="Bookings List">
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Space style={{ width: 120 }}>
            <DatePicker
              onChange={(date, dateString) =>
                date
                  ? setDateFilter(dayjs(date).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                  : setDateFilter(undefined)
              }
            />
          </Space>

          <Divider type="vertical" />
          <Select
            style={{ width: 120 }}
            showSearch
            allowClear
            options={statusOptions}
            onChange={(data) => setStatusFilter(data)}
            placeholder="Select status"
          />

          <Divider type="vertical" />
          {(!!sortBy || !!sortOrder || dateFilter || statusFilter) && (
            <Button
              type="dashed"
              style={{ marginRight: "5px" }}
              onClick={handleReset}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <MyTable
        loading={isLoading}
        columns={bookingListColumns}
        dataSource={bookingsData}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={bookingsData?.length}
        showPagination={true}
      />

      <MyModal
        title="Confirm Accept"
        handleOk={handleAcceptOk}
        handleCancel={handleCancel}
        isModalOpen={isAcceptModalOpen}
      >
        <p>Are you sure you want to accept this Booking?</p>
      </MyModal>
      <MyModal
        title="Confirm Reject"
        handleOk={handleRejectOk}
        handleCancel={handleCancel}
        isModalOpen={isRejectModalOpen}
      >
        <p>Are you sure you want to reject this Booking?</p>
      </MyModal>
      <MyModal
        title="Confirm Completed"
        handleOk={handleCompleteOk}
        handleCancel={handleCancel}
        isModalOpen={isCompletedModalOpen}
      >
        <p>Are you sure you want to completed this Booking?</p>
      </MyModal>
    </>
  );
};

export default PhotographerBookingsTable;
