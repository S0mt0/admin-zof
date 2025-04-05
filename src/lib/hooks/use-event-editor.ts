import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import defaultBannerImg from "../../assets/default-banner.png";
import { useEventEditorContext } from "@/lib/hooks";
import { uploadImage } from "@/lib/api/requests";
import { editorTools } from "../utils";

export const useEventEditor = () => {
  const { eventData, setEventData, setEditorState, setDraftState } =
    useEventEditorContext();

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedFileTypes = ["image/jpg", "image/png", "image/jpeg"];
    const maxFileSize = 2000000; // 2MB

    const files = e.target.files;

    if (files) {
      const img = files[0];
      if (!allowedFileTypes.includes(img.type))
        return toast.error("File type not supported", {
          id: "unsupported-img",
        });

      if (img.size > maxFileSize)
        return toast.error("Image size too large", {
          id: "unsupported-img",
        });

      toast.loading("Uploading...", { id: "upload" });
      uploadImage(img)
        .then((url) => {
          toast.success("Upload success🎉" as string, { id: "upload-success" });
          setEventData({ ...eventData, bannerUrl: url as string });
        })
        .catch((e) => {
          toast.error("Error uploading image");
          console.error({ e });
        })
        .finally(() => {
          toast.dismiss("upload");
        });
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setEventData({ ...eventData, title: input.value });
  };

  const handleBannerImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultBannerImg;
  };

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorContainerRef.current && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        data: eventData.content,
        tools: editorTools,
        placeholder: "Write something cool...",
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, [eventData.content]);

  const handlePublishEvent = async (draft: boolean) => {
    if (!eventData.bannerUrl.length)
      return toast.error("Upload event banner to publish it");

    if (!eventData.title.trim().length)
      return toast.error("Write event title to publish it");

    const editor = editorRef.current;

    if (editor) {
      editor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setEventData({ ...eventData, content: data });
            setEditorState("publish-form");
            setDraftState(draft);
          } else {
            return toast.error(
              "Please write something in your event to publish it"
            );
          }
        })
        .catch((e) => {
          console.error("[editor_error]: ", e);
        });

      return;
    }
  };

  return {
    handleBannerUpload,
    handleTitleKeyDown,
    handleTitleChange,
    handleBannerImgError,
    eventData,
    editorContainerRef,
    handlePublishEvent,
  };
};
