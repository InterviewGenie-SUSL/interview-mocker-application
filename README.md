# 🎤 InterviewGenie — AI-Powered Mock Interview Platform

InterviewGenie is an AI-powered mock interview platform that helps students and job seekers prepare for technical and behavioral interviews through realistic interview simulations, AI-generated questions, and personalized feedback.

Using Google Gemini AI, the platform generates role-specific interview questions, evaluates user responses, and provides actionable suggestions to improve communication skills, confidence, and technical knowledge.

---

## ✨ Features

### 🎯 Mock Interviews

* 🎤 AI-generated role-specific interview questions
* 📝 Custom interview sessions based on user preferences
* 🎥 Video and audio recording for realistic interview practice
* 🎙️ Speech-to-text conversion for response analysis

### 🤖 AI Features

* 💡 AI-powered interview feedback
* 📊 Performance evaluation and scoring
* 🗣️ Suggestions to improve clarity, confidence, and content depth
* 🎯 Personalized recommendations based on interview performance

### 📈 Progress Tracking

* 📚 Interview history
* 📊 Performance analytics and progress charts
* 🏆 Track improvement across multiple interview sessions

### 👤 User Management

* 🔐 Secure user authentication
* 👤 Personalized user profiles
* 📂 Dashboard for managing interview sessions

---

## 🛠️ Tech Stack

| Layer                     | Technology                              |
| ------------------------- | --------------------------------------- |
| 🌐 **Frontend**           | Next.js, React, Tailwind CSS, shadcn/ui |
| ⚙️ **Backend**            | Node.js                                 |
| 🗄️ **Database**          | PostgreSQL                              |
| 🧩 **ORM**                | Drizzle ORM                             |
| 🤖 **AI Integration**     | Google Gemini AI                        |
| 🎙️ **Speech Processing** | Speech-to-Text APIs                     |
| 🔐 **Authentication**     | Clerk Authentication                    |

---

## 📁 Project Structure

```text
interviewgenie/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── interview/
│   ├── feedback/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── interview/
│   ├── dashboard/
│   └── shared/
│
├── lib/
│   ├── db/
│   ├── gemini/
│   └── utils/
│
├── drizzle/
├── public/
├── screenshots/
└── README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

* Node.js 18+
* PostgreSQL
* Google Gemini API Key

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/interviewgenie.git
cd interviewgenie
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file.

```env
DATABASE_URL=your_postgresql_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key

CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never commit API keys or secrets to version control.

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔗 Application Modules

| Module               | Description                               |
| -------------------- | ----------------------------------------- |
| 🏠 Landing Page      | Introduction and project overview         |
| 🔐 Authentication    | User sign up and login                    |
| 👤 Dashboard         | Manage interviews and view statistics     |
| 🎤 Interview Session | AI-generated interview questions          |
| 📝 Feedback          | AI evaluation and suggestions             |
| 📈 History           | Previous interviews and progress tracking |
| ⚙️ Profile           | User preferences and personalization      |

---

## 🌍 Environment Variables

| Variable                            | Description                  |
| ----------------------------------- | ---------------------------- |
| `DATABASE_URL`                      | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key        |
| `CLERK_SECRET_KEY`                  | Clerk secret key             |
| `NEXT_PUBLIC_GEMINI_API_KEY`        | Google Gemini API key        |

---

## 🚀 Deployment

The application can be deployed using:

* ▲ Vercel (Next.js Frontend)
* 🗄️ PostgreSQL Database
* ⚡ Drizzle ORM Migrations
* 🤖 Google Gemini API

---

## 🔒 Security

* 🔐 Secure authentication with Clerk
* 👤 Protected user dashboards
* 🔑 Environment variables for API keys
* 🛡️ Secure database access with Drizzle ORM

---

## 🎓 Project Information

This project was developed as a second-year full-stack web application project. It demonstrates the integration of modern web technologies and Artificial Intelligence to create an interactive mock interview platform that helps users improve their interview skills through AI-generated questions, personalized feedback, and performance tracking.
