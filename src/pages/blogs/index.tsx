import { Loader2, Search } from "lucide-react";

import { Pagination } from "@/components/ui/pagination";
import { AppError } from "@/components/ui/app-error";
import { Input } from "@/components/ui/input";
import { useGetBlogs } from "@/lib/hooks";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { cn } from "@/lib/utils";

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

  return (
    <main className="p-2">
      <div className="pt-2">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Search blog"
            className="bg-gray-100 rounded-full w-full p-5 px-8 shadow-none"
          />

          <Search className=" w-4.5 h-4.5 text-green-600 absolute right-6 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="mt-4">
        <div className="py-4">
          <h1 className="text-2xl font-bold pb-3">Blog Posts</h1>

          <div className="border flex">
            <button
              className={cn(
                "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                !draft && "bg-gray-50 border-green-600"
              )}
              onClick={() => toggleTabs(false)}
            >
              Published
            </button>
            <button
              className={cn(
                "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                draft && "bg-gray-50 border-green-600"
              )}
              onClick={() => toggleTabs(true)}
            >
              Draft
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
          <AppError error={error} />
        ) : blogsData && blogsData.blogs.length ? (
          <>
            {/* Blog List */}
            <div className="space-y-4">
              {blogsData.blogs.map((blog, i) => (
                <AnimationWrapper
                  key={blog.title}
                  transition={{ duration: 1, delay: i * 0.2 }}
                >
                  <div className="border p-4 rounded">
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    <p className="text-gray-600">{blog.desc}</p>
                  </div>
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
          <div className="text-muted-foreground text-sm p-2 rounded-full bg-gray-100 text-center">
            Blog posts not found.
          </div>
        )}
      </div>
    </main>
  );
};
