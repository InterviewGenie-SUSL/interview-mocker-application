"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Settings,
  HelpCircle,
  Zap,
  Target,
  Brain,
  Lightbulb,
  Download,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuickActions = () => {
  const actions = [
    {
      title: "Practice Session",
      description: "Quick 5-minute practice",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      href: "/dashboard/practice",
      popular: true,
    },
    {
      title: "Interview Guide",
      description: "Tips and best practices",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard/guide",
    },
    {
      title: "Video Review",
      description: "Analyze your performance",
      icon: Video,
      color: "from-purple-500 to-pink-500",
      href: "/dashboard/review",
    },
    {
      title: "Question Bank",
      description: "Browse 500+ questions",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      href: "/dashboard/questions",
    },
    {
      title: "Career Goals",
      description: "Set learning objectives",
      icon: Target,
      color: "from-red-500 to-rose-500",
      href: "/dashboard/goals",
    },
    {
      title: "Study Notes",
      description: "Create and organize notes",
      icon: FileText,
      color: "from-indigo-500 to-blue-500",
      href: "/dashboard/notes",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:bg-blue-50"
        >
          View All
        </Button>
      </motion.div>

      {/* Actions Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <Link href={action.href}>
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Popular badge */}
                {action.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full"
                  >
                    Popular
                  </motion.div>
                )}

                {/* Background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white mb-4`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <action.icon className="w-6 h-6" />
                </motion.div>

                {/* Content */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export Results
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
          Share Progress
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          <Bookmark className="w-4 h-4" />
          Save Favorites
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QuickActions;
