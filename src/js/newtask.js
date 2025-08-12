const addTaskButton = document.querySelector(".add_task");
const page = document.querySelector(".main");
const body = document.querySelector("body");
const dialog = document.querySelector("dialog");
const backdrop = document.querySelector("dialog::backdrop");
const closeButton = document.querySelector(".inner_dialog .close")

addTaskButton.addEventListener("click", (event) => {
   dialog.showModal();
});

dialog.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    e.stopPropagation();
    dialog.close();
  }
});

closeButton.addEventListener("click", (event) => {
  if (dialog.open) {
    dialog.close();
  }
});