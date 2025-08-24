const contentSection = document.querySelector(".content");

const trash_button_icon = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="trash" width="16" height="16" x="0" y="0" version="1.1" viewBox="0 0 512 512" fill="#333">
                <path d="M400 113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1 64 192 77.1 192 93.3v20h-80V128h21.1l23.6 290.7c0 16.2 13.1 29.3 29.3 29.3h141c16.2 0 29.3-13.1 29.3-29.3L379.6 128H400v-14.7zm-193.4-20c0-8.1 6.6-14.7 14.6-14.7h69.5c8.1 0 14.6 6.6 14.6 14.7v20h-98.7v-20zm135 324.6v.8c0 8.1-6.6 14.7-14.6 14.7H186c-8.1 0-14.6-6.6-14.6-14.7v-.8L147.7 128h217.2l-23.3 289.9z"></path>
                <path d="M249 160h14v241h-14zM320 160h-14.6l-10.7 241h14.6zM206.5 160H192l10.7 241h14.6z"></path>
                </svg>
`;

const edit_button = `
<svg fill="#333" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="800px" height="800px" viewBox="0 0 494.936 494.936"
	 xml:space="preserve">
<g>
	<g>
		<path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
		<path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
	</g>
</g>
</svg>
`;

const yes_button = `
<svg width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path fill="#333333" d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z"/>
</svg>
`

const cancel_button = `
<svg width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <line x1="7" y1="7" x2="25" y2="25" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="7" y1="25" x2="25" y2="7" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const selectInput = `
    <option value="urgent">Very fucking urgent</option>
    <option value="important">Important</option>
    <option value="normal" selected>Normal</option>
    <option value="wait">Can wait</option>
    <option value="whenever">Whenever</option>
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
            if (event.target.tagName !== "INPUT" && !event.target.closest(".trash_button") && !event.target.closest(".edit_button") && !event.target.closest(".no_button")) {
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

        const taskButtonsDiv = document.createElement("div")
        taskButtonsDiv.className = "task_buttons";

        const deleteButton = document.createElement("a");
        deleteButton.className = "task_trash_button";
        deleteButton.innerHTML = trash_button_icon;
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation();
            Todo.removeTaskById(task.id);
            localStorage.setItem("Todo", JSON.stringify(Todo));
            refresh();
        });

        const editButton = document.createElement("a");
        editButton.className = "edit_button";
        editButton.innerHTML = edit_button;

        taskButtonsDiv.append(editButton, deleteButton);
        upperTask.appendChild(taskButtonsDiv);

        editButton.addEventListener("click", (event) => {
            const taskNameInput = document.createElement("input");
            taskNameInput.type = "text";
            taskNameInput.value = taskName.textContent;
            taskName.style.display = "none";
            upperTask.insertBefore(taskNameInput, taskName);

            const taskDescriptionTextarea = document.createElement("textarea");
            taskDescriptionTextarea.value = task.description;
            collapsibleDescription.style.display = "none";
            collapsibleDescriptionDiv.appendChild(taskDescriptionTextarea);

            const taskDueDateInput = document.createElement("input");
            taskDueDateInput.type = "date";
            taskDueDateInput.value = task.date;
            collapsibleDate.style.display = "none";
            collapsibleDateDiv.appendChild(taskDueDateInput);

            const taskPriorityInput = document.createElement("select");
            taskPriorityInput.innerHTML = selectInput;
            taskPriorityInput.value = task.priority;
            collapsiblePriority.style.display = "none";
            collapsiblePriorityDiv.appendChild(taskPriorityInput);

            editButton.style.display = "none";
            const yesButton = document.createElement("a");
            yesButton.innerHTML = yes_button;
            yesButton.className = "yes_button";
            const noButton = document.createElement("a");
            noButton.innerHTML = cancel_button;
            noButton.className = "no_button";
            taskButtonsDiv.insertBefore(noButton, editButton);
            taskButtonsDiv.insertBefore(yesButton, noButton);

            if (!upperTask.classList.contains("active_collapsible")) {
                upperTask.classList.add("active_collapsible");
                var content = upperTask.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }

            function removeInlineInputs() {
                taskNameInput.remove();
                taskDescriptionTextarea.remove();
                taskPriorityInput.remove();
                taskDueDateInput.remove();

                taskName.style.display = "block";
                collapsibleDescription.style.display = "block";
                collapsibleDate.style.display = "block";
                collapsiblePriority.style.display = "block";
                editButton.style.display = "block";
                yesButton.style.display = "none";
                noButton.style.display = "none";
            }

            noButton.addEventListener("click", () => {
                removeInlineInputs();
            });

            yesButton.addEventListener("click", () => {
                task.editTask(taskNameInput.value, taskDescriptionTextarea.value, taskDueDateInput.value, taskPriorityInput.value);
                localStorage.setItem("Todo", JSON.stringify(Todo));
                removeInlineInputs();
                refresh();
            });
        });

        taskElement.appendChild(upperTask);
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
        collapsibleDate.textContent = task.date || "No due date";
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
                if (event.target.tagName !== "INPUT" && !event.target.closest(".trash_button") && !event.target.closest(".edit_button") && !event.target.closest(".no_button")) {
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

            const taskButtonsDiv = document.createElement("div")
            taskButtonsDiv.className = "task_buttons";

            const editButton = document.createElement("a");
            editButton.className = "edit_button";
            editButton.innerHTML = edit_button;

            taskButtonsDiv.append(editButton, deleteButton);
            upperTask.appendChild(taskButtonsDiv);

            editButton.addEventListener("click", (event) => {
                const taskNameInput = document.createElement("input");
                taskNameInput.type = "text";
                taskNameInput.value = taskName.textContent;
                taskName.style.display = "none";
                upperTask.insertBefore(taskNameInput, taskName);

                const taskDescriptionTextarea = document.createElement("textarea");
                taskDescriptionTextarea.value = task.description;
                collapsibleDescription.style.display = "none";
                collapsibleDescriptionDiv.appendChild(taskDescriptionTextarea);

                const taskDueDateInput = document.createElement("input");
                taskDueDateInput.type = "date";
                taskDueDateInput.value = task.date;
                collapsibleDate.style.display = "none";
                collapsibleDateDiv.appendChild(taskDueDateInput);

                const taskPriorityInput = document.createElement("select");
                taskPriorityInput.innerHTML = selectInput;
                taskPriorityInput.value = task.priority;
                collapsiblePriority.style.display = "none";
                collapsiblePriorityDiv.appendChild(taskPriorityInput);

                editButton.style.display = "none";
                const yesButton = document.createElement("a");
                yesButton.innerHTML = yes_button;
                yesButton.className = "yes_button";
                const noButton = document.createElement("a");
                noButton.innerHTML = cancel_button;
                noButton.className = "no_button";
                taskButtonsDiv.insertBefore(noButton, editButton);
                taskButtonsDiv.insertBefore(yesButton, noButton);

                if (!upperTask.classList.contains("active_collapsible")) {
                    upperTask.classList.add("active_collapsible");
                    var content = upperTask.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }

                function removeInlineInputs() {
                    taskNameInput.remove();
                    taskDescriptionTextarea.remove();
                    taskPriorityInput.remove();
                    taskDueDateInput.remove();

                    taskName.style.display = "block";
                    collapsibleDescription.style.display = "block";
                    collapsibleDate.style.display = "block";
                    collapsiblePriority.style.display = "block";
                    editButton.style.display = "block";
                    yesButton.style.display = "none";
                    noButton.style.display = "none";
                }

                noButton.addEventListener("click", () => {
                    removeInlineInputs();
                });

                yesButton.addEventListener("click", () => {
                    task.editTask(taskNameInput.value, taskDescriptionTextarea.value, taskDueDateInput.value, taskPriorityInput.value);
                    localStorage.setItem("Todo", JSON.stringify(Todo));
                    removeInlineInputs();
                    refresh();
                });
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
            collapsibleDate.textContent = task.date || "No due date";
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