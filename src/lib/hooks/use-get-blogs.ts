import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllBlogs } from "../api/public-requests";

export const useGetBlogs = () => {
  const [title, setTitle] = useState("");
  const [debouncedTitle] = useDebounceValue(title, 1200);

  const [currentPage, setCurrentPage] = useState(1);
  const [draft, setDraft] = useState(false);

  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", { page: currentPage, title: debouncedTitle, draft }],
    queryFn: () =>
      getAllBlogs({
        page: currentPage,
        title: debouncedTitle,
        draft,
        limit: 5,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  const toggleTabs = (draft: boolean) => {
    setDraft(draft);
  };

  const queryClient = useQueryClient();

  const handleNextPageHover = (nextPage?: number) => {
    if (blogsData && currentPage < blogsData.pagination.totalPages) {
      const page = nextPage || currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ["blogs", { page, title: debouncedTitle, draft }],
        queryFn: () =>
          getAllBlogs({
            page,
            title: debouncedTitle,
            draft,
            limit: 5,
          }),
      });
    }
  };

  // Prefetch the next page when currentPage or blogsData changes
  useEffect(() => {
    const prefetchNextPage = async () => {
      if (blogsData && currentPage < blogsData.pagination.totalPages) {
        await queryClient.prefetchQuery({
          queryKey: [
            "blogs",
            { page: currentPage + 1, title: debouncedTitle, draft },
          ],
          queryFn: () =>
            getAllBlogs({
              page: currentPage + 1,
              title: debouncedTitle,
              draft,
              limit: 5,
            }),
        });
      }
    };

    prefetchNextPage();
  }, [currentPage, blogsData, queryClient, debouncedTitle, draft]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTitle, draft]);

  return {
    toggleTabs,
    blogsData,
    isLoading,
    title,
    handlePageChange,
    handleTitleChange,
    draft,
    handleNextPageHover,

    error: error
      ? isAxiosError(error)
        ? error.response?.data.response ||
          error.message ||
          "An unknown error occurred"
        : error instanceof Error
        ? error.message
        : "An unknown error occurred"
      : null,
  };
};
