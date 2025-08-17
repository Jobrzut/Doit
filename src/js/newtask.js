const addTaskButton = document.querySelector(".add_task");
const page = document.querySelector(".main");
const body = document.querySelector("body");
const dialog = document.querySelector("dialog");
const backdrop = document.querySelector("dialog::backdrop");
const closeButton = document.querySelector(".inner_dialog .close")
const addButton = document.querySelector(".dialog_addtask");
const nameInput = document.querySelector("dialog #name");
const descriptionInput = document.querySelector("dialog #description");
const dateInput = document.querySelector("dialog #duedate");
const priorityInput = document.querySelector("dialog #priority");

import { Todo, Task } from "./newlist.js";
import { displayProject } from "./displayproject.js";

addTaskButton.addEventListener("click", (event) => {
   dialog.showModal();
});

dialog.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    e.stopPropagation();
    closeDialog();
  }
});

closeButton.addEventListener("click", (event) => {
  if (dialog.open) {
    closeDialog();
  }
});

export function findCurrentProject() {
  let currentProject = document.querySelector(".current");
  if (currentProject) {
    const foundId = currentProject.getAttribute("projectid");
    const indexOfCurrent = Todo.projects.findIndex(obj => obj.id === foundId);
    return indexOfCurrent;
  }
  return null;
}

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  let indexOfCurrent = findCurrentProject();
  Todo.projects[indexOfCurrent].tasks.push(new Task(
    nameInput.value,
    descriptionInput.value,
    dateInput.value,
    priorityInput.value
  ));
  localStorage.setItem("Todo", JSON.stringify(Todo));
  closeDialog();
  displayProject();
});

function closeDialog() {
  dialog.close();
  nameInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
  priorityInput.selectedIndex = 2;
}