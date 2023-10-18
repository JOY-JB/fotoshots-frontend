"use client";

import { Layout } from "antd";

import AboutUsSection from "./MainHome/AboutUs";
import BlogSection from "./MainHome/Blog";
import FaqSection from "./MainHome/FAQ";
import AppFooter from "./MainHome/Footer";
import HeroSection from "./MainHome/HeroSection";
import MainHeader from "./MainHome/MainHeader";
import PhotographersSection from "./MainHome/Photographers";
import ReviewAndRating from "./MainHome/ReviewAndRating";
import ServicesSection from "./MainHome/services";

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <MainHeader />
      <Content>
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <PhotographersSection />
        <ReviewAndRating />
        <BlogSection />
        <FaqSection />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default HomePage;
