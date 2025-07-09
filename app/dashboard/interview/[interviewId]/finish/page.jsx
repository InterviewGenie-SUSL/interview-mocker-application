"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

async function fetchUserAnswers(mockId) {
  const res = await fetch(`/api/answers?mockId=${mockId}`);
  if (!res.ok) return [];
  return res.json();
}

export default function FinishInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const mockId = params.interviewId || params.id;
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    if (!mockId) return;
    (async () => {
      const answers = await fetchUserAnswers(mockId);
      setUserAnswers(answers);

      // Calculate overall score
      if (answers.length > 0) {
        const totalScore = answers.reduce((sum, answer) => {
          const rating = parseInt(answer.rating) || 0;
          return sum + rating;
        }, 0);
        const avgScore = Math.round((totalScore / answers.length) * 10) / 10;
        setOverallScore(avgScore);
      }

      setLoading(false);
    })();
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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          fontSize: "1.2rem",
          color: "#6b7280",
        }}
      >
        Loading results...
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
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
        >
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
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              Question {i + 1}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: getScoreColor(parseInt(a.rating) || 0),
                backgroundColor: "#f9fafb",
                padding: "8px 16px",
                borderRadius: "8px",
                border: `2px solid ${getScoreColor(parseInt(a.rating) || 0)}`,
              }}
            >
              {a.rating || "N/A"}/10
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
              Question:
            </div>
            <div
              style={{
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              {a.question}
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
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
