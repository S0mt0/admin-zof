import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import { useAuthStore, useProfileStore } from ".";
import { refreshToken } from "../api/requests";

export const useRefreshToken = () => {
  const { setAuth } = useAuthStore();
  const { setProfile } = useProfileStore();

  const refresh = async () => {
    try {
      const response = await refreshToken();

      const token = response.headers["Authorization"] as string;
      if (token) setAuth(token);

      const profile = response.data?.data;
      if (profile) setProfile(profile);

      return token;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message || "Network error, please try again.";

        toast.error(message, { id: "error" });
      } else {
        toast.error("Network error, please try again.", {
          id: "error",
        });
      }
    }
  };

  return refresh;
};
