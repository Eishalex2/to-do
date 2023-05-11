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
  const newTaskArea = document.createElement('div');

  const newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('new-task');
  newTaskBtn.classList.add('popup');
  newTaskBtn.classList.toggle('popup');
  newTaskBtn.textContent = '+ Add Task';

  const taskPopupDiv = document.createElement('div');
  taskPopupDiv.classList.add('task-edit');
  taskPopupDiv.classList.add('popup');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  const descriptionInput =document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  const priorityInput = document.createElement('input');
  priorityInput.setAttribute('type', 'number');
  priorityInput.setAttribute('min', 0);
  priorityInput.setAttribute('max', 10);
  priorityInput.setAttribute('value', 0);

  taskPopupDiv.appendChild(titleInput);
  taskPopupDiv.appendChild(descriptionInput);
  taskPopupDiv.appendChild(priorityInput);

  newTaskArea.appendChild(newTaskBtn);
  newTaskArea.appendChild(taskPopupDiv);

  taskDisplay.appendChild(newTaskArea);

  newTaskBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('popup');
    e.target.nextElementSibling.classList.toggle('popup');
  });

  taskPopupDiv.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (titleInput.value === '') {
        e.target.parentElement.classList.toggle('popup');
        console.log(e.target.parentElement.previousElementSibling.classList.toggle('popup'));
      } else {
        newTaskArea.remove();
        tasksUI(CreateTask(titleInput.value, descriptionInput.value, priorityInput.value));
        createTaskAdd();
      }
    }
  })
}

function projectsUI(project) {
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

  projectBtn.addEventListener('click', () => {
    project.taskList.forEach(task => tasksUI(task));
  })
}

function tasksUI(task) {
  const taskBtn = document.createElement('button');
  taskBtn.classList.add('task');
  taskBtn.textContent = task.title;
  taskBtn.setAttribute('data-description', task.description);
  taskBtn.setAttribute('data-priority', task.priority);
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