import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import { useAuthStore } from ".";
import { refreshToken } from "../api/requests";

export const useRefreshToken = () => {
  const { setAuth } = useAuthStore();

  const refresh = async () => {
    try {
      const response = await refreshToken();

      const accessToken = response.headers["authorization"] as string;
      if (accessToken) setAuth(accessToken);

      return accessToken;
    } catch (e) {
      if (isAxiosError(e)) {
        const message = e.response?.data.response || "Network error";

        toast.error(message, { id: "error" });
      } else {
        toast.error("Network error", {
          id: "error",
        });
      }
    }
  };

  return refresh;
};
