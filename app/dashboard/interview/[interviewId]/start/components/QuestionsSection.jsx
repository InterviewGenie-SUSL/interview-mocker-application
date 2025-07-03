import React, { useEffect, useState } from "react";
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
  Clock,
} from "lucide-react";

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) {
  // Add CSS animations as a style tag
  React.useEffect(() => {
    const styleId = "questions-section-animations";

    // Check if style already exists to prevent duplicates
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .question-button:hover {
        opacity: 0.8;
        transform: translateY(-1px);
      }
      
      .nav-button:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      .timer-button:hover {
        opacity: 0.8;
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
  const [isDark, setIsDark] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setQuestionTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Reset timer when question changes
  useEffect(() => {
    setQuestionTimer(0);
    setIsTimerRunning(false);
  }, [activeQuestionIndex]);

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

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setQuestionTimer(0);
    setIsTimerRunning(false);
  };

  const calculateTotalScore = () => {
    // This is a placeholder calculation - you can implement actual scoring logic
    const totalQuestions = mockInterviewQuestion?.length || 0;
    if (totalQuestions === 0) return 0;

    const completedQuestions = activeQuestionIndex + 1;
    const completionPercentage = (completedQuestions / totalQuestions) * 100;

    // Simple scoring based on completion and time efficiency
    const baseScore = completionPercentage;
    const timeBonus = questionTimer < 120 ? 10 : 0; // Bonus for answering quickly

    return Math.min(100, Math.round(baseScore + timeBonus));
  };

  const finishInterview = () => {
    setIsInterviewFinished(true);
    setShowScore(true);
    setIsTimerRunning(false);
  };

  // Redesigned styles for both dark and light mode
  const mainQuestionStyle = {
    fontSize: "1.25rem",
    color: isDark ? "#f3f4f6" : "#1f2937",
    fontWeight: 600,
    lineHeight: "1.6",
    background: isDark ? "#374151" : "#f9fafb",
    borderRadius: "8px",
    padding: "20px",
    border: isDark ? "1px solid #4b5563" : "1px solid #e5e7eb",
    position: "relative",
  };

  const volumeIconStyle = {
    cursor: "pointer",
    width: 36,
    height: 36,
    padding: 8,
    borderRadius: "8px",
    background: isPlaying
      ? isDark
        ? "#dc2626"
        : "#ef4444"
      : isDark
      ? "#4f46e5"
      : "#6366f1",
    color: "#fff",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    position: "absolute",
    top: "16px",
    right: "16px",
  };

  const navigationButtonStyle = (disabled) => ({
    padding: "10px 20px",
    border: disabled
      ? `1px solid ${isDark ? "#374151" : "#d1d5db"}`
      : `1px solid ${isDark ? "#6366f1" : "#3b82f6"}`,
    borderRadius: "6px",
    background: disabled
      ? isDark
        ? "#374151"
        : "#f3f4f6"
      : isDark
      ? "#6366f1"
      : "#3b82f6",
    color: disabled ? (isDark ? "#6b7280" : "#9ca3af") : "#ffffff",
    fontWeight: 500,
    fontSize: "0.875rem",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
  });

  const navigationButtonHoverStyle = {
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: isDark
      ? "0 8px 24px rgba(99,102,241,0.4), 0 0 0 1px rgba(129,140,248,0.2)"
      : "0 8px 24px rgba(99,102,241,0.25), 0 0 0 1px rgba(129,140,248,0.15)",
  };

  const timerControlStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: isDark ? "#374151" : "#f3f4f6",
    padding: "8px 12px",
    borderRadius: "8px",
    border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
  };

  const timerButtonStyle = {
    padding: "6px",
    border: "none",
    borderRadius: "4px",
    background: isDark ? "#4b5563" : "#e5e7eb",
    color: isDark ? "#e5e7eb" : "#374151",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  };

  const progressBarStyle = {
    width: "100%",
    height: "8px",
    background: isDark ? "#374151" : "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "16px",
  };

  const progressFillStyle = {
    height: "100%",
    background: isDark ? "#6366f1" : "#3b82f6",
    borderRadius: "4px",
    width: `${
      ((activeQuestionIndex + 1) / (mockInterviewQuestion?.length || 1)) * 100
    }%`,
    transition: "width 0.3s ease",
  };

  const cardStyle = {
    background: isDark ? "#1e293b" : "#f8fafc",
    border: isDark ? "1px solid #374151" : "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: isDark
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "24px",
    maxWidth: "800px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    transition: "all 0.3s ease",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: "16px",
  };

  const questionButtonStyle = (isActive) => ({
    minWidth: "120px",
    padding: "8px 16px",
    border: isActive
      ? `2px solid ${isDark ? "#6366f1" : "#3b82f6"}`
      : `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
    borderRadius: "6px",
    background: isActive
      ? isDark
        ? "#6366f1"
        : "#3b82f6"
      : isDark
      ? "#1f2937"
      : "#ffffff",
    color: isActive ? "#ffffff" : isDark ? "#e5e7eb" : "#374151",
    fontWeight: isActive ? 600 : 400,
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
  });

  const noteContainerStyle = {
    border: isDark ? "1px solid #374151" : "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "16px",
    background: isDark ? "#374151" : "#f9fafb",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const noteHeaderStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    color: isDark ? "#a78bfa" : "#6366f1",
    fontWeight: 600,
    fontSize: "0.875rem",
  };

  const finishButtonStyle = {
    padding: "10px 20px",
    border: "1px solid #10b981",
    borderRadius: "6px",
    background: "#10b981",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
  };

  const scoreDisplayStyle = {
    background: "#10b981",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    marginTop: "16px",
    marginBottom: "16px",
    color: "#ffffff",
  };

  const scoreLabelStyle = {
    color: "#ffffff",
    fontSize: "1.125rem",
    fontWeight: 600,
    marginBottom: "8px",
  };

  const scoreTextStyle = {
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "4px",
  };

  return (
    <div style={cardStyle}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: isDark ? "#a78bfa" : "#6366f1",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <BookOpen size={20} />
          <span>
            Question {activeQuestionIndex + 1} of{" "}
            {mockInterviewQuestion?.length || 0}
          </span>
        </div>

        <div style={timerControlStyle}>
          <Clock size={16} color={isDark ? "#a78bfa" : "#6366f1"} />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: isDark ? "#e5e7eb" : "#374151",
              minWidth: "50px",
            }}
          >
            {formatTime(questionTimer)}
          </span>
          <button
            className="timer-button"
            style={timerButtonStyle}
            onClick={isTimerRunning ? pauseTimer : startTimer}
            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
          >
            {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            className="timer-button"
            style={timerButtonStyle}
            onClick={resetTimer}
            title="Reset Timer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={progressBarStyle}>
        <div style={progressFillStyle}></div>
      </div>

      {/* Question Navigation Buttons */}
      <div style={buttonContainerStyle}>
        {mockInterviewQuestion?.map((question, index) => (
          <button
            key={index}
            className="question-button"
            style={questionButtonStyle(activeQuestionIndex === index)}
            onClick={() => setActiveQuestionIndex(index)}
          >
            Q{index + 1}
          </button>
        )) || null}
      </div>

      {/* Main Question Display */}
      <div style={mainQuestionStyle}>
        {mockInterviewQuestion?.[activeQuestionIndex]?.question ||
          "No question available"}
        <button
          style={volumeIconStyle}
          onClick={() =>
            textToSpeech(mockInterviewQuestion?.[activeQuestionIndex]?.question)
          }
          title={isPlaying ? "Stop reading" : "Read aloud"}
        >
          {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          className="nav-button"
          style={navigationButtonStyle(activeQuestionIndex === 0)}
          onClick={goToPreviousQuestion}
          disabled={activeQuestionIndex === 0}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Question Indicators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {Array.from(
            { length: mockInterviewQuestion?.length || 0 },
            (_, i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    i === activeQuestionIndex
                      ? isDark
                        ? "#6366f1"
                        : "#3b82f6"
                      : isDark
                      ? "#374151"
                      : "#d1d5db",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setActiveQuestionIndex(i)}
              />
            )
          )}
        </div>

        {activeQuestionIndex === (mockInterviewQuestion?.length || 0) - 1 &&
        !isInterviewFinished ? (
          <button
            className="nav-button"
            style={finishButtonStyle}
            onClick={finishInterview}
          >
            Finish Interview
          </button>
        ) : (
          <button
            className="nav-button"
            style={navigationButtonStyle(
              activeQuestionIndex === (mockInterviewQuestion?.length || 0) - 1
            )}
            onClick={goToNextQuestion}
            disabled={
              activeQuestionIndex === (mockInterviewQuestion?.length || 0) - 1
            }
          >
            Next
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Score Display */}
      {showScore && (
        <div style={scoreDisplayStyle}>
          <div style={scoreLabelStyle}>Interview Complete!</div>
          <div style={scoreTextStyle}>{calculateTotalScore()}%</div>
          <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Total Score</div>
        </div>
      )}

      {/* Note Section */}
      <div style={noteContainerStyle}>
        <div style={noteHeaderStyle}>
          <Lightbulb size={16} />
          <strong>Note:</strong>
        </div>
        <div
          style={{
            color: isDark ? "#d1d5db" : "#4b5563",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
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
};

export default QuestionsSection;
