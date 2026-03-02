let offers = JSON.parse(localStorage.getItem("offers")) || [];

function saveOffers() {
localStorage.setItem("offers", JSON.stringify(offers));
}

function displayOffers() {
const container = document.getElementById("offers-container");
if(!container) return;
container.innerHTML = "";

offers.reverse().forEach((offer,index)=>{
container.innerHTML += `
<div class="offer-card">
<img src="${offer.image}">
<h3>${offer.title}</h3>
<p>${offer.desc}</p>
<a href="${offer.link}" target="_blank">View Offer</a>
</div>
`;
});
}

function checkLogin(){
let pass = document.getElementById("adminPass").value;
if(pass === "admin123"){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminPanel").style.display="block";
loadAdminOffers();
}else{
alert("Wrong Password");
}
}

function addOffer(){
let title = document.getElementById("title").value;
let image = document.getElementById("image").value;
let desc = document.getElementById("desc").value;
let link = document.getElementById("link").value;

offers.push({title,image,desc,link});
saveOffers();
alert("Offer Published!");
location.reload();
}

function loadAdminOffers(){
let box = document.getElementById("adminOffers");
box.innerHTML="";
offers.forEach((offer,index)=>{
box.innerHTML += `
<div>
<p>${offer.title}</p>
<button onclick="deleteOffer(${index})">Delete</button>
</div>
`;
});
}

function deleteOffer(index){
offers.splice(index,1);
saveOffers();
location.reload();
}

displayOffers();
