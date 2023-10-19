"uce client";

import Loading from "@/app/loading";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { Card, Layout, Typography } from "antd";
import Image from "next/image";
import eventPhotography from "../../../../public/images/event-photography.jpg";
import familyPortrait from "../../../../public/images/family-portraits.jpg";
import weddingPhoto2 from "../../../../public/images/wedding-photo-2.jpeg";
import weddingPhoto from "../../../../public/images/wedding-photo.jpg";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ServicesSection = () => {
  const { data, isLoading } = useGetAllServicesQuery({});

  if (isLoading) {
    return <Loading />;
  }
  const servicesData = data?.services;

  return (
    <Content style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Featured Services</Title>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {servicesData &&
          servicesData.slice(0, 4).map((service, index) => (
            <Card
              key={index}
              style={{ width: 300, margin: "16px" }}
              cover={
                index === 0 ? (
                  <Image
                    alt={service.title}
                    src={eventPhotography}
                    width={300}
                    height={200}
                  />
                ) : index === 1 ? (
                  <Image
                    alt={service.title}
                    src={familyPortrait}
                    width={300}
                    height={200}
                  />
                ) : index === 2 ? (
                  <Image
                    alt={service.title}
                    src={weddingPhoto}
                    width={300}
                    height={200}
                  />
                ) : index === 3 ? (
                  <Image
                    alt={service.title}
                    src={weddingPhoto2}
                    width={300}
                    height={200}
                  />
                ) : null
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
