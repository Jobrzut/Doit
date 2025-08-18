const contentSection = document.querySelector(".content");
const addTaskButton = document.querySelector(".add_task button");

export function displayNoProjectsMessage() {
    contentSection.innerHTML = "";
    const noProjectsMessage = document.createElement("h1");
    noProjectsMessage.className = "no_projects_message";
    noProjectsMessage.textContent = "You have no projects!";
    contentSection.appendChild(noProjectsMessage);
    addTaskButton.disabled = true;
    addTaskButton.style.cursor = "not-allowed";
}