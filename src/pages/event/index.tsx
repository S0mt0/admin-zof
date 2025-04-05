import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ItemNotFound } from "@/components/ui/item-not-found";
import { getEvent } from "@/lib/api/requests";
import { useDeleteEvent } from "@/lib/hooks";
import { LoadingDots } from "@/components/ui/loading-dots";
import { formatAppDate } from "@/lib/utils";

export const SingleEventPage = () => {
  const eventId = useParams().eventId || "";

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
  });

  const { isPending, mutate } = useDeleteEvent(event?.draft);

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (error || !event) return <ItemNotFound item="Event" />;

  const { bannerUrl, createdAt, title, updatedAt, more_details } = event;

  const publishDate = formatAppDate(createdAt);
  const updateDate = formatAppDate(updatedAt);
  const hasBeenUpdated = createdAt !== updatedAt;
  return (
    <article className="max-w-3xl mx-auto text-sm py-10">
      <div className="my-10 flex items-center justify-end gap-4">
        <button
          className="px-6 h-9 cursor-pointer flex items-center justify-center bg-black text-white hover:bg-red-600 transition rounded-full"
          onClick={() => mutate(event.eventId)}
          disabled={isLoading}
        >
          {isPending ? <LoadingDots /> : "Delete"}
        </button>

        <Link
          to={`/dashboard/events/editor/${event.eventId}`}
          className="px-6 h-9 flex items-center hover:bg-green-700/80 transition justify-center bg-gray-200 text-black rounded-full"
        >
          Edit
        </Link>
      </div>

      <img src={bannerUrl} alt={title} className="aspect-video w-full" />

      <div className="mt-12">
        <h2 className="font-bold text-2xl xs:text-3xl text-gray-800">
          {title}
        </h2>

        <div className="flex items-center gap-3 text-gray-500/75 mt-2">
          <p>
            Published on <span className="underline">{publishDate}</span>
          </p>
          {hasBeenUpdated ? (
            <p>
              <span className="mr-3">.</span>
              Last updated on <span className="underline">{updateDate}</span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="my-12 text-gray-500">{more_details}</div>
    </article>
  );
};
