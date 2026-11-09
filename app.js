// CONSTANTE DE LANZAMIENTO GTA VI (Fácil de modificar)
const GTA6_RELEASE_DATE = '2026-11-19T00:00:00';

const sImg = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

function cardImg(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgTop}"/><stop offset="100%" stop-color="${bgBottom}"/></linearGradient></defs><rect width="600" height="900" fill="url(#bgGrad)"/><text x="70" y="92" font-family="system-ui" font-size="25" font-weight="800" fill="#ffffff">${platformLabel}</text><text x="300" y="535" font-family="system-ui" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle">${brandTitle}</text><text x="300" y="634" font-family="system-ui" font-size="33" font-weight="800" fill="${accentHex}" text-anchor="middle">${denomination}</text></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Datos de ejemplo para el carrusel de tendencias (Mock de API)
/*
   EXPLICACIÓN DE CONEXIÓN A API REAL (RAWG o Steam):
   Para conectar esto a RAWG.io o Steam Web API, necesitas registrarte y obtener una API Key gratuita.
   - RAWG API endpoint: `https://api.rawg.io/api/games?key=TU_API_KEY&dates=2026-01-01,2026-12-31&ordering=-added`
   - Steam Web API requiere un backend Node.js/Python si hay restricciones CORS estrictas con las claves de usuario, 
     pero para catálogos públicos puedes usar fetch directo a RAWG desde el navegador con JS asíncrono (async/await).
*/
const trendingGamesData = [
    { id: 101, title: "Grand Theft Auto VI", platform: "PS5", badge: "Preventa", rank: 1, change: "up", image: sImg(271590), linkId: 28 },
    { id: 102, title: "EA SPORTS FC 26", platform: "Xbox", badge: "Nuevo", rank: 2, change: "up", image: sImg(2669320), linkId: 31 },
    { id: 103, title: "Monster Hunter Wilds", platform: "Steam", badge: "En tendencia", rank: 3, change: "same", image: sImg(1245620), linkId: 25 },
    { id: 104, title: "Death Stranding 2", platform: "PS5", badge: "Preventa", rank: 4, change: "down", image: sImg(2215430), linkId: 28 },
    { id: 105, title: "Metroid Prime 4", platform: "Switch", badge: "Nuevo", rank: 5, change: "up", image: sImg(990080), linkId: 33 },
    { id: 106, title: "Cyberpunk 2: Project Orion", platform: "Steam", badge: "Oferta", rank: 6, change: "up", image: sImg(1091500), linkId: 25 }
];

const upcomingGamesData = [
    { title: "Grand Theft Auto VI", date: "19 Nov 2026", platform: "PS5 / Xbox Series X", image: sImg(271590) },
    { title: "Fable IV", date: "10 Dic 2026", platform: "Xbox / PC", image: sImg(1174180) },
    { title: "Wolverine Marvel", date: "15 Ene 2027", platform: "PS5 Exclusive", image: sImg(2322010) }
];

const defaultProducts = [
    { id: 1, name: "Minecraft: Java & Bedrock Edition (PC) Windows Store Key GLOBAL", category: "game", platform: "Windows Store", region: "GLOBAL", price: 17600, originalPrice: 24000, cashback: 1940, seller: "GGclub", image: sImg(1672970) },
    { id: 2, name: "Crimson Desert Enhanced: Charting the Unknown (DLC) Steam Key LATAM", category: "dlc", platform: "Steam", region: "LATAM", price: 17020, originalPrice: 22000, cashback: 2210, seller: "Instant-Codes", image: sImg(582660) },
    { id: 3, name: "EA SPORTS FC 25 Standard Edition Key", category: "game", platform: "EA App", region: "ARGENTINA", price: 34999, originalPrice: 59999, cashback: 3500, seller: "ArgonOfficial", image: sImg(2669320) },
    { id: 4, name: "Grand Theft Auto V: Premium Online Edition", category: "game", platform: "Rockstar", region: "GLOBAL", price: 12500, originalPrice: 25000, cashback: 1250, seller: "GGclub", image: sImg(271590) },
    { id: 5, name: "Elden Ring Steam Key (PC)", category: "game", platform: "Steam", region: "LATAM", price: 29999, originalPrice: 39999, cashback: 3000, seller: "Instant-Codes", image: sImg(1245620) },
    { id: 7, name: "Cyberpunk 2077 Ultimate Edition Key", category: "game", platform: "GOG / Steam", region: "GLOBAL", price: 27500, originalPrice: 45000, cashback: 2750, seller: "ArgonOfficial", image: sImg(1091500) },
    { id: 10, name: "Red Dead Redemption 2 Ultimate Key", category: "game", platform: "Rockstar", region: "LATAM", price: 18999, originalPrice: 45000, cashback: 1900, seller: "Instant-Codes", image: sImg(1174180) },
    { id: 11, name: "Black Myth: Wukong Steam Key", category: "game", platform: "Steam", region: "GLOBAL", price: 36999, originalPrice: 48000, cashback: 3700, seller: "ArgonOfficial", image: sImg(2358720) },
    { id: 25, name: "Steam Wallet Gift Card $10 USD (Argentina)", category: "giftcard", platform: "Steam", region: "ARGENTINA", price: 11800, originalPrice: 13500, cashback: 1180, seller: "GGclub", image: cardImg("STEAM", "$10 USD", "#1b2838", "#0b1219", "#66c0f4", "VALVE STEAM") },
    { id: 28, name: "PlayStation Store PSN Card $10 USD", category: "giftcard", platform: "PlayStation", region: "USA", price: 12200, originalPrice: 14000, cashback: 1220, seller: "GGclub", image: cardImg("PSN STORE", "$10 USD", "#00439c", "#001b47", "#38bdf8", "PLAYSTATION") },
    { id: 31, name: "Xbox Live Gift Card $10.000 ARS", category: "giftcard", platform: "Xbox", region: "ARGENTINA", price: 9600, originalPrice: 11000, cashback: 960, seller: "GGclub", image: cardImg("XBOX LIVE", "$10.000 ARS", "#107c10", "#062e06", "#4ade80", "MICROSOFT XBOX") },
    { id: 33, name: "Nintendo eShop Card $20 USD", category: "giftcard", platform: "Nintendo", region: "USA", price: 23400, originalPrice: 26000, cashback: 2340, seller: "ArgonOfficial", image: cardImg("NINTENDO", "$20 USD", "#e60012", "#6b0008", "#fca5a5", "ESHOP SWITCH") }
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
    renderUpcomingReleases(upcomingGamesData);
    renderProducts(products);
    updateCartBadge();
    updateWishlistBadge();
    updateVaultBadge();
    updateWalletUI();
    updateAuthUI();

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
});

function checkAdminHash() {
    if (window.location.hash === '#admin') openAdminModal();
}

function formatARS(amount) {
    return '$' + Number(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ARS';
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const formatted = formatARS(walletBalance);
    ['walletBalance', 'walletModalBalance', 'checkoutWalletAvailable'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = formatted;
    });
}

// 1) LÓGICA DE CUENTA REGRESIVA GTA VI CON HORA LOCAL Y ESTADO CERO
function initGtaCountdown() {
    const targetDate = new Date(GTA6_RELEASE_DATE).getTime();

    function updateTimer() {
        const now = Date.now();
        const diff = targetDate - now;
        const bannerText = document.getElementById('topBannerText');

        if (diff <= 0) {
            if (bannerText) bannerText.innerText = "¡GTA VI YA ESTÁ DISPONIBLE EN CONSOLAS!";
            const daysEl = document.getElementById('cdDays');
            if (daysEl) {
                document.getElementById('countdownContainer').innerHTML = `
                    <div class="col-span-4 bg-emerald-600/90 text-white font-black text-center py-4 rounded-2xl shadow-lg text-lg animate-bounce">
                        ¡YA DISPONIBLE! ¡RECLAMÁ TU GIFT CARD YA!
                    </div>`;
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (bannerText) bannerText.innerText = `GTA VI sale en ${days} días y ${hours} hrs — ¡Cargá saldo con 10% OFF!`;

        const dEl = document.getElementById('cdDays');
        const hEl = document.getElementById('cdHours');
        const mEl = document.getElementById('cdMins');
        const sEl = document.getElementById('cdSecs');

        if (dEl) dEl.innerText = String(days).padStart(2, '0');
        if (hEl) hEl.innerText = String(hours).padStart(2, '0');
        if (mEl) mEl.innerText = String(mins).padStart(2, '0');
        if (sEl) sEl.innerText = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 2) TENDENCIAS Y CARRUSEL 3D TILT
function renderTrendingCarousel(list) {
    const container = document.getElementById('trendingCarousel');
    if (!container) return;
    container.innerHTML = '';

    list.forEach(game => {
        const card = document.createElement('div');
        card.className = 'trend-card shrink-0 w-44 sm:w-52 bg-[#1b0e3f] border border-purple-800/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl tilt-card cursor-pointer group';
        card.onclick = () => {
            // Enlaza a la gift card correspondiente
            addToCart(game.linkId);
        };

        let badgeColor = 'bg-pink-600';
        if (game.badge === 'Nuevo') badgeColor = 'bg-emerald-600';
        if (game.badge === 'Preventa') badgeColor = 'bg-amber-600';
        if (game.badge === 'Oferta') badgeColor = 'bg-purple-600';

        let changeIcon = '<i class="fa-solid fa-arrow-up text-emerald-400"></i>';
        if (changeIcon && game.change === 'down') changeIcon = '<i class="fa-solid fa-arrow-down text-rose-400"></i>';
        if (game.change === 'same') changeIcon = '<i class="fa-solid fa-minus text-purple-300"></i>';

        card.innerHTML = `
            <div class="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
                <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" decoding="async" width="200" height="266">
                <span class="absolute top-2 left-2 ${badgeColor} text-white font-black text-[9px] px-2 py-0.5 rounded shadow">${game.badge}</span>
                <span class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white font-mono text-xs px-2 py-1 rounded-lg font-black">#${game.rank}</span>
            </div>
            <div class="space-y-1">
                <div class="flex justify-between items-center text-[10px] text-purple-300 font-bold uppercase">
                    <span>${game.platform}</span>
                    <span>${changeIcon}</span>
                </div>
                <h4 class="font-bold text-xs text-white truncate group-hover:text-pink-300 transition">${game.title}</h4>
                <button class="w-full mt-2 bg-purple-700/80 hover:bg-pink-600 text-white py-1.5 rounded-lg text-[11px] font-bold transition">
                    Ver Gift Card
                </button>
            </div>
        `;

        // Efecto 3D Tilt al mover el mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });

        container.appendChild(card);
    });
}

function filterTrending(platform, btn) {
    document.querySelectorAll('.trend-filter-btn').forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');
    if (platform === 'all') {
        renderTrendingCarousel(trendingGamesData);
    } else {
        const filtered = trendingGamesData.filter(g => g.platform.includes(platform));
        renderTrendingCarousel(filtered);
    }
}

function renderUpcomingReleases(list) {
    const grid = document.getElementById('upcomingReleasesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    list.forEach(up => {
        grid.innerHTML += `
            <div class="bg-[#120521] border border-purple-800/50 p-3 rounded-xl flex items-center gap-3">
                <img src="${up.image}" class="w-12 h-16 object-cover rounded-lg shrink-0" loading="lazy" decoding="async" width="48" height="64">
                <div class="min-w-0 flex-1">
                    <span class="text-[10px] text-pink-400 font-bold block">${up.date}</span>
                    <h5 class="font-bold text-xs text-white truncate">${up.title}</h5>
                    <span class="text-[10px] text-purple-300">${up.platform}</span>
                </div>
            </div>`;
    });
}

function quickFilterPlatform(platformKeyword) {
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = platformKeyword;
    filterProducts();
    const grid = document.getElementById('productGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// RESTO DE FUNCIONES DE CATÁLOGO, CARRITO Y CHECKOUT PRESERVADAS
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
        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 hover:border-pink-500 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition group';
        card.innerHTML = `
            <div>
                <div class="game-cover-container cursor-pointer">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" width="200" height="300">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded shadow">-${discount}%</span>
                    <span class="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow">CASHBACK</span>
                </div>
                <div class="p-2.5 sm:p-3.5 space-y-1">
                    <h3 class="font-bold text-[11px] sm:text-xs text-white line-clamp-2 leading-snug group-hover:text-pink-300 transition">${p.name}</h3>
                    <span class="block text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">${p.region} • ${p.platform}</span>
                </div>
            </div>
            <div class="p-2.5 sm:p-3.5 pt-0 space-y-2">
                <div>
                    <span class="block text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span>
                    <span class="text-sm sm:text-base font-black text-white block leading-tight">${formatARS(p.price)}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-pink-600 text-white font-bold py-2 rounded-lg text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition shadow">
                    <i class="fa-solid fa-cart-shopping"></i> Añadir
                </button>
            </div>`;
        grid.appendChild(card);
    });
}

function setCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-cat'));
    btn.classList.add('active-cat');
    filterProducts();
}

function filterProducts() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const sort = document.getElementById('sortSelect').value;
    let res = products.filter(p => (activeCategory === 'all' || p.category === activeCategory) && p.name.toLowerCase().includes(q));
    if (sort === 'price-asc') res.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') res.sort((a,b) => b.price - a.price);
    renderProducts(res);
}

function toggleCart() { document.getElementById('cartDrawer').classList.toggle('hidden'); renderCartItems(); }
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty++; else cart.push({...p, qty: 1});
    updateCartBadge(); toggleCart();
}
function updateCartBadge() {
    const count = cart.reduce((a,b) => a + b.qty, 0);
    document.getElementById('cartBadge').innerText = count;
    document.getElementById('cartCount').innerText = count;
}
function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    if (!list) return;
    list.innerHTML = '';
    let sub = 0;
    cart.forEach((i, idx) => {
        sub += i.price * i.qty;
        list.innerHTML += `<div class="flex justify-between items-center bg-[#2a175e] p-2.5 rounded-xl text-xs"><span class="truncate max-w-[140px] font-bold">${i.name}</span><span>${i.qty}x ${formatARS(i.price)}</span><button onclick="cart.splice(${idx},1);updateCartBadge();renderCartItems();" class="text-rose-400"><i class="fa-solid fa-trash"></i></button></div>`;
    });
    document.getElementById('cartTotal').innerText = formatARS(sub);
}
function switchView(v) {
    document.getElementById('viewStore').classList.add('hidden');
    document.getElementById('viewCheckoutEneba').classList.add('hidden');
    document.getElementById('viewCheckoutPagoNube').classList.add('hidden');
    document.getElementById('viewSuccess').classList.add('hidden');
    document.getElementById('mainHeader').classList.add('hidden');
    document.getElementById('checkoutHeader').classList.add('hidden');
    if(v==='store') { document.getElementById('mainHeader').classList.remove('hidden'); document.getElementById('viewStore').classList.remove('hidden'); }
    else { document.getElementById('checkoutHeader').classList.remove('hidden'); if(v==='checkoutEneba') document.getElementById('viewCheckoutEneba').classList.remove('hidden'); if(v==='checkoutPagoNube') document.getElementById('viewCheckoutPagoNube').classList.remove('hidden'); if(v==='success') document.getElementById('viewSuccess').classList.remove('hidden'); }
    window.scrollTo(0,0);
}
function proceedToCheckout() { if(cart.length===0) return; document.getElementById('cartDrawer').classList.add('hidden'); renderEnebaSummary(); switchView('checkoutEneba'); }
function selectPaymentCard(el, m) { selectedMethod = m; document.querySelectorAll('.eneba-pay-card').forEach(x => x.classList.remove('selected-pay-card')); el.classList.add('selected-pay-card'); }
function renderEnebaSummary() {
    const c = document.getElementById('checkoutSummaryItems'); c.innerHTML=''; let t=0;
    cart.forEach(i => { t+=i.price*i.qty; c.innerHTML+=`<div class="flex justify-between text-xs py-1"><span>${i.name} (x${i.qty})</span><span class="font-bold">${formatARS(i.price*i.qty)}</span></div>`; });
    document.getElementById('summaryTotal').innerText = formatARS(t);
}
function goToPagoNubeGateway() { switchView('checkoutPagoNube'); }
function backToEnebaSelection() { switchView('checkoutEneba'); }
function processSandboxPayment(e) {
    e.preventDefault();
    const cb = cart.reduce((a,b)=>a+b.cashback*b.qty,0);
    walletBalance += cb; updateWalletUI();
    const kC = document.getElementById('keysContainer'); kC.innerHTML='';
    cart.forEach(i => {
        const k = 'ARGON-' + Math.random().toString(36).substring(2,7).toUpperCase();
        myVaultKeys.push({name: i.name, image: i.image, key: k, date: new Date().toLocaleString('es-AR')});
        kC.innerHTML+=`<div class="bg-[#261259] p-3 rounded-xl flex justify-between items-center text-xs"><span>${i.name}</span><code class="text-emerald-400 font-bold">${k}</code></div>`;
    });
    localStorage.setItem('ohmy_vault_keys', JSON.stringify(myVaultKeys));
    updateVaultBadge(); cart=[]; updateCartBadge(); switchView('success');
}
function updateVaultBadge() { const b = document.getElementById('vaultCountBadge'); if(b) b.innerText = myVaultKeys.length; }
function openVaultModal() {
    const m = document.getElementById('vaultModal'), l = document.getElementById('vaultKeysList'); l.innerHTML='';
    if(myVaultKeys.length===0) l.innerHTML=`<p class="text-purple-300">Sin keys guardadas.</p>`;
    myVaultKeys.forEach(k => l.innerHTML+=`<div class="bg-[#2a175e] p-2.5 rounded-lg flex justify-between items-center text-xs"><span>${k.name}</span><code class="text-emerald-400 font-bold">${k.key}</code></div>`);
    m.classList.remove('hidden');
}
function closeVaultModal() { document.getElementById('vaultModal').classList.add('hidden'); }
function openWalletModal() { updateWalletUI(); document.getElementById('walletModal').classList.remove('hidden'); }
function closeWalletModal() { document.getElementById('walletModal').classList.add('hidden'); }
function openPacksModal() { document.getElementById('packsModal').classList.remove('hidden'); }
function closePacksModal() { document.getElementById('packsModal').classList.add('hidden'); }
function spinMysteryPack() {}
function openWishlistModal() { document.getElementById('wishlistModal').classList.remove('hidden'); }
function closeWishlistModal() { document.getElementById('wishlistModal').classList.add('hidden'); }
function openAuthModal() { document.getElementById('authModal').classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('authModal').classList.add('hidden'); }
function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmailInput').value;
    currentUser = { name: email.split('@')[0], email };
    localStorage.setItem('ohmy_active_user', JSON.stringify(currentUser));
    updateAuthUI(); closeAuthModal();
}
function updateAuthUI() {
    const u = document.getElementById('userNavArea');
    if(!u) return;
    if(currentUser) u.innerHTML=`<span class="text-xs text-emerald-400 font-bold">${currentUser.name}</span>`;
}
function openAdminModal() { document.getElementById('adminModal').classList.remove('hidden'); }
function closeAdminModal() { document.getElementById('adminModal').classList.add('hidden'); }
function verifyAdminPassword() {
    if(document.getElementById('adminPasswordInput').value === 'ohmyadmin2026') {
        document.getElementById('adminAuthSection').classList.add('hidden');
        document.getElementById('adminContentSection').classList.remove('hidden');
    } else { document.getElementById('adminErrorMsg').classList.remove('hidden'); }
}
function saveWebhookUrl() { alert('Guardado'); }
function handleAddCustomProduct(e) { e.preventDefault(); alert('Producto añadido'); }
function updateCardPreview() {}
function handleSearchInput() {}
function clearSearch() {}
function openProductDetail(id) { addToCart(id); }
function closeProductDetail() {}
