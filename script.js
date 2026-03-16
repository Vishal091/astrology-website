
let wallet = 500;


const astrologers = [
{
id:1,
name:"Shubham Shastri",
skill:"Vedic Astrology",
price:25,
rating:4.9,
status:"online",
img:"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1"
},

{
id:2,
name:"Shrinath Gautam",
skill:"Palmistry",
price:20,
rating:4.7,
status:"offline",
img:"https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
},

{
id:3,
name:"Vishal Vats",
skill:"Numerology",
price:30,
rating:4.8,
status:"online",
img:"https://images.unsplash.com/photo-1599566150163-29194dcaad36"
},

{
id:4,
name:"Rahul Gautam",
skill:"Tarot Reading",
price:18,
rating:4.6,
status:"online",
img:"https://images.unsplash.com/photo-1607746882042-944635dfe10e"
}
];



function loadAstrologers(list = astrologers){

const container = document.getElementById("astrologers");

if(!container) return;

container.innerHTML = "";

list.forEach((a)=>{

let statusColor = a.status === "online" ? "green" : "gray";

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${a.img}">
<h3>${a.name}</h3>
<p>${a.skill}</p>
<p>⭐ ${a.rating}</p>

<p style="color:${statusColor}">
● ${a.status}
</p>

<p>₹${a.price}/min</p>

<button onclick="openProfile(${a.id})">
View Profile
</button>

`;

container.appendChild(card);

});

}

function searchAstrologer(name){

let filtered = astrologers.filter(a =>
a.name.toLowerCase().includes(name.toLowerCase())
)

loadAstrologers(filtered)

}

function openProfile(id){

window.location.href = "profile.html?id=" + id

}

document.addEventListener("DOMContentLoaded", loadAstrologers);
```
