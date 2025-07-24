const user_div = document.querySelector(".main .sidebar .user");
const sidebar = document.querySelector(".main .sidebar");
const userArrow = document.querySelector(".user_arrow");

let controler = 0;

function createModal() {
  const form = document.createElement("form");
  form.classList = "user_input";

  const usernameDiv = document.createElement("div");
  usernameDiv.classList = "username";
  const usernameLabel = document.createElement("label");
  usernameLabel.textContent = "Username:";
  usernameLabel.setAttribute("for", "username");
  const usernameInput = document.createElement("input");
  usernameInput.id = "username";
  usernameInput.setAttribute("type", "text");
  usernameDiv.append(usernameLabel, usernameInput);

  const fileDiv = document.createElement("div");
  fileDiv.classList = "file";
  const fileLabel = document.createElement("label");
  fileLabel.textContent = "Picture:";
  fileLabel.setAttribute("for", "profilepicture");
  const fileInput = document.createElement("input");
  fileInput.id = "profilepicture";
  fileInput.setAttribute("type", "file");
  fileDiv.append(fileLabel, fileInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Update";

  form.append(usernameDiv, fileDiv, submitButton);
  sidebar.appendChild(form);
  controler = 1;
}

user_div.addEventListener("click", (event) => {
  if (controler == 0) {
    createModal();
  } else {
    const form = document.querySelector(".main .sidebar form");
    form.remove();
    controler = 0
  }
  userArrow.classList.toggle("active_arrow")
});
