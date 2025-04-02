import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Loader2, Search } from "lucide-react";

import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useGetBlogs } from "@/lib/hooks";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { cn } from "@/lib/utils";
import { BlogPreviewCard } from "./components/blog-preview-card";
import { ItemNotFound } from "@/components/ui/item-not-found";

export const BlogsPage = () => {
  const {
    blogsData,
    error,
    handlePageChange,
    title,
    isLoading,
    handleTitleChange,
    toggleTabs,
    draft,
    handleNextPageHover,
  } = useGetBlogs();

  useEffect(() => {
    if (error) toast.error(error, { id: "blogs-error" });
  }, [error]);

  return (
    <AnimationWrapper keyValue="blogs">
      <main className="p-2">
        <div className="pt-2">
          <div className="relative w-full max-w-xl">
            <Search className=" w-4.5 h-4.5 text-green-600 absolute left-2 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Search blogs"
              className="bg-gray-100 rounded-full w-full p-5 px-8 shadow-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="py-4">
            <div className="flex justify-between items-center gap-10 pb-3">
              <h1 className="text-2xl font-bold">Blogs</h1>
              <Link
                to="editor"
                className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 transition-colors duration-200 rounded-full text-white py-1.5 px-3"
              >
                <Edit className="h-4 w-4" /> Write New
              </Link>
            </div>
            <div className="border flex">
              <button
                className={cn(
                  "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                  !draft && "bg-gray-50 border-green-600"
                )}
                onClick={() => toggleTabs(false)}
              >
                Published Blogs
              </button>
              <button
                className={cn(
                  "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                  draft && "bg-gray-50 border-green-600"
                )}
                onClick={() => toggleTabs(true)}
              >
                Drafts
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </div>
          ) : !error && blogsData && blogsData.blogs.length ? (
            <>
              {/* Blog List */}
              <div className="space-y-4">
                {blogsData.blogs.map((blog, i) => (
                  <AnimationWrapper
                    key={blog.title}
                    transition={{ delay: i * 0.1 }}
                  >
                    <BlogPreviewCard {...blog} index={i + 1} />
                  </AnimationWrapper>
                ))}
              </div>
              {/* Pagination */}
              <Pagination
                currentPage={blogsData.pagination.page}
                totalPages={blogsData.pagination.totalPages}
                onPageChange={handlePageChange}
                onMouseEnter={handleNextPageHover}
              />
            </>
          ) : (
            <ItemNotFound item="Blog posts" />
          )}
        </div>
      </main>
    </AnimationWrapper>
  );
};
