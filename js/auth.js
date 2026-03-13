const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        switch(user.role) {
            case 'cliente':
                window.location.href = 'cliente.html';
                break;
            case 'cajero':
                window.location.href = 'cajero.html';
                break;
            case 'admin':
                window.location.href = 'admin.html';
                break;
        }
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
});
