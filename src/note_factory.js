export default function noteFactory(title, description, priority, dueDate) {
    const setTitle = (newTitle) => {
        title = newTitle;
    }

    const getTitle = () => title;
    const getDescription = () => description;
    const getPriority = () => priority;
    const getDueDate = () => dueDate;

    const getInfo = () => {
        return {
            title,
            description,
            priority,
            dueDate,
        }
    }

    return {
        getInfo,
        getTitle,
        getDescription,
        getPriority,
        getDueDate,
        setTitle,
    };
}
