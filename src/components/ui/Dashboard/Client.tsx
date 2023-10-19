"use client";

import SummaryCard from "@/components/SummaryCard";
import { useGetBookingsByUserQuery } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { IBooking } from "@/types";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import ActionBar from "../ActionBar";
import MyTable from "../MyTable";

const ClientDashboard = () => {
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const { userId } = getUserInfo() as any;

  const { data: bookings } = useGetBookingsByUserQuery({
    userId,
    arg: {},
  });

  const query: Record<string, any> = {
    limit: pageLimit,
    page,
    sortBy,
    sortOrder,
  };

  const { data: bookingsData, isLoading: bookingsDataLoading } =
    useGetBookingsByUserQuery({
      userId,
      arg: query,
    });

  const acceptedBookings =
    bookings?.bookings?.filter(
      (booking: IBooking) => booking.status === "ACCEPTED"
    ) || [];
  const completedBookings =
    bookings?.bookings?.filter(
      (booking: IBooking) => booking.status === "COMPLETED"
    ) || [];

  const bookingListColumns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (data: string) => dayjs(data).format("MMM DD, YYYY "),
      sorter: true,
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
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageLimit(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, short: any) => {
    const { order, field } = short;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16 }} align={"middle"} justify={"center"}>
        <Col
          className="gutter-row"
          sm={24}
          md={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Bookings"
            value={bookings?.meta.total || 0}
            description="Total number of bookings."
            color="#3f8600"
            icon={<FieldTimeOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Accepted Bookings"
            value={acceptedBookings.length || 0}
            description="Total accepted bookings."
            color="#3f8600"
            icon={<CheckCircleOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Completed Bookings"
            value={completedBookings.length || 0}
            description="Total completed bookings."
            color="#3f8600"
            icon={<CheckSquareOutlined />}
          />
        </Col>
      </Row>
      <Divider />

      <ActionBar title="All Bookings" />
      <MyTable
        loading={bookingsDataLoading}
        columns={bookingListColumns}
        dataSource={bookingsData?.bookings}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={bookingsData?.meta.total}
        showPagination={true}
      />
    </>
  );
};

export default ClientDashboard;
