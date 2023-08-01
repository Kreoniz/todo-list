export default function noteFactory(title, description, priority, dueDate) {
    const getInfo = () => {
        return {
            title,
            description,
            priority,
            dueDate,
        }
    }

    const setTitle = (newTitle) => {
        title = newTitle;
    }

    return {
        getInfo,
        setTitle,
    };
}
