"use client";

import React, { useState } from "react";

import {
  useDeleteBlogPostByIdMutation,
  useGetAllBlogPostsQuery,
} from "@/redux/api/contentApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const BlogsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllBlogPostsQuery(undefined);
  const [deleteBlog] = useDeleteBlogPostByIdMutation();

  const { Title } = Typography;

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
      width: "18%",
    },
    {
      title: "Content",
      dataIndex: "content",
      width: "50%",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY hh:mm A");
      },
      width: "8%",
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: (data: string) => {
        return dayjs(data).format("MMM DD, YYYY hh:mm A");
      },
      width: "8%",
    },
    {
      title: "Action",
      render: (data: any) => (
        <>
          <Link href={`/admin/content/edit-blog/${data.id}`}>
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
        <Title level={2}>Blogs List</Title>
        <Link href={"/admin/content/create-blog"}>
          <Button type="primary">Create Blog</Button>
        </Link>
      </div>
      <MyTable
        loading={isLoading}
        columns={blogListColumns}
        dataSource={data}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        pageSize={pageLimit}
        showSizeChanger={true}
        totalData={data?.length}
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
