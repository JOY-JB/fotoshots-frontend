import { Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import aboutUs from "../../../../public/images/about-us.png";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <Layout>
      <Content style={{ padding: "50px", margin: "7rem 0px" }}>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col
            xs={24}
            sm={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={aboutUs} alt="About Us" width={500} />
          </Col>
          <Col xs={24} sm={12}>
            <div>
              <Title level={2}>About Us</Title>
              <Paragraph>
                We are a passionate team of photographers dedicated to capturing
                your special moments. With years of experience and an eye for
                detail, we ensure that every shot is a masterpiece.
              </Paragraph>
              <Paragraph>
                Our mission is to provide you with the best photography
                experience, from the initial consultation to the final delivery.
                We believe that great photography is not just about taking
                pictures; it&apos;s about capturing emotions, memories, and the
                essence of the moment.
              </Paragraph>
              <Paragraph>
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
