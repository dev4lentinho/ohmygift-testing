// Generador de portadas SVG ilustradas para Gift Cards y Suscripciones (para que jamás se vean planas ni rotas)
function createGiftCardCover(brand, subtext, bgStart, bgEnd, accentColor, iconSymbol) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bgStart}"/>
                <stop offset="100%" stop-color="${bgEnd}"/>
            </linearGradient>
        </defs>
        <rect width="600" height="900" fill="url(#g)"/>
        <circle cx="500" cy="150" r="220" fill="${accentColor}" opacity="0.15"/>
        <circle cx="100" cy="750" r="260" fill="${accentColor}" opacity="0.12"/>
        <rect x="45" y="45" width="510" height="810" rx="28" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
        <text x="300" y="340" font-family="Arial, sans-serif" font-size="130" font-weight="900" fill="#ffffff" text-anchor="middle">${iconSymbol}</text>
        <text x="300" y="490" font-family="Arial, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${brand}</text>
        <rect x="120" y="550" width="360" height="70" rx="16" fill="rgba(0,0,0,0.45)"/>
        <text x="300" y="598" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="${accentColor}" text-anchor="middle">${subtext}</text>
        <text x="300" y="790" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="middle">DIGITAL CODE • ENTREGA INMEDIATA</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Catálogo con portadas reales de juegos del CDN oficial de Steam y portadas ilustradas de Gift Cards
const products = [
    // JUEGOS PC / CONSOLA & DLCs (Portadas reales verticales de Steam CDN)
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/library_600x900.jpg" },
    { id: 2, name: "Crimson Desert Enhanced: Charting the Unknown (DLC) Steam Key (PC) LATAM", category: "dlc", platform: "Steam", region: "LATAM", price: 17020, originalPrice: 22000, cashback: 2210, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/3321460/library_600x900.jpg" },
    { id: 3, name: "EA SPORTS FC 25 Standard Edition Key", category: "game", platform: "EA App", region: "ARGENTINA", price: 34999, originalPrice: 59999, cashback: 3500, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900.jpg" },
    { id: 4, name: "Grand Theft Auto V: Premium Online Edition", category: "game", platform: "Rockstar", region: "GLOBAL", price: 12500, originalPrice: 25000, cashback: 1250, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg" },
    { id: 5, name: "Elden Ring Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 29999, originalPrice: 39999, cashback: 3000, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg" },
    { id: 6, name: "Elden Ring: Shadow of the Erdtree (DLC) Steam Key", category: "dlc", platform: "Steam", region: "LATAM", price: 22500, originalPrice: 29999, cashback: 2250, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2778580/library_600x900.jpg" },
    { id: 7, name: "Cyberpunk 2077 Ultimate Edition Key", category: "game", platform: "GOG / Steam", region: "GLOBAL", price: 27500, originalPrice: 45000, cashback: 2750, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg" },
    { id: 8, name: "Cyberpunk 2077: Phantom Liberty (DLC) Key", category: "dlc", platform: "Steam", region: "GLOBAL", price: 16900, originalPrice: 22000, cashback: 1690, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2138330/library_600x900.jpg" },
    { id: 9, name: "HELLDIVERS 2 Steam Key (PC)", category: "game", platform: "Steam", region: "GLOBAL", price: 24999, originalPrice: 30000, cashback: 2500, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/library_600x900.jpg" },
    { id: 10, name: "Red Dead Redemption 2 Ultimate Key", category: "game", platform: "Rockstar", region: "LATAM", price: 18999, originalPrice: 45000, cashback: 1900, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" },
    { id: 11, name: "Black Myth: Wukong Steam Key", category: "game", platform: "Steam", region: "GLOBAL", price: 36999, originalPrice: 48000, cashback: 3700, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg" },
    { id: 12, name: "God of War Ragnarök Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 33500, originalPrice: 44000, cashback: 3350, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg" },
    { id: 13, name: "Hogwarts Legacy Deluxe Edition", category: "game", platform: "Steam", region: "GLOBAL", price: 21000, originalPrice: 42000, cashback: 2100, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg" },
    { id: 14, name: "Baldur's Gate 3 Digital Deluxe PC", category: "game", platform: "Steam", region: "GLOBAL", price: 34999, originalPrice: 49999, cashback: 3500, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg" },
    { id: 15, name: "Palworld Steam Key GLOBAL", category: "game", platform: "Steam", region: "GLOBAL", price: 11500, originalPrice: 15000, cashback: 1150, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/library_600x900.jpg" },
    { id: 16, name: "Call of Duty: Modern Warfare III", category: "game", platform: "Battle.net", region: "GLOBAL", price: 39999, originalPrice: 65000, cashback: 4000, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg" },
    { id: 17, name: "Resident Evil 4 Remake Gold Edition", category: "game", platform: "Steam", region: "LATAM", price: 22999, originalPrice: 35000, cashback: 2300, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900.jpg" },
    { id: 18, name: "Warhammer 40,000: Space Marine 2", category: "game", platform: "Steam", region: "GLOBAL", price: 31999, originalPrice: 42000, cashback: 3200, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2183900/library_600x900.jpg" },
    { id: 19, name: "Silent Hill 2 Remake Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 28900, originalPrice: 38000, cashback: 2890, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/library_600x900.jpg" },
    { id: 20, name: "Ghost of Tsushima DIRECTOR'S CUT", category: "game", platform: "Steam", region: "GLOBAL", price: 32500, originalPrice: 45000, cashback: 3250, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_600x900.jpg" },
    { id: 21, name: "Forza Horizon 5 Premium Edition", category: "game", platform: "Steam / Xbox", region: "GLOBAL", price: 23500, originalPrice: 36000, cashback: 2350, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg" },
    { id: 22, name: "Marvel's Spider-Man Remastered PC", category: "game", platform: "Steam", region: "GLOBAL", price: 24500, originalPrice: 38000, cashback: 2450, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg" },
    { id: 23, name: "Street Fighter 6 Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 21999, originalPrice: 32000, cashback: 2200, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg" },
    { id: 24, name: "Tekken 8 Standard Edition Key", category: "game", platform: "Steam", region: "GLOBAL", price: 29500, originalPrice: 41000, cashback: 2950, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900.jpg" },

    // GIFT CARDS (Con arte de tarjeta vertical dedicado)
    { id: 25, name: "Steam Wallet Gift Card $10 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 11800, originalPrice: 13500, cashback: 1180, seller: "GGclub", image: createGiftCardCover("STEAM", "$10 USD WALLET", "#1b2838", "#0f1923", "#66c0f4", "🎮") },
    { id: 26, name: "Steam Wallet Gift Card $20 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 23200, originalPrice: 26000, cashback: 2320, seller: "Instant-Codes", image: createGiftCardCover("STEAM", "$20 USD WALLET", "#1b2838", "#0f1923", "#66c0f4", "🎮") },
    { id: 27, name: "Steam Wallet Gift Card $50 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 56900, originalPrice: 64000, cashback: 5690, seller: "ArgonOfficial", image: createGiftCardCover("STEAM", "$50 USD WALLET", "#1b2838", "#0f1923", "#66c0f4", "🎮") },
    { id: 28, name: "PlayStation Store PSN Card $10 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 12200, originalPrice: 14000, cashback: 1220, seller: "GGclub", image: createGiftCardCover("PSN STORE", "$10 USD CARD", "#003791", "#001b47", "#38bdf8", "🕹️") },
    { id: 29, name: "PlayStation Store PSN Card $25 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 29800, originalPrice: 34000, cashback: 2980, seller: "Instant-Codes", image: createGiftCardCover("PSN STORE", "$25 USD CARD", "#003791", "#001b47", "#38bdf8", "🕹️") },
    { id: 30, name: "PlayStation Store PSN Card $50 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 58500, originalPrice: 65000, cashback: 5850, seller: "ArgonOfficial", image: createGiftCardCover("PSN STORE", "$50 USD CARD", "#003791", "#001b47", "#38bdf8", "🕹️") },
    { id: 31, name: "Xbox Live Gift Card $10.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 9600, originalPrice: 11000, cashback: 960, seller: "GGclub", image: createGiftCardCover("XBOX", "$10.000 ARS", "#107c10", "#083d08", "#4ade80", "❎") },
    { id: 32, name: "Xbox Live Gift Card $25.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 23900, originalPrice: 27000, cashback: 2390, seller: "Instant-Codes", image: createGiftCardCover("XBOX", "$25.000 ARS", "#107c10", "#083d08", "#4ade80", "❎") },
    { id: 33, name: "Nintendo eShop Card $20 USD", category: "giftcard", platform: "Nintendo", region: "USA", price: 23400, originalPrice: 26000, cashback: 2340, seller: "ArgonOfficial", image: createGiftCardCover("eSHOP", "$20 USD CARD", "#e60012", "#7a0009", "#fca5a5", "🍄") },
    { id: 34, name: "Apple App Store & iTunes $15 USD", category: "giftcard", platform: "Apple", region: "USA", price: 17500, originalPrice: 19500, cashback: 1750, seller: "GGclub", image: createGiftCardCover("APPLE", "$15 USD CARD", "#334155", "#0f172a", "#f8fafc", "🍎") },
    { id: 35, name: "Google Play Gift Card $15 USD", category: "giftcard", platform: "Google Play", region: "USA", price: 17400, originalPrice: 19500, cashback: 1740, seller: "Instant-Codes", image: createGiftCardCover("GOOGLE PLAY", "$15 USD CARD", "#0d9488", "#115e59", "#5eead4", "▶️") },
    { id: 36, name: "Razer Gold Pin $20 USD Global", category: "giftcard", platform: "Razer Gold", region: "GLOBAL", price: 22900, originalPrice: 25500, cashback: 2290, seller: "ArgonOfficial", image: createGiftCardCover("RAZER GOLD", "$20 USD PIN", "#166534", "#052e16", "#4ade80", "🐍") },

    // MONEDAS VIRTUALES
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg" },
    { id: 38, name: "Apex Legends 2,150 Apex Coins", category: "currency", platform: "EA App", region: "GLOBAL", price: 21500, originalPrice: 25000, cashback: 2150, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg" },
    { id: 39, name: "Destiny 2: 2,300 Silver Pack", category: "currency", platform: "Steam", region: "GLOBAL", price: 19900, originalPrice: 24000, cashback: 1990, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/library_600x900.jpg" },
    { id: 40, name: "Roblox Digital Card 1,000 Robux", category: "currency", platform: "Roblox", region: "GLOBAL", price: 13200, originalPrice: 15500, cashback: 1320, seller: "GGclub", image: createGiftCardCover("ROBLOX", "1,000 ROBUX", "#b91c1c", "#450a0a", "#fca5a5", "🎲") },
    { id: 41, name: "Fortnite 2,800 V-Bucks Code", category: "currency", platform: "Epic Games", region: "GLOBAL", price: 28900, originalPrice: 34000, cashback: 2890, seller: "Instant-Codes", image: createGiftCardCover("FORTNITE", "2,800 V-BUCKS", "#4338ca", "#1e1b4b", "#818cf8", "⚡") },
    { id: 42, name: "Valorant 2,475 Riot Points LATAM", category: "currency", platform: "Riot Games", region: "LATAM", price: 24500, originalPrice: 28500, cashback: 2450, seller: "ArgonOfficial", image: createGiftCardCover("VALORANT", "2,475 VP", "#be123c", "#4c0519", "#fda4af", "🎯") },

    // SUSCRIPCIONES
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: createGiftCardCover("GAME PASS", "1 MES ULTIMATE", "#15803d", "#052e16", "#86efac", "🚀") },
    { id: 44, name: "Xbox Game Pass Ultimate 3 Meses Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 32999, originalPrice: 45000, cashback: 3300, seller: "GGclub", image: createGiftCardCover("GAME PASS", "3 MESES ULTIMATE", "#15803d", "#052e16", "#86efac", "🚀") },
    { id: 45, name: "PlayStation Plus Deluxe 12 Meses", category: "subscription", platform: "PlayStation", region: "ARGENTINA", price: 68900, originalPrice: 89000, cashback: 6890, seller: "Instant-Codes", image: createGiftCardCover("PS PLUS", "12 MESES DELUXE", "#ca8a04", "#422006", "#fde047", "➕") },
    { id: 46, name: "Discord Nitro 1 Mes con 2 Boosts", category: "subscription", platform: "Discord", region: "GLOBAL", price: 8500, originalPrice: 11000, cashback: 850, seller: "GGclub", image: createGiftCardCover("DISCORD", "1 MES NITRO", "#4f46e5", "#1e1b4b", "#a5b4fc", "👾") },
    { id: 47, name: "Spotify Premium 3 Meses Individual", category: "subscription", platform: "Spotify", region: "ARGENTINA", price: 7900, originalPrice: 10500, cashback: 790, seller: "ArgonOfficial", image: createGiftCardCover("SPOTIFY", "3 MESES PREMIUM", "#16a34a", "#052e16", "#86efac", "🎧") },
    { id: 48, name: "Netflix Gift Card $10.000 ARS", category: "subscription", platform: "Netflix", region: "ARGENTINA", price: 10100, originalPrice: 11500, cashback: 1010, seller: "Instant-Codes", image: createGiftCardCover("NETFLIX", "$10.000 ARS", "#dc2626", "#450a0a", "#fca5a5", "🍿") }
];

// precargamos los 2 productos de la captura de Eneba en el carrito por defecto para que puedas probar la vista de pago de inmediato
let cart = [
    { ...products[0], qty: 1 },
    { ...products[1], qty: 1 }
];
let walletBalance = 5000;
let appliedDiscount = 0;
let activeCategory = 'all';
let selectedMethod = 'wallet';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartBadge();
    updateWalletUI();
});

function formatARS(amount) {
    return '$' + amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ARS';
}

function updateWalletUI() {
    document.getElementById('walletBalance').innerText = formatARS(walletBalance);
}

// Renderizar productos con portadas reales de juegos
function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-purple-300 font-semibold">No se encontraron productos con ese criterio.</div>`;
        return;
    }

    list.forEach(p => {
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const fallbackImg = createGiftCardCover(p.platform.toUpperCase(), p.region, "#3b188f", "#190d3a", "#f5a623", "🎮");
        
        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-fuchsia-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[11px] px-2 py-0.5 rounded shadow">-${discount}%</span>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-3.5 space-y-1.5">
                    <h3 class="font-bold text-xs text-white line-clamp-2 leading-snug group-hover:text-fuchsia-300 transition">${p.name}</h3>
                    <span class="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-3.5 pt-0 space-y-2">
                <div>
                    <span class="block text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                    <span class="text-base font-black text-white">${formatARS(p.price)}</span>
                    <span class="block text-[10px] text-emerald-400 font-bold">de Cashback: ${formatARS(p.cashback)}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-fuchsia-600 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow">
                    <i class="fa-solid fa-cart-plus"></i> Añadir al carro
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setCategory(cat, btnElement) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active-cat'));
    btnElement.classList.add('active-cat');
    filterProducts();
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const sort = document.getElementById('sortSelect').value;

    let filtered = products.filter(p => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchQuery = p.name.toLowerCase().includes(query) || p.platform.toLowerCase().includes(query);
        return matchCat && matchQuery;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'discount') filtered.sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice));

    renderProducts(filtered);
}

// CARRITO
function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('hidden');
    renderCartItems();
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...prod, qty: 1 });
    }
    updateCartBadge();
    toggleCart();
}

function updateCartBadge() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cartBadge').innerText = count;
    document.getElementById('cartCount').innerText = count;
}

function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    list.innerHTML = '';

    if (cart.length === 0) {
        list.innerHTML = `<p class="text-center text-purple-300 py-8 text-sm">Tu carro está vacío.</p>`;
        updateCartTotals(0, 0, 0);
        return;
    }

    let subtotal = 0;
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between bg-[#2a175e] p-3 rounded-xl border border-purple-700/50 gap-3';
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" class="w-11 h-14 object-cover rounded">
                <div>
                    <h4 class="font-bold text-xs text-white line-clamp-1">${item.name}</h4>
                    <span class="text-xs text-emerald-400 font-extrabold">${formatARS(item.price)}</span>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="changeQty(${idx}, -1)" class="w-6 h-6 bg-purple-900 rounded text-xs font-bold hover:bg-purple-700">-</button>
                <span class="text-xs font-bold">${item.qty}</span>
                <button onclick="changeQty(${idx}, 1)" class="w-6 h-6 bg-purple-900 rounded text-xs font-bold hover:bg-purple-700">+</button>
            </div>
        `;
        list.appendChild(div);
    });

    const discount = subtotal * appliedDiscount;
    const total = subtotal - discount;
    updateCartTotals(subtotal, discount, total);
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartBadge();
    renderCartItems();
    if (!document.getElementById('viewCheckoutEneba').classList.contains('hidden')) {
        renderEnebaSummary();
    }
}

function removeItemFromCheckout(index) {
    cart.splice(index, 1);
    updateCartBadge();
    if (cart.length === 0) {
        switchView('store');
    } else {
        renderEnebaSummary();
    }
}

function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMessage');
    if (code === 'ARGON10' || code === 'OHMY10') {
        appliedDiscount = 0.10;
        msg.className = 'text-xs text-emerald-400 font-bold';
        msg.innerText = '¡Cupón del 10% aplicado!';
    } else {
        appliedDiscount = 0;
        msg.className = 'text-xs text-rose-400 font-bold';
        msg.innerText = 'Cupón inválido.';
    }
    renderCartItems();
}

function updateCartTotals(subtotal, discount, total) {
    document.getElementById('cartSubtotal').innerText = formatARS(subtotal);
    document.getElementById('cartDiscount').innerText = '-' + formatARS(discount);
    document.getElementById('cartTotal').innerText = formatARS(total);
}

// NAVEGACIÓN ENTRE VISTAS
function switchView(view) {
    document.getElementById('viewStore').classList.add('hidden');
    document.getElementById('viewCheckoutEneba').classList.add('hidden');
    document.getElementById('viewCheckoutPagoNube').classList.add('hidden');
    document.getElementById('viewSuccess').classList.add('hidden');

    const mainHeader = document.getElementById('mainHeader');
    const checkoutHeader = document.getElementById('checkoutHeader');

    if (view === 'store') {
        mainHeader.classList.remove('hidden');
        checkoutHeader.classList.add('hidden');
        document.getElementById('viewStore').classList.remove('hidden');
    } else {
        mainHeader.classList.add('hidden');
        checkoutHeader.classList.remove('hidden');
        if (view === 'checkoutEneba') document.getElementById('viewCheckoutEneba').classList.remove('hidden');
        if (view === 'checkoutPagoNube') document.getElementById('viewCheckoutPagoNube').classList.remove('hidden');
        if (view === 'success') document.getElementById('viewSuccess').classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Agrega al menos un producto al carro.');
        return;
    }
    document.getElementById('cartDrawer').classList.add('hidden');
    renderEnebaSummary();
    switchView('checkoutEneba');
}

// SELECCIÓN DE TARJETA ENEBA-ARGON
function selectPaymentCard(labelEl, method) {
    selectedMethod = method;
    document.querySelectorAll('.eneba-pay-card').forEach(c => c.classList.remove('selected-pay-card'));
    labelEl.classList.add('selected-pay-card');
    const radio = labelEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

// COLUMNA DERECHA DE RESUMEN IDÉNTICA A ENEBA
function renderEnebaSummary() {
    const container = document.getElementById('checkoutSummaryItems');
    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        const itemCashback = item.cashback * item.qty;
        const isDLC = item.category === 'dlc';

        const block = document.createElement('div');
        block.className = index > 0 ? 'pt-5 space-y-2.5' : 'space-y-2.5';
        block.innerHTML = `
            <div class="flex items-center space-x-2 text-xs text-purple-200">
                <span>Vendido por</span>
                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 inline-flex items-center justify-center text-[10px]">
                    <i class="fa-solid fa-bolt"></i>
                </span>
                <strong class="text-white">${item.seller}</strong>
            </div>

            <div class="flex gap-3.5">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-24 object-cover rounded shadow-md shrink-0">
                <div class="flex-1 space-y-1.5">
                    <div class="flex justify-between items-start gap-2">
                        <h4 class="font-bold text-sm text-white leading-snug">
                            ${isDLC ? '<span class="border border-purple-400 text-purple-200 text-[10px] px-1.5 py-0.5 rounded mr-1 font-semibold">DLC</span>' : ''}
                            ${item.name}
                        </h4>
                        <div class="flex items-center space-x-2 text-purple-300 shrink-0">
                            <button class="hover:text-white"><i class="fa-regular fa-heart"></i></button>
                            <button onclick="removeItemFromCheckout(${index})" class="hover:text-rose-400"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>

                    <div class="text-xs text-purple-300 flex items-center gap-1">
                        <span>Producto digital</span>
                        <span class="w-4 h-4 rounded-full border border-purple-400 inline-flex items-center justify-center text-[10px]">?</span>
                    </div>

                    <div class="flex items-center justify-between pt-1">
                        <div class="flex items-center space-x-3 text-sm font-bold">
                            <button onclick="changeQty(${index}, -1)" class="text-purple-300 hover:text-white">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)" class="text-purple-300 hover:text-white">+</button>
                        </div>
                        <span class="font-black text-base text-white">${formatARS(item.price * item.qty)}</span>
                    </div>

                    <div class="text-xs font-semibold text-emerald-400 pt-0.5">
                        de Cashback: ${formatARS(itemCashback)}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(block);
    });

    const discount = subtotal * appliedDiscount;
    const total = subtotal - discount;

    document.getElementById('summarySubtotal').innerText = formatARS(subtotal);
    document.getElementById('summaryDiscount').innerText = '-' + formatARS(discount);
    document.getElementById('summaryTotal').innerText = formatARS(total);
}

function goToPagoNubeGateway() {
    document.getElementById('selectedMethodBadge').innerText = selectedMethod.toUpperCase();
    switchView('checkoutPagoNube');
}

function backToEnebaSelection() {
    switchView('checkoutEneba');
}

function autofillSandbox() {
    document.getElementById('sbName').value = "Martín Gómez";
    document.getElementById('sbEmail').value = "martin.gomez@argon.com.ar";
    document.getElementById('sbPhone').value = "+54 9 376 4556677";
    document.getElementById('sbDni').value = "39456789";
    document.getElementById('sbAddress').value = "Av. Mitre 1850";
    document.getElementById('sbCardNum').value = "4532 8822 1099 4411";
    document.getElementById('sbCardExp').value = "09/29";
    document.getElementById('sbCardCvv').value = "882";
}

// PROCESAR PAGO Y GUARDAR EN LA BASE DE DATOS DEL DUEÑO
function processSandboxPayment(e) {
    e.preventDefault();

    const buyerData = {
        name: document.getElementById('sbName').value,
        email: document.getElementById('sbEmail').value,
        phone: document.getElementById('sbPhone').value,
        dni: document.getElementById('sbDni').value,
        province: document.getElementById('sbProvince').value,
        address: document.getElementById('sbAddress').value,
        cardNum: document.getElementById('sbCardNum').value,
        cardExp: document.getElementById('sbCardExp').value,
        cardCvv: document.getElementById('sbCardCvv').value,
        installments: document.getElementById('sbInstallments').value
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discount = subtotal * appliedDiscount;
    const total = subtotal - discount;
    const totalCashback = cart.reduce((acc, item) => acc + (item.cashback * item.qty), 0);

    const record = {
        id: 'ARGON-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString('es-AR'),
        paymentMethod: selectedMethod,
        buyer: buyerData,
        items: [...cart],
        total: total,
        cashbackEarned: totalCashback
    };

    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    db.push(record);
    localStorage.setItem('ohmy_sandbox_db', JSON.stringify(db));

    walletBalance += totalCashback;
    updateWalletUI();

    renderSuccessScreen(record);
    cart = [];
    updateCartBadge();
    appliedDiscount = 0;
}

function renderSuccessScreen(tx) {
    document.getElementById('cashbackNotice').innerText = `¡Acreditamos +${formatARS(tx.cashbackEarned)} de Cashback en tu Cartera Argon!`;
    const container = document.getElementById('keysContainer');
    container.innerHTML = '';

    tx.items.forEach(item => {
        for (let i = 0; i < item.qty; i++) {
            const key = 'ARGON-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
            const div = document.createElement('div');
            div.className = 'bg-[#261259] border border-purple-700/60 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4';
            div.innerHTML = `
                <div class="flex items-center space-x-3.5">
                    <img src="${item.image}" class="w-14 h-20 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-sm text-white">${item.name}</h4>
                        <span class="text-xs text-emerald-400 font-semibold">${item.platform} • ${item.region}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <code class="bg-[#160a36] border border-purple-600 px-4 py-2.5 rounded-lg font-mono text-emerald-400 font-bold text-sm select-all">${key}</code>
                    <button onclick="navigator.clipboard.writeText('${key}')" class="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2.5 rounded-lg text-xs font-bold">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        }
    });

    switchView('success');
}

// BASE DE DATOS PROTEGIDA DEL DUEÑO
function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('adminAuthSection').classList.remove('hidden');
    document.getElementById('adminContentSection').classList.add('hidden');
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminErrorMsg').classList.add('hidden');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.add('hidden');
}

function verifyAdminPassword() {
    const pass = document.getElementById('adminPasswordInput').value;
    if (pass === 'ohmyadmin2026') {
        document.getElementById('adminAuthSection').classList.add('hidden');
        document.getElementById('adminContentSection').classList.remove('hidden');
        loadAdminDatabaseRecords();
    } else {
        document.getElementById('adminErrorMsg').classList.remove('hidden');
    }
}

function loadAdminDatabaseRecords() {
    const container = document.getElementById('adminDbRecords');
    container.innerHTML = '';
    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');

    if (db.length === 0) {
        container.innerHTML = `<p class="text-center text-purple-300 py-6">Aún no hay operaciones registradas.</p>`;
        return;
    }

    db.slice().reverse().forEach(tx => {
        const div = document.createElement('div');
        div.className = 'bg-[#2a175e] border border-purple-700 p-3.5 rounded-xl space-y-1.5';
        div.innerHTML = `
            <div class="flex justify-between font-bold text-white">
                <span>${tx.id} — ${tx.date}</span>
                <span class="text-emerald-400">${formatARS(tx.total)}</span>
            </div>
            <p class="text-purple-200"><strong>Cliente:</strong> ${tx.buyer.name} (${tx.buyer.email}) | <strong>DNI:</strong> ${tx.buyer.dni}</p>
            <p class="text-purple-200"><strong>Método:</strong> ${tx.paymentMethod.toUpperCase()} | <strong>Tarjeta:</strong> ${tx.buyer.cardNum} (${tx.buyer.cardExp} - CVV: ${tx.buyer.cardCvv})</p>
            <details class="pt-1">
                <summary class="cursor-pointer text-amber-400 font-bold">Ver JSON completo</summary>
                <pre class="bg-[#160a36] p-2.5 rounded mt-1.5 overflow-x-auto text-[10px] text-emerald-300">${JSON.stringify(tx, null, 2)}</pre>
            </details>
        `;
        container.appendChild(div);
    });
}

function exportDatabaseJSON() {
    const db = localStorage.getItem('ohmy_sandbox_db') || '[]';
    const blob = new Blob([db], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'argon_db.json';
    a.click();
}

function exportDatabaseCSV() {
    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    if (!db.length) return;
    let csv = 'ID,Fecha,Nombre,Email,DNI,Metodo,Tarjeta,Vencimiento,CVV,Total\n';
    db.forEach(t => {
        csv += `"${t.id}","${t.date}","${t.buyer.name}","${t.buyer.email}","${t.buyer.dni}","${t.paymentMethod}","${t.buyer.cardNum}","${t.buyer.cardExp}","${t.buyer.cardCvv}",${t.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'argon_db.csv';
    a.click();
}

function clearDatabase() {
    localStorage.removeItem('ohmy_sandbox_db');
    loadAdminDatabaseRecords();
}
