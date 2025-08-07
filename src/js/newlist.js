const newListButton = document.querySelector(".addlist_button");
const footerSidebar = document.querySelector(".footer_sidebar");
const userAddedListUl = document.querySelector(".userAdded");
let controlerNewList = 0;

function removeForm() {
    const form = document.querySelector(".newlist_input");
    form.remove();
    controlerNewList = 0;
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

let userAddedLists = localStorage.getItem("userAddedLists") || ["Random", ];

function showUserAddedLists() {
    userAddedLists.forEach(element => {
        const listElement = document.createElement("li");
        listElement.innerHTML = `<span>#</span> ${element}`;
        userAddedListUl.appendChild(listElement);
    });
}

showUserAddedLists();