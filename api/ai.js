export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { message, name, dob, tob } = body;

    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    const HF_TOKEN = process.env.HF_TOKEN;

    if (!HF_TOKEN) {
      return res.status(500).json({ error: "HF_TOKEN not configured" });
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + HF_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "system",
              content: `You are a professional Indian Vedic astrologer (Pandit ji).
Speak in Hinglish (Hindi + English mix).
Use words like kundli, grah, Shani, Rahu, energy.

Rules:
- Keep answers short (2-4 lines)
- Sound confident
- Give guidance, not guarantees
- Be spiritual but practical

User Details:
Name: ${name}
DOB: ${dob}
Time: ${tob}`
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        error: "AI returned no response",
        raw: data
      });
    }

    const reply = data.choices[0].message.content;

    return res.status(200).json({ reply });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: "Internal server error"
    });

  }

}
