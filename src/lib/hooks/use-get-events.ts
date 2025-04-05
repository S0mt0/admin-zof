import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllEvents } from "../api/requests";

export const useGetEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get("draft");
  const draft = param ? (param === "true" ? true : false) : false;

  const [title, setTitle] = useState("");
  const [debouncedTitle] = useDebounceValue(title, 1200);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", { page: currentPage, title: debouncedTitle, draft }],
    queryFn: () =>
      getAllEvents({
        page: currentPage,
        title: debouncedTitle,
        limit: 5,
        draft,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  const toggleTabs = (draft: boolean) => {
    setSearchParams({ draft: String(draft) });
  };

  const queryClient = useQueryClient();

  const handleNextPageHover = (nextPage?: number) => {
    if (eventsData && currentPage < eventsData.pagination.totalPages) {
      const page = nextPage || currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ["events", { page, title: debouncedTitle, draft }],
        queryFn: () =>
          getAllEvents({
            page,
            title: debouncedTitle,
            draft,
            limit: 5,
          }),
      });
    }
  };

  // Prefetch the next page when currentPage or eventsData changes
  useEffect(() => {
    const prefetchNextPage = async () => {
      if (eventsData && currentPage < eventsData.pagination.totalPages) {
        await queryClient.prefetchQuery({
          queryKey: [
            "events",
            { page: currentPage + 1, title: debouncedTitle, draft },
          ],
          queryFn: () =>
            getAllEvents({
              page: currentPage + 1,
              title: debouncedTitle,
              limit: 5,
              draft,
            }),
        });
      }
    };

    prefetchNextPage();
  }, [currentPage, eventsData, queryClient, debouncedTitle, draft]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTitle, draft]);

  useEffect(() => {
    if (error) {
      console.error({ error });
      toast.error("Error fetching events", { id: "events-error" });
    }
  }, [error]);

  return {
    toggleTabs,
    eventsData,
    isLoading,
    title,
    handlePageChange,
    handleTitleChange,
    draft,
    handleNextPageHover,
    error,
  };
};
