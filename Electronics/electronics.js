let showproductdiv = document.querySelector("#all-products");
let cartCount = 0;
let cartItemIdCounter = 0;
let totalPrice = 0;
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let addedProductIds = new Set(cartItems.map(item => String(item.id))); // Track added product IDs

function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// Function to update local storage and UI
function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartCount = cartItems.length; // Or use a unique item count if you want
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("cart-count").textContent = cartCount;
}

let displayproducts = async (searchTerm = "") => {
    try {
        let response = await fetch("https://fakestoreapi.com/products/category/electronics");
        let finalproducts = await response.json();

        // Clear the product display before showing new products
        showproductdiv.innerHTML = "";  // This line will clear the previous products

        // Trim the search term to avoid extra spaces affecting the filtering
        let trimmedSearchTerm = searchTerm.trim().toLowerCase();

        // Filter products based on the search term
        let filteredProducts = finalproducts.filter(element =>
            element.title.toLowerCase().includes(trimmedSearchTerm)
        );

        // Display filtered products
        filteredProducts.forEach((element, index) => {
            showproductdiv.innerHTML += `
            <div class="product-items">
                <a href="../Single/single.html?id=${element.id}">
                    <img src="${element.image}" alt="${element.title}">
                    <h2>${element.title}</h2>
                    <p>Price: Rs ${element.price}</p>
                    <p>Rating: ${element.rating.rate}<span class="star"> * </span></p>
                </a>
                <button class="addtocartbtn" data-index="${index}">Add to Cart</button>
            </div>`;
        });

        // Handle case when no products are found
        if (filteredProducts.length === 0) {
            showproductdiv.innerHTML = '<p>No products found.</p>';
        }

        // Add event listeners to the "Add to Cart" buttons
        document.querySelectorAll('.addtocartbtn').forEach((button, index) => {
            button.addEventListener("click", () => {
                let selectedProduct = filteredProducts[index];  // Use filtered products
                addtocart(selectedProduct.image, selectedProduct.title, selectedProduct.price, selectedProduct.id);
            });
        });
    } catch (error) {
        console.error("Error fetching or displaying products:", error);
    }
};


// Single Product

let showProductDetails = async () => {
    // Extract the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch the product details using the product ID
    let product = await fetch(`https://fakestoreapi.com/products/${productId}`);
    let finalProduct = await product.json();

    let productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
     <div class="product-details">
        <img  src="${finalProduct.image}" alt="${finalProduct.title}">
        <div class="product-details-content">
            <h2>${finalProduct.title}</h2>
            <p><b>Category:</b> ${finalProduct.category}</p>
            <p><b>Description:</b> ${finalProduct.description}</p>
            <p><b>Price:</b> Rs ${finalProduct.price}</p>
            <p><b>Rating:</b> ${finalProduct.rating.rate} <span class="star">*</span> (${finalProduct.rating.count} reviews)</p>
            <button class="addtocartbtn">Add to Cart</button>
        </div>
    </div>
    `;
    let addToCartButton = document.querySelector('.addtocartbtn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addtocart(finalProduct.image, finalProduct.title, finalProduct.price, finalProduct.id);
        });
    } else {
        console.error('Add to Cart button not found!');
    }
};

// Call the function directly
showProductDetails();

// Function to remove from cart
let removeFromCart = (id) => {
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    updateLocalStorage();
    renderCartItems();
};

// Cart

let addtocart = (image, title, price, id) => {
    id = String(id);

    // Check if the product is already in the cart
    let existingCartItem = cartItems.find((item) => item.id === id);

    // Check if the product is already in the cart
    if (addedProductIds.has(id)) {
        alert('This product is already in your cart.');
        return;
    }
    else {
        // If the product is not in the cart, add a new item
        cartItemIdCounter++; // Increment the cart item ID counter for the next item

        cartItems.push({ id, image, title, price: parseFloat(price), quantity: 1 });

        let cartItemsContainer = document.querySelector(".cart-items");
        let cartItemId = `cart-item-${cartItemIdCounter}`;

        // Add a new item to the cart UI
        cartItemsContainer.innerHTML += `
            <div id="${cartItemId}" class="cart-item" data-id="${id}" data-price="${price}" style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${image}" alt="product image" style="width: 50px; height: 50px; margin-right: 10px;">
                <div class="cart-item-details">
                    <p>${title}</p>
                    <span style="display: block;">Price: Rs ${price}</span>
                    <div class="quantity_increase">
                        <i class="fa-solid fa-minus fa-sm minus"></i>
                        <span class="quantity">1</span> <!-- This will display the quantity -->
                        <i class="fa-solid fa-plus fa-sm plus"></i>
                    </div>
                </div>
            </div>
        `;
    }

    // Update the total cart count and price
    cartCount++;
    totalPrice += parseFloat(price);
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);

    // Add the product ID to the Set to prevent duplicate entries
    addedProductIds.add(id);

    // // Save the cart items to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Call the function to set up the quantity controls for the cart items
    setupQuantityControls();
};

// Initialize UI on page load
document.addEventListener("DOMContentLoaded", () => {
    // renderCartItems();
    updateLocalStorage(); // This will also update the total price and count on initial load
});

// Open cart sidebar
document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('active');
});

// Close cart sidebar
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
});

// Cart quantity

// Function to set up quantity control event listeners

function setupQuantityControls() {
    document.querySelectorAll('.quantity_increase').forEach(container => {
        const quantityElement = container.querySelector('.quantity');
        const minusButton = container.querySelector('.minus');
        const plusButton = container.querySelector('.plus');
        const cartItemElement = container.closest('.cart-item');
        const id = cartItemElement.dataset.id;
        const price = parseFloat(cartItemElement.dataset.price);
        // const price = parseFloat(container.closest('.cart-item').dataset.price); // Use parseFloat to handle decimal values
        let quantity = parseInt(quantityElement.textContent);
        let totalPrice = parseFloat(document.getElementById('total-price').textContent);

        minusButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                totalPrice -= price;

                // Update the quantity in the cartItems array
                const item = cartItems.find(item => item.id === id);
                if (item) item.quantity = quantity;
            }
            else {
                totalPrice -= price;
                cartItemElement.remove();

                // Remove the item from the cartItems array
                cartItems = cartItems.filter(item => item.id !== id);
            }
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        });

        plusButton.addEventListener('click', () => {

            quantity++;
            totalPrice += price;
            quantityElement.textContent = quantity;

            // Update the quantity in the cartItems array
            const item = cartItems.find(item => item.id === id);
            if (item) item.quantity = quantity;

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        });

    });
}

function fetchCartDataForUser(userId) {
    fetch(`https://fakestoreapi.com/carts/user/${userId}`)
        .then((res) => res.json())
        .then((carts) => {
            const cartItemsContainer = document.getElementById("cart-items");
            cartItemsContainer.innerHTML = ""; // Clear previous cart items

            if (!carts || carts.length === 0) {
                console.log("No cart data available for this user");
                return; // Exit if there is no cart data
            }

            cartItemsMap = new Map(); // Map to store productId and combined details
            let totalPrice = 0;

            // Loop through each cart and process products
            carts.forEach((cart) => {
                cart.products.forEach((product) => {
                    const productId = product.productId;

                    // Check if the product already exists in the cartItemsMap
                    if (cartItemsMap.has(productId)) {
                        // If product already exists, increase its quantity
                        cartItemsMap.get(productId).quantity += product.quantity;
                    } else {
                        // Fetch product details and add it to the map
                        fetch(`https://fakestoreapi.com/products/${productId}`)
                            .then((res) => res.json())
                            .then((productDetails) => {
                                cartItemsMap.set(productId, {
                                    id: productId,
                                    image: productDetails.image,
                                    title: productDetails.title,
                                    price: parseFloat(productDetails.price),
                                    quantity: product.quantity,
                                });

                                // Update the UI and calculate totals
                                updateCartUI(cartItemsMap, cartItemsContainer);
                                calculateTotals(cartItemsMap);

                            })
                            .catch((err) =>
                                console.log("Error fetching product details:", err)
                            );
                    }
                });
            });
        })
        .catch((err) => console.log("Error fetching cart data:", err));
}

// Function to update the cart UI
function updateCartUI(cartItemsMap, cartItemsContainer) {
    cartItemsContainer.innerHTML = ""; // Clear container before rendering

    cartItemsMap.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-entry");

        // Dynamically add product details including image, name, and quantity
        cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-entry-image">
            <div class="cart-entry-details">
                <p class="cart-entry-title">${item.title}</p>
                <p class="cart-entry-price">Price: Rs ${item.price}</p>
                <div class="cart-entry-quantity-controls">
                    <button class="decrease-qty-btn" data-id="${item.id}"> <i class="fa-solid fa-minus fa-sm minus"></i> </button>
                    <span class="cart-entry-quantity">${item.quantity}</span>
                    <button class="increase-qty-btn" data-id="${item.id}">  <i class="fa-solid fa-plus fa-sm plus"></i></button>
                </div>
            </div>
        `;

        cartItem.dataset.id = item.id;
        cartItem.dataset.price = item.price;
        cartItemsContainer.appendChild(cartItem);

        // setupQuantityControls();

        // Attach event listeners for the increase/decrease buttons
        cartItem
            .querySelector(".increase-qty-btn")
            .addEventListener("click", () => changeQuantity(item.id, 1));
        cartItem
            .querySelector(".decrease-qty-btn")
            .addEventListener("click", () => changeQuantity(item.id, -1));
    });
}

// Function to calculate and display total price and cart count
function calculateTotals(cartItemsMap) {
    totalPrice = 0;
    cartCount = 0;
    let uniqueItemCount = cartItemsMap.size; // Get the count of unique items

    // Loop through map to calculate total price
    cartItemsMap.forEach((item) => {
        const productTotalPrice = item.price * item.quantity;
        totalPrice += productTotalPrice;
    });

    // Update the total price and unique item count in the UI
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("cart-count").textContent = uniqueItemCount; // Set cart count as the number of unique items

    localStorage.setItem("cart", JSON.stringify(Array.from(cartItemsMap.values())));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
}


// Function to change the quantity of an item in the cart
function changeQuantity(productId, change) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    const product = cartItems.find((item) => item.id === productId);
    if (!product) return;

    // Update quantity
    product.quantity += change;
    if (product.quantity <= 0) {
        // Remove the item from the cart if quantity is zero
        cartItems = cartItems.filter((item) => item.id !== productId);
    }

    // Recalculate the total price
    totalPrice += change * product.price;

    // Update UI and storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));

    // Re-render the cart UI
    const cartItemsMap = new Map(cartItems.map((item) => [item.id, item]));
    updateCartUI(cartItemsMap, document.getElementById("cart-items"));
    calculateTotals(cartItemsMap);
}

document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName"); // Get the stored username
    const navbarUserLink = document.getElementById("user-link-navbar");
    const dropdownUserLink = document.getElementById("user-link-dropdown");

    if (userName) {
        // Update both the navbar and dropdown with the username
        if (navbarUserLink) navbarUserLink.textContent = userName;
        if (dropdownUserLink) dropdownUserLink.textContent = userName;
    }
});

// Function to clear the cart display
function clearCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear the cart display
    }
}


// Function to handle logout
function logout() {
    // Clear cart items from the page
    clearCartDisplay();

    // Remove any stored cart data and user details
    localStorage.removeItem("cartData"); // If cart is stored in localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
    localStorage.removeItem("userName"); // Remove userName from localStorage

    // Optional: Show a logout confirmation
    alert("You have been logged out.");

    // Optionally refresh the page to reflect logout status
    location.reload();
}

// On page load or after login, check if userId is stored and fetch cart
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName"); // Get the stored username
    const userLink = document.getElementById("user-link");
    const logoutBtn = document.getElementById("logout-btn-navbar");
    const logoutBtnResp = document.getElementById("logout-btn"); // For responsive
    // console.log('Loaded userId from localStorage:', userId); // Log the stored userId

    if (userId) {
        fetchCartDataForUser(userId); // Fetch the cart data if userId exists
    } else {
        // console.log('No userId found in localStorage, clearing cart');
        clearCartDisplay(); // Clear cart if no user is logged in
    }

    // Display user's name in navbar if logged in
    if (userName && userLink) {
        userLink.textContent = userName;
        userLink.href = "#"; // Optionally disable the login link
    }

    // Attach logout event listener to the logout button
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout); // Call logout when button is clicked
    }

    if (logoutBtnResp) {
        logoutBtnResp.addEventListener("click", logout); // Responsive view logout
    }
});

// Search bar 
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to search input
    document.getElementById('searchInput').addEventListener('input', (event) => {
        let searchTerm = event.target.value;
        displayproducts(searchTerm);  // Update displayed products based on search term
    });

    // Add event listener to search icon
    document.getElementById('searchButton').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        displayproducts(searchTerm);  // Update displayed products based on search term
    });

    // Display products on initial load without search term
    displayproducts();  // Load all products when the page is loaded
});



// CSV 

const scriptURL = 'https://script.google.com/macros/s/AKfycbxaj313DuVqK31lwwMgB401ogmYKFA7z9QnJ6UvjkhUbO-_86nhoehmO7ep5whhVRuxww/exec';

// Subscription Form Submission
const subscriptionForm = document.forms['subscription-form'];
if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', e => {
        e.preventDefault();

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(subscriptionForm)
        })
            .then(response => {
                if (response.ok) {
                    alert("Thank you for subscribing! You will receive updates soon.");
                    subscriptionForm.reset(); // Optionally reset the form after submission
                } else {
                    alert("There was an issue with your subscription. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("There was an error submitting your subscription. Please try again later.");
            });
    });
}

document.querySelector('.dropdown-btn').addEventListener('click', function () {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

