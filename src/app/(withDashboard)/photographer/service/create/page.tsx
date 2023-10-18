"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const ServiceCreatePage = () => {
  const [createService] = useCreateServiceMutation();
  const router = useRouter();

  const defaultValues = {
    title: "",
    description: "",
    price: "",
  };

  const onSubmit = async (data: any) => {
    data["price"] = Number(data.price);

    try {
      const res = await createService(data).unwrap();

      if (res) {
        message.success("Service created successfully");
        router.push("/photographer/service");
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
            label: "Services",
            link: `/photographer/service`,
          },
          {
            label: "Create Service",
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
          <h1 style={{ marginBottom: "1rem" }}>Create Service</h1>
          <div>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <FormInput name="title" label="Title" type="text" size="large" />
              <FormInput
                name="description"
                label="Description"
                type="text"
                size="large"
              />
              <FormInput
                name="price"
                label="Price"
                type="number"
                size="large"
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                Create Service
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ServiceCreatePage;
