
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

/* ================= TRANSLATIONS ================= */
const translations = {
    en: {
        "hero.title": "Level Up Your Collection.\nEarn While You Otaku.",
        "hero.subtitle": "Premium anime figures, cosplay, merch & tech.",
        "hero.cta": "Enter the Neon Shop",
        "categories.title": "Choose Your Realm",
        "deals.title": "Trending in the Animeverse",
        "nav.categories": "Realms",
        "nav.deals": "Deals",
        "filter.title": "Filters",
        "filter.price": "Price",
        "filter.commission": "Commission",
        "filter.reset": "Reset Filters"
    },
    bn: {
        "hero.title": "তোমার কালেকশন লেভেল আপ করো।\nওটাকু হয়ে আয় করো।",
        "hero.subtitle": "প্রিমিয়াম অ্যানিমে ফিগার ও মার্চ।",
        "hero.cta": "শপে ঢোকো",
        "categories.title": "রিয়েলম নির্বাচন করো",
        "deals.title": "ট্রেন্ডিং ডিল",
        "nav.categories": "রিয়েলম",
        "nav.deals": "ডিল",
        "filter.title": "ফিল্টার",
        "filter.price": "দাম",
        "filter.commission": "কমিশন",
        "filter.reset": "রিসেট"
    }
};

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
