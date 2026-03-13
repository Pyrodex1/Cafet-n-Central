const clientNameEl = document.getElementById('clientName');
const clientRoleEl = document.getElementById('clientRole');
const logoutBtn = document.getElementById('logoutBtn');
const categoryFilter = document.getElementById('categoryFilter');
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const completePurchaseBtn = document.getElementById('completePurchase');
const purchaseHistory = document.getElementById('purchaseHistory');
const loyaltyPointsEl = document.getElementById('loyaltyPoints');

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'cliente') {
    window.location.href = 'index.html';
}

clientNameEl.textContent = currentUser.name;
clientRoleEl.textContent = `Rol: ${currentUser.role.charAt(0).toUpperCase()}${currentUser.role.slice(1)}`;

const cart = [];
const history = [];
let loyaltyPoints = 80;

function renderProducts(filter = 'all') {
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

    if (!filtered.length) {
        productGrid.innerHTML = '<p class="empty">No hay productos en esta categoría</p>';
        return;
    }

    productGrid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn-add" data-id="${product.id}">Agregar</button>
        </article>
    `).join('');
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (!cart.length) {
        cartItems.innerHTML = '<li class="empty">Tu carrito está vacío</li>';
        cartSubtotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <li>
            <div>
                <strong>${item.name}</strong>
                <p>${item.quantity} x $${item.price.toFixed(2)}</p>
            </div>
            <span>$${(item.quantity * item.price).toFixed(2)}</span>
        </li>
    `).join('');

    const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
}

function updateHistoryUI() {
    if (!history.length) {
        purchaseHistory.innerHTML = '<li class="empty">Aún no realizas compras</li>';
        return;
    }

    purchaseHistory.innerHTML = history.map(entry => `
        <li>
            <div>
                <p><strong>${entry.date}</strong></p>
                <small>${entry.items} artículos</small>
            </div>
            <span>$${entry.total}</span>
        </li>
    `).join('');
}

function updateLoyaltyUI() {
    loyaltyPointsEl.textContent = `Tienes ${loyaltyPoints} puntos acumulados`;
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return;

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function completePurchase() {
    if (!cart.length) return;

    const totalValue = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const dateLabel = new Date().toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });

    history.unshift({
        date: dateLabel,
        items: cart.reduce((acc, item) => acc + item.quantity, 0),
        total: totalValue.toFixed(2)
    });

    const earnedPoints = Math.round(totalValue * 5);
    loyaltyPoints += earnedPoints;

    cart.length = 0;
    updateCartUI();
    updateHistoryUI();
    updateLoyaltyUI();
}

categoryFilter.addEventListener('change', (event) => {
    renderProducts(event.target.value);
});

productGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-add')) {
        addToCart(event.target.dataset.id);
    }
});

completePurchaseBtn.addEventListener('click', completePurchase);

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

renderProducts();
updateCartUI();
updateHistoryUI();
updateLoyaltyUI();
