/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  keyValue?: string;
};
export const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  keyValue,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
