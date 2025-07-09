"use client";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Video, VideoOff, MicOff } from "lucide-react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

function RecordAnswerSection({
  activeQuestionIndex = 0,
  mockInterviewQuestion = [],
  setActiveQuestionIndex,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [answers, setAnswers] = useState([]); // Store all answers
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const webcamRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const interviewId = params.interviewId;

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
    console.log("Interview ID:", interviewId);
  }, [interviewId]);

  // Clear states when question changes
  useEffect(() => {
    setSaveSuccess(false);
    setUserAnswer("");
  }, [activeQuestionIndex]);

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

    // Validate required fields
    if (!interviewId) {
      alert(
        "Error: Interview ID is missing. Please refresh the page and try again."
      );
      setIsSaving(false);
      return;
    }

    if (!answer || answer.trim().length === 0) {
      alert("Error: Please provide an answer before saving.");
      setIsSaving(false);
      return;
    }

    try {
      // Use the passed mockInterviewQuestion or fall back to localStorage
      let questions = mockInterviewQuestion;
      if (!questions || questions.length === 0) {
        if (typeof window !== "undefined") {
          const questionsRaw = localStorage.getItem("mockInterviewQuestion");
          questions = questionsRaw ? JSON.parse(questionsRaw) : [];
        }
      }

      const currentQ = questions[activeQuestionIndex] || {};

      // Validate question data
      if (!currentQ.question) {
        alert(
          "Error: Question data is missing. Please refresh the page and try again."
        );
        setIsSaving(false);
        return;
      }

      // Get AI feedback and rating
      let feedback = "Great answer! Keep up the good work.";
      let rating = "8";

      if (answer && answer.trim().length > 0) {
        try {
          console.log(
            "Getting AI feedback for answer:",
            answer.substring(0, 100) + "..."
          );
          const feedbackRes = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userAnswer: answer,
              correctAnswer: currentQ.answer || "",
            }),
          });

          if (feedbackRes.ok) {
            const feedbackData = await feedbackRes.json();
            feedback =
              feedbackData.feedback ||
              "Great answer! Keep practicing to improve further.";
            rating = feedbackData.rating || "7";
            console.log("AI feedback received:", {
              feedback: feedback.substring(0, 100),
              rating,
            });
          } else {
            console.log("Feedback API failed, using default feedback");
            feedback = "Answer recorded successfully! Keep up the great work.";
            rating = "7";
          }
        } catch (feedbackError) {
          console.error("Error getting feedback:", feedbackError);
          feedback =
            "Answer recorded successfully! We'll provide detailed feedback shortly.";
          rating = "7";
        }
      }

      const payload = {
        mockId: interviewId,
        question: currentQ.question || "No question available",
        correctAns: currentQ.answer || "No answer available",
        userAns: answer.trim(),
        feedback: feedback,
        rating: rating,
        userEmail: "",
        createdAt: new Date().toISOString(),
      };

      console.log("Saving answer payload:", payload);

      // Double-check required fields before sending
      if (!payload.mockId || !payload.question || !payload.userAns) {
        console.error("Missing required fields:", {
          mockId: payload.mockId,
          question: payload.question,
          userAns: payload.userAns,
        });
        alert("Error: Missing required fields. Please try again.");
        setIsSaving(false);
        return;
      }

      const res = await fetch(`/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setAnswers((prev) => {
          const updated = [...prev];
          updated[activeQuestionIndex] = { answer, feedback, rating };
          return updated;
        });

        // Clear the answer input for next question
        setUserAnswer("");
      } else {
        const err = await res.json();
        console.error("Server error:", err);
        const errorMessage = err.error || "Unknown server error";
        const details = err.details ? ` Details: ${err.details}` : "";
        alert(`Failed to save answer: ${errorMessage}${details}`);
      }
    } catch (e) {
      console.error("Error saving answer:", e);
      const errorMessage = e.message || "Network or parsing error";
      alert(`Error saving answer: ${errorMessage}`);
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
          marginBottom: "16px",
        }}
        type="button"
        onClick={async () => {
          if (isRecording) {
            stopSpeechToText();
            // Wait a moment for the final transcript to be processed
            setTimeout(async () => {
              const finalAnswer = userAnswer.trim();
              if (finalAnswer.length > 0) {
                await saveAnswer(finalAnswer);
              } else {
                alert("No speech was detected. Please try recording again.");
              }
            }, 500);
          } else {
            if (!isMicEnabled) {
              alert("Please enable microphone to record your answer");
              return;
            }
            setSaveSuccess(false);
            setUserAnswer(""); // Clear previous answer
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
          "Generating feedback..."
        ) : !isMicEnabled ? (
          "Enable Microphone"
        ) : (
          "Record Answer"
        )}
      </button>

      {/* Manual text input for testing */}
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
        >
          Or type your answer:
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "14px",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Save Answer Button */}
      <button
        style={{
          padding: "10px 32px",
          border: "none",
          borderRadius: "8px",
          background: isSaving ? "#9ca3af" : "#2563eb",
          color: "#fff",
          fontSize: "1rem",
          cursor: isSaving ? "not-allowed" : "pointer",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
        }}
        type="button"
        onClick={async () => {
          const finalAnswer = userAnswer.trim();
          if (finalAnswer.length > 0) {
            await saveAnswer(finalAnswer);
          } else {
            alert("Please provide an answer before saving.");
          }
        }}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Answer"}
      </button>

      {/* Show current transcription */}
      {(isRecording || userAnswer) && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            maxWidth: "500px",
          }}
        >
          <div
            style={{ fontWeight: "600", marginBottom: "8px", color: "#374151" }}
          >
            {isRecording ? "Recording..." : "Transcribed Text:"}
          </div>
          <div
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
              minHeight: "20px",
              fontStyle: userAnswer ? "normal" : "italic",
            }}
          >
            {userAnswer ||
              (isRecording ? "Speak now..." : "No text captured yet")}
          </div>
        </div>
      )}

      {saveSuccess && (
        <div
          style={{
            color: "#16a34a",
            margin: "8px 0",
            padding: "16px",
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            border: "1px solid #e0f2fe",
            maxWidth: "500px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "8px" }}>
            ✅ Answer recorded successfully!
          </div>
          {saveSuccess && (
            <>
              <div style={{ marginBottom: "8px" }}>
                <strong>Score:</strong>{" "}
                {answers[activeQuestionIndex]?.rating || "N/A"}/10
              </div>
              <div style={{ fontSize: "0.9rem", color: "#374151" }}>
                <strong>Feedback:</strong>{" "}
                {answers[activeQuestionIndex]?.feedback ||
                  "No feedback available"}
              </div>
            </>
          )}
        </div>
      )}
      {/* Next Question button */}
      {saveSuccess &&
        activeQuestionIndex < (mockInterviewQuestion?.length || 5) - 1 && (
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
              if (setActiveQuestionIndex) {
                setActiveQuestionIndex(activeQuestionIndex + 1);
              }
              setUserAnswer("");
              setSaveSuccess(false);
            }}
          >
            Next Question
          </button>
        )}
      {/* Finish Interview button */}
      {saveSuccess &&
        activeQuestionIndex === (mockInterviewQuestion?.length || 5) - 1 && (
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

RecordAnswerSection.propTypes = {
  activeQuestionIndex: PropTypes.number,
  mockInterviewQuestion: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string,
    })
  ),
  setActiveQuestionIndex: PropTypes.func,
};

export default RecordAnswerSection;
