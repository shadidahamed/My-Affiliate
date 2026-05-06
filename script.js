// 🎥 VIDEO BACKGROUND
const videos = [
"https://cdn.coverr.co/videos/coverr-anime-city-5586/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-cyberpunk-street-5650/1080p.mp4",
"https://cdn.coverr.co/videos/coverr-neon-lights-1562/1080p.mp4"
];

const bgVideo = document.getElementById("bgVideo");

function loadRandomVideo(){
const v = videos[Math.floor(Math.random()*videos.length)];
bgVideo.src = v;
bgVideo.play().catch(()=>{});
}
bgVideo.addEventListener("ended", loadRandomVideo);
loadRandomVideo();


// 🌍 TRANSLATIONS
const translations = {
en:{
"hero.title":"Level Up Your Collection.<br>Earn While You Otaku.",
"hero.subtitle":"Premium anime merch & deals",
"hero.cta":"Enter Shop",
"deals.title":"Trending Now"
},
bn:{
"hero.title":"তোমার কালেকশন লেভেল আপ করো<br>ওটাকু হয়ে আয় করো",
"hero.subtitle":"প্রিমিয়াম অ্যানিমে প্রোডাক্ট",
"hero.cta":"শপে ঢোকো",
"deals.title":"ট্রেন্ডিং এখন"
}
};

let currentLang="en";

function changeLanguage(lang){
currentLang=lang;

document.querySelectorAll("[data-translate]").forEach(el=>{
const key=el.getAttribute("data-translate");
el.innerHTML = translations[lang][key] || translations["en"][key];
});
}


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
alert("Copied!");
}


// 🎯 SCROLL
function scrollToDeals(){
document.getElementById("deals").scrollIntoView({behavior:"smooth"});
}


// INIT
document.addEventListener("DOMContentLoaded",()=>{
changeLanguage("en");
renderProducts();
});
