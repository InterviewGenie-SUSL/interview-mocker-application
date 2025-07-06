"use client";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Video, VideoOff, MicOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0); // 0-4 for 5 questions
  const [answers, setAnswers] = useState([]); // Store all answers
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const webcamRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update userAnswer only with the latest transcript, not concatenated
  useEffect(() => {
    if (results && results.length > 0) {
      setUserAnswer(results.map((r) => r.transcript).join(" "));
    }
  }, [results]);

  // Save answer to backend
  async function saveAnswer(answer) {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      let questions = [];
      if (typeof window !== "undefined") {
        const questionsRaw = localStorage.getItem("mockInterviewQuestion");
        questions = questionsRaw ? JSON.parse(questionsRaw) : [];
      }
      const currentQ = questions[questionIndex] || {};
      const payload = {
        mockId: interviewId,
        question: currentQ.question || "",
        correctAns: currentQ.answer || "",
        userAns: answer,
        feedback: "",
        rating: "",
        userEmail: "",
        createdAt: new Date().toISOString(),
      };
      console.log("Saving answer payload:", payload);
      const res = await fetch(`/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setAnswers((prev) => {
          const updated = [...prev];
          updated[questionIndex] = answer;
          return updated;
        });
      } else {
        const err = await res.json();
        alert("Failed to save answer: " + (err.error || "Unknown error"));
      }
    } catch (e) {
      alert("Error saving answer: " + (e.message || e));
    }
    setIsSaving(false);
  }

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 0,
          height: "400px",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: "1.1rem",
        }}
      >
        Loading recording interface...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          width: "400px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "32px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src="/webcam.png"
          alt="Webcam"
          width={180}
          height={180}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            opacity: 0.8,
          }}
        />
        <Webcam
          ref={webcamRef}
          mirrored={true}
          audio={isMicEnabled}
          video={isVideoEnabled}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
            zIndex: 2,
            background: "transparent",
            display: isVideoEnabled ? "block" : "none",
          }}
        />
        {!isVideoEnabled && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "16px",
            }}
          >
            <VideoOff size={48} color="white" />
          </div>
        )}
      </div>

      {/* Media Control Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          style={{
            padding: "12px",
            border: "2px solid #e5e7eb",
            borderRadius: "50%",
            background: isVideoEnabled ? "#ffffff" : "#f3f4f6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "48px",
            height: "48px",
          }}
          title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {isVideoEnabled ? (
            <Video size={20} color="#059669" />
          ) : (
            <VideoOff size={20} color="#dc2626" />
          )}
        </button>

        <button
          onClick={() => setIsMicEnabled(!isMicEnabled)}
          style={{
            padding: "12px",
            border: "2px solid #e5e7eb",
            borderRadius: "50%",
            background: isMicEnabled ? "#ffffff" : "#f3f4f6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "48px",
            height: "48px",
          }}
          title={isMicEnabled ? "Turn off microphone" : "Turn on microphone"}
        >
          {isMicEnabled ? (
            <Mic size={20} color="#059669" />
          ) : (
            <MicOff size={20} color="#dc2626" />
          )}
        </button>
      </div>
      <button
        style={{
          padding: "10px 32px",
          border: "1px solid #bbb",
          borderRadius: "8px",
          background: isRecording ? "#f3f4f6" : "#fff",
          color: isRecording ? "#d90429" : "#222",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
        }}
        type="button"
        onClick={async () => {
          if (isRecording) {
            stopSpeechToText();
            await saveAnswer(userAnswer);
          } else {
            if (!isMicEnabled) {
              alert("Please enable microphone to record your answer");
              return;
            }
            setSaveSuccess(false);
            startSpeechToText();
          }
        }}
        disabled={isSaving || !isMicEnabled}
      >
        {isRecording ? (
          <>
            <Mic color="#d90429" />
            Recording...
          </>
        ) : isSaving ? (
          "Saving..."
        ) : !isMicEnabled ? (
          "Enable Microphone"
        ) : (
          "Record Answer"
        )}
      </button>
      {saveSuccess && (
        <div style={{ color: "#16a34a", margin: "8px 0" }}>
          User's answer recorded successfully.
        </div>
      )}
      {/* Next Question button */}
      {saveSuccess && questionIndex < 4 && (
        <button
          style={{
            marginTop: "24px",
            padding: "10px 32px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setQuestionIndex((i) => i + 1);
            setUserAnswer("");
            setSaveSuccess(false);
          }}
        >
          Next Question
        </button>
      )}
      {/* Finish Interview button */}
      {saveSuccess && questionIndex === 4 && (
        <button
          style={{
            marginTop: "24px",
            padding: "12px 36px",
            background: "#059669",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push(`/dashboard/interview/${interviewId}/finish`);
          }}
        >
          Finish Interview
        </button>
      )}
    </div>
  );
}

export default RecordAnswerSection;
