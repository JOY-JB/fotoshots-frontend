import Loading from "@/app/loading";
import { useGetAllBlogPostsQuery } from "@/redux/api/contentApi";
import { IContent } from "@/types";
import { Card, Col, Layout, Row, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const BlogSection = () => {
  const { data: blogData, isLoading } = useGetAllBlogPostsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

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
  );
};

export default BlogSection;
