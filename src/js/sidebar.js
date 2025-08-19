const sidebar = document.querySelector(".sidebar");

import { displayProject, displayAllTasks, displayTodayTasks } from "./displayproject";

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
    }

    if (event.target.classList.contains("all_tasks")) {
        markAsCurrent(event.target);
        displayAllTasks();
    }

    if (event.target.classList.contains("today_tasks")) {
        markAsCurrent(event.target);
        displayTodayTasks();
    }
});


