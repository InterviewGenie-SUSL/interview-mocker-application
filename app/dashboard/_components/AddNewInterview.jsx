"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle, Plus, Sparkles, Brain, Target } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format. Give us question and Answer field on JSON. Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }
  
  IMPORTANT: Return ONLY a valid JSON array. Do not include any text before or after the JSON array. Make sure all strings are properly closed and escaped.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log(
        "🚀 ~ file: AddNewInterview.jsx:41 ~ onSubmit ~ responseText:",
        responseText
      );

      // Clean the response text
      let cleanedResponse = responseText.trim();

      // Remove any markdown code blocks
      cleanedResponse = cleanedResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");

      // Find JSON array
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }

      let jsonResponsePart = jsonMatch[0];
      console.log(
        "🚀 ~ file: AddNewInterview.jsx:43 ~ onSubmit ~ jsonResponsePart:",
        jsonResponsePart
      );

      // Clean up common JSON issues
      jsonResponsePart = jsonResponsePart
        .replace(/,\s*}/g, "}") // Remove trailing commas
        .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      if (jsonResponsePart) {
        try {
          // Validate JSON structure before parsing
          const mockResponse = JSON.parse(jsonResponsePart);

          // Validate that it's an array with proper structure
          if (!Array.isArray(mockResponse)) {
            throw new Error("Response is not an array");
          }

          // Validate each item has question and answer
          const isValid = mockResponse.every(
            (item) =>
              item &&
              typeof item === "object" &&
              typeof item.question === "string" &&
              typeof item.answer === "string"
          );

          if (!isValid) {
            throw new Error("Invalid question/answer format");
          }

          console.log(
            "🚀 ~ file: AddNewInterview.jsx:45 ~ onSubmit ~ mockResponse:",
            mockResponse
          );
          setJsonResponse(mockResponse);
          const jsonString = JSON.stringify(mockResponse);
          const res = await db
            .insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp: jsonString,
              jobPosition: jobPosition,
              jobDesc: jobDescription,
              jobExperience: jobExperience,
              createdby: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            })
            .returning({ mockId: MockInterview.mockId });
          setLoading(false);
          router.push(`dashboard/interview/${res[0]?.mockId}`);
        } catch (parseError) {
          console.error("JSON parsing error:", parseError, jsonResponsePart);
          alert(
            "Sorry, the AI response was not valid. Please try again with a shorter job description."
          );
          setLoading(false);
        }
      } else {
        console.error("Error: Unable to extract JSON response");
        alert("Unable to generate questions. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      alert(
        "Error generating questions. Please check your connection and try again."
      );
      setLoading(false);
    }
  };
  return (
    <div>
      <motion.div
        className="relative cursor-pointer group"
        onClick={() => setOpenDialog(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl blur-xl opacity-20 group-hover:opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative p-8 transition-all duration-300 bg-white border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-2xl dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl">
          <div className="space-y-4 text-center">
            <div className="inline-flex p-4 text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Create New Interview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start practicing with AI-powered mock interviews
              </p>
            </div>
            <motion.div
              className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="pb-4 space-y-3 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex p-3 mx-auto text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Brain className="w-6 h-6" />
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Create Your AI Interview
            </DialogTitle>
            <DialogDescription className="max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-400">
              Tell us about the role you're preparing for, and our AI will
              generate personalized interview questions to help you succeed.
            </DialogDescription>
          </DialogHeader>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid gap-4">
              {/* Job Position */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                  <Target className="w-4 h-4 text-blue-600" />
                  Job Role/Position
                </label>
                <Input
                  placeholder="e.g., Senior Full Stack Developer, Product Manager, Data Scientist"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="h-10 text-base transition-colors duration-300 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500"
                />
              </motion.div>

              {/* Job Description */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                  <Brain className="w-4 h-4 text-purple-600" />
                  Job Description/Tech Stack
                </label>
                <Textarea
                  placeholder="e.g., React, Node.js, TypeScript, MongoDB, AWS, RESTful APIs, Agile methodology..."
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[80px] text-base border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 transition-colors duration-300 resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Include technologies, frameworks, methodologies, and key
                  responsibilities
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  Years of Experience
                </label>
                <Input
                  placeholder="e.g., 3"
                  type="number"
                  min="0"
                  max="50"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                  className="h-10 text-base transition-colors duration-300 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="px-6 py-2 text-base"
                disabled={loading}
              >
                Cancel
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-base text-white border-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 animate-spin" />
                      Generating AI Questions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      Create Interview
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
