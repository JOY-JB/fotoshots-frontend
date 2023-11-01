import Loading from "@/app/loading";
import { useGetAllBlogPostsQuery } from "@/redux/api/contentApi";
import { IContent } from "@/types";
import { Card, Col, Layout, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const BlogSection = () => {
  const { data: blogData, isLoading } = useGetAllBlogPostsQuery(undefined);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
        style={{ maxWidth: isDesktop ? "1400px" : "100%", padding: "0 10px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title>Photography Blog</Title>
          <Text type="secondary" italic style={{ fontSize: "1.1rem" }}>
            Explore our latest articles and photography tips
          </Text>
        </div>
        <Row gutter={[16, 16]}>
          {blogData &&
            blogData.map((blog: IContent, index: number) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <Card
                  title={blog.title}
                  style={{
                    minHeight: "240px",
                  }}
                >
                  <Paragraph>{blog.content}</Paragraph>
                </Card>
              </Col>
            ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default BlogSection;
