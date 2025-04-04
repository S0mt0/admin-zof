import { useState } from "react";
import { isEmail } from "validator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { PasswordAuthFormWrapper } from "@/components/auth";
import { forgotPassword } from "@/lib/api/requests";
import { LoadingDots } from "@/components/ui/loading-dots";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate("/verify-otp");
    },
  });

  const handleSubmit = async () => {
    if (!isEmail(email)) return toast.error("Invalid email");
    mutate({ email });
  };

  return (
    <PasswordAuthFormWrapper error={error}>
      <p className="text-center text-emerald-400 text-xs mb-4">
        Enter your email to receive a reset code.
      </p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="py-1.5 px-4 w-full border focus:outline-none focus:ring focus:ring-amber-500 border-amber-400 shadow-2xl"
      />

      <button
        className="w-full mt-4 h-10 flex items-center justify-center bg-amber-600 cursor-pointer transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? <LoadingDots /> : "Get Code"}
      </button>
    </PasswordAuthFormWrapper>
  );
};
