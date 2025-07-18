"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import QuestionsSection from "./components/QuestionsSection";

// Dynamically import RecordAnswerSection to avoid SSR issues with speech-to-text
const RecordAnswerSection = dynamic(
  () => import("./components/RecordAnswerSection"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#6b7280",
          fontSize: "1.1rem",
        }}
      >
        Loading recording interface...
      </div>
    ),
  }
);

function StartInterview() {
  const params = useParams();
  const router = useRouter();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false); // For demo purposes, set to false
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [interviewStartTime, setInterviewStartTime] = useState(null);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] =
    useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);

  // Timer effect
  useEffect(() => {
    if (interviewStartTime) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - interviewStartTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [interviewStartTime]);

  // Start timer when component mounts
  useEffect(() => {
    if (mockInterviewQuestion.length > 0 && !interviewStartTime) {
      setInterviewStartTime(Date.now());
      setCurrentQuestionStartTime(Date.now());
    }
  }, [mockInterviewQuestion, interviewStartTime]);

  // Track question timing only when active question changes
  useEffect(() => {
    setCurrentQuestionStartTime(Date.now());
  }, [activeQuestionIndex]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        if (result[0]?.jsonMockResp) {
          const allQuestions = JSON.parse(result[0].jsonMockResp);
          setTotalQuestions(allQuestions.length);
          // Limit to 5 questions for free users
          const limitedQuestions = isPro
            ? allQuestions
            : allQuestions.slice(0, 5);
          setMockInterviewQuestion(limitedQuestions);

          // Store questions in localStorage for RecordAnswerSection
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "mockInterviewQuestion",
              JSON.stringify(limitedQuestions)
            );
          }
        } else {
          setMockInterviewQuestion([]);
        }
      } catch (e) {
        setMockInterviewQuestion([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [params.interviewId, isPro]);

  useEffect(() => {
    if (
      mockInterviewQuestion &&
      mockInterviewQuestion.length > 0 &&
      typeof window !== "undefined"
    ) {
      localStorage.setItem(
        "mockInterviewQuestion",
        JSON.stringify(mockInterviewQuestion)
      );
    }
  }, [mockInterviewQuestion]);

  useEffect(() => {
    // When the active question changes, set the start time for the new question
    setCurrentQuestionStartTime(Date.now());
  }, [activeQuestionIndex]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <span style={{ fontSize: 24, color: "#2563eb" }}>
          Loading questions...
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "2px solid #e5e7eb",
            background: "white",
            color: "#374151",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#f9fafb";
            e.target.style.borderColor = "#d1d5db";
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Pro Version Notice */}
      {!isPro && totalQuestions > 5 && (
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              ⭐
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Free Version - Limited to 5 Questions
              </h3>
              <p
                style={{ margin: "0 0 8px 0", fontSize: "14px", opacity: 0.9 }}
              >
                You have {totalQuestions} total questions, but can only access 5
                in the free version. Upgrade to Pro to unlock all{" "}
                {totalQuestions} questions!
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <span>
                  ✅ Available: {mockInterviewQuestion.length} questions
                </span>
                <span>
                  🔒 Locked: {totalQuestions - mockInterviewQuestion.length}{" "}
                  questions
                </span>
              </div>
            </div>
            <button
              onClick={() => window.open("/upgrade", "_blank")}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#f59e0b",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "48px",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {/* Left: Questions Section */}
        <div style={{ flex: "0 0 700px" }}>
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
            isPro={isPro}
            totalQuestions={totalQuestions}
          />
        </div>

        {/* Right: Webcam Section */}
        <div style={{ flex: "0 0 400px" }}>
          <RecordAnswerSection
            activeQuestionIndex={activeQuestionIndex}
            mockInterviewQuestion={mockInterviewQuestion}
            setActiveQuestionIndex={setActiveQuestionIndex}
          />

          {/* Navigation Controls - Below Record Answer Section */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (activeQuestionIndex > 0) {
                    setActiveQuestionIndex(activeQuestionIndex - 1);
                  }
                }}
                disabled={activeQuestionIndex === 0}
                className={`hover-lift flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeQuestionIndex === 0
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-br from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
                }`}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "16px",
                  background:
                    activeQuestionIndex === 0
                      ? "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
                      : "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                  color: activeQuestionIndex === 0 ? "#9ca3af" : "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: activeQuestionIndex === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: activeQuestionIndex === 0 ? 0.6 : 1,
                  boxShadow:
                    activeQuestionIndex === 0
                      ? "none"
                      : "0 4px 15px rgba(107, 114, 128, 0.4)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </button>

              {activeQuestionIndex ===
              (mockInterviewQuestion?.length || 0) - 1 ? (
                <button
                  onClick={() => {
                    // Navigate to finish page
                    router.push(`/dashboard/interview/${params.interviewId}/finish`);
                  }}
                  className="flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all duration-300 hover-lift rounded-2xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L10.5 13.5L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Finish Interview
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (
                      activeQuestionIndex <
                      (mockInterviewQuestion?.length || 0) - 1
                    ) {
                      setActiveQuestionIndex(activeQuestionIndex + 1);
                    }
                  }}
                  disabled={
                    activeQuestionIndex ===
                    (mockInterviewQuestion?.length || 0) - 1
                  }
                  className={`hover-lift flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeQuestionIndex ===
                    (mockInterviewQuestion?.length || 0) - 1
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  }`}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "16px",
                    background:
                      activeQuestionIndex ===
                      (mockInterviewQuestion?.length || 0) - 1
                        ? "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
                        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color:
                      activeQuestionIndex ===
                      (mockInterviewQuestion?.length || 0) - 1
                        ? "#9ca3af"
                        : "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor:
                      activeQuestionIndex ===
                      (mockInterviewQuestion?.length || 0) - 1
                        ? "not-allowed"
                        : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity:
                      activeQuestionIndex ===
                      (mockInterviewQuestion?.length || 0) - 1
                        ? 0.6
                        : 1,
                    boxShadow:
                      activeQuestionIndex ===
                      (mockInterviewQuestion?.length || 0) - 1
                        ? "none"
                        : "0 4px 15px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  Next
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
