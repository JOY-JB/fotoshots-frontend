import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import ServicesTable from "@/components/ui/ServiceTable";

const AdminServicesList = () => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Services",
          },
        ]}
      />
      <ServicesTable role="admin" />;
    </>
  );
};

export default AdminServicesList;
