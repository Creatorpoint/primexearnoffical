// ===== ADMIN PASSWORD SYSTEM =====

// Default password (first time only)
if(!localStorage.getItem("adminPassword")){
    localStorage.setItem("adminPassword","admin123");
}

function checkLogin(){
let pass = document.getElementById("adminPass").value;
let savedPass = localStorage.getItem("adminPassword");

if(pass === savedPass){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminPanel").style.display="block";
loadAdminOffers();
}else{
alert("❌ Wrong Password");
}
// Change Password
function changePassword(){
let current = document.getElementById("currentPass").value;
let newPass = document.getElementById("newPass").value;

let savedPass = localStorage.getItem("adminPassword");

if(current !== savedPass){
alert("❌ Current Password Incorrect");
return;
}

if(newPass.length < 5){
alert("⚠ Password must be at least 5 characters");
return;
}

localStorage.setItem("adminPassword", newPass);
alert("✅ Password Changed Successfully");
document.getElementById("currentPass").value="";
document.getElementById("newPass").value="";
}
let offers = JSON.parse(localStorage.getItem("offers")) || [];

function saveOffers(){
localStorage.setItem("offers", JSON.stringify(offers));
}

function displayOffers(){
const container = document.getElementById("offers-container");
const featuredBox = document.getElementById("featured-section");

if(!container) return;

container.innerHTML="";
featuredBox.innerHTML="";

offers.forEach((offer,index)=>{

let countdown = getCountdown(offer.expiry);
let stars = generateStars(offer.rating || 0);

let card = `
<div class="offer-card glass">
${offer.featured ? "<div class='featured'>📌 Featured</div>" : ""}
<img src="${offer.image}">
<h3>🔥 ${offer.title}</h3>
<p>${offer.desc}</p>

<div class="rating">${stars}</div>
<div class="countdown">⏳ ${countdown}</div>
<div class="clicks">👁 ${offer.clicks || 0} Views</div>

<button onclick="handleClick(${index})" class="claim-btn">
🚀 Claim Offer
</button>
</div>
`;

if(offer.featured){
featuredBox.innerHTML += card;
}else{
container.innerHTML += card;
}

});
}

function handleClick(index){
offers[index].clicks = (offers[index].clicks || 0) + 1;
saveOffers();
window.open(offers[index].link,"_blank");
displayOffers();
}

function generateStars(num){
let stars="";
for(let i=0;i<5;i++){
stars += i < num ? "⭐" : "☆";
}
return stars;
}

function getCountdown(date){
if(!date) return "No Limit";
let diff = new Date(date) - new Date();
if(diff <=0) return "Expired";
let days = Math.floor(diff/86400000);
let hours = Math.floor((diff%86400000)/3600000);
return days+"D "+hours+"H Left";
}

function closePopup(){
document.getElementById("popup").style.display="none";
}

setTimeout(()=>{
document.getElementById("popup").style.display="flex";
},3000);

displayOffers();
