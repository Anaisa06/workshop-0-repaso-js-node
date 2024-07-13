const fetchProducts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => {
            if (!response.ok){
                throw new Error("Couldn't fetch products" + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayProducts = (products) => {
    const $productsContainer = document.getElementById('products-container');
    products.forEach(product => {        
        const $card = document.createElement('DIV');
        $card.className = 'card';
        $card.innerHTML = `
        <div class="img-container">
            <img src="${product.images[1]}">
        </div>        
        <h3>${product.title}</h3>        
        <p> Precio: $${product.price}</p>
        <p> Categoría: ${product.category.name}</p>
        `

        $productsContainer.appendChild($card);
    })
}

fetchProducts();