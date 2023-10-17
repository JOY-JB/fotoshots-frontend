"use client";

import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import AdminEditPage from "@/components/ui/Profile/Edit/AdminEdit";
import ClientEditPage from "@/components/ui/Profile/Edit/ClientEdit";
import PhotographerEditPage from "@/components/ui/Profile/Edit/PhotographerEdit";
import SuperAdminEditPage from "@/components/ui/Profile/Edit/SuperAdminEdit";
import { getUserInfo } from "@/services/auth.service";

interface IProps {
  params: {
    id: string;
  };
}

const ProfilePage = ({ params }: IProps) => {
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
          {
            label: "Profile edit",
          },
        ]}
      />

      {role === "SUPER_ADMIN" ? (
        <SuperAdminEditPage params={params} />
      ) : role === "ADMIN" ? (
        <AdminEditPage params={params} />
      ) : role === "PHOTOGRAPHER" ? (
        <PhotographerEditPage params={params} />
      ) : (
        <ClientEditPage params={params} />
      )}
    </div>
  );
};

export default ProfilePage;
