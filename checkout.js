document.addEventListener("DOMContentLoaded", function() {
    // Fetch products from local storage
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    // Debugging: Check if products are fetched correctly
    console.log("Cart Products:", cartProducts);

    // Get the cart list element
    const cartList = document.getElementById('cart-products');

    // Clear the cart list to avoid duplicates
    cartList.innerHTML = '';

    // Check for duplicates and aggregate quantities
    const productMap = new Map();
    cartProducts.forEach(product => {
        if (product && product.id) {
            if (productMap.has(product.id)) {
                const existingProduct = productMap.get(product.id);
                existingProduct.quantity += product.quantity;
            } else {
                productMap.set(product.id, {...product});
            }
        }
    });

    // Populate cart items
    if (productMap.size > 0) {
        productMap.forEach(product => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            
            // Create product image element
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '100px';  // Adjust size as needed
            img.style.height = '100px';
            
            // Create product title element
            const title = document.createElement('h2');
            title.textContent = product.name;

            // Create product price element
            const price = document.createElement('p');
            price.textContent = `Price: Rs ${product.price}`;
            
            // Create product quantity element
            const quantity = document.createElement('p');
            quantity.textContent = `Quantity: ${product.quantity}`;

            // Append all elements to the list item
            li.appendChild(img);
            li.appendChild(title);
            li.appendChild(price);
            li.appendChild(quantity);

            // Append the list item to the cart list
            cartList.appendChild(li);
        });
    } else {
        // If no products, show a message
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your cart is empty.";
        cartList.appendChild(emptyMessage);
    }

    // Handle the Place Order button click
    document.getElementById('place-order').addEventListener('click', function() {
        const address = document.getElementById('address').value;

        if (address.trim() === '') {
            alert('Please enter your shipping address.');
            return;
        }

        // Additional logic for placing the order can be added here
        alert('Order placed successfully!');
    });
});
