import Loading from "@/app/loading";
import { useGetPhotographersQuery } from "@/redux/api/photographerApi";
import { Card, Carousel, Layout, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Image from "next/image";
import jubayer from "../../../../public/images/jubayer.jpeg";
import prito from "../../../../public/images/prito.jpeg";
import samim from "../../../../public/images/samim-reza.jpeg";
import santo from "../../../../public/images/santo.jpeg";

const { Content } = Layout;
const { Title, Text } = Typography;

const PhotographersSection = () => {
  const { data, isLoading } = useGetPhotographersQuery({});

  if (isLoading) {
    return <Loading />;
  }
  const photographerData = data?.photographers;

  let slidesToShow = 4;
  let carouselMargin = "0 10px";

  if (window.innerWidth <= 768) {
    slidesToShow = 1;
    carouselMargin = "auto";
  } else if (window.innerWidth <= 992) {
    slidesToShow = 2;
    carouselMargin = "auto";
  } else {
    slidesToShow = 4;
    carouselMargin = "0 10px";
  }

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content
        style={{
          maxWidth: "100%",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title>Meet Our Top Photographers</Title>
          <Text type="secondary" italic style={{ fontSize: "1.1rem" }}>
            Passionate professionals behind the camera.
          </Text>
        </div>
        <Carousel
          autoplay
          dots={{ className: "carousel-dots" }}
          slidesToShow={slidesToShow}
        >
          {photographerData &&
            photographerData.map((photographer, index) => (
              <div key={index}>
                <Card
                  style={{
                    height: "520px",
                    margin: carouselMargin,
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
                        padding: "10px",
                        height: "300px",
                      }}
                    >
                      {index === 0 ? (
                        <Image
                          alt={photographer.name}
                          src={jubayer}
                          width={300}
                          height={280}
                        />
                      ) : index === 1 ? (
                        <Image
                          alt={photographer.name}
                          src={prito}
                          width={300}
                          height={280}
                        />
                      ) : index === 2 ? (
                        <Image
                          alt={photographer.name}
                          src={samim}
                          width={300}
                          height={280}
                        />
                      ) : index === 3 ? (
                        <Image
                          alt={photographer.name}
                          src={santo}
                          width={300}
                          height={280}
                        />
                      ) : photographer.profileImg ? (
                        <Image
                          alt={photographer.name}
                          src={photographer.profileImg}
                        />
                      ) : null}
                    </div>
                  }
                  hoverable
                >
                  <Card.Meta
                    title={<Title level={4}>{photographer.name}</Title>}
                    description={
                      <Paragraph italic>{photographer.email}</Paragraph>
                    }
                  />
                  <Text style={{ fontSize: "1rem" }}>{photographer.bio}</Text>
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
