"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setActiveQuestionIndex,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { user } = useUser();
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  // Update transcript into userAnswer
  useEffect(() => {
    results.forEach((result) =>
      setUserAnswer((prev) => prev + result.transcript)
    );
  }, [results]);

  // Reset state when question changes
  useEffect(() => {
    setUserAnswer("");
    setSaveSuccess(false);
  }, [activeQuestionIndex]);

  const UpdateUserAnswer = async () => {
    setLoading(true);

    try {
      const question = mockInterviewQuestion[activeQuestionIndex]?.question;
      const correctAns =
        mockInterviewQuestion[activeQuestionIndex]?.answer || "";

      const feedbackPrompt = `Question: ${question}, User Answer: ${userAnswer}, Based on the question and answer, give a rating and feedback (3–5 lines max) in JSON format with fields 'rating' and 'feedback'.`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const raw = result.response.text().replace(/```json|```/g, "");
      const feedback = JSON.parse(raw);

      const response = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question,
        correctAns,
        userAns: userAnswer,
        feedback: feedback.feedback,
        rating: feedback.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (response) {
        toast("Answer saved successfully");
        setSaveSuccess(true);
        setAnswers((prev) => {
          const updated = [...prev];
          updated[activeQuestionIndex] = {
            answer: userAnswer,
            feedback: feedback.feedback,
            rating: feedback.rating,
          };
          return updated;
        });
        setUserAnswer("");
        setResults([]);
      }
    } catch (e) {
      console.error("Save error:", e);
      toast("Error saving answer");
    }

    setLoading(false);
  };

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setTimeout(() => {
        if (userAnswer.length > 5) {
          UpdateUserAnswer();
        } else {
          toast("No valid answer detected");
        }
      }, 500);
    } else {
      setUserAnswer("");
      setSaveSuccess(false);
      startSpeechToText();
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-4"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="text-red-600 flex gap-2 items-center animate-pulse">
            <StopCircle /> Stop Recording...
          </span>
        ) : (
          <span className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </span>
        )}
      </Button>

      {/* Transcript */}
      {userAnswer && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 w-full max-w-xl my-4">
          <div className="font-semibold text-gray-700 mb-1">Transcribed Answer:</div>
          <div className="text-sm text-gray-600 italic">{userAnswer}</div>
        </div>
      )}

      {/* Feedback and Rating */}
      {saveSuccess && answers[activeQuestionIndex] && (
        <div className="bg-green-50 border border-green-400 rounded-xl p-5 my-4 max-w-xl w-full shadow-md">
          <div className="flex justify-between mb-3">
            <h3 className="font-bold text-green-800">🎯 AI Feedback</h3>
            <div className="text-lg font-bold text-green-700">
              {answers[activeQuestionIndex].rating}/10
            </div>
          </div>
          <p className="text-gray-700 italic">{answers[activeQuestionIndex].feedback}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      {saveSuccess && activeQuestionIndex < mockInterviewQuestion.length - 1 && (
        <Button
          className="mt-6 bg-blue-600 text-white rounded-full px-6 py-2"
          onClick={() => {
            setActiveQuestionIndex(activeQuestionIndex + 1);
            setUserAnswer("");
            setSaveSuccess(false);
          }}
        >
          Next Question
        </Button>
      )}

      {saveSuccess && activeQuestionIndex === mockInterviewQuestion.length - 1 && (
        <Button
          className="mt-6 bg-green-600 text-white rounded-full px-6 py-2"
          onClick={() =>
            window.location.href = `/dashboard/interview/${interviewData?.mockId}/finish`
          }
        >
          Finish Interview
        </Button>
      )}
    </div>
  );
};

export default RecordAnswerSection;
