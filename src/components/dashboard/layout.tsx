import { Outlet } from "react-router-dom";

import { SideNav } from "./side-nav";
import { AnimationWrapper } from "../ui/animation-wrapper";

export const DashboardLayout = () => {
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
