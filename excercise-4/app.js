const fetchApi = async (url) => {
    try {
        const response = await fetch(url);
        
        const data =  await response.json();
        return data;
    } catch (err){
        console.log("Error en fetch: ", err);
        alert("Hubo un error");
    }
};

const displayProducts = async (products) => {
    

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

const filterProducts = async () => {

    const categories = await fetchApi('https://api.escuelajs.co/api/v1/categories');
    const products = await fetchApi('https://api.escuelajs.co/api/v1/products');

    const $form = document.getElementById('filter-form');
    const $categorySelect = document.getElementById('select-category');
    const $searchButton = document.createElement('BUTTON');
    $searchButton.innerText = 'Buscar'
    
    categories.forEach(category => {
        const $option = document.createElement('OPTION');
        $option.value = category.name;
        $option.innerText = category.name;

        $categorySelect.appendChild($option);
    });

    $form.appendChild($categorySelect);  
    $form.appendChild($searchButton);
    displayProducts(products);
    
    $searchButton.addEventListener('click', event => {
        event.preventDefault();
        const $cards =  document.getElementById('products-container');
        $cards.innerHTML = '';
        if ($categorySelect.value !== 'all') {           
            const $filteredProducts = products.filter(product => product.category.name === $categorySelect.value);
            displayProducts($filteredProducts);                        
        } else {
            displayProducts(products);
        }
    })
}

filterProducts();