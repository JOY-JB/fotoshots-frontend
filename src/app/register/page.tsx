import RegistrationPageComponent from "@/components/ui/Registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotoshots | Registration",
  description: "Photographer booking System by Joy Barua",
};

const RegistrationPage = () => {
  return <RegistrationPageComponent />;
};

export default RegistrationPage;
