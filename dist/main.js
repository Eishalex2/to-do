/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addToDo.js":
/*!************************!*\
  !*** ./src/addToDo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectToList": () => (/* binding */ addProjectToList),
/* harmony export */   "addTaskToProject": () => (/* binding */ addTaskToProject),
/* harmony export */   "completeTask": () => (/* binding */ completeTask),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "getProjectList": () => (/* binding */ getProjectList),
/* harmony export */   "undoComplete": () => (/* binding */ undoComplete)
/* harmony export */ });
function addTaskToProject(task, project) {
  project.taskList.push(task);
  return project.taskList;
}

const projectList = [];
function addProjectToList(project) {
  const projectName = project.name;
  const projectTaskList = project.taskList;
  projectList.push({name: projectName, list: projectTaskList});
}

function getProjectList() {
  return projectList;
}

function deleteTask(project, index) {
  if (index >= -1) {
    project.taskList.splice(index, 1);
  }
}

function completeTask(task, project, index) {
  if (index > -1) {
    project.taskList.splice(index, 1);
  }
  project.completedTasks.push(task);
}

function undoComplete(task, project, index) {
  if (index > -1) {
    project.completedTasks.splice(index, 1);
  }
  project.taskList.push(task);
}



/***/ }),

/***/ "./src/createProject.js":
/*!******************************!*\
  !*** ./src/createProject.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const CreateProject = (name) => {
  let projectName = name;
  const taskList = [];
  const completedTasks = [];
  return {
    taskList,
    completedTasks,
    get name() {
      return projectName;
    },
    set changeName(newName) {
      projectName = newName;
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateProject);

/***/ }),

/***/ "./src/createToDo.js":
/*!***************************!*\
  !*** ./src/createToDo.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateTask": () => (/* binding */ CreateTask),
/* harmony export */   "editTask": () => (/* binding */ editTask)
/* harmony export */ });
const CreateTask = (title, description='', priority=0) => {
  let projectTitle = title;
  let projectDescription = description;
  let projectPriority = priority;
  return {
    get title() {
      return projectTitle;
    },
    get description() {
      return projectDescription;
    },
    get priority() {
      return projectPriority;
    },
    set changeTitle(newTitle) {
      projectTitle = newTitle;
    },
    set changeDescription(newDescription) {
      projectDescription = newDescription;
    },
    set changePriority(newPriority) {
      projectPriority = newPriority;
    }
  } 
}

function editTask(task, newTitle, newDescription, newPriority) {
  task.changeTitle = newTitle;
  task.changeDescription = newDescription;
  task.changePriority = newPriority;
}



// skipping due date for now because I don't really understand date-fns

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageLoad": () => (/* binding */ pageLoad)
/* harmony export */ });
/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ "./src/createProject.js");
/* harmony import */ var _createToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createToDo */ "./src/createToDo.js");
/* harmony import */ var _addToDo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addToDo */ "./src/addToDo.js");




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
        const newProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target.value);
        currentProject = newProject;
        (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addProjectToList)(newProject);

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
        const newTask = (0,_createToDo__WEBPACK_IMPORTED_MODULE_1__.CreateTask)(titleInput.value, descriptionInput.value, priorityInput.value);
        console.log(newTask);
        (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addTaskToProject)(newTask, currentProject);
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
        const projectList = (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.getProjectList)(); 
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
    const projectList = (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.getProjectList)();  
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

  // const icons = document.createElement('div');
  // icons.classList.add('task-icons');

  // const editIcon = document.createElement('img');
  // editIcon.src = "images/edit.svg";
  // icons.appendChild(editIcon);

  // const trashIcon = document.createElement('img');
  // trashIcon.src = "images/trash.svg";
  // icons.appendChild(trashIcon);

  const index = currentProject.completedTasks.findIndex(x => x.title === task.title);
  taskArea.setAttribute('data-index', index);
  taskArea.setAttribute('data-project', currentProject.name);
  
  taskVisible.appendChild(checkedIcon);
  taskVisible.appendChild(taskBtn);
  // taskVisible.appendChild(icons);

  taskArea.appendChild(taskVisible);

  taskDisplay.appendChild(taskArea);

  checkedIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.undoComplete)(task, currentProject, taskArea.getAttribute('data-index'));
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

      (0,_createToDo__WEBPACK_IMPORTED_MODULE_1__.editTask)(task, titleInput.value, descriptionInput.value, priorityInput.value);
      taskBtn.textContent = task.title;

      taskPopupDiv.classList.toggle('popup');
      taskVisible.classList.toggle('popup');
    }
  })

  trashIcon.addEventListener('click', () => {
    ;(0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.deleteTask)(currentProject, taskArea.getAttribute('data-index'));
    taskDisplay.textContent = '';
    currentProject.taskList.forEach(item => tasksUI(item));
    createTaskAdd();
  })

  circleIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.completeTask)(task, currentProject, taskArea.getAttribute('data-index'));
    taskDisplay.textContent = '';
    currentProject.taskList.forEach(item => tasksUI(item));
    currentProject.completedTasks.forEach(item => completedTasksUI(item));
    createTaskAdd();
  })
}

// function for showing tasks, switching projects. To remove children,
// set textcontent to "";

function pageLoad() {
  // projects
  const defaultProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])('Inbox');
  (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addProjectToList)(defaultProject);
  projectsUI(defaultProject);
  currentProject = defaultProject;
  createProjectAdd();

  // tasks
  const task0 = (0,_createToDo__WEBPACK_IMPORTED_MODULE_1__.CreateTask)('Testing', 'description test', 0);
  (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addTaskToProject)(task0, defaultProject);
  defaultProject.taskList.forEach(task => tasksUI(task));
  defaultProject.completedTasks.forEach(task => completedTasksUI(task));
  createTaskAdd();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


(0,_dom__WEBPACK_IMPORTED_MODULE_0__.pageLoad)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlDQUF5QztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGFBQWE7Ozs7Ozs7Ozs7Ozs7OztBQ2hCNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0M7QUFDaEM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQzRDO0FBQ1E7QUFDbUU7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLDJCQUEyQiwwREFBYTtBQUN4QztBQUNBLFFBQVEsMERBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSx3QkFBd0IsdURBQVU7QUFDbEM7QUFDQSxRQUFRLDBEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdEQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isd0RBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksc0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxxREFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUkscURBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBWTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwwREFBYTtBQUN0QyxFQUFFLDBEQUFnQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFVO0FBQzFCLEVBQUUsMERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN4V0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pQztBQUNqQztBQUNBLDhDQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9hZGRUb0RvLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvY3JlYXRlVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHRhc2ssIHByb2plY3QpIHtcclxuICBwcm9qZWN0LnRhc2tMaXN0LnB1c2godGFzayk7XHJcbiAgcmV0dXJuIHByb2plY3QudGFza0xpc3Q7XHJcbn1cclxuXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gW107XHJcbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdC5uYW1lO1xyXG4gIGNvbnN0IHByb2plY3RUYXNrTGlzdCA9IHByb2plY3QudGFza0xpc3Q7XHJcbiAgcHJvamVjdExpc3QucHVzaCh7bmFtZTogcHJvamVjdE5hbWUsIGxpc3Q6IHByb2plY3RUYXNrTGlzdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0TGlzdCgpIHtcclxuICByZXR1cm4gcHJvamVjdExpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2socHJvamVjdCwgaW5kZXgpIHtcclxuICBpZiAoaW5kZXggPj0gLTEpIHtcclxuICAgIHByb2plY3QudGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBsZXRlVGFzayh0YXNrLCBwcm9qZWN0LCBpbmRleCkge1xyXG4gIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICBwcm9qZWN0LnRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG4gIHByb2plY3QuY29tcGxldGVkVGFza3MucHVzaCh0YXNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb0NvbXBsZXRlKHRhc2ssIHByb2plY3QsIGluZGV4KSB7XHJcbiAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgIHByb2plY3QuY29tcGxldGVkVGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcbiAgcHJvamVjdC50YXNrTGlzdC5wdXNoKHRhc2spO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRUYXNrVG9Qcm9qZWN0LCBhZGRQcm9qZWN0VG9MaXN0LCBnZXRQcm9qZWN0TGlzdCwgZGVsZXRlVGFzaywgY29tcGxldGVUYXNrLCB1bmRvQ29tcGxldGUgfTsiLCJjb25zdCBDcmVhdGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcclxuICBsZXQgcHJvamVjdE5hbWUgPSBuYW1lO1xyXG4gIGNvbnN0IHRhc2tMaXN0ID0gW107XHJcbiAgY29uc3QgY29tcGxldGVkVGFza3MgPSBbXTtcclxuICByZXR1cm4ge1xyXG4gICAgdGFza0xpc3QsXHJcbiAgICBjb21wbGV0ZWRUYXNrcyxcclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdE5hbWU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZU5hbWUobmV3TmFtZSkge1xyXG4gICAgICBwcm9qZWN0TmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUHJvamVjdDsiLCJjb25zdCBDcmVhdGVUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbj0nJywgcHJpb3JpdHk9MCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSB0aXRsZTtcclxuICBsZXQgcHJvamVjdERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgbGV0IHByb2plY3RQcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgIHJldHVybiBwcm9qZWN0VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdERlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIGdldCBwcmlvcml0eSgpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3RQcmlvcml0eTtcclxuICAgIH0sXHJcbiAgICBzZXQgY2hhbmdlVGl0bGUobmV3VGl0bGUpIHtcclxuICAgICAgcHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZURlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHByb2plY3REZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIHNldCBjaGFuZ2VQcmlvcml0eShuZXdQcmlvcml0eSkge1xyXG4gICAgICBwcm9qZWN0UHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuICB9IFxyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0VGFzayh0YXNrLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld1ByaW9yaXR5KSB7XHJcbiAgdGFzay5jaGFuZ2VUaXRsZSA9IG5ld1RpdGxlO1xyXG4gIHRhc2suY2hhbmdlRGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICB0YXNrLmNoYW5nZVByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IENyZWF0ZVRhc2ssIGVkaXRUYXNrIH07XHJcblxyXG4vLyBza2lwcGluZyBkdWUgZGF0ZSBmb3Igbm93IGJlY2F1c2UgSSBkb24ndCByZWFsbHkgdW5kZXJzdGFuZCBkYXRlLWZucyIsImltcG9ydCBDcmVhdGVQcm9qZWN0IGZyb20gXCIuL2NyZWF0ZVByb2plY3RcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVGFzaywgZWRpdFRhc2sgfSBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbmltcG9ydCB7IGFkZFRhc2tUb1Byb2plY3QsIGFkZFByb2plY3RUb0xpc3QsIGdldFByb2plY3RMaXN0LCBkZWxldGVUYXNrLCBjb21wbGV0ZVRhc2ssIHVuZG9Db21wbGV0ZSB9IGZyb20gXCIuL2FkZFRvRG9cIjtcclxuXHJcbmNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XHJcbmNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tzJyk7XHJcbmxldCBjdXJyZW50UHJvamVjdDtcclxuXHJcbi8vIGZ1bmN0aW9uIHVwZGF0ZUluZGljZXMocHJvamVjdCkge1xyXG4vLyAgIGNvbnN0IHRhc2tBcmVhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Rhc2stYXJlYXMnKTtcclxuLy8gICBjb25zdCB0YXNrQXJlYXNBcnJheSA9IFsuLi50YXNrQXJlYXNdO1xyXG4vLyAgIHRhc2tBcmVhc0FycmF5LmZvckVhY2goYXJlYSA9PiBhcmVhLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsICkpXHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RBZGQoKSB7XHJcbiAgY29uc3QgbmV3UHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnbmV3LXByb2plY3QnKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gIG5ld1Byb2plY3RCdG4udGV4dENvbnRlbnQgPSAnKyBOZXcgUHJvamVjdCc7XHJcblxyXG4gIGNvbnN0IHByb2plY3RQb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByb2plY3ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBwcm9qZWN0UG9wdXBEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVJbnB1dCk7XHJcblxyXG4gIG5ld1Byb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdG4pO1xyXG4gIG5ld1Byb2plY3RBcmVhLmFwcGVuZENoaWxkKHByb2plY3RQb3B1cERpdik7XHJcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEFyZWEpO1xyXG5cclxuICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICB9KTtcclxuXHJcbiAgcHJvamVjdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgaWYgKHByb2plY3ROYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1Byb2plY3RBcmVhLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBDcmVhdGVQcm9qZWN0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICBjdXJyZW50UHJvamVjdCA9IG5ld1Byb2plY3Q7XHJcbiAgICAgICAgYWRkUHJvamVjdFRvTGlzdChuZXdQcm9qZWN0KTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgICAgIHByZXZpb3VzUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXByb2plY3QnKTtcclxuICAgICAgICBwcm9qZWN0c1VJKG5ld1Byb2plY3QpO1xyXG4gICAgICAgIGNyZWF0ZVByb2plY3RBZGQoKTtcclxuXHJcbiAgICAgICAgdGFza0Rpc3BsYXkudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICBjdXJyZW50UHJvamVjdC50YXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4gdGFza3NVSSh0YXNrKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYXNrQWRkKCkge1xyXG4gIGNvbnN0IG5ld1Rhc2tBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBuZXdUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrJyk7XHJcbiAgbmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBuZXdUYXNrQnRuLnRleHRDb250ZW50ID0gJysgQWRkIFRhc2snO1xyXG5cclxuICBjb25zdCB0YXNrUG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lZGl0Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgZGVzY3JpcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCAwKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgMyk7XHJcbiAgcHJpb3JpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgMCk7XHJcblxyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SW5wdXQpO1xyXG5cclxuICBuZXdUYXNrQXJlYS5hcHBlbmRDaGlsZChuZXdUYXNrQnRuKTtcclxuICBuZXdUYXNrQXJlYS5hcHBlbmRDaGlsZCh0YXNrUG9wdXBEaXYpO1xyXG5cclxuICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZChuZXdUYXNrQXJlYSk7XHJcblxyXG4gIG5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gIH0pO1xyXG5cclxuICB0YXNrUG9wdXBEaXYuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGlmICh0aXRsZUlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3VGFza0FyZWEucmVtb3ZlKCk7XHJcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IENyZWF0ZVRhc2sodGl0bGVJbnB1dC52YWx1ZSwgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSwgcHJpb3JpdHlJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV3VGFzayk7XHJcbiAgICAgICAgYWRkVGFza1RvUHJvamVjdChuZXdUYXNrLCBjdXJyZW50UHJvamVjdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudFByb2plY3QudGFza0xpc3QpO1xyXG4gICAgICAgIHRhc2tzVUkobmV3VGFzayk7XHJcbiAgICAgICAgY3JlYXRlVGFza0FkZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvamVjdHNVSShwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZpc2libGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgcHJvamVjdFZpc2libGUuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgcHJvamVjdFZpc2libGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgcHJvamVjdFZpc2libGUuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG5cclxuICBjb25zdCBpY29ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGljb25zLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaWNvbnMnKTtcclxuXHJcbiAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICBlZGl0SWNvbi5zcmMgPSBcImltYWdlcy9lZGl0LnN2Z1wiO1xyXG4gIGljb25zLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuXHJcbiAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgdHJhc2hJY29uLnNyYyA9IFwiaW1hZ2VzL3RyYXNoLnN2Z1wiO1xyXG4gIGljb25zLmFwcGVuZENoaWxkKHRyYXNoSWNvbik7XHJcblxyXG4gIHByb2plY3RWaXNpYmxlLmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xyXG4gIHByb2plY3RWaXNpYmxlLmFwcGVuZENoaWxkKGljb25zKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFBvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgcHJvamVjdE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIHByb2plY3ROYW1lSW5wdXQudmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lSW5wdXQpO1xyXG5cclxuICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0VmlzaWJsZSk7XHJcbiAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFBvcHVwRGl2KTtcclxuICBwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0QXJlYSk7XHJcblxyXG4gIC8vIHByZXZlbnRzIGNsaWNraW5nIG9uIHByb2plY3QgbmFtZSBmcm9tIHN3aXRjaGluZyB0aGUgY3VycmVudCBwcm9qZWN0XHJcbiAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pXHJcblxyXG4gIHByb2plY3RWaXNpYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIHRhc2tEaXNwbGF5LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICBjb25zdCBwcmV2aW91c1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICBwcmV2aW91c1Byb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXByb2plY3QnKTtcclxuICAgIGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICAgIGN1cnJlbnRQcm9qZWN0LmNvbXBsZXRlZFRhc2tzLmZvckVhY2godGFzayA9PiBjb21wbGV0ZWRUYXNrc1VJKHRhc2spKTtcclxuICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICB9KVxyXG5cclxuLy8gZWRpdCBwcm9qZWN0XHJcbiAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICB9KVxyXG5cclxuICBwcm9qZWN0UG9wdXBEaXYuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0TmFtZUlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZ2V0UHJvamVjdExpc3QoKTsgXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IHByb2plY3QubmFtZSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IC0xKSB7XHJcbiAgICAgICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0QXJlYS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvamVjdC5jaGFuZ2VOYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcclxuICAgICAgICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICAgIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICAgIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gZGVsZXRlIHByb2plY3RcclxuICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZ2V0UHJvamVjdExpc3QoKTsgIFxyXG4gICAgY29uc3QgaW5kZXggPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IHByb2plY3QubmFtZSk7XHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgcHJvamVjdEFyZWEucmVtb3ZlKCk7XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGxldGVkVGFza3NVSSh0YXNrKSB7XHJcbiAgY29uc3QgdGFza0FyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrQXJlYS5jbGFzc0xpc3QuYWRkKCd0YXNrLWFyZWFzJyk7XHJcbiAgdGFza0FyZWEuY2xhc3NMaXN0LmFkZCgndGFzay1jb21wbGV0ZScpO1xyXG5cclxuICBjb25zdCB0YXNrVmlzaWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IHRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrVmlzaWJsZS5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gIGNvbnN0IGNoZWNrZWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgY2hlY2tlZEljb24uc3JjID0gXCJpbWFnZXMvY2hlY2ttYXJrLWNpcmNsZS5zdmdcIjtcclxuXHJcbiAgLy8gY29uc3QgaWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAvLyBpY29ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLWljb25zJyk7XHJcblxyXG4gIC8vIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgLy8gZWRpdEljb24uc3JjID0gXCJpbWFnZXMvZWRpdC5zdmdcIjtcclxuICAvLyBpY29ucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gIC8vIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIC8vIHRyYXNoSWNvbi5zcmMgPSBcImltYWdlcy90cmFzaC5zdmdcIjtcclxuICAvLyBpY29ucy5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xyXG5cclxuICBjb25zdCBpbmRleCA9IGN1cnJlbnRQcm9qZWN0LmNvbXBsZXRlZFRhc2tzLmZpbmRJbmRleCh4ID0+IHgudGl0bGUgPT09IHRhc2sudGl0bGUpO1xyXG4gIHRhc2tBcmVhLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICB0YXNrQXJlYS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGN1cnJlbnRQcm9qZWN0Lm5hbWUpO1xyXG4gIFxyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKGNoZWNrZWRJY29uKTtcclxuICB0YXNrVmlzaWJsZS5hcHBlbmRDaGlsZCh0YXNrQnRuKTtcclxuICAvLyB0YXNrVmlzaWJsZS5hcHBlbmRDaGlsZChpY29ucyk7XHJcblxyXG4gIHRhc2tBcmVhLmFwcGVuZENoaWxkKHRhc2tWaXNpYmxlKTtcclxuXHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQodGFza0FyZWEpO1xyXG5cclxuICBjaGVja2VkSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdW5kb0NvbXBsZXRlKHRhc2ssIGN1cnJlbnRQcm9qZWN0LCB0YXNrQXJlYS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QudGFza0xpc3QuZm9yRWFjaChpdGVtID0+IHRhc2tzVUkoaXRlbSkpO1xyXG4gICAgY3VycmVudFByb2plY3QuY29tcGxldGVkVGFza3MuZm9yRWFjaChpdGVtID0+IGNvbXBsZXRlZFRhc2tzVUkoaXRlbSkpO1xyXG4gICAgY3JlYXRlVGFza0FkZCgpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tzVUkodGFzaykge1xyXG4gIGNvbnN0IHRhc2tBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGFza0FyZWEuY2xhc3NMaXN0LmFkZCgndGFzay1hcmVhcycpO1xyXG5cclxuICBjb25zdCB0YXNrVmlzaWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IHRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrVmlzaWJsZS5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gIGNvbnN0IGNpcmNsZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICBjaXJjbGVJY29uLnNyYyA9IFwiaW1hZ2VzL2NpcmNsZS5zdmdcIjtcclxuXHJcbiAgY29uc3QgaWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBpY29ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLWljb25zJyk7XHJcblxyXG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgZWRpdEljb24uc3JjID0gXCJpbWFnZXMvZWRpdC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIHRyYXNoSWNvbi5zcmMgPSBcImltYWdlcy90cmFzaC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xyXG5cclxuICBjb25zdCBpbmRleCA9IGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0LmZpbmRJbmRleCh4ID0+IHgudGl0bGUgPT09IHRhc2sudGl0bGUpO1xyXG4gIHRhc2tBcmVhLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICB0YXNrQXJlYS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGN1cnJlbnRQcm9qZWN0Lm5hbWUpO1xyXG4gIFxyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKGNpcmNsZUljb24pO1xyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKHRhc2tCdG4pO1xyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKGljb25zKTtcclxuXHJcbiAgdGFza0FyZWEuYXBwZW5kQ2hpbGQodGFza1Zpc2libGUpO1xyXG5cclxuICBjb25zdCB0YXNrUG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lZGl0Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIHRpdGxlSW5wdXQudmFsdWUgPSB0YXNrLnRpdGxlO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgZGVzY3JpcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCAwKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgMyk7XHJcbiAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XHJcblxyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SW5wdXQpO1xyXG5cclxuICB0YXNrQXJlYS5hcHBlbmRDaGlsZCh0YXNrUG9wdXBEaXYpO1xyXG5cclxuICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZCh0YXNrQXJlYSk7XHJcblxyXG4gIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0YXNrVmlzaWJsZS5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSlcclxuXHJcbiAgdGFza1BvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAvLyB0cmFzaCBmdW5jdGlvbmFsaXR5XHJcblxyXG4gICAgICBlZGl0VGFzayh0YXNrLCB0aXRsZUlucHV0LnZhbHVlLCBkZXNjcmlwdGlvbklucHV0LnZhbHVlLCBwcmlvcml0eUlucHV0LnZhbHVlKTtcclxuICAgICAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gICAgICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgdGFza1Zpc2libGUuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBkZWxldGVUYXNrKGN1cnJlbnRQcm9qZWN0LCB0YXNrQXJlYS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QudGFza0xpc3QuZm9yRWFjaChpdGVtID0+IHRhc2tzVUkoaXRlbSkpO1xyXG4gICAgY3JlYXRlVGFza0FkZCgpO1xyXG4gIH0pXHJcblxyXG4gIGNpcmNsZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGNvbXBsZXRlVGFzayh0YXNrLCBjdXJyZW50UHJvamVjdCwgdGFza0FyZWEuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpO1xyXG4gICAgdGFza0Rpc3BsYXkudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0LmZvckVhY2goaXRlbSA9PiB0YXNrc1VJKGl0ZW0pKTtcclxuICAgIGN1cnJlbnRQcm9qZWN0LmNvbXBsZXRlZFRhc2tzLmZvckVhY2goaXRlbSA9PiBjb21wbGV0ZWRUYXNrc1VJKGl0ZW0pKTtcclxuICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICB9KVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBmb3Igc2hvd2luZyB0YXNrcywgc3dpdGNoaW5nIHByb2plY3RzLiBUbyByZW1vdmUgY2hpbGRyZW4sXHJcbi8vIHNldCB0ZXh0Y29udGVudCB0byBcIlwiO1xyXG5cclxuZnVuY3Rpb24gcGFnZUxvYWQoKSB7XHJcbiAgLy8gcHJvamVjdHNcclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IENyZWF0ZVByb2plY3QoJ0luYm94Jyk7XHJcbiAgYWRkUHJvamVjdFRvTGlzdChkZWZhdWx0UHJvamVjdCk7XHJcbiAgcHJvamVjdHNVSShkZWZhdWx0UHJvamVjdCk7XHJcbiAgY3VycmVudFByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcclxuICBjcmVhdGVQcm9qZWN0QWRkKCk7XHJcblxyXG4gIC8vIHRhc2tzXHJcbiAgY29uc3QgdGFzazAgPSBDcmVhdGVUYXNrKCdUZXN0aW5nJywgJ2Rlc2NyaXB0aW9uIHRlc3QnLCAwKTtcclxuICBhZGRUYXNrVG9Qcm9qZWN0KHRhc2swLCBkZWZhdWx0UHJvamVjdCk7XHJcbiAgZGVmYXVsdFByb2plY3QudGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHRhc2tzVUkodGFzaykpO1xyXG4gIGRlZmF1bHRQcm9qZWN0LmNvbXBsZXRlZFRhc2tzLmZvckVhY2godGFzayA9PiBjb21wbGV0ZWRUYXNrc1VJKHRhc2spKTtcclxuICBjcmVhdGVUYXNrQWRkKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHBhZ2VMb2FkIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwYWdlTG9hZCB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxucGFnZUxvYWQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=