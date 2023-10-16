import { Card, Carousel, Layout, Typography } from "antd";
import Image from "next/image";
import jubayer from "../../../../public/images/jubayer.jpeg";
import prito from "../../../../public/images/prito.jpeg";
import samim from "../../../../public/images/samim-reza.jpeg";
import santo from "../../../../public/images/santo.jpeg";

const { Content } = Layout;
const { Title, Text } = Typography;

const photographerData = [
  {
    name: "Jubayer Talukdar",
    specialization: "Wedding Photographer",
    image: jubayer,
    description:
      "A renowned wedding photographer known for capturing the beauty of love and celebrations.",
  },
  {
    name: "Prito Reja",
    specialization: "Landscape Photographer",
    image: prito,
    description:
      "Prito's exceptional landscape photography transports viewers to stunning natural wonders.",
  },
  {
    name: "Samim Reza",
    specialization: "Event Photographer",
    image: samim,
    description:
      "Samim specializes in event photography, capturing memorable moments at various occasions and celebrations.",
  },
  {
    name: "Santo Rahman",
    specialization: "Fashion Photographer",
    image: santo,
    description:
      "Santo captures the glamour and style of the fashion world in each stunning photograph.",
  },
  {
    name: "Samim Reza",
    specialization: "Portrait Photographer",
    image: samim,
    description:
      "Samim's portrait photography brings out the personality and character of each subject, creating stunning and memorable portraits.",
  },
];

const PhotographersSection = () => {
  return (
    <Layout>
      <Content
        style={{ padding: "40px 0", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2}>Meet Our Top Photographers</Title>
          <Text type="secondary">
            Passionate professionals behind the camera.
          </Text>
        </div>
        <Carousel
          autoplay
          dots={{ className: "carousel-dots" }}
          slidesToShow={3}
        >
          {photographerData.map((photographer, index) => (
            <div key={index}>
              <Card
                style={{
                  height: "500px",
                  margin: "0 10px",
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      height: "300px",
                    }}
                  >
                    <Image alt={photographer.name} src={photographer.image} />
                  </div>
                }
                hoverable
              >
                <Card.Meta
                  title={photographer.name}
                  description={photographer.specialization}
                />
                <Text type="secondary">{photographer.description}</Text>
              </Card>
            </div>
          ))}
        </Carousel>
      </Content>
      <style jsx>
        {`
          .carousel-dots {
            bottom: 0;
          }
        `}
      </style>
    </Layout>
  );
};

export default PhotographersSection;
