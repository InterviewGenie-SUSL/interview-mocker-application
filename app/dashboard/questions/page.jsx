"use client";
import React from "react";

function QuestionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Practice Questions</h1>
      <p className="text-gray-600 mb-6">
        Browse through our comprehensive collection of interview questions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Technical Questions</h2>
          <p className="text-gray-600">
            Data structures, algorithms, and coding problems
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Behavioral Questions</h2>
          <p className="text-gray-600">
            Soft skills, teamwork, and problem-solving scenarios
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">System Design</h2>
          <p className="text-gray-600">
            Architecture, scalability, and design patterns
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
