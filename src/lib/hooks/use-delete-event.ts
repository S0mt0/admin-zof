import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "./use-store";
import { deleteEvent } from "../api/requests";

export const useDeleteEvent = (draftState?: boolean) => {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (eventId: string) => deleteEvent(accessToken!, eventId),
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
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully.");
      navigate(`/dashboard/events?draft=${draftState ? "true" : "false"}`);
    },
  });

  return { isPending, mutate };
};
