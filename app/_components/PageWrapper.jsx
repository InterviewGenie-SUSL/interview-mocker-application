"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PageWrapper = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reduced artificial delay from 300ms to 100ms for faster navigation
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -10,
      scale: 0.99,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeOut", // Changed from "anticipate" for smoother animation
    duration: 0.2, // Reduced from 0.4 for faster transitions
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1, // Reduced from 0.2
      },
    },
  };

  if (isLoading) {
    return (
      <motion.div
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        className="min-h-[200px] flex items-center justify-center" // Reduced min-height for faster loading appearance
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2 animate-spin" />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }} // Reduced from 1.5
            className="text-gray-600 dark:text-gray-300 text-sm"
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
