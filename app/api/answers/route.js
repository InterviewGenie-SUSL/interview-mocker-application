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
    if (!mockId || !question || !userAns) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save answer" }, { status: 500 });
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
