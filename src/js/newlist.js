const newListButton = document.querySelector(".addlist_button");
const footerSidebar = document.querySelector(".footer_sidebar");
const userAddedListUl = document.querySelector(".userAdded");
let controlerNewList = 0;

function removeForm() {
    const form = document.querySelector(".newlist_input");
    form.remove();
    controlerNewList = 0;
}

function addNewList(name) {
    Todo.addProject(name);
    showUserAddedLists();
    localStorage.setItem("Todo", JSON.stringify(Todo));
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
    listnameInput.value = "New list";
    listnameDiv.append(listnameLabel, listnameInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Add";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        addNewList(listnameInput.value)
        removeForm();
    });

    form.append(listnameDiv, submitButton);
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

    addProject(name) {
        this.projects.push(new Project(name));
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title) {
        this.tasks.push(new Task(title));
    }

    getName() {
        return this.name;
    }
}


class Task {
    constructor(title) {
        this.title = title;
        this.isDone = false;
    }
}

let TodoData = JSON.parse(localStorage.getItem("Todo"));
let Todo;

if (TodoData) {
    Todo = new TodoList();
    TodoData.projects.forEach(p => {
        const project = new Project(p.name);
        project.tasks.forEach(t => {
            const task = new Task(t.title);
            project.tasks.push(task);``
        });
        Todo.projects.push(project);
    });
} else {
    Todo = new TodoList();
    Todo.addProject("Random");
}

console.log(Todo);

function showUserAddedLists() {
    userAddedListUl.innerHTML = "";
    Todo.projects.forEach(element => {
        const listElement = document.createElement("li");
        listElement.innerHTML = `<span>#</span> ${element.getName()}`;
        userAddedListUl.appendChild(listElement);
    });
}

showUserAddedLists();