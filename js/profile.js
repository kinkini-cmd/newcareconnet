
const profiles = {
    1: {
        name: "Nimal Rathnayake",
        role: "Professional Hospital Attendant",
        verified: true,
        rating: 4.8,
        reviews: 24,
        location: "Colombo, Sri Lanka",
        about: "I am an experienced hospital attendant with over 5 years of service at National Hospital and Asiri Central. I am patient, reliable, and fluent in Sinhala and English. I specialize in post-surgery care and elderly mobility assistance.",
        skills: ["Mobility Support", "Post-Op Care", "Feeding Assistance", "Sinhala (Native)", "English (Fluent)"],
        price: "LKR 2,500",
        unit: "per day",
        image: "https://ui-avatars.com/api/?name=Nimal+R&background=0d9488&color=fff&size=200",
        reviewsList: [
            { user: "Mrs. Silva", time: "2 weeks ago", rating: "★★★★★", text: "Nimal was excellent with my father at Asiri Hospital. Very punctual and kind." },
            { user: "Mr. Perera", time: "1 month ago", rating: "★★★★☆", text: "Good service, very helpful with the wheelchair transfer." }
        ]
    },
    2: {
        name: "Sithara Menike",
        role: "Registered Nurse (ICU trained)",
        verified: true,
        rating: 5.0,
        reviews: 12,
        location: "Kandy, Sri Lanka",
        about: "I am a government registered nurse with 8 years of experience in critical care and home nursing. I am compassionate and skilled in managing medication, wound dressing, and monitoring vital signs for bedridden patients.",
        skills: ["Wound Dressing", "IV Administration", "Catheter Care", "Diabetes Management", "English (Fluent)"],
        price: "LKR 4,000",
        unit: "per shift",
        image: "https://ui-avatars.com/api/?name=Sithara+M&background=0284c7&color=fff&size=200",
        reviewsList: [
            { user: "Dr. Fernando", time: "1 week ago", rating: "★★★★★", text: "Sithara is extremely professional and knowledgeable. Highly recommended for home nursing." },
            { user: "Mrs. Jayawardena", time: "3 weeks ago", rating: "★★★★★", text: "Very kind lady. She took great care of my mother." }
        ]
    },
    3: {
        name: "Raja Perera",
        role: "Elderly Care Assistant",
        verified: false,
        rating: 4.5,
        reviews: 3,
        location: "Galle, Sri Lanka",
        about: "Friendly and strong caregiver specializing in elderly companionship and daily assistance. I help with bathing, cleaning, and keeping the patient active.",
        skills: ["Elderly Companionship", "Bathing assistance", "Cooking", "Sinhala (Native)"],
        price: "LKR 2,000",
        unit: "per day",
        image: "https://ui-avatars.com/api/?name=Raja+P&background=64748b&color=fff&size=200",
        reviewsList: [
            { user: "Mr. Alwis", time: "1 month ago", rating: "★★★★☆", text: "Raja is a hard worker. Good value for money." }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 1; // Default to Nimal
    const profile = profiles[id];

    if (profile) {
        document.title = `${profile.name} - Profile | CareConnect`;

        // Header Info
        document.getElementById('p-name').textContent = profile.name;
        document.getElementById('p-role').textContent = profile.role;
        document.getElementById('p-location').textContent = profile.location;
        document.getElementById('p-rating').textContent = `★ ${profile.rating}`;
        document.getElementById('p-avatar').src = profile.image; // In real app, use real images

        const badge = document.getElementById('p-badge');
        if (profile.verified) {
            badge.style.display = 'inline-flex';
            badge.className = 'badge badge-verified';
            badge.textContent = 'ID Verified';
        } else {
            badge.style.display = 'inline-flex';
            badge.className = 'badge';
            badge.style.backgroundColor = '#f1f5f9';
            badge.style.color = '#64748b';
            badge.textContent = 'New Member';
        }

        // About Section
        document.getElementById('p-about-title').textContent = `About ${profile.name.split(' ')[0]}`;
        document.getElementById('p-about-text').textContent = profile.about;

        // Skills
        const skillsContainer = document.getElementById('p-skills');
        skillsContainer.innerHTML = profile.skills.map(s => `<span class="tag">${s}</span>`).join('');

        // Sidebar Widget
        document.getElementById('w-price').textContent = profile.price;
        document.getElementById('w-unit').textContent = profile.unit;
        document.getElementById('w-message-btn').innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Message ${profile.name.split(' ')[0]}
        `;
        document.getElementById('w-message-btn').href = `chat.html?id=${id}`;

        // Reviews
        document.getElementById('p-reviews-title').textContent = `Reviews (${profile.reviews})`;
        const reviewsContainer = document.getElementById('p-reviews-list');
        reviewsContainer.innerHTML = profile.reviewsList.map(r => `
            <div class="review-item">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-weight: 600;">${r.user}</span>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">${r.time}</span>
                </div>
                <div class="rating" style="font-size: 0.9rem; margin-bottom: 8px;">${r.rating}</div>
                <p style="color: var(--text-secondary);">${r.text}</p>
            </div>
        `).join('');
    }
});
