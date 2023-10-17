"use client";
import { useState } from "react";

import {
  useDeleteFAQByIdMutation,
  useGetAllFAQsQuery,
} from "@/redux/api/content";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const FAQTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqIdToDelete, setFAQIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllFAQsQuery(undefined);
  const [deleteFAQ] = useDeleteFAQByIdMutation();

  const faqs = data?.faqs;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setFAQIdToDelete(id);
  };

  const handleOk = async () => {
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
      dataIndex: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
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
  };

  return (
    <>
      <ActionBar title="FAQ List"></ActionBar>
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

export default FAQTable;
