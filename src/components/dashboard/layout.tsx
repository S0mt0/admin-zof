import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { SideNav } from "./side-nav";
import { AnimationWrapper } from "../ui/animation-wrapper";
import { useProfileStore, useUserRequests } from "@/lib/hooks";

export const DashboardLayout = () => {
  const { getProfile } = useUserRequests();
  const { setProfile } = useProfileStore();

  const { error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = (await getProfile())!;
      setProfile(data);
      return data;
    },
  });

  useEffect(() => {
    if (error) {
      const message = isAxiosError(error)
        ? error.response?.data.response || "Network error"
        : error instanceof Error
        ? error.message
        : "Unable to fetch profile. Please refresh your browser.";

      toast.error(message, { id: "profile_error" });
    }
  }, [error]);

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
