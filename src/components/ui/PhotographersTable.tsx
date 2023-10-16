import {
  useDeletePhotographerMutation,
  useGetPhotographersQuery,
} from "@/redux/api/photographerApi";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const PhotographersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photographerIdToDelete, setPhotographerIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const query: Record<string, any> = {};
  query["limit"] = pageLimit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useGetPhotographersQuery(query);
  const [deletePhotographer] = useDeletePhotographerMutation();

  const photographers = data?.photographers;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);

    setPhotographerIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting photographer...");
    try {
      await deletePhotographer(photographerIdToDelete);
      message.success("Photographer deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const photographerListColumns = [
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
        columns={photographerListColumns}
        dataSource={photographers}
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
        <p>Are you sure want to delete this Photographer?</p>
      </MyModal>
    </>
  );
};

export default PhotographersTable;
