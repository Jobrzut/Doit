const sidebar = document.querySelector(".sidebar");

import { displayProject } from "./displayproject";

sidebar.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "li" && event.target.parentElement.classList.contains("userAdded")) {
        let top_list = document.querySelectorAll(".sidebar ul li:not(.add_task)");
        top_list.forEach(li => {
           li.className = "";
        });
        event.target.className = "current";
    }
    displayProject();
});
