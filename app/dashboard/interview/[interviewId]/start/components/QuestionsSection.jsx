import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Lightbulb,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Award,
  MessageCircle,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Brain,
  Camera,
  Video,
  VideoOff,
  Download,
  Settings,
  Maximize,
  Minimize,
  RefreshCw,
  Eye,
  EyeOff,
  Palette,
  Filter,
  Monitor,
  Smartphone,
  Tablet,
  MousePointer,
  Crosshair,
  Focus,
  Aperture,
  Sliders,
  Sun,
  Moon,
  Contrast,
  Brightness,
  Star,
} from "lucide-react";

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
  isPro = false,
  totalQuestions = 0,
}) {
  // Add modern CSS animations and styles
  React.useEffect(() => {
    const styleId = "questions-section-animations";

    // Check if style already exists to prevent duplicates
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: 200px 0;
        }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-8px);
        }
        60% {
          transform: translateY(-4px);
        }
      }
      
      @keyframes glow {
        0% {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        50% {
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
        }
        100% {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
      }
      
      .question-card {
        animation: slideInUp 0.8s ease-out;
      }
      
      .question-chip {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .question-chip::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .question-chip:hover::before {
        left: 100%;
      }
      
      .question-chip:hover {
        transform: translateY(-2px) scale(1.05);
      }
      
      .floating-card {
        animation: fadeInScale 0.6s ease-out;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .floating-card:hover {
        transform: translateY(-4px);
      }
      
      .pulse-button {
        animation: glow 2s ease-in-out infinite;
      }
      
      .bounce-icon {
        animation: bounce 2s infinite;
      }
      
      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .glass-morphism {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .question-container {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      .modern-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .modern-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      
      .modern-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 3px;
      }
      
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      }
      
      .neon-glow {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
      }
      
      @media (max-width: 768px) {
        .question-card {
          padding: 12px;
        }
        
        .floating-card {
          padding: 16px;
        }
        
        .webcam-container.size-small {
          width: 150px;
          height: 112px;
        }
        
        .webcam-container.size-medium {
          width: 200px;
          height: 150px;
        }
        
        .webcam-container.size-large {
          width: 250px;
          height: 188px;
        }
        
        .webcam-container.position-topLeft,
        .webcam-container.position-topRight {
          top: 10px;
        }
        
        .webcam-container.position-bottomLeft,
        .webcam-container.position-bottomRight {
          bottom: 10px;
        }
        
        .webcam-container.position-topLeft,
        .webcam-container.position-bottomLeft {
          left: 10px;
        }
        
        .webcam-container.position-topRight,
        .webcam-container.position-bottomRight {
          right: 10px;
        }
        
        .webcam-controls {
          gap: 4px;
          padding: 6px;
        }
        
        .webcam-controls button {
          padding: 4px;
        }
        
        .webcam-status {
          font-size: 10px;
          padding: 2px 6px;
        }
        
        .recording-indicator {
          font-size: 10px;
          padding: 2px 6px;
        }
      }
      
      @media (max-width: 480px) {
        .floating-card {
          padding: 12px;
        }
        
        .question-card {
          padding: 8px;
        }
        
        .webcam-container.size-small {
          width: 120px;
          height: 90px;
        }
        
        .webcam-container.size-medium {
          width: 160px;
          height: 120px;
        }
        
        .webcam-container.size-large {
          width: 200px;
          height: 150px;
        }
      }
      
      /* Enhanced Webcam Styles */
      .webcam-container {
        position: fixed;
        z-index: 1000;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .webcam-container.theme-blue {
        border: 3px solid #3b82f6;
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
      }
      
      .webcam-container.theme-purple {
        border: 3px solid #8b5cf6;
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
      }
      
      .webcam-container.theme-green {
        border: 3px solid #10b981;
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
      }
      
      .webcam-container.theme-red {
        border: 3px solid #ef4444;
        box-shadow: 0 0 30px rgba(239, 68, 68, 0.4);
      }
      
      .webcam-container.theme-gold {
        border: 3px solid #f59e0b;
        box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
      }
      
      .webcam-container.size-small {
        width: 200px;
        height: 150px;
      }
      
      .webcam-container.size-medium {
        width: 300px;
        height: 225px;
      }
      
      .webcam-container.size-large {
        width: 400px;
        height: 300px;
      }
      
      .webcam-container.position-topLeft {
        top: 20px;
        left: 20px;
      }
      
      .webcam-container.position-topRight {
        top: 20px;
        right: 20px;
      }
      
      .webcam-container.position-bottomLeft {
        bottom: 20px;
        left: 20px;
      }
      
      .webcam-container.position-bottomRight {
        bottom: 20px;
        right: 20px;
      }
      
      .webcam-container.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 2000;
        border-radius: 0;
      }
      
      .webcam-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
      }
      
      .webcam-video.filter-sepia {
        filter: sepia(100%);
      }
      
      .webcam-video.filter-grayscale {
        filter: grayscale(100%);
      }
      
      .webcam-video.filter-blur {
        filter: blur(2px);
      }
      
      .webcam-video.filter-vintage {
        filter: sepia(50%) contrast(120%) brightness(90%);
      }
      
      .webcam-controls {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        background: rgba(0, 0, 0, 0.7);
        padding: 8px;
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .webcam-container:hover .webcam-controls {
        opacity: 1;
      }
      
      .webcam-status {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }
      
      .face-detection-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .face-box {
        position: absolute;
        border: 2px solid #10b981;
        border-radius: 8px;
        background: rgba(16, 185, 129, 0.1);
        animation: pulse 2s infinite;
      }
      
      .recording-indicator {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }
      
      .recording-dot {
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      .screenshot-flash {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0;
        pointer-events: none;
        animation: flashEffect 0.3s ease-out;
      }
      
      @keyframes flashEffect {
        0% { opacity: 0; }
        50% { opacity: 0.8; }
        100% { opacity: 0; }
      }
      
      .audio-level-bar {
        transition: width 0.15s ease-out;
      }
      
      .speech-detected {
        animation: fadeInScale 0.3s ease-out;
      }
      
      .recording-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  // Use state to track dark mode and update on theme change
  const [isDark, setIsDark] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentUtterance, setCurrentUtterance] = React.useState(null);

  useEffect(() => {
    // Check for dark mode from multiple sources
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

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => checkDarkMode();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Listen for class changes on document
    const observer = new MutationObserver(() => checkDarkMode());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        checkDarkMode();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const textToSpeech = (text) => {
    if (!text || text.trim() === "") {
      console.warn("No text provided for speech synthesis");
      return;
    }

    if ("speechSynthesis" in window) {
      try {
        if (isPlaying && currentUtterance) {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
          setCurrentUtterance(null);
          return;
        }

        const speech = new window.SpeechSynthesisUtterance(text);
        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 0.8;

        speech.onstart = () => setIsPlaying(true);
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentUtterance(null);
        };
        speech.onerror = (event) => {
          console.error("Speech synthesis error:", event.error);
          setIsPlaying(false);
          setCurrentUtterance(null);
        };

        setCurrentUtterance(speech);
        window.speechSynthesis.speak(speech);
      } catch (error) {
        console.error("Failed to initialize speech synthesis:", error);
        alert("Sorry, there was an error with text-to-speech functionality.");
      }
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const goToNextQuestion = () => {
    if (activeQuestionIndex < (mockInterviewQuestion?.length || 0) - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen p-2 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 sm:p-4 md:p-8 sm:rounded-3xl">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-32 h-32 rounded-full sm:w-48 sm:h-48 md:w-64 md:h-64 top-1/4 left-1/4 bg-gradient-to-r from-blue-200 to-purple-200 opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute w-48 h-48 delay-1000 rounded-full bottom-1/4 right-1/4 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-200 to-pink-200 opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute w-24 h-24 rounded-full sm:w-32 sm:h-32 md:w-48 md:h-48 top-1/2 left-1/2 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-10 blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto rounded-none sm:rounded-3xl">
        {/* Header Section */}
        <div className="p-2 mb-3 sm:p-3 sm:mb-4 floating-card glass-morphism rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-8 h-8 text-white rounded-lg shadow-lg sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 sm:rounded-xl">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold sm:text-lg gradient-text">
                Interview in Progress
              </h1>
              <p className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                <Target className="w-3 h-3" />
                Question {activeQuestionIndex + 1} of{" "}
                {mockInterviewQuestion?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Question Navigation Pills */}
        <div className="p-2 mb-3 sm:p-3 sm:mb-4 floating-card glass-morphism rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80">
          <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
            <div className="flex items-center justify-center w-6 h-6 text-white rounded-lg sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-600 sm:rounded-xl">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base dark:text-white">
              Quick Navigation
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {mockInterviewQuestion?.map((question, index) => (
              <button
                key={index}
                onClick={() => setActiveQuestionIndex(index)}
                className={`question-chip relative px-2 py-1 sm:px-3 sm:py-2 min-w-fit rounded-lg sm:rounded-xl font-bold text-xs transition-all duration-300 ${
                  activeQuestionIndex === index
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg neon-glow"
                    : "bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80"
                }`}
              >
                {activeQuestionIndex === index && (
                  <div className="absolute inset-0 rounded-lg opacity-75 bg-gradient-to-br from-blue-400 to-purple-500 sm:rounded-xl blur animate-pulse"></div>
                )}
                <span className="relative z-10">Question #{index + 1}</span>
                {activeQuestionIndex === index && (
                  <div className="absolute flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full -top-0.5 -right-0.5"></div>
                )}
              </button>
            )) || null}
          </div>

          {/* Pro Version Notice */}
          {!isPro && totalQuestions > 5 && (
            <div className="p-3 mt-4 border sm:p-4 sm:mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-amber-200 dark:border-amber-700">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg sm:w-8 sm:h-8 bg-amber-100 dark:bg-amber-900">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold sm:text-sm text-amber-800 dark:text-amber-300">
                    Free Version - Limited Questions
                  </h3>
                  <p className="mt-1 text-xs text-amber-700 dark:text-amber-200">
                    Showing {mockInterviewQuestion?.length || 0} of{" "}
                    {totalQuestions} questions.
                    <span className="font-medium"> Upgrade to Pro</span> to
                    access all questions!
                  </p>
                </div>
                <button
                  onClick={() => window.open("/upgrade", "_blank")}
                  className="flex-shrink-0 px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 hover:scale-105"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Question Card */}
        <div className="p-4 mb-4 shadow-2xl sm:p-6 sm:mb-6 md:p-8 floating-card question-container rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-gray-800/90">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-center w-10 h-10 text-white sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 sm:text-xl dark:text-white">
                  Current Question
                </h3>
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-300">
                  Take your time to think through your answer
                </p>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  textToSpeech(
                    mockInterviewQuestion?.[activeQuestionIndex]?.question
                  )
                }
                className={`hover-lift flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl text-white transition-all duration-300 ${
                  isPlaying
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 border border-gray-200 sm:p-6 md:p-8 question-text-container bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl dark:border-gray-600">
            <p className="text-base font-medium leading-relaxed text-gray-800 sm:text-lg md:text-xl dark:text-gray-100">
              {mockInterviewQuestion?.[activeQuestionIndex]?.question ||
                "No question available"}
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-3 mb-4 sm:p-4 sm:mb-6 md:p-6 floating-card glass-morphism rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-gray-800/80">
          <div className="flex items-center gap-3 mb-3 sm:gap-4 sm:mb-4">
            <div className="flex items-center justify-center w-8 h-8 text-white rounded-lg sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-600 sm:rounded-xl">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-white">
              Pro Tips
            </h2>
          </div>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 mb-2 sm:gap-3">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-800 sm:text-base dark:text-white">
                  Think First
                </h3>
              </div>
              <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                Take a moment to organize your thoughts before answering
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 mb-2 sm:gap-3">
                <MessageCircle className="w-4 h-4 text-green-500 sm:w-5 sm:h-5" />
                <h3 className="text-sm font-semibold text-gray-800 sm:text-base dark:text-white">
                  Be Specific
                </h3>
              </div>
              <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                Use concrete examples and specific details in your answers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionsSection.propTypes = {
  mockInterviewQuestion: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeQuestionIndex: PropTypes.number.isRequired,
  setActiveQuestionIndex: PropTypes.func.isRequired,
  isPro: PropTypes.bool,
  totalQuestions: PropTypes.number,
};

export default QuestionsSection;
