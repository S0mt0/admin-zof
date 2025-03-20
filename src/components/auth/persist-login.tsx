import { Outlet } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

import { useAuthStore, useRefreshToken } from "@/lib/hooks";

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
        <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-100 font-body">
          <span className="text-xl text-tertiary">Please wait....</span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
