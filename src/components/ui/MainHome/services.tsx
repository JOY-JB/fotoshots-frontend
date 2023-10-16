import { Card, Layout, Typography } from "antd";
import Image from "next/image";
import eventPhotography from "../../../../public/images/event-photography.jpg";
import familyPortrait from "../../../../public/images/family-portraits.jpg";
import weddingPhoto from "../../../../public/images/wedding-photo.jpg";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const servicesData = [
  {
    title: "Wedding Photography",
    description: "Capture beautiful moments on your special day.",
    price: "25,000৳ - 5,00,000৳",
    image: weddingPhoto,
  },
  {
    title: "Family Portraits",
    description: "Create lasting memories with your loved ones.",
    price: "5000৳ - 1500৳",
    image: familyPortrait,
  },
  {
    title: "Event Photography",
    description: "Document and celebrate your events.",
    price: "15000৳ - 1,00,000৳",
    image: eventPhotography,
  },
];

const ServicesSection = () => {
  return (
    <Content style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Our Services</Title>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {servicesData.map((service, index) => (
          <Card
            key={index}
            style={{ width: 300, margin: "16px" }}
            cover={
              <Image
                alt={service.title}
                src={service.image}
                width={300}
                height={200}
              />
            }
          >
            <Card.Meta
              title={service.title}
              description={<Paragraph>{service.description}</Paragraph>}
            />
            <p style={{ marginTop: "16px" }}>
              <strong>Price: {service.price}</strong>
            </p>
          </Card>
        ))}
      </div>
    </Content>
  );
};

export default ServicesSection;
