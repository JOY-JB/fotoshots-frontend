import ClientsTable from "@/components/ui/ClientsTable";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

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
            label: "Client list",
          },
        ]}
      />
      <ClientsTable />
    </div>
  );
};

export default UsersListPage;
