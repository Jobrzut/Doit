const sidebar = document.querySelector(".sidebar");
const addTaskButton = document.querySelector(".add_task button");

import { displayProject, displayAllTasks, displayTodayTasks, displayIncomingTasks } from "./displayproject";

function markAsCurrent(target) {
    let top_list = document.querySelectorAll(".sidebar ul li:not(.add_task)");
    top_list.forEach(li => {
        if (li.classList.contains("current")) {
            li.classList.remove("current");
        }
    });
    target.classList.add("current");
}

sidebar.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "li" && event.target.parentElement.classList.contains("userAdded")) {
        markAsCurrent(event.target);
        displayProject();
        addTaskButton.disabled = false;
        addTaskButton.style.cursor = "pointer";
    }

    if (event.target.classList.contains("all_tasks")) {
        markAsCurrent(event.target);
        displayAllTasks();
        addTaskButton.disabled = true;
        addTaskButton.style.cursor = "not-allowed";
    }

    if (event.target.classList.contains("today_tasks")) {
        markAsCurrent(event.target);
        displayTodayTasks();
        addTaskButton.disabled = true;
        addTaskButton.style.cursor = "not-allowed";
    }

    if (event.target.classList.contains("incoming_tasks")) {
        markAsCurrent(event.target);
        displayIncomingTasks();
        addTaskButton.disabled = true;
        addTaskButton.style.cursor = "not-allowed";
    }
});


