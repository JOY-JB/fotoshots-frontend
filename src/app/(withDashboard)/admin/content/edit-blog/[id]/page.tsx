import BlogEditPage from "@/components/ui/BlogEdit";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

interface IProps {
  params: {
    id: string;
  };
}

const AdminBlogEditPage = ({ params }: IProps) => {
  return (
    <>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Blog list",
            link: `/admin/content/blog-list`,
          },
        ]}
      />
      <BlogEditPage params={params} />
    </>
  );
};

export default AdminBlogEditPage;
