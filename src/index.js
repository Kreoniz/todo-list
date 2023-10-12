import "./style.css";
import noteFactory from "./note_factory";
import projectFactory from "./project_factory";
import Cross from "./img/cross.svg";

const projects = [];

const defaultProject = projectFactory("Project");
const sampleNote = noteFactory("Sample Note", "sample note's description!", 3, new Date());
defaultProject.addNote(sampleNote);
projects.push(defaultProject);

const anotherProject = projectFactory("Another Project");
const anotherNote = noteFactory("Another Note", "Just an extra note for testing", 2, new Date());
anotherProject.addNote(sampleNote);
anotherProject.addNote(anotherNote);
projects.push(anotherProject);

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

function removeModal() {
    const modal = document.querySelector("#modal");
    root.removeChild(modal);
}

function validateProjectName(text) {
    let regex = /^[a-zA-Z0-9 ]+$/;
    if (regex.test(text)) {
        return true;
    }

    return false;
}

function renderModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modal";

    const mask = document.createElement("div");
    mask.classList.add("mask");
    mask.addEventListener("click", removeModal);
    
    const modalForm = document.createElement("form");
    modalForm.classList.add("modal-form");

    const heading = document.createElement("h2");
    heading.textContent = "Add project";
    modalForm.appendChild(heading);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close");
    closeBtn.type = "button";
    closeBtn.addEventListener("click", removeModal);

    const crossIcon = new Image();
    crossIcon.classList.add("cross-icon");
    crossIcon.src = Cross;
    closeBtn.appendChild(crossIcon);

    modalForm.append(closeBtn);

    const nameField = document.createElement("div");
    nameField.classList.add("project-name-field");
    const namePrompt = document.createElement("label");
    namePrompt.classList.add("project-name-prompt");
    namePrompt.textContent = "New project name:";
    namePrompt.htmlFor = "projectName";
    const nameInput = document.createElement("input");
    nameInput.classList.add("project-name-input");
    nameInput.type = "text";
    nameInput.name = "project-name";
    nameInput.id = "projectName";
    nameInput.maxLength = 16;
    nameField.appendChild(namePrompt);
    nameField.appendChild(nameInput);

    modalForm.appendChild(nameField);

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "submit";
    confirmBtn.classList.add("project-confirm-button");
    confirmBtn.textContent = "Confirm";
    confirmBtn.addEventListener("click", e => {
        e.preventDefault();

        const name = nameInput.value;

        if (validateProjectName(name)) {
            projects.push(projectFactory(nameInput.value));
            const projectNotes = document.querySelector("#notes");
            const projectsBlock = document.querySelector("#projects");
            renderProjects(projectsBlock, projectNotes);
            removeModal();
            renderProjectNotes(document.querySelector("#notes"),
                projects[projects.length - 1]);
        }

    });

    modalForm.appendChild(confirmBtn);

    modal.appendChild(mask);
    modal.appendChild(modalForm);

    root.appendChild(modal);
}

function renderNote(note) {
    noteInfoRoot.textContent = "";

    const noteInfo = document.createElement("div");
    noteInfo.classList.add("note");

    const noteTitle = document.createElement("div");
    noteTitle.textContent = note.title;
    noteTitle.classList.add("note-title");
    noteInfo.appendChild(noteTitle);

    const noteDescription = document.createElement("div");
    noteDescription.textContent = note.description;
    noteDescription.classList.add("note-description");
    noteInfo.appendChild(noteDescription);

    const notePriority = document.createElement("div");
    notePriority.textContent = note.priority;
    notePriority.classList.add("note-priority");
    noteInfo.appendChild(notePriority);

    const noteDate = document.createElement("div");
    noteDate.textContent = note.dueDate;
    noteDate.classList.add("note-date");
    noteInfo.appendChild(noteDate);

    noteInfoRoot.appendChild(noteInfo);
}

function renderProjectNotes(root, project) {
    root.textContent = "";

    const projectTitle = document.createElement("div");
    projectTitle.textContent = project.getTitle();
    projectTitle.classList.add("project-title");
    root.appendChild(projectTitle);

    const notes = project.getNotes();

    for (const note of notes) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-div");

        const projectNoteTitle = document.createElement("div");
        projectNoteTitle.classList.add("project-note-title");
        projectNoteTitle.textContent = note.getInfo().title;

        const noteShowBtn = document.createElement("button");
        noteShowBtn.classList.add("note-snow-btn");
        noteShowBtn.type = "button";
        noteShowBtn.textContent = "Show";
        noteShowBtn.addEventListener("click", () => renderNote(note.getInfo()));

        const notePriority = document.createElement("div");
        notePriority.classList.add("note-priority");
        notePriority.textContent = note.getInfo().priority;

        const noteDate = document.createElement("div");
        noteDate.classList.add("note-date");
        noteDate.textContent = note.getInfo().dueDate.toDateString();

        noteDiv.appendChild(projectNoteTitle);
        noteDiv.appendChild(noteShowBtn);
        noteDiv.appendChild(notePriority);
        noteDiv.appendChild(noteDate);

        root.appendChild(noteDiv);
    }

    const addNote = document.createElement("div");
    addNote.classList.add("note-div");

    const addNoteBtn = document.createElement("button");
    addNoteBtn.type = "button";
    addNoteBtn.classList.add("add-note-btn");
    addNoteBtn.textContent = "Add Note";

    addNote.appendChild(addNoteBtn);

    root.appendChild(addNote);
}

function renderProjects(root, projectNotesRoot) {
    root.textContent = "";

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const projectBtn = document.createElement("button");
        projectBtn.type = "button";
        projectBtn.classList.add("project");
        projectBtn.textContent = project.getTitle();
        projectBtn.dataset.id = i;

        projectBtn.addEventListener("click", () => {
            noteInfoRoot.textContent = "";
            renderProjectNotes(projectNotesRoot, project)
        });

        root.appendChild(projectBtn);
    }
}

function renderPage() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const mainHeading = document.createElement("h1");
    mainHeading.textContent = "TODOer";

    const projectsBlock = document.createElement("div");
    projectsBlock.id = "projects";

    const newProjectBtn = document.createElement("button");
    newProjectBtn.type = "button";
    newProjectBtn.classList.add("new-project-btn");
    newProjectBtn.textContent = "Add Project";
    newProjectBtn.addEventListener("click", renderModal);

    const content = document.createElement("div");
    content.classList.add("content");

    const projectNotes = document.createElement("div");
    projectNotes.classList.add("notes");
    projectNotes.id = "notes";

    const noteInfo = document.createElement("div");
    noteInfo.classList.add("note-info");
    noteInfo.id = "note-info";

    renderProjects(projectsBlock, projectNotes);
    
    sidebar.appendChild(mainHeading);
    sidebar.appendChild(projectsBlock);
    sidebar.appendChild(newProjectBtn);

    content.appendChild(projectNotes);
    content.appendChild(noteInfo);

    root.appendChild(sidebar);
    root.appendChild(content);
}

renderPage();
renderProjectNotes(document.querySelector("#notes"), defaultProject);

const noteInfoRoot = document.querySelector("#note-info");
