import SummaryCard from "@/components/SummaryCard";
import { useGetAdminsQuery } from "@/redux/api/adminApi";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { useGetClientsQuery } from "@/redux/api/clientApi";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import ActionBar from "../ActionBar";

const AdminDashboard = () => {
  const { data: allServices, isLoading: serviceLoading } =
    useGetAllServicesQuery({});
  const { data: allBookings, isLoading: bookingLoading } =
    useGetAllBookingsQuery({});
  const { data: allClients, isLoading: clientLoading } = useGetClientsQuery({});
  const { data: allAdmins, isLoading: adminLoading } = useGetAdminsQuery({});

  const pendingBookings =
    allBookings?.bookings?.filter((booking) => booking.status === "PENDING") ||
    [];
  const acceptedBookings =
    allBookings?.bookings?.filter((booking) => booking.status === "ACCEPTED") ||
    [];
  const rejectedBookings =
    allBookings?.bookings?.filter((booking) => booking.status === "REJECTED") ||
    [];
  const canceledBookings =
    allBookings?.bookings?.filter((booking) => booking.status === "CANCELED") ||
    [];
  const adjustedBookings =
    allBookings?.bookings?.filter((booking) => booking.status === "ADJUSTED") ||
    [];
  const completedBookings =
    allBookings?.bookings?.filter(
      (booking) => booking.status === "COMPLETED"
    ) || [];

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
            value={allServices?.meta.total || 0}
            description="Total number of services."
            color="#3f8600"
            icon={<UserOutlined />}
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
            value={allBookings?.meta.total || 0}
            description="Total number of bookings."
            color="#3f8600"
            icon={<UserOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Clients"
            value={allClients?.meta.total || 0}
            description="Total number of clients."
            color="#3f8600"
            icon={<UserOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Admins"
            value={allAdmins?.meta.total || 0}
            description="Total number of admins."
            color="#3f8600"
            icon={<UserOutlined />}
          />
        </Col>
      </Row>
      <Divider />
      <ActionBar title="Booking Analytics" />
      <Row gutter={{ xs: 8, sm: 16 }} align={"middle"} justify={"center"}>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Pending"
            value={pendingBookings.length || 0}
            color="#3f8600"
            icon={<FieldTimeOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Accepted"
            value={acceptedBookings.length || 0}
            color="#3f8600"
            icon={<CheckCircleOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Rejected"
            value={rejectedBookings.length || 0}
            color="#3f8600"
            icon={<CloseCircleOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Canceled"
            value={canceledBookings.length || 0}
            color="#3f8600"
            icon={<StopOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Adjusted"
            value={adjustedBookings.length || 0}
            color="#3f8600"
            icon={<ClockCircleOutlined />}
          />
        </Col>
        <Col
          className="gutter-row"
          sm={24}
          md={12}
          lg={8}
          style={{ marginBottom: "10px" }}
        >
          <SummaryCard
            title="Total Completed"
            value={completedBookings.length || 0}
            color="#3f8600"
            icon={<CheckSquareOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
