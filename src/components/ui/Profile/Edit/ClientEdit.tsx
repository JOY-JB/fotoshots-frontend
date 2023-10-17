"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  useGetClientByIdQuery,
  useUpdateClientMutation,
} from "@/redux/api/clientApi";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

const ClientEditPage = ({ params }: IProps) => {
  const { id } = params;
  const { data, isLoading } = useGetClientByIdQuery(id);
  const [updateClient] = useUpdateClientMutation();
  const router = useRouter();

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    contactNo: data?.contactNo || "",
    address: data?.address || "",
    bio: data?.bio || "",
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await updateClient({ id, body: data }).unwrap();

      if (!!res) {
        message.success("Profile updated successfully");
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
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
          Edit Profile
        </h1>
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput name="name" label="Name" type="text" size="large" />
            <FormInput
              name="email"
              label="User Email"
              type="text"
              size="large"
            />
            <FormInput
              name="contactNo"
              label="Contact Number"
              type="text"
              size="large"
            />
            <FormInput
              name="address"
              label="Address"
              type="text"
              size="large"
            />
            <FormInput name="bio" label="Bio" type="text" size="large" />

            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form>

          <p style={{ marginTop: "35px", textAlign: "center" }}>
            <Link href="/profile">Cancel</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default ClientEditPage;
