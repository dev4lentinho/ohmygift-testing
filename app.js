const sImg = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

function cardImg(brandTitle, denomination, bgTop, bgBottom, accentHex, platformLabel) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgTop}"/><stop offset="100%" stop-color="${bgBottom}"/></linearGradient></defs><rect width="600" height="900" fill="url(#bgGrad)"/><text x="70" y="92" font-family="system-ui" font-size="25" font-weight="800" fill="#ffffff">${platformLabel}</text><text x="300" y="535" font-family="system-ui" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle">${brandTitle}</text><text x="300" y="634" font-family="system-ui" font-size="33" font-weight="800" fill="${accentHex}" text-anchor="middle">${denomination}</text></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const products = [
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
    { id: 37, name: "Counter-Strike 2 Prime Status Upgrade", category: "currency", platform: "Steam", region: "GLOBAL", price: 16500, originalPrice: 19500, cashback: 1650, seller: "GGclub", image: sImg(730) },
    { id: 43, name: "Xbox Game Pass Ultimate 1 Mes Key", category: "subscription", platform: "Xbox", region: "ARGENTINA", price: 11999, originalPrice: 15999, cashback: 1200, seller: "ArgonOfficial", image: cardImg("GAME PASS", "1 MES", "#15803d", "#052e16", "#4ade80", "XBOX") }
];

const heroSlides = [
    { productId: 11, badge: "DESTACADO", title: "Black Myth: Wukong", desc: "Clave oficial Steam con entrega instantánea.", bannerBg: sImg(2358720), thumb: sImg(2358720) },
    { productId: 7, badge: "DEFINITIVA", title: "Cyberpunk 2077", desc: "Juego base + Phantom Liberty en Night City.", bannerBg: sImg(1091500), thumb: sImg(1091500) }
];

let currentHero = 0;
let cart = [];
let myVaultKeys = JSON.parse(localStorage.getItem('ohmy_vault_keys') || '[]');
let walletBalance = Number(localStorage.getItem('ohmy_wallet_zero_balance') || 0);
let activeCategory = 'all';
let selectedMethod = 'wallet';
let currentUser = JSON.parse(localStorage.getItem('ohmy_active_user') || 'null');

document.addEventListener('DOMContentLoaded', () => {
    initHero();
    renderProducts(products);
    updateCartBadge();
    updateWalletUI();
    updateVaultBadge();
    updateAuthUI();

    if (window.location.hash === '#admin') openAdminModal();
});

function formatARS(amount) {
    return '$' + Number(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ARS';
}

function updateWalletUI() {
    localStorage.setItem('ohmy_wallet_zero_balance', walletBalance);
    const el = document.getElementById('walletBalance');
    if (el) el.innerText = formatARS(walletBalance);
}

function initHero() {
    renderHeroSlide(0);
    renderThumbs();
    setInterval(() => {
        currentHero = (currentHero + 1) % heroSlides.length;
        renderHeroSlide(currentHero);
        renderThumbs();
    }, 4500);
}

function renderHeroSlide(idx) {
    const s = heroSlides[idx];
    const p = products.find(x => x.id === s.productId) || products[0];
    document.getElementById('heroSlideBg').src = s.bannerBg;
    document.getElementById('heroSlideBadge').innerText = s.badge;
    document.getElementById('heroSlidePlatform').innerText = `${p.platform} • ${p.region}`;
    document.getElementById('heroSlideTitle').innerText = s.title;
    document.getElementById('heroSlideDesc').innerText = s.desc;
    document.getElementById('heroSlideOldPrice').innerText = formatARS(p.originalPrice);
    document.getElementById('heroSlidePrice').innerText = formatARS(p.price);
    document.getElementById('heroBuyBtn').setAttribute('onclick', `addToCart(${p.id})`);
}

function renderThumbs() {
    const c = document.getElementById('heroSideThumbs');
    if (!c) return;
    c.innerHTML = '';
    heroSlides.forEach((s, idx) => {
        const p = products.find(x => x.id === s.productId) || products[0];
        const active = idx === currentHero;
        const item = document.createElement('div');
        item.onclick = () => { currentHero = idx; renderHeroSlide(idx); renderThumbs(); };
        item.className = `hero-thumb-item cursor-pointer rounded-xl border border-purple-800/60 bg-[#1a0c3d] p-2 flex items-center gap-2 lg:flex-1 ${active ? 'active-thumb' : ''}`;
        item.innerHTML = `<img src="${s.thumb}" class="w-9 h-12 object-cover rounded shrink-0"><div class="min-w-0"><h4 class="font-bold text-[11px] text-white truncate">${s.title}</h4><span class="text-[10px] text-emerald-400 font-black">${formatARS(p.price)}</span></div>`;
        c.appendChild(item);
    });
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(p => {
        const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const card = document.createElement('div');
        card.className = 'bg-[#1f0f47] border border-purple-800/60 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group';
        card.innerHTML = `<div><div class="game-cover-container"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded">-${disc}%</span></div><div class="p-2.5 space-y-1"><h3 class="font-bold text-[11px] text-white line-clamp-2">${p.name}</h3></div></div><div class="p-2.5 pt-0 space-y-1.5"><div><span class="text-[10px] text-purple-300 line-through">${formatARS(p.originalPrice)}</span><span class="text-sm font-black text-white block">${formatARS(p.price)}</span></div><button onclick="addToCart(${p.id})" class="w-full bg-purple-600 hover:bg-fuchsia-600 text-white py-1.5 rounded-lg text-[11px] font-bold">Añadir</button></div>`;
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
        const d = document.createElement('div');
        d.className = 'flex justify-between items-center bg-[#2a175e] p-2.5 rounded-xl text-xs';
        d.innerHTML = `<span class="truncate max-w-[150px] font-bold">${i.name}</span><span>${i.qty}x ${formatARS(i.price)}</span><button onclick="removeItem(${idx})" class="text-rose-400"><i class="fa-solid fa-trash"></i></button>`;
        list.appendChild(d);
    });
    document.getElementById('cartTotal').innerText = formatARS(sub);
}
function removeItem(idx) { cart.splice(idx, 1); updateCartBadge(); renderCartItems(); }
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
    const t = cart.reduce((a,b)=>a+b.price*b.qty,0);
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
    myVaultKeys.forEach(k => l.innerHTML+=`<div class="bg-[#2a175e] p-2.5 rounded-lg flex justify-between items-center"><span>${k.name}</span><code class="text-emerald-400 font-bold">${k.key}</code></div>`);
    m.classList.remove('hidden');
}
function closeVaultModal() { document.getElementById('vaultModal').classList.add('hidden'); }
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
function exportDatabaseJSON() {}
function exportDatabaseCSV() {}
function clearDatabase() {}
