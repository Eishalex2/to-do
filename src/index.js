import CreateProject from "./createProject";
import CreateTask from "./createToDo";
import addTaskToProject from "./addToDo";

const projectDisplay = document.getElementById('projects');
const taskDisplay = document.getElementById('tasks');

const defaultProject = CreateProject("Inbox");

const task0 = CreateTask('stuff');

addTaskToProject(task0, defaultProject);

const InboxBtn = document.createElement('button');
InboxBtn.textContent = defaultProject.name;

projectDisplay.appendChild(InboxBtn);

InboxBtn.addEventListener('click', () => {
  defaultProject.taskList.forEach(object => {
    const taskBtn = document.createElement('button')
    taskBtn.textContent = object.title;
    taskDisplay.appendChild(taskBtn);
  })

})