import { X } from "lucide-react";

import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { usePublishBlogForm } from "@/lib/hooks";
import { LoadingDots } from "@/components/ui/loading-dots";

export const PublishForm = () => {
  const {
    setEditorState,
    blogData,
    handleTitleChange,
    handleDescriptionChange,
    handleFeaturedChange,
    descCharLimit,
    handleDescKeyDown,
    handlePublishBlog,
    isPending,
    draftState,
  } = usePublishBlogForm();
  return (
    <AnimationWrapper keyValue="publish-form">
      <section className="relative w-full min-h-screen items-start grid grid-cols-1 lg:grid-cols-2 py-16 lg:gap-4">
        <button
          className="absolute right-6 top-8 cursor-pointer"
          onClick={() => setEditorState("editor")}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="w-full max-w-3xl mx-auto mt-8">
          <p>Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mt-4">
            <img
              src={blogData.bannerUrl}
              alt="Blog banner image"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h1 className="font-medium text-3xl text-gray-700 my-6 line-clamp-2 leading-tight">
            {blogData.title}
          </h1>

          <p className="text-lg text-gray-400 my-6 line-clamp-2 leading-7 font-light break-words">
            {blogData.desc}
          </p>

          <hr className="lg:hidden mt-10" />
        </div>

        {/* form */}
        <div className="lg:pl-4 mt-20">
          <p className="text-gray-400 mb-2">Blog Title:</p>
          <input
            type="text"
            placeholder="Blog title"
            className="bg-neutral-100 py-2 px-4 w-full border rounded-sm"
            defaultValue={blogData.title}
            onChange={handleTitleChange}
          />
          <p className="text-gray-400 mb-2 mt-9">
            A short description about your blog:
          </p>
          <textarea
            placeholder="Blog description"
            className="bg-neutral-100 py-2 px-4 w-full border rounded-sm min-h-14 resize-none max-h-40"
            value={blogData.desc}
            onChange={handleDescriptionChange}
            maxLength={descCharLimit}
            onKeyDown={handleDescKeyDown}
          />
          <p className="text-xs">
            {descCharLimit - blogData.desc.length} characters left
          </p>

          <p className="flex items-center mt-4 gap-2">
            <input
              type="checkbox"
              id="featured"
              onChange={handleFeaturedChange}
              checked={blogData.featured}
            />
            <label htmlFor="featured" className="cursor-pointer">
              Featured
            </label>
          </p>

          <button
            className="h-10 flex items-center justify-center mt-10 rounded-full text-white bg-green-800 hover:bg-green-700 transition cursor-pointer w-32"
            onClick={handlePublishBlog}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingDots />
            ) : draftState ? (
              "Save Draft"
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};
