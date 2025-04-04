/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmail, isStrongPassword } from "validator";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { login, signup } from "../api/requests";
import { useAuthStore, useProfileStore } from "./use-store";

const initPayload = { email: "", password: "", confirm_password: "" };

export const useAuthForm = (type: "login" | "signup") => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [dto, setDto] = useState<SignUpDto>(initPayload);

  const { setAuth } = useAuthStore();
  const { setProfile } = useProfileStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmail(dto.email)) return toast.error("Invalid email");
    if (type === "signup" && !isStrongPassword(dto.password, { minLength: 6 }))
      return toast.error("Password is too weak");

    if (type === "signup" && dto.password !== dto.confirm_password)
      return toast.error("Passwords do not match");

    setIsLoading(true);

    try {
      if (type === "signup") {
        const data = await signup(dto);
        toast.success(data.response as string);
        return navigate("/");
      }

      if (type === "login") {
        const res = await login(dto);

        const accessToken = res.headers["authorization"] as string;
        const user = res.data.data as User;

        setAuth(accessToken);
        setProfile(user);

        localStorage.setItem("isLoggedIn", "true");
        setDto(initPayload);

        toast.success(res.data.response as string);
        navigate("/dashboard/blogs?draft=false");
      }
    } catch (e: any) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.response?.message || "Network Error", {
          id: "auth-error",
        });
      } else {
        toast.error(e?.message, { id: "auth-error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [persistLogin, setPersistLogin] = useState(
    !!JSON.parse(localStorage.getItem("trusted_device") || "false") || false
  );

  const toggleIsTrustedDevice = () => {
    setPersistLogin((current) => !current);
  };

  useEffect(() => {
    localStorage.setItem("trusted_device", JSON.stringify(persistLogin));
  }, [persistLogin]);

  return {
    isLoading,
    handleSubmit,
    toggleIsTrustedDevice,
    persistLogin,
    dto,
    setDto,
  };
};
