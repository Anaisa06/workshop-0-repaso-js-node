class Note { //Define la clase note
    constructor(id, description, isImportant = false) { //Define los parámetros que recibe la clase
        this.id = id;
        this.description = description;
        this.isImportant = isImportant;
    }

    toggleImportant(){ //Función de la clase note
        this.isImportant = !this.isImportant; //Cambia la característica 'isImportant' de la clase note a true o false
    }
}

class NoteManager { //Define la clase note manager para manejar las notas
    constructor(){ //Define funciones y atributos para la clase
        this.notes = JSON.parse(localStorage.getItem('notes')) ||  []; //Asigna el item notes del localStorage al atributo notes, en caso de que no exista, se asigna un array vacio
        this.renderNotes(); //Se ejecuta la función de renderizar cada que se define una instancia de la clase
    }

    addNote(description){ //función para añadir una nota
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1; //Si la lista no está vacía, el id es el largo de la lista +1, en caso contrario, el id es 1
        const note = new Note(id, description); //Crea una instacia de la clase note
        this.notes.push(note); //Agrega la nueva nota a la lista de  notas
        this.saveNotes(); //Guarda en local storage
        this.renderNotes(); //Muestra en la página
    }

    deleteNote(id){ //Función para eliminar notas
        this.notes = this.notes.filter(note => note.id !== id); //Reasigna a la lista de notas todas las notas excepto la nota con el id que se desea eliminar
        this.saveNotes();
        this.renderNotes();
    }

    updateNote(id, description){ //funciñon para editar notas
        const note = this.notes.find(note => note.id === id); //busca la nota en cuestión por medio de id
        note.description = description; //reasigna la nueva descripción a la nota
        this.saveNotes();
        this.renderNotes();
    }

    toggleImportantNotes(id){ //función para marcar una nota como importante
        const note = this.notes.find(note => note.id === id); //busca la nota en cuestión por medio de id

        if (note) { //Si la nota existe...
            const importantNote = new Note(note.id, note.description, note.isImportant); //crea una nueva instancia de note con los datos  de la nota encontrada
            importantNote.toggleImportant(); //ejecuta la función para cambiar el estado en la nueva instancia
            this.notes = this.notes.map(note => (note.id === id ? importantNote : note)); //por cada nota, busca la que coincida con el id de la nota que se desea cambiar y la reemplaza por la nueva instancia de nota. Si el id no coincide, la nota no varía
            this.saveNotes();
            this.renderNotes();
        }
    }

    saveNotes(){ //función para guardar notas
        localStorage.setItem('notes', JSON.stringify(this.notes)); //guarda la lista de notas en el local storage haciendo un parseo a json
    }

    renderNotes(){ //función para mostrar las notas en el dom
        const $notesList = document.getElementById('notes-list'); //obtener la lista de notas desde el html
       $notesList.innerHTML = ''; //resetear la lista de notas para impedir duplicados cada que se ejecute la función
        this.notes.forEach( note => { //por cada elemento del array notes...
            const item = document.createElement('LI'); //crear un elemento list item
            item.textContent = note.description; //el elemento li tendrá como texto la descripción de la nota
            item.className = note.isImportant ? 'note-important' : ''; //si el atributo isImportant es true, se añade la clase 'note-important'

            const $importantButton = document.createElement('BUTTON'); //crear un botón para cambiar el atributo isImportant
            $importantButton.textContent = 'Importante'; //texto del botón
            $importantButton.addEventListener('click', e => { //event listener al botón 
                e.stopPropagation(); //para que el evento no se propague a su padre
                this.toggleImportantNotes(note.id); //ejecutar la función para cambiar el atributo is important, se envia como argumento el id de la nota en cuestión
            })

            const $deleteButton = document.createElement('BUTTON'); //crear un botón para eliminar la nota
            $deleteButton.textContent = 'Eliminar'; //texto del botón
            $deleteButton.addEventListener('click', e => { //event listener al botón
                e.stopPropagation(); //para que el evento no se propague a su padre
                this.deleteNote(note.id); //se ejecuta la función de eliminar la nota.
            })

            const $updateButton = document.createElement('BUTTON'); //crear un botón para actualizar la nota
            $updateButton.textContent = 'Editar'; //texto del botón
            $updateButton.addEventListener('click', e => { //event listener al botón
                e.stopPropagation(); //para que el evento no se propague a su padre
                const $newDescriptionField = document.createElement('INPUT'); //cuando se hace click al botón, se crea un campo de texto
                const $saveButton = document.createElement('BUTTON'); //cuando se hace click al botón, se crea un nuevo botón
                $saveButton.textContent = 'Guardar'; //texto del nuevo botón
                $saveButton.addEventListener('click', () => { //event listener al botón
                    if ($newDescriptionField.value) { //si el campo de texto no está vacio
                        this.updateNote(note.id, $newDescriptionField.value); //se ejecuta la función de actualizar la nota
                    }
                });
                item.append($newDescriptionField, $saveButton); //se añaden los nuevos botones al item de la lista en cuestión
            });
            
            item.append($importantButton, $deleteButton, $updateButton,); //se añaden los nuevos botones al item de la lista en cuestión
            $notesList.appendChild(item); //se añade el item a la lista de notas
        })
    }
}

document.addEventListener('DOMContentLoaded', () => { //event listener para cuando cargue el dom en el navegador
    const noteManager = new NoteManager(); //se crea nueva instancia de note manager
    const $submitButton = document.getElementById('submit-btn'); //se obtiene el botón de guardar desde el dom
    $submitButton.addEventListener('click', () => { //event listener al botón
        const newNote = document.getElementById('new-note-input').value; //se obtiene el texto del input para una nueva nota desde el dom
        if (newNote) { //si el campo no está vacío...
            noteManager.addNote(newNote); //se ejecuta la función de añadir nota con los datos ingresados por el usuario
           document.getElementById('new-note-input').value = ''; //se resetea el texto del campo de texto.
        }
    });
});
