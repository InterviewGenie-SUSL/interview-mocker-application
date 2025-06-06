import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Ensure the response is in proper JSON format
            if (!text.includes('{') && !text.includes('[')) {
                throw new Error('Invalid response format from AI');
            }

            return text;
        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error('Failed to generate interview questions. Please try again.');
        }
    }
}
