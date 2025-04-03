import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import defaultBannerImg from "../../assets/default-banner.png";
import { useEditorContext } from "@/lib/hooks";
import { uploadImage } from "@/lib/api/requests";
import { editorTools } from "../utils";

export const useBlogEditor = () => {
  const { blogData, setBlogData, setEditorState, setDraftState } =
    useEditorContext();

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
          setBlogData({ ...blogData, bannerUrl: url as string });
        })
        .catch((e) => {
          toast.error("Error uploading image");
          console.log({ e });
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

    setBlogData({ ...blogData, title: input.value });
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
        data: blogData.content,
        tools: editorTools,
        placeholder: "Let's write something cool...",
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, [blogData.content]);

  const handlePublishEvent = async (draft: boolean) => {
    if (!blogData.bannerUrl.length)
      return toast.error("Upload a blog banner to publish it");

    if (!blogData.title.length)
      return toast.error("Write a blog title to publish it");

    const editor = editorRef.current;

    setEditorState("publish-form");
    if (editor) {
      editor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlogData({ ...blogData, content: data });
            setEditorState("publish-form");
            setDraftState(draft);
          } else {
            return toast.error(
              "Please write something in your blog to publish it"
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
    blogData,
    editorContainerRef,
    handlePublishEvent,
  };
};
