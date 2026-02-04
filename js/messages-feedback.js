
const mockChats = [
    {
        id: 1,
        patientName: "Kamal Perera",
        lastMessage: "Thank you for the care yesterday.",
        time: "10:30 AM",
        avatar: "https://ui-avatars.com/api/?name=Kamal+P&background=0d9488&color=fff",
        messages: [
            { sender: "patient", text: "Hello Nimal, are you available tomorrow?", time: "9:00 AM" },
            { sender: "me", text: "Yes, I am available from 8 AM to 4 PM.", time: "9:15 AM" },
            { sender: "patient", text: "Great, I'll book you for the morning shift.", time: "9:20 AM" },
            { sender: "patient", text: "Thank you for the care yesterday.", time: "10:30 AM" }
        ]
    },
    {
        id: 2,
        patientName: "Sunil Silva",
        lastMessage: "What medicine should I take tonight?",
        time: "Yesterday",
        avatar: "https://ui-avatars.com/api/?name=Sunil+S&background=3b82f6&color=fff",
        messages: [
            { sender: "patient", text: "What medicine should I take tonight?", time: "Yesterday" }
        ]
    }
];

const mockFeedbacks = [
    {
        id: 1,
        patientName: "Kamal Perera",
        rating: 5,
        comment: "Nimal was extremely professional and caring. Highly recommended!",
        date: "2026-01-20",
        category: "Hospital Care"
    },
    {
        id: 2,
        patientName: "Aruni Jayawardena",
        rating: 4,
        comment: "Very punctual and helpful with the exercises.",
        date: "2026-01-18",
        category: "Post-Surgery"
    },
    {
        id: 3,
        patientName: "Sunil Silva",
        rating: 5,
        comment: "Excellent service, very knowledgeable about the medications.",
        date: "2026-01-15",
        category: "General Care"
    }
];

let activeChatId = null;

function switchTab(tab) {
    const messagesTab = document.getElementById('messages-tab');
    const feedbacksTab = document.getElementById('feedbacks-tab');
    const tabs = document.querySelectorAll('.tab-btn');

    if (tab === 'messages') {
        messagesTab.style.display = 'grid';
        feedbacksTab.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        renderChatList();
    } else {
        messagesTab.style.display = 'none';
        feedbacksTab.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
        renderFeedbackList();
    }
}

function renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = mockChats.map(chat => `
        <div class="interaction-card ${activeChatId === chat.id ? 'active' : ''}" onclick="selectChat(${chat.id})">
            <div style="display: flex; gap: 12px; align-items: center;">
                <img src="${chat.avatar}" style="width: 48px; height: 48px; border-radius: 50%;">
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4 style="margin: 0;">${chat.patientName}</h4>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">${chat.time}</span>
                    </div>
                    <p style="margin: 4px 0 0; font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${chat.lastMessage}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

function selectChat(id) {
    activeChatId = id;
    renderChatList();

    const chat = mockChats.find(c => c.id === id);
    const headerName = document.getElementById('active-chat-name');
    const messagesContainer = document.getElementById('chat-messages-container');
    const inputContainer = document.getElementById('chat-input-container');

    headerName.textContent = chat.patientName;
    inputContainer.style.display = 'block';

    messagesContainer.innerHTML = chat.messages.map(msg => `
        <div class="chat-bubble ${msg.sender === 'me' ? 'sent' : 'received'}" style="margin-bottom: 12px;">
            ${msg.text}
            <div style="font-size: 0.7rem; opacity: 0.7; margin-top: 4px; text-align: ${msg.sender === 'me' ? 'right' : 'left'}">
                ${msg.time}
            </div>
        </div>
    `).join('');

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (!text || !activeChatId) return;

    const chat = mockChats.find(c => c.id === activeChatId);
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

    chat.messages.push({ sender: 'me', text, time });
    chat.lastMessage = text;
    chat.time = time;

    input.value = '';
    selectChat(activeChatId);
}

function renderFeedbackList() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = mockFeedbacks.map(f => `
        <div class="feedback-card">
            <button class="share-btn" onclick="shareFeedback(${f.id})" title="Share Feedback">📤</button>
            <div class="star-rating">${'⭐'.repeat(f.rating)}</div>
            <p style="font-style: italic; margin-bottom: 16px; color: var(--text-main);">"${f.comment}"</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
                <div>
                    <div style="font-weight: 700; font-size: 0.9rem;">${f.patientName}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${f.date}</div>
                </div>
                <span class="ward-badge">${f.category}</span>
            </div>
        </div>
    `).join('');
}

function shareFeedback(id) {
    const feedback = mockFeedbacks.find(f => f.id === id);
    alert(`Sharing feedback from ${feedback.patientName} to your profile!`);
    // In a real app, this would update a 'public' flag or post to social media
}

document.addEventListener('DOMContentLoaded', () => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
        const user = JSON.parse(userString);
        // If user is caregiver, they see this page
        renderChatList();
    } else {
        window.location.href = 'login.html';
    }
});
