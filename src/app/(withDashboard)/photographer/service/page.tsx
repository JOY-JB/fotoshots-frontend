import MyBreadCrumb from "@/components/ui/MyBreadCrumb";
import PhotographerServiceTable from "@/components/ui/PhotographerServiceTable";

const PhotographerServicesList = () => {
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
          },
        ]}
      />
      <PhotographerServiceTable />
    </>
  );
};

export default PhotographerServicesList;
