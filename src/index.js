import "./style.css";
import noteFactory from "./note_factory";
import projectFactory from "./project_factory";

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

function renderProjectNotes(root, project) {
    root.textContent = "";

    const notes = project.getNotes();

    for (const note of notes) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-div");

        const noteTitle = document.createElement("div");
        noteTitle.classList.add("note-title");
        noteTitle.textContent = note.getInfo().title;

        const noteShowBtn = document.createElement("button");
        noteShowBtn.classList.add("note-snow-btn");
        noteShowBtn.type = "button";
        noteShowBtn.textContent = "Show";

        const notePriority = document.createElement("div");
        notePriority.classList.add("note-priority");
        notePriority.textContent = note.getInfo().priority;

        const noteDate = document.createElement("div");
        noteDate.classList.add("note-date");
        noteDate.textContent = note.getInfo().dueDate.toDateString();

        noteDiv.appendChild(noteTitle);
        noteDiv.appendChild(noteShowBtn);
        noteDiv.appendChild(notePriority);
        noteDiv.appendChild(noteDate);

        root.appendChild(noteDiv);
    }
}

function renderProjects(root, projectNotesRoot) {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const projectBtn = document.createElement("button");
        projectBtn.type = "button";
        projectBtn.classList.add("project");
        projectBtn.textContent = project.getTitle();
        projectBtn.dataset.id = i;

        projectBtn.addEventListener("click", () => renderProjectNotes(projectNotesRoot, project));

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
