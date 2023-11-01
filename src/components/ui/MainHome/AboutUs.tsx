import { Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import aboutUs from "../../../../public/images/about-us.png";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10rem 0",
      }}
    >
      <Content
        style={{
          maxWidth: "1400px",
        }}
      >
        <Row gutter={[24, 24]} justify="center" align="middle">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
            }}
          >
            <Image
              src={aboutUs}
              alt="About Us"
              width={500}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ padding: "0 10px" }}>
              <Title level={1}>About Us</Title>
              <Paragraph style={{ fontSize: "1rem" }}>
                We are a passionate team of photographers dedicated to capturing
                your special moments. With years of experience and an eye for
                detail, we ensure that every shot is a masterpiece.
              </Paragraph>
              <Paragraph style={{ fontSize: "1rem" }}>
                Our mission is to provide you with the best photography
                experience, from the initial consultation to the final delivery.
                We believe that great photography is not just about taking
                pictures; it&apos;s about capturing emotions, memories, and the
                essence of the moment.
              </Paragraph>
              <Paragraph style={{ fontSize: "1rem" }}>
                Whether it&apos;s a wedding, a family portrait, or a corporate
                event, we&apos;re here to turn your vision into reality. Let us
                tell your story through our lens.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutUsSection;
