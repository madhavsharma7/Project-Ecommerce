
let showproductdiv = document.querySelector("#all-products");
let cartCount = 0;
let cartItemIdCounter = 0;


let displayproducts = async () => {
    let response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
    finalproducts = await response.json(); 
    //  showproductdiv.innerHTML = '';
    finalproducts.forEach((element, index) => {
        showproductdiv.innerHTML += `
            <div class="product-items">
                <img src="${element.image}" alt="${element.title}">
                <h2>${element.title}</h2>
                <p>Price: Rs ${element.price}</p>
                <p>Rating: ${element.rating.rate}</p>
                <button class="addtocartbtn" data-index="${index}">Add to Cart</button>
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
}

displayproducts();

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
