"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import { useCreateAdminMutation } from "@/redux/api/userApi";
import { adminSchema } from "@/schemas/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

const AddAdminPage = () => {
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit = async (data: any) => {
    const { confirmPassword, ...newData } = data;

    if (newData.password !== confirmPassword) {
      message.error("Password and Confirm Password do not match.");
      return;
    }

    const res = await createAdmin(newData);
    if (!!res) {
      message.success("Admin created successfully");
    }
  };

  return (
    <>
      <ActionBar title="Add Admin" />
      <Form submitHandler={onSubmit} resolver={yupResolver(adminSchema)}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px 50px",
            marginBottom: "10px",
          }}
        >
          <FormInput name="name" label="Name" type="text" size="large" />
          <FormInput name="email" label="User Email" type="text" size="large" />
          <FormInput
            name="password"
            label="Password"
            type="password"
            size="large"
          />
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            size="large"
          />
          <FormInput
            name="contactNo"
            label="Contact Number"
            type="text"
            size="large"
          />
          <FormInput name="address" label="Address" type="text" size="large" />

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Add Admin
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddAdminPage;
