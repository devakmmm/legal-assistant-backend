const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/legal', async (req, res) => {
  const userQuestion = req.body.question;

  const prompt = `You are a paralegal AI trained to answer common U.S. legal questions for non-lawyers in plain English. Always preface with: 'This is not legal advice.' Categorize your response and include links to relevant legal resources if possible.\n\nQuestion: ${userQuestion}`;

  try {
    const togetherRes = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await togetherRes.json();

    if (!togetherRes.ok || data.error) {
      console.error("Together.ai API error:", data.error || data);
      return res.status(500).json({ error: "Together.ai API error", details: data.error });
    }

    res.json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Failed to fetch Together.ai response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

