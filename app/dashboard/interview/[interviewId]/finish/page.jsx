import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

async function fetchUserAnswers(mockId) {
  const res = await fetch(`/api/answers?mockId=${mockId}`);
  if (!res.ok) return [];
  return res.json();
}

async function getAIResults(userAns, correctAns) {
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userAnswer: userAns, correctAnswer: correctAns }),
  });
  if (!res.ok) return "No feedback.";
  const data = await res.json();
  return data.feedback || "No feedback.";
}

export default function FinishInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const mockId = params.interviewId || params.id;
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mockId) return;
    (async () => {
      const answers = await fetchUserAnswers(mockId);
      setUserAnswers(answers);
      // Generate feedbacks using real AI API
      const feedbackArr = await Promise.all(
        answers.map((a) => getAIResults(a.userAns, a.correctAns))
      );
      setFeedbacks(feedbackArr);
      setLoading(false);
    })();
  }, [mockId]);

  if (loading) return <div>Loading results...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 24 }}>Interview Results</h1>
      {userAnswers.map((a, i) => (
        <div key={i} style={{ marginBottom: 32, padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Question {i + 1}</div>
          <div><b>Question:</b> {a.question}</div>
          <div><b>Your Answer:</b> {a.userAns}</div>
          <div><b>Correct Answer:</b> {a.correctAns}</div>
          <div style={{ color: "#059669", marginTop: 8 }}><b>Feedback:</b> {feedbacks[i]}</div>
        </div>
      ))}
      <button onClick={() => router.push("/dashboard")} style={{ padding: "12px 36px", background: "#4338ca", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>Back to Dashboard</button>
    </div>
  );
}
