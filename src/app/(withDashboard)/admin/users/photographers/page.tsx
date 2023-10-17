import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import PhotographersTable from "@/components/ui/PhotographersTable";

const UsersListPage = () => {
  return (
    <div>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Photographers",
          },
        ]}
      />
      <PhotographersTable />
    </div>
  );
};

export default UsersListPage;
