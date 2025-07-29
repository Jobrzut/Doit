const user_div = document.querySelector(".main .sidebar .user");
const sidebar = document.querySelector(".main .sidebar");
const userArrow = document.querySelector(".user_arrow");
const userText = document.querySelector(".user h2");
const profilePicture = document.querySelector(".profile_picture")

let controler = 0;
let user = localStorage.getItem("username") || undefined;
let picture = localStorage.getItem("profilepicture") || undefined;

function convertImageToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => resolve(reader.result);
  });
}

function removeForm() {
  const form = document.querySelector(".main .sidebar form");
  form.remove();
  controler = 0;
}

function displayUser() {
  if (user) {
    userText.textContent = user;
  }
}

function displayProfilePicture() {
  if (picture) {
    if (picture instanceof Blob) {
      profilePicture.src = URL.createObjectURL(picture);
    } else {
      profilePicture.src = picture;
    }
  }
}

function displayUserInfo() {
  displayUser();
  displayProfilePicture();
}

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
  usernameInput.value = user || "Guest";
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
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (usernameInput.value !== "") {
      user = usernameInput.value;
      localStorage.setItem("username", user);
    }

    if (fileInput.files.length > 0) {
      picture = fileInput.files[0];
    }

    displayUser();
    displayProfilePicture();
    removeForm();
    userArrow.classList.toggle("active_arrow");
  });

  form.append(usernameDiv, fileDiv, submitButton);
  sidebar.appendChild(form);
  controler = 1;
}

user_div.addEventListener("click", (event) => {
  if (controler == 0) {
    createModal();
  } else {
    removeForm();
  }
  userArrow.classList.toggle("active_arrow");
});

displayUserInfo();