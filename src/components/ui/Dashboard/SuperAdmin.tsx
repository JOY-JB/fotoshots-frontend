import SummaryCard from "@/components/SummaryCard";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { useGetClientsQuery } from "@/redux/api/clientApi";
import { useGetPhotographersQuery } from "@/redux/api/photographerApi";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import ClientsTable from "../ClientsTable";
import PhotographersTable from "../PhotographersTable";

const SuperAdminDashboard = () => {
  const { data: allServices, isLoading: serviceLoading } =
    useGetAllServicesQuery({});
  const { data: allBookings, isLoading: bookingLoading } =
    useGetAllBookingsQuery({});
  const { data: allPhotographers, isLoading: photographerLoading } =
    useGetPhotographersQuery({});
  const { data: allClients, isLoading: clientLoading } = useGetClientsQuery({});

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
            title="Total Service"
            value={allServices?.meta?.total || 0}
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
            value={allBookings?.meta?.total || 0}
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
            title="Total Photographer"
            value={allPhotographers?.meta?.total || 0}
            description="Total number of photographers."
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
            title="Total Client"
            value={allClients?.meta?.total || 0}
            description="Total number of client."
            color="#3f8600"
            icon={<UserOutlined />}
          />
        </Col>
      </Row>

      <Row
        gutter={{ xs: 8, sm: 16 }}
        align={"middle"}
        justify={"center"}
        style={{ marginTop: "20px" }}
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <PhotographersTable />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <ClientsTable />
        </Col>
      </Row>
    </>
  );
};

export default SuperAdminDashboard;
