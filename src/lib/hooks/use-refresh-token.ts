import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import { useAuthStore } from ".";
import { refreshToken } from "../api/public-requests";

export const useRefreshToken = () => {
  const { setAuth } = useAuthStore();

  const refresh = async () => {
    try {
      const response = await refreshToken();

      const access_token = response.headers["authorization"] as string;
      if (access_token) setAuth(access_token);

      return access_token;
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
