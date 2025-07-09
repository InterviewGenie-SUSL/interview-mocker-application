import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function POST(req) {
  try {
    const {
      mockId,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt,
    } = await req.json();

    console.log("Received data:", { mockId, question, userAns, feedback, rating });

    // Validate required fields with specific error messages
    if (!mockId) {
      console.error("Missing mockId field");
      return NextResponse.json({ error: "Missing mockId field" }, { status: 400 });
    }
    if (!question) {
      console.error("Missing question field");
      return NextResponse.json({ error: "Missing question field" }, { status: 400 });
    }
    if (!userAns) {
      console.error("Missing userAns field");
      return NextResponse.json({ error: "Missing userAns field" }, { status: 400 });
    }

    // Check if db is properly initialized
    if (!db) {
      console.error("Database connection not initialized");
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    console.log("Attempting to insert into database...");
    const result = await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt,
    });

    console.log("Database insert successful:", result);
    return NextResponse.json({ success: true, message: "Answer saved successfully" });
  } catch (e) {
    console.error("API Error:", e);
    console.error("Error stack:", e.stack);
    return NextResponse.json({
      error: "Failed to save answer",
      details: e.message,
      stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const mockId = searchParams.get("mockId");
    if (!mockId) {
      return NextResponse.json([], { status: 200 });
    }
    const dbAnswers = await db
      .select()
      .from(UserAnswer)
      .where(UserAnswer.mockIdRef.eq(mockId));
    return NextResponse.json(dbAnswers);
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
