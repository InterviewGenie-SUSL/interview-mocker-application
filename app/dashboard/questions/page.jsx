"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Star,
  BookmarkPlus,
  BookmarkCheck,
  Eye,
} from "lucide-react";

function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Replace with actual API calls
  const questions = [
    {
      id: 1,
      title: "Binary Search Implementation",
      category: "technical",
      difficulty: "medium",
      date: "2025-06-14",
      likes: 245,
      views: 1200,
      description:
        "Implement binary search algorithm with time complexity O(log n)",
    },
    {
      id: 2,
      title: "Leadership Experience",
      category: "behavioral",
      difficulty: "easy",
      date: "2025-06-15",
      likes: 189,
      views: 890,
      description:
        "Describe a situation where you demonstrated leadership skills",
    },
    {
      id: 3,
      title: "Design Twitter",
      category: "system-design",
      difficulty: "hard",
      date: "2025-06-16",
      likes: 567,
      views: 2300,
      description: "Design a scalable Twitter-like social media platform",
    },
  ];

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = question.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        question.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "all" || question.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [questions, searchQuery, selectedDifficulty, selectedCategory]);

  const handleCategoryClick = (category) => {
    console.log(`Selected category: ${category}`);
    // Navigate to category-specific page or show modal
  };

  const handleBookmark = (questionId) => {
    setBookmarks((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Practice Questions
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 bg-gray-100 rounded-lg dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Filter className="w-5 h-5 dark:text-white" />
        </button>
      </div>

      {/* Enhanced Search and filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 space-y-4"
      >
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full p-2 pl-10 bg-transparent border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="p-4 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-white">
                Difficulty
              </label>
              <div className="flex gap-2">
                {["all", "easy", "medium", "hard"].map((difficulty) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={difficulty}
                    className={`px-4 py-2 rounded-lg ${
                      selectedDifficulty === difficulty
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-white">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostLiked">Most Liked</option>
                <option value="hardest">Hardest</option>
                <option value="easiest">Easiest</option>
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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
            className="p-6 transition-shadow bg-white border rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <h2 className="mb-3 text-xl font-semibold dark:text-white">
                {category
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Questions
              </h2>
              <span className="px-2 text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-100">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // Loading skeleton
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-48 p-6 bg-gray-100 rounded-lg animate-pulse"
                />
              ))
          : filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{question.title}</h3>
                  <button
                    onClick={() => handleBookmark(question.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {bookmarks.includes(question.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-blue-500" />
                    ) : (
                      <BookmarkPlus className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {question.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      question.difficulty === "easy"
                        ? "bg-green-100 text-green-700"
                        : question.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {question.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{question.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{question.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
}

export default QuestionsPage;
