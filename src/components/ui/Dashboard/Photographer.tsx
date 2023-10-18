"use client";

import SummaryCard from "@/components/SummaryCard";
import { useGetBookingsByPhotographerQuery } from "@/redux/api/bookingApi";
import { useGetServicesByUserQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { IBooking } from "@/types";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import PhotographerBookingsTable from "../PhotographerBookingsTable";

const PhotographerDashboard = () => {
  const { userId } = getUserInfo() as any;

  const { data: bookings, isLoading: bookingLoading } =
    useGetBookingsByPhotographerQuery({
      userId,
      arg: {},
    });
  const { data: services, isLoading: serviceLoading } =
    useGetServicesByUserQuery({ userId, arg: {} });

  const acceptedBookings =
    bookings?.bookings?.filter(
      (booking: IBooking) => booking.status === "ACCEPTED"
    ) || [];
  const completedBookings =
    bookings?.bookings?.filter(
      (booking: IBooking) => booking.status === "COMPLETED"
    ) || [];

  console.log(bookings);

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16 }} align={"middle"} justify={"center"}>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Services"
            value={services?.meta.total || 0}
            description="Total number of services offered."
            color="#3f8600"
            icon={<FieldTimeOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Bookings"
            value={bookings?.meta.total || 0}
            description="Total number of bookings received."
            color="#3f8600"
            icon={<FieldTimeOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Accepted Bookings"
            value={acceptedBookings.length || 0}
            description="Total number of status accepted bookings."
            color="#3f8600"
            icon={<CheckCircleOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Completed Bookings"
            value={completedBookings.length || 0}
            description="Total number of status completed bookings."
            color="#3f8600"
            icon={<CheckSquareOutlined />}
          />
        </Col>
      </Row>
      <Divider />
      <PhotographerBookingsTable />
    </>
  );
};

export default PhotographerDashboard;
