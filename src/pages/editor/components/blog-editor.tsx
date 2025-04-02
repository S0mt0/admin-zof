import toast from "react-hot-toast";

import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import defaultBannerImg from "../../../assets/default-banner.png";
import { useAuthStore, useEditorContext } from "@/lib/hooks";
import { uploadBlogBanner } from "@/lib/api/requests";

export const BlogEditor = () => {
  const { accessToken } = useAuthStore();
  const { blogData, setBlogData } = useEditorContext();

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
      uploadBlogBanner(accessToken!, img)
        .then(({ response, data }) => {
          toast.success(response as string, { id: "upload-success" });
          setBlogData({ ...blogData, bannerUrl: data?.bannerUrl as string });
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

  return (
    <AnimationWrapper keyValue="editor">
      <section className="mx-auto max-w-[800px] w-full">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-8 py-6 border-b mb-8">
          <h1 className="font-medium text-lg line-clamp-2 break-words leading-tight">
            {blogData.title.trim().length ? (
              blogData.title
            ) : (
              <span className="text-sky-700 font-semibold">New Blog</span>
            )}
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-8 shrink-0">
            <button className="py-1.5 px-6 hover:opacity-80 rounded-full bg-green-700 transition text-white cursor-pointer">
              Publish
            </button>
            <button className="py-1.5 px-6 hover:opacity-80 rounded-full bg-gray-200 text-black cursor-pointer">
              Save Draft
            </button>
          </div>
        </div>
        <div className="relative aspect-video hover:opacity-80 border">
          <label htmlFor="banner" className="cursor-pointer">
            <img
              src={blogData.bannerUrl}
              alt="Blog banner image"
              onError={handleBannerImgError}
              className="w-full h-full object-cover object-center"
            />
            <input
              type="file"
              name="banner"
              id="banner"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleBannerUpload}
            />
          </label>
        </div>

        <textarea
          name="title"
          id="title"
          placeholder="Blog Title"
          className="text-3xl sm:text-4xl placeholder:text-gray-400/40 leading-tight mt-10 resize-none font-medium outline-none w-full h-20 text-gray-800"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          value={blogData.title}
        ></textarea>
      </section>
    </AnimationWrapper>
  );
};
