const contentSection = document.querySelector(".content");

import { findCurrentProject } from "./newtask";
import { Todo } from "./newlist";

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

export function displayProject() {
    const currentProjectIndex = findCurrentProject();
    if (currentProjectIndex === null) {
        return -1;
    }
    contentSection.innerHTML = "";
    addProjectTitle(currentProjectIndex);
    addProjectDescription(currentProjectIndex);
}