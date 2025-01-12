import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.8, rotate: 5 }}
      transition={{
        duration: 0.4,
        type: "spring",
        bounce: 0.4,
      }}
    >
      {children}
    </motion.div>
  );
}
