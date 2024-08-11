let showproductdiv = document.querySelector("#all-products");

let displayproducts = async () => {

  let product = await fetch("https://fakestoreapi.com/products");
  let finalproducts = await product.json();
  showproductdiv.innerHTML = ''; // Clear the container before adding new products

  finalproducts.forEach(element => {
    showproductdiv.innerHTML += `
  
                <div class="product-items">
                    <img src="${element.image}">
                    <h2>${element.title}</h2>
                    <p>Category: ${element.category}</p>
                    <p>Price: Rs ${element.price}</p>
                    <p>Rating: ${element.rating.rate}</p>
                </div>`;
  });

}

displayproducts();
