import "./style.css";

function noteFactory(title, description, priority, dueDate) {
    return {
        title,
        description,
        priority,
        dueDate,
    };
}

function projectFactory(name) {
    const notes = [];
    const getNotes = () => notes;
    const addNote = note => {
        notes.push(note);
    }

    return {
        getNotes,
        addNote,
        name,
    };
}
