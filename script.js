let showproductdiv = document.querySelector("#all-products");
let cartCount = 0;
let cartItemIdCounter = 0; 

let displayproducts = async () => {
    let product = await fetch("https://fakestoreapi.com/products");
    let finalproducts = await product.json();
    showproductdiv.innerHTML = ''; // Clear the container before adding new products
    finalproducts.forEach(element => {
        showproductdiv.innerHTML += `
                    <div class="product-items">
                        <img src="${element.image}" alt="${element.title}" style="width: 150px; height: 150px;">
                        <h2>${element.title}</h2>
                        <p>${element.category}</p>
                        <p>Price: Rs ${element.price}</p>
                        <p>Rating: ${element.rating.rate}</p>
                        <button class="addtocartbtn">Add to Cart</button> 
                    </div>`;
    });

    document.querySelectorAll('.addtocartbtn').forEach((button, index) => {
        button.addEventListener("click", () => {
            let selectedProduct = finalproducts[index];
            addtocart(selectedProduct.image, selectedProduct.title, selectedProduct.price);
        });
    });
}

displayproducts();

let removeFromCart = (cartItemId) => {
    // console.log(`Attempting to remove item with ID: ${cartItemId}`); // Debugging

    // Find the cart item by its ID and remove it
    let cartItem = document.getElementById(cartItemId);
    // console.log(cartItem); // Check if cartItem is found
    if (cartItem) {
        cartItem.remove();
        // console.log(`Removed item with ID: ${cartItemId}`); // Debugging

        // Decrement the cart count and update the display
        cartCount--;
        document.getElementById('cart-count').textContent = cartCount;
    } else {
        // console.log(`Item with ID: ${cartItemId} not found`); // Debugging
    }
};

let addtocart = (image, title, price) => {
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartItemId = `cart-item-${cartItemIdCounter}`;
    
    cartItemsContainer.innerHTML += `
        <div id="${cartItemId}" class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src="${image}" alt="product image" style="width: 50px; height: 50px; margin-right: 10px;">
            <div class="cart-item-details">
                <p> ${title}</p>
                <span style="display: block;">Price: Rs ${price}</span>
            </div>
            <button class="dltitem" style="margin-left: 10px;" onclick="removeFromCart('${cartItemId}')">Delete</button>
        </div>
    `;
    
    // Increment the cart count
    cartCount++;
    
    // Update the cart count display
    document.getElementById('cart-count').textContent = cartCount;

    // Increment the cart item ID counter for the next item
    cartItemIdCounter++;
};

// Open cart sidebar
document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('active');
});

// Close cart sidebar
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
});





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