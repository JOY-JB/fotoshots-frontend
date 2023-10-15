"use client";

import { Button } from "antd";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Something went wrong.</h1>
      <br />
      <Link href={"/"}>
        <Button type="primary" size="large" shape="round">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
