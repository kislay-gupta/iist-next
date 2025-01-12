import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGridProps {
  children: ReactNode[];
  className?: string;
  gridClassName?: string;
  isLoading?: boolean;
}

const AnimatedGrid = ({
  children,
  className = "",
  gridClassName = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  isLoading = false,
}: AnimatedGridProps) => {
  return (
    <motion.div
      className={`${gridClassName} ${className}`}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedGrid;
