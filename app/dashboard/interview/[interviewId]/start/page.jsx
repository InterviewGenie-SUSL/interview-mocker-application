"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Grid } from "lucide-react";
import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import QuestionsSection from "./components/QuestionsSection";


function ParentComponent() {
  const [mockInterviewQuestion] = useState([
    { question: "What is React?" },
    { question: "Explain useState." },
    { question: "What is a component?" },
    { question: "How does useEffect work?" },
    { question: "What is a custom hook?" }
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    <QuestionsSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
      setActiveQuestionIndex={setActiveQuestionIndex}
    />
  );
}

export default ParentComponent;

