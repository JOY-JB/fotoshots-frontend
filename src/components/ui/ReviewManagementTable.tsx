"use client";

import {
  useDeleteReviewMutation,
  useGetReviewByUserQuery,
} from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.service";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const ReviewManagementTable = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState("");

  const { userId } = getUserInfo() as any;

  const { data, isLoading } = useGetReviewByUserQuery(userId);
  const [deleteReview] = useDeleteReviewMutation();

  const handleOnDelete = (id: string) => {
    setIsModalOpen(true);
    setReviewIdToDelete(id);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleting review...");
    try {
      await deleteReview(reviewIdToDelete);
      message.success("Review deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const reviewListColumns = [
    {
      title: "Service Title",
      render: (data: any) => data.service.title,
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Action",
      render: (data: any) => (
        <div>
          <Button type="primary" danger onClick={() => handleOnDelete(data.id)}>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <MyTable
        loading={isLoading}
        columns={reviewListColumns}
        dataSource={data}
        totalData={data?.length}
        showPagination={true}
      />

      <MyModal
        title="Confirm Delete"
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      >
        <p>Are you sure you want to delete this review?</p>
      </MyModal>
    </>
  );
};

export default ReviewManagementTable;
