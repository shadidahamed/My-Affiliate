const translations = {
    en: {
        "hero.title": "Level Up Your Collection.\nEarn While You Otaku.",
        "hero.subtitle": "Premium anime figures, cosplay, merch & tech from Amazon, Alibaba & AliExpress.",
        "hero.cta": "Enter the Neon Shop",
        "deals.title": "Trending in the Animeverse",
        "categories.title": "Choose Your Realm",
        "nav.categories": "Realms",
        "nav.deals": "Neon Deals"
    },
    bn: {
        "hero.title": "তোমার কালেকশন লেভেল আপ করো।\nওটাকু হয়ে আয় করো।",
        "hero.subtitle": "আমাজন, আলিবাবা ও অ্যালিএক্সপ্রেস থেকে প্রিমিয়াম অ্যানিমে ফিগার, কসপ্লে ও মার্চ।",
        "hero.cta": "নিয়ন শপে ঢোকো",
        "deals.title": "অ্যানিমেভার্সে ট্রেন্ডিং",
        "categories.title": "তোমার রিয়েলম বেছে নাও",
        "nav.categories": "রিয়েলম",
        "nav.deals": "নিয়ন ডিল"
    }
};

let currentLang = "en";
let currentCurrency = "USD";
let currentFilter = "All";
let currentSort = "default";
let currentSearchTerm = "";
let minPriceFilter = 0;
let maxPriceFilter = Infinity;
let minCommissionFilter = 0;

const rates = { USD: 1, BDT: 118 };

const categories = [
    { name: "All", icon: "fas fa-th" },
    { name: "Anime Figures", icon: "fas fa-chess-knight" },
    { name: "Cosplay", icon: "fas fa-mask" },
    { name: "Manga & Books", icon: "fas fa-book-open" },
    { name: "Tech & Gadgets", icon: "fas fa-laptop" },
    { name: "Apparel", icon: "fas fa-tshirt" },
    { name: "Gaming", icon: "fas fa-gamepad" }
];

const products = [
    { id: 1, name: "Hatsune Miku Nendoroid Figure", price: 68, commission: "15", image: "https://picsum.photos/id/201/800/600", store: "Amazon", category: "Anime Figures", description: "Official Good Smile Company Nendoroid." },
    { id: 2, name: "Goku SSJ3 1/6 Scale Statue", price: 189, commission: "12", image: "https://picsum.photos/id/180/800/600", store: "Alibaba", category: "Anime Figures", description: "Premium resin statue with LED base." },
    { id: 3, name: "Luffy Gear 5 RGB Mousepad", price: 35, commission: "20", image: "https://picsum.photos/id/251/800/600", store: "AliExpress", category: "Gaming", description: "Large extended RGB anime mouse pad." },
    { id: 4, name: "Demon Slayer Kimono Hoodie", price: 55, commission: "18", image: "https://picsum.photos/id/64/800/600", store: "Alibaba", category: "Apparel", description: "High quality cosplay streetwear." },
    { id: 5, name: "Gojo Satoru Figure", price: 79, commission: "14", image: "https://picsum.photos/id/201/800/600", store: "Amazon", category: "Anime Figures", description: "Limited Edition Gojo Satoru." },
    { id: 6, name: "One Piece Thousand Sunny Model", price: 120, commission: "10", image: "https://picsum.photos/id/180/800/600", store: "Alibaba", category: "Anime Figures", description: "Detailed ship model kit." }
];

function renderCategories() {
    const grid = document.getElementById("categoriesGrid");
    grid.innerHTML = categories.map(cat => `
        <div class="category-card ${cat.name === currentFilter ? 'active' : ''}" onclick="filterCategory('${cat.name}')">
            <i class="${cat.icon}"></i>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

function getPrice(price) {
    const converted = (price * rates[currentCurrency]).toFixed(0);
    return currentCurrency === "BDT" ? `৳${converted}` : `$${converted}`;
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    let filtered = products.filter(p => {
        const matchesCategory = currentFilter === "All" || p.category === currentFilter;
        const matchesSearch = !currentSearchTerm || 
            p.name.toLowerCase().includes(currentSearchTerm) ||
            p.description.toLowerCase().includes(currentSearchTerm);
        const matchesPrice = p.price >= minPriceFilter && p.price <= maxPriceFilter;
        const matchesCommission = parseFloat(p.commission) >= minCommissionFilter;
        return matchesCategory && matchesSearch && matchesPrice && matchesCommission;
    });

    if (currentSort === "price-low") filtered.sort((a,b) => a.price - b.price);
    if (currentSort === "price-high") filtered.sort((a,b) => b.price - a.price);
    if (currentSort === "commission") filtered.sort((a,b) => parseFloat(b.commission) - parseFloat(a.commission));

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:80px 20px;font-size:1.2rem;opacity:0.7;">No products found. Try different filters.</p>`;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="showProduct(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="commission">${p.commission}% Commission • ${p.store}</p>
                <p class="price">${getPrice(p.price)}</p>
            </div>
        </div>
    `).join('');
}

function handleSearch() {
    currentSearchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    renderProducts();
}

function filterCategory(cat) {
    currentFilter = cat;
    renderCategories();
    renderProducts();
    scrollToDeals();
}

function applySort() {
    currentSort = document.getElementById("sortSelect").value;
    renderProducts();
}

function toggleFilterPanel() {
    document.getElementById("filterPanel").classList.toggle("active");
}

function applyFilters() {
    minPriceFilter = parseFloat(document.getElementById("minPrice").value) || 0;
    maxPriceFilter = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    minCommissionFilter = parseFloat(document.getElementById("minCommission").value) || 0;
    renderProducts();
}

function resetFilters() {
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    document.getElementById("minCommission").value = "0";
    minPriceFilter = 0; maxPriceFilter = Infinity; minCommissionFilter = 0;
    renderProducts();
}

function showProduct(id) {
    const p = products.find(x => x.id === id);
    const affiliateLink = `https://your-affiliate-link.com/product-${p.id}`; // ← CHANGE THIS
    const modalBody = document.getElementById("modalBody");
    
    modalBody.innerHTML = `
        <img src="${p.image}" style="width:100%;border-radius:16px;" alt="${p.name}">
        <div style="padding:30px">
            <h2>${p.name}</h2>
            <p style="color:#67e8f9;font-size:2.2rem;margin:15px 0;">${getPrice(p.price)}</p>
            <p><strong>Store:</strong> ${p.store} | ${p.commission}% Commission</p>
            <p>${p.description}</p>
            
            <button onclick="copyLink('${affiliateLink}')" style="width:100%;padding:18px;margin:20px 0;background:linear-gradient(90deg,#c026d3,#22d3ee);color:white;border:none;border-radius:9999px;font-weight:bold;">
                📋 Copy Affiliate Link
            </button>
        </div>
    `;
    document.getElementById("productModal").style.display = "flex";
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => alert("✅ Affiliate link copied!"));
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}

function changeCurrency() {
    currentCurrency = document.getElementById("currencySelect").value;
    renderProducts();
}

function scrollToDeals() {
    document.getElementById("deals").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    
    if (navigator.language.includes("bn")) {
        document.getElementById("langSelect").value = "bn";
        changeLanguage("bn");
        document.getElementById("currencySelect").value = "BDT";
        changeCurrency();
    }
});
