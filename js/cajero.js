const cashierNameEl = document.getElementById('cashierName');
const cashierRoleEl = document.getElementById('cashierRole');
const logoutBtn = document.getElementById('logoutBtn');
const productSelect = document.getElementById('productSelect');
const addProductBtn = document.getElementById('addProductBtn');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');
const generateReceiptBtn = document.getElementById('generateReceiptBtn');
const receiptDisplay = document.getElementById('receiptDisplay');

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'cajero') {
    window.location.href = 'index.html';
}

cashierNameEl.textContent = currentUser.name;
cashierRoleEl.textContent = `Rol: ${currentUser.role.charAt(0).toUpperCase()}${currentUser.role.slice(1)}`;

const order = [];

function populateProductSelect() {
    productSelect.innerHTML = '<option value="">-- Elige un producto --</option>';
    PRODUCTS.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productSelect.appendChild(option);
    });
}

function updateOrderUI() {
    if (!order.length) {
        orderItems.innerHTML = '<li class="empty">No hay productos en el pedido</li>';
        orderTotal.textContent = '$0.00';
        return;
    }

    orderItems.innerHTML = order.map(item => `
        <li>
            <div>
                <strong>${item.name}</strong>
                <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            </div>
            <span>$${(item.quantity * item.price).toFixed(2)}</span>
        </li>
    `).join('');

    const total = order.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

function addProductToOrder() {
    const productId = productSelect.value;
    if (!productId) return;

    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return;

    const existing = order.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        order.push({ ...product, quantity: 1 });
    }

    updateOrderUI();
    productSelect.value = '';
}

function generateReceipt() {
    if (!order.length) {
        receiptDisplay.innerHTML = '<p class="empty">No hay productos en el pedido</p>';
        return;
    }

    const total = order.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const date = new Date().toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });

    let receipt = `
========================================
       CAFETÍN CENTRAL UCV
========================================
Fecha: ${date}
Cajero: ${currentUser.name}
----------------------------------------

`;

    order.forEach(item => {
        const itemTotal = item.quantity * item.price;
        receipt += `${item.name}\n`;
        receipt += `  ${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}\n\n`;
    });

    receipt += `----------------------------------------
TOTAL: $${total.toFixed(2)}
========================================

    ¡Gracias por tu compra!
    Vuelve pronto al Cafetín Central

========================================
`;

    receiptDisplay.innerHTML = `<pre>${receipt}</pre>`;
    
    order.length = 0;
    updateOrderUI();
}

addProductBtn.addEventListener('click', addProductToOrder);
generateReceiptBtn.addEventListener('click', generateReceipt);

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

populateProductSelect();
updateOrderUI();
