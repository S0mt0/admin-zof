import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "./use-store";
import { deleteBlog } from "../api/requests";

export const useDeleteBlog = (draftState?: boolean) => {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (blogId: string) => deleteBlog(accessToken!, blogId),
    onError: (error) => {
      console.error({ error });

      if (isAxiosError(error)) {
        const response =
          error.response?.data?.response?.message ||
          error.response?.data?.response;

        const message =
          typeof response === "string"
            ? response
            : JSON.stringify(response) || error.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully.");
      navigate(`/dashboard/blogs?draft=${draftState ? "true" : "false"}`);
    },
  });

  return { isPending, mutate };
};
