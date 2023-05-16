const projects = (() => {
  let projectList = [];

  if (localStorage.getItem('projects') === null) {
    projectList = [
      {
        name: 'Inbox',
        tasks: [
          {
            title: 'Example task',
            projectIndex: 0,
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

  const CreateProject = (name) => {
    let projectName = name;
    const tasks = [];

    return {
      tasks,
      get name() {
        return projectName;
      },
      set changeName(newName) {
        projectName = newName;
      }
    }
  }

  function addProject(name) {
    const newProject = CreateProject(name);
    projectList.push(newProject);
  }

  function editProject(newName, index) {
    projectList[index].changeName = newName;
  }

  function deleteProject(index) {
    if (index > -1) {
      projectList.splice(index, 1);
    }
  }

  return {
    projectList,
    addProject,
    editProject,
    deleteProject
  }
})();

export default projects;