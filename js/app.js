
// Theme Toggling
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else {
    htmlElement.setAttribute('data-theme', systemTheme);
    updateIcon(systemTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

function updateIcon(theme) {
    // Visual state is now handled by CSS based on the [data-theme] attribute on the html element
    if (!themeToggleBtn) return;
}

// Mobile Menu (if implemented)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Back Button Logic
const backBtns = document.querySelectorAll('.back-btn');
backBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html'; // Fallback to home
        }
    });
});

/* --- User Profile Management (Mock) --- */
const defaultUser = {
    firstName: 'Kamal',
    lastName: 'Perera',
    email: 'kamal.perera@example.com',
    phone: '+94 77 123 4567',
    photo: 'KP' // Initials or URL
};

// Load User Data
function loadUserProfile() {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : defaultUser;
}

// Save User Data
function saveUserProfile(data) {
    const currentUser = loadUserProfile();
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));

    // Update UI if on page
    updateUserUI(updatedUser);
}

// Update UI Elements
function updateUserUI(user) {
    // Update Dashboard Name
    const dashNameElements = document.querySelectorAll('.user-name-display');
    console.log('Updating names', dashNameElements.length, user.firstName);
    dashNameElements.forEach(el => el.textContent = `${user.firstName} ${user.lastName}`);

    // Update Initials/Avatar
    const avatarElements = document.querySelectorAll('.user-avatar-display');
    avatarElements.forEach(el => {
        el.textContent = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    });
}

// GPS Location Mock
const gpsBtn = document.getElementById('gps-btn');
if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
        if (confirm("Allow CareConnect to access your location for better results?")) {
            gpsBtn.textContent = "📍 Using Your Location";
            gpsBtn.classList.remove('btn-outline');
            gpsBtn.classList.add('btn-primary');
            alert("Location data retrieved. Showing nearest caregivers first.");
        }
    });
}

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSideNav();
    const user = loadUserProfile();
    updateUserUI(user);
});

function initSideNav() {
    // 1. Inject Hamburger Button into Navbar if it doesn't exist
    const navbarContent = document.querySelector('.nav-content');
    if (navbarContent && !document.querySelector('.hamburger-btn')) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-btn';
        hamburgerBtn.id = 'hamburger-trigger';
        hamburgerBtn.ariaLabel = 'Open Menu';
        hamburgerBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        // Insert at the start of navbar content (left side)
        navbarContent.insertBefore(hamburgerBtn, navbarContent.firstChild);

        hamburgerBtn.addEventListener('click', openSideNav);
    }

    // 2. Inject Side Nav and Overlay
    if (!document.querySelector('.side-nav')) {
        const overlay = document.createElement('div');
        overlay.className = 'side-nav-overlay';
        overlay.id = 'side-nav-overlay';
        overlay.onclick = closeSideNav;

        const sideNav = document.createElement('div');
        sideNav.className = 'side-nav';
        sideNav.id = 'side-nav';
        sideNav.innerHTML = `
            <div class="side-nav-header">
                <a href="home.html" class="logo" style="font-size: 1.4rem;">
                    <img src="images/logo.png" alt="Logo" style="height: 32px;">
                    CareConnect
                </a>
                <button onclick="closeSideNav()" style="background:none; border:none; cursor:pointer; padding:4px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary);">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="side-nav-links">
                <a href="home.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home
                </a>
                <a href="search.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Find Caregivers
                </a>
                <a href="hospitals.html" class="side-nav-item">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path><polyline points="12 3 12 11"></polyline></svg>
                    Hospitals
                </a>
                <a href="messages-feedback.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Messages
                </a>
                <a href="dashboard.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Dashboard
                </a>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 8px 0;">
                <a href="login.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                    Login
                </a>
                <a href="register.html" class="side-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    Register
                </a>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(sideNav);
    }
}

function openSideNav() {
    document.getElementById('side-nav').classList.add('open');
    document.getElementById('side-nav-overlay').classList.add('open');
}

function closeSideNav() {
    document.getElementById('side-nav').classList.remove('open');
    document.getElementById('side-nav-overlay').classList.remove('open');
}
