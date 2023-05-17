import { format, parseISO } from 'date-fns';
import projects from "./projects";
import tasks from "./tasks";

const pageLoad = (() => {

  const projectDisplay = document.getElementById('projects');
  const taskDisplay = document.getElementById('tasks');

    // show projects
  function showProjects() {
    localStorage.setItem('projects', JSON.stringify(projects.projectList));
    projectDisplay.textContent = '';
    projects.projectList.forEach(project => {
      const projectArea = document.createElement('div');
      projectArea.setAttribute('data-index', project.index);
      projectArea.setAttribute('data-current', project.current);

      const projectVisible = document.createElement('div');
      const projectBtn = document.createElement('div');
      projectVisible.classList.add('project');
      projectVisible.classList.add('popup');
      projectVisible.classList.toggle('popup');
      projectBtn.textContent = project.name;

      const icons = document.createElement('div');
      icons.classList.add('project-icons');

      const editIcon = document.createElement('img');
      editIcon.src = "images/edit.svg";
      icons.appendChild(editIcon);

      const trashIcon = document.createElement('img');
      trashIcon.src = "images/trash.svg";
      icons.appendChild(trashIcon);

      projectVisible.appendChild(projectBtn);
      projectVisible.appendChild(icons);

      const projectPopupDiv = document.createElement('div');
      projectPopupDiv.classList.add('popup');
      const projectNameInput = document.createElement('input');
      projectNameInput.setAttribute('type', 'text');
      projectNameInput.value = project.name;
      projectPopupDiv.appendChild(projectNameInput);

      projectArea.appendChild(projectVisible);
      projectArea.appendChild(projectPopupDiv);
      projectDisplay.appendChild(projectArea);

      if (project.current === true) {
        projectVisible.classList.add('current-project');
      }

      // click to switch projects
      projectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      projectVisible.addEventListener('click', () => {
        projects.projectList.forEach(project => {
          project.current = false;
        })
        projects.projectList[projectArea.getAttribute('data-index')].current = true;
        showProjects();
        createProjectAdd();
        showTasks();
        createTaskAdd();
      });

      // edit project
      editIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        projectVisible.classList.toggle('popup');
        projectPopupDiv.classList.toggle('popup');
      });

      projectNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          projects.editProject(projectNameInput.value, e.target.parentElement.parentElement.getAttribute('data-index'));
          projectVisible.classList.toggle('popup');
          projectPopupDiv.classList.toggle('popup');
          projectBtn.textContent = e.target.value;      
        }
      })

      // delete project
      trashIcon.addEventListener('click', () => {
        if (projectArea.getAttribute('data-current') === true) {
          projects.deleteProject(projectArea.getAttribute('data-index'));
          projects.projectList[0].current = true;
        } else {
          projects.deleteProject(projectArea.getAttribute('data-index'));
        }
        projectArea.remove();
        showProjects();
        createProjectAdd();
        showTasks();
        createTaskAdd();
      })
    })
  }

  // project add button
  function createProjectAdd() {
    const newProjectArea = document.createElement('div');

    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('new-project');
    newProjectBtn.classList.add('popup');
    newProjectBtn.classList.toggle('popup');
    newProjectBtn.textContent = '+ New Project';
  
    const projectPopupDiv = document.createElement('div');
    projectPopupDiv.classList.add('popup');
    const projectNameInput = document.createElement('input');
    projectNameInput.setAttribute('type', 'text');
    projectPopupDiv.appendChild(projectNameInput);
  
    newProjectArea.appendChild(newProjectBtn);
    newProjectArea.appendChild(projectPopupDiv);
    projectDisplay.appendChild(newProjectArea);

    newProjectBtn.addEventListener('click', (e) => {
      e.target.classList.toggle('popup');
      e.target.nextElementSibling.classList.toggle('popup');
    });

    projectNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (projectNameInput.value === '') {
          newProjectBtn.classList.toggle('popup');
          projectPopupDiv.classList.toggle('popup');
        } else {
          projects.projectList.forEach(project => {
            project.current = false;
          })
          projects.addProject(e.target.value);
          showProjects();
          createProjectAdd();
          showTasks();
          createTaskAdd();
        }
      }

    });
  }

  showProjects();
  createProjectAdd();

  // show tasks
  function showTasks() {
    taskDisplay.textContent = '';
    localStorage.setItem('projects', JSON.stringify(projects.projectList));
    projects.projectList.forEach(project => {
      if (project.current === true) {
        project.tasks.forEach(task => {
          const taskArea = document.createElement('div');
          taskArea.classList.add('task-areas');
          taskArea.classList.add('task-complete');
          taskArea.classList.toggle('task-complete');

          const taskVisible = document.createElement('div');
          const taskBtn = document.createElement('div');
          taskVisible.classList.add('task');
          taskBtn.textContent = task.title;

          const realTaskDate = parseISO(task.dueDate);
          const taskDate = document.createElement('div');
          if (task.dueDate === '') {
            taskDate.textContent = '';
          } else {
            taskDate.textContent = format(new Date(realTaskDate), 'PP');
          }
          
          const circleIcon = document.createElement('img');
          circleIcon.src = "images/circle.svg";

          const icons = document.createElement('div');
          icons.classList.add('task-icons');

          const editIcon = document.createElement('img');
          editIcon.src = "images/edit.svg";
          icons.appendChild(editIcon);

          const trashIcon = document.createElement('img');
          trashIcon.src = "images/trash.svg";
          icons.appendChild(trashIcon);

          taskVisible.appendChild(circleIcon);
          taskVisible.appendChild(taskBtn);
          taskVisible.appendChild(taskDate);
          taskVisible.appendChild(icons);
        
          taskArea.appendChild(taskVisible);

          const taskPopupDiv = document.createElement('div');
          taskPopupDiv.classList.add('task-edit');
          taskPopupDiv.classList.add('popup');
          const titleInput = document.createElement('input');
          titleInput.setAttribute('type', 'text');
          titleInput.value = task.title;
          const dueDateInput = document.createElement('input');
          dueDateInput.setAttribute('type', 'date');
          dueDateInput.value = task.dueDate;
          const descriptionInput =document.createElement('input');
          descriptionInput.setAttribute('type', 'text');
          descriptionInput.value = task.description;
          const priorityInput = document.createElement('input');
          priorityInput.setAttribute('type', 'number');
          priorityInput.setAttribute('min', 0);
          priorityInput.setAttribute('max', 3);
          priorityInput.value = task.priority;
        
          taskPopupDiv.appendChild(titleInput);
          taskPopupDiv.appendChild(dueDateInput);
          taskPopupDiv.appendChild(descriptionInput);
          taskPopupDiv.appendChild(priorityInput);
        
          taskArea.appendChild(taskPopupDiv);
        
          taskDisplay.appendChild(taskArea);

          // edit task
          editIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            taskVisible.classList.add('popup');
            taskPopupDiv.classList.toggle('popup');
          });

          taskPopupDiv.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              const currentProjectIndex = projects.projectList.findIndex(x => x.current === true);
              const currentTaskIndex = projects.projectList[currentProjectIndex].tasks.findIndex(x => x.title === taskBtn.textContent);
              tasks.editTask(currentProjectIndex, currentTaskIndex, titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
              taskBtn.textContent = titleInput.value;
              const newRealTaskDate = parseISO(dueDateInput.value)
              taskDate.textContent = format(new Date(newRealTaskDate), 'PP');
              taskVisible.classList.toggle('popup');
              taskPopupDiv.classList.toggle('popup');
            }
          });

          // delete task

          trashIcon.addEventListener('click', () => {
            const currentProjectIndex = projects.projectList.findIndex(x => x.current === true);
            const currentTaskIndex = projects.projectList[currentProjectIndex].tasks.findIndex(x => x.title === taskBtn.textContent);
            tasks.deleteTask(currentProjectIndex, currentTaskIndex);
            showTasks();
            createTaskAdd();
          });

          // toggle completion
          circleIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentProjectIndex = projects.projectList.findIndex(x => x.current === true);
            const currentTaskIndex = projects.projectList[currentProjectIndex].tasks.findIndex(x => x.title === taskBtn.textContent);
            tasks.toggleCompleteTask(currentProjectIndex, currentTaskIndex);
            taskArea.classList.toggle('task-complete');
            projects.projectList[currentProjectIndex].tasks.forEach(task => {
              if (task.completed === true) {
                circleIcon.setAttribute('src', 'images/checkmark-circle.svg');
              } else {
                circleIcon.setAttribute('src', 'images/circle.svg');
              }
            })
          })

        })
      }
    })
  }
  
  function createTaskAdd() {
    const newTaskArea = document.createElement('div');

    const newTaskBtn = document.createElement('button');
    newTaskBtn.classList.add('new-task');
    newTaskBtn.classList.add('popup');
    newTaskBtn.classList.toggle('popup');
    newTaskBtn.textContent = '+ Add Task';
  
    const taskPopupDiv = document.createElement('div');
    taskPopupDiv.classList.add('task-edit');
    taskPopupDiv.classList.add('popup');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    const descriptionInput =document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    const priorityInput = document.createElement('input');
    priorityInput.setAttribute('type', 'number');
    priorityInput.setAttribute('min', 0);
    priorityInput.setAttribute('max', 3);
    priorityInput.setAttribute('value', 0);
  
    taskPopupDiv.appendChild(titleInput);
    taskPopupDiv.appendChild(dateInput);
    taskPopupDiv.appendChild(descriptionInput);
    taskPopupDiv.appendChild(priorityInput);
  
    newTaskArea.appendChild(newTaskBtn);
    newTaskArea.appendChild(taskPopupDiv);
  
    taskDisplay.appendChild(newTaskArea);

    newTaskBtn.addEventListener('click', (e) => {
      e.target.classList.toggle('popup');
      e.target.nextElementSibling.classList.toggle('popup');
    });

    taskPopupDiv.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (titleInput.value === '') {
          e.target.parentElement.classList.toggle('popup');
          e.target.parentElement.previousElementSibling.classList.toggle('popup');
        } else {
          const currentProjectIndex = projects.projectList.findIndex(x => x.current === true);
          const currentTaskIndex = projects.projectList[currentProjectIndex].tasks.length;
          tasks.addTask(titleInput.value, currentProjectIndex, currentTaskIndex, dateInput.value, descriptionInput.value, priorityInput.value);
          showTasks();
          createTaskAdd();
        }
      } 
    })
  }

  showTasks();
  createTaskAdd();

});

export default pageLoad;