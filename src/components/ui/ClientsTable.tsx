"use client";
import { useDebounce } from "@/hooks";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from "@/redux/api/clientApi";
import { DeleteFilled, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const ClientsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clientIdToDelete, setClientIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const query: Record<string, any> = {};
  query["limit"] = pageLimit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({ searchQuery: email, delay: 600 });

  if (!!debouncedTerm) {
    query["email"] = debouncedTerm;
  }

  const { data, isLoading } = useGetClientsQuery(query);
  const [deleteClient] = useDeleteClientMutation();

  const clients = data?.clients;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setClientIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting client...");
    try {
      await deleteClient(clientIdToDelete);
      message.success("Client deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const clientListColumns = [
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

  const handleReset = () => {
    setEmail("");
    setSortBy("");
    setSortOrder("");
  };

  return (
    <>
      <ActionBar title="Client List">
        <Input
          type="text"
          value={email}
          placeholder="Search by email"
          style={{
            width: "20%",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!email) && (
            <Button
              type="dashed"
              style={{ marginRight: "5px" }}
              onClick={handleReset}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <MyTable
        loading={isLoading}
        columns={clientListColumns}
        dataSource={clients}
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
        <p>Are you sure you want to delete this Client?</p>
      </MyModal>
    </>
  );
};

export default ClientsTable;
