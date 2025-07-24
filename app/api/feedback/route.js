import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

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

    // Check if Gemini API key is configured
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback to basic scoring without AI
      const basicScore = generateBasicScore(userAnswer, correctAnswer);
      const basicFeedback = generateBasicFeedback(userAnswer, correctAnswer, basicScore);
      return NextResponse.json({
        feedback: basicFeedback,
        rating: basicScore.toString()
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 200,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      }
    ];

    const prompt = `You are an expert interviewer. Compare the user's answer to the correct answer and provide:
1. A constructive feedback (2-3 sentences)
2. A score from 1-10 (where 10 is perfect)

User's answer: ${userAnswer}
Correct answer: ${correctAnswer}

Please respond in this exact format:
FEEDBACK: [Your feedback here]
SCORE: [Number from 1-10]`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response.text() || "No feedback generated.";

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
