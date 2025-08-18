import { Todo, Task } from "./newlist.js";

export function findCurrentProject() {
  let currentProject = document.querySelector(".current");
  if (currentProject) {
    const foundId = currentProject.getAttribute("projectid");
    const indexOfCurrent = Todo.projects.findIndex(obj => obj.id === foundId);
    return indexOfCurrent;
  }
  return null;
}

