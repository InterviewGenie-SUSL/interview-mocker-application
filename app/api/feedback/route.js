import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userAnswer, correctAnswer } = await req.json();
    // Call OpenAI API (or Gemini) for feedback
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API key configured" }, { status: 500 });
    }
    const prompt = `Compare the user's answer to the correct answer and provide constructive feedback.\nUser's answer: ${userAnswer}\nCorrect answer: ${correctAnswer}\nFeedback:`;
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert interviewer giving feedback." },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
      }),
    });
    const data = await openaiRes.json();
    const feedback = data.choices?.[0]?.message?.content || "No feedback generated.";
    return NextResponse.json({ feedback });
  } catch (e) {
    return NextResponse.json({ error: "Failed to get feedback" }, { status: 500 });
  }
}
