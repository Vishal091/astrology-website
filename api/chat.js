export default async function handler(req, res) {

  try {

    const { message, name, dob, tob } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Vedic astrologer. Speak in Hinglish. Keep answers short.`
          },
          {
            role: "user",
            content: `User details:
Name: ${name}
DOB: ${dob}
Time: ${tob}

Question: ${message}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data); // 🔥 DEBUG

    // ✅ SAFE CHECK
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
  reply: JSON.stringify(data)
});
    }

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "⚠️ Server error"
    });
  }
}
