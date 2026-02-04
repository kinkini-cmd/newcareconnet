
function loadDashboard() {
    const userString = localStorage.getItem('currentUser');
    if (!userString) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(userString);
    const bookings = JSON.parse(localStorage.getItem('careConnectBookings') || '[]');
    const users = JSON.parse(localStorage.getItem('careConnectUsers') || '[]');

    updateSidebar(user);

    if (user.role === 'admin') {
        renderAdminDashboard(users, bookings);
    } else if (user.role === 'caregiver') {
        renderCaregiverDashboard(user, bookings);
    } else {
        renderPatientDashboard(user, bookings);
    }
}

function updateSidebar(user) {
    const nameDisplay = document.querySelector('.user-name-display');
    if (nameDisplay) nameDisplay.textContent = `${user.firstName} ${user.lastName}`;

    // Hide links based on role (Requested: Remove My Booking and Payment for Admin)
    if (user.role === 'admin') {
        const bookingLink = document.getElementById('link-my-bookings');
        const paymentLink = document.getElementById('link-payments');
        if (bookingLink) bookingLink.style.display = 'none';
        if (paymentLink) paymentLink.style.display = 'none';
    }

    const sidebarLinks = document.querySelector('aside div');
    if (sidebarLinks) {
        if (user.role === 'admin') {
            // Add Admin specific links
            const adminLink = document.createElement('a');
            adminLink.href = '#';
            adminLink.className = 'sidebar-link';
            adminLink.textContent = 'Verify Caregivers';

            // Insert before profile settings (assuming it's visually appropriate)
            // Finding a safe insertion point
            const profileLink = document.querySelector('a[href="edit-profile.html"]');
            if (profileLink) {
                sidebarLinks.insertBefore(adminLink, profileLink);
            } else {
                sidebarLinks.appendChild(adminLink);
            }
        }

        if (user.role === 'caregiver' || user.role === 'admin') {
            const interactionLink = document.createElement('a');
            interactionLink.href = 'messages-feedback.html';
            interactionLink.className = 'sidebar-link';
            interactionLink.textContent = 'Interactions';

            const profileLink = document.querySelector('a[href="edit-profile.html"]');
            if (profileLink) {
                sidebarLinks.insertBefore(interactionLink, profileLink);
            } else {
                sidebarLinks.appendChild(interactionLink);
            }
        }
    }
}

function renderPatientDashboard(user, bookings) {
    const main = document.querySelector('main');
    const userBookings = bookings.filter(b => b.patient === `${user.firstName} ${user.lastName}`);

    let bookingsHtml = userBookings.length > 0 ? '' : '<p>No bookings found.</p>';

    userBookings.forEach(b => {
        bookingsHtml += `
            <div class="card" style="margin-bottom: 20px;">
                <div class="booking-card" style="border: none; padding-bottom: 0; margin-bottom: 0;">
                    <div>
                        <h4 style="font-size: 1.1rem; margin-bottom: 4px;">${b.caregiver}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">${b.ward} • ${b.date}</p>
                    </div>
                    <div style="text-align: right;">
                        <span class="badge ${b.status === 'Confirmed' ? 'badge-verified' : ''}">${b.status}</span>
                        ${b.status === 'Confirmed' ? `
                            <div style="margin-top: 10px;">
                                <button onclick="openRatingModal(${b.id})" class="btn btn-outline" style="padding: 4px 12px; font-size: 0.8rem;">Rate Service</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    main.innerHTML = `
        <h2 style="margin-bottom: 24px;">Patient Dashboard</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Active Bookings</p>
                <h3 style="font-size: 2rem;">${userBookings.filter(b => b.status === 'Confirmed').length}</h3>
            </div>
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Pending</p>
                <h3 style="font-size: 2rem;">${userBookings.filter(b => b.status === 'Pending').length}</h3>
            </div>
        </div>
        <h3 style="margin-bottom: 20px;">Your Bookings</h3>
        ${bookingsHtml}
    `;
}

function renderCaregiverDashboard(user, bookings) {
    const main = document.querySelector('main');
    const caregiverBookings = bookings.filter(b => b.caregiver.includes(user.firstName));

    main.innerHTML = `
        <h2 style="margin-bottom: 24px;">Caregiver Dashboard</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Total Earnings</p>
                <h3 style="font-size: 2rem;">LKR ${caregiverBookings.reduce((sum, b) => sum + parseInt(b.amount.replace(/\D/g, '')), 0).toLocaleString()}</h3>
            </div>
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Profile Status</p>
                <h3 style="font-size: 1.5rem; color: ${user.verified ? 'green' : 'orange'};">${user.verified ? '✅ Verified' : '⏳ Pending'}</h3>
            </div>
        </div>
        <h3 style="margin-bottom: 20px;">Assigned Bookings</h3>
        ${caregiverBookings.map(b => `
            <div class="card" style="margin-bottom: 20px;">
                <div class="booking-card" style="border: none; padding-bottom: 0; margin-bottom: 0;">
                    <div>
                        <h4 style="font-size: 1.1rem; margin-bottom: 4px;">${b.patient}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">${b.ward} • ${b.date}</p>
                    </div>
                    <div style="text-align: right;">
                        <span class="badge badge-verified">${b.status}</span>
                    </div>
                </div>
            </div>
        `).join('') || '<p>No bookings assigned yet.</p>'}
    `;
}

function renderAdminDashboard(users, bookings) {
    const main = document.querySelector('main');
    const pendingCaregivers = users.filter(u => u.role === 'caregiver' && !u.verified);

    main.innerHTML = `
        <h2 style="margin-bottom: 24px;">Admin Dashboard</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Total Platform Revenue</p>
                <h3 style="font-size: 2rem;">LKR ${bookings.length * 200}</h3>
            </div>
            <div class="stat-card">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Pending Verifications</p>
                <h3 style="font-size: 2rem;">${pendingCaregivers.length}</h3>
            </div>
        </div>

        <h3 style="margin-bottom: 20px;">Caregiver Verification Requests</h3>
        <div class="card">
            ${pendingCaregivers.map(u => `
                <div class="booking-card">
                    <div>
                        <h4>${u.firstName} ${u.lastName}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">NIC: ${u.documents?.nic || 'Pending'} • Police Clearance: ${u.documents?.policeClearance || 'Pending'}</p>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="verifyCaregiver('${u.email}')" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;">Approve</button>
                        <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem; color: #ef4444; border-color: #ef4444;">Reject</button>
                    </div>
                </div>
            `).join('') || '<p>No pending verification requests.</p>'}
        </div>

        <h3 style="margin-bottom: 20px; margin-top: 40px;">Recent System Bookings</h3>
        <div class="card">
            ${bookings.slice(-5).reverse().map(b => `
                <div class="booking-card">
                    <div>
                        <h4>${b.patient} &rarr; ${b.caregiver}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">${b.date} • ${b.amount}</p>
                    </div>
                    <span class="badge badge-verified">${b.status}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function verifyCaregiver(email) {
    const users = JSON.parse(localStorage.getItem('careConnectUsers') || '[]');
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
        users[index].verified = true;
        localStorage.setItem('careConnectUsers', JSON.stringify(users));
        alert('Caregiver verified successfully!');
        loadDashboard();
    }
}

function openRatingModal(bookingId) {
    const rating = prompt("Enter rating (1-5):", "5");
    if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
        alert(`Thank you for rating with ${rating} stars!`);
        // In a real app, save to feedback table
    }
}

document.addEventListener('DOMContentLoaded', loadDashboard);
