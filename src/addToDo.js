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

export { addTaskToProject, addProjectToList, getProjectList };