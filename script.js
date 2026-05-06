
/* ================= STATE ================= */
let currentLang = "en";
let currentCurrency = "USD";
let currentFilter = "All";
let currentSort = "default";
let currentSearch = "";

/* ================= CURRENCY ================= */
const rates = {
    USD: 1,
    BDT: 118,
    EUR: 0.92,
    JPY: 145,
    INR: 83,
    GBP: 0.79
};

// 🌍 TRANSLATIONS
const translations = {
    en: {
        "hero.title": "Level Up Your Collection.<br>Earn While You Otaku.",
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
        "hero.title": "তোমার কালেকশন লেভেল আপ করো।<br>ওটাকু হয়ে আয় করো।",
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
        "hero.title": "Sube de Nivel tu Colección.<br>Gana Mientras Eres Otaku.",
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
        "footer.tagline": "Subiendo de nivel a otakus una oferta a la vez • Hecho en Bangladesh",
        "footer.quick": "Enlaces Rápidos",
        "footer.stores": "Tiendas Populares",
        "footer.connect": "Conectar"
    },

    fr: {
        "hero.title": "Améliore ta Collection.<br>Gagne en étant Otaku.",
        "hero.subtitle": "Figures anime premium, cosplay & merch depuis Amazon, Alibaba & AliExpress.",
        "hero.cta": "Entrer dans la Boutique Neon",
        "deals.title": "Tendances dans l'Animeverse",
        "categories.title": "Choisis ton Royaume",
        "nav.categories": "Royaumes",
        "nav.deals": "Offres Neon",
        "filter.title": "Filtres Avancés",
        "filter.price": "Fourchette de Prix",
        "filter.commission": "Commission Minimum",
        "filter.reset": "Réinitialiser",
        "footer.quick": "Liens Rapides",
        "footer.stores": "Magasins Populaires",
        "footer.connect": "Connexion"
    },

    hi: {
        "hero.title": "अपनी कलेक्शन को लेवल अप करो।<br>ओटाकू बनकर कमाओ।",
        "hero.subtitle": "Amazon, Alibaba और AliExpress से प्रीमियम एनीमे फिगर्स, कॉसप्ले और मर्च।",
        "hero.cta": "नियोन शॉप में प्रवेश करो",
        "deals.title": "एनिमेवर्स में ट्रेंडिंग",
        "categories.title": "अपना रियल्म चुनो",
        "nav.categories": "रियल्म्स",
        "nav.deals": "नियोन डील्स",
        "filter.title": "एडवांस्ड फिल्टर",
        "filter.price": "कीमत रेंज",
        "filter.commission": "न्यूनतम कमीशन",
        "filter.reset": "फिल्टर रीसेट करें"
    },

    ja: {
        "hero.title": "コレクションをレベルアップ。<br>オタクしながら稼ごう。",
        "hero.subtitle": "Amazon、Alibaba、AliExpressからプレミアムアニメフィギュア・コスプレ・マーチ。",
        "hero.cta": "ネオンショップへ入る",
        "deals.title": "アニメバースのトレンド",
        "categories.title": "あなたの領域を選ぼう",
        "nav.categories": "領域",
        "nav.deals": "ネオンディール",
        "filter.title": "高度なフィルター",
        "filter.price": "価格帯",
        "filter.commission": "最低コミッション",
        "filter.reset": "フィルターをリセット"
    }
};

let currentLang = "en";


// 🌍 CHANGE LANGUAGE (FIXED VERSION)
function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");

        // fallback system
        const translatedText =
            (translations[lang] && translations[lang][key]) ||
            (translations["en"] && translations["en"][key]) ||
            key;

        // IMPORTANT: use innerHTML for <br>
        el.innerHTML = translatedText;
    });

    document.documentElement.lang = lang;
}


// 🌍 AUTO DETECT LANGUAGE (SMART)
document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language.slice(0, 2);

    if (translations[userLang]) {
        currentLang = userLang;
        document.getElementById("langSelect").value = userLang;
        changeLanguage(userLang);
    } else {
        changeLanguage("en");
    }
});


/* ================= PRODUCTS ================= */
const products = [
    {
        id: 1,
        name: "Hatsune Miku Figure",
        price: 60,
        commission: 15,
        image: "https://picsum.photos/400/300?1",
        category: "Anime"
    },
    {
        id: 2,
        name: "Goku Statue",
        price: 120,
        commission: 12,
        image: "https://picsum.photos/400/300?2",
        category: "Anime"
    },
    {
        id: 3,
        name: "Anime Hoodie",
        price: 45,
        commission: 18,
        image: "https://picsum.photos/400/300?3",
        category: "Fashion"
    }
];

/* ================= VIDEO BACKGROUND ================= */
const videos = [
    "https://cdn.coverr.co/videos/coverr-anime-city-night-8571/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-cyberpunk-city-7684/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-neon-lights-6541/1080p.mp4"
];

function playRandomVideo() {
    const video = document.getElementById("bgVideo");

    function setVideo() {
        const random = Math.floor(Math.random() * videos.length);
        video.src = videos[random];
        video.play();
    }

    setVideo();

    video.addEventListener("ended", setVideo);
}

/* ================= LANGUAGE ================= */
function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

/* ================= CURRENCY ================= */
function changeCurrency() {
    currentCurrency = document.getElementById("currencySelect").value;
    renderProducts();
}

/* ================= FORMAT PRICE ================= */
function formatPrice(price) {
    return (price * rates[currentCurrency]).toFixed(0) + " " + currentCurrency;
}

/* ================= SEARCH ================= */
function handleSearch() {
    currentSearch = document.getElementById("searchInput").value.toLowerCase();
    renderProducts();
}

/* ================= FILTER ================= */
function applyFilters() {
    renderProducts();
}

function resetFilters() {
    currentSearch = "";
    document.getElementById("searchInput").value = "";
    renderProducts();
}

/* ================= SORT ================= */
function applySort() {
    currentSort = document.getElementById("sortSelect").value;
    renderProducts();
}

/* ================= RENDER PRODUCTS ================= */
function renderProducts() {
    const grid = document.getElementById("productsGrid");

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(currentSearch) ||
        p.category.toLowerCase().includes(currentSearch)
    );

    if (currentSort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    }
    if (currentSort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    }
    if (currentSort === "commission") {
        filtered.sort((a, b) => b.commission - a.commission);
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openProduct(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">${formatPrice(p.price)}</p>
            <small>${p.commission}% commission</small>
        </div>
    `).join("");
}

/* ================= CATEGORIES (simple demo) ================= */
function renderCategories() {
    const grid = document.getElementById("categoriesGrid");

    const categories = ["Anime", "Fashion", "Gaming"];

    grid.innerHTML = categories.map(c => `
        <div class="category-card" onclick="filterCategory('${c}')">
            <h3>${c}</h3>
        </div>
    `).join("");
}

function filterCategory(cat) {
    currentSearch = cat;
    document.getElementById("searchInput").value = cat;
    renderProducts();
}

/* ================= MODAL ================= */
function openProduct(id) {
    const p = products.find(x => x.id === id);

    document.getElementById("modalBody").innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.image}" style="width:100%;border-radius:10px;">
        <p>Price: ${formatPrice(p.price)}</p>
        <p>Commission: ${p.commission}%</p>
        <button class="btn-primary">Buy Now</button>
    `;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

/* ================= FILTER PANEL ================= */
function toggleFilterPanel() {
    document.getElementById("filterPanel").classList.toggle("active");
}

/* ================= SCROLL ================= */
function scrollToDeals() {
    document.getElementById("deals").scrollIntoView({ behavior: "smooth" });
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    playRandomVideo();
});
