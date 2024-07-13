document.getElementById('fetch-posts').addEventListener('click', () => { //obtener el botón fetch posts desde el dom y añadir event listener de click
    fetchPosts(); //ejecutar la función fetch posts
});

const fetchPosts = () => { //definir función flecha para obtener los posts
    fetch('https://jsonplaceholder.typicode.com/posts') //hacer el fecth a la url
        .then(response => { //se obtiene la respuesta del fetch
            if (!response.ok) { //si el atributo ok de la respuesta es false, se arroja un error
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); //de lo contrario, se parsea la respuesta a json
        })
        .then(posts => { //después de lo anterior, se obtienen los posts
            displayPosts(posts); //se ejecuta la función display posts con los posts como argumento
        })
        .catch(error => { //si hay cualquier error durante la ejecución del fetch, se maneja en este catch
            displayError(error); //se ejecuta la función display error
        });
};

const displayPosts = (posts) => { //función para mostrar posts, recibe posts como argumento
    const postList = document.getElementById('post-list'); //se obtiene la lista de posts desde el dom
    postList.innerHTML = ''; //se resetea la lista para evitar posibles duplicaciones cuando se vuelva a ejecutar la función
    posts.forEach(post => { //por cada post...
        const listItem = document.createElement('li'); //se crea un elemento list item en el dom
        listItem.textContent = `Title: ${post.title}`; //el texto del li es el título del post precedido de la palabra title
        postList.appendChild(listItem); //se añade el li a la lsita de posts
    });
};

const displayError = (error) => { //función para mostrar errores
    const errorMessage = document.getElementById('error-message'); //obtener el div con id error-message desde el dom
    errorMessage.textContent = `Error: ${error.message}`; //asignar el error como contenido de texto al div en el dom
};