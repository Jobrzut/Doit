const newListButton = document.querySelector(".addlist_button");
const footerSidebar = document.querySelector(".footer_sidebar");
const userAddedListUl = document.querySelector(".userAdded");
const trashButton = document.querySelector(".trash_button");
let controlerNewList = 0;

import { displayProject } from "./displayproject";
import { displayNoProjectsMessage } from "./noprojects.js";

function removeForm() {
    const form = document.querySelector(".newlist_input");
    form.remove();
    controlerNewList = 0;
}

function showLists() {
    showUserAddedLists();
    localStorage.setItem("Todo", JSON.stringify(Todo));
}

function addNewList(name, description) {
    Todo.addProject(name, description);
    showLists();
    const addedItem = document.querySelectorAll(".userAdded li");
    addedItem[addedItem.length-1].className = "current";
    displayProject();
    const addTaskButton = document.querySelector(".add_task button");
    addTaskButton.disabled = false;
    addTaskButton.style.cursor = "pointer";
}

function createModal() {
    const form = document.createElement("form");
    form.classList = "newlist_input";

    const listnameDiv = document.createElement("div");
    listnameDiv.classList = "listname";
    const listnameLabel = document.createElement("label");
    listnameLabel.textContent = "Name:";
    listnameLabel.setAttribute("for", "listname");
    const listnameInput = document.createElement("input");
    listnameInput.id = "listname";
    listnameInput.setAttribute("type", "text");
    listnameInput.placeholder = "New list";
    listnameDiv.append(listnameLabel, listnameInput);

    const listDescriptionDiv = document.createElement("div");
    listDescriptionDiv.classList = "listdescription";
    const listDescriptionLabel = document.createElement("label");
    listDescriptionLabel.textContent = "Description:";
    listDescriptionLabel.setAttribute("for", "listdescription");
    const listDescriptionInput = document.createElement("textarea");
    listDescriptionInput.id = "listdescription";
    listDescriptionDiv.append(listDescriptionLabel, listDescriptionInput);


    const submitButton = document.createElement("button");
    submitButton.textContent = "Add";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        addNewList(listnameInput.value, listDescriptionInput.value);
        removeForm();
    });

    form.append(listnameDiv, listDescriptionDiv, submitButton);
    controlerNewList = 1;
    footerSidebar.appendChild(form);
}

newListButton.addEventListener("click", (event) => {
    if (controlerNewList == 0) {
        createModal();
    } else {
        removeForm();
    }
});

class TodoList {
    constructor() {
        this.projects = [];
    }

    addProject(name, description) {
        this.projects.push(new Project(name, description));
    }

    removeProject(index) {
        this.projects.splice(index, 1);
    }
}

class Project {
    constructor(name, description = "") {
        this.name = name;
        this.description = description;
        this.tasks = [];
        this.id = crypto.randomUUID();
    }

    addTask(title) {
        this.tasks.push(new Task(title));
    }
}


export class Task {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isDone = false;
    }
}

let TodoData = JSON.parse(localStorage.getItem("Todo"));
let Todo;

if (TodoData) {
    Todo = new TodoList();
    TodoData.projects.forEach(p => {
        const project = new Project(p.name, p.description);
        p.tasks.forEach(t => {
            const task = new Task(t.title, t.description, t.date, t.priority);
            project.tasks.push(task);
        });
        Todo.projects.push(project);
    });

    if (Todo.projects.length === 0) {
        Todo.addProject("Random", "This list is created automatically for you to test out the app.");
    }

} else {
    Todo = new TodoList();
    Todo.addProject("Random", "This list is created automatically for you to test out the app.");
}

export { Todo };


function showUserAddedLists() {
    userAddedListUl.innerHTML = "";
    Todo.projects.forEach(element => {
        const listElement = document.createElement("li");
        listElement.innerHTML = `<span>#</span> ${element.name}`;
        listElement.setAttribute("projectid", element.id);
        userAddedListUl.appendChild(listElement);
    });
}

function initialListsLoad() {
    showUserAddedLists();
    const firstItem = document.querySelector(".userAdded li");
    firstItem.className = "current";
    displayProject();
}

function setCurrentToThePrevious(previousElementSibling, nextElementSibling) {
    if (previousElementSibling) {
        let previousElementId = previousElementSibling.getAttribute("projectid");
        let top_list = Array.from(document.querySelectorAll(".sidebar ul li:not(.add_task)"));
        const previousElement = top_list.find(obj => obj.getAttribute("projectid") === previousElementId);
        top_list.forEach(li => {
           li.className = "";
        });
        previousElement.className = "current";
    } else {
        if (nextElementSibling) {
            let nextElementId = nextElementSibling.getAttribute("projectid");
            let top_list = Array.from(document.querySelectorAll(".sidebar ul li:not(.add_task)"));
            const nextElement = top_list.find(obj => obj.getAttribute("projectid") === nextElementId);
            top_list.forEach(li => {
                li.className = "";
            });
            nextElement.className = "current";
        } else {
            displayNoProjectsMessage();
        }
    }
}


trashButton.addEventListener("click", (event) => {
    let currentProject = document.querySelector(".current");
    let previousElementSibling = currentProject.previousElementSibling;
    let nextElementSibling = currentProject.nextElementSibling;
    const toDelete = currentProject.getAttribute("projectid");

    if (toDelete) {
        const indexToDelete = Todo.projects.findIndex(obj => obj.id === toDelete);
        Todo.removeProject(indexToDelete);
        showLists();
        setCurrentToThePrevious(previousElementSibling, nextElementSibling)
        displayProject();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initialListsLoad();
});