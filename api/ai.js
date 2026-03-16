
export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { question } = req.body;

const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
return res.status(500).json({ error: "HF_TOKEN missing in Vercel" });
}

const response = await fetch(
"https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
{
method: "POST",
headers: {
"Authorization": "Bearer " + HF_TOKEN,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: "You are a wise Vedic astrologer giving guidance. Question: " + question
})
}
);

const data = await response.json();

console.log("HF RESPONSE:", data);

if (data.error) {
return res.status(500).json({ error: data.error });
}

return res.status(200).json(data);

} catch (error) {

console.error(error);

return res.status(500).json({ error: "Internal server error" });

}

}

