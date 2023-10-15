import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

type IItems = {
  label: string;
  link?: string;
}[];

const UMBreadCrumb = ({ items }: { items: IItems }) => {
  const BreadCrumbItems = [
    {
      title: (
        <Link href={"/"}>
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => ({
      title: item.link ? (
        <Link href={item.link}>{item.label}</Link>
      ) : (
        <span>{item.label}</span>
      ),
    })),
  ];

  return (
    <Breadcrumb items={BreadCrumbItems} style={{ marginBottom: "1rem" }} />
  );
};

export default UMBreadCrumb;
