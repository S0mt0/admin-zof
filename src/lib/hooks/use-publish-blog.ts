import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { initBlogStructure } from "@/pages/editor/components";
import { useEditorContext } from "./use-contexts";
import { useAuthStore } from "./use-store";
import { createBlog } from "../api/requests";

export const usePublishBlogForm = () => {
  const { blogData, setBlogData, setEditorState, draftState } =
    useEditorContext();

  const descCharLimit = 200;

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    if (input.value.length <= descCharLimit) {
      setBlogData({ ...blogData, desc: input.value });
    }
  };

  const handleDescKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogData({ ...blogData, title: e.target.value });
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogData({ ...blogData, featured: e.target.checked });
  };

  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (dto: BlogStructure) => {
      if (draftState) {
        dto = { ...dto, draft: true };
      }
      return createBlog(accessToken!, dto);
    },
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
      setBlogData(initBlogStructure);
      navigate(`/dashboard/blogs?draft=${draftState ? "true" : "false"}`);
    },
  });

  const handlePublishBlog = () => {
    if (!draftState && !blogData.desc.length)
      return toast.error("Write a short description about your blog");

    mutate(blogData);
  };

  return {
    blogData,
    setEditorState,
    handleDescriptionChange,
    handleTitleChange,
    handleFeaturedChange,
    descCharLimit,
    handleDescKeyDown,
    isPending,
    handlePublishBlog,
    draftState,
  };
};
