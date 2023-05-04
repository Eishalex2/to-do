import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import addTaskToProject from "./addToDo";

const projectList = document.getElementById('projects');

const defaultProject = CreateProject("Inbox");

projectList.appendChild(defaultProject.name); // can't append just the name. Instead, append a button, with the text content as the name!!