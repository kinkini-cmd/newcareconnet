
// ... (Existing Theme Code)

// Registration Role Toggling
function toggleRole(role) {
    // Update Buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'var(--text-secondary)';
    });

    const activeBtn = document.getElementById(`btn-${role}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.backgroundColor = 'var(--surface-color)';
        activeBtn.style.color = 'var(--primary-color)';
        activeBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }

    // Update Fields
    document.getElementById('caregiver-fields').style.display = role === 'caregiver' ? 'block' : 'none';
    document.getElementById('admin-fields').style.display = role === 'admin' ? 'block' : 'none';
}

function handleRegister(e) {
    e.preventDefault();
    const role = document.querySelector('input[name="role"]:checked').value;
    const firstName = document.querySelector('input[placeholder="Kamal"]').value;
    const lastName = document.querySelector('input[placeholder="Perera"]').value;
    const email = document.querySelector('input[placeholder="you@example.com"]').value;
    const password = document.querySelector('input[placeholder="••••••••"]').value;

    // Simulation: Save to localStorage
    const users = JSON.parse(localStorage.getItem('careConnectUsers') || '[]');

    // Simple check if email already exists
    if (users.find(u => u.email === email)) {
        alert('An account with this email already exists.');
        return false;
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password, // In a real app, this MUST be hashed
        role,
        verified: role === 'patient' || role === 'admin', // Patient and Admin verified by default for demo
        documents: role === 'caregiver' ? { nic: null, policeClearance: null } : null
    };

    users.push(newUser);
    localStorage.setItem('careConnectUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert(`Successfully registered as ${role.toUpperCase()}! Redirecting to dashboard...`);

    if (role === 'admin') {
        window.location.href = 'dashboard.html?role=admin';
    } else if (role === 'caregiver') {
        window.location.href = 'dashboard.html?role=caregiver';
    } else {
        window.location.href = 'dashboard.html';
    }
    return false;
}

// Initialize default state if on register page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('btn-patient')) {
        toggleRole('patient');
    }
});
