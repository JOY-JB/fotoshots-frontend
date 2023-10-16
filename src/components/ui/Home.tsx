"use client";

import { Layout, Menu, MenuProps } from "antd";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import AboutUsSection from "./MainHome/AboutUs";
import BlogSection from "./MainHome/Blog";
import FaqSection from "./MainHome/FAQ";
import AppFooter from "./MainHome/Footer";
import HeroSection from "./MainHome/HeroSection";
import PhotographersSection from "./MainHome/Photographers";
import ReviewAndRating from "./MainHome/ReviewAndRating";
import ServicesSection from "./MainHome/services";

const { Header, Content } = Layout;

const HomePage = () => {
  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Dashboard",
      key: "dashboard",
    },
    {
      label: "Services",
      key: "services",
    },
    {
      label: "Photographers",
      key: "photographers",
    },
    {
      label: "Login",
      key: "login",
    },
  ];

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba( 19, 65, 254, 0.1 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          marginBottom: "2rem",
        }}
      >
        <Image src={logo} width={150} alt="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={items}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <PhotographersSection />
        <ReviewAndRating />
        <BlogSection />
        <FaqSection />
      </Content>
      {/* <Footer style={{ textAlign: "center" }}>
        Photographer Booking site ©2023 Created by Joy Barua
      </Footer> */}
      <AppFooter />
    </Layout>
  );
};

export default HomePage;
