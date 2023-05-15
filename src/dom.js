import CreateProject from "./createProject";
import { CreateTask, editTask } from "./createToDo";
import { addTaskToProject, addProjectToList, getProjectList, deleteTask, completeTask } from "./addToDo";

const projectDisplay = document.getElementById('projects');
const taskDisplay = document.getElementById('tasks');
let currentProject;

// function updateIndices(project) {
//   const taskAreas = document.getElementsByClassName('task-areas');
//   const taskAreasArray = [...taskAreas];
//   taskAreasArray.forEach(area => area.setAttribute('data-index', ))
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

        taskDisplay.textContent = '';
        currentProject.taskList.forEach(task => tasksUI(task));
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
  priorityInput.setAttribute('max', 3);
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
        const projectList = getProjectList(); 
        const index = projectList.findIndex(x => x.name === project.name);
        if (index >= -1) {
          projectList.splice(index, 1);
        }
        projectArea.remove();

      } else {
        project.changeName = projectNameInput.value;
        projectBtn.textContent = project.name;
        projectPopupDiv.classList.toggle('popup');
        projectVisible.classList.toggle('popup');
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
  const taskArea = document.createElement('div');
  taskArea.classList.add('task-areas');

  const taskVisible = document.createElement('div');
  const taskBtn = document.createElement('div');
  taskVisible.classList.add('task');
  taskBtn.textContent = task.title;

  const circleIcon = document.createElement('img');
  circleIcon.src = "images/circle.svg";

  const icons = document.createElement('div');
  icons.classList.add('task-icons');

  const editIcon = document.createElement('img');
  editIcon.src = "images/edit.svg";
  icons.appendChild(editIcon);

  const trashIcon = document.createElement('img');
  trashIcon.src = "images/trash.svg";
  icons.appendChild(trashIcon);

  const index = currentProject.taskList.findIndex(x => x.title === task.title);
  taskArea.setAttribute('data-index', index);
  taskArea.setAttribute('data-project', currentProject.name);
  
  taskVisible.appendChild(circleIcon);
  taskVisible.appendChild(taskBtn);
  taskVisible.appendChild(icons);

  taskArea.appendChild(taskVisible);

  const taskPopupDiv = document.createElement('div');
  taskPopupDiv.classList.add('task-edit');
  taskPopupDiv.classList.add('popup');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.value = task.title;
  const descriptionInput =document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.value = task.description;
  const priorityInput = document.createElement('input');
  priorityInput.setAttribute('type', 'number');
  priorityInput.setAttribute('min', 0);
  priorityInput.setAttribute('max', 3);
  priorityInput.value = task.priority;

  taskPopupDiv.appendChild(titleInput);
  taskPopupDiv.appendChild(descriptionInput);
  taskPopupDiv.appendChild(priorityInput);

  taskArea.appendChild(taskPopupDiv);

  taskDisplay.appendChild(taskArea);

  editIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    taskVisible.classList.toggle('popup');
    taskPopupDiv.classList.toggle('popup');
  })

  taskPopupDiv.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // trash functionality

      editTask(task, titleInput.value, descriptionInput.value, priorityInput.value);
      taskBtn.textContent = task.title;

      taskPopupDiv.classList.toggle('popup');
      taskVisible.classList.toggle('popup');
    }
  })

  trashIcon.addEventListener('click', () => {
    deleteTask(currentProject, taskArea.getAttribute('data-index'));
    taskDisplay.textContent = '';
    currentProject.taskList.forEach(item => tasksUI(item));
    createTaskAdd();
  })
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
  const task0 = CreateTask('Testing', 'description test', 0);
  addTaskToProject(task0, defaultProject);
  defaultProject.taskList.forEach(task => tasksUI(task));
  createTaskAdd();
}

export { pageLoad };