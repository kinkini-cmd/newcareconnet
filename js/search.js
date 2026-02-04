
const caregivers = [
    {
        id: 1,
        name: "Nimal Rathnayake",
        role: "attendant",
        experience: "5 Yrs Exp",
        rating: 4.8,
        reviews: 24,
        location: "colombo",
        distance: "2.5 km away",
        price: 2500,
        priceUnit: "day",
        verified: true,
        image: "images/caregiver_avatar.jpg"
    },
    {
        id: 2,
        name: "Sithara Menike",
        role: "nurse",
        experience: "8 Yrs Exp",
        rating: 5.0,
        reviews: 12,
        location: "kandy",
        distance: "4.1 km away",
        price: 4000,
        priceUnit: "shift",
        verified: true,
        image: "images/caregiver_avatar.jpg"
    },
    {
        id: 3,
        name: "Raja Perera",
        role: "elderly",
        experience: "2 Yrs Exp",
        rating: 4.5,
        reviews: 3,
        location: "galle",
        distance: "0.8 km away",
        price: 2000,
        priceUnit: "day",
        verified: false,
        image: "images/caregiver_avatar.jpg"
    }
];


function renderCaregivers(filteredData) {
    const resultsContainer = document.getElementById('caregiver-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (filteredData.length === 0) {
        resultsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="background: var(--bg-color); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3 style="color: var(--text-main); margin-bottom: 8px;">No professionals found</h3>
                <p>Try adjusting your search filters or wider area.</p>
                <button onclick="window.location.reload()" class="btn btn-outline" style="margin-top: 16px;">Reset All Filters</button>
            </div>
        `;
        return;
    }

    filteredData.forEach(cg => {
        const card = `
            <article class="caregiver-card" data-id="${cg.id}" style="border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 16px; background: white;">
                <div class="caregiver-img-container">
                    <img src="${cg.image}" alt="${cg.name}" class="caregiver-img">
                </div>

                <div style="width: 100%;">
                    <div class="caregiver-header">
                        <div class="caregiver-name">${cg.name}</div>
                        ${cg.verified ?
                `<span class="badge-blue"><i class='bx bxs-check-circle'></i> VERIFIED</span>` :
                `<span class="badge-new">NEW</span>`
            }
                    </div>

                    <div class="caregiver-role">
                        ${cg.role.charAt(0).toUpperCase() + cg.role.slice(1)} Care • ${cg.experience}
                    </div>

                    <div class="rating-row">
                        <span class="rating-star">★ ${cg.rating.toFixed(1)}</span>
                        <span style="color: var(--text-secondary);">(${cg.reviews} reviews)</span>
                    </div>

                    <div class="pill-distance">${cg.distance}</div>

                    <div class="price-row">
                        LKR ${cg.price.toLocaleString()} <span style="font-weight: 400; font-size: 0.8em; color: var(--text-secondary);">/ ${cg.priceUnit}</span>
                    </div>

                    <div class="card-actions-row">
                        <a href="profile.html?id=${cg.id}" class="btn-view-profile" style="display: flex; align-items: center; justify-content: center; text-decoration: none;">View Profile</a>
                        <a href="chat.html?id=${cg.id}" class="btn-chat-circle" title="Message">
                            <i class='bx bx-message-rounded-dots' style="font-size: 1.2rem;"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
        resultsContainer.innerHTML += card;
    });

    // Update result count text
    const countText = document.getElementById('result-count');
    if (countText) {
        countText.textContent = `Showing ${filteredData.length} active professionals`;
    }
}



function applyFilters() {
    const location = document.getElementById('filter-location').value;
    const minRating = parseFloat(document.getElementById('filter-rating').value);

    const selectedServices = Array.from(document.querySelectorAll('#filter-service input:checked')).map(cb => cb.value);

    const filtered = caregivers.filter(cg => {
        const matchesLocation = location === 'all' || cg.location === location;
        const matchesRating = cg.rating >= minRating;
        const matchesService = selectedServices.length === 0 || selectedServices.includes(cg.role);

        return matchesLocation && matchesRating && matchesService;
    });

    renderCaregivers(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isEmergency = urlParams.get('emergency') === 'true';

    if (isEmergency) {
        document.querySelector('main h1').textContent = "Emergency Fast-Track Bookings";
        const emergencyCaregivers = caregivers.filter(cg => cg.verified && cg.rating >= 4.5);
        renderCaregivers(emergencyCaregivers);
        alert("Emergency mode active: Showing only top-rated, verified caregivers available for immediate dispatch.");
    } else {
        renderCaregivers(caregivers);
    }

    const applyBtn = document.getElementById('apply-filters');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
});
