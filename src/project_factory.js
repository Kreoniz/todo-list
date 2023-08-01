export default function projectFactory(title) {
    const notes = [];

    const getTitle = () => title;

    const getNotes = () => notes;
    const addNote = note => {
        notes.push(note);
    }

    return {
        getTitle,
        getNotes,
        addNote,
    };
}
