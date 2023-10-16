"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schemas/login";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login.png";

type formValues = {
  email: string;
  password: string;
};

const LoginPageComponent = () => {
  const [userLogin] = useUserLoginMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<formValues> = async (data: formValues) => {
    try {
      const res = await userLogin(data).unwrap();

      if (res?.accessToken) {
        router.push("/");
        message.success("Logged in successfully!!");
      }

      storeUserInfo({ accessToken: res?.accessToken });
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
      <Col
        sm={12}
        md={10}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={loginImage} width={700} alt="Login image" />
      </Col>
      <Col sm={12} md={8}>
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Login here
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="email"
                label="User Email"
                type="text"
                size="large"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                label="Password"
                type="password"
                size="large"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>

          <p style={{ marginTop: "35px", textAlign: "center" }}>
            Not registered yet? <Link href="/register">registration here</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPageComponent;
