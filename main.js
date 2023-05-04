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
  console.log(project.taskList);
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
/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ "./src/createProject.js");
/* harmony import */ var _createToDo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createToDo */ "./src/createToDo.js");
/* harmony import */ var _addToDo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addToDo */ "./src/addToDo.js");




const projectList = document.getElementById('projects');

const defaultProject = (0,_createProject__WEBPACK_IMPORTED_MODULE_0__["default"])("Inbox");

projectList.appendChild(defaultProject.name); // can't append just the name. Instead, append a button, with the text content as the name!!
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7QUNmL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGFBQWE7Ozs7Ozs7Ozs7Ozs7O0FDUjVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsVUFBVSxFQUFDO0FBQzFCO0FBQ0E7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QztBQUNOO0FBQ0c7QUFDekM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFhO0FBQ3BDO0FBQ0EsOENBQThDLDRGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvYWRkVG9Eby5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9jcmVhdGVQcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2NyZWF0ZVRvRG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQ3JlYXRlVGFzayBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbi8vIGltcG9ydCBDcmVhdGVQcm9qZWN0IGZyb20gXCIuL2NyZWF0ZVByb2plY3RcIjtcclxuXHJcbi8vIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gQ3JlYXRlUHJvamVjdChcIkluYm94XCIpO1xyXG5cclxuLy8gY29uc3QgY3VycmVudFByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QodGFzaywgcHJvamVjdCkge1xyXG4gIHByb2plY3QudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICBjb25zb2xlLmxvZyhwcm9qZWN0LnRhc2tMaXN0KTtcclxuICByZXR1cm4gcHJvamVjdC50YXNrTGlzdDtcclxufVxyXG5cclxuLy8gcmVtb3ZlIHRhc2sgKGNvbXBsZXRlZClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFkZFRhc2tUb1Byb2plY3Q7IiwiY29uc3QgQ3JlYXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XHJcbiAgY29uc3QgdGFza0xpc3QgPSBbXTtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZSxcclxuICAgIHRhc2tMaXN0XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUHJvamVjdDsiLCJjb25zdCBDcmVhdGVUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbj0nJywgcHJpb3JpdHk9MCkgPT4gKHtcclxuICB0aXRsZSxcclxuICBkZXNjcmlwdGlvbixcclxuICBwcmlvcml0eVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVRhc2s7XHJcblxyXG4vLyBza2lwcGluZyBkdWUgZGF0ZSBmb3Igbm93IGJlY2F1c2UgSSBkb24ndCByZWFsbHkgdW5kZXJzdGFuZCBkYXRlLWZucyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IENyZWF0ZVByb2plY3QgZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xyXG5pbXBvcnQgQ3JlYXRlVGFzayBmcm9tIFwiLi9jcmVhdGVUb0RvXCI7XHJcbmltcG9ydCBhZGRUYXNrVG9Qcm9qZWN0IGZyb20gXCIuL2FkZFRvRG9cIjtcclxuXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IENyZWF0ZVByb2plY3QoXCJJbmJveFwiKTtcclxuXHJcbnByb2plY3RMaXN0LmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Lm5hbWUpOyAvLyBjYW4ndCBhcHBlbmQganVzdCB0aGUgbmFtZS4gSW5zdGVhZCwgYXBwZW5kIGEgYnV0dG9uLCB3aXRoIHRoZSB0ZXh0IGNvbnRlbnQgYXMgdGhlIG5hbWUhISJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==