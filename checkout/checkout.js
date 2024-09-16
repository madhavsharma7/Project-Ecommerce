document.addEventListener("DOMContentLoaded", function () {
    // Fetch products from localStorage
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the cart list to avoid duplicates
    const cartList = document.getElementById('cart-products');
    cartList.innerHTML = '';

    let totalPrice = 0;  // Initialize total price

    // Populate cart items
    cartProducts.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Create product image element
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        // Create product title element
        const title = document.createElement('h2');
        title.textContent = product.name;

        // Create product quantity element
        const quantity = document.createElement('p');
        quantity.textContent = `${product.quantity}`;

        // Create product price element
        const price = document.createElement('p');
        price.textContent = `Rs ${product.price}`;

        // Calculate total price
        totalPrice += product.price * product.quantity;

        // Append all elements to the list item
        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(quantity);
        li.appendChild(price);

        // Append the list item to the cart list
        cartList.appendChild(li);
    });

    // Display the total price on the checkout page
    const totalPriceElement = document.createElement('h4');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.textContent = `Total Price: Rs ${totalPrice.toFixed(2)}`;

    // Add the total price element after the cart list
    const addressInput = document.getElementById('cart-products');
    addressInput.insertAdjacentElement('afterend', totalPriceElement);

    // Handle adding new addresses dynamically
    const addressList = document.getElementById('address-list');
    document.getElementById('add-address').addEventListener('click', function () {
        const newAddress = document.createElement('div');
        newAddress.innerHTML = `
        <div class="form">
            <input type="radio" name="selected-address" value="New Address" required>
            <input type="text" name="new-address" placeholder="Enter new address" required>
            <button class="delete-address" type="button">Delete Address</button>
        </div>
        `;
        addressList.appendChild(newAddress);

        // Add delete address functionality
        newAddress.querySelector('.delete-address').addEventListener('click', function () {
            newAddress.remove();
        });
    });
});

// Handle the Place Order button click
document.getElementById('place-order').addEventListener('click', function () {
    const selectedAddress = document.querySelector('input[name="selected-address"]:checked');

    if (!selectedAddress) {
        alert('Please select an address before placing the order.');
        return;
    }

    // Additional logic for placing the order can be added here
    alert('Order placed successfully!');

    // Clear the cart from localStorage after placing the order
    localStorage.removeItem('cart');

    // Redirect to index.html after the alert is dismissed
    window.location.href = '../index.html';
});

// Dropdown toggle logic
document.querySelector('.dropdown-btn').addEventListener('click', function () {
    document.querySelector('.dropdown-content').classList.toggle('show');
});
