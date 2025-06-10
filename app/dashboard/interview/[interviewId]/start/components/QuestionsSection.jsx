import React from "react";
import { Lightbulb, Volume2 } from "lucide-react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const cardStyle = {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    boxShadow: "0 4px 20px rgba(37,99,235,0.07)",
    padding: "32px 32px 24px 32px",
    width: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  };

  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  };

  const questionButtonStyle = (isActive) => ({
    width: "150px",
    padding: "12px 0",
    border: "none",
    outline: "none",
    borderRadius: "9999px",
    backgroundColor: isActive ? "#2563eb" : "#fff",
    color: isActive ? "#fff" : "#222",
    fontWeight: isActive ? 700 : 500,
    fontSize: "1rem",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    boxShadow: isActive
      ? "0 2px 12px rgba(37,99,235,0.10)"
      : "0 0 0 1px #e5e7eb inset",
    transition: "background 0.18s, color 0.18s, font-size 0.18s",
    cursor: "pointer"
  });

  const mainQuestionStyle = {
    fontSize: "1.12rem",
    color: "#222",
    textAlign: "left",
    margin: "0",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  };

  const noteContainerStyle = {
    border: "1px solid #93c5fd",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#dbeafe",
    marginTop: "0",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  };

  const noteHeaderStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    color: "#1d4ed8",
    fontWeight: "bold"
  };

  return (
    <div style={cardStyle}>
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
        <Volume2
          style={{ cursor: "pointer" }}
          aria-label="Read aloud"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
      </div>
      <div style={noteContainerStyle}>
        <div style={noteHeaderStyle}>
          <Lightbulb />
          <strong>Note:</strong>
        </div>
        <div style={{ color: "#1e40af", fontSize: "0.97rem" }}>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
