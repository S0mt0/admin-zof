import { cn } from "@/lib/utils";
import { AnimationWrapper } from "./animation-wrapper";
import { LoadingLogo } from "./loading-logo";

export const AppLoader = ({ className }: { className?: string }) => {
  return (
    <AnimationWrapper keyValue="loader">
      <div
        className={cn(
          "h-screen w-full flex flex-col justify-center items-center gap-4 font-indie text-lg",
          className
        )}
      >
        <LoadingLogo />
        <span>Please wait...</span>
      </div>
    </AnimationWrapper>
  );
};
