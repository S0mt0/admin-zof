import defaultBannerImg from "../../../assets/default-banner.png";

import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { useEventEditor } from "@/lib/hooks";

export const EventEditor = () => {
  const {
    handleBannerImgError,
    handleBannerUpload,
    handleTitleChange,
    handleTitleKeyDown,
    eventData,
    editorContainerRef,
    handlePublishEvent,
  } = useEventEditor();

  return (
    <AnimationWrapper keyValue="editor">
      <section className="mx-auto max-w-3xl w-full">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-8 py-6 border-b mb-8">
          <h1 className="font-medium text-lg line-clamp-none sm:line-clamp-2 break-words leading-tight">
            {eventData.title.trim().length ? (
              eventData.title
            ) : (
              <span className="text-sky-800 font-semibold">New Event</span>
            )}
          </h1>

          <div className="flex items-center justify-center gap-4 md:gap-8 shrink-0">
            <button
              className="py-1.5 px-6 hover:opacity-80 rounded-full bg-green-700 transition text-white cursor-pointer"
              onClick={() => handlePublishEvent(false)}
            >
              Publish
            </button>
            <button
              className="py-1.5 px-6 hover:opacity-80 rounded-full bg-gray-200 text-black cursor-pointer"
              onClick={() => handlePublishEvent(true)}
            >
              Save Draft
            </button>
          </div>
        </div>

        <div className="relative aspect-video hover:opacity-80 border">
          <label htmlFor="banner" className="cursor-pointer">
            <img
              src={eventData.bannerUrl || defaultBannerImg}
              alt="Event banner image"
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
          placeholder="Event Title"
          className="text-3xl sm:text-4xl placeholder:text-gray-400/40 leading-tight mt-10 resize-none font-medium outline-none w-full h-20 text-gray-800"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          value={eventData.title}
        />

        <hr className="w-full border my-3 opacity-70" />
        <div ref={editorContainerRef} />
      </section>
    </AnimationWrapper>
  );
};
