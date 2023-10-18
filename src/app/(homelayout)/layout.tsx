"use client";

import AppFooter from "@/components/ui/MainHome/Footer";
import MainHeader from "@/components/ui/MainHome/MainHeader";
import { Layout } from "antd";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <MainHeader />
      <div style={{ display: "flex", flexGrow: 1 }}>{children}</div>
      <AppFooter />
    </Layout>
  );
};

export default HomeLayout;
