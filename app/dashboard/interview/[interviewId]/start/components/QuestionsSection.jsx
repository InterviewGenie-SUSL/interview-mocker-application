import React, { useEffect, useState } from "react";
import { Lightbulb, Volume2 } from "lucide-react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  // Use state to track dark mode and update on theme change
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  // Redesigned styles for both dark and light mode
  const mainQuestionStyle = {
    fontSize: "1.3rem",
    color: isDark ? "#f3f4f6" : "#1e293b",
    textAlign: "left",
    margin: "0",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    fontWeight: 700,
    letterSpacing: "0.01em",
    background: isDark
      ? "linear-gradient(90deg, #232946 0%, #18181b 100%)"
      : "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)",
    borderRadius: "14px",
    padding: "22px 28px",
    boxShadow: isDark
      ? "0 2px 16px rgba(49,46,129,0.22)"
      : "0 2px 16px rgba(37,99,235,0.10)",
    marginTop: "18px",
    marginBottom: "10px",
    border: isDark ? "1.5px solid #6366f1" : "1.5px solid #818cf8"
  };

  const volumeIconStyle = {
    cursor: "pointer",
    width: 38,
    height: 38,
    minWidth: 38,
    minHeight: 38,
    maxWidth: 38,
    maxHeight: 38,
    padding: 7,
    borderRadius: "50%",
    background: isDark ? "#6366f1" : "#6366f1",
    color: "#fff",
    boxShadow: isDark
      ? "0 2px 8px rgba(99,102,241,0.22)"
      : "0 2px 8px rgba(99,102,241,0.13)",
    transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: isDark ? "1.5px solid #a5b4fc" : "1.5px solid #818cf8"
  };

  const cardStyle = {
    background: isDark
      ? "linear-gradient(120deg, #18181b 60%, #232946 100%)"
      : "linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)",
    border: isDark ? "1.5px solid #6366f1" : "1.5px solid #c7d2fe",
    borderRadius: "24px",
    boxShadow: isDark
      ? "0 8px 32px rgba(49,46,129,0.22)"
      : "0 8px 32px rgba(99,102,241,0.10)",
    padding: "44px 44px 36px 44px",
    width: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "32px"
  };

  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: "12px"
  };

  const questionButtonStyle = (isActive) => ({
    width: "170px",
    padding: "15px 0",
    border: "none",
    outline: "none",
    borderRadius: "9999px",
    background: isActive
      ? (isDark
        ? "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)"
        : "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)")
      : (isDark ? "#232136" : "#fff"),
    color: isActive ? "#fff" : (isDark ? "#e0e7ff" : "#222"),
    fontWeight: isActive ? 700 : 500,
    fontSize: "1.08rem",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    boxShadow: isActive
      ? (isDark
        ? "0 2px 12px rgba(99,102,241,0.22)"
        : "0 2px 12px rgba(99,102,241,0.13)")
      : (isDark ? "0 0 0 1.5px #6366f1 inset" : "0 0 0 1.5px #c7d2fe inset"),
    transition: "background 0.18s, color 0.18s, font-size 0.18s",
    cursor: "pointer",
    letterSpacing: "0.01em"
  });

  const noteContainerStyle = {
    border: isDark ? "1.5px solid #6366f1" : "1.5px solid #818cf8",
    borderRadius: "16px",
    padding: "20px",
    background: isDark
      ? "linear-gradient(90deg, #232136 60%, #312e81 100%)"
      : "linear-gradient(90deg, #e0e7ff 60%, #f8fafc 100%)",
    marginTop: "0",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  };

  const noteHeaderStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: isDark ? "#a5b4fc" : "#6366f1",
    fontWeight: "bold",
    fontSize: "1.12rem"
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
          style={volumeIconStyle}
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
        <div style={{ color: isDark ? "#a5b4fc" : "#1e40af", fontSize: "1.01rem" }}>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
