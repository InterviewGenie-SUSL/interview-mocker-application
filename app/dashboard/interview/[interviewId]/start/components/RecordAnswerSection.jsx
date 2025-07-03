"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");
  const [isClient, setIsClient] = useState(false);

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
          background: "#111",
          borderRadius: "16px",
          width: "400px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "32px",
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
          mirrored={true}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
            zIndex: 2,
            background: "transparent",
          }}
        />
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
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <>
            <Mic color="#d90429" />
            Recording...
          </>
        ) : (
          "Record Answer"
        )}
      </button>

      <button
        style={{
          padding: "12px 36px",
          background: "#4338ca",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "8px",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "0",
          boxShadow: "0 2px 8px rgba(67,56,202,0.08)",
        }}
        type="button"
        onClick={() => alert(userAnswer || "No answer yet.")}
      >
        Show User Answer
      </button>
    </div>
  );
}

export default RecordAnswerSection;
