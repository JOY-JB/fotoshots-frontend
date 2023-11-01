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

  const truncateDescription = (description: string) => {
    const wordArray = description.split(" ");
    if (wordArray.length <= 30) {
      return description;
    }
    const truncatedDescription = wordArray.slice(0, 35).join(" ");
    return `${truncatedDescription}...`;
  };

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10rem 0",
      }}
    >
      <Content style={{ maxWidth: "1480px" }}>
        <div style={{ textAlign: "center" }}>
          <Title>Featured Services</Title>
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
                style={{ width: 300, margin: "16px", position: "relative" }}
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
                  description={
                    <Paragraph>
                      {truncateDescription(service.description)}
                    </Paragraph>
                  }
                />
                <p style={{ marginTop: "16px" }}>
                  <strong>Price: {service.price}</strong>
                </p>
              </Card>
            ))}
        </div>
      </Content>
    </Layout>
  );
};

export default ServicesSection;
