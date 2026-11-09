// ============================================================================
// 1. FECHA DE LANZAMIENTO GTA VI (FÁCIL DE CAMBIAR)
// ============================================================================
// Para simular que el contador llegó a cero, cambia a '2020-01-01T00:00:00'
const GTA6_RELEASE_DATE = '2026-11-19T00:00:00';

const currencyRates = {
    ARS: { rate: 1, symbol: '$', suffix: ' ARS', decimals: 2 },
    USD: { rate: 0.00085, symbol: 'US$', suffix: ' USD', decimals: 2 },
    EUR: { rate: 0.00079, symbol: '€', suffix: ' EUR', decimals: 2 }
};
let activeCurrency = localStorage.getItem('ohmy_currency') || 'ARS';

// Helper con IDs clásicos 100% verificados de Steam CDN que SIEMPRE tienen library_600x900.jpg
const sImg = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
const FALLBACK_GAME_COVER = sImg(271590);

// Arte de tarjetas de saldo (PSN, Xbox, Steam, Roblox, etc.) con acabado fotográfico y brillo
function storeCardCover(brand, amount, c1, c2, accent, sub) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
            </linearGradient>
        </defs>
        <rect width="600" height="900" fill="url(#g)"/>
        <circle cx="480" cy="180" r="240" fill="${accent}" opacity="0.18"/>
        <circle cx="120" cy="720" r="220" fill="#ffffff" opacity="0.06"/>
        <rect x="36" y="36" width="528" height="828" rx="28" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="3"/>
        <rect x="36" y="36" width="528" height="88" rx="28" fill="rgba(0,0,0,0.38)"/>
        <text x="68" y="90" font-family="system-ui,sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="2">${sub}</text>
        <rect x="365" y="54" width="172" height="52" rx="12" fill="${accent}"/>
        <text x="451" y="89" font-family="system-ui,sans-serif" font-size="22" font-weight="900" fill="#090d16" text-anchor="middle">${amount}</text>
        <text x="300" y="460" font-family="system-ui,sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${brand}</text>
        <rect x="105" y="520" width="390" height="78" rx="16" fill="rgba(0,0,0,0.48)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="300" y="571" font-family="system-ui,sans-serif" font-size="34" font-weight="900" fill="${accent}" text-anchor="middle">${amount}</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// ============================================================================
// 2. DATOS DE JUEGOS EN TENDENCIA CON PORTADAS REALES (FOTO 3)
// ============================================================================
const trendingGamesData = [
    { id: 101, title: "Palworld (Xbox Series X|S & PC)", platform: "Xbox", headerType: "palworld-pill", badge: "En tendencia", rank: 1, change: "up", linkId: 32, price: 11500, image: sImg(1623730) },
    { id: 102, title: "Call of Duty: Advanced Warfare", platform: "Xbox", headerType: "xbox-one", badge: "Oferta", rank: 2, change: "up", linkId: 31, price: 14900, image: sImg(209660) },
    { id: 103, title: "Outlast + Whistleblower Bundle", platform: "Xbox", headerType: "xbox-one", badge: "Oferta", rank: 3, change: "up", linkId: 31, price: 6800, image: sImg(238320) },
    { id: 104, title: "Minecraft: Java & Bedrock Edition", platform: "Steam", headerType: "none", badge: "En tendencia", rank: 4, change: "same", linkId: 1, price: 17600, image: sImg(1672970) },
    { id: 105, title: "Grand Theft Auto V: Premium Edition", platform: "PS5", headerType: "none", badge: "En tendencia", rank: 5, change: "up", linkId: 28, price: 12500, image: sImg(271590) },
    { id: 106, title: "Black Myth: Wukong", platform: "Steam", headerType: "none", badge: "Nuevo", rank: 6, change: "up", linkId: 11, price: 36999, image: sImg(2358720) },
    { id: 107, title: "ELDEN RING Official Key", platform: "PS5", headerType: "none", badge: "En tendencia", rank: 7, change: "same", linkId: 29, price: 29999, image: sImg(1245620) },
    { id: 108, title: "Cyberpunk 2077 Ultimate", platform: "Steam", headerType: "none", badge: "Oferta", rank: 8, change: "up", linkId: 7, price: 27500, image: sImg(1091500) },
    { id: 109, title: "Red Dead Redemption 2", platform: "Xbox", headerType: "xbox-one", badge: "Oferta", rank: 9, change: "up", linkId: 32, price: 18999, image: sImg(1174180) },
    { id: 110, title: "Resident Evil 4 Gold Edition", platform: "PS5", headerType: "none", badge: "Nuevo", rank: 10, change: "up", linkId: 29, price: 22999, image: sImg(2050650) }
];

// ============================================================================
// 3. CATÁLOGO DE 48 PRODUCTOS CON PORTADAS REALES VERIFICADAS (FOTO 3)
// ============================================================================
const defaultProducts = [
    // Primeros 4 exactamente como en tu 3ra foto (Palworld, CoD Advanced Warfare, Outlast, Minecraft)
    { id: 15, name: "Palworld (Xbox Series X|S & Windows 10) Key GLOBAL", category: "game", platform: "Xbox", headerType: "palworld-pill", region: "GLOBAL", price: 11500, originalPrice: 15000, cashback: 1150, seller: "Instant-Codes", image: sImg(1623730) },
    { id: 16, name: "Call of Duty: Advanced Warfare Xbox One Key GLOBAL", category: "game", platform: "Xbox", headerType: "xbox-one", region: "GLOBAL", price: 14900, originalPrice: 29900, cashback: 1490, seller: "ArgonOfficial", image: sImg(209660) },
    { id: 19, name: "Outlast + Outlast Whistleblower Xbox One Key LATAM", category: "game", platform: "Xbox", headerType: "xbox-one", region: "LATAM", price: 6800, originalPrice: 14500, cashback: 680, seller: "GGclub", image: sImg(238320) },
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", headerType: "none", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: sImg(1672970) },
    { id: 4, name: "Grand Theft Auto V: Premium Online Edition Key", category: "game", platform: "Rockstar", headerType: "none", region: "GLOBAL", price: 12500, originalPrice: 25000, cashback: 1250, seller: "GGclub", image: sImg(271590) },
    { id: 5, name: "Elden Ring Steam Key (PC) LATAM", category: "game", platform: "Steam", headerType: "none", region: "LATAM", price: 29999, originalPrice: 39999, cashback: 3000, seller: "Instant-Codes", image: sImg(1245620) },
    { id: 7, name: "Cyberpunk 2077 Ultimate Edition Key", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 27500, originalPrice: 45000, cashback: 2750, seller: "ArgonOfficial", image: sImg(1091500) },
    { id: 8, name: "Cyberpunk 2077: Phantom Liberty (DLC) Steam Key", category: "dlc", platform: "Steam", headerType: "none", region: "GLOBAL", price: 16900, originalPrice: 22000, cashback: 1690, seller: "Instant-Codes", image: sImg(2138330) },
    { id: 9, name: "HELLDIVERS 2 Steam Key (PC) GLOBAL", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 24999, originalPrice: 30000, cashback: 2500, seller: "GGclub", image: sImg(553850) },
    { id: 10, name: "Red Dead Redemption 2 Ultimate Key", category: "game", platform: "Rockstar", headerType: "xbox-one", region: "LATAM", price: 18999, originalPrice: 45000, cashback: 1900, seller: "Instant-Codes", image: sImg(1174180) },
    { id: 11, name: "Black Myth: Wukong Steam Key GLOBAL", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 36999, originalPrice: 48000, cashback: 3700, seller: "ArgonOfficial", image: sImg(2358720) },
    { id: 12, name: "God of War Official Steam Key (PC)", category: "game", platform: "Steam", headerType: "none", region: "LATAM", price: 26500, originalPrice: 38000, cashback: 2650, seller: "GGclub", image: sImg(1593500) },
    { id: 13, name: "Hogwarts Legacy Deluxe Edition Key", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 21000, originalPrice: 42000, cashback: 2100, seller: "ArgonOfficial", image: sImg(990080) },
    { id: 14, name: "Baldur's Gate 3 Digital Deluxe PC", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 34999, originalPrice: 49999, cashback: 3500, seller: "GGclub", image: sImg(1086940) },
    { id: 17, name: "Resident Evil 4 Remake Gold Edition", category: "game", platform: "Steam", headerType: "none", region: "LATAM", price: 22999, originalPrice: 35000, cashback: 2300, seller: "GGclub", image: sImg(2050650) },
    { id: 18, name: "The Witcher 3: Wild Hunt Complete Edition", category: "game", platform: "Steam", headerType: "xbox-one", region: "GLOBAL", price: 11999, originalPrice: 24000, cashback: 1200, seller: "Instant-Codes", image: sImg(292030) },
    { id: 20, name: "Sekiro: Shadows Die Twice GOTY Key", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 24500, originalPrice: 36000, cashback: 2450, seller: "GGclub", image: sImg(814380) },
    { id: 21, name: "Forza Horizon 5 Premium Edition", category: "game", platform: "Xbox", headerType: "xbox-one", region: "GLOBAL", price: 23500, originalPrice: 36000, cashback: 2350, seller: "Instant-Codes", image: sImg(1551360) },
    { id: 22, name: "Marvel's Spider-Man Remastered PC", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 24500, originalPrice: 38000, cashback: 2450, seller: "ArgonOfficial", image: sImg(1817070) },
    { id: 23, name: "Street Fighter 6 Steam Key LATAM", category: "game", platform: "Steam", headerType: "none", region: "LATAM", price: 21999, originalPrice: 32000, cashback: 2200, seller: "GGclub", image: sImg(1364780) },
    { id: 24, name: "Tekken 8 Standard Edition Key", category: "game", platform: "Steam", headerType: "none", region: "GLOBAL", price: 29500, originalPrice: 41000, cashback: 2950, seller: "Instant-Codes", image: sImg(1778820) },
    { id: 2, name: "Dark Souls III Deluxe Edition Steam Key", category: "dlc", platform: "Steam", headerType: "none", region: "LATAM", price: 19500, originalPrice: 28000, cashback: 1950, seller: "Instant-Codes", image: sImg(374320) },
    { id: 3, name: "Call of Duty: Modern Warfare III Cross-Gen", category: "game", platform: "Xbox", headerType: "xbox-one", region: "ARGENTINA", price: 34999, originalPrice: 59999, cashback: 3500, seller: "ArgonOfficial", image: sImg(1938090) },
    { id: 6, name: "Resident Evil Village Gold Expansion", category: "dlc", platform: "Steam", headerType: "none", region: "LATAM", price: 16500, originalPrice: 24999, cashback: 1650, seller: "GGclub", image: sImg(1196590) },

    // GIFT CARDS
    { id: 25, name: "Steam Wallet Gift Card $10 USD (Argentina)", category: "giftcard", platform: "Steam", headerType: "none", region: "ARGENTINA", price: 11800, originalPrice: 13500, cashback: 1180, seller: "GGclub", image: storeCardCover("STEAM", "$10 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 26, name: "Steam Wallet Gift Card $20 USD (Argentina)", category: "giftcard", platform: "Steam", headerType: "none", region: "ARGENTINA", price: 23200, originalPrice: 26000, cashback: 2320, seller: "Instant-Codes", image: storeCardCover("STEAM", "$20 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 27, name: "Steam Wallet Gift Card $50 USD (Argentina)", category: "giftcard", platform: "Steam", headerType: "none", region: "ARGENTINA", price: 56900, originalPrice: 64000, cashback: 5690, seller: "ArgonOfficial", image: storeCardCover("STEAM", "$50 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 28, name: "PlayStation Store PSN Card $10 USD", category: "giftcard", platform: "PlayStation", headerType: "none", region: "USA", price: 12200, originalPrice: 14000, cashback: 1220, seller: "GGclub", image: storeCardCover("PSN STORE", "$10 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 29, name: "PlayStation Store PSN Card $25 USD", category: "giftcard", platform: "PlayStation", headerType: "none", region: "USA", price: 29800, originalPrice: 34000, cashback: 2980, seller: "Instant-Codes", image: storeCardCover("PSN STORE", "$25 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 30, name: "PlayStation Store PSN Card $50 USD", category: "giftcard", platform: "PlayStation", headerType: "none", region: "USA", price: 58500, originalPrice: 65000, cashback: 5850, seller: "ArgonOfficial", image: storeCardCover("PSN STORE", "$50 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 31, name: "Xbox Live Gift Card $10.000 ARS", category: "giftcard", platform: "Xbox", headerType: "xbox-one", region: "ARGENTINA", price: 9600, originalPrice: 11000, cashback: 960, seller: "GGclub", image: storeCardCover("XBOX LIVE", "$10.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 32, name: "Xbox Live Gift Card $25.000 ARS", category: "giftcard", platform: "Xbox", headerType: "xbox-one", region: "ARGENTINA", price: 23900, originalPrice: 27000, cashback: 2390, seller: "Instant-Codes", image: storeCardCover("XBOX LIVE", "$25.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 33, name: "Nintendo eShop Card $20 USD", category: "giftcard", platform: "Nintendo", headerType: "none", region: "USA", price: 23400, originalPrice: 26000, cashback: 2340, seller: "ArgonOfficial", image: storeCardCover("NINTENDO", "$20 USD", "#e60012", "#6b0008", "#fca5a5", "ESHOP SWITCH") },
    { id: 34, name: "Apple App Store & iTunes $15 USD", category: "giftcard", platform: "Apple", headerType: "none", region: "USA", price: 17500, originalPrice: 19500, cashback: 1750, seller: "GGclub", image: storeCardCover("APP STORE", "$15 USD", "#334155", "#0f172a", "#38bdf8", "APPLE ITUNES") },
    { id: 35, name: "Google Play Gift Card $15 USD", category: "giftcard", platform: "Google Play", headerType: "none", region: "USA", price: 17400, originalPrice: 19500, cashback: 1740, seller: "Instant-Codes", image: storeCardCover("GOOGLE PLAY", "$15 USD", "#0f766e", "#042f2e", "#34d399", "ANDROID STORE") },
    { id: 36, name: "Razer Gold Pin $20 USD Global", category: "giftcard", platform: "Razer Gold", headerType: "none", region: "GLOBAL", price: 22900, originalPrice: 25500, cashback: 2290, seller: "ArgonOfficial", image: storeCardCover("RAZER GOLD", "$20 USD", "#15803d", "#052e16", "#4ade80", "RAZER CREDITS") },

    // MONEDAS Y SUSCRIPCIONES
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", headerType: "none", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: sImg(730) },
    { id: 38, name: "Apex Legends 2,150 Apex Coins", category: "currency", platform: "EA App", headerType: "none", region: "GLOBAL", price: 21500, originalPrice: 25000, cashback: 2150, seller: "Instant-Codes", image: sImg(1172470) },
    { id: 39, name: "Destiny 2: 2,300 Silver Pack", category: "currency", platform: "Steam", headerType: "none", region: "GLOBAL", price: 19900, originalPrice: 24000, cashback: 1990, seller: "ArgonOfficial", image: sImg(1085660) },
    { id: 40, name: "Roblox Digital Card 1,000 Robux", category: "currency", platform: "Roblox", headerType: "none", region: "GLOBAL", price: 13200, originalPrice: 15500, cashback: 1320, seller: "GGclub", image: storeCardCover("ROBLOX", "1,000 ROBUX", "#991b1b", "#3b0707", "#f87171", "ROBLOX CORP") },
    { id: 41, name: "Fortnite 2,800 V-Bucks Code", category: "currency", platform: "Epic Games", headerType: "none", region: "GLOBAL", price: 28900, originalPrice: 34000, cashback: 2890, seller: "Instant-Codes", image: storeCardCover("FORTNITE", "2,800 V-BUCKS", "#3730a3", "#1e1b4b", "#38bdf8", "EPIC GAMES") },
    { id: 42, name: "Valorant 2,475 Riot Points LATAM", category: "currency", platform: "Riot Games", headerType: "none", region: "LATAM", price: 24500, originalPrice: 28500, cashback: 2450, seller: "ArgonOfficial", image: storeCardCover("VALORANT", "2,475 VP", "#be123c", "#4c0519", "#fb7185", "RIOT GAMES") },
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", headerType: "xbox-one", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: storeCardCover("GAME PASS", "1 MES ULTIMATE", "#107c10", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 44, name: "Xbox Game Pass Ultimate 3 Meses Key", category: "subscription", platform: "Xbox", headerType: "xbox-one", region: "ARGENTINA", price: 32999, originalPrice: 45000, cashback: 3300, seller: "GGclub", image: storeCardCover("GAME PASS", "3 MESES", "#107c10", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 45, name: "PlayStation Plus Deluxe 12 Meses", category: "subscription", platform: "PlayStation", headerType: "none", region: "ARGENTINA", price: 68900, originalPrice: 89000, cashback: 6890, seller: "Instant-Codes", image: storeCardCover("PS PLUS", "12 MESES", "#ca8a04", "#422006", "#facc15", "DELUXE PLAN") },
    { id: 46, name: "Discord Nitro 1 Mes con 2 Boosts", category: "subscription", platform: "Discord", headerType: "none", region: "GLOBAL", price: 8500, originalPrice: 11000, cashback: 850, seller: "GGclub", image: storeCardCover("DISCORD", "1 MES NITRO", "#4f46e5", "#1e1b4b", "#818cf8", "NITRO BOOST") },
    { id: 47, name: "Spotify Premium 3 Meses Individual", category: "subscription", platform: "Spotify", headerType: "none", region: "ARGENTINA", price: 7900, originalPrice: 10500, cashback: 790, seller: "ArgonOfficial", image: storeCardCover("SPOTIFY", "3 MESES", "#16a34a", "#052e16", "#4ade80", "PREMIUM MUSIC") },
    { id: 48, name: "Netflix Gift Card $10.000 ARS", category: "subscription", platform: "Netflix", headerType: "none", region: "ARGENTINA", price: 10100, originalPrice: 11500, cashback: 1010, seller: "Instant-Codes", image: storeCardCover("NETFLIX", "$10.000 ARS", "#b91c1c", "#3b0707", "#f87171", "STREAMING CARD") }
];

let customProducts = JSON.parse(localStorage.getItem('ohmy_custom_products') || '[]');
let products = [...customProducts, ...defaultProducts];
let cart = [];
let wishlist = JSON.parse(localStorage.getItem('ohmy_wishlist') || '[]');
let myVaultKeys = JSON.parse(localStorage.getItem('ohmy_vault_keys') || '[]');
let walletBalance = Number(localStorage.getItem('ohmy_wallet_zero_balance') || 0);
let appliedDiscount = 0;
let activeCategory = 'all';
let selectedMethod = 'wallet';
let currentUser = JSON.parse(localStorage.getItem('ohmy_active_user') || 'null');

document.addEventListener('DOMContentLoaded', () => {
    initGtaCountdown();
    renderTrendingCarousel(trendingGamesData);
    renderProducts(products);
    updateCartBadge();
    updateWishlistBadge();
    updateVaultBadge();
    updateWalletUI();
    updateAuthUI();

    document.addEventListener('click', (e) => {
        const searchBox = document.getElementById('searchAutocomplete');
        const searchInput = document.getElementById('searchInput');
        if (searchBox && !searchBox.contains(e.target) && e.target !== searchInput) {
            searchBox.classList.add('hidden');
        }
    });

    if (window.location.hash === '#admin') openAdminModal();
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#admin') openAdminModal();
    });
});

// ============================================================================
// 4. CUENTA REGRESIVA COMPACTA ESTILO ENEBA (FOTO 2)
// ============================================================================
let prevDigits = { d: '', h: '', m: '', s: '' };

function initGtaCountdown() {
    const targetTime = new Date(GTA6_RELEASE_DATE).getTime();

    function setDigit(id, val, key) {
        const el = document.getElementById(id);
        if (!el) return;
        if (prevDigits[key] !== val) {
            el.innerText = val;
            el.classList.remove('cd-digit-flip');
            void el.offsetWidth;
            el.classList.add('cd-digit-flip');
            prevDigits[key] = val;
        }
    }

    function updateTimer() {
        const diff = targetTime - Date.now();
        const centerStatus = document.getElementById('gtaCenterStatus');
        const container = document.getElementById('countdownContainer');

        if (diff <= 0) {
            if (centerStatus) centerStatus.innerText = "¡Ya disponible!";
            if (container) {
                container.innerHTML = `<div class="col-span-4 bg-emerald-500 text-slate-950 font-black py-2 rounded text-xs uppercase">¡YA DISPONIBLE!</div>`;
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        setDigit('cdDays', String(days).padStart(2, '0'), 'd');
        setDigit('cdHours', String(hours).padStart(2, '0'), 'h');
        setDigit('cdMins', String(mins).padStart(2, '0'), 'm');
        setDigit('cdSecs', String(secs).padStart(2, '0'), 's');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateTimer();
    });
}

function scrollToGiftCards() {
    activeCategory = 'giftcard';
    filterProducts();
    const grid = document.getElementById('productGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Helper que genera las cintas superiores de plataforma y el badge "DE CASHBACK" de la Foto 3
function getPlatformHeaderHTML(p) {
    if (p.headerType === 'xbox-one') {
        return `<div class="xbox-top-strip"><i class="fa-brands fa-xbox text-xs"></i><span>XBOX ONE</span></div>`;
    }
    if (p.headerType === 'palworld-pill') {
        return `<div class="xbox-side-pill"><i class="fa-brands fa-xbox text-emerald-600 text-sm"></i><div>Xbox Series X|S<br>Xbox One • Windows 10</div></div>`;
    }
    return '';
}

// ============================================================================
// 5. RENDERIZADO DE TENDENCIAS Y CATÁLOGO CON PORTADAS REALES (FOTO 3)
// ============================================================================
function renderTrendingCarousel(list) {
    const container = document.getElementById('trendingCarousel');
    if (!container) return;
    container.innerHTML = '';

    list.forEach(game => {
        const card = document.createElement('div');
        card.className = 'shrink-0 w-44 sm:w-52 bg-[#1f0f47] border border-purple-800/70 hover:border-fuchsia-500 rounded-xl overflow-hidden shadow-xl tilt-card cursor-pointer group flex flex-col justify-between';
        card.onclick = () => addToCart(game.linkId);

        card.innerHTML = `
            <div class="game-cover-container">
                ${getPlatformHeaderHTML(game)}
                <img src="${game.image}" alt="${game.title}" loading="lazy" width="220" height="330">
                <div class="eneba-cashback-badge">
                    <i class="fa-solid fa-rotate-left text-[9px]"></i>
                    <span>DE CASHBACK</span>
                </div>
                <span class="absolute top-7 right-2 bg-black/80 text-amber-300 font-black text-xs px-2 py-0.5 rounded">#${game.rank}</span>
            </div>
            <div class="p-2.5 space-y-1">
                <h3 class="font-bold text-xs text-white truncate">${game.title}</h3>
                <div class="flex justify-between items-center pt-1">
                    <span class="text-xs font-black text-emerald-400">${formatARS(game.price)}</span>
                    <span class="text-[10px] bg-purple-700 text-white px-2 py-0.5 rounded font-bold">${game.platform}</span>
                </div>
            </div>
        `;

        const imgEl = card.querySelector('img');
        imgEl.onerror = function () {
            this.onerror = null;
            this.src = FALLBACK_GAME_COVER;
        };

        container.appendChild(card);
    });
}

function filterTrending(platform, btn) {
    document.querySelectorAll('.trend-filter-btn').forEach(b => b.classList.remove('active-filter'));
    if (btn) btn.classList.add('active-filter');
    if (platform === 'all') renderTrendingCarousel(trendingGamesData);
    else renderTrendingCarousel(trendingGamesData.filter(g => g.platform.toLowerCase().includes(platform.toLowerCase())));
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-purple-300 font-semibold text-sm">No se encontraron productos con ese filtro.</div>`;
        return;
    }

    list.forEach(p => {
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const isFav = wishlist.includes(p.id);

        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-fuchsia-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container cursor-pointer" onclick="openProductDetail(${p.id})">
                    ${getPlatformHeaderHTML(p)}
                    <img src="${p.image}" alt="${p.name}" loading="lazy" width="300" height="450">
                    <button type="button" aria-label="Favorito" onclick="event.stopPropagation(); toggleWishlist(${p.id});" class="absolute top-7 right-2 w-7 h-7 rounded-full bg-black/65 hover:bg-black text-pink-400 flex items-center justify-center text-xs z-20">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <div class="eneba-cashback-badge">
                        <i class="fa-solid fa-rotate-left text-[9px]"></i>
                        <span>DE CASHBACK</span>
                    </div>
                </div>
                <div class="p-2.5 sm:p-3.5 space-y-1">
                    <h3 onclick="openProductDetail(${p.id})" class="cursor-pointer font-bold text-[11px] sm:text-xs text-white line-clamp-2 leading-snug group-hover:text-fuchsia-300 transition">${p.name}</h3>
                    <span class="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-2.5 sm:p-3.5 pt-0 space-y-2">
                <div>
                    <div class="flex items-center gap-1.5">
                        <span class="text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                        <span class="text-[10px] font-black text-rose-400">-${discount}%</span>
                    </div>
                    <span class="text-sm sm:text-base font-black text-white block leading-tight">${formatARS(p.price)}</span>
                    <span class="block text-[9px] sm:text-[10px] text-emerald-400 font-bold truncate">Cashback: ${formatARS(p.cashback)}</span>
                </div>
                <button type="button" onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-fuchsia-600 text-white font-bold py-2 rounded-lg text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition shadow">
                    <i class="fa-solid fa-cart-plus"></i> Añadir
                </button>
            </div>
        `;

        const imgEl = card.querySelector('img');
        imgEl.onerror = function () {
            this.onerror = null;
            this.src = FALLBACK_GAME_COVER;
        };

        grid.appendChild(card);
    });
}

// ============================================================================
// 6. FILTROS, MONEDA, CARRITO, CHECKOUT Y MODALES
// ============================================================================
function formatARS(amountInARS) {
    const cfg = currencyRates[activeCurrency] || currencyRates.ARS;
    const converted = Number(amountInARS) * cfg.rate;
    return cfg.symbol + converted.toLocaleString('es-AR', {
        minimumFractionDigits: cfg.decimals,
        maximumFractionDigits: cfg.decimals
    }) + cfg.suffix;
}

function changeCurrency(newCurr) {
    activeCurrency = newCurr;
    localStorage.setItem('ohmy_currency', newCurr);
    renderTrendingCarousel(trendingGamesData);
    filterProducts();
    renderCartItems();
    updateWalletUI();
}

function showToast(message, iconClass = 'fa-circle-check') {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'bg-[#1f0f47]/95 border border-fuchsia-500/60 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold pointer-events-auto';
    toast.innerHTML = `<i class="fa-solid ${iconClass} text-emerald-400 text-sm"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const formatted = formatARS(walletBalance);
    ['walletBalance', 'walletModalBalance', 'checkoutWalletAvailable'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = formatted;
    });
}

function setCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-cat'));
    if (btn) btn.classList.add('active-cat');
    filterProducts();
}

function filterProducts() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const sort = document.getElementById('sortSelect')?.value || 'featured';
    const maxSlider = document.getElementById('maxPriceSlider');
    const maxLabel = document.getElementById('maxPriceLabel');
    const maxArs = maxSlider ? Number(maxSlider.value) : 75000;

    if (maxLabel) maxLabel.innerText = maxArs >= 75000 ? 'Sin límite' : formatARS(maxArs);

    let filtered = products.filter(p => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchQuery = p.name.toLowerCase().includes(query) || p.platform.toLowerCase().includes(query);
        const matchPrice = p.price <= maxArs;
        return matchCat && matchQuery && matchPrice;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'discount') filtered.sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice));

    renderProducts(filtered);
}

function quickFilterPlatform(platformKeyword) {
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = platformKeyword;
    activeCategory = 'all';
    filterProducts();
    document.getElementById('productGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleSearchInput() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchAutocomplete');
    if (!input || !dropdown) return;

    const q = input.value.trim().toLowerCase();
    if (!q) {
        clearBtn?.classList.add('hidden');
        dropdown.classList.add('hidden');
        filterProducts();
        return;
    }

    clearBtn?.classList.remove('hidden');
    filterProducts();

    const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q)).slice(0, 6);
    dropdown.innerHTML = '';

    matches.forEach(p => {
        const row = document.createElement('div');
        row.className = 'p-2.5 hover:bg-[#2a175e] flex items-center justify-between gap-3 cursor-pointer';
        row.innerHTML = `
            <div onclick="openProductDetail(${p.id})" class="flex items-center gap-3 flex-1 min-w-0">
                <img src="${p.image}" class="w-10 h-12 object-cover rounded shrink-0">
                <div class="min-w-0">
                    <h5 class="text-xs font-bold text-white truncate">${p.name}</h5>
                    <span class="text-[10px] text-emerald-400 font-bold">${p.platform} • ${p.region}</span>
                </div>
            </div>
            <button type="button" onclick="addToCart(${p.id})" class="bg-purple-600 hover:bg-fuchsia-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold">${formatARS(p.price)}</button>
        `;
        dropdown.appendChild(row);
    });
    dropdown.classList.remove('hidden');
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
    document.getElementById('clearSearchBtn')?.classList.add('hidden');
    document.getElementById('searchAutocomplete')?.classList.add('hidden');
    filterProducts();
}

function openProductDetail(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    document.getElementById('searchAutocomplete')?.classList.add('hidden');

    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <button type="button" onclick="closeProductDetail()" class="absolute top-4 right-4 text-purple-300 hover:text-white text-xl"><i class="fa-solid fa-xmark"></i></button>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-4 max-w-[200px] mx-auto w-full">
                <div class="game-cover-container rounded-xl overflow-hidden border border-purple-600">
                    ${getPlatformHeaderHTML(p)}
                    <img src="${p.image}" alt="${p.name}">
                    <div class="eneba-cashback-badge"><i class="fa-solid fa-rotate-left text-[9px]"></i><span>DE CASHBACK</span></div>
                </div>
            </div>
            <div class="md:col-span-8 space-y-4">
                <span class="bg-purple-900 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded">${p.platform} • ${p.region}</span>
                <h2 class="text-xl sm:text-2xl font-black text-white">${p.name}</h2>
                <div class="bg-[#140930] border border-purple-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <span class="text-xs text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                        <div class="text-2xl font-black text-white">${formatARS(p.price)}</div>
                        <span class="text-xs text-emerald-400 font-bold">+${formatARS(p.cashback)} de Cashback</span>
                    </div>
                    <button type="button" onclick="closeProductDetail(); addToCart(${p.id});" class="bg-[#f5d020] hover:bg-[#ffe047] text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm">Comprar Ahora</button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeProductDetail() { document.getElementById('productDetailModal')?.classList.add('hidden'); }

function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) wishlist.splice(idx, 1);
    else wishlist.push(id);
    localStorage.setItem('ohmy_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    filterProducts();
}

function updateWishlistBadge() {
    const el = document.getElementById('wishlistBadge');
    if (el) el.innerText = wishlist.length;
}

function openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const container = document.getElementById('wishlistItemsContainer');
    if (!modal || !container) return;
    container.innerHTML = wishlist.length === 0 ? `<p class="text-xs text-purple-300 text-center py-6">Sin favoritos guardados.</p>` : '';
    wishlist.forEach(id => {
        const p = products.find(x => x.id === id);
        if (!p) return;
        container.innerHTML += `<div class="bg-[#2a175e] p-2.5 rounded-xl flex justify-between items-center text-xs"><span class="font-bold truncate pr-2">${p.name}</span><button type="button" onclick="closeWishlistModal();addToCart(${p.id});" class="bg-fuchsia-600 text-white px-3 py-1 rounded font-bold shrink-0">${formatARS(p.price)}</button></div>`;
    });
    modal.classList.remove('hidden');
}
function closeWishlistModal() { document.getElementById('wishlistModal')?.classList.add('hidden'); }

function toggleCart() {
    document.getElementById('cartDrawer')?.classList.toggle('hidden');
    renderCartItems();
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...prod, qty: 1 });
    updateCartBadge();
    showToast(`${prod.name.substring(0, 22)}... añadido`, 'fa-cart-plus');
    document.getElementById('cartDrawer')?.classList.remove('hidden');
    renderCartItems();
}

function updateCartBadge() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const b1 = document.getElementById('cartBadge');
    const b2 = document.getElementById('cartCount');
    if (b1) b1.innerText = count;
    if (b2) b2.innerText = count;
}

function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    if (!list) return;
    list.innerHTML = '';

    if (cart.length === 0) {
        list.innerHTML = `<p class="text-center text-purple-300 py-8 text-xs">Tu carro está vacío.</p>`;
        updateCartTotals(0, 0, 0);
        return;
    }

    let subtotal = 0;
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        list.innerHTML += `
            <div class="flex items-center justify-between bg-[#2a175e] p-2.5 rounded-xl border border-purple-700/50 gap-2 text-xs">
                <img src="${item.image}" class="w-10 h-13 object-cover rounded shrink-0">
                <div class="min-w-0 flex-1">
                    <h4 class="font-bold text-white truncate">${item.name}</h4>
                    <span class="text-emerald-400 font-black">${formatARS(item.price)}</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" onclick="changeQty(${idx}, -1)" class="w-6 h-6 bg-purple-900 rounded font-bold">-</button>
                    <span class="font-bold">${item.qty}</span>
                    <button type="button" onclick="changeQty(${idx}, 1)" class="w-6 h-6 bg-purple-900 rounded font-bold">+</button>
                </div>
            </div>
        `;
    });

    const discount = subtotal * appliedDiscount;
    updateCartTotals(subtotal, discount, subtotal - discount);
}

function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    updateCartBadge();
    renderCartItems();
    renderEnebaSummary();
}

function applyCoupon() {
    const code = (document.getElementById('couponInput')?.value || '').trim().toUpperCase();
    const msg = document.getElementById('couponMessage');
    if (code === 'ARGON10') {
        appliedDiscount = 0.10;
        if (msg) { msg.className = 'text-xs text-emerald-400 font-bold'; msg.innerText = '¡10% OFF aplicado!'; }
    } else {
        appliedDiscount = 0;
        if (msg) { msg.className = 'text-xs text-rose-400 font-bold'; msg.innerText = 'Cupón inválido.'; }
    }
    renderCartItems();
}

function updateCartTotals(sub, disc, tot) {
    const sEl = document.getElementById('cartSubtotal');
    const dEl = document.getElementById('cartDiscount');
    const tEl = document.getElementById('cartTotal');
    if (sEl) sEl.innerText = formatARS(sub);
    if (dEl) dEl.innerText = '-' + formatARS(disc);
    if (tEl) tEl.innerText = formatARS(tot);
}

function switchView(view) {
    ['viewStore', 'viewCheckoutEneba', 'viewCheckoutPagoNube', 'viewSuccess'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
    const mainH = document.getElementById('mainHeader');
    const chkH = document.getElementById('checkoutHeader');

    if (view === 'store') {
        mainH?.classList.remove('hidden');
        chkH?.classList.add('hidden');
        document.getElementById('viewStore')?.classList.remove('hidden');
    } else {
        mainH?.classList.add('hidden');
        chkH?.classList.remove('hidden');
        if (view === 'checkoutEneba') document.getElementById('viewCheckoutEneba')?.classList.remove('hidden');
        if (view === 'checkoutPagoNube') document.getElementById('viewCheckoutPagoNube')?.classList.remove('hidden');
        if (view === 'success') document.getElementById('viewSuccess')?.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    document.getElementById('cartDrawer')?.classList.add('hidden');
    renderEnebaSummary();
    switchView('checkoutEneba');
}

function selectPaymentCard(el, method) {
    selectedMethod = method;
    document.querySelectorAll('.eneba-pay-card').forEach(c => c.classList.remove('selected-pay-card'));
    el.classList.add('selected-pay-card');
}

function renderEnebaSummary() {
    const c = document.getElementById('checkoutSummaryItems');
    if (!c) return;
    c.innerHTML = '';
    let sub = 0;
    cart.forEach(item => {
        sub += item.price * item.qty;
        c.innerHTML += `<div class="flex justify-between text-xs py-2"><span class="font-bold text-white">${item.name} (x${item.qty})</span><span class="font-black text-emerald-400">${formatARS(item.price * item.qty)}</span></div>`;
    });
    const disc = sub * appliedDiscount;
    document.getElementById('summarySubtotal').innerText = formatARS(sub);
    document.getElementById('summaryDiscount').innerText = '-' + formatARS(disc);
    document.getElementById('summaryTotal').innerText = formatARS(sub - disc);
}

function goToPagoNubeGateway() {
    const b = document.getElementById('selectedMethodBadge');
    if (b) b.innerText = selectedMethod.toUpperCase();
    switchView('checkoutPagoNube');
}

function backToEnebaSelection() { switchView('checkoutEneba'); }

function formatCardNumberInput(input) {
    let digits = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = digits.match(/.{1,4}/g)?.join(' ') || '';
    updateCardPreview();
}

function formatCardExpInput(input) {
    let digits = input.value.replace(/\D/g, '').substring(0, 4);
    input.value = digits.length >= 3 ? digits.substring(0, 2) + '/' + digits.substring(2, 4) : digits;
    updateCardPreview();
}

function flipCard3D(flip) {
    const card = document.getElementById('interactiveCard3D');
    if (card) card.classList.toggle('is-flipped', flip);
}

function updateCardPreview() {
    document.getElementById('cardPreviewName').innerText = document.getElementById('sbName')?.value || 'NOMBRE Y APELLIDO';
    document.getElementById('cardPreviewNumber').innerText = document.getElementById('sbCardNum')?.value || '•••• •••• •••• ••••';
    document.getElementById('cardPreviewExp').innerText = document.getElementById('sbCardExp')?.value || 'MM/AA';
    document.getElementById('cardPreviewCvv').innerText = document.getElementById('sbCardCvv')?.value || '•••';
}

function processSandboxPayment(e) {
    e.preventDefault();
    const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
    const totalCashback = cart.reduce((a, b) => a + b.cashback * b.qty, 0);
    walletBalance += totalCashback;
    updateWalletUI();

    const record = {
        id: 'ARGON-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString('es-AR'),
        buyer: { name: document.getElementById('sbName')?.value, email: document.getElementById('sbEmail')?.value },
        total: subtotal * (1 - appliedDiscount),
        cashbackEarned: totalCashback,
        items: [...cart]
    };

    const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
    db.push(record);
    localStorage.setItem('ohmy_sandbox_db', JSON.stringify(db));

    document.getElementById('cashbackNotice').innerText = `¡Sumaste +${formatARS(totalCashback)} de Cashback en tu Cartera Argon!`;
    const kC = document.getElementById('keysContainer');
    if (kC) kC.innerHTML = '';

    cart.forEach(item => {
        const key = 'ARGON-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
        myVaultKeys.push({ name: item.name, key, date: record.date });
        if (kC) kC.innerHTML += `<div class="bg-[#261259] border border-purple-700 p-3.5 rounded-xl flex justify-between items-center text-xs"><span class="font-bold">${item.name}</span><code class="text-emerald-400 font-mono font-bold">${key}</code></div>`;
    });

    localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
    updateVaultBadge();
    cart = [];
    updateCartBadge();
    switchView('success');
}

function updateVaultBadge() {
    const b = document.getElementById('vaultCountBadge');
    if (b) b.innerText = myVaultKeys.length;
}
function openVaultModal() {
    const m = document.getElementById('vaultModal');
    const l = document.getElementById('vaultKeysList');
    if (!m || !l) return;
    l.innerHTML = myVaultKeys.length === 0 ? `<p class="text-xs text-purple-300 text-center py-4">Aún no tienes keys.</p>` : '';
    myVaultKeys.forEach(k => { l.innerHTML += `<div class="bg-[#2a175e] p-2.5 rounded-lg flex justify-between text-xs"><span>${k.name}</span><code class="text-emerald-400 font-bold">${k.key}</code></div>`; });
    m.classList.remove('hidden');
}
function closeVaultModal() { document.getElementById('vaultModal')?.classList.add('hidden'); }
function openWalletModal() { updateWalletUI(); document.getElementById('walletModal')?.classList.remove('hidden'); }
function closeWalletModal() { document.getElementById('walletModal')?.classList.add('hidden'); }
function redeemWalletCode() {
    const c = (document.getElementById('giftCodeInput')?.value || '').trim().toUpperCase();
    if (c === 'ARGONVIP') { walletBalance += 2500; updateWalletUI(); showToast('+$2.500 ARS acreditados'); }
    else showToast('Código inválido', 'fa-circle-xmark');
}
function openPacksModal() { document.getElementById('packsModal')?.classList.remove('hidden'); }
function closePacksModal() { document.getElementById('packsModal')?.classList.add('hidden'); }
function spinMysteryPack(tier) {
    const res = document.getElementById('packSpinResult');
    if (!res) return;
    res.classList.remove('hidden');
    const won = products[Math.floor(Math.random() * 10)];
    const key = 'PACK-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    myVaultKeys.push({ name: `${won.name} (${tier})`, key, date: new Date().toLocaleString('es-AR') });
    localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
    updateVaultBadge();
    res.innerHTML = `<p class="text-xs font-bold text-emerald-400">¡Ganaste: ${won.name}!</p><code class="text-amber-300 font-mono text-xs">${key}</code>`;
}
function openAuthModal() { document.getElementById('authModal')?.classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('authModal')?.classList.add('hidden'); }
function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmailInput').value;
    currentUser = { name: email.split('@')[0], email };
    localStorage.setItem('ohmy_active_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
}
function updateAuthUI() {
    const u = document.getElementById('userNavArea');
    if (u && currentUser) u.innerHTML = `<span class="text-xs text-emerald-400 font-bold">${currentUser.name}</span>`;
}
function openAdminModal() { document.getElementById('adminModal')?.classList.remove('hidden'); }
function closeAdminModal() { document.getElementById('adminModal')?.classList.add('hidden'); }
function verifyAdminPassword() {
    if (document.getElementById('adminPasswordInput')?.value === 'ohmyadmin2026') {
        document.getElementById('adminAuthSection')?.classList.add('hidden');
        document.getElementById('adminContentSection')?.classList.remove('hidden');
        const db = JSON.parse(localStorage.getItem('ohmy_sandbox_db') || '[]');
        document.getElementById('dbCountBadge').innerText = db.length;
        const c = document.getElementById('adminDbRecords');
        c.innerHTML = db.map(x => `<div class="bg-[#2a175e] p-2.5 rounded">${x.id} - ${x.buyer.name} - ${formatARS(x.total)}</div>`).join('');
    } else {
        document.getElementById('adminErrorMsg')?.classList.remove('hidden');
    }
}
function clearDatabase() { localStorage.removeItem('ohmy_sandbox_db'); verifyAdminPassword(); }
