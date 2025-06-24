"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Lightbulb,
  WebcamIcon,
  Clock,
  User,
  Briefcase,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";

function Interview({ params }) {
  const resolvedParams = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, resolvedParams.interviewId));
      setInterviewData(result[0]);
      // Parse questions from jsonMockResp
      if (result[0]?.jsonMockResp) {
        try {
          setQuestions(JSON.parse(result[0].jsonMockResp));
        } catch (e) {
          setQuestions([]);
        }
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent mb-6"
          />
          <span className="text-xl font-semibold text-blue-700 dark:text-blue-300">
            Loading interview...
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <motion.h1
            className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let's Get Started! 🚀
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Prepare yourself for an amazing interview experience
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Interview Details Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Main Info Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="p-3 bg-blue-100 rounded-full dark:bg-blue-900"
                >
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Interview Details
                </h2>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <User className="flex-shrink-0 w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Job Position
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {interviewData?.jobPosition}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-green-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tech Stack & Description
                    </p>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                      {interviewData?.jobDesc}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <Star className="flex-shrink-0 w-5 h-5 mt-1 text-yellow-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Experience Level
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {interviewData?.jobExperience} years
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="p-8 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl dark:border-yellow-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900"
                >
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
                  Pro Tips
                </h2>
              </div>

              <div className="space-y-4 text-yellow-700 dark:text-yellow-200">
                <motion.p
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="flex-shrink-0 w-4 h-4" />
                  Enable camera and microphone for the best experience
                </motion.p>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="flex-shrink-0 w-4 h-4" />
                  Find a quiet, well-lit space for your interview
                </motion.p>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="flex-shrink-0 w-4 h-4" />
                  Take your time to think before answering
                </motion.p>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="flex-shrink-0 w-4 h-4" />
                  Speak clearly and maintain good posture
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Camera Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-purple-100 rounded-full dark:bg-purple-900"
                >
                  <WebcamIcon className="w-6 h-6 text-purple-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Camera Setup
                </h2>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {webCamEnabled ? (
                    <motion.div
                      key="webcam"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        className="object-cover w-full h-80 rounded-xl"
                        videoConstraints={{
                          width: 1280,
                          height: 720,
                          facingMode: "user",
                        }}
                      />
                      <motion.div
                        className="absolute flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full top-4 right-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        Live
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center bg-gray-100 border-2 border-gray-300 border-dashed h-80 dark:bg-gray-700 rounded-xl dark:border-gray-600"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <WebcamIcon className="w-20 h-20 mb-4 text-gray-400 dark:text-gray-500" />
                      </motion.div>
                      <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
                        Camera disabled. Enable for the best interview
                        experience.
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="px-8 py-3 font-semibold text-white shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl"
                          onClick={() => setWebCamEnabled(true)}
                        >
                          <WebcamIcon className="w-5 h-5 mr-2" />
                          Enable Camera & Microphone
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Ready Check */}
            <motion.div
              variants={cardVariants}
              className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl dark:border-green-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="p-2 bg-green-100 rounded-full dark:bg-green-900"
                >
                  <Clock className="w-5 h-5 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Ready to Start?
                </h3>
              </div>
              <p className="mb-4 text-sm text-green-700 dark:text-green-200">
                Make sure you're comfortable and ready to begin your interview.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle
                  className={`w-4 h-4 ${
                    webCamEnabled ? "text-green-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={
                    webCamEnabled
                      ? "text-green-700 dark:text-green-300"
                      : "text-gray-500"
                  }
                >
                  Camera enabled
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Start Interview Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-12"
        >
          <AnimatePresence>
            {countdown > 0 ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-6xl font-bold text-blue-600"
              >
                {countdown}
              </motion.div>
            ) : isReady ? (
              <motion.div
                key="ready"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-green-600"
              >
                Go! 🎉
              </motion.div>
            ) : (
              <motion.div
                key="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/dashboard/interview/${resolvedParams.interviewId}/start`}
                >
                  <Button
                    size="lg"
                    className="px-12 py-4 text-xl font-bold text-white transition-all duration-300 transform shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 rounded-2xl"
                    onClick={startCountdown}
                  >
                    🚀 Start Interview
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Render Questions Section */}
        {questions && questions.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-blue-700 dark:text-blue-300 text-center">
              Interview Questions
            </h2>
            <ol className="space-y-8">
              {questions.map((q, idx) => (
                <li
                  key={idx}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Q{idx + 1}: {q.question}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-green-700 dark:text-green-400">
                      Answer:
                    </span>{" "}
                    {q.answer}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Interview;
