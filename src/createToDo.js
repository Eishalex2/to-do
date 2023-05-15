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

function editTask(task, newTitle, newDescription, newPriority) {
  task.changeTitle = newTitle;
  task.changeDescription = newDescription;
  task.changePriority = newPriority;
}

export { CreateTask, editTask };

// skipping due date for now because I don't really understand date-fns