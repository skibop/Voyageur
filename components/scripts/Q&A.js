document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Define a mapping of user questions to their corresponding answers
    const responses = {
        "developer": "This program was developed by Ankit Kale.",
        "why was it developed": "The purpose of this program is to provide a convenient tool for calculating GPA, both unweighted and weighted.",
        "purpose": "The purpose of this program is to provide a convenient tool for calculating GPA, both unweighted and weighted.",
        "standard for gpa calculation": "GPA is calculated by taking the sum of grade points earned in each course and dividing it by the total number of credits.",
        "how is gpa calculated": "GPA is calculated by taking the sum of grade points earned in each course and dividing it by the total number of credits.",
        "how do I use this program": "You can use this GPA calculator to calculate your grade point average (GPA) based on your grades and credits earned in your courses.",
        "what can I do with this GPA calculator": "You can use this GPA calculator to calculate your grade point average (GPA) based on your grades and credits earned in your courses.",
        "is this GPA calculator free to use": "Yes, this GPA calculator is completely free to use.",
        "calculate both weighted and unweighted GPA": "Yes, you can calculate both weighted and unweighted GPA using this tool.",
        "weighted GPA": "Yes, you can calculate both weighted and unweighted GPA using this tool.",
        "is there a limit to the number of courses I can input": "There is no limit to the number of courses you can input. You can add as many courses as you need.",
        "what grading scale does this GPA calculator use": "This GPA calculator uses a standard grading scale, typically ranging from 0 to 4.0.",
        "can I calculate my GPA for a semester or an entire academic year": "Yes, you can calculate your GPA for a semester, an entire academic year, or any custom timeframe.",
        "how accurate is this GPA calculator": "This GPA calculator provides accurate results based on the grades and credits you input.",
        "can I save my calculated GPA for future reference": "Currently, there is no built-in feature to save calculated GPA. However, you can manually record the results.",
        "does this GPA calculator support different credit systems": "Yes, this GPA calculator supports different credit systems, such as semester credits or quarter credits.",
        "is there a mobile app version of this GPA calculator": "At the moment, there is no mobile app version available. However, you can use the web version on your mobile device.",
        "can I calculate my GPA for multiple years": "Yes, you can calculate your GPA for multiple years by inputting grades and credits for each respective year.",
        "how can I input my grades if my school uses a different grading system": "You can convert your grades to the standard grading scale used by this GPA calculator before inputting them.",
        "can I calculate my GPA for specific courses only": "Yes, you can choose to calculate your GPA for specific courses only by inputting grades and credits for those courses.",
        "is there a GPA cutoff or minimum GPA required for using this program": "There is no GPA cutoff or minimum GPA required for using this program. It's available for everyone.",
        "can I calculate GPA for past semesters": "Yes, you can input grades and credits for past semesters to calculate GPA retrospectively.",
        "are there any tutorials or guides available for using this program": "Yes, you can find tutorials and guides on how to use this program on our website.",
        "does this GPA calculator round up or down": "This GPA calculator typically rounds GPA values to the nearest hundredth (two decimal places).",
        "can I calculate GPA for courses with pass/fail grading": "Yes, you can calculate GPA for courses with pass/fail grading by assigning appropriate grade point values.",
        "does this GPA calculator take into account AP or IB courses": "Yes, this GPA calculator accounts for AP (Advanced Placement) and IB (International Baccalaureate) courses by assigning higher grade point values."
    };

    sendBtn.addEventListener("click", function() {
        sendMessage();
    });

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("user", userMessage);
            processUserInput(userMessage);
            userInput.value = "";
        }
    }

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add(sender);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function processUserInput(message) {
        let botResponse = generateResponse(message);
        if (botResponse === "") {
            botResponse = "I'm sorry, I couldn't understand your question.";
        }
        appendMessage("bot", botResponse);
    }

    function generateResponse(message) {
        // Convert the message to lowercase for case-insensitive matching
        const lowerCaseMessage = message.toLowerCase();
        // Iterate through each predefined question and check if the user message contains a keyword
        for (const keyword in responses) {
            if (lowerCaseMessage.includes(keyword)) {
                return responses[keyword];
            }
        }
        return "";
    }
});
