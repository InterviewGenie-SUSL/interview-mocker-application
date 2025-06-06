"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ChatService } from "@/utils/chatService";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();

    const InputPrompt = `Generate a JSON array of ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers for the following job:
  Position: ${jobPosition}
  Description: ${jobDesc}
  Experience Level: ${jobExperience} years
  
  Format each question as: 
  {
    "Question": "question text",
    "Answer": "answer text"
  }`;

    try {
      const chatService = new ChatService();
      const responseText = await chatService.generateResponse(InputPrompt);

      // Clean up the response text to ensure valid JSON
      const cleanJsonText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanJsonText);
        if (!Array.isArray(parsedResponse)) {
          parsedResponse = [parsedResponse];
        }
      } catch (err) {
        throw new Error("Failed to parse AI response. Please try again.");
      }

      // Continue with database insertion
      const newMockId = uuidv4();
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: newMockId,
          jsonMockResp: cleanJsonText,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp?.[0]?.mockId) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0].mockId);
      } else {
        throw new Error("Failed to save interview data");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary
      hover:scale-105 hover:shadow-md cursor-pointer 
      transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              Tell us more about job you are interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and year of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Node.js, MySql etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  {error && <div className="mb-2 text-red-500">{error}</div>}
                  <div className="flex justify-end gap-5 ">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="transition-all duration-300 hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className=" animate-spin" />
                          <span className="ml-2">Generating from AI...</span>
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
