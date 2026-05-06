// ===================== TRANSLATIONS =====================
const translations = {
    en: {
        "hero.title": "Smart Shopping. Smart Earning.",
        "hero.subtitle": "Curated best deals from Amazon, Alibaba, AliExpress & more. Shop smart and earn commissions with me.",
        "hero.cta": "Explore Deals",
        "deals.title": "Trending Deals - Amazon & Alibaba",
        "categories.title": "Shop by Categories",
        "nav.categories": "Categories",
        "nav.deals": "Best Deals"
    },
    bn: {
        "hero.title": "স্মার্ট শপিং। স্মার্ট আয়।",
        "hero.subtitle": "আমাজন, আলিবাবা, অ্যালিএক্সপ্রেস থেকে সেরা ডিল। আমার সাথে কেনাকাটা করুন এবং আয় করুন।",
        "hero.cta": "ডিল দেখুন",
        "deals.title": "ট্রেন্ডিং ডিল - আমাজন ও আলিবাবা",
        "categories.title": "ক্যাটেগরি অনুসারে কিনুন",
        "nav.categories": "ক্যাটেগরি",
        "nav.deals": "সেরা ডিল"
    }
};

// ===================== GLOBAL VARIABLES =====================
let currentLang = "en";
let currentCurrency = "USD";
let currentFilter = "All";
let currentSort = "default";
let currentSearchTerm = "";

let minPriceFilter = 0;
let maxPriceFilter = Infinity;
let minCommissionFilter = 0;
let selectedStores = [];

// Exchange Rates
const rates = { USD: 1, BDT: 118 };

// ===================== CATEGORIES =====================
const categories = [
    { name: "All", icon: "fas fa-th" },
    { name: "Electronics", icon: "fas fa-laptop" },
    { name: "Smartphones", icon: "fas fa-mobile-alt" },
    { name: "Fashion", icon: "fas fa-tshirt" },
    { name: "Home & Kitchen", icon: "fas fa-home" },
    { name: "Beauty & Care", icon: "fas fa-spa" },
    { name: "Gaming", icon: "fas fa-gamepad" },
    { name: "Sports & Fitness", icon: "fas fa-dumbbell" },
    { name: "Watches & Jewelry", icon: "fas fa-watch" }
];

// ===================== PRODUCTS =====================
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 398,
        commission: "12",
        image: "https://picsum.photos/id/201/800/600",
        store: "Amazon",
        category: "Electronics",
        description: "Industry-leading noise cancelling headphones with premium sound."
    },
    {
        id: 2,
        name: "MacBook Pro M4 16-inch",
        price: 2499,
        commission: "8",
        image: "https://picsum.photos/id/180/800/600",
        store: "Amazon",
        category: "Electronics",
        description: "Powerful laptop with M4 chip and stunning display."
    },
    {
        id: 3,
        name: "Wireless Gaming Mouse & Keyboard Combo",
        price: 89,
        commission: "15",
        image: "https://picsum.photos/id/251/800/600",
        store: "Alibaba",
        category: "Gaming",
        description: "High performance gaming accessories at factory price."
    },
    {
        id: 4,
        name: "Samsung Galaxy S25 Ultra",
        price: 1299,
        commission: "10",
        image: "https://picsum.photos/id/201/800/600",
        store: "Amazon",
        category: "Smartphones",
        description: "Latest flagship smartphone with excellent camera."
    },
    {
        id: 5,
        name: "Men's Premium Leather Jacket",
        price: 129,
        commission: "18",
        image: "https://picsum.photos/id/64/800/600",
        store: "Alibaba",
        category: "Fashion",
        description: "High quality fashion wear."
    }
];

// ===================== RENDER FUNCTIONS =====================
function renderCategories() {
    const grid = document.getElementById("categoriesGrid");
    grid.innerHTML = categories.map(cat => `
        <div class="category-card ${cat.name === currentFilter ? 'active' : ''}" 
             onclick="filterCategory('${cat.name}')">
            <i class="${cat.icon}"></i>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    
    let filteredProducts = products.filter(product => {
        const matchesCategory = currentFilter === "All" || product.category === currentFilter;
        const matchesSearch = !currentSearchTerm || 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm);
        
        const matchesPrice = product.price >= minPriceFilter && product.price <= maxPriceFilter;
        const matchesCommission = parseFloat(product.commission) >= minCommissionFilter;
        
        return matchesCategory && matchesSearch && matchesPrice && matchesCommission;
    });

    // Apply Sorting
    switch(currentSort) {
        case "price-low": filteredProducts.sort((a, b) => a.price - b.price); break;
        case "price-high": filteredProducts.sort((a, b) => b.price - a.price); break;
        case "commission": filteredProducts.sort((a, b) => parseFloat(b.commission) - parseFloat(a.commission)); break;
        case "name": filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:80px 20px; font-size:1.2rem;">
            No products found. Try changing filters.
        </p>`;
        return;
    }

    grid.innerHTML = filteredProducts.map(p => `
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

function getPrice(price) {
    const converted = (price * rates[currentCurrency]).toFixed(0);
    return currentCurrency === "BDT" ? `৳${converted}` : `$${converted}`;
}

// ===================== FILTERS & SEARCH =====================
function handleSearch() {
    currentSearchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    renderProducts();
}

function filterCategory(category) {
    currentFilter = category;
    currentSort = "default";
    currentSearchTerm = "";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "default";
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
    minPriceFilter = 0;
    maxPriceFilter = Infinity;
    minCommissionFilter = 0;
    renderProducts();
}

// ===================== PRODUCT MODAL =====================
function showProduct(id) {
    const p = products.find(x => x.id === id);
    const modalBody = document.getElementById("modalBody");
    const affiliateLink = `https://shadidanimart.com/ref/shadid-${p.id}`;
    const productTitle = encodeURIComponent(`${p.name} - Best Deal`);
    const productText = encodeURIComponent(`Check this deal: ${p.name} at ${getPrice(p.price)}!`);

    modalBody.innerHTML = `
        <img src="${p.image}" style="width:100%; display:block;" alt="${p.name}">
        <div style="padding:30px">
            <h2>${p.name}</h2>
            <p style="color:#0ea5e9; font-size:1.9rem; margin:15px 0;">${getPrice(p.price)}</p>
            <p><strong>Store:</strong> ${p.store}</p>
            <p>${p.description}</p>
            
            <div class="affiliate-link">
                <strong>Your Affiliate Link:</strong><br>
                ${affiliateLink}
            </div>
            
            <button onclick="copyLink('${affiliateLink}')" style="width:100%; padding:16px; background:#0ea5e9; color:#000; border:none; border-radius:12px; font-weight:bold; margin-bottom:15px;">
                📋 Copy Affiliate Link
            </button>

            <p style="margin:15px 0 10px; font-weight:500;">Share this deal:</p>
            <div class="social-share">
                <button onclick="shareToFacebook('${affiliateLink}', '${productTitle}')" class="social-share-btn facebook"><i class="fab fa-facebook-f"></i></button>
                <button onclick="shareToX('${affiliateLink}', '${productText}')" class="social-share-btn twitter"><i class="fab fa-x-twitter"></i></button>
                <button onclick="shareToWhatsApp('${affiliateLink}', '${productText}')" class="social-share-btn whatsapp"><i class="fab fa-whatsapp"></i></button>
                <button onclick="shareToLinkedIn('${affiliateLink}', '${productTitle}')" class="social-share-btn linkedin"><i class="fab fa-linkedin-in"></i></button>
            </div>
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

// ===================== SOCIAL SHARING =====================
function shareToFacebook(link, title) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
}

function shareToX(link, text) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${text}`, '_blank');
}

function shareToWhatsApp(link, text) {
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(link)}`, '_blank');
}

function shareToLinkedIn(link, title) {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank');
}

// ===================== LANGUAGE, CURRENCY & THEME =====================
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

function changeCurrency() {
    currentCurrency = document.getElementById("currencySelect").value;
    renderProducts();
}

function scrollToDeals() {
    document.getElementById("deals").scrollIntoView({ behavior: "smooth" });
}

function initTheme() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    });
}

// ===================== INITIALIZE =====================
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    initTheme();

    // Auto-detect Bangladesh
    if (navigator.language.includes("bn")) {
        document.getElementById("langSelect").value = "bn";
        changeLanguage("bn");
        document.getElementById("currencySelect").value = "BDT";
        changeCurrency();
    }
});
