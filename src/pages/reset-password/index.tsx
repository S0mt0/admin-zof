import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { PasswordAuthFormWrapper } from "@/components/auth";
import { resetPassword } from "@/lib/api/requests";
import { LoadingDots } from "@/components/ui/loading-dots";
import { isStrongPassword } from "validator";
import { InputBox } from "@/components/auth/input-box";
import { KeyboardIcon, KeyRoundIcon } from "lucide-react";

export const ResetPasswordPage = () => {
  const [dto, setDto] = useState({ new_password: "", confirm_password: "" });
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Success🎉 Please login now!");
      navigate("/");
    },
  });

  const handleSubmit = () => {
    if (!isStrongPassword(dto.new_password, { minLength: 6 }))
      return toast.error("Password too weak");

    if (dto.new_password !== dto.confirm_password)
      return toast.error("Passwords do not match");

    mutate(dto);
  };

  return (
    <PasswordAuthFormWrapper error={error}>
      <p className="text-center text-emerald-400 text-xs mb-4">
        Almost there🎊 Please choose a new password!
      </p>
      <div className="mb-4">
        <InputBox
          id="new_password"
          type="password"
          name="new_password"
          placeholder="New password"
          value={dto.new_password}
          onChange={(e) =>
            setDto((curr) => ({ ...curr, new_password: e.target.value }))
          }
          className="py-1.5 w-full border focus-visible:outline-none focus-visible:border-none focus-visible:ring-1 focus-visible:ring-amber-500 border-amber-400 shadow-2xl placeholder:text-sm placeholder:text-neutral-400/60 bg-transparent rounded-none px-8"
          icon={KeyRoundIcon}
          iconClassName="text-neutral-200/80"
        />
      </div>
      <div>
        <InputBox
          id="confirm_password"
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          value={dto.confirm_password}
          onChange={(e) =>
            setDto((curr) => ({ ...curr, confirm_password: e.target.value }))
          }
          className="py-1.5 w-full border focus-visible:outline-none focus-visible:border-none focus-visible:ring-1 focus-visible:ring-amber-500 border-amber-400 shadow-2xl placeholder:text-sm placeholder:text-neutral-400/60 bg-transparent rounded-none px-8"
          icon={KeyboardIcon}
          iconClassName="text-neutral-200/80"
        />
      </div>

      <button
        className="w-full mt-4 h-10 flex items-center justify-center bg-amber-600 cursor-pointer transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? <LoadingDots /> : "Submit"}
      </button>
    </PasswordAuthFormWrapper>
  );
};
