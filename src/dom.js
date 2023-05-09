import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import addTaskToProject from "./addToDo";

const projectDisplay = document.getElementById('projects');
const taskDisplay = document.getElementById('tasks');

let currentProject;

function createProjectAdd() {
  const newProjectBtn = document.createElement('button');
  newProjectBtn.classList.add('new-project');
  newProjectBtn.textContent = '+ New Project';
  projectDisplay.appendChild(newProjectBtn);
}

function createTaskAdd() {
  const newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('new-task');
  newTaskBtn.textContent = '+ Add Task';
  taskDisplay.appendChild(newTaskBtn);
}

function projectsUI(project) {
  const projectBtn = document.createElement('button');
  projectBtn.classList.add('project');
  projectBtn.textContent = project.name;
  projectDisplay.appendChild(projectBtn);
}

function tasksUI(task) {
  const taskBtn = document.createElement('button');
  taskBtn.classList.add('task');
  taskBtn.textContent = task.title;
  taskDisplay.appendChild(taskBtn);
}

// function for showing tasks, switching projects. To remove children,
// set textcontent to "";

function pageLoad() {
  // projects
  const defaultProject = CreateProject('Inbox');
  currentProject = defaultProject;
  projectsUI(defaultProject);
  createProjectAdd();

  // tasks
  defaultProject.taskList.forEach(task => tasksUI(task));
  createTaskAdd();
}

export { pageLoad };