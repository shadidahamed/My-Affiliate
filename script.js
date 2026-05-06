// 🎥 VIDEO BACKGROUNDS
const videos = [
"https://cdn.coverr.co/videos/coverr-anime-city-5586/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-cyberpunk-street-5650/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-neon-lights-1562/1080p.mp4"
];

const videoEl = document.getElementById("bgVideo");

function loadRandomVideo(){
const random = videos[Math.floor(Math.random()*videos.length)];
videoEl.src = random;
videoEl.play();
}

videoEl.addEventListener("ended", loadRandomVideo);
loadRandomVideo();


// 💰 CURRENCY
let currentCurrency="USD";
const rates={USD:1,BDT:118};

function changeCurrency(){
currentCurrency=document.getElementById("currencySelect").value;
renderProducts();
}

function getPrice(p){
const val=(p*rates[currentCurrency]).toFixed(0);
return currentCurrency==="BDT" ? "৳"+val : "$"+val;
}


// 🛒 PRODUCTS
const products=[
{id:1,name:"Gojo Figure",price:79,img:"https://picsum.photos/300?1"},
{id:2,name:"Luffy Gear 5",price:120,img:"https://picsum.photos/300?2"},
{id:3,name:"Miku Figure",price:68,img:"https://picsum.photos/300?3"}
];

function renderProducts(){
const grid=document.getElementById("productsGrid");

grid.innerHTML=products.map(p=>`
<div class="product-card" onclick="openModal(${p.id})">
<img src="${p.img}">
<h3>${p.name}</h3>
<p class="price">${getPrice(p.price)}</p>
</div>
`).join("");

// 🎯 3D TILT EFFECT
document.querySelectorAll(".product-card").forEach(card=>{
card.addEventListener("mousemove",e=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateX=(y/rect.height-0.5)*10;
const rotateY=(x/rect.width-0.5)*-10;

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform="rotateX(0) rotateY(0)";
});
});
}


// 📦 MODAL
function openModal(id){
const p=products.find(x=>x.id===id);
document.getElementById("modalBody").innerHTML=`
<h2>${p.name}</h2>
<p>${getPrice(p.price)}</p>
<button onclick="copyLink()">Copy Affiliate Link</button>
`;
document.getElementById("modal").style.display="flex";
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

function copyLink(){
navigator.clipboard.writeText("your-affiliate-link.com");
alert("Link copied!");
}


// 🎯 SCROLL
function scrollToDeals(){
document.getElementById("deals").scrollIntoView({behavior:"smooth"});
}


// INIT
renderProducts();
