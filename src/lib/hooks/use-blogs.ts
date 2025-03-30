import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { getAllBlogs } from "../api/public-requests";

export const useBlogs = () => {
  const [draft, setDraft] = useState(false);
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState(title);

  const [blogsData, setBlogsData] = useState<BlogsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTitle(title);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [title]);

  const fetchBlogs = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await getAllBlogs({
          page,
          draft,
          title: debouncedTitle,
          limit: 5,
        }))!;

        setBlogsData(data);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(
            err.response?.data.response ||
              err.message ||
              "An unknown error occurred"
          );
        } else {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [draft, debouncedTitle]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

  useEffect(() => {
    if (debouncedTitle !== title) setCurrentPage(1);
  }, [debouncedTitle, title]);

  return {
    setDraft,
    setTitle,
    blogsData,
    isLoading,
    error,
    title,
    handlePageChange,
  };
};
