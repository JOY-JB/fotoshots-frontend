"use client";

import { useGetAdminByIdQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Row } from "antd";
import Link from "next/link";

const AdminProfile = () => {
  const { userId } = getUserInfo() as any;
  const { data } = useGetAdminByIdQuery(userId);

  return (
    <div>
      <Descriptions
        title="Account Profile"
        bordered
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
      >
        <Row>
          <Avatar size={80} icon={<UserOutlined />} />
        </Row>
        <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{data?.role}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {data?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Address">{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Bio">{data?.bio}</Descriptions.Item>
      </Descriptions>

      <div style={{ margin: "30px", display: "flex", justifyContent: "end" }}>
        <Link href={`profile/edit/${data?.id}`}>
          <Button type="primary" size="middle">
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
