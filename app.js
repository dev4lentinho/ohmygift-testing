// ============================================================================
// 1. CONSTANTES DE CONFIGURACIÓN RÁPIDA (FECHA DE GTA VI Y MONEDA)
// ============================================================================
// Fecha objetivo en hora local del dispositivo (sin 'Z' al final para usar la zona horaria del usuario)
// Para simular que el contador llega a cero: cambia esta fecha a '2020-01-01T00:00:00'
const GTA6_RELEASE_DATE = '2026-11-19T00:00:00';

let DEFAULT_REMOTE_DB_URL = "";

const currencyRates = {
    ARS: { rate: 1, symbol: '$', suffix: ' ARS', decimals: 2 },
    USD: { rate: 0.00085, symbol: 'US$', suffix: ' USD', decimals: 2 },
    EUR: { rate: 0.00079, symbol: '€', suffix: ' EUR', decimals: 2 }
};
let activeCurrency = localStorage.getItem('ohmy_currency') || 'ARS';

// ============================================================================
// 2. GENERADORES DE PLACEHOLDERS SVG CON GRADIENTES (SIN COPYRIGHT)
// ============================================================================
/*
   AVISO IMPORTANTE SOBRE IMÁGENES Y DERECHOS DE AUTOR:
   Por defecto usamos generadores de arte vectorial SVG con gradientes neón ("gamePlaceholder" y "cardImg")
   para no utilizar logos ni arte oficial de Rockstar, GTA u otros estudios sin permiso.
   Si tienes permiso o usas material de prensa (Press Kits oficiales permitidos),
   solo reemplaza la llamada a `gamePlaceholder(...)` por la URL de tu imagen WebP:
   ejemplo: image: "assets/img/mi-portada-autorizada.webp"
*/
function gamePlaceholder(title, subtitle, bgTop, bgBottom, accentHex, tagLabel = "DIGITAL KEY") {
    const safeTitle = title.length > 18 ? title.substring(0, 18) + "…" : title;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="gBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bgTop}"/>
                <stop offset="60%" stop-color="${bgBottom}"/>
                <stop offset="100%" stop-color="#090414"/>
            </linearGradient>
            <radialGradient id="gGlow" cx="50%" cy="35%" r="50%">
                <stop offset="0%" stop-color="${accentHex}" stop-opacity="0.38"/>
                <stop offset="100%" stop-color="${accentHex}" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="600" height="900" fill="url(#gBg)"/>
        <circle cx="300" cy="320" r="280" fill="url(#gGlow)"/>
        <!-- Silueta decorativa gamer + palmeras estilo Vice -->
        <path d="M0 740 Q150 690 300 740 T600 720 L600 900 L0 900 Z" fill="#070312" opacity="0.85"/>
        <rect x="34" y="34" width="532" height="832" rx="28" fill="none" stroke="${accentHex}" stroke-opacity="0.4" stroke-width="3"/>
        <rect x="54" y="56" width="210" height="44" rx="10" fill="rgba(0,0,0,0.55)" stroke="${accentHex}" stroke-width="1.5"/>
        <text x="159" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="${accentHex}" text-anchor="middle" letter-spacing="2">${tagLabel}</text>
        <!-- Icono central geométrico -->
        <polygon points="300,210 385,265 385,365 300,420 215,365 215,265" fill="rgba(255,255,255,0.05)" stroke="${accentHex}" stroke-width="4"/>
        <circle cx="300" cy="315" r="28" fill="${accentHex}" opacity="0.85"/>
        <!-- Textos del juego -->
        <text x="300" y="545" font-family="system-ui, sans-serif" font-size="44" font-weight="900" font-style="italic" fill="#ffffff" text-anchor="middle" letter-spacing="1">${safeTitle}</text>
        <rect x="115" y="585" width="370" height="62" rx="14" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
        <text x="300" y="625" font-family="system-ui, sans-serif" font-size="26" font-weight="800" fill="${accentHex}" text-anchor="middle" letter-spacing="2">${subtitle}</text>
        <text x="300" y="820" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="rgba(255,255,255,0.55)" text-anchor="middle" letter-spacing="4">OHMYGIFTCARD! ARGON</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function cardImg(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
        <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${bgTop}"/>
                <stop offset="100%" stop-color="${bgBottom}"/>
            </linearGradient>
        </defs>
        <rect width="600" height="900" fill="url(#bgGrad)"/>
        <path d="M-100 200 L700 -100 L700 150 L-100 450 Z" fill="${accentHex}" opacity="0.09"/>
        <circle cx="520" cy="140" r="180" fill="${accentHex}" opacity="0.14"/>
        <rect x="36" y="36" width="528" height="828" rx="32" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
        <rect x="36" y="36" width="528" height="90" rx="32" fill="rgba(0,0,0,0.35)"/>
        <text x="70" y="92" font-family="system-ui, sans-serif" font-size="25" font-weight="800" fill="#ffffff" letter-spacing="2">${platformLabel}</text>
        <rect x="360" y="56" width="175" height="50" rx="12" fill="${accentHex}"/>
        <text x="447" y="90" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#090d16" text-anchor="middle">${denomination}</text>
        <polygon points="300,235 385,285 385,380 300,430 215,380 215,285" fill="rgba(255,255,255,0.07)" stroke="${accentHex}" stroke-width="5"/>
        <circle cx="300" cy="332" r="26" fill="#ffffff"/>
        <text x="300" y="535" font-family="system-ui, sans-serif" font-size="58" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${brandTitle}</text>
        <rect x="110" y="585" width="380" height="74" rx="18" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <text x="300" y="634" font-family="system-ui, sans-serif" font-size="33" font-weight="800" fill="${accentHex}" text-anchor="middle">${denomination}</text>
        <text x="300" y="810" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.6)" text-anchor="middle" letter-spacing="4">OFFICIAL DIGITAL CODE</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// ============================================================================
// 3. DATOS DE EJEMPLO (MOCK): TOP 10 EN TENDENCIA Y PRÓXIMOS LANZAMIENTOS
// ============================================================================
/*
   GUÍA PARA CONECTAR A UNA API REAL (RAWG.io o Steam Web API):
   - RAWG API (Recomendada para front-end): Permite consultar juegos en tendencia con CORS habilitado.
     Necesitas crear una API Key gratuita en https://rawg.io/apidocs.
     Ejemplo de fetch:
     async function fetchLiveTrendingGames() {
         const res = await fetch('https://api.rawg.io/api/games?key=TU_API_KEY&dates=2026-01-01,2026-12-31&ordering=-added&page_size=10');
         const data = await res.json();
         // Mapear data.results al formato de trendingGamesData y llamar a renderTrendingCarousel()
     }
   - Nota de seguridad: Si no quieres que tu API Key de RAWG sea visible en el navegador, o si deseas
     conectar la API oficial de Steam (`ISteamChartsService`), debes crear un pequeño endpoint intermedio
     (proxy backend en Node.js/Express en Render) que guarde la API Key en variables de entorno (`process.env`).
*/
const trendingGamesData = [
    // Reemplaza `image` por tu propio archivo WebP autorizado cuando tengas material de prensa oficial
    { id: 101, title: "Vice City Stories VI", platform: "PS5", badge: "Preventa", rank: 1, change: "up", giftCardName: "PSN Card $50 USD", linkId: 30, image: gamePlaceholder("VICE VI EDITION", "PS5 • PREVENTA", "#701a75", "#1e1b4b", "#f472b6", "TOP #1") },
    { id: 102, title: "EA Football Club 26", platform: "Xbox", badge: "En tendencia", rank: 2, change: "up", giftCardName: "Xbox Card $25.000 ARS", linkId: 32, image: gamePlaceholder("FOOTBALL 26", "XBOX SERIES X|S", "#065f46", "#052e16", "#34d399", "TOP #2") },
    { id: 103, title: "Monster Wilds Hunter", platform: "Steam", badge: "Nuevo", rank: 3, change: "up", giftCardName: "Steam Card $20 USD", linkId: 26, image: gamePlaceholder("MONSTER WILDS", "STEAM PC", "#1e3a8a", "#0f172a", "#38bdf8", "TOP #3") },
    { id: 104, title: "Black Myth: Wukong", platform: "Steam", badge: "Oferta", rank: 4, change: "same", giftCardName: "Steam Card $50 USD", linkId: 27, image: gamePlaceholder("WUKONG MYTH", "STEAM GLOBAL", "#78350f", "#1c1917", "#fbbf24", "TOP #4") },
    { id: 105, title: "Elden Ring: Erdtree", platform: "PS5", badge: "En tendencia", rank: 5, change: "up", giftCardName: "PSN Card $25 USD", linkId: 29, image: gamePlaceholder("SHADOW ERDTREE", "PS5 / STEAM", "#3f3f46", "#09090b", "#facc15", "TOP #5") },
    { id: 106, title: "Prime Odyssey 4", platform: "Switch", badge: "Preventa", rank: 6, change: "down", giftCardName: "Nintendo eShop $20 USD", linkId: 33, image: gamePlaceholder("PRIME ODYSSEY 4", "SWITCH ESHOP", "#7f1d1d", "#1f0909", "#f87171", "TOP #6") },
    { id: 107, title: "Cyber Night 2077", platform: "Steam", badge: "Oferta", rank: 7, change: "up", giftCardName: "Steam Card $10 USD", linkId: 25, image: gamePlaceholder("CYBER NIGHT", "ULTIMATE KEY", "#854d0e", "#1e1b4b", "#fde047", "TOP #7") },
    { id: 108, title: "Helldivers Galaxy 2", platform: "PS5", badge: "En tendencia", rank: 8, change: "down", giftCardName: "PSN Card $10 USD", linkId: 28, image: gamePlaceholder("GALAXY DIVERS 2", "CO-OP ACTION", "#1e293b", "#020617", "#38bdf8", "TOP #8") },
    { id: 109, title: "Horizon Racing 5", platform: "Xbox", badge: "Oferta", rank: 9, change: "same", giftCardName: "Xbox Card $10.000 ARS", linkId: 31, image: gamePlaceholder("HORIZON RACING", "XBOX / PC", "#831843", "#1e1b4b", "#fb7185", "TOP #9") },
    { id: 110, title: "Super Kart Deluxe", platform: "Switch", badge: "En tendencia", rank: 10, change: "up", giftCardName: "Nintendo eShop $20 USD", linkId: 33, image: gamePlaceholder("KART DELUXE", "NINTENDO SWITCH", "#991b1b", "#1e1b4b", "#fca5a5", "TOP #10") }
];

// Próximos lanzamientos con fechas ISO para calcular mini-contadores en vivo
const upcomingGamesData = [
    { title: "Grand Theft Auto VI (Consolas)", releaseISO: "2026-11-19T00:00:00", platform: "PS5 / Xbox Series X|S", linkId: 30, image: gamePlaceholder("GTA VI LAUNCH", "19 NOV 2026", "#831843", "#311042", "#f472b6", "ESTRENO") },
    { title: "Fable: Albion Reborn", releaseISO: "2026-12-10T00:00:00", platform: "Xbox Series / Steam", linkId: 32, image: gamePlaceholder("ALBION REBORN", "10 DIC 2026", "#065f46", "#0f172a", "#34d399", "PREVENTA") },
    { title: "Space Marine: Chaos DLC", releaseISO: "2027-01-15T00:00:00", platform: "Steam / PS5 / Xbox", linkId: 26, image: gamePlaceholder("SPACE CHAOS", "15 ENE 2027", "#1e3a8a", "#172554", "#60a5fa", "PRÓXIMO") }
];

// ============================================================================
// 4. CATÁLOGO COMPLETO DE 48 PRODUCTOS (JUEGOS, GIFT CARDS, MONEDAS Y SUSCRIPCIONES)
// ============================================================================
const defaultProducts = [
    // JUEGOS & DLCs (1 a 24) - Con placeholders de gradientes listos para cambiar por imágenes propias
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: gamePlaceholder("BLOCK CRAFT", "JAVA & BEDROCK", "#14532d", "#052e16", "#4ade80", "GLOBAL KEY") },
    { id: 2, name: "Crimson Desert Enhanced: Charting the Unknown (DLC) Steam Key LATAM", category: "dlc", platform: "Steam", region: "LATAM", price: 17020, originalPrice: 22000, cashback: 2210, seller: "Instant-Codes", image: gamePlaceholder("CRIMSON DESERT", "DLC STEAM", "#7f1d1d", "#1c1917", "#f87171", "DLC KEY") },
    { id: 3, name: "EA SPORTS FC 25 Standard Edition Key", category: "game", platform: "EA App", region: "ARGENTINA", price: 34999, originalPrice: 59999, cashback: 3500, seller: "ArgonOfficial", image: gamePlaceholder("FOOTBALL FC 25", "STANDARD KEY", "#064e3b", "#022c22", "#34d399", "ARGENTINA") },
    { id: 4, name: "Grand Theft Auto V: Premium Online Edition", category: "game", platform: "Rockstar", region: "GLOBAL", price: 12500, originalPrice: 25000, cashback: 1250, seller: "GGclub", image: gamePlaceholder("LOS SANTOS V", "PREMIUM ONLINE", "#14532d", "#090d16", "#a3e635", "ROCKSTAR") },
    { id: 5, name: "Elden Ring Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 29999, originalPrice: 39999, cashback: 3000, seller: "Instant-Codes", image: gamePlaceholder("ELDEN REALM", "STEAM LATAM", "#713f12", "#1c1917", "#facc15", "STEAM PC") },
    { id: 6, name: "Elden Ring: Shadow of the Erdtree (DLC) Steam Key", category: "dlc", platform: "Steam", region: "LATAM", price: 22500, originalPrice: 29999, cashback: 2250, seller: "GGclub", image: gamePlaceholder("ERDTREE SHADOW", "EXPANSIÓN DLC", "#78350f", "#0c0a09", "#fbbf24", "DLC STEAM") },
    { id: 7, name: "Cyberpunk 2077 Ultimate Edition Key", category: "game", platform: "GOG / Steam", region: "GLOBAL", price: 27500, originalPrice: 45000, cashback: 2750, seller: "ArgonOfficial", image: gamePlaceholder("CYBER 2077", "ULTIMATE KEY", "#854d0e", "#1e1b4b", "#fde047", "GLOBAL") },
    { id: 8, name: "Cyberpunk 2077: Phantom Liberty (DLC) Key", category: "dlc", platform: "Steam", region: "GLOBAL", price: 16900, originalPrice: 22000, cashback: 1690, seller: "Instant-Codes", image: gamePlaceholder("PHANTOM LIBERTY", "SPY THRILLER DLC", "#991b1b", "#111827", "#fb7185", "DLC KEY") },
    { id: 9, name: "HELLDIVERS 2 Steam Key (PC)", category: "game", platform: "Steam", region: "GLOBAL", price: 24999, originalPrice: 30000, cashback: 2500, seller: "GGclub", image: gamePlaceholder("GALAXY DIVERS 2", "STEAM GLOBAL", "#334155", "#0f172a", "#fde047", "CO-OP KEY") },
    { id: 10, name: "Red Dead Redemption 2 Ultimate Key", category: "game", platform: "Rockstar", region: "LATAM", price: 18999, originalPrice: 45000, cashback: 1900, seller: "Instant-Codes", image: gamePlaceholder("OUTLAW WEST 2", "ULTIMATE EDITION", "#7f1d1d", "#1c1917", "#f97316", "ROCKSTAR") },
    { id: 11, name: "Black Myth: Wukong Steam Key", category: "game", platform: "Steam", region: "GLOBAL", price: 36999, originalPrice: 48000, cashback: 3700, seller: "ArgonOfficial", image: gamePlaceholder("MYTH WUKONG", "ACTION RPG", "#44403c", "#0c0a09", "#f59e0b", "STEAM KEY") },
    { id: 12, name: "God of War Ragnarök Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 33500, originalPrice: 44000, cashback: 3350, seller: "GGclub", image: gamePlaceholder("NORSE RAGNAROK", "PC STEAM KEY", "#1e3a8a", "#090d16", "#38bdf8", "LATAM KEY") },
    { id: 13, name: "Hogwarts Legacy Deluxe Edition", category: "game", platform: "Steam", region: "GLOBAL", price: 21000, originalPrice: 42000, cashback: 2100, seller: "ArgonOfficial", image: gamePlaceholder("WIZARD LEGACY", "DELUXE EDITION", "#3b0764", "#090d16", "#c084fc", "GLOBAL") },
    { id: 14, name: "Baldur's Gate 3 Digital Deluxe PC", category: "game", platform: "Steam", region: "GLOBAL", price: 34999, originalPrice: 49999, cashback: 3500, seller: "GGclub", image: gamePlaceholder("REALMS GATE 3", "DIGITAL DELUXE", "#451a03", "#1c1917", "#fb923c", "RPG KEY") },
    { id: 15, name: "Palworld Steam Key GLOBAL", category: "game", platform: "Steam", region: "GLOBAL", price: 11500, originalPrice: 15000, cashback: 1150, seller: "Instant-Codes", image: gamePlaceholder("PAL CREATURES", "SURVIVAL CRAFT", "#0369a1", "#0f172a", "#38bdf8", "STEAM") },
    { id: 16, name: "Call of Duty: Modern Warfare III", category: "game", platform: "Battle.net", region: "GLOBAL", price: 39999, originalPrice: 65000, cashback: 4000, seller: "ArgonOfficial", image: gamePlaceholder("MODERN COMBAT 3", "CROSS-GEN KEY", "#14532d", "#090d16", "#ef4444", "TACTICAL") },
    { id: 17, name: "Resident Evil 4 Remake Gold Edition", category: "game", platform: "Steam", region: "LATAM", price: 22999, originalPrice: 35000, cashback: 2300, seller: "GGclub", image: gamePlaceholder("SURVIVAL EVIL 4", "GOLD EDITION", "#450a0a", "#09090b", "#f87171", "HORROR") },
    { id: 18, name: "Warhammer 40,000: Space Marine 2", category: "game", platform: "Steam", region: "GLOBAL", price: 31999, originalPrice: 42000, cashback: 3200, seller: "Instant-Codes", image: gamePlaceholder("ULTRA MARINE 2", "WARHAMMER 40K", "#1e3a8a", "#090d16", "#60a5fa", "ACTION") },
    { id: 19, name: "Silent Hill 2 Remake Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 28900, originalPrice: 38000, cashback: 2890, seller: "ArgonOfficial", image: gamePlaceholder("FOGGY HILL 2", "REMAKE EDITION", "#3f3f46", "#09090b", "#a1a1aa", "HORROR") },
    { id: 20, name: "Ghost of Tsushima DIRECTOR'S CUT", category: "game", platform: "Steam", region: "GLOBAL", price: 32500, originalPrice: 45000, cashback: 3250, seller: "GGclub", image: gamePlaceholder("SAMURAI GHOST", "DIRECTOR'S CUT", "#7f1d1d", "#09090b", "#fca5a5", "STEAM PC") },
    { id: 21, name: "Forza Horizon 5 Premium Edition", category: "game", platform: "Steam / Xbox", region: "GLOBAL", price: 23500, originalPrice: 36000, cashback: 2350, seller: "Instant-Codes", image: gamePlaceholder("HORIZON FEST 5", "PREMIUM RACING", "#9d174d", "#1e1b4b", "#f472b6", "XBOX / PC") },
    { id: 22, name: "Marvel's Spider-Man Remastered PC", category: "game", platform: "Steam", region: "GLOBAL", price: 24500, originalPrice: 38000, cashback: 2450, seller: "ArgonOfficial", image: gamePlaceholder("WEB HERO PC", "REMASTERED KEY", "#991b1b", "#172554", "#60a5fa", "STEAM") },
    { id: 23, name: "Street Fighter 6 Steam Key", category: "game", platform: "Steam", region: "LATAM", price: 21999, originalPrice: 32000, cashback: 2200, seller: "GGclub", image: gamePlaceholder("ARCADE FIGHTER 6", "WORLD TOUR KEY", "#581c87", "#090d16", "#f97316", "FIGHTING") },
    { id: 24, name: "Tekken 8 Standard Edition Key", category: "game", platform: "Steam", region: "GLOBAL", price: 29500, originalPrice: 41000, cashback: 2950, seller: "Instant-Codes", image: gamePlaceholder("IRON FIST 8", "NEXT-GEN FIGHT", "#881337", "#09090b", "#fb7185", "STEAM") },

    // GIFT CARDS OFICIALES (25 a 36)
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

    // MONEDAS VIRTUALES (37 a 42)
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: cardImg("CS2 PRIME", "UPGRADE", "#b45309", "#1c1917", "#fbbf24", "VALVE STEAM") },
    { id: 38, name: "Apex Legends 2,150 Apex Coins", category: "currency", platform: "EA App", region: "GLOBAL", price: 21500, originalPrice: 25000, cashback: 2150, seller: "Instant-Codes", image: cardImg("APEX COINS", "2,150 COINS", "#991b1b", "#1c1917", "#f87171", "EA LEGENDS") },
    { id: 39, name: "Destiny 2: 2,300 Silver Pack", category: "currency", platform: "Steam", region: "GLOBAL", price: 19900, originalPrice: 24000, cashback: 1990, seller: "ArgonOfficial", image: cardImg("DESTINY 2", "2,300 SILVER", "#334155", "#090d16", "#cbd5e1", "STEAM SILVER") },
    { id: 40, name: "Roblox Digital Card 1,000 Robux", category: "currency", platform: "Roblox", region: "GLOBAL", price: 13200, originalPrice: 15500, cashback: 1320, seller: "GGclub", image: cardImg("ROBLOX", "1,000 ROBUX", "#991b1b", "#3b0707", "#f87171", "ROBLOX CORP") },
    { id: 41, name: "Fortnite 2,800 V-Bucks Code", category: "currency", platform: "Epic Games", region: "GLOBAL", price: 28900, originalPrice: 34000, cashback: 2890, seller: "Instant-Codes", image: cardImg("FORTNITE", "2,800 V-BUCKS", "#3730a3", "#1e1b4b", "#38bdf8", "EPIC GAMES") },
    { id: 42, name: "Valorant 2,475 Riot Points LATAM", category: "currency", platform: "Riot Games", region: "LATAM", price: 24500, originalPrice: 28500, cashback: 2450, seller: "ArgonOfficial", image: cardImg("VALORANT", "2,475 VP", "#be123c", "#4c0519", "#fb7185", "RIOT GAMES") },

    // SUSCRIPCIONES (43 a 48)
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: cardImg("GAME PASS", "1 MES ULTIMATE", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 44, name: "Xbox Game Pass Ultimate 3 Meses Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 32999, originalPrice: 45000, cashback: 3300, seller: "GGclub", image: cardImg("GAME PASS", "3 MESES", "#15803d", "#052e16", "#4ade80", "XBOX / PC") },
    { id: 45, name: "PlayStation Plus Deluxe 12 Meses", category: "subscription", platform: "PlayStation", region: "ARGENTINA", price: 68900, originalPrice: 89000, cashback: 6890, seller: "Instant-Codes", image: cardImg("PS PLUS", "12 MESES", "#ca8a04", "#422006", "#facc15", "DELUXE PLAN") },
    { id: 46, name: "Discord Nitro 1 Mes con 2 Boosts", category: "subscription", platform: "Discord", region: "GLOBAL", price: 8500, originalPrice: 11000, cashback: 850, seller: "GGclub", image: cardImg("DISCORD", "1 MES NITRO", "#4f46e5", "#1e1b4b", "#818cf8", "NITRO BOOST") },
    { id: 47, name: "Spotify Premium 3 Meses Individual", category: "subscription", platform: "Spotify", region: "ARGENTINA", price: 7900, originalPrice: 10500, cashback: 790, seller: "ArgonOfficial", image: cardImg("SPOTIFY", "3 MESES", "#16a34a", "#052e16", "#4ade80", "PREMIUM MUSIC") },
    { id: 48, name: "Netflix Gift Card $10.000 ARS", category: "subscription", platform: "Netflix", region: "ARGENTINA", price: 10100, originalPrice: 11500, cashback: 1010, seller: "Instant-Codes", image: cardImg("NETFLIX", "$10.000 ARS", "#b91c1c", "#3b0707", "#f87171", "STREAMING CARD") }
];

// ============================================================================
// 5. ESTADO GLOBAL Y ARRANQUE DE LA APLICACIÓN
// ============================================================================
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

// Preferencia de movimiento reducido del sistema
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    decorateViceCityHero();
    initGtaCountdown();
    renderTrendingCarousel(trendingGamesData);
    renderUpcomingReleases(upcomingGamesData);
    renderProducts(products);
    updateCartBadge();
    updateWishlistBadge();
    updateVaultBadge();
    updateWalletUI();
    updateAuthUI();
    initScrollReveal();

    // Cerrar autocompletado al hacer clic fuera
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

// ============================================================================
// 6. DECORACIÓN SVG VICE CITY (PALMERAS PROPIAS Y PARTÍCULAS NEÓN)
// ============================================================================
function decorateViceCityHero() {
    const hero = document.getElementById('gtaHeroSection');
    if (!hero) return;

    // Eliminar cualquier URL externa en el placeholder derecho del Hero para respetar copyright
    const rightCardBg = hero.querySelector('[style*="background-image"]');
    if (rightCardBg) {
        rightCardBg.style.backgroundImage = `url("${gamePlaceholder('VICE CITY VI', '19 NOV 2026', '#831843', '#1e1b4b', '#f472b6', 'CONSOLAS')}")`;
    }

    // Inyectar silueta de palmeras en SVG propio y partículas suaves
    const palmSvgWrapper = document.createElement('div');
    palmSvgWrapper.className = 'absolute inset-0 pointer-events-none overflow-hidden z-0';
    palmSvgWrapper.setAttribute('aria-hidden', 'true');
    palmSvgWrapper.innerHTML = `
        <svg class="absolute bottom-0 right-2 sm:right-8 w-48 sm:w-72 h-48 sm:h-72 opacity-30 text-[#090214]" viewBox="0 0 200 200" fill="currentColor">
            <!-- Tronco curvo palmera 1 -->
            <path d="M135 200 Q125 140 95 85 L103 82 Q138 140 148 200 Z"/>
            <!-- Hojas palmera 1 -->
            <path d="M98 84 Q60 65 30 90 Q65 82 98 88 Z"/>
            <path d="M98 84 Q55 45 25 55 Q65 62 98 86 Z"/>
            <path d="M98 84 Q85 35 65 20 Q88 50 100 84 Z"/>
            <path d="M98 84 Q125 35 155 30 Q125 55 101 85 Z"/>
            <path d="M98 84 Q145 55 180 75 Q140 70 101 87 Z"/>
            <path d="M98 84 Q135 80 165 110 Q130 92 99 88 Z"/>
            <!-- Palmera secundaria más baja -->
            <path d="M168 200 Q162 160 145 125 L151 123 Q170 160 177 200 Z"/>
            <path d="M148 124 Q120 110 102 128 Q126 122 148 126 Z"/>
            <path d="M148 124 Q138 95 122 85 Q140 104 150 124 Z"/>
            <path d="M148 124 Q172 98 194 105 Q170 112 150 126 Z"/>
        </svg>
        <span class="vice-particle w-2 h-2 bg-pink-400 top-8 left-12"></span>
        <span class="vice-particle w-3 h-3 bg-amber-300 top-1/3 left-1/2" style="animation-delay: -2s;"></span>
        <span class="vice-particle w-2 h-2 bg-cyan-400 bottom-12 left-1/4" style="animation-delay: -3.5s;"></span>
    `;
    hero.prepend(palmSvgWrapper);

    // Actualizar textos de los botones CTA del Hero según lo pedido
    const ctas = hero.querySelectorAll('button[onclick^="quickFilterPlatform"]');
    if (ctas[0]) ctas[0].innerHTML = `<i class="fa-brands fa-playstation text-base"></i> Cargá saldo para el lanzamiento (PSN)`;
    if (ctas[1]) ctas[1].innerHTML = `<i class="fa-brands fa-xbox text-base"></i> Cargá saldo para el lanzamiento (Xbox)`;
}

// ============================================================================
// 7. CUENTA REGRESIVA GTA VI (PRECISA EN SEGUNDO PLANO, FLIP Y CONFETI)
// ============================================================================
let prevDigits = { d: '', h: '', m: '', s: '' };
let confettiLaunched = false;
let gtaTimerId = null;

function initGtaCountdown() {
    const targetTime = new Date(GTA6_RELEASE_DATE).getTime();

    function updateDigitWithFlip(elId, newVal, key) {
        const el = document.getElementById(elId);
        if (!el) return;
        if (prevDigits[key] !== newVal) {
            el.innerText = newVal;
            if (!prefersReducedMotion && prevDigits[key] !== '') {
                el.classList.remove('cd-digit-flip');
                void el.offsetWidth; // Forzar reflow ligero solo en el número que cambió
                el.classList.add('cd-digit-flip');
            }
            prevDigits[key] = newVal;
        }
    }

    function tick() {
        const now = Date.now();
        const diff = targetTime - now;
        const bannerText = document.getElementById('topBannerText');
        const container = document.getElementById('countdownContainer');

        // Estado Cero: ¡Ya disponible! + Confeti automático sin recargar
        if (diff <= 0) {
            if (bannerText) {
                bannerText.innerText = "¡GTA VI YA ESTÁ DISPONIBLE! Cargá tu Gift Card al instante";
            }
            if (container && !confettiLaunched) {
                confettiLaunched = true;
                container.innerHTML = `
                    <div class="col-span-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-black text-center py-4 px-5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.6)] text-base sm:text-xl tracking-wide uppercase">
                        <i class="fa-solid fa-champagne-glasses mr-2"></i> ¡Ya disponible! Jugalo hoy mismo
                    </div>
                `;
                launchViceConfetti();
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (bannerText) {
            bannerText.innerText = `GTA VI sale en ${days} días — ¡Cargá saldo para el lanzamiento!`;
        }

        updateDigitWithFlip('cdDays', String(days).padStart(2, '0'), 'd');
        updateDigitWithFlip('cdHours', String(hours).padStart(2, '0'), 'h');
        updateDigitWithFlip('cdMins', String(mins).padStart(2, '0'), 'm');
        updateDigitWithFlip('cdSecs', String(secs).padStart(2, '0'), 's');
    }

    tick();
    gtaTimerId = setInterval(tick, 1000);

    // Sincronizar al instante si la pestaña vuelve de segundo plano
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) tick();
    });
}

function launchViceConfetti() {
    if (prefersReducedMotion) return;
    const hero = document.getElementById('gtaHeroSection');
    if (!hero) return;
    const colors = ['#ec4899', '#f59e0b', '#10b981', '#38bdf8', '#c084fc'];

    for (let i = 0; i < 36; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 96}%`;
        piece.style.top = `${Math.random() * 20}%`;
        piece.style.backgroundColor = colors[i % colors.length];
        piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 160}px`);
        piece.style.setProperty('--rot', `${360 + Math.random() * 720}deg`);
        piece.style.animationDelay = `${Math.random() * 0.4}s`;
        hero.appendChild(piece);
        setTimeout(() => piece.remove(), 3200);
    }
}

// ============================================================================
// 8. JUEGOS EN TENDENCIA (TOP 10, INCLINACIÓN 3D Y PRÓXIMOS LANZAMIENTOS)
// ============================================================================
function renderTrendingCarousel(list) {
    const container = document.getElementById('trendingCarousel');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = `<p class="text-xs text-purple-300 py-6">No hay juegos en tendencia para esta plataforma.</p>`;
        return;
    }

    list.forEach(game => {
        const card = document.createElement('article');
        card.className = 'trend-card shrink-0 w-48 sm:w-56 bg-[#1b0e3f] border border-purple-800/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl tilt-card cursor-pointer group select-none';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Top ${game.rank}: ${game.title} en ${game.platform}. Ir a ${game.giftCardName}`);

        card.onclick = () => {
            showToast(`Vinculado a ${game.giftCardName}`, 'fa-gamepad');
            addToCart(game.linkId);
        };

        let badgeClass = 'bg-pink-600 text-white';
        if (game.badge === 'Nuevo') badgeClass = 'bg-emerald-500 text-slate-950';
        if (game.badge === 'Preventa') badgeClass = 'bg-amber-400 text-slate-950';
        if (game.badge === 'Oferta') badgeClass = 'bg-purple-600 text-white';

        let trendArrow = '<span class="text-emerald-400 font-black" title="Subiendo en el ranking"><i class="fa-solid fa-arrow-trend-up"></i> +2</span>';
        if (game.change === 'down') trendArrow = '<span class="text-rose-400 font-black" title="Bajando en el ranking"><i class="fa-solid fa-arrow-trend-down"></i> -1</span>';
        if (game.change === 'same') trendArrow = '<span class="text-purple-300 font-bold" title="Estable"><i class="fa-solid fa-minus"></i> =</span>';

        card.innerHTML = `
            <div class="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 skeleton-box">
                <img src="${game.image}" alt="${game.title}" width="224" height="336" loading="lazy" decoding="async"
                     onload="this.parentElement.classList.add('skeleton-loaded')"
                     class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                <span class="absolute top-2 left-2 ${badgeClass} font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wide shadow">${game.badge}</span>
                <div class="absolute bottom-1.5 left-2 right-2 flex items-end justify-between pointer-events-none">
                    <span class="rank-number-badge text-4xl sm:text-5xl">#${game.rank}</span>
                    <span class="bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] border border-white/10">${trendArrow}</span>
                </div>
            </div>
            <div class="space-y-1.5">
                <div class="flex justify-between items-center text-[10px] text-purple-300 font-extrabold uppercase">
                    <span><i class="fa-solid fa-layer-group text-pink-400 mr-1"></i>${game.platform}</span>
                    <span class="text-emerald-400">Top 10</span>
                </div>
                <h4 class="font-black text-xs sm:text-sm text-white truncate group-hover:text-pink-300 transition">${game.title}</h4>
                <p class="text-[10px] text-purple-300 truncate">Usa: <strong class="text-white">${game.giftCardName}</strong></p>
                <button type="button" class="w-full mt-1.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white py-2 rounded-xl text-[11px] font-black transition shadow flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-bolt text-amber-300"></i> Cargar Gift Card
                </button>
            </div>
        `;

        // Interacción 3D al pasar el mouse o tocar en móvil (respetando prefers-reduced-motion)
        if (!prefersReducedMotion) {
            const applyTilt = (clientX, clientY) => {
                const rect = card.getBoundingClientRect();
                const x = clientX - rect.left - rect.width / 2;
                const y = clientY - rect.top - rect.height / 2;
                card.style.transform = `perspective(900px) rotateX(${(-y / 12).toFixed(2)}deg) rotateY(${(x / 12).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            };
            const resetTilt = () => {
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            };

            card.addEventListener('mousemove', (e) => applyTilt(e.clientX, e.clientY));
            card.addEventListener('mouseleave', resetTilt);
            card.addEventListener('touchmove', (e) => {
                if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });
            card.addEventListener('touchend', resetTilt, { passive: true });
        }

        container.appendChild(card);
    });
}

function filterTrending(platform, btn) {
    document.querySelectorAll('.trend-filter-btn').forEach(b => b.classList.remove('active-filter'));
    if (btn) btn.classList.add('active-filter');

    if (platform === 'all') {
        renderTrendingCarousel(trendingGamesData);
    } else {
        const filtered = trendingGamesData.filter(g => g.platform.toLowerCase().includes(platform.toLowerCase()));
        renderTrendingCarousel(filtered);
    }
}

function renderUpcomingReleases(list) {
    const grid = document.getElementById('upcomingReleasesGrid');
    if (!grid) return;

    function updateUpcomingCards() {
        const now = Date.now();
        grid.innerHTML = '';

        list.forEach(up => {
            const diff = new Date(up.releaseISO).getTime() - now;
            const daysLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
            const hrsLeft = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

            const item = document.createElement('div');
            item.className = 'bg-[#120521] border border-purple-800/60 hover:border-pink-500/60 p-3 rounded-xl flex items-center justify-between gap-3 transition cursor-pointer';
            item.onclick = () => addToCart(up.linkId);
            item.innerHTML = `
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-12 h-16 rounded-lg overflow-hidden shrink-0 skeleton-box">
                        <img src="${up.image}" alt="${up.title}" width="48" height="64" loading="lazy" decoding="async"
                             onload="this.parentElement.classList.add('skeleton-loaded')"
                             class="w-full h-full object-cover">
                    </div>
                    <div class="min-w-0">
                        <h5 class="font-bold text-xs text-white truncate">${up.title}</h5>
                        <span class="text-[10px] text-purple-300 block">${up.platform}</span>
                        <span class="inline-block mt-1 bg-pink-950/90 border border-pink-500/40 text-pink-300 font-mono text-[10px] font-black px-2 py-0.5 rounded">
                            ${diff > 0 ? `Faltan ${daysLeft}d ${hrsLeft}h` : '¡Ya disponible!'}
                        </span>
                    </div>
                </div>
                <button type="button" class="bg-purple-800/80 hover:bg-pink-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shrink-0 transition">
                    Saldo
                </button>
            `;
            grid.appendChild(item);
        });
    }

    updateUpcomingCards();
    setInterval(updateUpcomingCards, 60000);
}

// ============================================================================
// 9. SCROLL REVEAL CON INTERSECTION OBSERVER
// ============================================================================
function initScrollReveal() {
    const sections = document.querySelectorAll('#gtaHeroSection, #trendingCarousel, #upcomingReleasesGrid, #productGrid');
    sections.forEach(sec => sec.classList.add('reveal-on-scroll'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        sections.forEach(sec => sec.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(sec => observer.observe(sec));
}

// ============================================================================
// 10. FORMATEADOR DE MONEDA, TOASTS Y CARTERA ARGON
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
    filterProducts();
    renderCartItems();
    updateWalletUI();
    showToast(`Moneda cambiada a ${newCurr}`, 'fa-coins');
}

function showToast(message, iconClass = 'fa-circle-check') {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'bg-[#1f0f47]/95 backdrop-blur-md border border-pink-500/60 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all duration-300 pointer-events-auto';
    toast.innerHTML = `<i class="fa-solid ${iconClass} text-emerald-400 text-sm shrink-0"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const formatted = formatARS(walletBalance);
    ['walletBalance', 'walletModalBalance', 'checkoutWalletAvailable'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = formatted;
    });
}

function openWalletModal() {
    updateWalletUI();
    document.getElementById('walletModal').classList.remove('hidden');
}

function closeWalletModal() {
    document.getElementById('walletModal').classList.add('hidden');
}

// ============================================================================
// 11. CATÁLOGO GENERAL, BUSCADOR Y VISTA DETALLADA
// ============================================================================
function quickFilterPlatform(platformKeyword) {
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = platformKeyword;
    activeCategory = 'giftcard';
    filterProducts();
    const grid = document.getElementById('productGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        const isFav = wishlist.includes(p.id);
        const fallbackImg = cardImg(p.platform.toUpperCase(), p.region, "#3b188f", "#190d3a", "#f5a623", "DIGITAL KEY");

        const card = document.createElement('article');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-pink-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container cursor-pointer skeleton-box">
                    <img onclick="openProductDetail(${p.id})" src="${p.image}" alt="${p.name}" width="300" height="450" loading="lazy" decoding="async"
                         onload="this.parentElement.classList.add('skeleton-loaded')"
                         onerror="this.onerror=null;this.src='${fallbackImg}';this.parentElement.classList.add('skeleton-loaded');">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded shadow">-${discount}%</span>
                    <button type="button" aria-label="Guardar en favoritos" onclick="toggleWishlist(${p.id})" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-pink-400 flex items-center justify-center text-xs transition">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-2.5 sm:p-3.5 space-y-1">
                    <h3 onclick="openProductDetail(${p.id})" class="cursor-pointer font-bold text-[11px] sm:text-xs text-white line-clamp-2 leading-snug group-hover:text-pink-300 transition">${p.name}</h3>
                    <span class="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-2.5 sm:p-3.5 pt-0 space-y-2">
                <div>
                    <span class="block text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                    <span class="text-sm sm:text-base font-black text-white block leading-tight">${formatARS(p.price)}</span>
                    <span class="block text-[9px] sm:text-[10px] text-emerald-400 font-bold truncate">Cashback: ${formatARS(p.cashback)}</span>
                </div>
                <button type="button" onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-pink-600 text-white font-bold py-2 rounded-lg text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition shadow">
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
    if (btnElement) btnElement.classList.add('active-cat');
    filterProducts();
}

function filterProducts() {
    const searchEl = document.getElementById('searchInput');
    const sortEl = document.getElementById('sortSelect');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';
    const sort = sortEl ? sortEl.value : 'featured';

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

function handleSearchInput() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchAutocomplete');
    if (!input || !dropdown) return;

    const q = input.value.trim().toLowerCase();
    if (q.length > 0) {
        if (clearBtn) clearBtn.classList.remove('hidden');
    } else {
        if (clearBtn) clearBtn.classList.add('hidden');
        dropdown.classList.add('hidden');
        filterProducts();
        return;
    }

    filterProducts();

    const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q)).slice(0, 6);
    dropdown.innerHTML = '';

    if (matches.length === 0) {
        dropdown.innerHTML = `<div class="p-4 text-xs text-purple-300 text-center">Sin resultados para "${input.value}"</div>`;
    } else {
        matches.forEach(p => {
            const row = document.createElement('div');
            row.className = 'p-2.5 hover:bg-[#2a175e] flex items-center justify-between gap-3 cursor-pointer transition';
            row.innerHTML = `
                <div onclick="openProductDetail(${p.id})" class="flex items-center gap-3 flex-1 min-w-0">
                    <img src="${p.image}" alt="${p.name}" width="40" height="48" class="w-10 h-12 object-cover rounded shrink-0" loading="lazy">
                    <div class="min-w-0">
                        <h5 class="text-xs font-bold text-white truncate">${p.name}</h5>
                        <span class="text-[10px] text-emerald-400 font-bold">${p.platform} • ${p.region}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs font-black text-white">${formatARS(p.price)}</span>
                    <button type="button" onclick="addToCart(${p.id})" class="bg-purple-600 hover:bg-pink-500 text-white px-2.5 py-1.5 rounded-lg text-xs">
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
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchAutocomplete');
    if (input) input.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (dropdown) dropdown.classList.add('hidden');
    activeCategory = 'all';
    filterProducts();
}

function openProductDetail(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    const dropdown = document.getElementById('searchAutocomplete');
    if (dropdown) dropdown.classList.add('hidden');

    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <button type="button" onclick="closeProductDetail()" class="absolute top-4 right-4 text-purple-300 hover:text-white text-xl z-20">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-4 max-w-[220px] mx-auto w-full">
                <div class="game-cover-container rounded-xl overflow-hidden border border-purple-600 shadow-2xl">
                    <img src="${p.image}" alt="${p.name}" width="300" height="450">
                </div>
            </div>
            <div class="md:col-span-8 space-y-4">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="bg-rose-600 text-white text-xs font-black px-2.5 py-0.5 rounded">-${discount}% OFF</span>
                    <span class="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded">Entrega Inmediata</span>
                    <span class="bg-purple-900/80 text-purple-200 text-xs font-bold px-2.5 py-0.5 rounded">${p.platform} • ${p.region}</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-black text-white">${p.name}</h2>
                <div class="bg-[#140930] border border-purple-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span class="text-xs text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                        <div class="text-2xl sm:text-3xl font-black text-white">${formatARS(p.price)}</div>
                        <span class="text-xs text-emerald-400 font-bold">+${formatARS(p.cashback)} de Cashback Argon</span>
                    </div>
                    <button type="button" onclick="closeProductDetail(); addToCart(${p.id});" class="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg">
                        <i class="fa-solid fa-cart-plus mr-1.5"></i> Comprar Clave Ahora
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.add('hidden');
}

// ============================================================================
// 12. FAVORITOS (WISHLIST), BÓVEDA "MIS KEYS" Y MYSTERY PACKS
// ============================================================================
function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast('Quitado de tu Lista de Deseos', 'fa-heart-crack');
    } else {
        wishlist.push(id);
        showToast('Agregado a tu Lista de Deseos', 'fa-heart');
    }
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
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = `<p class="text-center text-purple-300 py-6 text-xs">Tu Lista de Deseos está vacía.</p>`;
    } else {
        wishlist.forEach(id => {
            const p = products.find(x => x.id === id);
            if (!p) return;
            container.innerHTML += `
                <div class="bg-[#2a175e] p-2.5 rounded-xl flex items-center justify-between gap-2">
                    <span class="font-bold text-white truncate">${p.name}</span>
                    <div class="flex items-center gap-2 shrink-0">
                        <span class="text-emerald-400 font-black">${formatARS(p.price)}</span>
                        <button type="button" onclick="closeWishlistModal(); addToCart(${p.id});" class="bg-pink-600 text-white px-2.5 py-1 rounded-lg font-bold">Comprar</button>
                    </div>
                </div>
            `;
        });
    }
    modal.classList.remove('hidden');
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    if (modal) modal.classList.add('hidden');
}

function updateVaultBadge() {
    const badge = document.getElementById('vaultCountBadge');
    if (badge) badge.innerText = myVaultKeys.length;
}

function openVaultModal() {
    const modal = document.getElementById('vaultModal');
    const list = document.getElementById('vaultKeysList');
    if (!modal || !list) return;
    list.innerHTML = '';

    if (myVaultKeys.length === 0) {
        list.innerHTML = `<p class="text-purple-300 text-center py-6">Aún no tienes claves guardadas en tu bóveda.</p>`;
    } else {
        myVaultKeys.slice().reverse().forEach(k => {
            list.innerHTML += `
                <div class="bg-[#2a175e] border border-purple-700 p-3 rounded-xl flex justify-between items-center gap-2">
                    <div class="min-w-0">
                        <strong class="text-white block truncate">${k.name}</strong>
                        <span class="text-[10px] text-purple-300">${k.date}</span>
                    </div>
                    <code class="bg-[#140930] px-2.5 py-1 rounded text-emerald-400 font-mono font-bold shrink-0">${k.key}</code>
                </div>
            `;
        });
    }
    modal.classList.remove('hidden');
}

function closeVaultModal() {
    const modal = document.getElementById('vaultModal');
    if (modal) modal.classList.add('hidden');
}

function openPacksModal() {
    const modal = document.getElementById('packsModal');
    if (modal) modal.classList.remove('hidden');
}

function closePacksModal() {
    const modal = document.getElementById('packsModal');
    if (modal) modal.classList.add('hidden');
}

// ============================================================================
// 13. CARRITO, CHECKOUT ENEBA Y PASARELA DE PAGO
// ============================================================================
function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.toggle('hidden');
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
    showToast(`${prod.name.substring(0, 22)}… añadido al carro`, 'fa-cart-plus');
    const drawer = document.getElementById('cartDrawer');
    if (drawer && drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
    }
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
        const totEl = document.getElementById('cartTotal');
        if (totEl) totEl.innerText = formatARS(0);
        return;
    }

    let subtotal = 0;
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between bg-[#2a175e] p-2.5 rounded-xl border border-purple-700/50 gap-2 text-xs';
        row.innerHTML = `
            <div class="min-w-0 flex-1">
                <h4 class="font-bold text-white truncate">${item.name}</h4>
                <span class="text-emerald-400 font-black">${formatARS(item.price)}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <button type="button" onclick="changeQty(${idx}, -1)" class="w-6 h-6 bg-purple-900 rounded font-bold">-</button>
                <span class="font-bold">${item.qty}</span>
                <button type="button" onclick="changeQty(${idx}, 1)" class="w-6 h-6 bg-purple-900 rounded font-bold">+</button>
            </div>
        `;
        list.appendChild(row);
    });

    const discount = subtotal * appliedDiscount;
    const total = subtotal - discount;
    const totEl = document.getElementById('cartTotal');
    if (totEl) totEl.innerText = formatARS(total);
}

function changeQty(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartBadge();
    renderCartItems();
    renderEnebaSummary();
}

function switchView(view) {
    ['viewStore', 'viewCheckoutEneba', 'viewCheckoutPagoNube', 'viewSuccess'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const mainHeader = document.getElementById('mainHeader');
    const checkoutHeader = document.getElementById('checkoutHeader');

    if (view === 'store') {
        if (mainHeader) mainHeader.classList.remove('hidden');
        if (checkoutHeader) checkoutHeader.classList.add('hidden');
        document.getElementById('viewStore').classList.remove('hidden');
    } else {
        if (mainHeader) mainHeader.classList.add('hidden');
        if (checkoutHeader) checkoutHeader.classList.remove('hidden');
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

    cart.forEach((item) => {
        subtotal += item.price * item.qty;
        container.innerHTML += `
            <div class="flex justify-between items-center text-xs py-2">
                <span class="text-white font-semibold truncate max-w-[200px]">${item.name} (x${item.qty})</span>
                <span class="font-black text-emerald-400">${formatARS(item.price * item.qty)}</span>
            </div>
        `;
    });

    const subEl = document.getElementById('summarySubtotal');
    const totEl = document.getElementById('summaryTotal');
    if (subEl) subEl.innerText = formatARS(subtotal);
    if (totEl) totEl.innerText = formatARS(subtotal * (1 - appliedDiscount));
}

function goToPagoNubeGateway() {
    switchView('checkoutPagoNube');
}

function backToEnebaSelection() {
    switchView('checkoutEneba');
}

function processSandboxPayment(e) {
    e.preventDefault();
    const totalCashback = cart.reduce((acc, item) => acc + (item.cashback * item.qty), 0);
    walletBalance += totalCashback;
    updateWalletUI();

    const keysContainer = document.getElementById('keysContainer');
    if (keysContainer) keysContainer.innerHTML = '';

    cart.forEach(item => {
        for (let i = 0; i < item.qty; i++) {
            const key = 'ARGON-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
            myVaultKeys.push({
                name: item.name,
                image: item.image,
                key: key,
                date: new Date().toLocaleString('es-AR')
            });
            if (keysContainer) {
                keysContainer.innerHTML += `
                    <div class="bg-[#261259] border border-purple-700/60 p-3.5 rounded-xl flex justify-between items-center gap-3 text-xs">
                        <span class="font-bold text-white truncate">${item.name}</span>
                        <code class="bg-[#160a36] px-3 py-1.5 rounded text-emerald-400 font-mono font-bold">${key}</code>
                    </div>
                `;
            }
        }
    });

    localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
    updateVaultBadge();
    cart = [];
    updateCartBadge();
    switchView('success');
}

// ============================================================================
// 14. AUTENTICACIÓN Y PANEL ADMIN (/#admin)
// ============================================================================
function openAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmailInput').value.trim();
    currentUser = { name: email.split('@')[0], email };
    localStorage.setItem('ohmy_active_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
    showToast(`¡Bienvenido, ${currentUser.name}!`, 'fa-user-check');
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
            <div class="flex items-center gap-2 bg-[#261556] border border-purple-700/70 px-2.5 py-1 rounded-lg text-xs">
                <span class="font-bold text-emerald-400 truncate max-w-[90px]">${currentUser.name}</span>
                <button type="button" onclick="logoutUser()" class="text-purple-300 hover:text-rose-400"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
        `;
    }
}

function checkAdminHash() {
    if (window.location.hash === '#admin') openAdminModal();
}

function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
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
    } else {
        document.getElementById('adminErrorMsg').classList.remove('hidden');
    }
}
