const projects = (() => {
  let projectList = [];

  if (localStorage.getItem('projects') === null) {
    projectList = [
      {
        name: 'Inbox',
        index: 0,
        current: true,
        tasks: [
          {
            title: 'Example task',
            index: 0,
            taskIndex: 0,
            dueDate: '2023-06-13',
            description: 'description test',
            priority: 0,
            completed: false
          }
        ]
      }
    ]
  } else {
    const storageProjects = JSON.parse(localStorage.getItem('projects'));
    projectList = storageProjects;
  }

  const CreateProject = (name, projectIndex, current = false) => {
    let projectName = name;
    const index = projectIndex;
    let currentProject = current;
    const tasks = [];

    return {
      tasks,
      get name() {
        return projectName;
      },
      get projectIndex() {
        return index;
      },
      get current() {
        return currentProject;
      },
      set changeName(newName) {
        projectName = newName;
      },
      set changeCurrent(boolean) {
        currentProject = boolean;
      }
    }
  }

  function addProject(name) {
    const newProject = CreateProject(name);
    const newProjectName = newProject.name;
    const newProjectIndex = projectList.length;
    const newProjectStatus = true;
    const newProjectTasks = newProject.tasks;
    projectList.push({
      name: newProjectName,
      index: newProjectIndex,
      current: newProjectStatus,
      tasks: newProjectTasks
    })
  }

  function editProject(newName, index) {
    projectList[index].name = newName;
  }

  function deleteProject(index) {
    if (index > -1) {
      projectList.splice(index, 1);
    }
    for (let i = 0; i < projectList.length; i++) {
      projectList[i].index = i;
    }
    projectList[0].current = true;
  }

  return {
    projectList,
    addProject,
    editProject,
    deleteProject
  }
})();

export default projects;