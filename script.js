
let wallet = 500;


const astrologers = [
{
id:1,
name:"Shubham Shastri",
skill:"Vedic Astrology",
price:25,
rating:4.9,
status:"online",
img:"https://randomuser.me/api/portraits/men/11.jpg"
},

{
id:2,
name:"Shrinath Gautam",
skill:"Palmistry",
price:20,
rating:4.7,
status:"offline",
img:"https://randomuser.me/api/portraits/men/55.jpg"
},

{
id:3,
name:"Vishal Vats",
skill:"Numerology",
price:30,
rating:4.8,
status:"online",
img:"https://randomuser.me/api/portraits/men/32.jpg"
},

{
id:4,
name:"Rahul Gautam",
skill:"Tarot Reading",
price:18,
rating:4.6,
status:"online",
img:"https://randomuser.me/api/portraits/men/25.jpg"
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
"<img src='"+a.img+"' alt='"+a.name+"' style='width:80px;border-radius:50%;'>" +
"<h3>"+a.name+"</h3>" +
"<p>"+a.skill+"</p>" +
"<p>⭐ "+a.rating+"</p>" +
"<p style='color:"+(a.status==="online"?"#2ecc71":"gray")+"'>● "+a.status+"</p>" +
"<p class='price'>₹"+a.price+"/min</p>" +
"<button onclick='openChat(\""+a.name+"\")'>Chat Now</button>";



container.appendChild(card);

});

}
function openChat(name){

window.location.href =
"chat.html?name="+encodeURIComponent(name)

}
function recharge(amount){

wallet += amount

document.getElementById("wallet").innerText = wallet

alert("Wallet recharged ₹"+amount)

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

