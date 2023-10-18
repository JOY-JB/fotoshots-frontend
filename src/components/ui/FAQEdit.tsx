"use client";

import Form from "@/components/forms/Form";
import {
  useGetContentByIdQuery,
  useUpdateFAQByIdMutation,
} from "@/redux/api/content";
import { Button, Col, Row, message } from "antd";
import FormInput from "../forms/FormInput";

interface IProps {
  params: {
    id: string;
  };
}

const FAQEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data } = useGetContentByIdQuery(id);
  const [updateFAQ] = useUpdateFAQByIdMutation();

  const defaultValues = {
    title: data?.title || "",
    content: data?.content || "",
  };

  const onSubmit = async (data: string) => {
    try {
      const res = await updateFAQ({ id, body: data }).unwrap();

      if (!!res) {
        message.success("FAQ updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      justify={"center"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={10}>
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Edit FAQ
        </h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput name="title" label="Question" type="text" size="large" />
            <FormInput name="content" label="Answer" type="text" size="large" />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default FAQEditPage;
