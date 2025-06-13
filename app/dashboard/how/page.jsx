"use client";
import React from "react";
import { FaVideo, FaClipboardCheck, FaChartLine, FaLightbulb, FaClock, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

function HowItWorksPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl font-bold mb-4"
        variants={itemVariants}
      >
        How It Works
      </motion.h1>
      <motion.p 
        className="text-gray-600 mb-8"
        variants={itemVariants}
      >
        Get started with AI-powered mock interviews in three simple steps
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <motion.div 
          className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <FaVideo className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">1. Start an Interview</h2>
          <p className="text-gray-600">
            Choose your desired role and technology stack to begin a
            personalized mock interview.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <FaClipboardCheck className="text-green-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">2. Answer Questions</h2>
          <p className="text-gray-600">
            Respond to AI-generated questions tailored to your experience level
            and chosen role.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <FaChartLine className="text-purple-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">3. Get Feedback</h2>
          <p className="text-gray-600">
            Receive detailed AI feedback on your responses and areas for
            improvement.
          </p>
        </motion.div>
      </motion.div>

      {/* New Features Section */}
      <motion.div 
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        <motion.div 
          className="p-6 bg-yellow-50 rounded-lg border border-yellow-100"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <FaClock className="mr-2 text-yellow-600" />
            Interview Timer
          </h2>
          <p className="text-gray-700 mb-4">
            Keep track of your response time with our built-in timer. Practice giving concise and effective answers within professional time limits.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 bg-green-50 rounded-lg border border-green-100"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <FaCode className="mr-2 text-green-600" />
            Code Challenge Mode
          </h2>
          <p className="text-gray-700 mb-4">
            Practice technical interviews with our integrated code editor and real-time compilation feedback.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FaLightbulb className="mr-2 text-blue-600" />
          Pro Tips
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enable your camera for better feedback on body language and presentation</li>
          <li>Speak clearly and maintain good pace while answering</li>
          <li>Take time to structure your responses using the STAR method</li>
          <li>Review your interview recordings to identify areas for improvement</li>
          <li>Practice with different difficulty levels to gradually improve</li>
          <li>Use the built-in code editor for technical interview preparation</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default HowItWorksPage;
