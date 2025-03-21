import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to="/" className={cn(className)}>
      <img src="/zof-logo.png" alt="@zof-logo" className="w-20 h-auto" />
    </Link>
  );
};
