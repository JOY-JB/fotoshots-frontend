"use client";

import ActionBar from "@/components/ui/ActionBar";
import AdminsTable from "@/components/ui/AdminsTable";

const ManageAdminPage = () => {
  return (
    <>
      <ActionBar title="Add Admin" />
      <AdminsTable />
    </>
  );
};

export default ManageAdminPage;
