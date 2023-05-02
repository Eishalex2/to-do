// import CreateTask from "./createToDo";
import CreateProject from "./createProject";

const defaultProject = CreateProject("Inbox");

const currentProject = defaultProject;

function addTaskToProject(task, project=currentProject) {
  project.taskList.push(task);
  console.log(project.taskList);
  return project.taskList;
}

// remove task (completed)

export default addTaskToProject;