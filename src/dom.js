import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import addTaskToProject from "./addToDo";

const projectDisplay = document.getElementById('projects');
const taskDisplay = document.getElementById('tasks');

let currentProject;

// function projectPopup() {
//   const projectPopupDiv = document.createElement('div');
//   projectPopupDiv.classList.add('popup');
//   const projectNameInput = document.createElement('input');
//   projectNameInput.setAttribute('type', 'text');
//   projectPopupDiv.appendChild(projectNameInput);

//  // projectNameInput.addEventListener()

//   return projectPopupDiv;
// }

function createProjectAdd() {
  const newProjectArea = document.createElement('div');

  const newProjectBtn = document.createElement('button');
  newProjectBtn.classList.add('new-project');
  newProjectBtn.classList.add('popup');
  newProjectBtn.classList.toggle('popup');
  newProjectBtn.textContent = '+ New Project';

  const projectPopupDiv = document.createElement('div');
  projectPopupDiv.classList.add('popup');
  const projectNameInput = document.createElement('input');
  projectNameInput.setAttribute('type', 'text');
  projectPopupDiv.appendChild(projectNameInput);

  newProjectArea.appendChild(newProjectBtn);
  newProjectArea.appendChild(projectPopupDiv);
  projectDisplay.appendChild(newProjectArea);

  newProjectBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('popup');
    e.target.nextElementSibling.classList.toggle('popup');
  });

  projectNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (projectNameInput.value === '') {
        e.target.parentElement.classList.toggle('popup');
        e.target.parentElement.previousElementSibling.classList.toggle('popup');
      } else {
        newProjectArea.remove();
        projectsUI(CreateProject(e.target.value));
        createProjectAdd();
      }
    }
  })
}

function createTaskAdd() {
  const newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('new-task');
  newTaskBtn.textContent = '+ Add Task';
  taskDisplay.appendChild(newTaskBtn);
}

function projectsUI(project) {
  // things are getting too complicated. Focusing on adding new projects
  // now. Will need to figure out how to change the name of existing
  // projects later.
  const projectArea = document.createElement('div');

  const projectBtn = document.createElement('button');
  projectBtn.classList.add('project');
  projectBtn.classList.add('popup');
  projectBtn.classList.toggle('popup');
  projectBtn.textContent = project.name;

  const projectPopupDiv = document.createElement('div');
  projectPopupDiv.classList.add('popup');
  const projectNameInput = document.createElement('input');
  projectNameInput.setAttribute('type', 'text');
  projectPopupDiv.appendChild(projectNameInput);

  projectArea.appendChild(projectBtn);
  projectArea.appendChild(projectPopupDiv);
  projectDisplay.appendChild(projectArea);
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

function domLogic() {

}

export { pageLoad };