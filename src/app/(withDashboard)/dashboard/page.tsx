"use client";

import AdminDashboard from "@/components/ui/Dashboard/Admin";
import ClientDashboard from "@/components/ui/Dashboard/Client";
import PhotographerDashboard from "@/components/ui/Dashboard/Photographer";
import SuperAdminDashboard from "@/components/ui/Dashboard/SuperAdmin";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const DashboardPage = () => {
  const { role } = getUserInfo() as any;

  return (
    <div>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
        ]}
      />

      {role === "SUPER_ADMIN" ? (
        <SuperAdminDashboard />
      ) : role === "ADMIN" ? (
        <AdminDashboard />
      ) : role === "PHOTOGRAPHER" ? (
        <PhotographerDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
};

export default DashboardPage;
