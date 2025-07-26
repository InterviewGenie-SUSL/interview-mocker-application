"use client";
import React, { useState } from "react";
import {
  FaVideo,
  FaClipboardCheck,
  FaChartLine,
  FaLightbulb,
  FaClock,
  FaCode,
  FaRocket,
  FaUsers,
  FaBrain,
  FaTrophy,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingActionButton from "../_components/FloatingActionButton";
import AddNewInterview from "../_components/AddNewInterview";

function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const [showAddInterview, setShowAddInterview] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description:
        "Set up your profile with your target role, experience level, and preferred technologies.",
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
      details: [
        "Choose your target job position",
        "Select your experience level",
        "Pick relevant technologies",
        "Set interview preferences",
      ],
    },
    {
      id: 2,
      title: "Start an Interview",
      description:
        "Launch a personalized mock interview tailored to your profile and goals.",
      icon: FaVideo,
      color: "from-blue-500 to-blue-600",
      details: [
        "AI generates relevant questions",
        "Choose interview type (technical/behavioral)",
        "Enable camera and microphone",
        "Real-time environment setup",
      ],
    },
    {
      id: 3,
      title: "Answer Questions",
      description:
        "Respond to AI-generated questions while being recorded for comprehensive analysis.",
      icon: FaClipboardCheck,
      color: "from-green-500 to-green-600",
      details: [
        "Structured interview questions",
        "Real-time video recording",
        "Speech-to-text transcription",
        "Performance tracking",
      ],
    },
    {
      id: 4,
      title: "Get AI Feedback",
      description:
        "Receive detailed analysis on your performance with actionable improvement suggestions.",
      icon: FaChartLine,
      color: "from-orange-500 to-orange-600",
      details: [
        "Detailed performance metrics",
        "Body language analysis",
        "Speech pattern evaluation",
        "Personalized recommendations",
      ],
    },
  ];

  const features = [
    {
      icon: FaClock,
      title: "Smart Timer",
      description:
        "Keep track of your response time with our intelligent timer system that helps you practice giving concise answers.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: FaCode,
      title: "Code Challenge Mode",
      description:
        "Practice technical interviews with our integrated code editor, real-time compilation, and automated testing.",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: FaBrain,
      title: "AI-Powered Insights",
      description:
        "Get intelligent feedback on your responses, body language, and communication skills using advanced AI.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaTrophy,
      title: "Progress Tracking",
      description:
        "Monitor your improvement over time with detailed analytics and performance comparisons.",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const tips = [
    {
      title: "Technical Preparation",
      tips: [
        "Enable your camera for better feedback on body language and presentation",
        "Practice with our code editor for technical interviews",
        "Review data structures and algorithms fundamentals",
        "Use the timer feature to improve response speed",
      ],
    },
    {
      title: "Communication Skills",
      tips: [
        "Speak clearly and maintain good pace while answering",
        "Practice the STAR method for behavioral questions",
        "Maintain eye contact with the camera",
        "Use confident body language and posture",
      ],
    },
    {
      title: "Performance Optimization",
      tips: [
        "Review your interview recordings to identify areas for improvement",
        "Practice with different difficulty levels to gradually improve",
        "Take advantage of AI feedback for targeted skill development",
        "Set up a professional interview environment",
      ],
    },
  ];

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
      >
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaRocket className="w-4 h-4" />
              Master Your Interview Skills
            </motion.div>

            <motion.h1
              className="mb-6 text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              How It Works
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300"
            >
              Get started with AI-powered mock interviews in four simple steps
              and transform your interview performance
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-4 text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                  onClick={() => setShowDemo(true)}
                >
                  <FaPlay className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"

                  className="px-8 py-4 text-blue-600 border-2 border-blue-500 hover:bg-blue-50 rounded-xl"
                  onClick={() => setShowAddInterview(true)}

                >
                  Start Free Trial
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Steps */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
              Your Journey to Interview Success
            </h2>

            {/* Step Navigator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center p-2 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                {steps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeStep === index
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {React.createElement(step.icon, { className: "w-5 h-5" })}
                    <span className="hidden font-medium sm:block">
                      Step {step.id}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Step Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
              >
                {" "}
                <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-br ${steps[activeStep].color}`}
                      >
                        {React.createElement(steps[activeStep].icon, {
                          className: "w-8 h-8 text-white",
                        })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {steps[activeStep].title}
                        </h3>
                        <span className="font-medium text-blue-600">
                          Step {steps[activeStep].id} of 4
                        </span>
                      </div>
                    </div>

                    <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      {steps[activeStep].description}
                    </p>

                    <ul className="space-y-3">
                      {steps[activeStep].details.map((detail, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FaCheckCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {detail}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <motion.div
                      className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {React.createElement(steps[activeStep].icon, {
                        className: "w-24 h-24 text-gray-400",
                      })}
                    </motion.div>
                    <div className="absolute p-2 text-white bg-green-500 rounded-full -top-4 -right-4">
                      <FaCheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
              Powerful Features to Boost Your Performance
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {" "}
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color}`}
                    >
                      {React.createElement(feature.icon, {
                        className: "w-6 h-6 text-white",
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pro Tips Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl dark:border-blue-700">
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 bg-blue-100 rounded-full dark:bg-blue-900"
                >
                  <FaLightbulb className="w-6 h-6 text-blue-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
                  Pro Tips for Success
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {tips.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <motion.li
                          key={tipIndex}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (categoryIndex * 4 + tipIndex) * 0.1,
                          }}
                        >
                          <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {tip}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="p-12 text-white shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl">
              <motion.h2
                className="mb-4 text-4xl font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ready to Ace Your Next Interview?
              </motion.h2>
              <p className="mb-8 text-xl opacity-90">
                Join thousands of successful candidates who've improved their
                interview skills with our platform
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"

                    className="px-8 py-4 font-semibold text-blue-600 bg-white shadow-lg hover:bg-gray-100 rounded-xl bg-gray-100"

                  >
                    <FaRocket className="w-5 h-5 mr-2" />
                    Start Your First Interview
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"

                    className="px-8 py-4 font-semibold text-black border-2 border-white/10 hover:bg-white/10 rounded-xl dark:text-white bg-white/10 dark:bg-transparent"
                    onClick={() => setShowCommunity(true)}

                  >
                    <FaUsers className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Demo Modal */}
          <AnimatePresence>
            {showDemo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowDemo(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                      Community Coming Soon!
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      We're building an amazing community experience. Stay tuned
                      for updates and join us soon!
                    </p>
                    <Button
                      onClick={() => setShowDemo(false)}
                      className="text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
            {showCommunity && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowCommunity(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                      Community Coming Soon!
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      We're building a vibrant community for interview practice and networking. Stay tuned!
                    </p>
                    <Button
                      onClick={() => setShowCommunity(false)}
                      className="text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          <AddNewInterview openDialog={showAddInterview} setOpenDialog={setShowAddInterview} />

        </div>
      </motion.div>
      <FloatingActionButton />
    </>
  );
}

export default HowItWorksPage;
