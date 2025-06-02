// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Job Position: Full Stack Developer, Job Description: React, Nodejs, MySQL, Years of Experience: 2, Depends on this information please give me 5 Interview question with answers in JSON Format, Give Question and Answers as field in JSON`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "Question": "Describe your experience with React.js, focusing on specific components or techniques you've used and challenges you've overcome.",
    "Answer": "I have two years of experience building web applications with React.js.  I'm proficient in using functional components with hooks like useState and useEffect for managing state and side effects. I've worked extensively with component lifecycle methods (though less so now with functional components), and I'm familiar with concepts like JSX, props, and state.  A recent challenge involved optimizing a large component tree for performance. I solved this by implementing React.memo for memoization and utilizing React.lazy and Suspense for code splitting, significantly improving load times. I also have experience with integrating third-party libraries and utilizing Context API for state management in larger applications."
  },
  {
    "Question": "Explain your experience with Node.js and express.js.  Give an example of a REST API endpoint you've built.",
    "Answer": "My experience with Node.js centers around building RESTful APIs using Express.js. I'm comfortable with routing, middleware, and handling HTTP requests and responses. For example, I built a REST endpoint for a user authentication system. This endpoint handled POST requests to register new users, verifying data integrity using validation middleware.  It then used bcrypt to securely hash passwords before storing the user information in a MySQL database.  The endpoint also handled GET requests to retrieve user information (after authentication), using appropriate HTTP status codes to communicate success or errors.  I'm also familiar with using npm for package management and utilizing various middleware packages for tasks like logging and error handling."
  },
  {
    "Question": "How do you handle database interactions in your Node.js applications, specifically using MySQL?",
    "Answer": "I typically use a library like \`mysql2\` or a more robust ORM like \`Sequelize\` or \`TypeORM\` to interact with MySQL databases in my Node.js applications.  These tools simplify database operations by providing abstractions over raw SQL queries. I prefer ORMs for their ability to handle database schema migrations and provide a more structured approach to data interaction.  I understand the importance of parameterized queries to prevent SQL injection vulnerabilities and always sanitize user inputs before executing queries.  I'm comfortable writing both raw SQL queries when necessary and utilizing ORM functionalities for more complex interactions like joins and transactions."
  },
  {
    "Question": "Describe a time you had to debug a complex issue in a web application. What steps did you take to identify and resolve the problem?",
    "Answer": "In a previous project, we encountered a performance bottleneck in our React application. Initial profiling revealed that a particular component was re-rendering unnecessarily frequently.  My debugging process involved: 1) Using the browser's developer tools to inspect network requests and component rendering times. 2) Adding console logs to track data flow and state changes.  3) Utilizing React's developer tools to pinpoint the source of the re-renders.  I eventually identified that an inefficient state update strategy was triggering unnecessary re-renders in a large component tree.  By implementing \`useMemo\` and \`useCallback\` hooks and optimizing state updates, I significantly improved the application's performance.  This experience highlighted the importance of systematic debugging and leveraging available tools effectively."
  },
  {
    "Question": "How do you approach testing in your development workflow?  What types of tests are you familiar with?",
    "Answer": "Testing is a crucial part of my development process. I use a combination of unit, integration, and end-to-end tests. For unit tests, I typically use Jest and React Testing Library for React components, ensuring each component functions independently.  For integration tests, I often test interactions between different parts of the application, for instance, between the React frontend and the Node.js backend.   I might use tools like Supertest to make HTTP requests to the backend and assert the responses.  For end-to-end tests, I am familiar with Cypress or Selenium, which allow simulating user interactions in a real browser environment to verify the entire application flow. My approach involves writing tests early and frequently to catch bugs early and ensure code maintainability."
  }
]
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
