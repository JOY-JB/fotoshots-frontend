import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

type ActionBarProps = {
  title?: string;
  children?: React.ReactNode | React.ReactElement;
};

const ActionBar = ({ title, children }: ActionBarProps) => {
  return (
    <div>
      <Title level={3}>{title}</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "12px 0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
