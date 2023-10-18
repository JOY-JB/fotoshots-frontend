"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import { useCreateBlogPostMutation } from "@/redux/api/contentApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateBlogPage = () => {
  const [createBlogPost] = useCreateBlogPostMutation();

  const router = useRouter();

  const defaultValues = {
    title: "",
    content: "",
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await createBlogPost(data).unwrap();

      if (!!res) {
        message.success("Blog created successfully");
        router.push("/admin/content/blog-list");
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
            label: "Blog list",
            link: `/admin/content/blog-list`,
          },
          {
            label: "Create Blog",
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
          <h1 style={{ marginBottom: "1rem" }}>Create Blog</h1>
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
                Create Blog
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateBlogPage;
