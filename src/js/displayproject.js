const contentSection = document.querySelector(".content");

const trash_button_icon = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="trash" width="16" height="16" x="0" y="0" version="1.1" viewBox="0 0 512 512" fill="#333">
                <path d="M400 113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1 64 192 77.1 192 93.3v20h-80V128h21.1l23.6 290.7c0 16.2 13.1 29.3 29.3 29.3h141c16.2 0 29.3-13.1 29.3-29.3L379.6 128H400v-14.7zm-193.4-20c0-8.1 6.6-14.7 14.6-14.7h69.5c8.1 0 14.6 6.6 14.6 14.7v20h-98.7v-20zm135 324.6v.8c0 8.1-6.6 14.7-14.6 14.7H186c-8.1 0-14.6-6.6-14.6-14.7v-.8L147.7 128h217.2l-23.3 289.9z"></path>
                <path d="M249 160h14v241h-14zM320 160h-14.6l-10.7 241h14.6zM206.5 160H192l10.7 241h14.6z"></path>
                </svg>
`

const correspondingPriority = {
    "urgent": "Very fucking urgent",
    "important": "Important",
    "normal": "Normal",
    "wait": "Can wait",
    "whenever": "Whenever"
}

import { findCurrentProject } from "./utilities";
import { Todo } from "./newlist";
import { add, addMinutes, format } from "date-fns";

function addProjectTitle(name) {
    const projectTitle = document.createElement("h1");
    projectTitle.className = "project_title";
    projectTitle.textContent = name;
    contentSection.appendChild(projectTitle);
}

function addProjectDescription(description) {
    const projectDescription = document.createElement("p");
    projectDescription.className = "project_description";
    projectDescription.textContent = description;
    contentSection.appendChild(projectDescription);
}

function sortByPriority(tasks) {
    const tasksCopy = [...tasks];
    const unfinishedTasks = tasksCopy.filter((task) => !task.isDone);
    const finishedTasks = tasksCopy.filter((task) => task.isDone);
    const order = {
        "urgent": 1,
        "important": 2,
        "normal": 3,
        "wait": 4,
        "whenever": 5
    }

    unfinishedTasks.sort((a, b) => {
        return order[a.priority] - order[b.priority];
    });

    finishedTasks.sort((a, b) => {
        return order[a.priority] - order[b.priority];
    });

    return [...unfinishedTasks, ...finishedTasks];
}

function sortByDate(tasks) {
    const groups = tasks.reduce((groups, task) => {
        const date = task.date.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
        return {
            date,
            tasks: groups[date]
        };
    });

    const sortedGroups = groupArrays.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedGroups;
}

function addProjectTasks(tasks, refresh = displayProject) {
    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks_div";
    let tasksSortedByPriority = sortByPriority(tasks);

    tasksSortedByPriority.forEach(task => {
        const taskElement = document.createElement("div");

        const upperTask = document.createElement("button");
        upperTask.addEventListener("click", function (event) {
            if (event.target.tagName !== "INPUT" && !event.target.closest(".trash_button")) {
                this.classList.toggle("active_collapsible");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });

        taskElement.className = "task";
        upperTask.className = "upper_task";
        const taskName = document.createElement("p");
        taskName.className = "task_name";
        taskName.textContent = task.title;
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        if (task.isDone) {
            taskCheckbox.checked = true;
            taskName.classList.add("strikethrough");
            taskName.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
        }
        taskCheckbox.style.borderColor = `var(--priority-${task.priority})`;
        taskCheckbox.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
        taskCheckbox.addEventListener("click", (event) => {
            task.toggleDone();
            localStorage.setItem("Todo", JSON.stringify(Todo));
            if (task.isDone) {
                taskName.classList.add("strikethrough");
                taskName.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
                taskName.classList.add("animate");
                setTimeout(() => { taskName.classList.remove("animate") }, 500);
            }
            setTimeout(() => refresh(), 500);
        });
        upperTask.append(taskCheckbox, taskName);

        if (task.date !== "") {
            const formatedDueDate = format(new Date(task.date), "d MMM");
            const taskDueDate = document.createElement("p");
            taskDueDate.classList.add("task_duedate");
            taskDueDate.textContent = formatedDueDate;
            upperTask.appendChild(taskDueDate);

            if (task.date.split("T")[0] < new Date().toISOString().split("T")[0]) {
                taskDueDate.classList.add("overdue")
            } else {
                taskDueDate.classList.add("ontime");
            }
        }

        const deleteButton = document.createElement("a");
        deleteButton.className = "task_trash_button";
        deleteButton.id = task.id
        deleteButton.innerHTML = trash_button_icon;
        upperTask.appendChild(deleteButton);
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation();
            Todo.removeTaskById(task.id);
            localStorage.setItem("Todo", JSON.stringify(Todo));
            refresh();
        });


        tasksDiv.appendChild(taskElement);

        const collapsibleContent = document.createElement("div");
        const collapsibleWrapper = document.createElement("div");
        collapsibleContent.className = "collapsible_content";
        collapsibleWrapper.className = "collapsible_wrapper";

        const collapsibleDescriptionDiv = document.createElement("div");
        const collapsibleDescriptionHeader = document.createElement("h4");
        collapsibleDescriptionHeader.textContent = "Descripition:";
        const collapsibleDescription = document.createElement("p");
        collapsibleDescription.textContent = task.description || "No description";
        collapsibleDescription.className = "collapsible_description";
        collapsibleDescriptionDiv.append(collapsibleDescriptionHeader, collapsibleDescription)

        const collapsiblePriorityDiv = document.createElement("div");
        const collapsiblePriorityHeader = document.createElement("h4");
        collapsiblePriorityHeader.textContent = "Priority:"
        const collapsiblePriority = document.createElement("p");
        collapsiblePriority.textContent = correspondingPriority[task.priority];
        collapsiblePriorityDiv.append(collapsiblePriorityHeader, collapsiblePriority);

        const collapsibleDateDiv = document.createElement("div");
        const collapsibleDateHeader = document.createElement("h4");
        collapsibleDateHeader.textContent = "Due date:";
        const collapsibleDate = document.createElement("p");
        collapsibleDate.textContent = task.date;
        collapsibleDateDiv.append(collapsibleDateHeader, collapsibleDate);

        collapsibleWrapper.append(collapsibleDescriptionDiv, collapsiblePriorityDiv, collapsibleDateDiv);
        collapsibleContent.appendChild(collapsibleWrapper);
        taskElement.append(upperTask, collapsibleContent);

    });

    contentSection.appendChild(tasksDiv);
}

export function displayProject() {
    const currentProjectIndex = findCurrentProject();
    if (currentProjectIndex === null || currentProjectIndex === undefined) {
        return -1;
    }
    contentSection.innerHTML = "";
    addProjectTitle(Todo.projects[currentProjectIndex].name);
    addProjectDescription(Todo.projects[currentProjectIndex].description);
    addProjectTasks(Todo.projects[currentProjectIndex].tasks);
}

export function displayAllTasks() {
    contentSection.innerHTML = "";
    addProjectTitle("All tasks");
    addProjectDescription("Here you can find all your tasks.");
    const allTasks = [...Todo.projects.map(project => project.tasks).flat()];
    addProjectTasks(allTasks, displayAllTasks);
}

export function displayNoTasksForToday() {
    contentSection.innerHTML = "";
    const noProjectsMessage = document.createElement("h1");
    noProjectsMessage.className = "no_projects_message";
    noProjectsMessage.textContent = "Lucky you! You have no tasks for today.";
    contentSection.appendChild(noProjectsMessage);
}

export function displayTodayTasks() {
    contentSection.innerHTML = "";
    addProjectTitle("Today's tasks");
    addProjectDescription("Here you can find all tasks due today.");
    const today = new Date().toISOString().split("T")[0];
    const allTasks = [...Todo.projects.map(project => project.tasks).flat()];
    const todayTasks = allTasks.filter(task => task.date == today);
    const todayUnfinished = todayTasks.filter(task => !task.isDone);
    if (todayUnfinished.length !== 0) {
        addProjectTasks(todayTasks, displayTodayTasks);
    } else {
        displayNoTasksForToday();
    }
}

function displayTasksWithDate(groups, refresh) {
    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks_div";
    let tasksSortedByDate = groups;

    Object.keys(tasksSortedByDate).forEach(group => {
        const formatedDueDate = format(groups[group].date, "d MMMM yyyy");


        const dateGroup = document.createElement("div");
        dateGroup.className = "date_group"

        const dateTitle = document.createElement("h3");
        dateTitle.className = "date_title";
        dateTitle.textContent = formatedDueDate;
        if (groups[group].date.split("T")[0] < new Date().toISOString().split("T")[0]) {
            dateTitle.classList.add("overdue");
        }
        dateGroup.appendChild(dateTitle);



        let tasksSortedByPriority = sortByPriority(groups[group].tasks);

        tasksSortedByPriority.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "task";

            const upperTask = document.createElement("button");
            upperTask.addEventListener("click", function (event) {
                if (event.target.tagName !== "INPUT" && !event.target.closest(".trash_button")) {
                    this.classList.toggle("active_collapsible");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
            });

            const taskName = document.createElement("p");
            taskName.className = "task_name";
            upperTask.className = "upper_task";
            taskName.textContent = task.title;
            const taskCheckbox = document.createElement("input");
            taskCheckbox.type = "checkbox";
            taskCheckbox.style.borderColor = `var(--priority-${task.priority})`;
            taskCheckbox.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
            taskCheckbox.addEventListener("click", (event) => {
                task.toggleDone();
                localStorage.setItem("Todo", JSON.stringify(Todo));
                if (task.isDone) {
                    taskName.classList.add("strikethrough");
                    taskName.style.setProperty('--dynamic-color', `var(--priority-${task.priority})`);
                    taskName.classList.add("animate");
                    setTimeout(() => { taskName.classList.remove("animate") }, 500);
                }
                setTimeout(() => refresh(), 500);
            });
            upperTask.append(taskCheckbox, taskName);

            const deleteButton = document.createElement("a");
            deleteButton.className = "task_trash_button";
            deleteButton.id = task.id
            deleteButton.innerHTML = trash_button_icon;
            upperTask.appendChild(deleteButton);
            deleteButton.addEventListener("click", function (event) {
                event.stopPropagation();
                Todo.removeTaskById(task.id);
                localStorage.setItem("Todo", JSON.stringify(Todo));
                refresh();
            });

            const collapsibleContent = document.createElement("div");
            const collapsibleWrapper = document.createElement("div");
            collapsibleContent.className = "collapsible_content";
            collapsibleWrapper.className = "collapsible_wrapper";

            const collapsibleDescriptionDiv = document.createElement("div");
            const collapsibleDescriptionHeader = document.createElement("h4");
            collapsibleDescriptionHeader.textContent = "Descripition:";
            const collapsibleDescription = document.createElement("p");
            collapsibleDescription.textContent = task.description || "No description";
            collapsibleDescription.className = "collapsible_description";
            collapsibleDescriptionDiv.append(collapsibleDescriptionHeader, collapsibleDescription)

            const collapsiblePriorityDiv = document.createElement("div");
            const collapsiblePriorityHeader = document.createElement("h4");
            collapsiblePriorityHeader.textContent = "Priority:"
            const collapsiblePriority = document.createElement("p");
            collapsiblePriority.textContent = correspondingPriority[task.priority];
            collapsiblePriorityDiv.append(collapsiblePriorityHeader, collapsiblePriority);

            const collapsibleDateDiv = document.createElement("div");
            const collapsibleDateHeader = document.createElement("h4");
            collapsibleDateHeader.textContent = "Due date:";
            const collapsibleDate = document.createElement("p");
            collapsibleDate.textContent = task.date;
            collapsibleDateDiv.append(collapsibleDateHeader, collapsibleDate);

            collapsibleWrapper.append(collapsibleDescriptionDiv, collapsiblePriorityDiv, collapsibleDateDiv);


            collapsibleContent.appendChild(collapsibleWrapper);
            taskElement.append(upperTask, collapsibleContent);

            dateGroup.appendChild(taskElement);
        });
        tasksDiv.appendChild(dateGroup);
    });

    contentSection.appendChild(tasksDiv);
}

export function displayIncomingTasks() {
    contentSection.innerHTML = "";
    addProjectTitle("Incoming tasks");
    addProjectDescription("Here you can find all tasks that are due in the future.");
    const allTasks = [...Todo.projects.map(project => project.tasks).flat()];
    const unfinishedTasks = allTasks.filter(task => !task.isDone)
    const datedTasks = unfinishedTasks.filter(task => task.date !== "");
    displayTasksWithDate(sortByDate(datedTasks), displayIncomingTasks);
}