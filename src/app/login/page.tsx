import LoginPageComponent from "@/components/ui/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotoshots | login",
  description: "Photographer booking System by Joy Barua",
};

const LoginPage = () => {
  return <LoginPageComponent />;
};

export default LoginPage;
