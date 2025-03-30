import { useEffect } from "react";

import { axiosPrivate } from "../api";
import { useRefreshToken } from "./use-refresh-token";
import { useAuthStore } from "./use-store";

export const useAxiosPrivate = () => {
  const { accessToken, setAuth } = useAuthStore();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;

          const token = await refresh().catch(() => null);
          if (!token) return Promise.reject(error);

          setAuth(token);
          const newRequest = {
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: `Bearer ${token}`,
            },
          };

          return axiosPrivate(newRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh, setAuth]);

  return axiosPrivate;
};
