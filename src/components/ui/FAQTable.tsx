"use client";

import {
  useDeleteFAQByIdMutation,
  useGetAllFAQsQuery,
} from "@/redux/api/contentApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const FAQsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [faqIdToDelete, setFAQIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllFAQsQuery(undefined);
  const [deleteFAQ] = useDeleteFAQByIdMutation();

  const { Title } = Typography;

  const faqs = data?.faqs;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setFAQIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting FAQ...");
    try {
      await deleteFAQ(faqIdToDelete);
      message.success("FAQ deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const faqListColumns = [
    {
      title: "Question",
      dataIndex: "title",
    },
    {
      title: "Answer",
      dataIndex: "content",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY hh:mm A");
      },
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      render: (data: any) => (
        <>
          <Link href={`/admin/content/edit-faq/${data.id}`}>
            <Button type="primary" style={{ margin: "0px 7px" }}>
              <EditFilled />
            </Button>
          </Link>
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
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={2}>FAQs List</Title>
        <Link href={"/admin/content/create-faq"}>
          <Button type="primary">Create FAQ</Button>
        </Link>
      </div>
      <MyTable
        loading={isLoading}
        columns={faqListColumns}
        dataSource={faqs}
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
        <p>Are you sure you want to delete this FAQ?</p>
      </MyModal>
    </>
  );
};

export default FAQsTable;
