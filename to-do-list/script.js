const sair = document.getElementById("sair");

sair.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users"));

  if (!loggedInUser || !users) {
    alert("Usuário não está logado.");
    window.location.href = "login.html";
    return;
  }

  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");
  const doneCount = document.getElementById("doneCount");
  const newTaskInput = document.getElementById("newTaskInput");
  const addTaskButton = document.getElementById("addTaskButton");

  function renderTasks() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    let doneTasksCount = 0;

    loggedInUser.tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "checkbox flex items-center mb-2";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `task${index}`;
      checkbox.checked = task.completed;
      checkbox.className = "mr-2";

      const label = document.createElement("label");
      label.setAttribute("for", `task${index}`);
      label.textContent = task.description;
      label.className = "text-gray-700";

      taskElement.appendChild(checkbox);
      taskElement.appendChild(label);

      if (task.completed) {
        doneList.appendChild(taskElement);
        doneTasksCount++;
      } else {
        todoList.appendChild(taskElement);
      }

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });
    });

    doneCount.textContent = doneTasksCount;
  }

  function saveTasks() {
    const userIndex = users.findIndex((user) => user.id === loggedInUser.id);
    if (userIndex !== -1) {
      users[userIndex].tasks = loggedInUser.tasks;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }

  addTaskButton.addEventListener("click", () => {
    const taskDescription = newTaskInput.value.trim();
    if (taskDescription) {
      const newTask = {
        id: loggedInUser.tasks.length + 1,
        description: taskDescription,
        completed: false,
      };
      loggedInUser.tasks.push(newTask);
      saveTasks();
      renderTasks();
      newTaskInput.value = "";
    }
  });

  document.getElementById("eraseAllTodo").addEventListener("click", () => {
    loggedInUser.tasks = loggedInUser.tasks.filter((task) => task.completed);
    saveTasks();
    renderTasks();
  });

  document.getElementById("eraseAllDone").addEventListener("click", () => {
    loggedInUser.tasks = loggedInUser.tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();
});
