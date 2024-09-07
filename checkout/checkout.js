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
        quantity.textContent = ` ${product.quantity}`;

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

    // Handle the Place Order button click
    const addressInput = document.getElementById('address');
    addressInput.insertAdjacentElement('afterend', totalPriceElement);

});

document.getElementById('place-order').addEventListener('click', function () {
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const phoneNumber = document.getElementById('phonenumber').value;
    const address = document.getElementById('address').value;

    if (address.trim() === '' ||firstName.trim()==='' || lastName.trim() === '' || phoneNumber.trim() === '' || address.trim() === '') {
        alert('Please enter your details');
        return;
    }

    // Additional logic for placing the order can be added here
    alert('Order placed successfully!');

    // Clear the cart from localStorage after placing the order
    localStorage.removeItem('cart');

    // Redirect to index.html after the alert is dismissed
    window.location.href = 'index.html';

});



