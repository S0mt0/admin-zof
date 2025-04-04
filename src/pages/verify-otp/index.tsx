import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { PasswordAuthFormWrapper } from "@/components/auth";
import { resendOTP, verifyOTP } from "@/lib/api/requests";
import { LoadingDots } from "@/components/ui/loading-dots";

export const VerifyOTPPage = () => {
  const [cooldown, setCooldown] = useState(0);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const {
    mutate: resendCode,
    isPending: isResending,
    error: resendError,
    isSuccess: isResendSuccess,
  } = useMutation({
    mutationFn: resendOTP,
    onSuccess: () => {
      toast.success("Code sent🎉");
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      navigate("/reset-password");
    },
  });

  const handleSubmit = async () => {
    if (!otp.trim().length)
      return toast.error("Enter the code sent to your email");
    mutate({ rp_code: otp });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (isResendSuccess) setCooldown(30);
  }, [isResendSuccess]);

  return (
    <PasswordAuthFormWrapper error={error || resendError}>
      <p className="text-center text-emerald-400 text-xs mb-4">
        Enter the code that was sent to your email.
      </p>
      <input
        type="email"
        name="email"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="py-1.5 px-4 w-full border focus:outline-none focus:ring focus:ring-amber-500 border-amber-400 shadow-2xl"
      />
      <div className="flex items-center justify-between gap-4 mt-2">
        {cooldown > 0 ? (
          <p className="text-xs text-emerald-400">Resend code in {cooldown}</p>
        ) : (
          <button
            className="text-xs text-emerald-400 cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacitiy-90"
            onClick={() => resendCode()}
            disabled={isResending || isPending || cooldown > 0}
          >
            {isResending ? "Resending..." : "Resend code"}
          </button>
        )}
        <Link
          to="/forgot-password"
          className="text-xs text-yellow-300 underline"
        >
          Wrong email?
        </Link>
      </div>

      <button
        className="w-full mt-4 h-10 flex items-center justify-center bg-amber-600 cursor-pointer transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? <LoadingDots /> : "Verify Code"}
      </button>
    </PasswordAuthFormWrapper>
  );
};
