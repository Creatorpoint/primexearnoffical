// Load Offers
function loadOffers(){
  const offers = JSON.parse(localStorage.getItem("offers")) || [];
  const container = document.getElementById("offers");

  if(!container) return;

  container.innerHTML = "";

  offers.forEach((offer,index)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${offer.image}">
        <h3>${offer.title}</h3>
        <p class="price">₹${offer.price}</p>
        <button onclick="showPopup('${offer.title}','${offer.price}')">
          View Offer
        </button>
      </div>
    `;
  });
}

// Add Offer (Admin)
function addOffer(){
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  if(!title || !price || !image){
    alert("Fill all fields");
    return;
  }

  const offers = JSON.parse(localStorage.getItem("offers")) || [];

  offers.push({
    title:title,
    price:price,
    image:image
  });

  localStorage.setItem("offers", JSON.stringify(offers));

  alert("Offer Added Successfully ✅");
  location.reload();
}

// Popup
function showPopup(title,price){
  document.getElementById("popupText").innerHTML =
  `${title} available at just ₹${price}`;
  document.getElementById("popup").style.display="flex";
}

function closePopup(){
  document.getElementById("popup").style.display="none";
}

window.onload = loadOffers;
