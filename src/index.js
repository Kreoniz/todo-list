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
defaultProject.addNote(sampleNote);
defaultProject.addNote(anotherNote);
projects.push(anotherProject);

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

function renderProjects(root) {
    for (let project of projects) {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.textContent = project.getTitle();

        root.appendChild(projectDiv);
    }
}

function renderPage() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const mainHeading = document.createElement("h1");
    mainHeading.textContent = "TODOer";

    const projectsBlock = document.createElement("div");
    projectsBlock.id = "projects";

    renderProjects(projectsBlock);
    
    const newProjectBtn = document.createElement("button");
    newProjectBtn.type = "button";
    newProjectBtn.classList.add("new-project-btn");
    newProjectBtn.textContent = "Add Project";

    sidebar.appendChild(mainHeading);
    sidebar.appendChild(projectsBlock);
    sidebar.appendChild(newProjectBtn);

    const content = document.createElement("div");
    content.classList.add("content");

    root.appendChild(sidebar);
    root.appendChild(content);
}

renderPage();
