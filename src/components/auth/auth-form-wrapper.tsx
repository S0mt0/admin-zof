import { Logo } from "@/components/ui/logo";
import { FormError } from "./form-error";

export const PasswordAuthFormWrapper = ({
  error,
  children,
}: {
  error?: string | null | Error;
  children: React.ReactNode | React.ReactElement[];
}) => {
  return (
    <main className="py-10 px-4 flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-green-900 text-white w-full max-w-sm p-4 border-2 border-yellow-300 shadow-2xl relative pt-16 pb-6 px-8">
        <Logo className="absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2" />
        {children}
        <FormError error={error} />
      </div>
    </main>
  );
};
