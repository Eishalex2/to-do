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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import CreateTask from "./createToDo";
// import CreateProject from "./createProject";

// const defaultProject = CreateProject("Inbox");

// const currentProject = defaultProject;

function addTaskToProject(task, project) {
  project.taskList.push(task);
  return project.taskList;
}

// remove task (completed)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addTaskToProject);

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
  const taskList = [];
  return {
    name,
    taskList
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
const CreateTask = (title, description='', priority=0) => ({
  title,
  description,
  priority
});

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
        projectsUI((0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target.value));
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
  const defaultProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])('Inbox');
  currentProject = defaultProject;
  projectsUI(defaultProject);
  createProjectAdd();

  // tasks
  defaultProject.taskList.forEach(task => tasksUI(task));
  createTaskAdd();
}

function domLogic() {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0FDZC9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ1I1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLFVBQVUsRUFBQztBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1I0QztBQUNOO0FBQ0c7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsbUJBQW1CLDBEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOaUM7QUFDakM7QUFDQSw4Q0FBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvYWRkVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9jcmVhdGVQcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVRvRG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IENyZWF0ZVRhc2sgZnJvbSBcIi4vY3JlYXRlVG9Eb1wiO1xyXG4vLyBpbXBvcnQgQ3JlYXRlUHJvamVjdCBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0XCI7XHJcblxyXG4vLyBjb25zdCBkZWZhdWx0UHJvamVjdCA9IENyZWF0ZVByb2plY3QoXCJJbmJveFwiKTtcclxuXHJcbi8vIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHRhc2ssIHByb2plY3QpIHtcclxuICBwcm9qZWN0LnRhc2tMaXN0LnB1c2godGFzayk7XHJcbiAgcmV0dXJuIHByb2plY3QudGFza0xpc3Q7XHJcbn1cclxuXHJcbi8vIHJlbW92ZSB0YXNrIChjb21wbGV0ZWQpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhZGRUYXNrVG9Qcm9qZWN0OyIsImNvbnN0IENyZWF0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xyXG4gIGNvbnN0IHRhc2tMaXN0ID0gW107XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICB0YXNrTGlzdFxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVByb2plY3Q7IiwiY29uc3QgQ3JlYXRlVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb249JycsIHByaW9yaXR5PTApID0+ICh7XHJcbiAgdGl0bGUsXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgcHJpb3JpdHlcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVUYXNrO1xyXG5cclxuLy8gc2tpcHBpbmcgZHVlIGRhdGUgZm9yIG5vdyBiZWNhdXNlIEkgZG9uJ3QgcmVhbGx5IHVuZGVyc3RhbmQgZGF0ZS1mbnMiLCJpbXBvcnQgQ3JlYXRlUHJvamVjdCBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0XCI7XHJcbmltcG9ydCBDcmVhdGVUYXNrIGZyb20gXCIuL2NyZWF0ZVRvRG9cIjtcclxuaW1wb3J0IGFkZFRhc2tUb1Byb2plY3QgZnJvbSBcIi4vYWRkVG9Eb1wiO1xyXG5cclxuY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcclxuY29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MnKTtcclxuXHJcbmxldCBjdXJyZW50UHJvamVjdDtcclxuXHJcbi8vIGZ1bmN0aW9uIHByb2plY3RQb3B1cCgpIHtcclxuLy8gICBjb25zdCBwcm9qZWN0UG9wdXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gICBwcm9qZWN0UG9wdXBEaXYuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuLy8gICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuLy8gICBwcm9qZWN0TmFtZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbi8vICAgcHJvamVjdFBvcHVwRGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lSW5wdXQpO1xyXG5cclxuLy8gIC8vIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigpXHJcblxyXG4vLyAgIHJldHVybiBwcm9qZWN0UG9wdXBEaXY7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RBZGQoKSB7XHJcbiAgY29uc3QgbmV3UHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnbmV3LXByb2plY3QnKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gIG5ld1Byb2plY3RCdG4udGV4dENvbnRlbnQgPSAnKyBOZXcgUHJvamVjdCc7XHJcblxyXG4gIGNvbnN0IHByb2plY3RQb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHByb2plY3RQb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xyXG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIHByb2plY3ROYW1lSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBwcm9qZWN0UG9wdXBEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVJbnB1dCk7XHJcblxyXG4gIG5ld1Byb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdG4pO1xyXG4gIG5ld1Byb2plY3RBcmVhLmFwcGVuZENoaWxkKHByb2plY3RQb3B1cERpdik7XHJcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEFyZWEpO1xyXG5cclxuICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgncG9wdXAnKTtcclxuICB9KTtcclxuXHJcbiAgcHJvamVjdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgaWYgKHByb2plY3ROYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1Byb2plY3RBcmVhLnJlbW92ZSgpO1xyXG4gICAgICAgIHByb2plY3RzVUkoQ3JlYXRlUHJvamVjdChlLnRhcmdldC52YWx1ZSkpO1xyXG4gICAgICAgIGNyZWF0ZVByb2plY3RBZGQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRhc2tBZGQoKSB7XHJcbiAgY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2snKTtcclxuICBuZXdUYXNrQnRuLnRleHRDb250ZW50ID0gJysgQWRkIFRhc2snO1xyXG4gIHRhc2tEaXNwbGF5LmFwcGVuZENoaWxkKG5ld1Rhc2tCdG4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0c1VJKHByb2plY3QpIHtcclxuICAvLyB0aGluZ3MgYXJlIGdldHRpbmcgdG9vIGNvbXBsaWNhdGVkLiBGb2N1c2luZyBvbiBhZGRpbmcgbmV3IHByb2plY3RzXHJcbiAgLy8gbm93LiBXaWxsIG5lZWQgdG8gZmlndXJlIG91dCBob3cgdG8gY2hhbmdlIHRoZSBuYW1lIG9mIGV4aXN0aW5nXHJcbiAgLy8gcHJvamVjdHMgbGF0ZXIuXHJcbiAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xyXG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcclxuICBwcm9qZWN0QnRuLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwJyk7XHJcbiAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFBvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgcHJvamVjdFBvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XHJcbiAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgcHJvamVjdE5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIHByb2plY3RQb3B1cERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZUlucHV0KTtcclxuXHJcbiAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdEJ0bik7XHJcbiAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFBvcHVwRGl2KTtcclxuICBwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0QXJlYSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tzVUkodGFzaykge1xyXG4gIGNvbnN0IHRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICB0YXNrQnRuLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICB0YXNrQnRuLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZCh0YXNrQnRuKTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZm9yIHNob3dpbmcgdGFza3MsIHN3aXRjaGluZyBwcm9qZWN0cy4gVG8gcmVtb3ZlIGNoaWxkcmVuLFxyXG4vLyBzZXQgdGV4dGNvbnRlbnQgdG8gXCJcIjtcclxuXHJcbmZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xyXG4gIC8vIHByb2plY3RzXHJcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBDcmVhdGVQcm9qZWN0KCdJbmJveCcpO1xyXG4gIGN1cnJlbnRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XHJcbiAgcHJvamVjdHNVSShkZWZhdWx0UHJvamVjdCk7XHJcbiAgY3JlYXRlUHJvamVjdEFkZCgpO1xyXG5cclxuICAvLyB0YXNrc1xyXG4gIGRlZmF1bHRQcm9qZWN0LnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB0YXNrc1VJKHRhc2spKTtcclxuICBjcmVhdGVUYXNrQWRkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvbUxvZ2ljKCkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgcGFnZUxvYWQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHBhZ2VMb2FkIH0gZnJvbSBcIi4vZG9tXCI7XHJcblxyXG5wYWdlTG9hZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==