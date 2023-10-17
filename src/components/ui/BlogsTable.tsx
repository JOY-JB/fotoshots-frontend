"use client";

import React, { useState } from "react";

import {
  useDeleteBlogPostByIdMutation,
  useGetAllBlogPostsQuery,
} from "@/redux/api/content";
import { DeleteFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const BlogsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllBlogPostsQuery(undefined);
  const [deleteBlog] = useDeleteBlogPostByIdMutation();

  const blogs = data?.blogs;
  const meta = data?.meta;

  const handleOnDelete = async (id: string) => {
    setIsModalOpen(true);
    setBlogIdToDelete(id);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
    message.loading("Deleting blog...");
    try {
      await deleteBlog(blogIdToDelete);
      message.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const blogListColumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Date",
      dataIndex: "date",
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
      <ActionBar title="Blogs List"></ActionBar>
      <MyTable
        loading={isLoading}
        columns={blogListColumns}
        dataSource={blogs}
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
        <p>Are you sure you want to delete this Blog?</p>
      </MyModal>
    </>
  );
};

export default BlogsTable;
