import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userAnswer, correctAnswer } = await req.json();

    // Validate input
    if (!userAnswer || userAnswer.trim().length === 0) {
      return NextResponse.json({
        feedback: "Please provide a more detailed answer. Try to explain your thoughts and reasoning.",
        rating: "1"
      });
    }

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback to basic scoring without AI
      const basicScore = generateBasicScore(userAnswer, correctAnswer);
      const basicFeedback = generateBasicFeedback(userAnswer, correctAnswer, basicScore);
      return NextResponse.json({
        feedback: basicFeedback,
        rating: basicScore.toString()
      });
    }

    const prompt = `You are an expert interviewer. Compare the user's answer to the correct answer and provide:
1. A constructive feedback (2-3 sentences)
2. A score from 1-10 (where 10 is perfect)

User's answer: ${userAnswer}
Correct answer: ${correctAnswer}

Please respond in this exact format:
FEEDBACK: [Your feedback here]
SCORE: [Number from 1-10]`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert interviewer giving feedback and scores." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
      }),
    });

    const data = await openaiRes.json();
    const response = data.choices?.[0]?.message?.content || "No feedback generated.";

    // Parse the response to extract feedback and score
    const feedbackMatch = response.match(/FEEDBACK:\s*(.+?)(?=SCORE:|$)/s);
    const scoreMatch = response.match(/SCORE:\s*(\d+)/);

    const feedback = feedbackMatch ? feedbackMatch[1].trim() : response;
    const rating = scoreMatch ? scoreMatch[1] : "5";

    return NextResponse.json({ feedback, rating });
  } catch (e) {
    console.error("Feedback API error:", e);
    // Fallback to basic scoring with safe defaults
    return NextResponse.json({
      feedback: "Unable to generate feedback at this time. Please try again.",
      rating: "5"
    });
  }
}

// Fallback scoring function when AI is not available
function generateBasicScore(userAnswer, correctAnswer) {
  if (!userAnswer || userAnswer.trim().length === 0) return 1;

  const userWords = userAnswer.toLowerCase().split(/\s+/);
  const correctWords = correctAnswer.toLowerCase().split(/\s+/);

  // Calculate word overlap
  const overlap = userWords.filter(word =>
    correctWords.some(correctWord =>
      correctWord.includes(word) || word.includes(correctWord)
    )
  ).length;

  // Calculate score based on overlap and length
  const overlapRatio = overlap / Math.max(correctWords.length, 1);
  const lengthScore = Math.min(userWords.length / 10, 1); // Reward longer answers up to 10 words

  const score = Math.round((overlapRatio * 0.7 + lengthScore * 0.3) * 10);
  return Math.max(1, Math.min(10, score));
}

function generateBasicFeedback(userAnswer, correctAnswer, score) {
  if (!userAnswer || userAnswer.trim().length === 0) {
    return "Please provide a more detailed answer. Try to explain your thoughts and reasoning.";
  }

  if (score >= 8) {
    return "Excellent answer! You covered the key points well and provided good detail.";
  } else if (score >= 6) {
    return "Good answer! You touched on some important points. Consider adding more specific examples or details.";
  } else if (score >= 4) {
    return "Fair answer. You have the right idea but could expand on your response with more relevant details.";
  } else {
    return "Your answer could be improved. Try to be more specific and relate your response more closely to the question asked.";
  }
}
