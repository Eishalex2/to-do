const CreateProject = (name) => {
  let projectName = name;
  const taskList = [];
  const completedTasks = [];
  return {
    taskList,
    completedTasks,
    get name() {
      return projectName;
    },
    set changeName(newName) {
      projectName = newName;
    }
  }
};

export default CreateProject;