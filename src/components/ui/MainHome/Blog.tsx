import { Card, Col, Layout, Row, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const BlogSection = () => {
  const blogData = [
    {
      title: "10 Tips for Capturing Stunning Sunsets",
      content:
        "Sunsets are one of nature's most breathtaking spectacles. To help you capture those stunning moments, we've put together 10 tips for photographing sunsets like a pro.",
      type: "BLOG",
    },
    {
      title: "The Art of Portrait Photography",
      content:
        "Portrait photography is all about capturing the personality and character of your subjects. Learn the art of portrait photography and create stunning portraits.",
      type: "BLOG",
    },
    {
      title: "Choosing the Right Camera Gear",
      content:
        "Selecting the right camera gear is essential for capturing the perfect shot. Our guide helps you choose the gear that best suits your photography needs.",
      type: "BLOG",
    },
  ];

  return (
    <Content
      style={{ padding: "50px 0", maxWidth: "1400px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Title level={2}>Photography Blog</Title>
        <Title level={4} type="secondary">
          Explore our latest articles and photography tips
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {blogData.map((blog, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              title={blog.title}
              style={{
                minHeight: "350px",
              }}
            >
              <Paragraph>{blog.content}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default BlogSection;
