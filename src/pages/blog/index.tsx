import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ItemNotFound } from "@/components/ui/item-not-found";
import { getBlog } from "@/lib/api/requests";
import { BlogContent } from "./components/blog-content";
import { useDeleteBlog } from "@/lib/hooks";
import { LoadingDots } from "@/components/ui/loading-dots";
import { formatAppDate } from "@/lib/utils";

export const SingleBlogPage = () => {
  const blogId = useParams().blogId || "";

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
  });

  const { isPending, mutate } = useDeleteBlog(blog?.draft);

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (error || !blog) return <ItemNotFound item="Blog" />;

  const {
    bannerUrl,
    createdAt,
    title,
    updatedAt,
    content: { blocks },
  } = blog;

  const publishDate = formatAppDate(createdAt);
  const updateDate = formatAppDate(updatedAt);
  const hasBeenUpdated = createdAt !== updatedAt;
  return (
    <article className="max-w-3xl mx-auto text-sm py-10">
      <div className="my-10 flex items-center justify-end gap-4">
        <button
          className="px-6 h-9 cursor-pointer flex items-center justify-center bg-black text-white hover:bg-red-600 transition rounded-full"
          onClick={() => mutate(blog.blogId)}
          disabled={isLoading}
        >
          {isPending ? <LoadingDots /> : "Delete"}
        </button>

        <Link
          to={`/dashboard/blogs/editor/${blog.blogId}`}
          className="px-6 h-9 flex items-center hover:bg-green-700/80 transition justify-center bg-gray-200 text-black rounded-full"
        >
          Edit
        </Link>
      </div>

      <img src={bannerUrl} alt={title} className="aspect-video w-full" />

      <div className="mt-12">
        <h2 className="font-bold text-2xl xs:text-3xl text-gray-800">
          {title}
        </h2>

        <div className="flex items-center gap-3 text-gray-500/75 mt-2">
          <p>
            Published on <span className="underline">{publishDate}</span>
          </p>
          {hasBeenUpdated ? (
            <p>
              <span className="mr-3">.</span>
              Last updated on <span className="underline">{updateDate}</span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="my-12">
        {blocks.map((block, i) => (
          <div className="my-4 md:my-8" key={i}>
            <BlogContent {...block} />
          </div>
        ))}
      </div>
    </article>
  );
};
