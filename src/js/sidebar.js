const top_list = document.querySelectorAll(".sidebar ul li:not(.add_task)");

top_list.forEach(element => {
    element.addEventListener("click", (event) => {
        top_list.forEach(li => {
           li.className = "";
        });
        element.className = "current";
    });
});
