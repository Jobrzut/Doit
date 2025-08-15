const contentSection = document.querySelector(".content");

import { findCurrentProject } from "./newtask";
import { Todo } from "./newlist";

function addProjectTitle(currentProjectIndex) {
    const projectTitle = document.createElement("h1");
    projectTitle.className = "project_title";
    projectTitle.textContent = Todo.projects[currentProjectIndex].name;
    contentSection.appendChild(projectTitle);
}

export function displayProject() {
    contentSection.innerHTML = "";
    const currentProjectIndex = findCurrentProject();
    if (currentProjectIndex === null) {
        return -1;
    }
    addProjectTitle(currentProjectIndex);
}