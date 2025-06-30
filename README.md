
# AI Legal Assistant (Backend)

A secure Node.js backend for the AI Legal Assistant app. This proxy securely handles OpenAI API requests so the API key is never exposed on the frontend.

## 🔐 Environment Variables

Create a `.env` file in the root:

OPENAI_API_KEY=your_openai_key_here

## 🚀 Deploy on Render

1. Push this repo to GitHub
2. Go to https://render.com
3. Click "New Web Service" > Connect your repo
4. Add your OPENAI_API_KEY as an environment variable
5. Done!

## 🛠️ Run Locally

npm install
node server.js

Your server will be running on http://localhost:3000
