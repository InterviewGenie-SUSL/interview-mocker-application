"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TestFeedbackPage() {
  // Sample interview ID for testing
  const testInterviewId = "test-mock-123";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Test Feedback Page
        </h1>
        <p className="mb-6 text-gray-600">
          Click the button below to test the feedback functionality with sample
          data.
        </p>

        <Link href={`/dashboard/interview/${testInterviewId}/feedback`}>
          <Button className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700">
            View Feedback Demo
          </Button>
        </Link>

        <Link
          href="/dashboard"
          className="block mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
