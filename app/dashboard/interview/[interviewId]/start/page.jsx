"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import QuestionsSection from "./components/QuestionsSection";

// Dynamically import RecordAnswerSection to avoid SSR issues with speech-to-text
const RecordAnswerSection = dynamic(
  () => import("./components/RecordAnswerSection"),
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "400px",
        color: "#6b7280",
        fontSize: "1.1rem"
      }}>
        Loading recording interface...
      </div>
    ),
  }
);

function StartInterview() {
  const params = useParams();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        if (result[0]?.jsonMockResp) {
          setMockInterviewQuestion(JSON.parse(result[0].jsonMockResp));
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
  }, [params.interviewId]);

  useEffect(() => {
    if (mockInterviewQuestion && mockInterviewQuestion.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("mockInterviewQuestion", JSON.stringify(mockInterviewQuestion));
    }
  }, [mockInterviewQuestion]);

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
