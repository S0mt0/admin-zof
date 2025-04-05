import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
export const FormError = ({
  error,
  className,
}: {
  error?: string | null | Error;
  className?: string;
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        if (isAxiosError(error)) {
          const response =
            error.response?.data?.response?.message ||
            error.response?.data?.response;

          const message =
            typeof response === "string"
              ? response
              : JSON.stringify(response) || error.message;
          setErrorMessage(message);
        } else {
          setErrorMessage(error.message);
        }
      }
    }
  }, [error]);

  if (!error) return null;

  return (
    <div
      className={cn(
        "mt-6 bg-white/10 border border-red-500 px-4 py-2 text-orange-200 text-sm w-full",
        className
      )}
    >
      {errorMessage}
    </div>
  );
};
