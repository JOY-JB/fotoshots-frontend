"use client";

import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from "@/redux/api/bookingApi";
import { BookingStatus, IBooking } from "@/types";
import { DeleteFilled, EditFilled, ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Select, Space, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const BookingsTable = ({ role }: { role: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState("");
  const [deleteBooking] = useDeleteBookingMutation();

  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<any>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

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

  const { data, isLoading } = useGetAllBookingsQuery(query);
  const bookings = data?.bookings;
  const meta = data?.meta;

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

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setBookingIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting service...");
    try {
      const res = await deleteBooking(bookingIdToDelete).unwrap();

      res && message.success("Service deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const bookingListColumns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: true,
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY ");
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (data: string) => {
        return dayjs(data).format("hh:mm A");
      },
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (data: string) => {
        return dayjs(data).format("hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "User Name",
      render: (data: IBooking) => {
        return data?.user?.name;
      },
    },
    {
      title: "Service Title",
      render: (data: IBooking) => {
        return data?.service?.title;
      },
    },
    {
      title: "Action",
      render: (data: any) => (
        <div>
          <Link href={`/${role}/bookings/edit/${data.id}`}>
            <Button type="primary" style={{ margin: "0px 7px" }}>
              <EditFilled />
            </Button>
          </Link>
          {role === "admin" && (
            <Button
              type="primary"
              danger
              onClick={() => handleOnDelete(data.id)}
            >
              <DeleteFilled />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const statusOption = [
    { value: BookingStatus.PENDING, label: "Pending" },
    { value: BookingStatus.ACCEPTED, label: "Accepted" },
    { value: BookingStatus.REJECTED, label: "Rejected" },
    { value: BookingStatus.ADJUSTED, label: "Adjusted" },
    { value: BookingStatus.COMPLETED, label: "Completed" },
    { value: BookingStatus.CANCELED, label: "Canceled" },
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
            options={statusOption}
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
        dataSource={bookings}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={meta?.total}
        showPagination={true}
      />

      <MyModal
        title="Confirm Delete"
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      >
        <p>Are you sure you want to delete this Booking?</p>
      </MyModal>
    </>
  );
};

export default BookingsTable;
