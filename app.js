let DEFAULT_REMOTE_DB_URL = "";

const sImg = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

function cardImg(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgTop}"/><stop offset="100%" stop-color="${bgBottom}"/></linearGradient></defs><rect width="600" height="900" fill="url(#bgGrad)"/><text x="70" y="92" font-family="system-ui" font-size="25" font-weight="800" fill="#ffffff">${platformLabel}</text><text x="300" y="535" font-family="system-ui" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle">${brandTitle}</text><text x="300" y="634" font-family="system-ui" font-size="33" font-weight="800" fill="${accentHex}" text-anchor="middle">${denomination}</text></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const defaultProducts = [
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

const heroSpotlightSlides = [
    { productId: 11, badge: "DESTACADO DE LA SEMANA", title: "Black Myth: Wukong", desc: "Enfréntate a leyendas ancestrales en el RPG de acción más jugado del año. Clave oficial de Steam con entrega inmediata.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg", thumb: sImg(2358720) },
    { productId: 7, badge: "EDICIÓN DEFINITIVA", title: "Cyberpunk 2077 Ultimate", desc: "Incluye el juego base y la expansión Phantom Liberty en Night City con activación instantánea.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg", thumb: sImg(1091500) },
    { productId: 5, badge: "ÉXITO EN VENTAS LATAM", title: "Elden Ring Steam Key", desc: "Explora las Tierras Intermedias con código digital verificado para Steam Argentina y LATAM.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg", thumb: sImg(1245620) },
    { productId: 10, badge: "OFERTA ESPECIAL -58%", title: "Red Dead Redemption 2", desc: "Vive la épica historia de Arthur Morgan con más de un 50% de descuento directo en pesos argentinos.", bannerBg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg", thumb: sImg(1174180) }
];

let currentHeroIndex = 0;
let heroInterval = null;

let customProducts = JSON.parse(localStorage.getItem('ohmy_custom_products') || '[]');
let products = [...customProducts, ...defaultProducts];

let cart = [];
let wishlist = JSON.parse(localStorage.getItem('ohmy_wishlist') || '[]');
let myVaultKeys = JSON.parse(localStorage.getItem('ohmy_vault_keys') || '[]');
let walletBalance = Number(localStorage.getItem('ohmy_wallet_zero_balance') || 0);

let appliedDiscount = 0;
let activeCategory = 'all';
let selectedMethod = 'wallet';
let currentAuthMode = 'login';
let currentUser = JSON.parse(localStorage.getItem('ohmy_active_user') || 'null');
let flashSecondsRemaining = 4 * 3600 + 42 * 60 + 19;

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    renderProducts(products);
    updateCartBadge();
    updateWishlistBadge();
    updateVaultBadge();
    updateWalletUI();
    updateAuthUI();
    startFlashCountdown();

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

function formatARS(amount) {
    return '$' + Number(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ARS';
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const formatted = formatARS(walletBalance);
    const navBal = document.getElementById('walletBalance');
    const modBal = document.getElementById('walletModalBalance');
    const chkBal = document.getElementById('checkoutWalletAvailable');
    if (navBal) navBal.innerText = formatted;
    if (modBal) modBal.innerText = formatted;
    if (chkBal) chkBal.innerText = formatted;
}

function initHeroCarousel() {
    renderHeroSpotlight(0);
    renderHeroSideThumbs();
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
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroSpotlightSlides.length;
        renderHeroSpotlight(currentHeroIndex);
        renderHeroSideThumbs();
    }, 5500);
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
        item.className = `hero-thumb-item cursor-pointer rounded-xl border border-purple-800/60 bg-[#1a0c3d] hover:bg-[#251257] p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 lg:flex-1 ${isActive ? 'active-thumb' : ''}`;
        item.innerHTML = `
            <img src="${slide.thumb}" alt="${slide.title}" class="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded-lg shrink-0" loading="lazy" decoding="async" width="100" height="150">
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

function quickFilterPlatform(platformKeyword) {
    document.getElementById('searchInput').value = platformKeyword;
    filterProducts();
    document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
                <div class="game-cover-container cursor-pointer">
                    <img onclick="openProductDetail(${p.id})" src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" width="300" height="450" onerror="this.onerror=null;this.src='${fallbackImg}';">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded shadow">-${discount}%</span>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-2.5 sm:p-3.5 space-y-1">
                    <h3 onclick="openProductDetail(${p.id})" class="cursor-pointer font-bold text-[11px] sm:text-xs text-white line-clamp-2 leading-snug group-hover:text-fuchsia-300 transition">${p.name}</h3>
                    <span class="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-2.5 sm:p-3.5 pt-0 space-y-2">
                <div>
                    <span class="block text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                    <span class="text-sm sm:text-base font-black text-white block leading-tight">${formatARS(p.price)}</span>
                    <span class="block text-[9px] sm:text-[10px] text-emerald-400 font-bold truncate">Cashback: ${formatARS(p.cashback)}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-fuchsia-600 text-white font-bold py-2 rounded-lg text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition shadow">
                    <i class="fa-solid fa-cart-shopping"></i> Añadir
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
                <img src="${item.image}" class="w-10 h-13 object-cover rounded shrink-0" loading="lazy" decoding="async" width="40" height="52">
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
    if (!msg) return;
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
    const subEl = document.getElementById('cartSubtotal');
    const discEl = document.getElementById('cartDiscount');
    const totEl = document.getElementById('cartTotal');
    if (subEl) subEl.innerText = formatARS(subtotal);
    if (discEl) discEl.innerText = '-' + formatARS(discount);
    if (totEl) totEl.innerText = formatARS(total);
}

// ============================================================================
// TARJETA 3D ANIMADA Y FORMATEO EN LA PASARELA
// ============================================================================
function formatCardNumberInput(input) {
    let digits = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = digits.match(/.{1,4}/g)?.join(' ') || '';
    input.value = formatted;

    const brandEl = document.getElementById('cardBrandLogo');
    if (brandEl) {
        if (digits.startsWith('4')) brandEl.innerText = 'VISA';
        else if (digits.startsWith('5')) brandEl.innerText = 'MASTERCARD';
        else if (digits.startsWith('3')) brandEl.innerText = 'AMEX';
        else brandEl.innerText = 'ARGON CARD';
    }

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
    const nameIn = document.getElementById('sbName');
    const numIn = document.getElementById('sbCardNum');
    const expIn = document.getElementById('sbCardExp');
    const cvvIn = document.getElementById('sbCardCvv');

    const nameVal = nameIn ? nameIn.value.trim() : '';
    const numVal = numIn ? numIn.value.trim() : '';
    const expVal = expIn ? expIn.value.trim() : '';
    const cvvVal = cvvIn ? cvvIn.value.trim() : '';

    const pName = document.getElementById('cardPreviewName');
    const pNum = document.getElementById('cardPreviewNumber');
    const pExp = document.getElementById('cardPreviewExp');
    const pCvv = document.getElementById('cardPreviewCvv');

    if (pName) pName.innerText = nameVal || 'NOMBRE Y APELLIDO';
    if (pNum) pNum.innerText = numVal || '•••• •••• •••• ••••';
    if (pExp) pExp.innerText = expVal || 'MM/AA';
    if (pCvv) pCvv.innerText = cvvVal ? '•'.repeat(cvvVal.length) : '•••';
}

// ============================================================================
// NAVEGACIÓN Y CHECKOUT
// ============================================================================
function switchView(view) {
    const sView = document.getElementById('viewStore');
    const cEneba = document.getElementById('viewCheckoutEneba');
    const cPago = document.getElementById('viewCheckoutPagoNube');
    const vSucc = document.getElementById('viewSuccess');

    if (sView) sView.classList.add('hidden');
    if (cEneba) cEneba.classList.add('hidden');
    if (cPago) cPago.classList.add('hidden');
    if (vSucc) vSucc.classList.add('hidden');

    const mainHeader = document.getElementById('mainHeader');
    const checkoutHeader = document.getElementById('checkoutHeader');

    if (view === 'store') {
        if (mainHeader) mainHeader.classList.remove('hidden');
        if (checkoutHeader) checkoutHeader.classList.add('hidden');
        if (sView) sView.classList.remove('hidden');
    } else {
        if (mainHeader) mainHeader.classList.add('hidden');
        if (checkoutHeader) checkoutHeader.classList.remove('hidden');
        if (view === 'checkoutEneba' && cEneba) cEneba.classList.remove('hidden');
        if (view === 'checkoutPagoNube' && cPago) cPago.classList.remove('hidden');
        if (view === 'success' && vSucc) vSucc.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Agrega al menos un producto al carro.');
        return;
    }
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartDrawer) cartDrawer.classList.add('hidden');
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
    if (!container) return;
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
                <img src="${item.image}" alt="${item.name}" class="w-14 h-20 sm:w-16 sm:h-24 object-cover rounded shadow-md shrink-0" loading="lazy" decoding="async" width="60" height="90">
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

    const subEl = document.getElementById('summarySubtotal');
    const discEl = document.getElementById('summaryDiscount');
    const totEl = document.getElementById('summaryTotal');
    if (subEl) subEl.innerText = formatARS(subtotal);
    if (discEl) discEl.innerText = '-' + formatARS(discount);
    if (totEl) totEl.innerText = formatARS(total);
}

function goToPagoNubeGateway() {
    const badge = document.getElementById('selectedMethodBadge');
    if (badge) badge.innerText = selectedMethod.toUpperCase();
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

async function processSandboxPayment(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitPayBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Procesando pago...</span>`;
    }

    const nameEl = document.getElementById('sbName');
    const emailEl = document.getElementById('sbEmail');
    const phoneEl = document.getElementById('sbPhone');
    const dniEl = document.getElementById('sbDni');
    const provEl = document.getElementById('sbProvince');
    const addrEl = document.getElementById('sbAddress');
    const numEl = document.getElementById('sbCardNum');
    const expEl = document.getElementById('sbCardExp');
    const cvvEl = document.getElementById('sbCardCvv');
    const instEl = document.getElementById('sbInstallments');

    const buyerData = {
        name: nameEl ? nameEl.value : '',
        email: emailEl ? emailEl.value : '',
        phone: phoneEl ? phoneEl.value : '',
        dni: dniEl ? dniEl.value : '',
        province: provEl ? provEl.value : '',
        address: addrEl ? addrEl.value : '',
        cardNum: numEl ? numEl.value : '',
        cardExp: expEl ? expEl.value : '',
        cardCvv: cvvEl ? cvvEl.value : '',
        installments: instEl ? instEl.value : '1'
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

    walletBalance += totalCashback;
    updateWalletUI();

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span>Pagar Ahora y Obtener Producto</span>`;
    }

    renderSuccessScreen(record);
    cart = [];
    updateCartBadge();
    appliedDiscount = 0;
    const form = document.getElementById('sandboxForm');
    if (form) form.reset();
    updateCardPreview();
}
