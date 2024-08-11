let showproductdiv = document.querySelector("#all-products");

let displayproducts = async () => {

    let response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
    let products = await response.json();
    showproductdiv.innerHTML = '';

    products.forEach(element => {
        showproductdiv.innerHTML += `
                <div class="product-items">
                    <img src="${element.image}">
                    <h2> ${element.title} </h2>
                    <p> Price: Rs ${element.price} </p>
                    <p> Rating: ${element.rating.rate} </p>
                </div>`;
    });

}

displayproducts();
