import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import ReviewManagementTable from "@/components/ui/ReviewManagementTable";

const ReviewManagement = () => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: "/dashboard",
          },
          {
            label: "Review Management",
          },
        ]}
      />
      <ReviewManagementTable />
    </>
  );
};

export default ReviewManagement;
