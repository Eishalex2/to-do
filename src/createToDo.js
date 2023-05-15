const CreateTask = (title, dueDate = '', description='', priority=0) => {
  let taskTitle = title;
  let taskDueDate = dueDate;
  let taskDescription = description;
  let taskPriority = priority;
  return {
    get title() {
      return taskTitle;
    },
    get dueDate() {
      return taskDueDate;
    },
    get description() {
      return taskDescription;
    },
    get priority() {
      return taskPriority;
    },
    set changeTitle(newTitle) {
      taskTitle = newTitle;
    },
    set changeDueDate(newDueDate) {
      taskDueDate = newDueDate;
    },
    set changeDescription(newDescription) {
      taskDescription = newDescription;
    },
    set changePriority(newPriority) {
      taskPriority = newPriority;
    }
  } 
}

function editTask(task, newTitle, newDueDate, newDescription, newPriority) {
  task.changeTitle = newTitle;
  task.changeDueDate = newDueDate;
  task.changeDescription = newDescription;
  task.changePriority = newPriority;
}

export { CreateTask, editTask };

// skipping due date for now because I don't really understand date-fns