import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import ReviewEditPage from "@/components/ui/reviewEdit";

interface IProps {
  params: {
    id: string;
  };
}

const ClientReviewEditPage = ({ params }: IProps) => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Review Management",
            link: `/client/review-management`,
          },
        ]}
      />
      <ReviewEditPage params={params} />
    </>
  );
};

export default ClientReviewEditPage;
