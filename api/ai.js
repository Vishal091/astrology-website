
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
"https://router.huggingface.co/v1/chat/completions",
{
method: "POST",
headers: {
"Authorization": "Bearer " + HF_TOKEN,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "mistralai/Mistral-7B-Instruct-v0.2",
messages: [
{
role: "system",
content: "You are a wise Vedic astrologer giving calm spiritual guidance."
},
{
role: "user",
content: question
}
],
max_tokens: 300
})
}
);


const text = await response.text()

let data
try {
data = JSON.parse(text)
} catch {
return res.status(500).json({ error: text })
}

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

