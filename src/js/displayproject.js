const contentSection = document.querySelector(".content");

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

function addProjectTasks(tasks, refresh = displayProject) {
    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks_div";
    let tasksSortedByPriority = sortByPriority(tasks);

    tasksSortedByPriority.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
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
                setTimeout(() => {taskName.classList.remove("animate")}, 500);
            }
            setTimeout(() => refresh(), 500);
        });
        taskElement.append(taskCheckbox, taskName);

        if (task.date !== "") {
            const formatedDueDate = format(new Date(task.date), "d MMM");
            const taskDueDate = document.createElement("p");
            taskDueDate.className = "task_duedate";
            taskDueDate.textContent = formatedDueDate;
            taskElement.appendChild(taskDueDate);
        }
        tasksDiv.appendChild(taskElement);
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