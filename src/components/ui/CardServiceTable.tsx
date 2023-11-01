"use client";

import { useDebounce } from "@/hooks";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Input, Row, Typography } from "antd";
import { useState } from "react";
import ActionBar from "./ActionBar";

const CardServiceTable = () => {
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const { Text } = Typography;

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

  const { data } = useGetAllServicesQuery(query);

  const services = data?.services || [];

  const handleReset = () => {
    setSearchTerm("");
    setSortBy("");
    setSortOrder("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <div>
      <Divider />
      <ActionBar>
        <div style={{ width: "100%" }}>
          <Row
            gutter={[16, 16]}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Input
                type="text"
                value={searchTerm}
                placeholder="Search.."
                style={{
                  width: "100%",
                  maxWidth: "350px",
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                suffix={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                  }}
                  onChange={(e) =>
                    setMinPrice(
                      Number(e.target.value)
                        ? Number(e.target.value)
                        : undefined
                    )
                  }
                />
                <Divider type="vertical" />
                <Input
                  type="number"
                  value={maxPrice}
                  placeholder="Max Price"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                  }}
                  onChange={(e) =>
                    setMaxPrice(
                      Number(e.target.value)
                        ? Number(e.target.value)
                        : undefined
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
            </Col>
          </Row>
        </div>
      </ActionBar>
      <Divider />
      <Row gutter={[16, 16]}>
        {services.map((service: any) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={service.id}>
            <Card title={service.title} bordered={false}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text>{service.description}</Text>
                <Text strong>Price: {service.price}</Text>
                <Text italic style={{ textAlign: "end" }}>
                  - {" " + service?.user?.name}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardServiceTable;
