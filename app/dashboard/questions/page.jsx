"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

function QuestionsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleCategoryClick = (category) => {
    console.log(`Selected category: ${category}`);
    // Navigate to category-specific page or show modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 dark:bg-gray-900"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Practice Questions
        </h1>
      </div>

      {/* Search and filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full p-2 border rounded-lg bg-transparent dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2">
          {["all", "easy", "medium", "hard"].map((difficulty) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={difficulty}
              className={`px-4 py-2 rounded-lg ${
                selectedDifficulty === difficulty
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Categories */}
        {["technical", "behavioral", "system-design"].map((category, index) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleCategoryClick(category)}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">
                {category
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Questions
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 rounded-full">
                {category === "technical"
                  ? "150"
                  : category === "behavioral"
                  ? "75"
                  : "50"}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {category === "technical" &&
                "Data structures, algorithms, and coding problems"}
              {category === "behavioral" &&
                "Soft skills, teamwork, and problem-solving scenarios"}
              {category === "system-design" &&
                "Architecture, scalability, and design patterns"}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default QuestionsPage;
