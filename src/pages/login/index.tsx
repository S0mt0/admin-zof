import { AuthForm } from "@/components/auth";
import { Logo } from "@/components/ui/logo";

export const LoginPage = () => {
  return (
    <main className="py-16 px-8">
      <header className="flex items-center justify-center mb-10">
        <Logo />
      </header>
      <AuthForm type="login" />
    </main>
  );
};
