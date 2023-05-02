import CreateTask from "./createToDo";
// import CreateProject from "./createProject";
import addTaskToProject from "./addToDo";

console.log("Hello");

const task0 = CreateTask("stuff");
const task1 = CreateTask("things");
addTaskToProject(task0);
addTaskToProject(task1);