import { Outlet } from "react-router-dom";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { SideNav } from "./side-nav";
import { AnimationWrapper } from "../ui/animation-wrapper";
import { useProfileStore, useUserRequests } from "@/lib/hooks";

export const DashboardLayout = () => {
  const { getProfile } = useUserRequests();
  const { setProfile } = useProfileStore();

  const _setProfile = useCallback(setProfile, [setProfile]);

  useEffect(() => {
    (async () => {
      try {
        const profile = (await getProfile())!;
        _setProfile(profile);
      } catch (err) {
        if (isAxiosError(err)) {
          const message = err.response?.data.response || "Network error";

          toast.error(message, { id: "profile_error" });
        } else {
          toast.error(
            err instanceof Error
              ? err.message
              : "Unable to fetch profile. Please refresh your browser.",
            {
              id: "profile_error",
            }
          );
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_setProfile]);

  return (
    <AnimationWrapper keyValue="dashboard-layout">
      <main className="grid grid-cols-1 md:grid-cols-10">
        <section className="hidden md:block col-span-2 relative md:border-r min-h-screen">
          <SideNav />
        </section>
        <section className="md:col-span-8 p-4">
          <Outlet />
        </section>
      </main>
    </AnimationWrapper>
  );
};
