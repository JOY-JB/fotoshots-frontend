"use client";

import FAQEditPage from "@/components/ui/FAQEdit";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

interface IProps {
  params: {
    id: string;
  };
}

const AdminFAQEditPage = ({ params }: IProps) => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "FAQ list",
            link: `/admin/content/faq-list`,
          },
        ]}
      />
      <FAQEditPage params={params} />
    </>
  );
};

export default AdminFAQEditPage;
