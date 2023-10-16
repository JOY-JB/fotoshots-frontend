"use client";

import { Carousel, Layout, Typography } from "antd";
import { CSSProperties } from "react";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const contentStyle: CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url('/images/banner.jpeg')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
  color: "#fff",
};

const overlayStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const HeroSection = () => {
  return (
    <Layout>
      <Content style={{ padding: 0 }}>
        <Carousel autoplay>
          <div>
            <div style={contentStyle}>
              <div style={overlayStyle}>
                <Title level={1} style={{ color: "#fff" }}>
                  Welcome to Our Photographer Booking Platform
                </Title>
                <Text style={{ color: "#fff" }}>
                  Discover and book a wide range of services with ease.
                </Text>
              </div>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <div style={overlayStyle}>
                <Title level={1} style={{ color: "#fff" }}>
                  Explore Our Services
                </Title>
                <Text style={{ color: "#fff" }}>
                  Choose from a variety of services tailored to your needs.
                </Text>
              </div>
            </div>
          </div>
          {/* Add more carousel items as needed */}
        </Carousel>
      </Content>
    </Layout>
  );
};

export default HeroSection;
