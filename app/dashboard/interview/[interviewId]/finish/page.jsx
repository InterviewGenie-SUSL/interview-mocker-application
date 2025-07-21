"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

async function fetchQuestions(mockId) {
  const res = await fetch(`/api/interview-questions?mockId=${mockId}`);
  if (!res.ok) return [];
  return res.json();
}

async function fetchUserAnswers(mockId) {
  const res = await fetch(`/api/answers?mockId=${mockId}`);
  if (!res.ok) return [];
  return res.json();
}

async function fetchFeedback(userAnswer, correctAnswer) {
  const res = await fetch(`/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userAnswer, correctAnswer })
  });
  if (!res.ok) return { feedback: "No feedback generated.", rating: "1" };
  return res.json();
}

export default function FinishInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const mockId = params.interviewId || params.id;
  const [mergedAnswers, setMergedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // CSS Animation for loading spinner and dropdown icon
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .dropdown-icon {
        transition: all 0.3s ease;
        transform: rotate(0deg);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba(107, 114, 128, 0.1);
      }
      .dropdown-icon.expanded {
        transform: rotate(180deg);
        background-color: rgba(59, 130, 246, 0.2);
      }
      .dropdown-icon:hover {
        background-color: rgba(59, 130, 246, 0.3);
        transform: scale(1.1);
      }
      .dropdown-icon.expanded:hover {
        background-color: rgba(59, 130, 246, 0.3);
        transform: rotate(180deg) scale(1.1);
      }
      .question-content {
        transition: all 0.3s ease;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    if (!mockId) {
      console.error("No mockId found");
      setLoading(false);
      return;
    }

    async function loadInterviewData() {
      try {
        // Fetch questions and user answers
        const [questions, answers] = await Promise.all([
          fetchQuestions(mockId),
          fetchUserAnswers(mockId)
        ]);

        // Merge questions with user answers
        const merged = await Promise.all(
          questions.map(async (q, idx) => {
            const answerObj = answers.find(a => a.question === q.question);
            if (answerObj) {
              return answerObj;
            } else {
              // If no user answer, generate feedback for empty answer
              const feedbackData = await fetchFeedback("", q.answer);
              return {
                question: q.question,
                correctAns: q.answer,
                userAns: "empty answer",
                feedback: feedbackData.feedback,
                rating: feedbackData.rating
              };
            }
          })
        );

        setMergedAnswers(merged);

        // Calculate overall score
        if (merged.length > 0) {
          const totalScore = merged.reduce((sum, answer) => {
            const rating = parseInt(answer.rating) || 0;
            return sum + rating;
          }, 0);
          const avgScore = Math.round((totalScore / merged.length) * 10) / 10;
          setOverallScore(avgScore);
          console.log("Calculated overall score:", avgScore);

          // Initialize all questions as collapsed by default
          const initialExpanded = {};
          merged.forEach((_, index) => {
            initialExpanded[index] = false;
          });
          setExpandedQuestions(initialExpanded);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading interview data:", error);
        setLoading(false);
      }
    }

    loadInterviewData();
  }, [mockId]);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          fontSize: "1.2rem",
          color: "#6b7280",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e5e7eb",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <div>Loading your interview results...</div>
        <div style={{ fontSize: "0.9rem", opacity: "0.7" }}>
          Fetching answers and feedback
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Content for displaying interview results */}
    </div>
  );
}
