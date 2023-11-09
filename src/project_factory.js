export default function projectFactory(title) {
    let id = 0; 
    const notes = {};

    const getTitle = () => title;

    const getNotes = () => {
        return notes;
    }

    const addNote = (note) => {
        notes[id] = note;
        id++;
    }

    const deleteNote = (id) => {
        delete notes[id];
    }

    return {
        getTitle,
        getNotes,
        addNote,
        deleteNote,
    };
}
