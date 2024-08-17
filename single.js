document.addEventListener("DOMContentLoaded", () => {
    let showProductDetails = async () => {
        let product = await fetch("https://fakestoreapi.com/products/1");
        let finalProduct = await product.json();

        let productDetailsDiv = document.getElementById('product-details');
        productDetailsDiv.innerHTML = `
            <img src="${finalProduct.image}" alt="${finalProduct.title}">
            <h2>${finalProduct.title}</h2>
            <p>Category: ${finalProduct.category}</p>
            <p>Description: ${finalProduct.description}</p>
            <p>Price: Rs ${finalProduct.price}</p>
            <p>Rating: ${finalProduct.rating.rate} (${finalProduct.rating.count} reviews)</p>
            <button class="addtocartbtn">Add to Cart</button>
        `;

        document.querySelector('.addtocartbtn').addEventListener("click", () => {
            addtocart(finalProduct.image, finalProduct.title, finalProduct.price);
        });
    }

    showProductDetails();
});

// Example function for adding to cart
function addtocart(image, title, price) {
    alert(`Added ${title} to cart.`);
    // You can expand this function to actually add products to the cart
}
