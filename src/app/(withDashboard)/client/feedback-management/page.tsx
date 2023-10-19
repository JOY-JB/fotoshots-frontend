import FeedbackManagementTable from "@/components/ui/FeedbackManagementTable";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

const FeedbackManagement = () => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: "/dashboard",
          },
          {
            label: "Feedback Management",
          },
        ]}
      />
      <FeedbackManagementTable />
    </>
  );
};

export default FeedbackManagement;
