```javascript
export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const body = typeof req.body === "string"
? JSON.parse(req.body)
: req.body;

const question = body?.question;

if (!question) {
return res.status(400).json({ error: "Question missing" });
}

const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
return res.status(500).json({ error: "HF_TOKEN not configured in Vercel" });
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
content:
"You are a wise Vedic astrologer who provides calm, thoughtful, spiritual guidance about life, relationships, and career. Avoid absolute predictions."
},
{
role: "user",
content: question
}
],
max_tokens: 300,
temperature: 0.7
})
}
);

const data = await response.json();

console.log("HF RESPONSE:", data);

if (!data.choices || !data.choices.length) {
return res.status(500).json({ error: "AI returned no response", raw: data });
}

const answer = data.choices[0].message.content;

return res.status(200).json({ answer });

} catch (error) {

console.error("SERVER ERROR:", error);

return res.status(500).json({
error: "Internal server error contacting AI"
});

}

}
```
