
let wallet = 500;

const astrologers = [
{
name: "Shubham Shastri",
skill: "Vedic Astrology",
price: 20,
rating: 4.8,
img: "https://i.pravatar.cc/100?img=12"
},
{
name: "Shrinath Gautam",
skill: "Tarot Reading",
price: 15,
rating: 4.7,
img: "https://i.pravatar.cc/100?img=25"
},
{
name: "Vishal Vats",
skill: "Numerology",
price: 25,
rating: 4.9,
img: "https://i.pravatar.cc/100?img=32"
},
{
name: "Rahul Gautam",
skill: "Palmistry",
price: 18,
rating: 4.6,
img: "https://i.pravatar.cc/100?img=50"
}
];

function loadAstrologers(){

const container = document.getElementById("astrologers");

if(!container){
console.log("Astrologer container not found");
return;
}

container.innerHTML = "";

astrologers.forEach((astro)=>{

const card = document.createElement("div");

card.className = "card";

card.innerHTML = `
<img src="${astro.img}">
<h3>${astro.name}</h3>
<p>${astro.skill}</p>
<p>⭐ ${astro.rating}</p>
<p class="price">₹${astro.price}/min</p>
<button onclick="startChat(${astro.price})">Chat</button>
`;

container.appendChild(card);

});

}

function startChat(price){

if(wallet < price){
alert("Wallet balance low");
return;
}

wallet -= price;

const walletElement = document.getElementById("wallet");

if(walletElement){
walletElement.innerText = wallet;
}

alert("Chat started 🔮");

}

window.onload = loadAstrologers;
```
