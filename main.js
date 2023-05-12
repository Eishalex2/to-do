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
  projectList.push(project);
  // return projectList;
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


  const projectBtn = document.createElement('button');
  projectBtn.classList.add('current-project');
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

  projectBtn.addEventListener('click', (e) => {
    taskDisplay.textContent = '';
    currentProject = project;
    const previousProject = document.querySelector('.current-project');
    previousProject.classList.remove('current-project');
    e.target.classList.add('current-project');
    project.taskList.forEach(task => tasksUI(task));
    createTaskAdd();
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
  const defaultProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])('Inbox');
  (0,_addToDo__WEBPACK_IMPORTED_MODULE_2__.addProjectToList)(defaultProject);
  projectsUI(defaultProject);
  currentProject = defaultProject;
  createProjectAdd();

  // tasks
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vdG8tZG8vLi9zcmMvYWRkVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9jcmVhdGVQcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVRvRG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IENyZWF0ZVRhc2sgZnJvbSBcIi4vY3JlYXRlVG9Eb1wiO1xyXG4vLyBpbXBvcnQgQ3JlYXRlUHJvamVjdCBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0XCI7XHJcblxyXG4vLyBjb25zdCBkZWZhdWx0UHJvamVjdCA9IENyZWF0ZVByb2plY3QoXCJJbmJveFwiKTtcclxuXHJcbi8vIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHRhc2ssIHByb2plY3QpIHtcclxuICBwcm9qZWN0LnRhc2tMaXN0LnB1c2godGFzayk7XHJcbiAgcmV0dXJuIHByb2plY3QudGFza0xpc3Q7XHJcbn1cclxuXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gW107XHJcbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCkge1xyXG4gIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XHJcbiAgLy8gcmV0dXJuIHByb2plY3RMaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0TGlzdCgpIHtcclxuICByZXR1cm4gcHJvamVjdExpc3Q7XHJcbn1cclxuXHJcbi8vIHJlbW92ZSB0YXNrIChjb21wbGV0ZWQpXHJcblxyXG5leHBvcnQgeyBhZGRUYXNrVG9Qcm9qZWN0LCBhZGRQcm9qZWN0VG9MaXN0LCBnZXRQcm9qZWN0TGlzdCB9OyIsImNvbnN0IENyZWF0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xyXG4gIGxldCBwcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgY29uc3QgdGFza0xpc3QgPSBbXTtcclxuICByZXR1cm4ge1xyXG4gICAgdGFza0xpc3QsXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3ROYW1lO1xyXG4gICAgfSxcclxuICAgIHNldCBjaGFuZ2VOYW1lKG5ld05hbWUpIHtcclxuICAgICAgcHJvamVjdE5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVByb2plY3Q7IiwiY29uc3QgQ3JlYXRlVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb249JycsIHByaW9yaXR5PTApID0+IHtcclxuICBsZXQgcHJvamVjdFRpdGxlID0gdGl0bGU7XHJcbiAgbGV0IHByb2plY3REZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gIGxldCBwcm9qZWN0UHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdFRpdGxlO1xyXG4gICAgfSxcclxuICAgIGdldCBkZXNjcmlwdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3REZXNjcmlwdGlvbjtcclxuICAgIH0sXHJcbiAgICBnZXQgcHJpb3JpdHkoKSB7XHJcbiAgICAgIHJldHVybiBwcm9qZWN0UHJpb3JpdHk7XHJcbiAgICB9LFxyXG4gICAgc2V0IGNoYW5nZVRpdGxlKG5ld1RpdGxlKSB7XHJcbiAgICAgIHByb2plY3RUaXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgfSxcclxuICAgIHNldCBjaGFuZ2VEZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgICBwcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH0sXHJcbiAgICBzZXQgY2hhbmdlUHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcclxuICAgICAgcHJvamVjdFByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbiAgICB9XHJcbiAgfSBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlVGFzaztcclxuXHJcbi8vIHNraXBwaW5nIGR1ZSBkYXRlIGZvciBub3cgYmVjYXVzZSBJIGRvbid0IHJlYWxseSB1bmRlcnN0YW5kIGRhdGUtZm5zIiwiaW1wb3J0IENyZWF0ZVByb2plY3QgZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xyXG5pbXBvcnQgQ3JlYXRlVGFzayBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbmltcG9ydCB7IGFkZFRhc2tUb1Byb2plY3QsIGFkZFByb2plY3RUb0xpc3QsIGdldFByb2plY3RMaXN0IH0gZnJvbSBcIi4vYWRkVG9Eb1wiO1xyXG5cclxuY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcclxuY29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MnKTtcclxubGV0IGN1cnJlbnRQcm9qZWN0O1xyXG5cclxuLy8gZnVuY3Rpb24gcHJvamVjdFBvcHVwKCkge1xyXG4vLyAgIGNvbnN0IHByb2plY3RQb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4vLyAgIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4vLyAgIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4vLyAgIHByb2plY3ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuLy8gICBwcm9qZWN0UG9wdXBEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVJbnB1dCk7XHJcblxyXG4vLyAgLy8gcHJvamVjdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKClcclxuXHJcbi8vICAgcmV0dXJuIHByb2plY3RQb3B1cERpdjtcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdEFkZCgpIHtcclxuICBjb25zdCBuZXdQcm9qZWN0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICBjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCduZXctcHJvamVjdCcpO1xyXG4gIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICcrIE5ldyBQcm9qZWN0JztcclxuXHJcbiAgY29uc3QgcHJvamVjdFBvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgcHJvamVjdE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIHByb2plY3RQb3B1cERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUlucHV0KTtcclxuXHJcbiAgbmV3UHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ0bik7XHJcbiAgbmV3UHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFBvcHVwRGl2KTtcclxuICBwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QXJlYSk7XHJcblxyXG4gIG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gIH0pO1xyXG5cclxuICBwcm9qZWN0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBpZiAocHJvamVjdE5hbWVJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3UHJvamVjdEFyZWEucmVtb3ZlKCk7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IENyZWF0ZVByb2plY3QoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gbmV3UHJvamVjdDtcclxuICAgICAgICBhZGRQcm9qZWN0VG9MaXN0KG5ld1Byb2plY3QpO1xyXG5cclxuICAgICAgICBjb25zdCBwcmV2aW91c1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICAgICAgcHJldmlvdXNQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgICAgIHByb2plY3RzVUkobmV3UHJvamVjdCk7XHJcbiAgICAgICAgY3JlYXRlUHJvamVjdEFkZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFza0FkZCgpIHtcclxuICBjb25zdCBuZXdUYXNrQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICBjb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgbmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG4gIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBuZXdUYXNrQnRuLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgbmV3VGFza0J0bi50ZXh0Q29udGVudCA9ICcrIEFkZCBUYXNrJztcclxuXHJcbiAgY29uc3QgdGFza1BvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGFza1BvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZWRpdCcpO1xyXG4gIHRhc2tQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdudW1iZXInKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgMCk7XHJcbiAgcHJpb3JpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIDEwKTtcclxuICBwcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAwKTtcclxuXHJcbiAgdGFza1BvcHVwRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xyXG4gIHRhc2tQb3B1cERpdi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcclxuICB0YXNrUG9wdXBEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dCk7XHJcblxyXG4gIG5ld1Rhc2tBcmVhLmFwcGVuZENoaWxkKG5ld1Rhc2tCdG4pO1xyXG4gIG5ld1Rhc2tBcmVhLmFwcGVuZENoaWxkKHRhc2tQb3B1cERpdik7XHJcblxyXG4gIHRhc2tEaXNwbGF5LmFwcGVuZENoaWxkKG5ld1Rhc2tBcmVhKTtcclxuXHJcbiAgbmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgfSk7XHJcblxyXG4gIHRhc2tQb3B1cERpdi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgaWYgKHRpdGxlSW5wdXQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdUYXNrQXJlYS5yZW1vdmUoKTtcclxuICAgICAgICBjb25zdCBuZXdUYXNrID0gQ3JlYXRlVGFzayh0aXRsZUlucHV0LnZhbHVlLCBkZXNjcmlwdGlvbklucHV0LnZhbHVlLCBwcmlvcml0eUlucHV0LnZhbHVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdUYXNrKTtcclxuICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0KG5ld1Rhc2ssIGN1cnJlbnRQcm9qZWN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdC50YXNrTGlzdCk7XHJcbiAgICAgICAgdGFza3NVSShuZXdUYXNrKTtcclxuICAgICAgICBjcmVhdGVUYXNrQWRkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0c1VJKHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHJcbiAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XHJcbiAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG5cclxuICBjb25zdCBwcm9qZWN0UG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBwcm9qZWN0TmFtZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lSW5wdXQpO1xyXG5cclxuICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcclxuICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0UG9wdXBEaXYpO1xyXG4gIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKHByb2plY3RBcmVhKTtcclxuXHJcbiAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICB0YXNrRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgY29uc3QgcHJldmlvdXNQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgcHJldmlvdXNQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcHJvamVjdCcpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wcm9qZWN0Jyk7XHJcbiAgICBwcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICAgIGNyZWF0ZVRhc2tBZGQoKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrc1VJKHRhc2spIHtcclxuICBjb25zdCB0YXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdGFza0J0bi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgdGFza0J0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGVzY3JpcHRpb24nLCB0YXNrLmRlc2NyaXB0aW9uKTtcclxuICB0YXNrQnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eScsIHRhc2sucHJpb3JpdHkpO1xyXG4gIHRhc2tCdG4uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCBjdXJyZW50UHJvamVjdC5uYW1lKTtcclxuICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZCh0YXNrQnRuKTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZm9yIHNob3dpbmcgdGFza3MsIHN3aXRjaGluZyBwcm9qZWN0cy4gVG8gcmVtb3ZlIGNoaWxkcmVuLFxyXG4vLyBzZXQgdGV4dGNvbnRlbnQgdG8gXCJcIjtcclxuXHJcbmZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xyXG4gIC8vIHByb2plY3RzXHJcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBDcmVhdGVQcm9qZWN0KCdJbmJveCcpO1xyXG4gIGFkZFByb2plY3RUb0xpc3QoZGVmYXVsdFByb2plY3QpO1xyXG4gIHByb2plY3RzVUkoZGVmYXVsdFByb2plY3QpO1xyXG4gIGN1cnJlbnRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XHJcbiAgY3JlYXRlUHJvamVjdEFkZCgpO1xyXG5cclxuICAvLyB0YXNrc1xyXG4gIGRlZmF1bHRQcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICBjcmVhdGVUYXNrQWRkKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHBhZ2VMb2FkIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwYWdlTG9hZCB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxucGFnZUxvYWQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=