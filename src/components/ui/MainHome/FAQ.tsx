import { Collapse, Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const FaqSection = () => {
  const faqData = [
    {
      question: "How do I book a photography session?",
      answer:
        "To book a photography session, please visit our 'Book Now' page and follow the instructions for selecting a photographer, date, and time.",
      type: "FAQ",
    },
    {
      question: "What is the cost of your photography services?",
      answer:
        "Our pricing varies depending on the type of photography service you require. You can find detailed pricing information on our 'Services' page.",
      type: "FAQ",
    },
    {
      question: "Do you offer custom photography packages?",
      answer:
        "Yes, we offer custom photography packages to meet your specific needs. Please contact us to discuss your requirements and create a personalized package.",
      type: "FAQ",
    },
  ];

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
          {faqData.map((faq, index) => (
            <Panel header={faq.question} key={index}>
              <p>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </Content>
  );
};

export default FaqSection;
