const projectDisplay = document.getElementById('projects');
const taskDisplay = document.getElementById('tasks');
let currentProject;

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
        const newProject = projects.addProject(e.target.value);
        currentProject = newProject;
        console.log(projects.projectList);

        // const previousProject = document.querySelector('.current-project');
        // previousProject.classList.remove('current-project');
        // projectsUI(newProject);
        // createProjectAdd();

        // taskDisplay.textContent = '';
        // currentProject.tasks.forEach(task => tasksUI(task));
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
  const dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');
  const descriptionInput =document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  const priorityInput = document.createElement('input');
  priorityInput.setAttribute('type', 'number');
  priorityInput.setAttribute('min', 0);
  priorityInput.setAttribute('max', 3);
  priorityInput.setAttribute('value', 0);

  taskPopupDiv.appendChild(titleInput);
  taskPopupDiv.appendChild(dateInput);
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
        const newTask = CreateTask(titleInput.value, dateInput.value, descriptionInput.value, priorityInput.value);
        console.log(newTask);
        addTaskToProject(newTask, currentProject);
        console.log(currentProject.taskList);
        tasksUI(newTask);
        createTaskAdd();
      }
    }
  })
}

function showProjects(projectListLength) {

  localStorage.setItem('projects', JSON.stringify(projectList));

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

  // prevents clicking on project name from switching the current project
  projectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  projectVisible.addEventListener('click', (e) => {
    taskDisplay.textContent = '';
    currentProject = project;
    const previousProject = document.querySelector('.current-project');
    previousProject.classList.remove('current-project');
    e.target.classList.add('current-project');
    currentProject.taskList.forEach(task => tasksUI(task));
    currentProject.completedTasks.forEach(task => completedTasksUI(task));
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
    const index = projectList.findIndex(x => x.name === project.name);
    if (index > -1) {
      projectList.splice(index, 1);
    }
    projectArea.remove();
  })
}

function completedTasksUI(task) {
  const taskArea = document.createElement('div');
  taskArea.classList.add('task-areas');
  taskArea.classList.add('task-complete');

  const taskVisible = document.createElement('div');
  const taskBtn = document.createElement('div');
  taskVisible.classList.add('task');
  taskBtn.textContent = task.title;

  const checkedIcon = document.createElement('img');
  checkedIcon.src = "images/checkmark-circle.svg";

  const taskDate = document.createElement('div');
  if (task.dueDate === '') {
    taskDate.textContent = '';
  } else {
    taskDate.textContent = format(new Date(task.dueDate), 'PP');
  }

  const index = currentProject.completedTasks.findIndex(x => x.title === task.title);
  taskArea.setAttribute('data-index', index);
  taskArea.setAttribute('data-project', currentProject.name);
  
  taskVisible.appendChild(checkedIcon);
  taskVisible.appendChild(taskBtn);
  taskVisible.appendChild(taskDate);

  taskArea.appendChild(taskVisible);

  taskDisplay.appendChild(taskArea);

  checkedIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    undoComplete(task, currentProject, taskArea.getAttribute('data-index'));
    taskDisplay.textContent = '';
    currentProject.taskList.forEach(item => tasksUI(item));
    currentProject.completedTasks.forEach(item => completedTasksUI(item));
    createTaskAdd();
  })
}

function tasksUI(task) {
  const taskArea = document.createElement('div');
  taskArea.classList.add('task-areas');

  const taskVisible = document.createElement('div');
  const taskBtn = document.createElement('div');
  taskVisible.classList.add('task');
  taskBtn.textContent = task.title;

  const taskDate = document.createElement('div');
  if (task.dueDate === '') {
    taskDate.textContent = '';
  } else {
    taskDate.textContent = format(new Date(task.dueDate), 'PP');
  }
  
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
  taskVisible.appendChild(taskDate);
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

  circleIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    completeTask(task, currentProject, taskArea.getAttribute('data-index'));
    taskDisplay.textContent = '';
    currentProject.taskList.forEach(item => tasksUI(item));
    currentProject.completedTasks.forEach(item => completedTasksUI(item));
    createTaskAdd();
  })
}

// function for showing tasks, switching projects. To remove children,
// set textcontent to "";