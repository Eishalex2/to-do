const CreateTask = (title, description='', priority=0) => {
  let projectTitle = title;
  let projectDescription = description;
  let projectPriority = priority;
  return {
    get title() {
      return projectTitle;
    },
    get description() {
      return projectDescription;
    },
    get priority() {
      return projectPriority;
    },
    set changeTitle(newTitle) {
      projectTitle = newTitle;
    },
    set changeDescription(newDescription) {
      projectDescription = newDescription;
    },
    set changePriority(newPriority) {
      projectPriority = newPriority;
    }
  } 
}

export default CreateTask;

// skipping due date for now because I don't really understand date-fns