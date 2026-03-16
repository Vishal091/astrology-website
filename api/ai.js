
export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { question } = req.body;

const HF_TOKEN = process.env.HF_TOKEN

const response = await fetch(
"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
{
method: "POST",
headers: {
Authorization: `Bearer ${HF_TOKEN}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: `You are a wise Vedic astrologer giving spiritual guidance. Question: ${question}`
})
}
);

const data = await response.json();

return res.status(200).json(data);

} catch (error) {

console.error(error);

return res.status(500).json({
error: "AI request failed"
});

}

}

