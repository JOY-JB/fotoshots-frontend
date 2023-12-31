import Loading from "@/app/loading";
import { useGetAllFAQsQuery } from "@/redux/api/contentApi";
import { IContent } from "@/types";
import { Collapse, Layout, Typography } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const FaqSection = () => {
  const { data: faqData, isLoading } = useGetAllFAQsQuery(undefined);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth > 900);
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
        style={{
          maxWidth: "1400px",
        }}
      >
        <div style={{ width: isDesktop ? "900px" : "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Title>FAQ</Title>
            <Text type="secondary" italic style={{ fontSize: "1.1rem" }}>
              Answers to common questions
            </Text>
          </div>
          <Collapse accordion>
            {faqData &&
              faqData.map((faq: IContent, index: number) => (
                <Panel header={faq.title} key={index}>
                  <p>{faq.content}</p>
                </Panel>
              ))}
          </Collapse>
        </div>
      </Content>
    </Layout>
  );
};

export default FaqSection;
