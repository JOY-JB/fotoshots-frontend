import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const { Header: AntDHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const logout = () => {
    removeUserInfo();
    router.push("/login");
  };

  const { role } = getUserInfo() as any;

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button type="text" danger onClick={logout}>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntDHeader
      style={{
        background: "#fff",
      }}
    >
      <Row style={{ height: "100%" }} align={"middle"} justify={"end"}>
        <Title level={5} style={{ margin: "auto 8px" }}>
          {role === "SUPER_ADMIN"
            ? "Super Admin"
            : role === "ADMIN"
            ? "Admin"
            : role === "PHOTOGRAPHER"
            ? "Photographer"
            : "User"}
        </Title>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </Row>
    </AntDHeader>
  );
};

export default Header;
