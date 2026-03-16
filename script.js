
let wallet = 500;

const astrologers = [
{
id: 1,
name: "Shubham Shastri",
skill: "Vedic Astrology",
price: 25,
rating: 4.9,
status: "online",
img: "https://i.pravatar.cc/100?img=65"
},
{
id: 2,
name: "Shrinath Gautam",
skill: "Palmistry",
price: 20,
rating: 4.7,
status: "offline",
img: "https://i.pravatar.cc/100?img=60"
},
{
id: 3,
name: "Vishal Vats",
skill: "Numerology",
price: 30,
rating: 4.8,
status: "online",
img: "https://i.pravatar.cc/100?img=12"
},
{
id: 4,
name: "Rahul Gautam",
skill: "Tarot Reading",
price: 18,
rating: 4.6,
status: "online",
img: "https://i.pravatar.cc/100?img=32"
}
];

function loadAstrologers(list = astrologers) {

const container = document.getElementById("astrologers");

if (!container) return;

container.innerHTML = "";

list.forEach(function(a){

const card = document.createElement("div");

card.className = "card";

card.innerHTML =
"<img src='"+a.img+"'>" +
"<h3>"+a.name+"</h3>" +
"<p>"+a.skill+"</p>" +
"<p>⭐ "+a.rating+"</p>" +
"<p style='color:"+(a.status==="online"?"green":"gray")+"'>● "+a.status+"</p>" +
"<p>₹"+a.price+"/min</p>" +
"<button onclick='openProfile("+a.id+")'>View Profile</button>";

container.appendChild(card);

});

}

function openProfile(id){
window.location.href = "profile.html?id=" + id;
}

function searchAstrologer(name){

const filtered = astrologers.filter(function(a){
return a.name.toLowerCase().includes(name.toLowerCase());
});

loadAstrologers(filtered);

}

document.addEventListener("DOMContentLoaded", function(){
loadAstrologers();
});

