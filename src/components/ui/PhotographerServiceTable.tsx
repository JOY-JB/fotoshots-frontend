"use client";

import React, { useState } from "react";

import {
  useDeleteServiceMutation,
  useGetServicesByUserQuery,
} from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const PhotographerServiceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const { userId } = getUserInfo() as any;

  const query: Record<string, any> = {};
  query["limit"] = pageLimit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data: photographerServicesData, isLoading } =
    useGetServicesByUserQuery({ userId, arg: query });
  const [deleteService] = useDeleteServiceMutation();

  const photographerServices = photographerServicesData?.services;
  const meta = photographerServicesData?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setServiceIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting service...");
    try {
      await deleteService(serviceIdToDelete);
      message.success("Service deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const photographerServiceListColumns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "18%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "60%",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Action",
      render: (data: any) => (
        <div>
          <Link href={`/photographer/service/edit/${data.id}`}>
            <Button type="primary" style={{ margin: "0px 7px" }}>
              <EditFilled />
            </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleOnDelete(data.id)}>
            <DeleteFilled />
          </Button>
        </div>
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
    setSortBy("");
    setSortOrder("");
  };

  return (
    <>
      <ActionBar title="Photographer Service List" />
      <MyTable
        loading={isLoading}
        columns={photographerServiceListColumns}
        dataSource={photographerServices}
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
        <p>Are you sure you want to delete this Service?</p>
      </MyModal>
    </>
  );
};

export default PhotographerServiceTable;
