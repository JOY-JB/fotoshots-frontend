import Loading from "@/app/loading";
import { useGetAllFAQsQuery } from "@/redux/api/contentApi";
import { IContent } from "@/types";
import { Collapse, Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const FaqSection = () => {
  const { data: faqData, isLoading } = useGetAllFAQsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Content
      style={{
        padding: "50px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "900px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={2}>FAQ</Title>
          <Title level={4} type="secondary">
            Answers to common questions
          </Title>
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
  );
};

export default FaqSection;
