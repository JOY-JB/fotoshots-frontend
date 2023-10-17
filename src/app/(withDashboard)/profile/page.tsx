"use client";

import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import AdminProfile from "@/components/ui/Profile/Admin";
import ClientProfile from "@/components/ui/Profile/Client";
import PhotographerProfile from "@/components/ui/Profile/Photographer";
import SuperAdminProfile from "@/components/ui/Profile/SuperAdmin";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { role } = getUserInfo() as any;

  return (
    <div>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Profile",
            link: `/profile`,
          },
        ]}
      />

      {role === "SUPER_ADMIN" ? (
        <SuperAdminProfile />
      ) : role === "ADMIN" ? (
        <AdminProfile />
      ) : role === "PHOTOGRAPHER" ? (
        <PhotographerProfile />
      ) : (
        <ClientProfile />
      )}
    </div>
  );
};

export default ProfilePage;
