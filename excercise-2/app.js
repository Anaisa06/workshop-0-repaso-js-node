class Note {
    constructor(id, description, isImportant = false) {
        this.id = id;
        this.description = description;
        this.isImportant = isImportant;
    }

    toggleImportant(){
        this.isImportant = !this.isImportant;
    }
}

class NoteManager {
    constructor(){
        this.notes = JSON.parse(localStorage.getItem('notes')) ||  [];
        this.renderNotes();
    }

    addNote(description){
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Note(id, description);
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    deleteNote(id){
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    updateNote(id, description){
        const note = this.notes.find(note => note.id === id);
        note.description = description;
        this.saveNotes();
        this.renderNotes();
    }

    toggleImportantNotes(id){
        const note = this.notes.find(note => note.id === id);

        if (note) {
            const importantNote = new Note(note.id, note.description, note.isImportant);
            importantNote.toggleImportant();
            this.notes = this.notes.map(note => (note.id === id ? importantNote : note));
            this.saveNotes();
            this.renderNotes();
        }
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    renderNotes(){
        const $notesList = document.getElementById('notes-list');
       $notesList.innerHTML = '';
        this.notes.forEach( note => {
            const item = document.createElement('LI');
            item.textContent = note.description;
            item.className = note.isImportant ? 'note-important' : '';

            const $importantButton = document.createElement('BUTTON');
            $importantButton.textContent = 'Importante';
            $importantButton.addEventListener('click', e => {
                e.stopPropagation();
                this.toggleImportantNotes(note.id);
            })

            const $deleteButton = document.createElement('BUTTON');
            $deleteButton.textContent = 'Eliminar';
            $deleteButton.addEventListener('click', e => {
                e.stopPropagation();
                this.deleteNote(note.id);
            })

            const $updateButton = document.createElement('BUTTON');
            $updateButton.textContent = 'Editar';
            $updateButton.addEventListener('click', e => {
                e.stopPropagation();
                const $newDescriptionField = document.createElement('INPUT');
                const $saveButton = document.createElement('BUTTON');
                $saveButton.textContent = 'Guardar';
                $saveButton.addEventListener('click', () => {
                    if ($newDescriptionField.value) {
                        this.updateNote(note.id, $newDescriptionField.value);
                    }
                });
                item.append($newDescriptionField, $saveButton);
            });
            
            item.append($importantButton, $deleteButton, $updateButton,);
            $notesList.appendChild(item);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();
    const $submitButton = document.getElementById('submit-btn');
    $submitButton.addEventListener('click', () => {
        const newNote = document.getElementById('new-note-input').value;
        if (newNote) {
            noteManager.addNote(newNote);
           document.getElementById('new-note-input').value = '';
        }
    });
});
