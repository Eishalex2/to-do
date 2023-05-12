const CreateProject = (name) => {
  let projectName = name;
  const taskList = [];
  return {
    taskList,
    get name() {
      return projectName;
    },
    set changeName(newName) {
      projectName = newName;
    }
  }
};

export default CreateProject;