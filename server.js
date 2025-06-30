
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
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await openaiRes.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch OpenAI response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
