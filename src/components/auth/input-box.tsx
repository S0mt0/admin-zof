import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  type?: string;
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  icon?: LucideIcon;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const InputBox = ({
  id,
  name,
  type = "text",
  value,
  placeholder,
  className,
  icon: Icon,
  onChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderPwdIcon = () => {
    if (type === "password") {
      return (
        <button
          type="button"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600/80 focus:outline-none cursor-pointer"
          onClick={() => setShowPassword((curr) => !curr)}
        >
          {showPassword ? (
            <Eye className="w-4 h-4 text-gray-600/80" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-600/80" />
          )}
        </button>
      );
    }

    return null;
  };

  return (
    <div className="relative mb-4 w-full h-fit">
      {Icon && (
        <Icon className="absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none w-4.5 h-4.5 text-gray-600/80" />
      )}

      <Input
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        className={cn("w-full bg-gray-50", Icon && "pl-10", className)}
      />

      {renderPwdIcon()}
    </div>
  );
};
