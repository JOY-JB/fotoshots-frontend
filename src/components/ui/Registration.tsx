"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  useCreateClientMutation,
  useCreatePhotographerMutation,
} from "@/redux/api/userApi";
import { registrationSchema } from "@/schemas/registration";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import registrationImage from "../../assets/registration.png";
import FormRadio from "../forms/FormRadio";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNo: string;
  address: string;
  role: "photographer" | "client";
};

const ClientRegistrationPageComponent = () => {
  const [createClient] = useCreateClientMutation();
  const [createPhotographer] = useCreatePhotographerMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (
    data: RegistrationFormValues
  ) => {
    const { confirmPassword, role, ...newData } = data;

    if (newData.password !== confirmPassword) {
      message.error("Password and Confirm Password do not match.");
      return;
    }

    try {
      let res = null;
      if (role === "photographer") {
        res = await createPhotographer(newData).unwrap();
      } else {
        res = await createClient(newData).unwrap();
      }

      if (res?.accessToken) {
        router.push("/");
        message.success("Registered successfully and logged in!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (error) {
      console.error(error);
    }
  };

  const items = [
    {
      label: "Photographer",
      value: "photographer",
    },
    {
      label: "Client",
      value: "client",
    },
  ];

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col
        sm={12}
        md={10}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={registrationImage} width={700} alt="Registration image" />
      </Col>
      <Col sm={12} md={8}>
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Registration
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(registrationSchema)}
          >
            <FormInput name="name" label="Name" type="text" size="large" />
            <FormInput
              name="email"
              label="User Email"
              type="text"
              size="large"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              size="large"
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
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

            <div style={{ margin: "20px 0px" }}>
              <FormRadio name="role" label="User Type" items={items} />
            </div>

            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form>

          <p style={{ marginTop: "35px", textAlign: "center" }}>
            Already registered? <Link href="/login">Login here</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default ClientRegistrationPageComponent;
