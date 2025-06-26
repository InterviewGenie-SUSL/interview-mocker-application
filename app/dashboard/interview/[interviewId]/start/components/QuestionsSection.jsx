import React from "react";
import { Lightbulb } from "lucide-react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  // Fixed-width, left-aligned section
  const sectionContainerStyle = {
    padding: "28px 0",
    maxWidth: "720px",
    marginLeft: "0",
    marginRight: "auto"
  };

  // Flexbox with wrap and fixed width
  const buttonContainerStyle = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    boxShadow: "0 4px 20px rgba(37,99,235,0.07)",
    padding: "24px 24px",
    display: "flex",
    flexWrap: "wrap", 
    gap: "18px",
    marginBottom: "32px",
    width: "720px", 
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "visible"
  };

  const questionButtonStyle = (isActive) => ({
    width: "150px",
    padding: "13px 0",
    border: "none",
    outline: "none",
    borderRadius: "9999px",
    background: isActive ? "#7163eb" : "#f3f4f6",
    color: isActive ? "#fff" : "#374151",
    fontWeight: isActive ? 700 : 500,
    fontSize: isActive ? "1.08rem" : "1rem",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    letterSpacing: "0.03em",
    textTransform: "capitalize",
    cursor: "pointer",
    boxShadow: isActive ? "0 2px 12px rgba(37,99,235,0.10)" : "none",
    transition: "background 0.18s, color 0.18s, font-size 0.18s"
  });

  const mainQuestionStyle = {
    margin: "24px 0 0 0",
    fontSize: "1.15rem",
    color: "#222",
    textAlign: "left",
    maxWidth: "720px"
  };

  const noteContainerStyle = {
    border: "1px solid #93c5fd",
    borderRadius: "12px",
    padding: "20px",
    background: "#dbeafe",
    marginTop: "24px",
    maxWidth: "700px",
    textAlign: "left"
  };

  const noteHeaderStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: "#1d4ed8",
    fontWeight: "bold",
    marginBottom: "8px"
  };

  return (
    <div style={sectionContainerStyle}>
      <div style={buttonContainerStyle}>
        {mockInterviewQuestion.map((question, index) => (
          <button
            key={index}
            style={questionButtonStyle(activeQuestionIndex === index)}
            onClick={() => setActiveQuestionIndex(index)}
          >
            {`Question #${index + 1}`}
          </button>
        ))}
      </div>
      <div style={mainQuestionStyle}>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </div>
      <div style={noteContainerStyle}>
        <div style={noteHeaderStyle}>
          <Lightbulb />
          <strong>Note:</strong>
        </div>
        <div>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "This is a sample note for the question."}
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
