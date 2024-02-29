document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Function to send a message
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("user", userMessage);
            getBotResponse(userMessage);
            userInput.value = "";
        }
    }

    // Function to append a message to the chat box
    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add(sender);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to get a response from the bot
    async function getBotResponse(userMessage) {
        // Define bot responses
        const responses = {
            "hello": "Hi there! I'm here to help you with your questions about the GPA calculator.",
            "hi": "Hi there! I'm here to help you with your questions about the GPA calculator.",
            "how does the gpa calculator work": "The GPA calculator allows you to calculate your grade point average (GPA) based on the grades and credits earned in your courses. Simply input your grades and credits, and the calculator will provide you with your GPA.",
            "what is the purpose of the GPA calculator": "The purpose of the GPA calculator is to provide students with a convenient tool for calculating their GPA, both unweighted and weighted. It helps students track their academic progress and plan their future courses.",
            "can I calculate both weighted and unweighted GPA": "Yes, you can calculate both weighted and unweighted GPA using this calculator. Weighted GPA takes into account the difficulty of the courses by assigning higher weights to honors or AP courses.",
            // Add more responses as needed
        };

        // Check if user's message matches predefined questions
        for (const keyword in responses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                // If matched, append bot's response to the chat box
                appendMessage("bot", responses[keyword]);
                return; // Stop searching for matches
            }
        }

        // If no predefined question matches, provide a default response
        appendMessage("bot", "I'm sorry, I couldn't understand your question. Feel free to ask anything about the GPA calculator!");
    }

    // Event listeners for sending messages
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
