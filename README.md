# BUCK 💸🍜

**BUCK** is a lightweight, AI-powered web app built to help broke students find affordable, satisfying meals that match their specific vibes and needs.

Rather than giving generic results, BUCK analyzes everything from your budget and mood to dietary restrictions and group size — and returns curated restaurant suggestions using Yelp’s AI chat endpoint. Each result includes a short explanation of *why* it was picked and what it matches in your input.

This was originally made as the ultimate tool for me and my friends — fellow university students always struggling to find cheap, good food without endless scrolling or risking spots that don’t fit our vibe, group size, or dietary needs.

---

## Demo Flow
https://github.com/user-attachments/assets/acd00aa4-a300-4727-9ffb-af1ef436494a

1. Enter your **Location**, **Budget**, **Mood**, **Dietary restrictions**, **Hunger level**, **Time**, and any **Extra Info** (like how many people, whether you’re eating in, if you need seating, or if you're in a rush).
2. Hit **“Recommend Me”**
3. BUCK shows an AI-written summary and several matching restaurants — with bullet-point explanations and direct links to Yelp.

---

## Features

- **Custom Prompt Handling**
  - AI understands natural user input like “halal food for 4 people, starving, but cozy vibes”.
- **Yelp Fusion AI Integration**
  - Combines structured data (ratings, hours, photos) with AI summaries.
- **Bullet Point Summaries**
  - Each recommendation is explained in simple, readable points.
- **Smart Warnings**
  - If something doesn’t match (e.g. allergy concerns), it’s called out boldly.
- **Responsive UI**
  - Clean two-column layout with form on the left, results on the right.

---

## Tech Stack

- **Frontend**: React, JavaScript, HTML, Tailwind CSS
- **Backend**: Node.js, Express
- **AI/ML Integration**: Yelp Fusion AI API

---

## Setup

```bash
# Clone the project
git clone https://github.com/samtjhia/buck.git
cd buck

# Install backend dependencies
cd server
npm install

# Add your Yelp API key
echo "YELP_API_KEY=your_api_key_here" > .env

# Start backend
node index.js

# In a new terminal, install frontend
cd ../client
npm install

# Start frontend
npm run dev
```

---
## API Limits

- **Free tier** allows **100 AI-powered searches per day**
- Once exhausted, the web app will not work (unless you upgrade).

