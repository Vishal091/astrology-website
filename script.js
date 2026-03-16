```javascript
let wallet=500

let astrologers=[
{name:"Shubham Shastri",skill:"Vedic Astrology",price:20,rating:4.8,img:"https://i.pravatar.cc/100?img=12"},
{name:"Vishal Vats",skill:"Tarot Reading",price:15,rating:4.7,img:"https://i.pravatar.cc/100?img=25"},
{name:"Srinath Gautam",skill:"Numerology",price:25,rating:4.9,img:"https://i.pravatar.cc/100?img=32"},
{name:"Rahul Gautam",skill:"Palmistry",price:18,rating:4.6,img:"https://i.pravatar.cc/100?img=50"}
]

function loadAstrologers(){

let container=document.getElementById("astrologers")

if(!container) return

astrologers.forEach(a=>{

container.innerHTML+=`

<div class="card">

<img src="${a.img}">

<h3>${a.name}</h3>

<p>${a.skill}</p>

<p>⭐ ${a.rating}</p>

<p class="price">₹${a.price}/min</p>

<button onclick="chat(${a.price})">Chat</button>

</div>

`

})

}

function chat(price){

if(wallet<price){

alert("Wallet balance low")

return

}

wallet-=price

document.getElementById("wallet").innerText=wallet

alert("Chat started with astrologer")

}

window.onload=loadAstrologers
```
