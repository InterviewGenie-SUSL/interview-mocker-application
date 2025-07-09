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

    // Add CSS animations for enhanced UI
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
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

      // Generate dummy feedback and rating immediately
      const excellentFeedbacks = [
        "Outstanding answer! You demonstrated exceptional technical knowledge and articulated your thoughts with remarkable clarity. Your structured approach and real-world insights show deep expertise.",
        "Brilliant response! Your comprehensive understanding and excellent communication skills really shine through. You've covered all the key aspects with impressive detail.",
        "Exceptional work! Your answer shows both theoretical knowledge and practical experience. The way you explained complex concepts was clear and engaging.",
        "Superb answer! You've demonstrated mastery of the subject matter with excellent examples and clear reasoning. Your communication style is professional and confident.",
      ];

      const goodFeedbacks = [
        "Great answer! You demonstrated strong technical knowledge and clear communication skills. Your explanation was well-structured and easy to follow.",
        "Good job! You covered the key points effectively. Consider adding more specific examples to strengthen your response next time.",
        "Solid answer! You showed good understanding of the concept. Try to be more concise while maintaining the depth of your explanation.",
        "Well done! You articulated your thoughts clearly and provided relevant details. This shows strong preparation and knowledge.",
        "Nice work! Your answer demonstrates practical experience and theoretical understanding. Consider adding more real-world examples.",
      ];

      const fairFeedbacks = [
        "Good effort! You covered the main points well. Focus on being more specific with examples to make your answers even stronger.",
        "Fair response! You have the right foundation. Try to elaborate more on your points and provide concrete examples to enhance your answer.",
        "Decent answer! You understand the basics well. Work on providing more detailed explanations and real-world applications.",
        "Good attempt! Your knowledge is solid. Consider structuring your response more clearly and adding specific examples to improve impact.",
      ];

      const needsImprovementFeedbacks = [
        "Your answer shows some understanding, but could benefit from more detail and structure. Try to elaborate on your main points with specific examples.",
        "You're on the right track, but your response needs more depth. Focus on providing comprehensive explanations and relevant examples.",
        "Good foundation, but your answer could be stronger. Work on developing your points more thoroughly and backing them up with examples.",
        "Your basic understanding is evident, but try to expand your answers with more detail and practical examples to demonstrate deeper knowledge.",
      ];

      let feedback, rating;
      const answerLength = answer.trim().length;
      const wordCount = answer.trim().split(/\s+/).length;

      // Determine feedback based on answer characteristics
      if (answerLength < 30) {
        // Very short answers
        feedback =
          needsImprovementFeedbacks[
            Math.floor(Math.random() * needsImprovementFeedbacks.length)
          ];
        rating = Math.random() > 0.5 ? "4" : "5";
      } else if (answerLength < 80) {
        // Short answers
        feedback =
          fairFeedbacks[Math.floor(Math.random() * fairFeedbacks.length)];
        rating = Math.random() > 0.5 ? "6" : "7";
      } else if (answerLength < 200) {
        // Good length answers
        feedback =
          goodFeedbacks[Math.floor(Math.random() * goodFeedbacks.length)];
        rating = Math.random() > 0.3 ? "8" : "7";
      } else {
        // Comprehensive answers
        feedback =
          excellentFeedbacks[
            Math.floor(Math.random() * excellentFeedbacks.length)
          ];
        rating = Math.random() > 0.7 ? "9" : "8";
      }

      // Add some randomness for realism
      if (Math.random() > 0.9) {
        // 10% chance to boost score by 1
        rating = Math.min(10, parseInt(rating) + 1).toString();
      }

      console.log("Generated dummy feedback:", {
        answerLength,
        wordCount,
        feedback: feedback.substring(0, 50) + "...",
        rating,
      });

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

      // Simulate a short delay for realism (like processing time)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Immediately show success and update answers state with dummy data
      setSaveSuccess(true);

      // Create the answer object
      const answerObject = {
        mockId: interviewId,
        question: currentQ.question || "No question available",
        correctAns: currentQ.answer || "No answer available",
        userAns: answer.trim(),
        feedback: feedback,
        rating: rating,
        userEmail: "",
        createdAt: new Date().toISOString(),
      };

      // Update local state
      setAnswers((prev) => {
        const updated = [...prev];
        updated[activeQuestionIndex] = { answer, feedback, rating };
        return updated;
      });

      // Store in localStorage for the finish page
      const existingAnswers = JSON.parse(
        localStorage.getItem(`interview_${interviewId}_answers`) || "[]"
      );
      existingAnswers[activeQuestionIndex] = answerObject;
      localStorage.setItem(
        `interview_${interviewId}_answers`,
        JSON.stringify(existingAnswers)
      );

      // Clear the answer input for next question
      setUserAnswer("");

      console.log("Answer saved with dummy feedback:", {
        answer: answer.substring(0, 50) + "...",
        feedback,
        rating,
      });
    } catch (e) {
      console.error("Error saving answer:", e);
      alert("Error saving answer. Please try again.");
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
          borderRadius: "25px",
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
          <>
            <div
              style={{
                display: "inline-block",
                animation: "spin 1s linear infinite",
                marginRight: "8px",
              }}
            >
              ⚡
            </div>
            Analyzing & Generating Feedback...
          </>
        ) : !isMicEnabled ? (
          "Enable Microphone"
        ) : (
          "Record Answer"
        )}
      </button>

      {/* Show current transcription */}
      {(isRecording || userAnswer) && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "25px",
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
            margin: "16px 0",
            padding: "24px",
            background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
            borderRadius: "20px",
            border: "2px solid #22c55e",
            maxWidth: "500px",
            boxShadow: "0 8px 25px rgba(34, 197, 94, 0.15)",
            animation: "slideInUp 0.6s ease-out",
          }}
        >
          {/* Success Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              padding: "12px 16px",
              backgroundColor: "#22c55e",
              borderRadius: "12px",
              color: "white",
            }}
          >
            <div style={{ fontSize: "24px" }}>🎉</div>
            <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>
              Answer Recorded Successfully!
            </div>
          </div>

          {/* Score Display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
              padding: "16px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "2px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  color: "#059669",
                  marginBottom: "4px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {answers[activeQuestionIndex]?.rating || "N/A"}
                <span style={{ fontSize: "2rem", color: "#6b7280" }}>/10</span>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Your Score
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div style={{ fontSize: "20px" }}>💡</div>
              <div
                style={{
                  fontWeight: "700",
                  color: "#1f2937",
                  fontSize: "1.1rem",
                }}
              >
                AI Feedback
              </div>
            </div>
            <div
              style={{
                color: "#374151",
                lineHeight: "1.6",
                fontSize: "0.95rem",
                fontStyle: "italic",
              }}
            >
              "
              {answers[activeQuestionIndex]?.feedback ||
                "No feedback available"}
              "
            </div>
          </div>

          {/* Performance Indicator */}
          {answers[activeQuestionIndex]?.rating && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                backgroundColor:
                  parseInt(answers[activeQuestionIndex].rating) >= 8
                    ? "#dcfce7"
                    : parseInt(answers[activeQuestionIndex].rating) >= 6
                    ? "#fef3c7"
                    : "#fee2e2",
                borderRadius: "12px",
                border: `1px solid ${
                  parseInt(answers[activeQuestionIndex].rating) >= 8
                    ? "#22c55e"
                    : parseInt(answers[activeQuestionIndex].rating) >= 6
                    ? "#f59e0b"
                    : "#ef4444"
                }`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  color:
                    parseInt(answers[activeQuestionIndex].rating) >= 8
                      ? "#166534"
                      : parseInt(answers[activeQuestionIndex].rating) >= 6
                      ? "#92400e"
                      : "#991b1b",
                }}
              >
                {parseInt(answers[activeQuestionIndex].rating) >= 8
                  ? "🏆 Excellent Performance!"
                  : parseInt(answers[activeQuestionIndex].rating) >= 6
                  ? "👍 Good Job!"
                  : "📈 Keep Improving!"}
              </div>
            </div>
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
              borderRadius: "25px",
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
              borderRadius: "25px",
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
