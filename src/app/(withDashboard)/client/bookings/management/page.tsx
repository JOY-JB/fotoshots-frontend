import ClientBookingManagementTable from "@/components/ui/ClientBookingManagementTable";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

const AdminBookingList = () => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Booking Management",
          },
        ]}
      />
      <ClientBookingManagementTable />
    </>
  );
};

export default AdminBookingList;
