"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  PlayCircle,
  Edit3,
  Trash2,
  Award,
  Users,
  ChevronRight,
  Star,
  TrendingUp,
  BookOpen,
  Eye,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InterviewCard = ({ interview, index, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const getRandomScore = () => Math.floor(Math.random() * 20) + 80;
  const getRandomDuration = () => Math.floor(Math.random() * 15) + 10;

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="relative overflow-hidden transition-all duration-500 bg-white border border-gray-200 shadow-lg group rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.h3
              className="text-xl font-bold text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-blue-600 line-clamp-2"
              whileHover={{ scale: 1.02 }}
            >
              {interview.jobPosition}
            </motion.h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {interview.jobDesc}
            </p>
          </div>

          {/* Options Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </motion.button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl top-full dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-2">
                    <button className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-colors rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-colors rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(interview.mockId)}
                      className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{interview.jobExperience} years exp</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {(() => {
                // Safely format date, fallback to '-'
                try {
                  if (!interview.createdAt) return "-";
                  const date = new Date(interview.createdAt);
                  if (isNaN(date.getTime())) return "-";
                  return format(date, "MMM dd");
                } catch {
                  return "-";
                }
              })()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Star className="w-4 h-4" />
            <span>{getRandomScore()}% Score</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Clock className="w-4 h-4" />
            <span>{getRandomDuration()} min</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-green-600">Completed</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/dashboard/interview/${interview.mockId}/start`}
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-green-700 rounded-3xl hover:from-green-700 hover:to-green-800 hover:shadow-xl"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Start</span>
            </motion.button>
          </Link>

          <Link
            href={`/dashboard/interview/${interview.mockId}/feedback`}
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute px-3 py-1 text-xs font-bold text-white transition-opacity duration-300 rounded-full opacity-0 top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 group-hover:opacity-100"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.1 + 0.8 }}
      >
        <div className="flex items-center gap-1">
          <Award className="w-3 h-3" />
          <span>Complete</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InterviewList = ({ interviews, onDelete }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (!interviews || interviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
        >
          <BookOpen className="w-12 h-12 text-blue-600" />
        </motion.div>
        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          No interviews yet
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Create your first interview to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {interviews.map((interview, index) => (
        <InterviewCard
          key={interview.mockId}
          interview={interview}
          index={index}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
};

export default InterviewList;
