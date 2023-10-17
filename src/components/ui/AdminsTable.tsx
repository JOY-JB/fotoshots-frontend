import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "@/redux/api/adminApi";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const AdminsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [adminIdToDelete, setAdminIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const query: Record<string, any> = {};
  query["limit"] = pageLimit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useGetAdminsQuery(query);
  const [deleteAdmin] = useDeleteAdminMutation();

  const admins = data?.admins;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setAdminIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting admin...");
    try {
      await deleteAdmin(adminIdToDelete);
      message.success("Admin deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const adminListColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      render: (data: any) => (
        <>
          <Button type="primary" danger onClick={() => handleOnDelete(data.id)}>
            <DeleteFilled />
          </Button>
        </>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageLimit(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, short: any) => {
    const { order, field } = short;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <>
      <MyTable
        loading={isLoading}
        columns={adminListColumns}
        dataSource={admins}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={meta?.total}
        showPagination={true}
      />

      <MyModal
        title="Confirm Delete"
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      >
        <p>Are you sure you want to delete this Admin?</p>
      </MyModal>
    </>
  );
};

export default AdminsTable;
