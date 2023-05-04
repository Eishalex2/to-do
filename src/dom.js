import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import addTaskToProject from "./addToDo";

const projectList = document.getElementById('projects');

const defaultProject = CreateProject("Inbox");

projectList.appendChild(defaultProject.name);