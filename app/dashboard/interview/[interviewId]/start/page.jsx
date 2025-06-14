"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Grid } from "lucide-react";
import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";


function StartInterview() {
  const [mockInterviewQuestion] = useState([
    { question: "What is React?" },
    { question: "Explain useState." },
    { question: "What is a component?" },
    { question: "How does useEffect work?" },
    { question: "What is a custom hook?" }
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "48px",
        marginTop: "40px",
        width: "100%",
      }}
    >
      {/* Left: Questions Section */}
      <div style={{ flex: "0 0 700px" }}>
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
      </div>

      {/* Right: Webcam Section */}
      <div style={{ flex: "0 0 400px" }}>
        <RecordAnswerSection />
      </div>
    </div>
  );
}

export default StartInterview;

