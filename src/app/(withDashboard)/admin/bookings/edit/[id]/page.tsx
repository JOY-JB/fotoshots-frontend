import BookingEditPage from "@/components/ui/BookingEdit";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

interface IProps {
  params: {
    id: string;
  };
}

const AdminBookingEditPage = ({ params }: IProps) => {
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
            link: `/admin/bookings`,
          },
        ]}
      />
      <BookingEditPage params={params} />
    </>
  );
};

export default AdminBookingEditPage;
