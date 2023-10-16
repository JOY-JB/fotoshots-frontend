"use client";
import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import Header from "./Header";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Header />
      <div
        style={{
          padding: "1rem",
        }}
      >
        {children}
      </div>
      <Footer style={{ textAlign: "center" }}>
        Photography booking system ©2023 Created by Joy Barua
      </Footer>
    </Content>
  );
};

export default Contents;
