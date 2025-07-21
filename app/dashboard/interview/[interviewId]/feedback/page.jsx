"use client";
import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  Target,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Award,
  Brain,
  Clock,
  User,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Generate dummy feedback data for demonstration
function generateDummyFeedback(mockId) {
  const questions = [
    "Tell me about yourself and your background in software development.",
    "What are your greatest strengths as a developer?",
    "Where do you see yourself in 5 years?",
    "Why do you want to work for this company?",
    "Describe a challenging project you worked on recently.",
  ];

  const userAnswers = [
    "I am a passionate software developer with 3 years of experience in full-stack development. I have worked extensively with React, Node.js, and Python. I enjoy solving complex problems and creating user-friendly applications that make a real difference in people's lives.",
    "My greatest strengths are problem-solving and attention to detail. I have a strong analytical mindset that allows me to break down complex issues into manageable parts. I'm also a collaborative team player and communicate effectively with both technical and non-technical stakeholders.",
    "In 5 years, I see myself as a senior developer leading a team of talented engineers. I want to mentor junior developers and contribute to innovative projects that have a meaningful impact. I'm particularly interested in advancing my skills in AI and machine learning.",
    "I'm impressed by your company's commitment to innovation and employee growth. Your recent projects in AI and sustainable technology align perfectly with my interests and values. I believe my technical skills and passion for learning would be a valuable addition to your team.",
    "I recently led the development of an e-commerce platform that needed to handle high traffic during peak sales periods. We implemented microservices architecture with load balancing and optimized our database queries, resulting in 40% faster page load times and improved user experience.",
  ];

  const modelAnswers = [
    "A strong self-introduction should highlight your relevant experience, key technical skills, and what makes you unique as a developer. Focus on specific achievements and technologies that relate directly to the role you're applying for.",
    "Identify 2-3 core strengths that are most relevant to the position. Provide specific examples of how these strengths have helped you succeed in previous roles or projects. Quantify your impact where possible.",
    "Show ambition while being realistic about your career goals. Mention specific skills you want to develop and how this role fits into your career progression. Demonstrate long-term thinking and commitment to growth.",
    "Research the company thoroughly beforehand. Mention specific projects, values, or initiatives that resonate with you. Explain how your skills and interests align with their mission and current needs.",
    "Use the STAR method (Situation, Task, Action, Result). Choose a project that demonstrates problem-solving, leadership, or technical skills that are relevant to the position. Include specific metrics and outcomes.",
  ];

  const feedbacks = [
    "Excellent introduction! You provided a clear overview of your background with specific technical details. Your passion for development comes through strongly. Consider adding more quantifiable achievements to make an even stronger impression.",
    "Great response! You identified relevant strengths and provided good context for each. The examples you gave demonstrate real-world application. Try to include more specific metrics or outcomes to strengthen your answer further.",
    "Good answer showing ambition and forward-thinking. You demonstrated understanding of career progression and how this role fits your goals. Consider being more specific about the timeline and steps you'll take to achieve these goals.",
    "Solid response showing you've researched the company well. Your enthusiasm is evident and you made good connections between your skills and their needs. Adding more specific examples of how you can contribute would enhance this answer.",
    "Outstanding example! You used a structured approach and provided specific metrics that demonstrate real business impact. This shows both technical competence and business awareness. Excellent use of the STAR method.",
  ];

  const ratings = [8, 7, 6, 7, 9];

  return questions.map((question, index) => ({
    id: index + 1,
    question,
    userAnswer: userAnswers[index],
    modelAnswer: modelAnswers[index],
    feedback: feedbacks[index],
    rating: ratings[index],
  }));
}

export default function FeedbackPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      // Check if document has dark class (common in many apps)
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");

      // Check system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Check localStorage for theme preference
      const savedTheme = localStorage.getItem("theme");

      // Priority: saved theme > dark class > system preference
      if (
        savedTheme === "dark" ||
        hasDarkClass ||
        (savedTheme !== "light" && systemPrefersDark)
      ) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    // Initial check
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => checkDarkMode();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsDark(!isDark);
  };

  useEffect(() => {
    // Add custom styles for both light and dark modes
    const style = document.createElement("style");
    style.textContent = `
      .feedback-container {
        min-height: 100vh;
        transition: all 0.3s ease;
      }
      
      .feedback-container.light {
        background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
      }
      
      .feedback-container.dark {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%);
      }
      
      .feedback-card {
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      
      .feedback-card.light {
        background: rgba(255, 255, 255, 0.95);
      }
      
      .feedback-card.dark {
        background: rgba(30, 30, 50, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
      
      .score-circle {
        background: conic-gradient(from 0deg, #10b981 0deg, #10b981 ${
          (overallScore / 10) * 360
        }deg, #e5e7eb ${(overallScore / 10) * 360}deg);
        animation: scoreAnimation 2s ease-out;
        transition: all 0.3s ease;
      }
      
      .score-circle.dark {
        background: conic-gradient(from 0deg, #10b981 0deg, #10b981 ${
          (overallScore / 10) * 360
        }deg, #374151 ${(overallScore / 10) * 360}deg);
      }
      
      @keyframes scoreAnimation {
        from {
          background: conic-gradient(from 0deg, #10b981 0deg, #10b981 0deg, #e5e7eb 0deg);
        }
      }
      
      .glass-morphism {
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
      }
      
      .glass-morphism.light {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .glass-morphism.dark {
        background: rgba(30, 30, 50, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 12px;
        border-radius: 50%;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .theme-toggle.light {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }
      
      .theme-toggle.dark {
        background: rgba(30, 30, 50, 0.8);
        color: #e5e7eb;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [overallScore, isDark]);

  useEffect(() => {
    if (!resolvedParams.interviewId) {
      console.error("No interview ID found");
      return;
    }

    // Simulate loading delay for realism
    setTimeout(() => {
      try {
        // Check localStorage for recorded answers first
        const storageKey = `interview_${resolvedParams.interviewId}_answers`;
        const storedAnswers = JSON.parse(
          localStorage.getItem(storageKey) || "[]"
        );

        let feedbackToUse;
        if (storedAnswers.length > 0) {
          // Use actual recorded answers and convert them to feedback format
          feedbackToUse = storedAnswers
            .filter(Boolean)
            .map((answer, index) => ({
              id: index + 1,
              question: answer.question || `Question ${index + 1}`,
              userAnswer: answer.userAns || "No answer provided",
              modelAnswer: answer.correctAns || "No model answer available",
              feedback: answer.feedback || "No feedback available",
              rating: parseInt(answer.rating) || 5,
            }));
        } else {
          // Fall back to dummy data
          feedbackToUse = generateDummyFeedback(resolvedParams.interviewId);
        }

        setFeedbackData(feedbackToUse);

        // Calculate overall score
        if (feedbackToUse.length > 0) {
          const totalScore = feedbackToUse.reduce(
            (sum, item) => sum + item.rating,
            0
          );
          const avgScore =
            Math.round((totalScore / feedbackToUse.length) * 10) / 10;
          setOverallScore(avgScore);
        }

        // Initialize all questions as collapsed
        const initialExpanded = {};
        feedbackToUse.forEach((_, index) => {
          initialExpanded[index] = false;
        });
        setExpandedQuestions(initialExpanded);

        setLoading(false);
      } catch (error) {
        console.error("Error loading feedback data:", error);
        setLoading(false);
      }
    }, 1500);
  }, [resolvedParams.interviewId]);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return "from-green-500 to-emerald-600";
    if (score >= 6) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  const getPerformanceMessage = (score) => {
    if (score >= 8) return "Excellent Performance! 🏆";
    if (score >= 6) return "Good Job! 👍";
    return "Keep Practicing! 📚";
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen feedback-container ${
          isDark ? "dark" : "light"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen feedback-container ${isDark ? "dark" : "light"}`}
    >
      {/* Theme Toggle Button */}
      {/* <button
        onClick={toggleTheme}
        className={`theme-toggle ${isDark ? "dark" : "light"}`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button> */}

      <div className="container max-w-6xl p-4 mx-auto sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 rounded-lg glass-morphism ${
                isDark
                  ? "dark text-gray-200 hover:bg-gray-700/30"
                  : "light text-gray-600 hover:bg-white/10"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="text-right">
            <h1
              className={`text-2xl font-bold sm:text-3xl ${
                isDark ? "text-gray-100" : "text-blue-600"
              }`}
            >
              Interview Feedback
            </h1>
            <p className={`${isDark ? "text-gray-300" : "text-gray-400"}`}>
              Detailed analysis of your performance
            </p>
          </div>
        </motion.div>

        {/* Overall Score Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-6 mb-8 feedback-card ${
            isDark ? "dark" : "light"
          } rounded-2xl sm:p-8`}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Score Circle */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-32 h-32 rounded-full score-circle ${
                    isDark ? "dark" : "light"
                  } sm:w-40 sm:h-40`}
                >
                  <div
                    className={`flex items-center justify-center w-24 h-24 rounded-full sm:w-32 sm:h-32 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold sm:text-4xl ${
                          isDark ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {overallScore}
                      </div>
                      <div
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        out of 10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="col-span-2 space-y-4">
              <div>
                <h2
                  className={`text-2xl font-bold sm:text-3xl ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {getPerformanceMessage(overallScore)}
                </h2>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {overallScore >= 8
                    ? "Outstanding performance! You demonstrated excellent knowledge and communication skills across all questions."
                    : overallScore >= 6
                    ? "Good performance overall! You showed solid understanding with some areas for improvement."
                    : "There's room for improvement. Focus on providing more detailed and structured answers."}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                  className={`p-3 rounded-lg ${
                    isDark
                      ? "bg-blue-900/30 border border-blue-700/30"
                      : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-blue-300" : "text-blue-800"
                      }`}
                    >
                      Questions
                    </span>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDark ? "text-blue-200" : "text-blue-900"
                    }`}
                  >
                    {feedbackData.length}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    isDark
                      ? "bg-green-900/30 border border-green-700/30"
                      : "bg-green-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-green-600" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-green-300" : "text-green-800"
                      }`}
                    >
                      Excellent
                    </span>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDark ? "text-green-200" : "text-green-900"
                    }`}
                  >
                    {feedbackData.filter((item) => item.rating >= 8).length}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    isDark
                      ? "bg-yellow-900/30 border border-yellow-700/30"
                      : "bg-yellow-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-yellow-600" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-yellow-300" : "text-yellow-800"
                      }`}
                    >
                      Good
                    </span>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDark ? "text-yellow-200" : "text-yellow-900"
                    }`}
                  >
                    {
                      feedbackData.filter(
                        (item) => item.rating >= 6 && item.rating < 8
                      ).length
                    }
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    isDark
                      ? "bg-red-900/30 border border-red-700/30"
                      : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-red-300" : "text-red-800"
                      }`}
                    >
                      Improve
                    </span>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDark ? "text-red-200" : "text-red-900"
                    }`}
                  >
                    {feedbackData.filter((item) => item.rating < 6).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions and Feedback */}
        <div className="space-y-4">
          {feedbackData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`feedback-card ${
                isDark ? "dark" : "light"
              } rounded-xl`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(index)}
                className={`flex items-center justify-between w-full p-4 text-left transition-all duration-300 sm:p-6 ${
                  isDark ? "hover:bg-gray-700/30" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start flex-1 gap-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg sm:w-10 sm:h-10 ${
                      isDark
                        ? "bg-blue-900/50 border border-blue-700/30"
                        : "bg-blue-100"
                    }`}
                  >
                    <span
                      className={`font-bold sm:text-lg ${
                        isDark ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      {item.id}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`text-sm font-semibold sm:text-base ${
                        isDark ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {item.question}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div
                        className={`flex items-center gap-1 ${getScoreColor(
                          item.rating
                        )}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{item.rating}/10</span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.rating >= 8
                            ? isDark
                              ? "bg-green-900/40 text-green-300 border border-green-700/30"
                              : "bg-green-100 text-green-800"
                            : item.rating >= 6
                            ? isDark
                              ? "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30"
                              : "bg-yellow-100 text-yellow-800"
                            : isDark
                            ? "bg-red-900/40 text-red-300 border border-red-700/30"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.rating >= 8
                          ? "Excellent"
                          : item.rating >= 6
                          ? "Good"
                          : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: expandedQuestions[index] ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4"
                >
                  <ChevronDown
                    className={`w-5 h-5 ${
                      isDark ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedQuestions[index] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`px-4 pb-4 space-y-4 border-t sm:px-6 sm:pb-6 ${
                        isDark ? "border-gray-600" : "border-gray-100"
                      }`}
                    >
                      {/* Your Answer */}
                      <div className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-blue-600" />
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            Your Answer
                          </h4>
                        </div>
                        <div
                          className={`p-4 rounded-lg ${
                            isDark
                              ? "bg-blue-900/20 border border-blue-700/30"
                              : "bg-blue-50"
                          }`}
                        >
                          <p
                            className={`text-sm leading-relaxed ${
                              isDark ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            "{item.userAnswer}"
                          </p>
                        </div>
                      </div>

                      {/* AI Feedback */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-4 h-4 text-purple-600" />
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            AI Feedback
                          </h4>
                        </div>
                        <div
                          className={`p-4 rounded-lg ${
                            isDark
                              ? "bg-purple-900/20 border border-purple-700/30"
                              : "bg-purple-50"
                          }`}
                        >
                          <p
                            className={`text-sm leading-relaxed ${
                              isDark ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {item.feedback}
                          </p>
                        </div>
                      </div>

                      {/* Model Answer */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-gray-100" : "text-gray-800"
                            }`}
                          >
                            Ideal Answer
                          </h4>
                        </div>
                        <div
                          className={`p-4 rounded-lg ${
                            isDark
                              ? "bg-green-900/20 border border-green-700/30"
                              : "bg-green-50"
                          }`}
                        >
                          <p
                            className={`text-sm leading-relaxed ${
                              isDark ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            {item.modelAnswer}
                          </p>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="pt-2">
                        <div
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            isDark
                              ? "bg-gray-800/50 border border-gray-700/30"
                              : "bg-gray-50"
                          }`}
                        >
                          <span
                            className={`font-medium ${
                              isDark ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            Performance Score
                          </span>
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-3 py-1 rounded-full bg-gradient-to-r ${getScoreGradient(
                                item.rating
                              )} text-white font-bold`}
                            >
                              {item.rating}/10
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4 mt-8 sm:flex-row sm:justify-center"
        >
          <Link
            href={`/dashboard/interview/${resolvedParams.interviewId}/start`}
            className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
          >
            <Clock className="w-4 h-4" />
            Retake Interview
          </Link>

          <Link
            href="/dashboard"
            className={`flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-300 border rounded-lg hover:scale-105 ${
              isDark
                ? "text-gray-200 bg-gray-800 border-gray-600 hover:bg-gray-700"
                : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Award className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
