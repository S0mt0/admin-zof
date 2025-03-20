import { ReactNode } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

import { useAuthStore } from "@/lib/hooks";

interface RequireAuthProps {
  children?: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { accessToken } = useAuthStore();
  const location = useLocation();

  if (!accessToken)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;

  return children ? children : <Outlet />;
};
