/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmail, isStrongPassword } from "validator";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { login, signup } from "../api/requests";
import { useAuthStore, useProfileStore } from "./use-store";

const initPayload = { email: "", password: "" };

export const useAuthForm = (type: "login" | "signup") => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [dto, setDto] = useState<AuthDto>(initPayload);

  const { setAuth } = useAuthStore();
  const { setProfile } = useProfileStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmail(dto.email)) return toast.error("Invalid email");
    if (type === "signup" && !isStrongPassword(dto.password, { minLength: 6 }))
      return toast.error("Password is too weak");

    setIsLoading(true);

    try {
      if (type === "signup") {
        const data = await signup(dto);
        toast.success(data.response as string);
        return navigate("/");
      }

      if (type === "login") {
        const res = await login(dto);

        const access_token = res.headers["authorization"] as string;
        const user = res.data.data as User;

        setAuth(access_token);
        setProfile(user);

        localStorage.setItem("isLoggedIn", "true");
        setDto(initPayload);

        toast.success(res.data.response as string);
        navigate("/dashboard");
      }
    } catch (e: any) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.response?.message || "Network Error");
      } else {
        toast.error(e?.message);
      }

      console.error({ e });
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
