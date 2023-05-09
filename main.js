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

function createProjectAdd() {
  const newProjectBtn = document.createElement('button');
  newProjectBtn.classList.add('new-project');
  newProjectBtn.textContent = '+ New Project';
  projectDisplay.appendChild(newProjectBtn);
}

function createTaskAdd() {
  const newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('new-task');
  newTaskBtn.textContent = '+ Add Task';
  taskDisplay.appendChild(newTaskBtn);
}

function projectsUI(project) {
  const projectBtn = document.createElement('button');
  projectBtn.classList.add('project');
  projectBtn.textContent = project.name;
  projectDisplay.appendChild(projectBtn);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0FDZC9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ1I1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLFVBQVUsRUFBQztBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1I0QztBQUNOO0FBQ0c7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ25EQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ2pDO0FBQ0EsOENBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLy4vc3JjL2FkZFRvRG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvY3JlYXRlUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9jcmVhdGVUb0RvLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBDcmVhdGVUYXNrIGZyb20gXCIuL2NyZWF0ZVRvRG9cIjtcclxuLy8gaW1wb3J0IENyZWF0ZVByb2plY3QgZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xyXG5cclxuLy8gY29uc3QgZGVmYXVsdFByb2plY3QgPSBDcmVhdGVQcm9qZWN0KFwiSW5ib3hcIik7XHJcblxyXG4vLyBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRlZmF1bHRQcm9qZWN0O1xyXG5cclxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdCh0YXNrLCBwcm9qZWN0KSB7XHJcbiAgcHJvamVjdC50YXNrTGlzdC5wdXNoKHRhc2spO1xyXG4gIHJldHVybiBwcm9qZWN0LnRhc2tMaXN0O1xyXG59XHJcblxyXG4vLyByZW1vdmUgdGFzayAoY29tcGxldGVkKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWRkVGFza1RvUHJvamVjdDsiLCJjb25zdCBDcmVhdGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcclxuICBjb25zdCB0YXNrTGlzdCA9IFtdO1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lLFxyXG4gICAgdGFza0xpc3RcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVQcm9qZWN0OyIsImNvbnN0IENyZWF0ZVRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uPScnLCBwcmlvcml0eT0wKSA9PiAoe1xyXG4gIHRpdGxlLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIHByaW9yaXR5XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlVGFzaztcclxuXHJcbi8vIHNraXBwaW5nIGR1ZSBkYXRlIGZvciBub3cgYmVjYXVzZSBJIGRvbid0IHJlYWxseSB1bmRlcnN0YW5kIGRhdGUtZm5zIiwiaW1wb3J0IENyZWF0ZVByb2plY3QgZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xyXG5pbXBvcnQgQ3JlYXRlVGFzayBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbmltcG9ydCBhZGRUYXNrVG9Qcm9qZWN0IGZyb20gXCIuL2FkZFRvRG9cIjtcclxuXHJcbmNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XHJcbmNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tzJyk7XHJcblxyXG5sZXQgY3VycmVudFByb2plY3Q7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0QWRkKCkge1xyXG4gIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ25ldy1wcm9qZWN0Jyk7XHJcbiAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICcrIE5ldyBQcm9qZWN0JztcclxuICBwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFza0FkZCgpIHtcclxuICBjb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgbmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG4gIG5ld1Rhc2tCdG4udGV4dENvbnRlbnQgPSAnKyBBZGQgVGFzayc7XHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQobmV3VGFza0J0bik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RzVUkocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcclxuICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrc1VJKHRhc2spIHtcclxuICBjb25zdCB0YXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdGFza0J0bi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgdGFza0J0bi50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQodGFza0J0bik7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGZvciBzaG93aW5nIHRhc2tzLCBzd2l0Y2hpbmcgcHJvamVjdHMuIFRvIHJlbW92ZSBjaGlsZHJlbixcclxuLy8gc2V0IHRleHRjb250ZW50IHRvIFwiXCI7XHJcblxyXG5mdW5jdGlvbiBwYWdlTG9hZCgpIHtcclxuICAvLyBwcm9qZWN0c1xyXG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdCgnSW5ib3gnKTtcclxuICBjdXJyZW50UHJvamVjdCA9IGRlZmF1bHRQcm9qZWN0O1xyXG4gIHByb2plY3RzVUkoZGVmYXVsdFByb2plY3QpO1xyXG4gIGNyZWF0ZVByb2plY3RBZGQoKTtcclxuXHJcbiAgLy8gdGFza3NcclxuICBkZWZhdWx0UHJvamVjdC50YXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4gdGFza3NVSSh0YXNrKSk7XHJcbiAgY3JlYXRlVGFza0FkZCgpO1xyXG59XHJcblxyXG5leHBvcnQgeyBwYWdlTG9hZCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcGFnZUxvYWQgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbnBhZ2VMb2FkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9