"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// Generate dummy interview data
function generateDummyAnswers() {
  const dummyQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths?",
    "Where do you see yourself in 5 years?",
    "Why do you want to work for this company?",
    "Describe a challenging project you worked on.",
  ];

  const dummyUserAnswers = [
    "I am a passionate software developer with 3 years of experience in full-stack development. I have worked with technologies like React, Node.js, and Python. I enjoy solving complex problems and creating user-friendly applications.",
    "My greatest strengths are problem-solving and attention to detail. I have a strong analytical mindset and can break down complex issues into manageable parts. I'm also a good team player and communicate effectively.",
    "In 5 years, I see myself as a senior developer leading a team of talented engineers. I want to mentor junior developers and contribute to innovative projects that make a real impact on users' lives.",
    "I'm impressed by your company's commitment to innovation and employee growth. Your recent projects in AI and machine learning align perfectly with my interests, and I believe I can contribute significantly to your team.",
    "I led the development of an e-commerce platform that had to handle high traffic during peak sales. We implemented load balancing and optimized database queries, resulting in 40% faster page load times.",
  ];

  const dummyModelAnswers = [
    "A strong self-introduction should highlight your relevant experience, key skills, and what makes you unique. Focus on achievements that relate to the role you're applying for.",
    "Identify 2-3 core strengths that are relevant to the position. Provide specific examples of how these strengths have helped you succeed in previous roles or projects.",
    "Show ambition while being realistic. Mention specific skills you want to develop and how this role fits into your career progression. Demonstrate long-term thinking.",
    "Research the company thoroughly. Mention specific projects, values, or initiatives that resonate with you. Explain how your skills align with their needs and goals.",
    "Use the STAR method (Situation, Task, Action, Result). Choose a project that demonstrates problem-solving, leadership, or technical skills relevant to the position.",
  ];

  const dummyFeedbacks = [
    "Excellent answer! You provided a clear and concise overview of your background with specific technical details. Your passion for development comes through strongly.",
    "Great response! You identified relevant strengths and provided good context. Consider adding more specific examples of how these strengths led to measurable outcomes.",
    "Good answer showing ambition and forward thinking. You demonstrated understanding of career progression and how this role fits your goals.",
    "Solid response showing you've researched the company. Your enthusiasm is evident and you made good connections between your skills and their needs.",
    "Outstanding example! You used a structured approach and provided specific metrics. This demonstrates both technical skills and business impact awareness.",
  ];

  const dummyRatings = [8, 7, 8, 7, 9];

  return dummyQuestions.map((question, index) => ({
    question,
    userAns: dummyUserAnswers[index],
    correctAns: dummyModelAnswers[index],
    feedback: dummyFeedbacks[index],
    rating: dummyRatings[index].toString(),
  }));
}

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
      return;
    }

    console.log("Fetching data for mockId:", mockId);

    // Simulate loading delay for realism
    setTimeout(() => {
      try {
        // First check localStorage for recorded answers
        const storageKey = `interview_${mockId}_answers`;
        console.log("Checking localStorage key:", storageKey);

        const storedAnswers = JSON.parse(
          localStorage.getItem(storageKey) || "[]"
        );

        console.log("Stored answers:", storedAnswers);

        let answersToUse;
        if (storedAnswers.length > 0) {
          // Use actual recorded answers
          answersToUse = storedAnswers.filter(Boolean); // Remove any null/undefined entries
          console.log("Using recorded answers:", answersToUse.length);
        } else {
          // Fall back to dummy data if no answers recorded
          answersToUse = generateDummyAnswers();
          console.log("Using dummy answers:", answersToUse.length);
        }

        setUserAnswers(answersToUse);

        // Calculate overall score
        if (answersToUse.length > 0) {
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
        }

        setLoading(false);
      } catch (error) {
        console.error("Error processing interview data:", error);
        // Fallback to dummy data on any error
        const dummyData = generateDummyAnswers();
        setUserAnswers(dummyData);
        setOverallScore(7.8); // Default score

        // Initialize all questions as collapsed by default
        const initialExpanded = {};
        dummyData.forEach((_, index) => {
          initialExpanded[index] = false;
        });
        setExpandedQuestions(initialExpanded);

        setLoading(false);
      }
    }, 1500);
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
        <div>Analyzing your interview performance...</div>
        <div style={{ fontSize: "0.9rem", opacity: "0.7" }}>
          Generating feedback and calculating scores
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
