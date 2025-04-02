import { Navigate } from "react-router-dom";

import { AuthForm } from "@/components/auth";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/lib/hooks";

export const LoginPage = () => {
  const { accessToken } = useAuthStore();

  if (accessToken) return <Navigate to="/dashboard/blogs" replace />;

  return (
    <main className="py-16 px-8">
      <header className="flex items-center justify-center mb-10">
        <Logo />
      </header>
      <AuthForm type="login" />
    </main>
  );
};
