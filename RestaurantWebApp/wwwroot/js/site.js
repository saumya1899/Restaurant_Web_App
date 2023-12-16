// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const products = [
    { id: 0, name: "Spicy Salad", price: "$12.99", image: "/images/product00.png" },

    { id: 10, name: "Tasty Burger", price: "$19.99", image: "/images/product10.png" },
    { id: 11, name: "Noodle Bowl", price: "$13.99", image: "/images/product11.png" },

    { id: 20, name: "Chocolate Brownie", price: "$4.99", image: "/images/product20.png" },

    { id: 30, name: "Plain Water", price: "$0.99", image: "/images/product30.png" },
    { id: 31, name: "Green Tea", price: "$1.99", image: "/images/product31.png" },

];
// The images in the /images folder of the food items are from DALLE3 for mocking up the design.

var subtotal = 0.0;

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("orderJSON") !== null) {
        document.getElementById("orderJSON").value = sessionStorage.getItem("clientOrder");
    }

    const grid = document.querySelector('.grid');

    products.forEach(product => {
        if (product.id >= startId && product.id <= endId && isCart == false) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="price-tag">${product.price}</div>
                <img src="${product.image}" alt="${product.name}" onclick="incrementItemQuantity(${product.id})">
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
        }

        else if (product.id >= startId && product.id <= endId && isCart == true) {
            if (JSON.parse(sessionStorage.getItem("clientOrder"))[product.id] != null) {
                var product_quantity = JSON.parse(sessionStorage.getItem("clientOrder"))[product.id].quantity;
                var product_price = JSON.parse(sessionStorage.getItem("clientOrder"))[product.id].price;
            } else {
                var product_quantity = 0;
            }
            
            if (product_quantity > 0) { 
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="price-tag">${product.price}</div>
                    <img src="${product.image}" alt="${product.name}" onclick="incrementItemQuantity(${product.id})">
                    <div class="content">
                        <p class="description">${product.name}</p>
                        <div class="quantity-controls">
                            <span class="quantity" id="quantity-${product.id}">${product_quantity}</span>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
                subtotal = parseFloat(subtotal) + parseFloat(product_price.slice(1)) * parseInt(product_quantity);
            }
        }
    });
    if (document.getElementById("subtotal") != null) {
        document.getElementById("subtotal").value = subtotal.toFixed(2);
    }
    if (document.getElementById("subtotalDisplay") != null) {
        document.getElementById("subtotalDisplay").innerText = subtotal.toFixed(2);
    }

    initializeQuantityControls();

    if (isConfirmation) {
        sessionStorage.removeItem("clientOrder")
    }
});
function initializeQuantityControls() {
    const order = { };

    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');


    minusButtons.forEach(button => {
            if (sessionStorage.getItem("clientOrder") !== null) {
                const id = button.getAttribute('data-id');
                const quantityElement = document.getElementById(`quantity-${id}`);
                var temp_order = JSON.parse(sessionStorage.getItem("clientOrder"));
                if (temp_order[id] != null) {
                    quantityElement.textContent = temp_order[id].quantity;
                }
            }
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const quantityElement = document.getElementById(`quantity-${id}`);
                let quantity = Math.max(parseInt(quantityElement.textContent) - 1, 0);
                quantityElement.textContent = quantity;
                updateOrder(order, id, quantity);
            });
    });

    plusButtons.forEach(button => {
            if (sessionStorage.getItem("clientOrder") !== null) {
                const id = button.getAttribute('data-id');
                const quantityElement = document.getElementById(`quantity-${id}`);
                var temp_order = JSON.parse(sessionStorage.getItem("clientOrder"));
                if (temp_order[id] != null) {
                    quantityElement.textContent = temp_order[id].quantity;
                }
            }
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

    if (sessionStorage.getItem("clientOrder") !== null) {
        var order = JSON.parse(sessionStorage.getItem("clientOrder"));
    }
    if (quantity > 0) {
        var newItem = getItemFromListById(products, productId);
        order[productId] = { name: newItem.name, price: newItem.price, image: newItem.image, quantity: quantity };
    } else {
            delete order[productId];
    }
    if (document.getElementById("orderJSON") !== null) {
        document.getElementById("orderJSON").value = JSON.stringify(order);
    }
    sessionStorage.setItem('clientOrder', JSON.stringify(order));
}

function incrementItemQuantity(id) {
    const quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
    updateOrder(order, id, quantity);
}

function getItemFromListById(listOfItems, idOfItem) {
    for (let i = 0; i < listOfItems.length; i++) {
        if (listOfItems[i].id == idOfItem) {
            return listOfItems[i];
        }
    }
    return null;
}