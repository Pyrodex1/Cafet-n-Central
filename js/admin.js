const adminNameEl = document.getElementById('adminName');
const adminRoleEl = document.getElementById('adminRole');
const logoutBtn = document.getElementById('logoutBtn');
const addProductForm = document.getElementById('addProductForm');
const productList = document.getElementById('productList');

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = 'index.html';
}

adminNameEl.textContent = currentUser.name;
adminRoleEl.textContent = `Rol: ${currentUser.role.charAt(0).toUpperCase()}${currentUser.role.slice(1)}`;

let nextProductId = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1;

function renderProductList() {
    if (!PRODUCTS.length) {
        productList.innerHTML = '<div class="empty-state">No hay productos registrados</div>';
        return;
    }

    productList.innerHTML = PRODUCTS.map(product => `
        <div class="product-item" data-id="${product.id}">
            <div class="product-item-info">
                <h4>${product.name}</h4>
                <p>Precio: $${product.price.toFixed(2)} | Categoría: ${product.category}</p>
            </div>
            <button class="btn-delete" data-id="${product.id}">Eliminar</button>
        </div>
    `).join('');
}

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value.trim();

    if (!name || !price || !category || !image) return;

    const newProduct = {
        id: nextProductId++,
        name: name,
        price: price,
        category: category,
        image: image
    };

    PRODUCTS.push(newProduct);
    renderProductList();
    addProductForm.reset();
}

function deleteProduct(productId) {
    const index = PRODUCTS.findIndex(p => p.id === Number(productId));
    if (index !== -1) {
        PRODUCTS.splice(index, 1);
        renderProductList();
    }
}

addProductForm.addEventListener('submit', addProduct);

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const productId = event.target.dataset.id;
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            deleteProduct(productId);
        }
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

renderProductList();
