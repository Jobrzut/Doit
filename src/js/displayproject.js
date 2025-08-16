const contentSection = document.querySelector(".content");

import { findCurrentProject } from "./newtask";
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

function addProjectTasks(currentProjectIndex) {
    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks_div";
    Todo.projects[currentProjectIndex].tasks.forEach(task => {
        const taskElement = document.createElement("div");
        const rightSideTask = document.createElement("div");
        taskElement.className = "task";
        const taskName = document.createElement("p");
        taskName.className = "task_name";
        taskName.textContent = task.title;
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        rightSideTask.appendChild(taskName);
        
        if (task.date !== "") {
            const formatedDueDate = format(new Date(task.date), "d MMMM yyyy");
            const taskDueDate = document.createElement("p");
            taskDueDate.className = "task_duedate";
            taskDueDate.textContent = formatedDueDate;
            rightSideTask.appendChild(taskDueDate);
        }
        taskElement.append(taskCheckbox, rightSideTask);
        tasksDiv.appendChild(taskElement);
    });

    contentSection.appendChild(tasksDiv);
    console.log(Todo);  
}

export function displayProject() {
    const currentProjectIndex = findCurrentProject();
    if (currentProjectIndex === null) {
        return -1;
    }
    contentSection.innerHTML = "";
    addProjectTitle(currentProjectIndex);
    addProjectDescription(currentProjectIndex);
    addProjectTasks(currentProjectIndex);
}