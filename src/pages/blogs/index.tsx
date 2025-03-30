import { Search } from "lucide-react";

import { Pagination } from "@/components/ui/pagination";
import { AppLoader } from "@/components/ui/app-loader";
import { AppError } from "@/components/ui/app-error";
import { Input } from "@/components/ui/input";
import { useBlogs } from "@/lib/hooks";

export const BlogsPage = () => {
  const { blogsData, error, handlePageChange, isLoading, title, setTitle } =
    useBlogs();

  if (isLoading && !blogsData) return <AppLoader className="h-[70vh]" />;
  if (error) return <AppError error={error} />;

  if (!blogsData) return null;

  return (
    <main className="p-4">
      <div className="pt-2">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search blog"
            className="bg-slate-100 rounded-full w-full p-5 px-8"
          />

          <button className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer">
            <Search className=" w-4.5 h-4.5 text-gray-600/80" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

        {/* Blog List */}
        <div className="space-y-4">
          {blogsData.blogs.map((blog) => (
            <div key={blog.title} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.desc}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={blogsData.pagination.page}
          totalPages={blogsData.pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};
