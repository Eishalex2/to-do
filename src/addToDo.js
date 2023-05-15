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

export { addTaskToProject, addProjectToList, getProjectList, deleteTask, completeTask };