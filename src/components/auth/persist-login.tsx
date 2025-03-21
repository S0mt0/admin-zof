import { Outlet } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

import { useAuthStore, useRefreshToken } from "@/lib/hooks";
import { LoadingLogo } from "../ui/loading-logo";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { accessToken, trusted_device, isLoggedIn } = useAuthStore();
  const refresh = useRefreshToken();

  // I noticed using `useLayoutEffect` instead of `useEffect helps prevent screen flickering`
  useLayoutEffect(() => {
    const refreshAccess = async () => {
      await refresh();
      setIsLoading(false);
    };

    if (!accessToken && isLoggedIn) {
      refreshAccess();
    } else {
      setIsLoading(false);
    }
  }, [refresh, accessToken, isLoggedIn]);

  return (
    <>
      {!trusted_device ? (
        <Outlet />
      ) : isLoading ? (
        <div className="h-screen text-sm w-full flex flex-col justify-center items-center gap-4">
          <LoadingLogo />
          <span>Please wait...</span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
