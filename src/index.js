import "./style.css";
import noteFactory from "./note_factory";
import projectFactory from "./project_factory";

const defaultProject = projectFactory("Project");
const sampleNote = noteFactory("Sample Note", "sample note's description!", 3, new Date());
defaultProject.addNote(sampleNote);
