```javascript
export default async function handler(req, res) {

const HF_TOKEN = "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"

try{

const response = await fetch(
"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
{
method:"POST",
headers:{
Authorization: "Bearer " + HF_TOKEN,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: "You are a wise Vedic astrologer giving guidance. Question: " + req.body.question
})
}
)

const data = await response.json()

res.status(200).json(data)

}catch(error){

res.status(500).json({error:"AI request failed"})

}

}
```
