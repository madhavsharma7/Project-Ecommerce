let showproductdiv = document.querySelector("#all-products");
let cartCount = 0;
let cartItemIdCounter = 0;
let totalPrice = 0;
let addedProductIds = new Set();

function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

let displayproducts = async () => {
    let product = await fetch("https://fakestoreapi.com/products");
    let finalproducts = await product.json();
    showproductdiv.innerHTML = ''; // Clear the container before adding new products
    finalproducts.forEach(element => {
        showproductdiv.innerHTML += `
            <div class="product-items">
                <a href="./Single/single.html?id=${element.id}">
                    <img src="${element.image}" alt="${element.title}" style="width: 150px; height: 150px;">
                    <div class="product-details-content">
                    <h2>${element.title}</h2>
                    <p>${element.category}</p>
                    <p>Price: Rs ${element.price}</p>
                    <p>Rating: ${element.rating.rate} <span class="star">*</span></p>
                </a>
                    <button class="addtocartbtn">Add to Cart</button> 
            </div>`;
    });

    document.querySelectorAll('.addtocartbtn').forEach((button, index) => {
        button.addEventListener("click", () => {
            let selectedProduct = finalproducts[index];
            addtocart(selectedProduct.image, selectedProduct.title, selectedProduct.price, selectedProduct.id);
        });
    });
}

displayproducts();

//Single product
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
        <h2>${finalProduct.title}</h2>
        <p><b>Category:</b> ${finalProduct.category}</p>
        <p><b>Description:</b> ${finalProduct.description}</p>
        <p><b>Price:</b> Rs ${finalProduct.price}</p>
        <p><b>Rating:</b> ${finalProduct.rating.rate} <span class="star">*</span> (${finalProduct.rating.count} reviews)</p>
        <button class="addtocartbtn">Add to Cart</button>
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


let removeFromCart = (cartItemId, id, price) => {

    id = String(id);
    // console.log(`Attempting to remove item with ID: ${cartItemId}`); // Debugging

    // Find the cart item by its ID and remove it
    let cartItem = document.getElementById(cartItemId);

    // console.log(cartItem); // Check if cartItem is found
    if (cartItem) {
        cartItem.remove();
        // console.log(`Removed item with ID: ${cartItemId} and ${id}`); // Debugging

        // Decrement the cart count and update the display
        cartCount--;
        document.getElementById('cart-count').textContent = cartCount;

        // Subtract the item's price from the total price
        totalPrice -= parseFloat(price);
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    } else {
        // console.log(`Item with ID: ${cartItemId} not found`); // Debugging
    }
};


// Cart  

let addtocart = (image, title, price, id) => {
    id = String(id);

    // Check if the product is already in the cart
    if (addedProductIds.has(id)) {
        alert('This product is already in your cart.');
        return;
    }

    let cartItemsContainer = document.querySelector('.cart-items');
    // Increment the cart item ID counter for the next item
    cartItemIdCounter++;

    let cartItemId = `cart-item-${cartItemIdCounter}`;
    cartItemsContainer.innerHTML += `
        <div id="${cartItemId}" class="cart-item" data-id="${id}" data-price="${price}" style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src="${image}" alt="product image" style="width: 50px; height: 50px; margin-right: 10px;">
            <div class="cart-item-details">
                <p> ${title}</p>
                <span style="display: block;">Price: Rs ${price}</span>
               <div class="quantity_increase">
                 <i class="fa-solid fa-minus fa-sm minus" ></i> 
                  <span class="quantity">1</span> <!-- This will display the quantity -->
                  <i class="fa-solid fa-plus fa-sm plus"></i> 
                  <button class="dltitem" style="margin-left: 10px;" onclick="removeFromCart('${cartItemId}','${id}','${price}')">Delete</button> 
               </div>
             </div>
        </div>
    `;

    // Increment the cart count
    cartCount++;
    // Update the cart count display
    document.getElementById('cart-count').textContent = cartCount;


    // Add the price of the newly added item to the total price
    totalPrice += parseInt(price);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    // Add the product ID to the Set
    addedProductIds.add(id);

    setupQuantityControls();
};

// Open cart sidebar
document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('active');
});

// Close cart sidebar
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');

});

// Cart quntity

// Function to set up quantity control event listeners
function setupQuantityControls() {
    document.querySelectorAll('.quantity_increase').forEach(container => {
        const quantityElement = container.querySelector('.quantity');
        const minusButton = container.querySelector('.minus');
        const plusButton = container.querySelector('.plus');
        const price = parseFloat(container.closest('.cart-item').dataset.price); // Use parseFloat to handle decimal values
        let quantity = parseInt(quantityElement.textContent);
        let totalPrice = parseFloat(document.getElementById('total-price').textContent);

        minusButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                totalPrice -= price;
            }
            else {
                totalPrice -= price;
                quantity = 0;
                container.closest('.cart-item').remove();
            }
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        });

        plusButton.addEventListener('click', () => {

            quantity++;
            totalPrice += price;
            quantityElement.textContent = quantity;
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        });

    });
}

// Carousel

let slideIndex = 1;
showSlides(slideIndex);

// Auto play slideshow
let slideInterval;

function startSlideInterval() {
    slideInterval = setInterval(function () {
        plusSlides(1);
    }, 2000); // Change 2000 to the desired interval in milliseconds (e.g., 3000 for 3 seconds)
}

function stopSlideInterval() {
    clearInterval(slideInterval);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Start autoplay when the page loads
window.onload = startSlideInterval;

// Pause autoplay when the user interacts with the slideshow
document.querySelectorAll('.prev, .next, .dot').forEach(function (element) {
    element.addEventListener('click', stopSlideInterval);
});



