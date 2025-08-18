const contentSection = document.querySelector(".content");

import { findCurrentProject } from "./utilities";
import { Todo } from "./newlist";
import { addMinutes, format } from "date-fns";

function addProjectTitle(currentProjectIndex) {
    const projectTitle = document.createElement("h1");
    projectTitle.className = "project_title";
    projectTitle.textContent = Todo.projects[currentProjectIndex].name;
    contentSection.appendChild(projectTitle);
}

function addProjectDescription(currentProjectIndex) {
    const projectDescription = document.createElement("p");
    projectDescription.className = "project_description";
    projectDescription.textContent = Todo.projects[currentProjectIndex].description;
    contentSection.appendChild(projectDescription);
}

function sortByPriority(tasks) {
    const tasksCopy = [...tasks]
     const order = {
        "urgent": 1,
        "important": 2,
        "normal": 3,
        "wait": 4,
        "whenever": 5
    }
    
    tasksCopy.sort((a, b) => {
        return order[a.priority] - order[b.priority];
    });

    return tasksCopy;
}

function addProjectTasks(currentProjectIndex) {
    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks_div";
    let tasksSortedByPriority = sortByPriority(Todo.projects[currentProjectIndex].tasks);

    tasksSortedByPriority.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        const taskName = document.createElement("p");
        taskName.className = "task_name";
        taskName.textContent = task.title;
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.style.borderColor = `var(--priority-${task.priority})`;
        taskCheckbox.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
        taskElement.append(taskCheckbox, taskName);
        
        if (task.date !== "") {
            const formatedDueDate = format(new Date(task.date), "d MMM");
            const taskDueDate = document.createElement("p");
            taskDueDate.className = "task_duedate";
            taskDueDate.textContent = formatedDueDate;
            taskElement.appendChild(taskDueDate);
        }
        tasksDiv.appendChild(taskElement);
    });

    contentSection.appendChild(tasksDiv);
}

export function displayProject() {
    const currentProjectIndex = findCurrentProject();
    if (currentProjectIndex === null || currentProjectIndex === undefined) {
        return -1;
    }
    contentSection.innerHTML = "";
    addProjectTitle(currentProjectIndex);
    addProjectDescription(currentProjectIndex);
    addProjectTasks(currentProjectIndex);
}