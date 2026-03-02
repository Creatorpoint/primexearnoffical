// Default Password
if(!localStorage.getItem("adminPass")){
localStorage.setItem("adminPass","PrimeX@123");
}

let offers = JSON.parse(localStorage.getItem("offers")) || [];

function saveData(){
localStorage.setItem("offers",JSON.stringify(offers));
}

function login(){
let input = document.getElementById("loginPass").value;
if(input === localStorage.getItem("adminPass")){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminPanel").style.display="block";
loadAdmin();
}else{
alert("Wrong Password");
}
}

function changePassword(){
let current = document.getElementById("currentPass").value;
let newPass = document.getElementById("newPass").value;

if(current !== localStorage.getItem("adminPass")){
alert("Current Password Wrong");
return;
}

localStorage.setItem("adminPass",newPass);
alert("Password Updated");
}

function addOffer(){
let title=document.getElementById("title").value;
let desc=document.getElementById("desc").value;
let link=document.getElementById("link").value;
let expiry=document.getElementById("expiry").value;
let rating=document.getElementById("rating").value;
let featured=document.getElementById("featured").checked;

let imageFile=document.getElementById("imageFile").files[0];
let videoFile=document.getElementById("videoFile").files[0];

let reader=new FileReader();

reader.onload=function(e){
let imageData=e.target.result;

if(videoFile){
let videoReader=new FileReader();
videoReader.onload=function(v){
saveOffer(imageData,v.target.result);
}
videoReader.readAsDataURL(videoFile);
}else{
saveOffer(imageData,null);
}
}

if(imageFile){
reader.readAsDataURL(imageFile);
}else{
alert("Upload Image Required");
}
}

function saveOffer(image,video){
offers.push({
title,
desc,
link,
expiry,
rating,
featured,
image,
video,
clicks:0
});
saveData();
alert("Offer Published");
location.reload();
}

function loadAdmin(){
let box=document.getElementById("adminOffers");
box.innerHTML="";
offers.forEach((o,i)=>{
box.innerHTML+=`
<div>
${o.title} 👁 ${o.clicks}
<button onclick="deleteOffer(${i})">Delete</button>
</div>`;
});
}

function deleteOffer(i){
offers.splice(i,1);
saveData();
location.reload();
}

function displayOffers(){
let box=document.getElementById("offers");
let featuredBox=document.getElementById("featured");
if(!box) return;

box.innerHTML="";
featuredBox.innerHTML="";

offers.forEach((o,i)=>{

let stars=""; 
for(let s=0;s<5;s++){
stars+= s<o.rating?"⭐":"☆";
}

let card=`
<div class="offer-card glass">
${o.featured?"<div class='featured'>📌 Featured</div>":""}
<img src="${o.image}">
${o.video?`<video controls src="${o.video}"></video>`:""}
<h3>${o.title}</h3>
<p>${o.desc}</p>
<div>⭐ ${stars}</div>
<div>👁 ${o.clicks}</div>
<button onclick="claim(${i})">🚀 Claim Offer</button>
</div>`;

if(o.featured){
featuredBox.innerHTML+=card;
}else{
box.innerHTML+=card;
}
});
}

function claim(i){
offers[i].clicks++;
saveData();
window.open(offers[i].link,"_blank");
displayOffers();
}

function closePopup(){
document.getElementById("joinPopup").style.display="none";
}

setTimeout(()=>{
let pop=document.getElementById("joinPopup");
if(pop) pop.style.display="flex";
},3000);

displayOffers();
