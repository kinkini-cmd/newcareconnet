
function handleLogin(e) {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

    // Simulation: Check localStorage
    const users = JSON.parse(localStorage.getItem('careConnectUsers') || '[]');
    const user = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful! Redirecting...');

        if (user.role === 'admin') {
            window.location.href = 'dashboard.html?role=admin';
        } else if (user.role === 'caregiver') {
            window.location.href = 'dashboard.html?role=caregiver';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        alert('Invalid email or password.');
    }
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
