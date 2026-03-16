const astrologers = [
{
name:"Shubham Shastri",
skill:"Vedic Astrology",
price:20,
rating:4.8,
img:"https://i.pravatar.cc/100?img=12"
},
{
name:"Srinath Gautam",
skill:"Tarot Reading",
price:15,
rating:4.7,
img:"https://i.pravatar.cc/100?img=25"
},
{
name:"Vishal Vats",
skill:"Numerology",
price:25,
rating:4.9,
img:"https://i.pravatar.cc/100?img=32"
},
{
name:"Rahul Gautam",
skill:"Palmistry",
price:18,
rating:4.6,
img:"https://i.pravatar.cc/100?img=50"
}
];

function loadAstrologers(){

const container = document.getElementById("astrologers");

if(!container){
console.log("No astrologer container found");
return;
}

container.innerHTML = "";

astrologers.forEach((a)=>{

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${a.img}">
<h3>${a.name}</h3>
<p>${a.skill}</p>
<p>⭐ ${a.rating}</p>
<p>₹${a.price}/min</p>
<button>Chat</button>
`;

container.appendChild(card);

});

}

document.addEventListener("DOMContentLoaded", loadAstrologers);
