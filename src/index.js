import project from "./createProject";
import toDo from "./createToDo";

const defaultProject = project("inbox");
const task0 = toDo("stuff");

function addToDo(task, currentProject = defaultProject) {
  currentProject.projectList.push(task);

  return currentProject.projectList;
}

addToDo(task0);