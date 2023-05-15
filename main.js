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
/* harmony export */   "getProjectList": () => (/* binding */ getProjectList)
/* harmony export */ });
// import CreateTask from "./createToDo";
// import CreateProject from "./createProject";

// const defaultProject = CreateProject("Inbox");

// const currentProject = defaultProject;

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

// remove task (completed)



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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateTask);

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
        const newProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target.value);
        currentProject = newProject;
        (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addProjectToList)(newProject);

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
        const newTask = (0,_createToDo__WEBPACK_IMPORTED_MODULE_1__["default"])(titleInput.value, descriptionInput.value, priorityInput.value);
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

  taskDisplay.appendChild(taskArea);
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
  const task0 = (0,_createToDo__WEBPACK_IMPORTED_MODULE_1__["default"])('Testing', 'description test', 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUNBQXlDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ2Q1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFVBQVUsRUFBQztBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCNEM7QUFDTjtBQUN5QztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsMkJBQTJCLDBEQUFhO0FBQ3hDO0FBQ0EsUUFBUSwwREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLHdCQUF3Qix1REFBVTtBQUNsQztBQUNBLFFBQVEsMERBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdEQUFjO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFhO0FBQ3RDLEVBQUUsMERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQVU7QUFDMUIsRUFBRSwwREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pQztBQUNqQztBQUNBLDhDQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9hZGRUb0RvLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvY3JlYXRlVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQ3JlYXRlVGFzayBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbi8vIGltcG9ydCBDcmVhdGVQcm9qZWN0IGZyb20gXCIuL2NyZWF0ZVByb2plY3RcIjtcclxuXHJcbi8vIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdChcIkluYm94XCIpO1xyXG5cclxuLy8gY29uc3QgY3VycmVudFByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QodGFzaywgcHJvamVjdCkge1xyXG4gIHByb2plY3QudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICByZXR1cm4gcHJvamVjdC50YXNrTGlzdDtcclxufVxyXG5cclxuY29uc3QgcHJvamVjdExpc3QgPSBbXTtcclxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgY29uc3QgcHJvamVjdFRhc2tMaXN0ID0gcHJvamVjdC50YXNrTGlzdDtcclxuICBwcm9qZWN0TGlzdC5wdXNoKHtuYW1lOiBwcm9qZWN0TmFtZSwgbGlzdDogcHJvamVjdFRhc2tMaXN0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb2plY3RMaXN0KCkge1xyXG4gIHJldHVybiBwcm9qZWN0TGlzdDtcclxufVxyXG5cclxuLy8gcmVtb3ZlIHRhc2sgKGNvbXBsZXRlZClcclxuXHJcbmV4cG9ydCB7IGFkZFRhc2tUb1Byb2plY3QsIGFkZFByb2plY3RUb0xpc3QsIGdldFByb2plY3RMaXN0IH07IiwiY29uc3QgQ3JlYXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XHJcbiAgbGV0IHByb2plY3ROYW1lID0gbmFtZTtcclxuICBjb25zdCB0YXNrTGlzdCA9IFtdO1xyXG4gIHJldHVybiB7XHJcbiAgICB0YXNrTGlzdCxcclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdE5hbWU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZU5hbWUobmV3TmFtZSkge1xyXG4gICAgICBwcm9qZWN0TmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUHJvamVjdDsiLCJjb25zdCBDcmVhdGVUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbj0nJywgcHJpb3JpdHk9MCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSB0aXRsZTtcclxuICBsZXQgcHJvamVjdERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgbGV0IHByb2plY3RQcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgIHJldHVybiBwcm9qZWN0VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdERlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIGdldCBwcmlvcml0eSgpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3RQcmlvcml0eTtcclxuICAgIH0sXHJcbiAgICBzZXQgY2hhbmdlVGl0bGUobmV3VGl0bGUpIHtcclxuICAgICAgcHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZURlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHByb2plY3REZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfSxcclxuICAgIHNldCBjaGFuZ2VQcmlvcml0eShuZXdQcmlvcml0eSkge1xyXG4gICAgICBwcm9qZWN0UHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuICB9IFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVUYXNrO1xyXG5cclxuLy8gc2tpcHBpbmcgZHVlIGRhdGUgZm9yIG5vdyBiZWNhdXNlIEkgZG9uJ3QgcmVhbGx5IHVuZGVyc3RhbmQgZGF0ZS1mbnMiLCJpbXBvcnQgQ3JlYXRlUHJvamVjdCBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0XCI7XHJcbmltcG9ydCBDcmVhdGVUYXNrIGZyb20gXCIuL2NyZWF0ZVRvRG9cIjtcclxuaW1wb3J0IHsgYWRkVGFza1RvUHJvamVjdCwgYWRkUHJvamVjdFRvTGlzdCwgZ2V0UHJvamVjdExpc3QgfSBmcm9tIFwiLi9hZGRUb0RvXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xyXG5jb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrcycpO1xyXG5sZXQgY3VycmVudFByb2plY3Q7XHJcblxyXG4vLyBmdW5jdGlvbiBwcm9qZWN0UG9wdXAoKSB7XHJcbi8vICAgY29uc3QgcHJvamVjdFBvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbi8vICAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbi8vICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbi8vICAgcHJvamVjdE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4vLyAgIHByb2plY3RQb3B1cERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUlucHV0KTtcclxuXHJcbi8vICAvLyBwcm9qZWN0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoKVxyXG5cclxuLy8gICByZXR1cm4gcHJvamVjdFBvcHVwRGl2O1xyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0QWRkKCkge1xyXG4gIGNvbnN0IG5ld1Byb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ25ldy1wcm9qZWN0Jyk7XHJcbiAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBuZXdQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJysgTmV3IFByb2plY3QnO1xyXG5cclxuICBjb25zdCBwcm9qZWN0UG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBwcm9qZWN0TmFtZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lSW5wdXQpO1xyXG5cclxuICBuZXdQcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcclxuICBuZXdQcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0UG9wdXBEaXYpO1xyXG4gIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKG5ld1Byb2plY3RBcmVhKTtcclxuXHJcbiAgbmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSk7XHJcblxyXG4gIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0TmFtZUlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdQcm9qZWN0QXJlYS5yZW1vdmUoKTtcclxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgY3VycmVudFByb2plY3QgPSBuZXdQcm9qZWN0O1xyXG4gICAgICAgIGFkZFByb2plY3RUb0xpc3QobmV3UHJvamVjdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXByb2plY3QnKTtcclxuICAgICAgICBwcmV2aW91c1Byb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICAgICAgcHJvamVjdHNVSShuZXdQcm9qZWN0KTtcclxuICAgICAgICBjcmVhdGVQcm9qZWN0QWRkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYXNrQWRkKCkge1xyXG4gIGNvbnN0IG5ld1Rhc2tBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBuZXdUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrJyk7XHJcbiAgbmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBuZXdUYXNrQnRuLnRleHRDb250ZW50ID0gJysgQWRkIFRhc2snO1xyXG5cclxuICBjb25zdCB0YXNrUG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0YXNrUG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lZGl0Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgZGVzY3JpcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCdtaW4nLCAwKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgMTApO1xyXG4gIHByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIDApO1xyXG5cclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUlucHV0KTtcclxuXHJcbiAgbmV3VGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3VGFza0J0bik7XHJcbiAgbmV3VGFza0FyZWEuYXBwZW5kQ2hpbGQodGFza1BvcHVwRGl2KTtcclxuXHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQobmV3VGFza0FyZWEpO1xyXG5cclxuICBuZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICB9KTtcclxuXHJcbiAgdGFza1BvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBpZiAodGl0bGVJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1Rhc2tBcmVhLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBDcmVhdGVUYXNrKHRpdGxlSW5wdXQudmFsdWUsIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsIHByaW9yaXR5SW5wdXQudmFsdWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1Rhc2spO1xyXG4gICAgICAgIGFkZFRhc2tUb1Byb2plY3QobmV3VGFzaywgY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0LnRhc2tMaXN0KTtcclxuICAgICAgICB0YXNrc1VJKG5ld1Rhc2spO1xyXG4gICAgICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RzVUkocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RWaXNpYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcclxuICBwcm9qZWN0VmlzaWJsZS5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIHByb2plY3RWaXNpYmxlLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuXHJcbiAgY29uc3QgaWNvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBpY29ucy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWljb25zJyk7XHJcblxyXG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgZWRpdEljb24uc3JjID0gXCJpbWFnZXMvZWRpdC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIHRyYXNoSWNvbi5zcmMgPSBcImltYWdlcy90cmFzaC5zdmdcIjtcclxuICBpY29ucy5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xyXG5cclxuICBwcm9qZWN0VmlzaWJsZS5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcclxuICBwcm9qZWN0VmlzaWJsZS5hcHBlbmRDaGlsZChpY29ucyk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RQb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByb2plY3ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gcHJvamVjdC5uYW1lO1xyXG4gIHByb2plY3RQb3B1cERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUlucHV0KTtcclxuXHJcbiAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFZpc2libGUpO1xyXG4gIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKHByb2plY3RQb3B1cERpdik7XHJcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdEFyZWEpO1xyXG5cclxuICBwcm9qZWN0VmlzaWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgY29uc3QgcHJldmlvdXNQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgcHJldmlvdXNQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICBwcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICB9KVxyXG5cclxuXHJcbi8vIGVkaXQgcHJvamVjdFxyXG4gIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBwcm9qZWN0VmlzaWJsZS5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSlcclxuXHJcbiAgXHJcbiAgcHJvamVjdFBvcHVwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBpZiAocHJvamVjdE5hbWVJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBwcm9qZWN0QXJlYS5yZW1vdmUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9qZWN0LmNoYW5nZU5hbWUgPSBwcm9qZWN0TmFtZUlucHV0LnZhbHVlO1xyXG4gICAgICAgIHByb2plY3RCdG4udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgICAgcHJvamVjdFZpc2libGUuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhnZXRQcm9qZWN0TGlzdCgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBkZWxldGUgcHJvamVjdFxyXG4gIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBnZXRQcm9qZWN0TGlzdCgpO1xyXG4gICAgY29uc3QgaW5kZXggPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IHByb2plY3QubmFtZSk7XHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICBwcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgcHJvamVjdEFyZWEucmVtb3ZlKCk7XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza3NVSSh0YXNrKSB7XHJcbiAgY29uc3QgdGFza0FyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgY29uc3QgdGFza1Zpc2libGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjb25zdCB0YXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGFza1Zpc2libGUuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gIHRhc2tCdG4udGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG5cclxuICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgY2lyY2xlSWNvbi5zcmMgPSBcImltYWdlcy9jaXJjbGUuc3ZnXCI7XHJcblxyXG4gIGNvbnN0IGljb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgaWNvbnMuY2xhc3NMaXN0LmFkZCgndGFzay1pY29ucycpO1xyXG5cclxuICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIGVkaXRJY29uLnNyYyA9IFwiaW1hZ2VzL2VkaXQuc3ZnXCI7XHJcbiAgaWNvbnMuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG5cclxuICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICB0cmFzaEljb24uc3JjID0gXCJpbWFnZXMvdHJhc2guc3ZnXCI7XHJcbiAgaWNvbnMuYXBwZW5kQ2hpbGQodHJhc2hJY29uKTtcclxuXHJcbiAgY29uc3QgaW5kZXggPSBjdXJyZW50UHJvamVjdC50YXNrTGlzdC5maW5kSW5kZXgoeCA9PiB4LnRpdGxlID09PSB0YXNrLnRpdGxlKTtcclxuICB0YXNrQXJlYS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XHJcbiAgdGFza0FyZWEuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCBjdXJyZW50UHJvamVjdC5uYW1lKTtcclxuICBcclxuICB0YXNrVmlzaWJsZS5hcHBlbmRDaGlsZChjaXJjbGVJY29uKTtcclxuICB0YXNrVmlzaWJsZS5hcHBlbmRDaGlsZCh0YXNrQnRuKTtcclxuICB0YXNrVmlzaWJsZS5hcHBlbmRDaGlsZChpY29ucyk7XHJcblxyXG4gIHRhc2tBcmVhLmFwcGVuZENoaWxkKHRhc2tWaXNpYmxlKTtcclxuXHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQodGFza0FyZWEpO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBmb3Igc2hvd2luZyB0YXNrcywgc3dpdGNoaW5nIHByb2plY3RzLiBUbyByZW1vdmUgY2hpbGRyZW4sXHJcbi8vIHNldCB0ZXh0Y29udGVudCB0byBcIlwiO1xyXG5cclxuZnVuY3Rpb24gcGFnZUxvYWQoKSB7XHJcbiAgLy8gcHJvamVjdHNcclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IENyZWF0ZVByb2plY3QoJ0luYm94Jyk7XHJcbiAgYWRkUHJvamVjdFRvTGlzdChkZWZhdWx0UHJvamVjdCk7XHJcbiAgcHJvamVjdHNVSShkZWZhdWx0UHJvamVjdCk7XHJcbiAgY3VycmVudFByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcclxuICBjcmVhdGVQcm9qZWN0QWRkKCk7XHJcblxyXG4gIC8vIHRhc2tzXHJcbiAgY29uc3QgdGFzazAgPSBDcmVhdGVUYXNrKCdUZXN0aW5nJywgJ2Rlc2NyaXB0aW9uIHRlc3QnLCAwKTtcclxuICBhZGRUYXNrVG9Qcm9qZWN0KHRhc2swLCBkZWZhdWx0UHJvamVjdCk7XHJcbiAgZGVmYXVsdFByb2plY3QudGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHRhc2tzVUkodGFzaykpO1xyXG4gIGNyZWF0ZVRhc2tBZGQoKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcGFnZUxvYWQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHBhZ2VMb2FkIH0gZnJvbSBcIi4vZG9tXCI7XHJcblxyXG5wYWdlTG9hZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==