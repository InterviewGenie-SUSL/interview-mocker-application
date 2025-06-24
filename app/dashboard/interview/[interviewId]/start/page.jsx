"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Grid } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";

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
