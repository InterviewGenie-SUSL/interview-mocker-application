"use client"
import { db } from '@/utils/db';
import { UserAnswer, MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronsUpDown} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';



const Feedback = ({params}) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    // Fetch all questions for this interview
    const interview = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
    let allQuestions = [];
    if (interview[0]?.jsonMockResp) {
      allQuestions = JSON.parse(interview[0].jsonMockResp);
    }
    // Fetch all answers for this interview
    const answers = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
    // Merge questions with answers
    const merged = await Promise.all(
      allQuestions.map(async (q, idx) => {
        const answerObj = answers.find(a => a.question === q.question);
        if (answerObj) {
          return answerObj;
        } else {
          // No answer, generate feedback for empty answer
          // Call feedback API
          let feedback = "";
          let rating = "";
          try {
            const res = await fetch("/api/feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userAnswer: "", correctAnswer: q.answer })
            });
            const data = await res.json();
            feedback = data.feedback;
            rating = data.rating;
          } catch {
            feedback = "No feedback generated.";
            rating = "1";
          }
          return {
            question: q.question,
            correctAns: q.answer,
            userAns: "empty answer",
            feedback,
            rating
          };
        }
      })
    );
    setFeedbackList(merged);
    setLoading(false);
  };
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      {loading ? (
        <h2 className='font-bold text-lg text-green-500'>Loading feedback...</h2>
      ) : feedbackList?.length === 0 ? (
        <h2 className='font-bold text-lg text-green-500'>No interview Feedback</h2>
      ) : (
        <>
          <h2 className='text-primary text-lg my-2'>
            Your overall interview rating: <strong>7/10</strong>
          </h2>
          <h2 className='text-sm text-gray-500'>Find below interview questions with correct answers, your answer and feedback for improvements for your next interview</h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
                {item.question} <ChevronsUpDown className='h-4' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'>
                    <strong>Rating: </strong>{item.rating}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer Looks Like: </strong>{item.correctAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className='mt-5' onClick={() => router.replace('/dashboard')}> Go Home</Button>
    </div>
  );
}

export default Feedback;
