import {
  AppstoreOutlined,
  DashboardOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  TableOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (data: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/profile`}>Account Profile</Link>,
      key: "profile",
      icon: <ProfileOutlined />,
    },
  ];

  const role =
    data === "SUPER_ADMIN"
      ? "super-admin"
      : data === "ADMIN"
      ? "admin"
      : data === "PHOTOGRAPHER"
      ? "photographer"
      : "client";

  const adminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard`}>Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "User Management",
      key: "user-management",
      icon: <TableOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}/users/photographers`}>
              Photographers List
            </Link>
          ),
          key: `/${role}/users/photographers`,
        },
        {
          label: <Link href={`/${role}/users/clients`}>Clients List</Link>,
          key: `/${role}/users/clients`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/services`}>Service Management</Link>,
      key: "service-management",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href={`/${role}/bookings`}>Bookings Management</Link>,
      key: "booking-management",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/admin/content/blog-list`}>Blog</Link>,
          key: `/admin/content/blog-list`,
        },
        {
          label: <Link href={`/admin/content/faq-list`}>FAQ</Link>,
          key: `/admin/content/faq-list`,
        },
      ],
    },
    ...defaultSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard`}>Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link href={`/${role}/add-admin`}>Add Admin</Link>,
      icon: <UserAddOutlined />,
      key: `/${role}/add-admin`,
    },
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
    ...defaultSidebarItems,
  ];

  const photographerSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard`}>Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Manage Services",
      key: "manage-service",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Services List</Link>,
          key: `/${role}/services`,
        },
        {
          label: <Link href={`/${role}/service/create`}>Create Service</Link>,
          key: `/${role}/service/create`,
        },
        {
          label: <Link href={`/${role}/service/edit`}>Edit Service</Link>,
          key: `/${role}/service/edit`,
        },
      ],
    },
    ...defaultSidebarItems,
  ];

  const clientSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard`}>Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link href={`/${role}/services`}>Services</Link>,
      icon: <TableOutlined />,
      key: `/${role}/services`,
    },
    {
      label: <Link href={`/${role}/bookings`}>Service Booking</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/bookings`,
    },
    {
      label: <Link href={`/${role}/bookings/history`}>Booking History</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/bookings/history`,
    },
    ...defaultSidebarItems,
  ];

  if (data === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (data === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (data === USER_ROLE.PHOTOGRAPHER) return photographerSidebarItems;
  else if (data === USER_ROLE.CLIENT) return clientSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
