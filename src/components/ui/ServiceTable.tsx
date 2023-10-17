"use client";

import { useDebounce } from "@/hooks";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/serviceApi";
import {
  DeleteFilled,
  EditFilled,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import ActionBar from "./ActionBar";
import MyModal from "./MyModal";
import MyTable from "./MyTable";

const ServicesTable = ({ role }: { role: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState("");
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const query: Record<string, any> = {};
  query["limit"] = pageLimit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  minPrice !== 0 ? (query["minPrice"] = minPrice) : undefined;

  maxPrice !== 0 ? (query["maxPrice"] = maxPrice) : undefined;

  const { data, isLoading } = useGetAllServicesQuery(query);
  const [deleteService] = useDeleteServiceMutation();

  const services = data?.services;
  const meta = data?.meta;

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

  const serviceListColumns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (data: any) => (
        <div>
          <Link href={`/${role}/services/edit/${data.id}`}>
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
    setSearchTerm("");
    setSortBy("");
    setSortOrder("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <>
      <ActionBar title="Service List">
        <Input
          type="text"
          value={searchTerm}
          placeholder="Search.."
          style={{
            width: "20%",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchOutlined />}
        />
        <div style={{ display: "flex" }}>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(
                Number(e.target.value) ? Number(e.target.value) : undefined
              )
            }
          />
          <Divider type="vertical" />
          <Input
            type="number"
            value={maxPrice}
            placeholder="Max Price"
            onChange={(e) =>
              setMaxPrice(
                Number(e.target.value) ? Number(e.target.value) : undefined
              )
            }
          />
          <Divider type="vertical" />
          {(!!sortBy ||
            !!sortOrder ||
            !!searchTerm ||
            minPrice ||
            maxPrice) && (
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
        columns={serviceListColumns}
        dataSource={services}
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

export default ServicesTable;
