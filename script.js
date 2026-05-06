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
    en: {
        "hero.title": "Level Up Your Collection.\nEarn While You Otaku.",
        "hero.subtitle": "Premium anime figures, cosplay, merch & tech from Amazon, Alibaba & AliExpress.",
        "hero.cta": "Enter the Neon Shop",
        "deals.title": "Trending in the Animeverse",
        "categories.title": "Choose Your Realm",
        "nav.categories": "Realms",
        "nav.deals": "Neon Deals",
        "filter.title": "Advanced Filters",
        "filter.price": "Price Range",
        "filter.commission": "Minimum Commission",
        "filter.reset": "Reset Filters",
        "footer.tagline": "Leveling up otakus one deal at a time • Made with 🔥 in Bangladesh",
        "footer.quick": "Quick Links",
        "footer.stores": "Popular Stores",
        "footer.connect": "Connect"
    },
    bn: {
        "hero.title": "তোমার কালেকশন লেভেল আপ করো।\nওটাকু হয়ে আয় করো।",
        "hero.subtitle": "আমাজন, আলিবাবা ও অ্যালিএক্সপ্রেস থেকে প্রিমিয়াম অ্যানিমে ফিগার, কসপ্লে ও মার্চ।",
        "hero.cta": "নিয়ন শপে ঢোকো",
        "deals.title": "অ্যানিমেভার্সে ট্রেন্ডিং",
        "categories.title": "তোমার রিয়েলম বেছে নাও",
        "nav.categories": "রিয়েলম",
        "nav.deals": "নিয়ন ডিল",
        "filter.title": "অ্যাডভান্সড ফিল্টার",
        "filter.price": "মূল্য পরিসীমা",
        "filter.commission": "ন্যূনতম কমিশন",
        "filter.reset": "ফিল্টার রিসেট করুন",
        "footer.tagline": "ওটাকুদের লেভেল আপ করছি একটি ডিলে • বাংলাদেশে তৈরি",
        "footer.quick": "দ্রুত লিঙ্ক",
        "footer.stores": "জনপ্রিয় স্টোর",
        "footer.connect": "যোগাযোগ করুন"
    },
    es: {
        "hero.title": "Sube de Nivel tu Colección.\nGana Mientras Eres Otaku.",
        "hero.subtitle": "Figuras anime premium, cosplay y merch de Amazon, Alibaba y AliExpress.",
        "hero.cta": "Entrar a la Tienda Neon",
        "deals.title": "Tendencias en el Animeverso",
        "categories.title": "Elige tu Reino",
        "nav.categories": "Reinos",
        "nav.deals": "Ofertas Neon",
        "filter.title": "Filtros Avanzados",
        "filter.price": "Rango de Precio",
        "filter.commission": "Comisión Mínima",
        "filter.reset": "Restablecer Filtros",
        "footer.tagline": "Subiendo de nivel a otakus una oferta a la vez • Hecho con 🔥 en Bangladesh"
    },
    fr: {
        "hero.title": "Améliore ta Collection.\nGagne en étant Otaku.",
        "hero.subtitle": "Figures anime premium, cosplay & merch depuis Amazon, Alibaba & AliExpress.",
        "hero.cta": "Entrer dans la Boutique Neon",
        "deals.title": "Tendances dans l'Animeverse",
        "categories.title": "Choisis ton Royaume",
        "nav.categories": "Royaumes",
        "nav.deals": "Offres Neon",
        "filter.title": "Filtres Avancés",
        "filter.price": "Fourchette de Prix",
        "filter.commission": "Commission Minimum",
        "filter.reset": "Réinitialiser"
    },
    hi: {
        "hero.title": "अपनी कलेक्शन को लेवल अप करो।\nओटाकू बनकर कमाओ।",
        "hero.subtitle": "Amazon, Alibaba और AliExpress से प्रीमियम एनीमे फिगर्स, कॉसप्ले और मर्च।",
        "hero.cta": "नियोन शॉप में प्रवेश करो",
        "deals.title": "एनिमेवर्स में ट्रेंडिंग",
        "categories.title": "अपना रियल्म चुनो",
        "nav.categories": "रियल्म्स",
        "nav.deals": "नियोन डील्स",
        "filter.title": "एडवांस्ड फिल्टर",
        "filter.price": "कीमत रेंज",
        "filter.reset": "फिल्टर रीसेट करें"
    },
    ja: {
        "hero.title": "コレクションをレベルアップ。\nオタクしながら稼ごう。",
        "hero.subtitle": "Amazon、Alibaba、AliExpressからプレミアムアニメフィギュア・コスプレ・マーチ。",
        "hero.cta": "ネオンショップへ入る",
        "deals.title": "アニメバースのトレンド",
        "categories.title": "あなたの領域を選ぼう",
        "nav.categories": "領域",
        "nav.deals": "ネオンディール",
        "filter.title": "高度なフィルター",
        "filter.price": "価格帯",
        "filter.reset": "フィルターをリセット"
    }
};

let currentLang = "en";
// ... (rest of your variables remain the same)

// 💰 CURRENCY
let currentCurrency="USD";
const rates = {
    USD: 1,
    BDT: 118,
    EUR: 0.92,
    JPY: 145,
    INR: 83.5,
    GBP: 0.79
};

function changeCurrency(){
currentCurrency=document.getElementById("currencySelect").value;
renderProducts();
}

function getPrice(p){
const val=(p*rates[currentCurrency]).toFixed(0);
return currentCurrency==="BDT" ? "৳"+val : "$"+val;
}


// Categories and Products remain the same...

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Optional: Change html lang attribute
    document.documentElement.lang = lang;
}

// Rest of the script.js (render functions, showProduct, etc.) remains exactly the same as previous version.


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
