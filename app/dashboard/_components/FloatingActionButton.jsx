"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageCircle,
  Settings,
  HelpCircle,
  Zap,
  Video,
  Lightbulb,

} from "lucide-react";
import AddNewInterview from "./AddNewInterview";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const actions = [
    {
      icon: Plus,
      label: "New Interview",
      color: "from-blue-500 to-indigo-500",
      onClick: () => {
        setShowAddDialog(true);
        setIsOpen(false);
      },
    },
    {
      icon: Zap,
      label: "Questions",
      color: "from-yellow-500 to-orange-500",
      onClick: () => {
        window.location.href = "/dashboard/questions";
      },
    },
    {
      icon: Lightbulb,
      label: "Upgrade",
      color: "from-purple-500 to-pink-500",
      onClick: () => {
        window.location.href = "/dashboard/upgrade";
      },
    },
    {
      icon: HelpCircle,
      label: "How it Works?",
      color: "from-green-500 to-emerald-500",
      onClick: () => {
        window.location.href = "/dashboard/how";
      },
    },
  ];

  const buttonVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 45,
      scale: 1.1,
    },
  };

  const menuVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      y: 20,
      opacity: 0,
    },
    open: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-16 right-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.div
                  key={action.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={action.onClick}
                >
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                    {action.label}
                  </span>
                  <div
                    className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg`}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          variants={buttonVariants}
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-shadow duration-300"
        >
          <Plus className="w-7 h-7" />
        </motion.button>

        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* AddNewInterview Dialog */}
      {showAddDialog && (
        <AddNewInterview onClose={() => setShowAddDialog(false)} />
      )}
    </>
  );
};

export default FloatingActionButton;
