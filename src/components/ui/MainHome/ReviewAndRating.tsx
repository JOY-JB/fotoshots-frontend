import { Col, Layout, Rate, Row, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const testimonials = [
  {
    name: "John Doe",
    rating: 5,
    comment:
      "Amazing photography service! The photos turned out beautifully, and the photographer was very professional. Highly recommended.",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment:
      "Great experience with this team. The photos captured our special moments perfectly. Will definitely book again.",
  },
  {
    name: "Robert Johnson",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquid itaque maxime consequuntur consectetur, qui officia culpa ab voluptas repellendus saepe enim distinctio sapiente magnam sit aliquam, cum dignissimos dolorum quaerat similique animi fugit architecto? Reiciendis hic natus obcaecati atque, ipsa neque. Ducimus laboriosam molestias ab laudantium soluta. Error, dicta!",
  },
];

const TestimonialsSection = () => {
  const truncateComment = (comment: string) => {
    if (comment.length > 170) {
      return comment.slice(0, 170) + " ...";
    }
    return comment;
  };

  return (
    <Content
      style={{
        padding: "50px 0",
        background: "#f7f7f7",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Title level={2}>Client Testimonials</Title>
        <Title level={4} type="secondary">
          What our clients have to say about us
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {testimonials.map((testimonial, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <div
              style={{
                background: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px 2px #ccc",
                borderRadius: "10px",
                minHeight: "240px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "30px 0",
                }}
              >
                <Rate allowHalf defaultValue={testimonial.rating} disabled />
              </div>
              <Paragraph style={{ marginTop: "10px" }}>
                {truncateComment(testimonial.comment)}
              </Paragraph>
              <Title level={5} style={{ textAlign: "right" }}>
                - {testimonial.name}
              </Title>
            </div>
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default TestimonialsSection;
