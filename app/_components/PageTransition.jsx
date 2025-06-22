"use client";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 50,
    y: 20,
  },
  in: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  out: {
    opacity: 0,
    x: -50,
    y: 20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`w-full ${className}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
