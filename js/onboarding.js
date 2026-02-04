
let currentStep = 0;
const totalSteps = 3;
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextStep();
    }, 3000); // Switch every 3 seconds
}

function nextStep() {
    currentStep = (currentStep + 1) % totalSteps; // Loop back to 0
    updateUI();
}

function updateUI() {
    const container = document.getElementById('step-container');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    // Move slides
    container.style.transform = `translateX(-${(currentStep * 100) / totalSteps}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStep);
    });

    // Handle last step visuals
    if (currentStep === totalSteps - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'flex';
        finishBtn.style.display = 'none';
    }
}

function finishOnboarding() {
    clearInterval(autoPlayInterval);
    localStorage.setItem('careConnectOnboardingSeen', 'true');
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    startAutoPlay();
});
