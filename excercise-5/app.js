const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

document.addEventListener('DOMContentLoaded', () => {
    const $root = document.getElementById('root');
    const totalPrice = products.reduce((acum, product) => acum + product.price, 0);

    $root.innerHTML = `
    <h1>Tienda Arrays</h1>
    <h2>Precio total: $${totalPrice}</h2>
    <input type="text" id="name-input" placeholder="Nombre del producto...">
    <button type="submit" id="name-button">Buscar</button><br>
    <select name="category" id="category-select">
        <option value="" disabled selected>-- Selecciona la categoría --</option>
        <option value="all" >Todos</option>
    </select>
    <button type="submit" id="select-button">Buscar</button><br>
    <button type="button" id="check-stock">Verificar disponibilidad</button>    
    <hr>
    <h2>Productos</h2>
    <div id="products-container"></div>
    `;

    const categoriesList = [... new Set(products.map (product => product.category))];
    categoriesList.forEach(category => {
        const $categorySelect = document.getElementById('category-select');
        const $option = document.createElement('OPTION');
        $option.value = category;
        $option.innerText = category;        
        $categorySelect.appendChild($option);
    });

    displayProducts(products);

    //Filter by category
    const $selectButton = document.getElementById('select-button');
    $selectButton.addEventListener('click', event => {
        event.preventDefault();
        const $categorySelectValue = document.getElementById('category-select').value;
        categoryFilter(products, $categorySelectValue);
    })

    //Filter by name
    const $nameButton = document.getElementById('name-button');
    $nameButton.addEventListener('click', event => {
        event.preventDefault();
        const $nameInputValue = document.getElementById('name-input').value;
        nameFilter(products, $nameInputValue);
    })

    //Verificar stock
    const $checkStockButton = document.getElementById('check-stock');
    $checkStockButton.addEventListener('click', event => {
        event.preventDefault();
        checkStock(products);
    })
})

const displayProducts = (productsList) => {

    const $container = document.getElementById('products-container');
    $container.innerHTML = '';

    productsList.map(product => {
        const $card = document.createElement('DIV');
        $card.classList.add('card');
        $card.innerHTML = `
        <hr>
        <h3>${product.name}</h3>
        <hr>
        <p>Precio: $${product.price}</p>
        <p>Categoría: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        `;
        $container.appendChild($card);
    })
}

const categoryFilter = (productsList, category) => {
    if (category !== 'all') {
        const filteredProducts = productsList.filter(product => product.category === category);
        displayProducts(filteredProducts);
    } else {
        displayProducts(productsList);
    }    
}

const nameFilter = (productsList, productName) => {
    const product = productsList.find(product => product.name.toLowerCase() === productName.toLowerCase());
    if (product) {
        displayProducts([product]);
    } else {
        alert('No se encontró un producto con ese nombre');
    }
}

const checkStock = (productsList) => {
    const areAvailable = productsList.every(product => product.stock !== 0);
    if (areAvailable) {
        alert('Todos los productos están disponibles');
    } else {
        alert('Algunos productos no están disponibles');
    }
}
