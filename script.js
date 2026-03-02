// ===== PASSWORD SYSTEM =====
if (!localStorage.getItem("adminPass")) {
  localStorage.setItem("adminPass", "PrimeX@123");
}

let offers = JSON.parse(localStorage.getItem("offers")) || [];

function saveData() {
  localStorage.setItem("offers", JSON.stringify(offers));
}

// ===== LOGIN =====
function login() {
  let input = document.getElementById("loginPass").value;
  if (input === localStorage.getItem("adminPass")) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAdmin();
  } else {
    alert("Wrong Password ❌");
  }
}

// ===== CHANGE PASSWORD =====
function changePassword() {
  let current = document.getElementById("currentPass").value;
  let newPass = document.getElementById("newPass").value;

  if (current !== localStorage.getItem("adminPass")) {
    alert("Current Password Wrong ❌");
    return;
  }

  localStorage.setItem("adminPass", newPass);
  alert("Password Updated ✅");
}

// ===== ADD OFFER =====
function addOffer() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let link = document.getElementById("link").value;
  let expiry = document.getElementById("expiry").value;
  let rating = document.getElementById("rating").value;
  let featured = document.getElementById("featured").checked;

  let imageFile = document.getElementById("imageFile").files[0];
  let videoFile = document.getElementById("videoFile").files[0];

  if (!imageFile) {
    alert("Image Required ❌");
    return;
  }

  let imageReader = new FileReader();
  imageReader.onload = function (e) {
    let imageData = e.target.result;

    if (videoFile) {
      let videoReader = new FileReader();
      videoReader.onload = function (v) {
        saveOffer(title, desc, link, expiry, rating, featured, imageData, v.target.result);
      };
      videoReader.readAsDataURL(videoFile);
    } else {
      saveOffer(title, desc, link, expiry, rating, featured, imageData, null);
    }
  };

  imageReader.readAsDataURL(imageFile);
}

function saveOffer(title, desc, link, expiry, rating, featured, image, video) {
  offers.push({
    title,
    desc,
    link,
    expiry,
    rating,
    featured,
    image,
    video,
    clicks: 0
  });

  saveData();
  alert("Offer Published Successfully 🚀");
  location.reload();
}

// ===== LOAD ADMIN LIST =====
function loadAdmin() {
  let box = document.getElementById("adminOffers");
  box.innerHTML = "";

  offers.forEach((o, i) => {
    box.innerHTML += `
      <div class="admin-item">
        <span>${o.title}</span>
        <button onclick="deleteOffer(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteOffer(i) {
  offers.splice(i, 1);
  saveData();
  location.reload();
}
