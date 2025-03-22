import {
  BookCopy,
  CalendarCheck,
  LockKeyhole,
  UserPen,
  UsersRound,
} from "lucide-react";

export const navLinks = {
  dashboard: [
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      icon: BookCopy,
    },
    {
      label: "Events",
      href: "/dashboard/events",
      icon: CalendarCheck,
    },
    {
      label: "Team",
      href: "/dashboard/team",
      icon: UsersRound,
    },
  ],
  settings: [
    {
      label: "Edit Profile",
      href: "/dashboard/profile",
      icon: UserPen,
    },
    {
      label: "Change Password",
      href: "/dashboard/change-password",
      icon: LockKeyhole,
    },
  ],
};
