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
    const newTaskTitle = newTask.title;
    const newTaskProjectIndex = newTask.projectIndex;
    const newTaskTaskIndex = newTask.taskIndex;
    const newTaskDueDate = newTask.dueDate;
    const newTaskDescription = newTask.description;
    const newTaskPriority = newTask.priority;
    const newTaskCompleted = newTask.taskCompleted;

    projects.projectList[projectIndex].tasks.push({
      title: newTaskTitle,
      projectIndex: newTaskProjectIndex,
      taskIndex: newTaskTaskIndex,
      dueDate: newTaskDueDate,
      description: newTaskDescription,
      priority: newTaskPriority,
      completed: newTaskCompleted
    });
  }

  function editTask(projectIndex, taskIndex, newTitle, newDueDate, newDescription, newPriority) {
    const currentTask = projects.projectList[projectIndex].tasks[taskIndex];
    currentTask.title = newTitle;
    currentTask.dueDate = newDueDate;
    currentTask.description = newDescription;
    currentTask.priority = newPriority;
  }

  function deleteTask(projectIndex, taskIndex) {
    if (projectIndex > -1) {
      projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
    }
  }

  function toggleCompleteTask(projectIndex, taskIndex) {
    const currentTask = projects.projectList[projectIndex].tasks[taskIndex];
    if (currentTask.completed === false) {
      currentTask.completed = true;
    } else {
      currentTask.completed = false;
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