import FAQTable from "@/components/ui/FAQTable";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

const FAQListPage = () => {
  return (
    <div>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "FAQ list",
          },
        ]}
      />
      <FAQTable />
    </div>
  );
};

export default FAQListPage;
