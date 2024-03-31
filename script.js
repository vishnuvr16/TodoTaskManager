const inputEl = document.querySelector("#input");
const form = document.querySelector("form");
const outputEl = document.querySelector("#list-container");

const removeTask = (id) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
  }
  tasks = tasks.filter((task) => {
    return task.id !== +id;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  //Display to DOM
  let output;
  const allTasks = tasks.map((task) => {
    return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
          </li>
    `;
  });
  output = allTasks.join("");
  outputEl.innerHTML = output;
};
getTasks();

const addTask = (e) => {
  e.preventDefault();
  if (inputEl.value === "") {
    alert("Please enter the task to add ");
  }

  const task = inputEl.value;

  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
      console.log(tasks);
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks);
    }
    tasks.unshift({
      id: Date.now(),
      title: task,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  inputEl.value = "";
  getTasks();
};

form.addEventListener("submit", addTask);
