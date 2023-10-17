"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Button, Col, Row, message } from "antd";

interface IProps {
  params: {
    id: string;
  };
}

const ServiceEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data } = useGetServiceByIdQuery(id);
  const [updateService] = useUpdateServiceMutation();

  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
  };

  const onSubmit = async (data: any) => {
    data["price"] = Number(data.price);

    try {
      const res = await updateService({ id, body: data }).unwrap();

      if (!!res) {
        message.success("Service updated successfully");
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
          Edit Service
        </h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput name="title" label="Title" type="text" size="large" />
            <FormInput
              name="description"
              label="Description"
              type="text"
              size="large"
            />
            <FormInput name="price" label="Price" type="number" size="large" />
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

export default ServiceEditPage;
