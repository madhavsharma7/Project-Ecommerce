let showproductdiv = document.querySelector("#all-products");
let cartCount = 0;
let cartItemIdCounter = 0;

function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


let displayproducts = async () => {
    let response = await fetch("https://fakestoreapi.com/products/category/electronics");
    finalproducts = await response.json();

    finalproducts.forEach((element, index) => {
        showproductdiv.innerHTML += `
            <div class="product-items">
                <a href="../Single/single.html?id=${element.id}">
                    <img src="${element.image}" alt="${element.title}">
             
                  <h2>${element.title}</h2>
                  <p>Price: Rs ${element.price}</p>
                  <p>Rating: ${element.rating.rate}<span class="star"> * </span></p>
                  <button class="addtocartbtn" data-index="${index}">Add to Cart</button>
                </a>
            </div>`;
    });

    // Add event listeners to buttons
    document.querySelectorAll('.addtocartbtn').forEach(button => {
        button.addEventListener("click", () => {
            let index = button.getAttribute('data-index');
            let selectedProduct = finalproducts[index];
            if (selectedProduct) {
                addtocart(selectedProduct.image, selectedProduct.title, selectedProduct.price);
            } else {
                console.error(`Product at index ${index} is undefined`);
            }
        });
    });
};

displayproducts();

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
            <p><b>Rating:</b> ${finalProduct.rating.rate} (${finalProduct.rating.count} reviews)</p>
            <button class="addtocartbtn">Add to Cart</button>
        </div>
    </div>
    `;
    let addToCartButton = document.querySelector('.addtocartbtn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addtocart(finalProduct.image, finalProduct.title, finalProduct.price);
        });
    } else {
        console.error('Add to Cart button not found!');
    }
};

// Call the function directly
showProductDetails();

let removeFromCart = (cartItemId) => {
    let cartItem = document.getElementById(cartItemId);
    if (cartItem) {
        cartItem.remove();
        cartCount--;
        document.getElementById('cart-count').textContent = cartCount;
    }
};

let addtocart = (image, title, price) => {
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartItemId = `cart-item-${cartItemIdCounter}`;

    cartItemsContainer.innerHTML += `
        <div id="${cartItemId}" class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src="${image}" alt="product image" style="width: 50px; height: 50px; margin-right: 10px;">
            <div class="cart-item-details">
                <p>${title}</p>
                <span style="display: block;">Price: Rs ${price}</span>
            </div>
            <button class="dltitem" style="margin-left: 10px;" onclick="removeFromCart('${cartItemId}')">Delete</button>
        </div>
    `;

    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
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
