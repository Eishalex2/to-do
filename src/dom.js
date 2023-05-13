import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import { addTaskToProject, addProjectToList, getProjectList } from "./addToDo";

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
        const newProject = CreateProject(e.target.value);
        currentProject = newProject;
        addProjectToList(newProject);

        const previousProject = document.querySelector('.current-project');
        previousProject.classList.remove('current-project');
        projectsUI(newProject);
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
        const newTask = CreateTask(titleInput.value, descriptionInput.value, priorityInput.value);
        console.log(newTask);
        addTaskToProject(newTask, currentProject);
        console.log(currentProject.taskList);
        tasksUI(newTask);
        createTaskAdd();
      }
    }
  })
}

function projectsUI(project) {
  const projectArea = document.createElement('div');

  const projectVisible = document.createElement('div');
  const projectBtn = document.createElement('div');
  projectVisible.classList.add('current-project');
  projectVisible.classList.add('project');
  projectVisible.classList.add('popup');
  projectVisible.classList.toggle('popup');
  projectBtn.textContent = project.name;

  const icons = document.createElement('div');
  icons.classList.add('project-icons');

  const editIcon = document.createElement('img');
  editIcon.src = "images/edit.svg";
  icons.appendChild(editIcon);

  const trashIcon = document.createElement('img');
  trashIcon.src = "images/trash.svg";
  icons.appendChild(trashIcon);

  projectVisible.appendChild(projectBtn);
  projectVisible.appendChild(icons);

  const projectPopupDiv = document.createElement('div');
  projectPopupDiv.classList.add('popup');
  const projectNameInput = document.createElement('input');
  projectNameInput.setAttribute('type', 'text');
  projectNameInput.value = project.name;
  projectPopupDiv.appendChild(projectNameInput);

  projectArea.appendChild(projectVisible);
  projectArea.appendChild(projectPopupDiv);
  projectDisplay.appendChild(projectArea);

  projectVisible.addEventListener('click', (e) => {
    taskDisplay.textContent = '';
    currentProject = project;
    const previousProject = document.querySelector('.current-project');
    previousProject.classList.remove('current-project');
    e.target.classList.add('current-project');
    project.taskList.forEach(task => tasksUI(task));
    createTaskAdd();
  })


// edit project
  editIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    projectVisible.classList.toggle('popup');
    projectPopupDiv.classList.toggle('popup');
  })

  
  projectPopupDiv.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (projectNameInput.value === '') {
        projectArea.remove();
      } else {
        project.changeName = projectNameInput.value;
        projectBtn.textContent = project.name;
        projectPopupDiv.classList.toggle('popup');
        projectVisible.classList.toggle('popup');
        // console.log(getProjectList());
      }
    }
  });

  // delete project
  trashIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectList = getProjectList();
    const index = projectList.findIndex(x => x.name === project.name);
    if (index > -1) {
      projectList.splice(index, 1);
    }
    projectArea.remove();
  })
}

function tasksUI(task) {
  const taskBtn = document.createElement('button');
  taskBtn.classList.add('task');
  taskBtn.textContent = task.title;
  taskBtn.setAttribute('data-description', task.description);
  taskBtn.setAttribute('data-priority', task.priority);
  taskBtn.setAttribute('data-project', currentProject.name);
  taskDisplay.appendChild(taskBtn);
}

// function for showing tasks, switching projects. To remove children,
// set textcontent to "";

function pageLoad() {
  // projects
  const defaultProject = CreateProject('Inbox');
  addProjectToList(defaultProject);
  projectsUI(defaultProject);
  currentProject = defaultProject;
  createProjectAdd();

  // tasks
  defaultProject.taskList.forEach(task => tasksUI(task));
  createTaskAdd();
}

export { pageLoad };