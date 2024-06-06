if (!localStorage.getItem('loggedInUser')) {
    window.location.href = 'login.html';
}

const logoutButton = document.getElementById('sair');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
})