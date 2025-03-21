import { motion } from "framer-motion";

export const LoadingLogo = () => {
  return (
    <motion.div
      animate={{
        scale: [1.1, 0.9, 1.1],
      }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16"
    >
      <img
        src="/zof-logo.png"
        alt="Loading"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};
