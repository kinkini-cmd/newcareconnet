document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing');

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble ${type}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function mockResponse() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const responses = [
                "I can definitely help with that. Are you looking for a day shift or night shift?",
                "Yes, I have experience with post-surgery care for elderly patients.",
                "That works for me. Should I bring my own medical supplies or will the hospital provide them?",
                "I'm familiar with the ward layout at Asiri Surgical. It won't be a problem."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'received');
        }, 2000);
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text, 'sent');
            messageInput.value = '';

            // Mock a reply after a short delay
            setTimeout(mockResponse, 1000);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
