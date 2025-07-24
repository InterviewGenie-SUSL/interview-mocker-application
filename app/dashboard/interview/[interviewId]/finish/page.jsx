"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";


export default function FinishInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const mockId = params.interviewId || params.id;
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState({});


  // Add CSS animation for loading spinner
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


    console.log("Fetching data for mockId:", mockId);


    async function loadInterviewData() {
      try {
        // First try to get data from the API (database)
        console.log("Fetching answers from database...");
        const response = await fetch(`/api/answers?mockId=${mockId}`);
        let answersToUse = [];


        if (response.ok) {
          const dbAnswers = await response.json();
          console.log("Database answers:", dbAnswers);


          if (dbAnswers && dbAnswers.length > 0) {
            // Convert database format to component format
            answersToUse = dbAnswers.map((answer) => ({
              question: answer.question,
              userAns: answer.userAns,
              correctAns: answer.correctAns,
              feedback: answer.feedback,
              rating: answer.rating,
            }));
            console.log("Using database answers:", answersToUse.length);
          }
        }


        // If no database answers, try localStorage as fallback
        if (answersToUse.length === 0) {
          const storageKey = `interview_${mockId}_answers`;
          console.log("Checking localStorage key:", storageKey);


          const storedAnswers = JSON.parse(
            localStorage.getItem(storageKey) || "[]"
          );


          console.log("Stored answers:", storedAnswers);


          if (storedAnswers.length > 0) {
            // Use actual recorded answers from localStorage
            answersToUse = storedAnswers.filter(Boolean).map((answer) => ({
              question: answer.question,
              userAns: answer.userAns,
              correctAns: answer.correctAns,
              feedback: answer.feedback,
              rating: answer.rating,
            }));
            console.log("Using localStorage answers:", answersToUse.length);
          }
        }


        // If still no answers, show empty state
        if (answersToUse.length === 0) {
          console.log("No answers found for this interview");
          setUserAnswers([]);
          setOverallScore(0);
          setLoading(false);
          return;
        }


        setUserAnswers(answersToUse);


        // Calculate overall score
        const totalScore = answersToUse.reduce((sum, answer) => {
          const rating = parseInt(answer.rating) || 0;
          return sum + rating;
        }, 0);
        const avgScore =
          Math.round((totalScore / answersToUse.length) * 10) / 10;
        setOverallScore(avgScore);
        console.log("Calculated overall score:", avgScore);


        // Initialize all questions as collapsed by default
        const initialExpanded = {};
        answersToUse.forEach((_, index) => {
          initialExpanded[index] = false;
        });
        setExpandedQuestions(initialExpanded);


        setLoading(false);
      } catch (error) {
        console.error("Error loading interview data:", error);
        setUserAnswers([]);
        setOverallScore(0);
        setLoading(false);
      }
    }


    loadInterviewData();
  }, [mockId]);


  const getScoreColor = (score) => {
    if (score >= 8) return "#16a34a"; // Green
    if (score >= 6) return "#ea580c"; // Orange
    if (score >= 4) return "#dc2626"; // Red
    return "#6b7280"; // Gray
  };


  const getOverallFeedback = (score) => {
    if (score >= 8)
      return "Excellent performance! You demonstrated strong knowledge and communication skills.";
    if (score >= 6)
      return "Good job! You showed solid understanding with room for improvement in some areas.";
    if (score >= 4)
      return "Fair performance. Focus on providing more detailed and specific answers.";
    return "Keep practicing! Consider reviewing the topics and providing more comprehensive responses.";
  };


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


  // Show empty state if no answers found
  if (!userAnswers || userAnswers.length === 0) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "48px 32px",
            backgroundColor: "#f9fafb",
            borderRadius: "16px",
            border: "2px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "24px" }}>📝</div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#1f2937",
            }}
          >
            No Interview Data Found
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            It looks like no answers were recorded for this interview session.
            Please complete an interview first to see your results here.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2563eb";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#3b82f6";
            }}
          >
            Return to Dashboard
          </button>
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
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "32px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          color: "white",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "16px",
            margin: "0 0 16px 0",
          }}
        >
          🎉 Interview Complete!
        </h1>
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          {overallScore}/10
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            opacity: "0.9",
            marginBottom: "16px",
          }}
        >
          Overall Score
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "16px",
          }}
        >
          {getOverallFeedback(overallScore)}
        </div>
      </div>


      {/* Individual Questions */}
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          marginBottom: "24px",
          color: "#1f2937",
        }}
      >
        Detailed Results
      </h2>


      {userAnswers.map((a, i) => (
        <div
          key={i}
          style={{
            marginBottom: "32px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          {/* Question Header - Always Visible */}
          <div
            onClick={() => toggleQuestion(i)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px",
              cursor: "pointer",
              backgroundColor: expandedQuestions[i] ? "#f9fafb" : "#ffffff",
              borderBottom: expandedQuestions[i] ? "1px solid #e5e7eb" : "none",
              transition: "background-color 0.2s ease",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "8px",
                }}
              >
                Question {i + 1}
              </div>
              <div
                style={{
                  color: "#6b7280",
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                {a.question}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginLeft: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  color: getScoreColor(parseInt(a.rating) || 0),
                  backgroundColor: "#f9fafb",
                  padding: "8px 16px",
                  borderRadius: "50px",
                  border: `1px solid ${getScoreColor(parseInt(a.rating) || 0)}`,
                  minWidth: "80px",
                  textAlign: "center",
                }}
              >
                {a.rating || "N/A"}/10
              </div>
              <div
                className={`dropdown-icon ${
                  expandedQuestions[i] ? "expanded" : ""
                }`}
                style={{
                  fontSize: "1.2rem",
                  color: expandedQuestions[i] ? "#3b82f6" : "#6b7280",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fill: "currentColor",
                    transition: "all 0.3s ease",
                  }}
                >
                  <path d="M7 10L12 15L17 10H7Z" />
                </svg>
              </div>
            </div>
          </div>


          {/* Question Details - Collapsible */}
          {expandedQuestions[i] && (
            <div
              className="question-content"
              style={{
                padding: "0 24px 24px 24px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Your Answer:
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                    backgroundColor: "#f9fafb",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {a.userAns || "No answer provided"}
                </div>
              </div>


              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Model Answer:
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                    backgroundColor: "#f0f9ff",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e0f2fe",
                  }}
                >
                  {a.correctAns}
                </div>
              </div>


              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #dcfce7",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#166534",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  💡 Feedback:
                </div>
                <div
                  style={{
                    color: "#166534",
                    lineHeight: "1.6",
                  }}
                >
                  {a.feedback || "No feedback available"}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}


      {/* Summary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0f9ff",
            borderRadius: "12px",
            textAlign: "center",
            border: "1px solid #e0f2fe",
          }}
        >
          <div
            style={{ fontSize: "2rem", fontWeight: "700", color: "#1e40af" }}
          >
            {userAnswers.length}
          </div>
          <div style={{ color: "#6b7280" }}>Questions Answered</div>
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0fdf4",
            borderRadius: "12px",
            textAlign: "center",
            border: "1px solid #dcfce7",
          }}
        >
          <div
            style={{ fontSize: "2rem", fontWeight: "700", color: "#16a34a" }}
          >
            {userAnswers.filter((a) => parseInt(a.rating) >= 7).length}
          </div>
          <div style={{ color: "#6b7280" }}>Strong Answers</div>
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fef3c7",
            borderRadius: "12px",
            textAlign: "center",
            border: "1px solid #fde68a",
          }}
        >
          <div
            style={{ fontSize: "2rem", fontWeight: "700", color: "#d97706" }}
          >
            {Math.round(overallScore * 10)}%
          </div>
          <div style={{ color: "#6b7280" }}>Overall Performance</div>
        </div>
      </div>


      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "16px 32px",
            background: "blue",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            fontWeight: "600",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseOut={(e) => (e.target.style.transform = "translateY(0px)")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
