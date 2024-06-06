let users = []; // Lista de usuários

let close = document.getElementById("close");

close.addEventListener("click", () => {
  window.location.href = "/index.html";
});

document.addEventListener("DOMContentLoaded", (event) => {
  const signInButton = document.querySelector(".btn-signin");
  const signUpButton = document.querySelector(".btn-signup");
  const userField = document.querySelector('input[type="text"]');
  const passwordField = document.querySelector('input[type="password"]');

  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = userField.value;
    const password = passwordField.value;
    if (!username || !password) {
      alert("Preencha todos os campos");
      return;
    } else if (users.find((user) => user.username === username)) {
      alert("Usuário ja existe");
      return;
    } else {
      const id = users.length + 1; // ID do usuário
      const user = { id, username, password, tasks: [] }; // Novo usuário
      users.push(user); // Adiciona o usuário à lista
      localStorage.setItem("users", JSON.stringify(users)); // Armazena a lista de usuários
      alert("Usuário criado com sucesso");
    }
    document.getElementById("form").reset();
  });

  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    // lista de usuários
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (user) =>
        user.username === userField.value &&
        user.password === passwordField.value
    );
    const password = passwordField.value;

    if (!user || !password) {
      alert("Preencha todos os campos");
      return;
    }

    // Verifica se o usuário existe
    if (!user) {
      alert("Usuário ou senha incorretos");
      return;
    }

    // Verifica se a senha esta correta
    if (user.password !== password) {
      alert("Usuário ou senha incorretos");
      return;
    }

    if (user) {
      // caso o login e senha seja correto, crie uma flag na localStorage com o usuário logado
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      window.location.href = "to-do-list.html";
    } else {
      alert("Usuário ou senha incorretos");
    }
  });
});

window.addEventListener("load", (event) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    window.location.href = "to-do-list.html";
  }
});
