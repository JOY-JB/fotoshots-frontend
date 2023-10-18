"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import { useCreateFAQMutation } from "@/redux/api/content";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateFaqPage = () => {
  const [createFAQ] = useCreateFAQMutation();

  const router = useRouter();

  const defaultValues = {
    title: "",
    content: "",
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await createFAQ(data).unwrap();

      if (res) {
        message.success("FAQ created successfully");
        router.push("/admin/content/faq-list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "FAQ list",
            link: `/admin/content/faq-list`,
          },
          {
            label: "Create FAQ",
          },
        ]}
      />
      <Row
        justify={"center"}
        style={{
          minHeight: "100vh",
        }}
      >
        <Col sm={12} md={10}>
          <h1 style={{ marginBottom: "1rem" }}>Create FAQ</h1>
          <div>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <FormInput
                name="title"
                label="Question"
                type="text"
                size="large"
              />
              <FormInput
                name="content"
                label="Answer"
                type="text"
                size="large"
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                Create FAQ
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateFaqPage;
