import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";

import { getAllBlogs } from "../api/public-requests";

export const useBlogs = () => {
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
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 5,
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

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTitle]);

  return {
    toggleTabs,
    blogsData,
    isLoading,
    title,
    handlePageChange,
    handleTitleChange,
    draft,

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
