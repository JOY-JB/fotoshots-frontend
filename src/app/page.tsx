import dynamic from "next/dynamic";

import { Metadata } from "next";

const HomePage = dynamic(() => import("@/components/ui/Home"), { ssr: false });

export const metadata: Metadata = {
  title: "Fotoshots",
  description: "Photographer booking System by Joy Barua",
};

export default function Home() {
  return <HomePage />;
}
