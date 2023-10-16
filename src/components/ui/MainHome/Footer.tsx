import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row, Space, Typography } from "antd";
import Image from "next/image";
import image1 from "../../../../public/images/footer/1.jpg";
import image2 from "../../../../public/images/footer/2.jpg";
import image3 from "../../../../public/images/footer/3.jpg";
import image4 from "../../../../public/images/footer/4.jpg";
import image5 from "../../../../public/images/footer/5.jpg";
import image6 from "../../../../public/images/footer/6.jpg";
import image7 from "../../../../public/images/footer/7.jpg";
import image8 from "../../../../public/images/footer/8.jpg";
const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: "#ffff" }}>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8}>
          <Space direction="vertical" size="large">
            <Title level={4}>FotoShots</Title>
            <Paragraph>
              FotoShots is your trusted photography service provider, capturing
              the moments that matter most.
            </Paragraph>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Space direction="vertical" size="large">
              <Title level={4}>Contact Us</Title>
              <Row align="middle">
                <PhoneOutlined />
                <Text>Phone: +1 123-456-7890</Text>
              </Row>
              <Row align="middle">
                <MailOutlined />
                <Text>Email: info@fotoshots.com</Text>
              </Row>
              <Row align="middle">
                <EnvironmentOutlined />
                <Text>123 Main St, City, Country</Text>
              </Row>
              <Row align="middle">
                <Space size="large">
                  <a
                    href="https://www.facebook.com/yourpage"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookOutlined style={{ fontSize: "24px" }} />
                  </a>
                  <a
                    href="https://www.instagram.com/yourpage"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramOutlined style={{ fontSize: "24px" }} />
                  </a>
                  <a
                    href="https://twitter.com/yourpage"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterOutlined style={{ fontSize: "24px" }} />
                  </a>
                </Space>
              </Row>
            </Space>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Image src={image1} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image2} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image3} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image4} width={80} alt="Sample Image 1" />
            </Col>
          </Row>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Image src={image5} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image6} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image7} width={80} alt="Sample Image 1" />
            </Col>
            <Col>
              <Image src={image8} width={80} alt="Sample Image 1" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
