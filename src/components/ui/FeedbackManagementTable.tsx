"use client";

import {
  useDeleteFeedbackMutation,
  useGetFeedbackByUserQuery,
} from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const FeedbackManagementTable = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [feedbackIdToDelete, setFeedbackIdToDelete] = useState("");

  const { userId } = getUserInfo() as any;

  const { data, isLoading } = useGetFeedbackByUserQuery(userId);
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const handleOnDelete = (id: string) => {
    setIsModalOpen(true);
    setFeedbackIdToDelete(id);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    message.loading("Deleting feedback...");
    try {
      await deleteFeedback(feedbackIdToDelete);
      message.success("Feedback deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feedbackListColumns = [
    {
      title: "Service Title",
      render: (data: any) => data?.service?.title,
    },
    {
      title: "Feedback Message",
      dataIndex: "message",
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
        columns={feedbackListColumns}
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
        <p>Are you sure you want to delete this feedback?</p>
      </MyModal>
    </>
  );
};

export default FeedbackManagementTable;
