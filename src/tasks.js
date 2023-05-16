import projects from "./projects";

const tasks = (() => {
  const CreateTask = (title, projectIndex, taskIndex, dueDate = '', description='', priority=0, completed = false) => {
    let taskTitle = title;
    let projectsIndex = projectIndex;
    let tasksIndex = taskIndex;
    let taskDueDate = dueDate;
    let taskDescription = description;
    let taskPriority = priority;
    let taskCompleted = completed;
    return {
      get title() {
        return taskTitle;
      },
      get projectIndex() {
        return projectsIndex;
      },
      get taskIndex() {
        return tasksIndex;
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
      get taskCompleted() {
        return taskCompleted;
      },
      set changeTitle(newTitle) {
        taskTitle = newTitle;
      },
      set changeProjectIndex(newProjectIndex) {
        projectsIndex = newProjectIndex;
      },
      set changeTaskIndex(newTaskIndex) {
        tasksIndex = newTaskIndex;
      },
      set changeDueDate(newDueDate) {
        taskDueDate = newDueDate;
      },
      set changeDescription(newDescription) {
        taskDescription = newDescription;
      },
      set changePriority(newPriority) {
        taskPriority = newPriority;
      },
      set changeTaskCompleted(boolean) {
        taskCompleted = boolean;
      }
    } 
  }

  function addTask(title, projectIndex, taskIndex, dueDate, description, priority, completed) {
    const newTask = CreateTask(title, projectIndex, taskIndex, dueDate, description, priority, completed);

    projects.projectList[projectIndex].tasks.push(newTask);
  }

  function editTask(task, newTitle, newDueDate, newDescription, newPriority) {
    task.changeTitle = newTitle;
    task.changeDueDate = newDueDate;
    task.changeDescription = newDescription;
    task.changePriority = newPriority;
  }

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
    }
  }

  function toggleCompleteTask(task) {
    if (task.taskCompleted === false) {
      task.changeTaskCompleted = true;
    } else {
      task.changeTaskCompleted = false;
    }
  }

  return {
    addTask,
    editTask,
    deleteTask,
    toggleCompleteTask
  }
})();

export default tasks;