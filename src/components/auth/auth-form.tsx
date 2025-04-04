import { KeyboardIcon, KeyRoundIcon, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// import googleIcon from "../../assets/google-icon.svg";

import { Button } from "@/components/ui/button";
import { AnimationWrapper } from "@/components/ui/animation-wrapper";
import { LoadingDots } from "@/components/ui/loading-dots";
import { useAuthForm } from "@/lib/hooks";
import { InputBox } from "./input-box";
import { Label } from "../ui/label";

export const AuthForm = ({ type = "login" }: { type: "login" | "signup" }) => {
  const {
    handleSubmit,
    isLoading,
    toggleIsTrustedDevice,
    persistLogin,
    dto,
    setDto,
  } = useAuthForm(type);

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl capitalize text-center mb-16 font-gelasio">
            {type === "login" ? "Welcome back" : "Get Started!"}
          </h1>
          <InputBox
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={dto.email}
            onChange={(e) =>
              setDto((curr) => ({ ...curr, email: e.target.value }))
            }
            icon={Mail}
          />
          <InputBox
            id="password"
            type="password"
            name="password"
            placeholder={type === "signup" ? "Password" : "******"}
            value={dto.password}
            onChange={(e) =>
              setDto((curr) => ({ ...curr, password: e.target.value }))
            }
            icon={KeyRoundIcon}
          />
          {type === "signup" && (
            <InputBox
              id="password"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={dto.password}
              onChange={(e) =>
                setDto((curr) => ({
                  ...curr,
                  confirm_password: e.target.value,
                }))
              }
              icon={KeyboardIcon}
            />
          )}

          {type === "login" && (
            <div className="my-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="trust_device"
                  id="trust-device"
                  checked={persistLogin}
                  onChange={toggleIsTrustedDevice}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor="trust-device"
                  className="cursor-default text-xs"
                >
                  Stay Logged In
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Button
            className="cursor-pointer rounded-full w-full mt-4"
            type="submit"
          >
            {isLoading ? (
              <LoadingDots />
            ) : type === "login" ? (
              "Log In"
            ) : (
              "Register"
            )}
          </Button>
          {/* <div className="relative w-full my-6 flex opacity-10 uppercase font-bold gap-2 items-center justify-center">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <Button
            className="cursor-pointer rounded-full w-full capitalize"
            type="button"
          >
            <img src={googleIcon} alt="google" className="w-5 h-auto" />{" "}
            continue with google
          </Button> */}

          {type === "login" ? (
            <p className="text-xs text-center mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="underline font-bold cursor-pointer hover:opacity-80"
              >
                Register Now
              </Link>
            </p>
          ) : (
            <p className="text-xs text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="underline font-bold cursor-pointer hover:opacity-80"
              >
                Login
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};
