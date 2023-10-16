import HomePage from "@/components/ui/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotoshots",
  description: "Photographer booking System by Joy Barua",
};

export default function Home() {
  return <HomePage />;
}
