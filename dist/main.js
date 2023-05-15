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
/* harmony export */   "getProjectList": () => (/* binding */ getProjectList)
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

function completeTask(project, index) {
  project.taskList.push(project.taskList.splice(index, 1)[0]);
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
  return {
    taskList,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUNBQXlDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsYUFBYTs7Ozs7Ozs7Ozs7Ozs7O0FDZDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dDO0FBQ2hDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEM0QztBQUNRO0FBQ3FEO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSwyQkFBMkIsMERBQWE7QUFDeEM7QUFDQSxRQUFRLDBEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0Esd0JBQXdCLHVEQUFVO0FBQ2xDO0FBQ0EsUUFBUSwwREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0RBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3REFBYztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0scURBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJLHFEQUFVO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFhO0FBQ3RDLEVBQUUsMERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQVU7QUFDMUIsRUFBRSwwREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3U0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pQztBQUNqQztBQUNBLDhDQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9hZGRUb0RvLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvY3JlYXRlVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHRhc2ssIHByb2plY3QpIHtcclxuICBwcm9qZWN0LnRhc2tMaXN0LnB1c2godGFzayk7XHJcbiAgcmV0dXJuIHByb2plY3QudGFza0xpc3Q7XHJcbn1cclxuXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gW107XHJcbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdC5uYW1lO1xyXG4gIGNvbnN0IHByb2plY3RUYXNrTGlzdCA9IHByb2plY3QudGFza0xpc3Q7XHJcbiAgcHJvamVjdExpc3QucHVzaCh7bmFtZTogcHJvamVjdE5hbWUsIGxpc3Q6IHByb2plY3RUYXNrTGlzdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0TGlzdCgpIHtcclxuICByZXR1cm4gcHJvamVjdExpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2socHJvamVjdCwgaW5kZXgpIHtcclxuICBpZiAoaW5kZXggPj0gLTEpIHtcclxuICAgIHByb2plY3QudGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBsZXRlVGFzayhwcm9qZWN0LCBpbmRleCkge1xyXG4gIHByb2plY3QudGFza0xpc3QucHVzaChwcm9qZWN0LnRhc2tMaXN0LnNwbGljZShpbmRleCwgMSlbMF0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRUYXNrVG9Qcm9qZWN0LCBhZGRQcm9qZWN0VG9MaXN0LCBnZXRQcm9qZWN0TGlzdCwgZGVsZXRlVGFzaywgY29tcGxldGVUYXNrIH07IiwiY29uc3QgQ3JlYXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XHJcbiAgbGV0IHByb2plY3ROYW1lID0gbmFtZTtcclxuICBjb25zdCB0YXNrTGlzdCA9IFtdO1xyXG4gIHJldHVybiB7XHJcbiAgICB0YXNrTGlzdCxcclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdE5hbWU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZU5hbWUobmV3TmFtZSkge1xyXG4gICAgICBwcm9qZWN0TmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUHJvamVjdDsiLCJjb25zdCBDcmVhdGVUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbj0nJywgcHJpb3JpdHk9MCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSB0aXRsZTtcclxuICBsZXQgcHJvamVjdERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgbGV0IHByb2plY3RQcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgIHJldHVybiBwcm9qZWN0VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdERlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIGdldCBwcmlvcml0eSgpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3RQcmlvcml0eTtcclxuICAgIH0sXHJcbiAgICBzZXQgY2hhbmdlVGl0bGUobmV3VGl0bGUpIHtcclxuICAgICAgcHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZURlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHByb2plY3REZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIHNldCBjaGFuZ2VQcmlvcml0eShuZXdQcmlvcml0eSkge1xyXG4gICAgICBwcm9qZWN0UHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuICB9IFxyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0VGFzayh0YXNrLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld1ByaW9yaXR5KSB7XHJcbiAgdGFzay5jaGFuZ2VUaXRsZSA9IG5ld1RpdGxlO1xyXG4gIHRhc2suY2hhbmdlRGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICB0YXNrLmNoYW5nZVByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IENyZWF0ZVRhc2ssIGVkaXRUYXNrIH07XHJcblxyXG4vLyBza2lwcGluZyBkdWUgZGF0ZSBmb3Igbm93IGJlY2F1c2UgSSBkb24ndCByZWFsbHkgdW5kZXJzdGFuZCBkYXRlLWZucyIsImltcG9ydCBDcmVhdGVQcm9qZWN0IGZyb20gXCIuL2NyZWF0ZVByb2plY3RcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVGFzaywgZWRpdFRhc2sgfSBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbmltcG9ydCB7IGFkZFRhc2tUb1Byb2plY3QsIGFkZFByb2plY3RUb0xpc3QsIGdldFByb2plY3RMaXN0LCBkZWxldGVUYXNrLCBjb21wbGV0ZVRhc2sgfSBmcm9tIFwiLi9hZGRUb0RvXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xyXG5jb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrcycpO1xyXG5sZXQgY3VycmVudFByb2plY3Q7XHJcblxyXG4vLyBmdW5jdGlvbiB1cGRhdGVJbmRpY2VzKHByb2plY3QpIHtcclxuLy8gICBjb25zdCB0YXNrQXJlYXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YXNrLWFyZWFzJyk7XHJcbi8vICAgY29uc3QgdGFza0FyZWFzQXJyYXkgPSBbLi4udGFza0FyZWFzXTtcclxuLy8gICB0YXNrQXJlYXNBcnJheS5mb3JFYWNoKGFyZWEgPT4gYXJlYS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCApKVxyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0QWRkKCkge1xyXG4gIGNvbnN0IG5ld1Byb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ25ldy1wcm9qZWN0Jyk7XHJcbiAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBuZXdQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJysgTmV3IFByb2plY3QnO1xyXG5cclxuICBjb25zdCBwcm9qZWN0UG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBwcm9qZWN0TmFtZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lSW5wdXQpO1xyXG5cclxuICBuZXdQcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcclxuICBuZXdQcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0UG9wdXBEaXYpO1xyXG4gIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKG5ld1Byb2plY3RBcmVhKTtcclxuXHJcbiAgbmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSk7XHJcblxyXG4gIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0TmFtZUlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdQcm9qZWN0QXJlYS5yZW1vdmUoKTtcclxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgY3VycmVudFByb2plY3QgPSBuZXdQcm9qZWN0O1xyXG4gICAgICAgIGFkZFByb2plY3RUb0xpc3QobmV3UHJvamVjdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXByb2plY3QnKTtcclxuICAgICAgICBwcmV2aW91c1Byb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICAgICAgcHJvamVjdHNVSShuZXdQcm9qZWN0KTtcclxuICAgICAgICBjcmVhdGVQcm9qZWN0QWRkKCk7XHJcblxyXG4gICAgICAgIHRhc2tEaXNwbGF5LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgY3VycmVudFByb2plY3QudGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHRhc2tzVUkodGFzaykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFza0FkZCgpIHtcclxuICBjb25zdCBuZXdUYXNrQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICBjb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgbmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG4gIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBuZXdUYXNrQnRuLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgbmV3VGFza0J0bi50ZXh0Q29udGVudCA9ICcrIEFkZCBUYXNrJztcclxuXHJcbiAgY29uc3QgdGFza1BvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZWRpdCcpO1xyXG4gIHRhc2tQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdudW1iZXInKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgMCk7XHJcbiAgcHJpb3JpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIDMpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIDApO1xyXG5cclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUlucHV0KTtcclxuXHJcbiAgbmV3VGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3VGFza0J0bik7XHJcbiAgbmV3VGFza0FyZWEuYXBwZW5kQ2hpbGQodGFza1BvcHVwRGl2KTtcclxuXHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQobmV3VGFza0FyZWEpO1xyXG5cclxuICBuZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICB9KTtcclxuXHJcbiAgdGFza1BvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBpZiAodGl0bGVJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1Rhc2tBcmVhLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBDcmVhdGVUYXNrKHRpdGxlSW5wdXQudmFsdWUsIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsIHByaW9yaXR5SW5wdXQudmFsdWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1Rhc2spO1xyXG4gICAgICAgIGFkZFRhc2tUb1Byb2plY3QobmV3VGFzaywgY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0KTtcclxuICAgICAgICB0YXNrc1VJKG5ld1Rhc2spO1xyXG4gICAgICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RzVUkocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RWaXNpYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcclxuICBwcm9qZWN0VmlzaWJsZS5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuXHJcbiAgY29uc3QgaWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBpY29ucy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWljb25zJyk7XHJcblxyXG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgZWRpdEljb24uc3JjID0gXCJpbWFnZXMvZWRpdC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIHRyYXNoSWNvbi5zcmMgPSBcImltYWdlcy90cmFzaC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xyXG5cclxuICBwcm9qZWN0VmlzaWJsZS5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcclxuICBwcm9qZWN0VmlzaWJsZS5hcHBlbmRDaGlsZChpY29ucyk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RQb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByb2plY3ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gcHJvamVjdC5uYW1lO1xyXG4gIHByb2plY3RQb3B1cERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUlucHV0KTtcclxuXHJcbiAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFZpc2libGUpO1xyXG4gIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKHByb2plY3RQb3B1cERpdik7XHJcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdEFyZWEpO1xyXG5cclxuICBwcm9qZWN0VmlzaWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgY29uc3QgcHJldmlvdXNQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgcHJldmlvdXNQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICBwcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICB9KVxyXG5cclxuXHJcbi8vIGVkaXQgcHJvamVjdFxyXG4gIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBwcm9qZWN0VmlzaWJsZS5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSlcclxuXHJcbiBcclxuXHJcbiAgcHJvamVjdFBvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBpZiAocHJvamVjdE5hbWVJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGdldFByb2plY3RMaXN0KCk7IFxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdExpc3QuZmluZEluZGV4KHggPT4geC5uYW1lID09PSBwcm9qZWN0Lm5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAtMSkge1xyXG4gICAgICAgICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvamVjdEFyZWEucmVtb3ZlKCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2plY3QuY2hhbmdlTmFtZSA9IHByb2plY3ROYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgICBwcm9qZWN0VmlzaWJsZS5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIGRlbGV0ZSBwcm9qZWN0XHJcbiAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGdldFByb2plY3RMaXN0KCk7ICBcclxuICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdExpc3QuZmluZEluZGV4KHggPT4geC5uYW1lID09PSBwcm9qZWN0Lm5hbWUpO1xyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHByb2plY3RBcmVhLnJlbW92ZSgpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tzVUkodGFzaykge1xyXG4gIGNvbnN0IHRhc2tBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGFza0FyZWEuY2xhc3NMaXN0LmFkZCgndGFzay1hcmVhcycpO1xyXG5cclxuICBjb25zdCB0YXNrVmlzaWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IHRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrVmlzaWJsZS5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gIGNvbnN0IGNpcmNsZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICBjaXJjbGVJY29uLnNyYyA9IFwiaW1hZ2VzL2NpcmNsZS5zdmdcIjtcclxuXHJcbiAgY29uc3QgaWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBpY29ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLWljb25zJyk7XHJcblxyXG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgZWRpdEljb24uc3JjID0gXCJpbWFnZXMvZWRpdC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIHRyYXNoSWNvbi5zcmMgPSBcImltYWdlcy90cmFzaC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xyXG5cclxuICBjb25zdCBpbmRleCA9IGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0LmZpbmRJbmRleCh4ID0+IHgudGl0bGUgPT09IHRhc2sudGl0bGUpO1xyXG4gIHRhc2tBcmVhLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICB0YXNrQXJlYS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGN1cnJlbnRQcm9qZWN0Lm5hbWUpO1xyXG4gIFxyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKGNpcmNsZUljb24pO1xyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKHRhc2tCdG4pO1xyXG4gIHRhc2tWaXNpYmxlLmFwcGVuZENoaWxkKGljb25zKTtcclxuXHJcbiAgdGFza0FyZWEuYXBwZW5kQ2hpbGQodGFza1Zpc2libGUpO1xyXG5cclxuICBjb25zdCB0YXNrUG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lZGl0Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIHRpdGxlSW5wdXQudmFsdWUgPSB0YXNrLnRpdGxlO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgZGVzY3JpcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCAwKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgMyk7XHJcbiAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XHJcblxyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SW5wdXQpO1xyXG5cclxuICB0YXNrQXJlYS5hcHBlbmRDaGlsZCh0YXNrUG9wdXBEaXYpO1xyXG5cclxuICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZCh0YXNrQXJlYSk7XHJcblxyXG4gIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0YXNrVmlzaWJsZS5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSlcclxuXHJcbiAgdGFza1BvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAvLyB0cmFzaCBmdW5jdGlvbmFsaXR5XHJcblxyXG4gICAgICBlZGl0VGFzayh0YXNrLCB0aXRsZUlucHV0LnZhbHVlLCBkZXNjcmlwdGlvbklucHV0LnZhbHVlLCBwcmlvcml0eUlucHV0LnZhbHVlKTtcclxuICAgICAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gICAgICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgdGFza1Zpc2libGUuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBkZWxldGVUYXNrKGN1cnJlbnRQcm9qZWN0LCB0YXNrQXJlYS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSk7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QudGFza0xpc3QuZm9yRWFjaChpdGVtID0+IHRhc2tzVUkoaXRlbSkpO1xyXG4gICAgY3JlYXRlVGFza0FkZCgpO1xyXG4gIH0pXHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGZvciBzaG93aW5nIHRhc2tzLCBzd2l0Y2hpbmcgcHJvamVjdHMuIFRvIHJlbW92ZSBjaGlsZHJlbixcclxuLy8gc2V0IHRleHRjb250ZW50IHRvIFwiXCI7XHJcblxyXG5mdW5jdGlvbiBwYWdlTG9hZCgpIHtcclxuICAvLyBwcm9qZWN0c1xyXG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdCgnSW5ib3gnKTtcclxuICBhZGRQcm9qZWN0VG9MaXN0KGRlZmF1bHRQcm9qZWN0KTtcclxuICBwcm9qZWN0c1VJKGRlZmF1bHRQcm9qZWN0KTtcclxuICBjdXJyZW50UHJvamVjdCA9IGRlZmF1bHRQcm9qZWN0O1xyXG4gIGNyZWF0ZVByb2plY3RBZGQoKTtcclxuXHJcbiAgLy8gdGFza3NcclxuICBjb25zdCB0YXNrMCA9IENyZWF0ZVRhc2soJ1Rlc3RpbmcnLCAnZGVzY3JpcHRpb24gdGVzdCcsIDApO1xyXG4gIGFkZFRhc2tUb1Byb2plY3QodGFzazAsIGRlZmF1bHRQcm9qZWN0KTtcclxuICBkZWZhdWx0UHJvamVjdC50YXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4gdGFza3NVSSh0YXNrKSk7XHJcbiAgY3JlYXRlVGFza0FkZCgpO1xyXG59XHJcblxyXG5leHBvcnQgeyBwYWdlTG9hZCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcGFnZUxvYWQgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbnBhZ2VMb2FkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9