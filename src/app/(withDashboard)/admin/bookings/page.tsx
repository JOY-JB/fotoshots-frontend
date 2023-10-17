import BookingsTable from "@/components/ui/BookingsTable";
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
            label: "Bookings",
          },
        ]}
      />
      <BookingsTable role="admin" />
    </>
  );
};

export default AdminBookingList;
