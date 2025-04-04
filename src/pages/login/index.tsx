import { Navigate } from "react-router-dom";

import { AuthForm } from "@/components/auth";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/lib/hooks";

export const LoginPage = () => {
  const { accessToken } = useAuthStore();

  if (accessToken) return <Navigate to="/dashboard/blogs" />;

  return (
    <main className="py-10 px-8 flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-full">
        <header className="flex items-center justify-center mb-10">
          <Logo />
        </header>
        <AuthForm type="login" />
      </div>
    </main>
  );
};
