import { Link } from "react-router-dom";

import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { useDeleteEvent } from "@/lib/hooks";
import { formatAppDate } from "@/lib/utils";

export const EventPreviewCard = ({
  bannerUrl,
  eventId,
  title,
  createdAt,
  draft,
  index,
  desc,
  featured,
}: TEventSnippet & { index: number }) => {
  const publishedDate = formatAppDate(createdAt);

  const { isPending, mutate } = useDeleteEvent(draft);

  return (
    <AnimationWrapper
      transition={{ delay: index * 0.1 }}
      keyValue="event-preview"
    >
      <div className="flex gap-10 border-b mb-6 max-md:px-4 pb-6 items-center">
        {draft ? (
          <h1 className="text-4xl sm:text-7xl font-bold text-gray-300">
            {index < 10 ? "0" + index : index}
          </h1>
        ) : (
          <img
            src={bannerUrl}
            alt="Event Banner Image"
            className="max-md:hidden w-28 h-28 flex-none bg-gray-100 object-cover"
          />
        )}
        <div className="flex flex-col justify-between w-full min-w-[300px]">
          <div>
            {featured && (
              <p className="text-right mr-10">
                <span className="py-1 px-4 rounded-full bg-black text-white text-xs">
                  Featured
                </span>
              </p>
            )}
            <Link
              to={`${eventId}`}
              className="text-xl font-semibold text-gray-800 hover:underline transition-all line-clamp-3 mb-2"
            >
              {title}
            </Link>
            <p className="line-clamp-5 text-gray-600/80 text-sm">
              {draft ? desc : `Published: ${publishedDate}`}
            </p>
          </div>
          <div className="flex gap-6 mt-3">
            <Link
              to={`editor/${eventId}`}
              className="underline hover:opacity-90 hover:no-underline py-2 pr-4"
            >
              Edit
            </Link>
            <button
              onClick={() => mutate(eventId)}
              className="underline hover:opacity-90 hover:no-underline py-2 cursor-pointer text-red-500 disabled:opacity-35"
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};
