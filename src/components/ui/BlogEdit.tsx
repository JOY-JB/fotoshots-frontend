"use client";

import Form from "@/components/forms/Form";
import {
  useGetContentByIdQuery,
  useUpdateBlogPostByIdMutation,
} from "@/redux/api/content";
import { Button, Col, Row, message } from "antd";
import FormInput from "../forms/FormInput";

interface IProps {
  params: {
    id: string;
  };
}

const BlogEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data } = useGetContentByIdQuery(id);
  const [updateBlogPost] = useUpdateBlogPostByIdMutation();

  const defaultValues = {
    title: data?.title || "",
    content: data?.content || "",
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await updateBlogPost({ id, body: data }).unwrap();

      if (!!res) {
        message.success("Blog post updated successfully");
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
          Edit Blog Post
        </h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput name="title" label="Title" type="text" size="large" />
            <FormInput
              name="content"
              label="Content"
              type="text"
              size="large"
            />
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

export default BlogEditPage;
