import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import errorImage from "../assets/error.png";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={errorImage} width={600} alt="error Image" />

      <Link href={"/"}>
        <Button type="primary" size="large" shape="round">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
