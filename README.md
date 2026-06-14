# Calibrate — Career Assessment App

 🔗 [Live Site](https://calibrate-ai-frontend.vercel.app/)

A career exploration app for students and young professionals figuring out their next step.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** NestJS + TypeScript
- **AI:** Groq (llama-3.3-70b-versatile)

## Problem

Filipino students often struggle to choose a career path because most career assessment tools are built for Western contexts and don't reflect the realities of the Philippine job market. Generic quizzes return generic results, leaving students more confused than when they started.

## Solution

Calibrate takes students through a 30-question quiz across 6 dimensions: **Interests**, **Strengths**, **Work Style**, **Values**, **Future Vision**, and **Career Motivations**. It then uses AI to generate a personalized assessment summary and 3 career path recommendations grounded in the Philippine context — from BPO and tech to creative and emerging sectors.

## Why This Approach

### Why I chose this problem

Career indecision is one of the most common stressors for young Filipinos. Most available tools either give vague results or recommend careers without any local context. I wanted to build something that felt personal and actually gave constructive feedback.

### Why AI is useful here

The combination of 30 quiz answers across 6 categories produces a nuanced profile that would be impossible to address with a simple lookup table. AI allows the app to synthesize patterns across all answers and generate tailored, human-readable explanations. Using a point-based approach for this system would likely curate bias or general assumptions, given that it would not have the vast amount of input provided by AI.

### Assumptions

- Students answer honestly
- 30 questions are enough to surface meaningful patterns across 6 dimensions
- The Philippine job market context is sufficiently captured by the prompt

## Running Locally

### Backend
```bash
cd backend
npm install
# Add GROQ_API_KEY to .env
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Future Improvements

- Switch to Gemini with billing for higher quality, more consistent responses
- Add a database to save and revisit past assessments
- Expand career data with real Philippine salary ranges and demand trends
- Allow students to explore careers beyond their top 3 matches
- Add multilingual support (Filipino/Tagalog)