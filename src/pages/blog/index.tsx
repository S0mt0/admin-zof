import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { ItemNotFound } from "@/components/ui/item-not-found";
import { deleteBlog, getBlog } from "@/lib/api/requests";
import { BlogContent } from "./components/blog-content";
import { useAuthStore } from "@/lib/hooks";
import { isAxiosError } from "axios";
import { LoadingDots } from "@/components/ui/loading-dots";

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

  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteBlog(accessToken!, blogId),
    onError: (error) => {
      console.error({ error });

      if (isAxiosError(error)) {
        const response =
          error.response?.data?.response ||
          error.response?.data?.response?.message;

        const message =
          typeof response === "string"
            ? response
            : JSON.stringify(response) || error.name;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully.");
      navigate("/dashboard/blogs?draft=false");
    },
  });

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

  const publishDate = format(new Date(createdAt), "d MMM yyyy, hh:mm aa");
  const updateDate = format(new Date(updatedAt), "d MMM yyyy, hh:mm aa");
  const hasBeenUpdated = createdAt !== updatedAt;
  return (
    <article className="max-w-3xl mx-auto text-sm py-10">
      <div className="my-10 flex items-center justify-end gap-4">
        <button
          className="px-6 h-9 cursor-pointer flex items-center justify-center bg-black text-white hover:bg-red-600 transition rounded-full"
          onClick={() => mutate()}
          disabled={isLoading}
        >
          {isPending ? <LoadingDots /> : "Delete"}
        </button>

        <Link
          to="/dashboard/blogs/editor/:blogId"
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
              <span className="mr-3">•</span>
              Last updated on {updateDate}
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
