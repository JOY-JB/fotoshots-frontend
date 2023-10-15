import {
  AppstoreOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  TableOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "User Management",
      key: "user-management",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/users`}>Users List</Link>,
          key: `/${role}/users`,
        },
        {
          label: <Link href={`/${role}/users/create`}>Create User</Link>,
          key: `/${role}/academic/department`,
        },
        {
          label: <Link href={`/${role}/users/edit`}>Edit User</Link>,
          key: `/${role}/academic/semester`,
        },
      ],
    },
    {
      label: "Service Management",
      key: "service-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/services`}>Services List</Link>,
          key: `/${role}/services`,
        },
        {
          label: <Link href={`/${role}/services/create`}>Create Service</Link>,
          key: `/${role}/services/create`,
        },
        {
          label: <Link href={`/${role}/services/edit`}>Edit Service</Link>,
          key: `/${role}/services/edit`,
        },
      ],
    },
    {
      label: "Booking Management",
      key: "booking-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/bookings`}>Bookings List</Link>,
          key: `/${role}/services`,
        },
        {
          label: <Link href={`/${role}/booking/edit`}>Edit Booking</Link>,
          key: `/${role}/booking/edit`,
        },
      ],
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/content`}>Content List</Link>,
          key: `/${role}/content`,
        },
        {
          label: <Link href={`/${role}/content/create`}>Create Content</Link>,
          key: `/${role}/content/create`,
        },
        {
          label: <Link href={`/${role}/content/edit`}>Edit Content</Link>,
          key: `/${role}/content/edit`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
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
  ];

  const photographerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
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
  ];

  const clientSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
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
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.PHOTOGRAPHER) return photographerSidebarItems;
  else if (role === USER_ROLE.CLIENT) return clientSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
