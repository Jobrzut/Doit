const addTaskButton = document.querySelector(".add_task");
const page = document.querySelector(".main");
const body = document.querySelector("body");
const dialog = document.querySelector("dialog");
const backdrop = document.querySelector("dialog::backdrop");

addTaskButton.addEventListener("click", (event) => {
   dialog.showModal();
});

dialog.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    e.stopPropagation();
    dialog.close();
  }
});