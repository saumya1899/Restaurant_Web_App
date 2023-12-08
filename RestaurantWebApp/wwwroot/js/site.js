// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Tasty Burger", price: "$19.99", image: "/images/product1.png" },
        { id: 2, name: "Noodle Bowl", price: "$13.99", image: "/images/product2.png" },
        { id: 3, name: "Spicy Salad", price: "$12.99", image: "/images/product3.png" },
    ];

    const grid = document.querySelector('.grid');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="price-tag">${product.price}</div>
            <img src="${product.image}" alt="${product.name}">
            <div class="content">
                <p class="description">${product.name}</p>
                <div class="quantity-controls">
                    <button class="minus-btn" data-id="${product.id}">−</button>
                    <span class="quantity" id="quantity-${product.id}">0</span>
                    <button class="plus-btn" data-id="${product.id}">+</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    initializeQuantityControls();
});
function initializeQuantityControls() {
    const order = { };

        const minusButtons = document.querySelectorAll('.minus-btn');
        const plusButtons = document.querySelectorAll('.plus-btn');

    minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const quantityElement = document.getElementById(`quantity-${id}`);
                let quantity = Math.max(parseInt(quantityElement.textContent) - 1, 0);
                quantityElement.textContent = quantity;
                updateOrder(order, id, quantity);
            });
    });

    plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const quantityElement = document.getElementById(`quantity-${id}`);
                let quantity = parseInt(quantityElement.textContent) + 1;
                quantityElement.textContent = quantity;
                updateOrder(order, id, quantity);
            });
    });
}

        function updateOrder(order, productId, quantity) {
    if (quantity > 0) {
            order[productId] = quantity;
    } else {
            delete order[productId];
    }
        console.log(order); // For debugging, shows the order in the console
}
