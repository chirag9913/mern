const axios = require("axios");

async function askAI(question) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "arcee-ai/trinity-large-preview:free",
      messages: [
        { role: "user", content: question }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Visibility Analyzer"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = askAI;
