import { Link } from "react-router-dom";
import { Edit, Loader2, Search } from "lucide-react";

import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useGetEvents } from "@/lib/hooks";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { cn } from "@/lib/utils";
import { EventPreviewCard } from "./components/event-preview-card";
import { ItemNotFound } from "@/components/ui/item-not-found";

export const EventsPage = () => {
  const {
    eventsData,
    error,
    handlePageChange,
    title,
    isLoading,
    handleTitleChange,
    toggleTabs,
    draft,
    handleNextPageHover,
  } = useGetEvents();

  return (
    <AnimationWrapper keyValue="events">
      <main className="p-2">
        <div className="pt-2">
          <div className="relative w-full max-w-xl">
            <Search className=" w-4.5 h-4.5 text-green-600 absolute left-2 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Search events"
              className="bg-gray-100 rounded-full w-full p-5 px-8 shadow-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="py-4">
            <div className="flex justify-between items-center gap-10 pb-3">
              <h1 className="text-2xl font-bold">Events</h1>
              <Link
                to="editor"
                className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 transition-colors duration-200 rounded-full text-white py-1.5 px-3"
              >
                <Edit className="h-4 w-4" /> Create Event
              </Link>
            </div>
            <div className="border flex">
              <button
                className={cn(
                  "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                  !draft && "bg-gray-50 border-green-600"
                )}
                onClick={() => toggleTabs(false)}
              >
                Published Events
              </button>
              <button
                className={cn(
                  "py-4 px-2 flex-1 shrink-0 cursor-pointer border-b-[3px] border-transparent",
                  draft && "bg-gray-50 border-green-600"
                )}
                onClick={() => toggleTabs(true)}
              >
                Drafts
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </div>
          ) : !error && eventsData && eventsData.events.length ? (
            <>
              {/* Event List */}
              <div className="space-y-4">
                {eventsData.events.map((event, i) => (
                  <EventPreviewCard
                    {...event}
                    index={i + 1}
                    key={event.title}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={eventsData.pagination.page}
                totalPages={eventsData.pagination.totalPages}
                onPageChange={handlePageChange}
                onMouseEnter={handleNextPageHover}
              />
            </>
          ) : (
            <ItemNotFound item="Event posts" />
          )}
        </div>
      </main>
    </AnimationWrapper>
  );
};
