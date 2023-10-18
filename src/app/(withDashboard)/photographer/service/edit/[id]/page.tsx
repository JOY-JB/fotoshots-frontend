import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import ServiceEditPage from "@/components/ui/serviceEdit";

interface IProps {
  params: {
    id: string;
  };
}

const AdminServiceEditPage = ({ params }: IProps) => {
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
            link: `/photographer/service`,
          },
        ]}
      />
      <ServiceEditPage params={params} />
    </>
  );
};

export default AdminServiceEditPage;
