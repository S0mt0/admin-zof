import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const LoadingDots = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-center space-x-1 w-fit",
      containerClassName
    )}
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={cn("w-2 h-2 bg-white rounded-full", className)}
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);
