// Translations
const translations = {
    en: { "hero.title": "Earn Smart. Shop Smarter.", "hero.subtitle": "Discover premium products with the highest affiliate commissions.", "hero.cta": "Browse Deals", "deals.title": "Trending High Commission Deals", "nav.deals": "Best Deals", "nav.categories": "Categories", "nav.blog": "Blog" },
    bn: { "hero.title": "স্মার্টভাবে আয় করুন। আরও স্মার্টভাবে কিনুন।", "hero.subtitle": "সেরা অ্যাফিলিয়েট কমিশন সহ প্রিমিয়াম প্রোডাক্ট আবিষ্কার করুন।", "hero.cta": "ডিল দেখুন", "deals.title": "ট্রেন্ডিং হাই কমিশন ডিল", "nav.deals": "সেরা ডিল", "nav.categories": "ক্যাটেগরি", "nav.blog": "ব্লগ" },
    es: { "hero.title": "Gana Inteligente. Compra Más Inteligente.", "hero.subtitle": "Descubre productos premium con las mejores comisiones.", "hero.cta": "Ver Ofertas", "deals.title": "Ofertas con Alta Comisión" },
    fr: { "hero.title": "Gagnez Intelligent. Achetez Plus Intelligent.", "hero.subtitle": "Découvrez des produits premium avec les meilleures commissions.", "hero.cta": "Voir les Offres", "deals.title": "Offres à Haute Commission" }
};

let currentLang = "en";
let currentCurrency = "USD";
const rates = { USD: 1, BDT: 118, EUR: 0.92 };

const products = [
    { id: 1, name: "Sony WH-1000XM5 Headphones", price: 398, commission: "25", image: "https://picsum.photos/id/201/800/600", description: "Industry-leading noise cancelling wireless headphones with premium sound." },
    { id: 2, name: "MacBook Pro M4 16-inch", price: 2499, commission: "12", image: "https://picsum.photos/id/180/800/600", description: "Powerful performance with stunning Liquid Retina XDR display." },
    { id: 3, name: "Dyson V15 Detect Vacuum", price: 699, commission: "18", image: "https://picsum.photos/id/251/800/600", description: "Laser dust detection and powerful suction for a cleaner home." }
];

function getPrice(price) {
    const converted = (price * rates[currentCurrency]).toFixed(0);
    return currentCurrency === "BDT" ? `৳${converted}` : `${currentCurrency} ${converted}`;
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="showProduct(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="commission">Up to ${p.commission}% Commission</p>
                <p class="price">${getPrice(p.price)}</p>
            </div>
        </div>
    `).join('');
}

function showProduct(id) {
    const product = products.find(p => p.id === id);
    const modalBody = document.getElementById("modalBody");
    const affiliateLink = `https://aetherdeals.com/ref/shadid-${product.id}-${Date.now().toString(36)}`;

    modalBody.innerHTML = `
        <img src="${product.image}" style="width:100%; display:block;">
        <div style="padding:30px">
            <h2>${product.name}</h2>
            <p style="font-size:2rem; color:#0ea5e9; margin:15px 0;">${getPrice(product.price)}</p>
            <p>${product.description}</p>
            
            <div class="affiliate-link">
                <strong>Your Unique Affiliate Link:</strong><br>${affiliateLink}
            </div>
            
            <button onclick="copyLink('${affiliateLink}')" style="width:100%; padding:16px; background:#0ea5e9; color:#000; border:none; border-radius:12px; font-weight:bold; font-size:1.1rem;">
                📋 Copy Affiliate Link
            </button>
        </div>
    `;
    document.getElementById("productModal").style.display = "flex";
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => alert("✅ Affiliate link copied successfully!"));
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

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

// Theme Toggle
function initTheme() {
    if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
    
    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
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
