import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { SideNav } from "./side-nav";
import { AnimationWrapper } from "../ui/animation-wrapper";
import { useAuthStore, useProfileStore } from "@/lib/hooks";
import { getProfile } from "@/lib/api/requests";

export const DashboardLayout = () => {
  const { setProfile } = useProfileStore();
  const { accessToken } = useAuthStore();

  const { error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = (await getProfile(accessToken!))!;
      setProfile(data);
      return data;
    },
  });

  useEffect(() => {
    if (error)
      toast.error("Unable to load profile. Please refresh your browser.", {
        id: "profile_error",
      });
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
