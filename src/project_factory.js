export default function projectFactory(title) {
    const notes = [];
    const getNotes = () => notes;
    const addNote = note => {
        notes.push(note);
    }
    const getTitle = () => title;

    return {
        getNotes,
        addNote,
        getTitle,
    };
}
