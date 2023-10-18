import ClientServiceBooking from "@/components/ui/ClientServiceBooking";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

const ClientServiceBookingPage = () => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Service Bookings",
          },
        ]}
      />
      <ClientServiceBooking />
    </>
  );
};

export default ClientServiceBookingPage;
