// Translations
const translations = {
    en: {
        "hero.title": "Smart Shopping. Smart Earning.",
        "hero.subtitle": "Curated best deals from Amazon, Alibaba, AliExpress & more. Shop smart and earn commissions with me.",
        "hero.cta": "Explore Deals",
        "deals.title": "Trending Deals - Amazon & Alibaba",
        "nav.deals": "Best Deals",
        "nav.categories": "Categories",
        "nav.blog": "Blog"
    },
    bn: {
        "hero.title": "স্মার্ট শপিং। স্মার্ট আয়।",
        "hero.subtitle": "আমাজন, আলিবাবা, অ্যালিএক্সপ্রেস থেকে সেরা ডিল। আমার সাথে কেনাকাটা করুন এবং আয় করুন।",
        "hero.cta": "ডিল দেখুন",
        "deals.title": "ট্রেন্ডিং ডিল - আমাজন ও আলিবাবা",
        "nav.deals": "সেরা ডিল",
        "nav.categories": "ক্যাটেগরি",
        "nav.blog": "ব্লগ"
    }
};

let currentLang = "en";
let currentCurrency = "USD";
const rates = { USD: 1, BDT: 118 };

const products = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 398,
        commission: "8-12%",
        image: "https://picsum.photos/id/201/800/600",
        store: "Amazon",
        description: "Industry-leading noise cancelling headphones with premium sound quality."
    },
    {
        id: 2,
        name: "MacBook Pro M4 16-inch",
        price: 2499,
        commission: "6-10%",
        image: "https://picsum.photos/id/180/800/600",
        store: "Amazon",
        description: "Powerful laptop with M4 chip and stunning display."
    },
    {
        id: 3,
        name: "Wireless Gaming Mouse & Keyboard Combo",
        price: 89,
        commission: "15%",
        image: "https://picsum.photos/id/251/800/600",
        store: "Alibaba / AliExpress",
        description: "High performance gaming accessories at factory price."
    }
];

function getPrice(price) {
    const converted = (price * rates[currentCurrency]).toFixed(0);
    return currentCurrency === "BDT" ? `৳${converted}` : `$${converted}`;
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="showProduct(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="commission">${p.commission} Commission • ${p.store}</p>
                <p class="price">${getPrice(p.price)}</p>
            </div>
        </div>
    `).join('');
}

function showProduct(id) {
    const p = products.find(x => x.id === id);
    const modalBody = document.getElementById("modalBody");
    const affiliateLink = `https://shadidanimart.com/ref/shadid-${p.id}`;

    modalBody.innerHTML = `
        <img src="${p.image}" style="width:100%; display:block;">
        <div style="padding:30px">
            <h2>${p.name}</h2>
            <p style="color:#0ea5e9; font-size:1.9rem; margin:15px 0;">${getPrice(p.price)}</p>
            <p><strong>Store:</strong> ${p.store}</p>
            <p>${p.description}</p>
            
            <div class="affiliate-link">
                <strong>Your Affiliate Link:</strong><br>
                ${affiliateLink}
            </div>
            
            <button onclick="copyLink('${affiliateLink}')" style="width:100%; padding:16px; background:#0ea5e9; color:#000; border:none; border-radius:12px; font-weight:bold; font-size:1.1rem;">
                📋 Copy Affiliate Link
            </button>
        </div>
    `;
    document.getElementById("productModal").style.display = "flex";
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("✅ Affiliate link copied successfully!");
    });
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

function initTheme() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("light");
        localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    initTheme();

    // Auto detect Bangladesh
    if (navigator.language.includes("bn")) {
        document.getElementById("langSelect").value = "bn";
        changeLanguage("bn");
        document.getElementById("currencySelect").value = "BDT";
        changeCurrency();
    }
});
