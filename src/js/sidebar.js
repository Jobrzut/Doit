const sidebar = document.querySelector(".sidebar");

sidebar.addEventListener("click", (event) => {
console.log("click");
    if (event.target.tagName.toLowerCase() === "li" && !event.target.classList.contains("add_task")) {
        let top_list = document.querySelectorAll(".sidebar ul li:not(.add_task)");
        top_list.forEach(li => {
           li.className = "";
        });
        event.target.className = "current";
    }
});
