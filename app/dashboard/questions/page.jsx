"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Star,
  BookmarkPlus,
  BookmarkCheck,
  Eye,
  Code,
  MessageCircle,
  Settings,
  TrendingUp,
  Award,
  Target,
  Brain,
  Play,
  ChevronRight,
  Zap,
  Trophy,
  Grid3X3,
  List,
  SortAsc,
  HelpCircle,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("browse");

  // Enhanced mock data with more realistic content
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
        "Implement binary search algorithm with time complexity O(log n). Explain your approach and handle edge cases.",
      tags: ["algorithms", "searching", "arrays"],
      estimatedTime: "30 min",
      successRate: 78,
    },
    {
      id: 2,
      title: "Tell me about a challenging project",
      category: "behavioral",
      difficulty: "easy",
      date: "2025-06-15",
      likes: 189,
      views: 890,
      description:
        "Describe a situation where you demonstrated leadership skills and overcame significant challenges.",
      tags: ["leadership", "problem-solving", "teamwork"],
      estimatedTime: "15 min",
      successRate: 85,
    },
    {
      id: 3,
      title: "Design Twitter",
      category: "system-design",
      difficulty: "hard",
      date: "2025-06-16",
      likes: 567,
      views: 2300,
      description:
        "Design a scalable Twitter-like social media platform handling millions of users.",
      tags: ["scalability", "architecture", "databases"],
      estimatedTime: "45 min",
      successRate: 62,
    },
    {
      id: 4,
      title: "React Component Lifecycle",
      category: "technical",
      difficulty: "medium",
      date: "2025-06-17",
      likes: 234,
      views: 980,
      description:
        "Explain React component lifecycle methods and when to use each one.",
      tags: ["react", "frontend", "javascript"],
      estimatedTime: "20 min",
      successRate: 72,
    },
    {
      id: 5,
      title: "Handling difficult team members",
      category: "behavioral",
      difficulty: "medium",
      date: "2025-06-18",
      likes: 156,
      views: 654,
      description:
        "How would you handle a situation with an uncooperative team member?",
      tags: ["conflict-resolution", "teamwork", "communication"],
      estimatedTime: "10 min",
      successRate: 68,
    },
    {
      id: 6,
      title: "Design a URL Shortener",
      category: "system-design",
      difficulty: "medium",
      date: "2025-06-19",
      likes: 387,
      views: 1567,
      description:
        "Design a URL shortening service like bit.ly with analytics.",
      tags: ["system-design", "databases", "caching"],
      estimatedTime: "35 min",
      successRate: 71,
    },
  ];

  const categories = [
    {
      name: "technical",
      title: "Technical Questions",
      description: "Data structures, algorithms, and coding problems",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      count: questions.filter((q) => q.category === "technical").length,
    },
    {
      name: "behavioral",
      title: "Behavioral Questions",
      description: "Soft skills, teamwork, and problem-solving scenarios",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
      count: questions.filter((q) => q.category === "behavioral").length,
    },
    {
      name: "system-design",
      title: "System Design",
      description: "Architecture, scalability, and design patterns",
      icon: Settings,
      color: "from-purple-500 to-purple-600",
      count: questions.filter((q) => q.category === "system-design").length,
    },
  ];

  const filteredQuestions = useMemo(() => {
    let filtered = questions.filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        question.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        question.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "all" || question.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "mostLiked":
          return b.likes - a.likes;
        case "mostViewed":
          return b.views - a.views;
        case "hardest":
          const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        case "easiest":
          const easyOrder = { easy: 3, medium: 2, hard: 1 };
          return easyOrder[b.difficulty] - easyOrder[a.difficulty];
        default:
          return 0;
      }
    });
  }, [questions, searchQuery, selectedDifficulty, selectedCategory, sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveView("browse");
  };

  const handleBookmark = (questionId) => {
    setBookmarks((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleStartPractice = (questionId) => {
    console.log(`Starting practice for question ${questionId}`);
    // Navigate to practice page
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="mb-12 text-center space-y-6"
        >
          <motion.h1
            className="mb-4 text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Practice Questions 🧠
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
          >
            Master your interview skills with our comprehensive question bank.
            Practice with real interview questions from top companies.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 mt-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {questions.length}
              </div>
              <div className="text-sm text-gray-500">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {bookmarks.length}
              </div>
              <div className="text-sm text-gray-500">Bookmarked</div>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-yellow-500">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  💡 Pro Tips for Effective Practice
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Start with easy questions to build confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Practice behavioral questions using STAR method</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Time yourself to improve response speed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="p-2 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700">
            {["browse", "bookmarks", "progress"].map((view) => (
              <motion.button
                key={view}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeView === view
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveView(view)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {view === "browse" && <Brain className="inline w-4 h-4 mr-2" />}
                {view === "bookmarks" && (
                  <BookmarkCheck className="inline w-4 h-4 mr-2" />
                )}
                {view === "progress" && (
                  <TrendingUp className="inline w-4 h-4 mr-2" />
                )}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "browse" && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search and Filters */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <input
                        type="text"
                        placeholder="Search questions, topics, or tags..."
                        className="w-full py-4 pl-12 pr-4 transition-colors duration-300 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="px-4 py-4 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
                      >
                        <option value="all">All Levels</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-4 border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
                      >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="mostLiked">Most Liked</option>
                        <option value="mostViewed">Most Viewed</option>
                        <option value="hardest">Hardest</option>
                        <option value="easiest">Easiest</option>
                      </select>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-4 text-white transition-colors duration-300 bg-blue-500 rounded-xl hover:bg-blue-600"
                      >
                        <Filter className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  <Target className="w-6 h-6 text-blue-600" />
                  Question Categories
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => handleCategoryClick(category.name)}
                      className="p-8 bg-white border border-gray-200 shadow-xl cursor-pointer dark:bg-gray-800 rounded-2xl dark:border-gray-700 group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          className={`p-4 rounded-xl bg-gradient-to-br ${category.color}`}
                        >
                          <category.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-2 text-blue-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm font-medium">Explore</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {category.count}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          questions
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Questions List */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    {selectedCategory === "all"
                      ? "All Questions"
                      : categories.find((c) => c.name === selectedCategory)
                          ?.title || "Questions"}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredQuestions.length} question
                    {filteredQuestions.length !== 1 ? "s" : ""} found
                  </span>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl animate-pulse"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="h-6 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                          <div className="h-4 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                          <div className="w-2/3 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                          <div className="flex gap-2">
                            <div className="w-16 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                            <div className="w-20 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {filteredQuestions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-blue-600">
                            {question.title}
                          </h3>
                          <motion.button
                            onClick={() => handleBookmark(question.id)}
                            className="p-2 transition-colors duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {bookmarks.includes(question.id) ? (
                              <BookmarkCheck className="w-5 h-5 text-blue-500" />
                            ) : (
                              <BookmarkPlus className="w-5 h-5 text-gray-400" />
                            )}
                          </motion.button>
                        </div>

                        <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                          {question.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                              question.difficulty
                            )}`}
                          >
                            {question.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {question.estimatedTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm">
                              {question.successRate}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{question.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{question.likes}</span>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => handleStartPractice(question.id)}
                            className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-4 h-4" />
                            Practice
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeView === "bookmarks" && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="py-16 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookmarkCheck className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              </motion.div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                No Bookmarks Yet
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Start bookmarking questions to track your favorites!
              </p>
              <Button
                onClick={() => setActiveView("browse")}
                className="text-white bg-blue-500 hover:bg-blue-600"
              >
                Browse Questions
              </Button>
            </motion.div>
          )}

          {activeView === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="py-16 text-center"
            >
              <div>
                <Award className="w-24 h-24 mx-auto mb-4 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Track Your Progress
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Coming soon! Monitor your interview preparation journey with
                detailed analytics.
              </p>
              <Button
                onClick={() => setActiveView("browse")}
                className="text-white bg-purple-500 hover:bg-purple-600"
              >
                Start Practicing
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default QuestionsPage;
