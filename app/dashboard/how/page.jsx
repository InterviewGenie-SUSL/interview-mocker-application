"use client";
import React from "react";
import { FaVideo, FaClipboardCheck, FaChartLine } from "react-icons/fa";

function HowItWorksPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">How It Works</h1>
      <p className="text-gray-600 mb-8">
        Get started with AI-powered mock interviews in three simple steps
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <FaVideo className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">1. Start an Interview</h2>
          <p className="text-gray-600">
            Choose your desired role and technology stack to begin a
            personalized mock interview.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <FaClipboardCheck className="text-green-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">2. Answer Questions</h2>
          <p className="text-gray-600">
            Respond to AI-generated questions tailored to your experience level
            and chosen role.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <FaChartLine className="text-purple-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold mb-3">3. Get Feedback</h2>
          <p className="text-gray-600">
            Receive detailed AI feedback on your responses and areas for
            improvement.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-3">Pro Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Enable your camera for better feedback on body language and
            presentation
          </li>
          <li>Speak clearly and maintain good pace while answering</li>
          <li>Take time to structure your responses using the STAR method</li>
          <li>
            Review your interview recordings to identify areas for improvement
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HowItWorksPage;
