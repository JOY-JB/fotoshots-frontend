import { Card, Col, Row, Statistic, Typography } from "antd";
import React from "react";

const { Title } = Typography;

interface SummaryCardProps {
  title: string;
  value: number;
  description?: string;
  color: string;
  icon: React.ReactNode;
}

const SummaryCard = ({
  title,
  value,
  description,
  color,
  icon,
}: SummaryCardProps) => {
  return (
    <Card>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title={title}
            value={value}
            valueStyle={{ color }}
            prefix={icon}
          />
        </Col>
        <Col
          span={16}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={5}>{description}</Title>
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryCard;
