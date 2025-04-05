import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useEventEditorContext } from "./use-contexts";
import { useAuthStore } from "./use-store";
import { createEvent, updateEvent } from "../api/requests";
import { initEventStructure } from "@/pages/event-editor/components";

export const usePublishEventForm = () => {
  const {
    eventData,
    setEventData,
    setEditorState,
    draftState,
    type,
    date,
    setDate,
  } = useEventEditorContext();

  const descCharLimit = 200;

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    if (input.value.length <= descCharLimit) {
      setEventData({ ...eventData, desc: input.value });
    }
  };

  const handleDescKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, title: e.target.value });
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, featured: e.target.checked });
  };

  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (dto: EventStructure) => {
      dto = { ...dto, scheduledFor: date };

      if (draftState) {
        dto = { ...dto, draft: true };
      } else {
        dto = { ...dto, draft: false };
      }

      return type === "new"
        ? createEvent(accessToken!, dto)
        : updateEvent(accessToken!, dto.eventId!, dto);
    },

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
      setEventData(initEventStructure);
      navigate(`/dashboard/events?draft=${draftState ? "true" : "false"}`);
    },
  });

  const handlePublishEvent = () => {
    if (!draftState && !eventData.desc.length)
      return toast.error("Write a short description about your event");

    mutate(eventData);
  };

  return {
    eventData,
    setEditorState,
    handleDescriptionChange,
    handleTitleChange,
    handleFeaturedChange,
    descCharLimit,
    handleDescKeyDown,
    isPending,
    handlePublishEvent,
    draftState,
    date,
    setDate,
    type,
  };
};
