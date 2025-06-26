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
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const cleanJsonString = (str) => {
    // Remove any markdown code block markers
    str = str.replace(/```json\s*/g, "").replace(/```\s*/g, "");

    // Find the JSON array in the string
    const jsonMatch = str.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON array found in the response");
    }

    let jsonStr = jsonMatch[0];

    // Fix common JSON issues
    jsonStr = jsonStr
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
      .replace(/\n/g, "\\n") // Escape newlines
      .replace(/\r/g, "\\r") // Escape carriage returns
      .replace(/\t/g, "\\t") // Escape tabs
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"') // Escape quotes
      .replace(/\\"/g, '"') // Fix over-escaped quotes
      .replace(/"([^"]*)":/g, '"$1":') // Ensure proper key formatting
      .replace(/:\s*"([^"]*)"([,\]\}])/g, ': "$1"$2'); // Ensure proper value formatting

    return jsonStr;
  };

  const validateAndParseJson = (responseText) => {
    try {
      const cleanedJson = cleanJsonString(responseText);
      const parsed = JSON.parse(cleanedJson);

      // Validate the structure
      if (!Array.isArray(parsed)) {
        throw new Error("Response is not an array");
      }

      if (parsed.length === 0) {
        throw new Error("Empty response array");
      }

      // Validate each question object
      for (const item of parsed) {
        if (!item.question || !item.answer) {
          throw new Error("Invalid question/answer format");
        }
      }

      return parsed;
    } catch (error) {
      console.error("JSON parsing error:", error);
      throw error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. 

Generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in valid JSON format. 

Return ONLY a JSON array with this exact structure:
[
  {
    "question": "Your interview question here",
    "answer": "Your detailed answer here"
  }
]

Important: 
- Return only valid JSON, no markdown formatting
- No additional text or explanations
- Ensure all strings are properly escaped
- Each question should be relevant to the job position and experience level`;

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} of ${maxRetries}`);

        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();
        console.log("Raw AI response:", responseText);

        const mockResponse = validateAndParseJson(responseText);
        console.log("Parsed response:", mockResponse);

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
        setOpenDialog(false);
        router.push(`dashboard/interview/${res[0]?.mockId}`);
        return; // Success, exit the retry loop
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        attempt++;

        if (attempt >= maxRetries) {
          setError(
            `Failed to generate interview questions after ${maxRetries} attempts. Please try again with a more specific job description.`
          );
          setLoading(false);
          return;
        }

        // Wait a bit before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
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
            <motion.div
              className="inline-flex p-4 text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Plus className="w-8 h-8" />
            </motion.div>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6 space-y-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex p-4 mx-auto text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Brain className="w-8 h-8" />
            </motion.div>
            <DialogTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Create Your AI Interview
            </DialogTitle>
            <DialogDescription className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Tell us about the role you're preparing for, and our AI will
              generate personalized interview questions to help you succeed.
            </DialogDescription>
          </DialogHeader>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
              >
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <div className="grid gap-6">
              {/* Job Position */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Target className="w-5 h-5 text-blue-600" />
                  Job Role/Position
                </label>
                <Input
                  placeholder="e.g., Senior Full Stack Developer, Product Manager, Data Scientist"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="h-12 text-lg transition-colors duration-300 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500"
                />
              </motion.div>

              {/* Job Description */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Job Description/Tech Stack
                </label>
                <Textarea
                  placeholder="e.g., React, Node.js, TypeScript, MongoDB, AWS, RESTful APIs, Agile methodology..."
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[120px] text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 transition-colors duration-300 resize-none"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Include technologies, frameworks, methodologies, and key
                  responsibilities
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Sparkles className="w-5 h-5 text-orange-600" />
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
                  className="h-12 text-lg transition-colors duration-300 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="px-8 py-3 text-lg"
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
                  className="px-8 py-3 text-lg text-white border-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
