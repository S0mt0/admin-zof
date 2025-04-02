import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

import { navLinks } from "./nav-links";
import { cn } from "@/lib/utils";

export const SideNav = () => {
  const pathname = useLocation().pathname;

  return (
    <nav className="sticky w-full top-4 overflow-y-auto">
      <div className="flex items-center justify-center mb-10">
        <img
          src="/zof-logo.png"
          alt="@logo"
          className="w-14 h-auto object-cover"
        />
      </div>

      <h1 className="px-4 py-3 border-y font-bold text-green-800">Dashboard</h1>

      <ul className="list-none py-3">
        {navLinks.dashboard.map(({ href, icon: Icon, label }, i) => {
          const isActive = href === pathname;

          return (
            <li
              key={i}
              className={cn(
                "p-4 hover:bg-gray-50 transition-colors",
                isActive &&
                  "bg-green-50 border-r-[4px] border-green-600 hover:bg-green-50"
              )}
            >
              <Link to={href} className="flex items-center justify-start gap-2">
                <Icon className="h-4 w-4 text-gray-500" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <h1 className="px-4 py-3 border-y font-bold text-green-800">Settings</h1>
      <ul className="list-none py-3">
        {navLinks.settings.map(({ href, icon: Icon, label }, i) => {
          const isActive = href === pathname;

          return (
            <li
              key={i}
              className={cn(
                "p-4 hover:bg-gray-50 transition-colors",
                isActive &&
                  "bg-green-50 border-r-[4px] border-green-600 hover:bg-green-50"
              )}
            >
              <Link to={href} className="flex items-center justify-start gap-2">
                <Icon className="h-4 w-4 text-gray-500" />
                {label}
              </Link>
            </li>
          );
        })}

        <li className="p-4 hover:bg-gray-50 transition-colors">
          <button className="flex items-center justify-start gap-2 cursor-pointer w-full">
            <LogOut className="h-4 w-4 text-gray-500" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
