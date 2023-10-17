import BlogsTable from "@/components/ui/BlogsTable";
import MyBreadCrumb from "@/components/ui/MyBreadCrumb";

const BlogListPage = () => {
  return (
    <div>
      <MyBreadCrumb
        items={[
          {
            label: "Dashboard",
            link: `/dashboard`,
          },
          {
            label: "Blogs",
          },
        ]}
      />
      <BlogsTable />
    </div>
  );
};

export default BlogListPage;
