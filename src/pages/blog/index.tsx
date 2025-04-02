import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { ItemNotFound } from "@/components/ui/item-not-found";
import { getBlog } from "@/lib/api/requests";
import { BlogContent } from "./components/blog-content";

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

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (error) {
    toast.error("Unable to load blog post");
    return <ItemNotFound item="Blog" />;
  }

  if (!blog) return <ItemNotFound item="Blog" />;

  const {
    bannerUrl,
    createdAt,
    title,
    updatedAt,
    content: { blocks },
  } = blog;

  const publishDate = format(new Date(createdAt), "d MMM, yyyy hh:mm aa");
  const updateDate = format(new Date(updatedAt), "d MMM, yyyy hh:mm aa");
  const hasBeenUpdated = createdAt !== updatedAt;
  return (
    <article className="max-w-4xl mx-auto text-sm">
      <img src={bannerUrl} alt={title} className="aspect-video w-full" />

      <div className="mt-12">
        <h2 className="font-bold text-2xl xs:text-3xl text-gray-800">
          {title}
        </h2>

        <div className="flex items-center gap-3 text-gray-500/75">
          <p>Published on {publishDate}</p>
          {hasBeenUpdated ? (
            <p>
              <span className="mr-3">•</span>
              Last updated on {updateDate}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="my-12">
        {blocks.map((block) => (
          <div className="my-4 md:my-8" key={block.id}>
            <BlogContent {...block} />
          </div>
        ))}
      </div>
    </article>
  );
};
