class ChatBot {
    constructor() {
        this.patterns = [
            { pattern: /\b(calculate|computing|how to calculate)\b.*\bGPA\b/i, response: 'To calculate GPA, you need to perform a series of mathematical operations.' },
            { pattern: /\b(mean|meaning)\b.*\bGPA\b/i, response: 'GPA stands for Grade Point Average, a measure of academic performance in numerical value.' },
            { pattern: /\b(raise|improve|boost)\b.*\bGPA\b/i, response: 'To improve your GPA, consider studying more effectively, seeking help from tutors, or participating in study groups.' },
            { pattern: /\b(low|bad|poor)\b.*\bGPA\b/i, response: 'A low GPA can pose challenges, but proactive steps such as seeking academic support and adjusting study habits can help improve it.' },
            { pattern: /\b(high|good|excellent)\b.*\bGPA\b/i, response: 'A high GPA typically indicates strong academic performance and may open doors to various opportunities.' },
            { pattern: /\b(does|is)\b.*\bGPA\b.*\b(matter|important|count)\b/i, response: 'Whether a GPA matters depends on factors such as career goals, academic aspirations, and specific institutions admission criteria.' },
            { pattern: /\baverage\b.*\bGPA\b/i, response: 'The average GPA can vary based on factors such as institution, academic program, and grading scale.' },
            { pattern: /\b(convert|change|translate)\b.*\bGPA\b/i, response: 'To convert a GPA, you typically use standardized formulas or conversion charts to translate it into different grading systems.' },
            { pattern: /\b(difference|different)\b.*\bGPA\b/i, response: 'The difference between two GPAs lies in their numerical values and may reflect variations in academic performance or grading scales.' },
            { pattern: /\b(applied|applying|applicants)\b.*\bcollege\b/i, response: 'Considerations for college applicants include factors such as GPA, extracurricular activities, essays, and standardized test scores.' },
            { pattern: /\b(accepted|admitted)\b.*\bcollege\b/i, response: 'Admission decisions are often based on holistic evaluations, considering factors such as GPA, test scores, extracurricular activities, and personal essays.' },
            { pattern: /\b(graduation|graduate)\b/i, response: 'Graduation may require meeting minimum GPA requirements established by your educational institution.' },
            { pattern: /\b(prestigious|competitive)\b.*\bcollege\b/i, response: 'Prestigious colleges often have competitive admissions processes where GPA plays a crucial role.' },
            { pattern: /\b(transfer)\b.*\bcollege\b/i, response: 'Transferring to another institution typically requires meeting GPA requirements set by the new school.' },
            { pattern: /\b(standardized|sat|act)\b.*\btest scores\b/i, response: 'Standardized test scores, such as SAT or ACT, are commonly considered alongside GPA in college admissions.' },
            { pattern: /\b(importance|significant)\b.*\bGPA\b/i, response: 'GPA plays a significant role in college admissions and scholarship opportunities, reflecting academic performance.' },
            { pattern: /\b(graduate|graduation|graduating)\b.*\bGPA\b/i, response: 'Graduating with a high GPA can enhance job prospects and pave the way for advanced education opportunities.' },
            { pattern: /\b(scholarship|scholarships)\b/i, response: 'Many scholarships require a minimum GPA for eligibility, reflecting academic achievement.' },
            { pattern: /\bGPA\b.*\bcalculator\b/i, response: 'Online GPA calculators offer tools to estimate GPA based on course grades and credit hours.' },
            { pattern: /\b(honor|honors)\b.*\bGPA\b/i, response: 'Earning academic honors, such as deans list recognition, often requires a high GPA.' },
            { pattern: /\b(credits|credit hours)\b.*\bGPA\b/i, response: 'Your GPA is calculated based on the grades earned in each class, weighted by the number of credit hours assigned to each course.' },
            { pattern: /\bGPA\b.*\bscale\b/i, response: 'GPA scales can vary among institutions, but they typically range from 0 to 4.0 for unweighed and up to 5.0 for weighted.' },
            { pattern: /\bGPA\b.*\bcumulative\b/i, response: 'Cumulative GPA reflects overall academic performance, considering grades earned in all courses taken.' },
            { pattern: /\bGPA\b.*\b(impact|affect)\b.*\bjob\b/i, response: 'Your GPA may influence job opportunities, especially for recent graduates entering the job market.' },
            { pattern: /\b(college|university)\b.*\brequirements\b/i, response: 'Review the GPA requirements for colleges or universities you plan to apply to.' },
            { pattern: /\bGPA\b.*\bsemester\b/i, response: 'Your GPA may fluctuate from semester to semester based on your academic performance and course load.' },
            { pattern: /\b(advice|tips|guidance)\b.*\bGPA\b/i, response: 'Seeking advice from academic advisors or mentors can provide valuable insights on improving your GPA.' },
            { pattern: /\b(successful|effective)\b.*\bGPA\b.*\bstrategies\b/i, response: 'Implementing successful study strategies and time management techniques can contribute to a higher GPA.' },
            { pattern: /\b(grade|grades)\b.*\bGPA\b.*\bimpact\b/i, response: 'Your GPA can have a significant impact on your overall academic performance and transcript.' },
            { pattern: /\b(online|digital)\b.*\bGPA\b.*\bresources\b/i, response: 'Utilizing online resources and educational platforms can supplement your learning and improve your GPA.' },
            { pattern: /\b(community|peer)\b.*\bGPA\b.*\bsupport\b/i, response: 'Engaging with a supportive community or study group can provide encouragement and motivation to maintain a high GPA.' },
            { pattern: /\b(struggle|challenges)\b.*\bGPA\b.*\bimproving\b/i, response: 'Many students face challenges when improving their GPA, but consistent effort and determination can lead to progress.' },
            { pattern: /\b(professor|instructor)\b.*\bGPA\b.*\bsuggestions\b/i, response: 'Reaching out to your professors or instructors for personalized feedback and suggestions can help you enhance your GPA.' },
            { pattern: /\b(focus|concentration)\b.*\bGPA\b.*\benhancement\b/i, response: 'Improving your focus and concentration through mindfulness practices or study techniques can positively impact your GPA.' },
            { pattern: /\b(competition|competitive)\b.*\bGPA\b.*\badvantage\b/i, response: 'Maintaining a high GPA can give you a competitive advantage when applying for scholarships, internships, or graduate programs.' },
            { pattern: /\b(graduation|graduate)\b.*\bGPA\b.*\bachievement\b/i, response: 'Graduating with a high GPA is an achievement that reflects your dedication and hard work throughout your academic journey.' },
            { pattern: /\b(academic|educational)\b.*\bGPA\b.*\bgoals\b/i, response: 'Setting specific academic goals and milestones can help you stay focused and motivated to achieve a higher GPA.' },
            { pattern: /\b(self-discipline|motivation)\b.*\bGPA\b.*\bconsistency\b/i, response: 'Developing self-discipline and maintaining motivation are key factors in consistently achieving a high GPA.' },
            { pattern: /\b(mental|emotional)\b.*\bGPA\b.*\bwell-being\b/i, response: 'Prioritizing your mental and emotional well-being is essential for maintaining a healthy balance and achieving success in your GPA.' },
            { pattern: /\b(weighted)\b.*\bGPA\b/i, response: 'A weighted GPA takes into account the difficulty of your courses by assigning higher values to grades earned in honors, AP, or IB classes.' },
            { pattern: /\b(unweighted)\b.*\bGPA\b/i, response: 'An unweighted GPA is based on a standard scale where all classes are given the same value regardless of their difficulty level.' },
            { pattern: /\bGPA\b/i, response: 'GPA stands for Grade Point Average, a measure of academic performance in numerical value.' },
        ];
    }

    sendMessage(input) {
        // Convert the input to lowercase before checking patterns
        input = input.toLowerCase();
        let response = 'Sorry, I did not understand your question. Could you please rephrase?';

        // Check each pattern
        for (let i = 0; i < this.patterns.length; i++) {
            let match = input.match(this.patterns[i].pattern);
            if (match) {
                response = this.patterns[i].response;
                break;
            }
        }

        return response;
    }
}

// ChatBot instance
const chatBot = new ChatBot();

// Function to handle sending the message
function handleMessage() {
    const input = document.getElementById('user-input').value;
    // Check if input contains non-alphanumeric characters
    if (/[^a-z0-9\s.?]/i.test(input)) {
        alert('Please only use alphanumeric characters, question marks, and decimal numbers.');
        return; // Prevent further execution
    }

    const userMessage = document.createElement('div');
    userMessage.textContent = input;
    userMessage.classList.add('user');
    document.getElementById('chat-box').appendChild(userMessage);

    const response = chatBot.sendMessage(input);

    const botMessage = document.createElement('div');
    botMessage.textContent = response;
    botMessage.classList.add('bot');
    document.getElementById('chat-box').appendChild(botMessage);

    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
}

// Add event listeners for clicking the send button
document.getElementById('send-btn').addEventListener('click', handleMessage);

// Add event listener for pressing Enter key
document.getElementById('user-input').addEventListener('keypress', function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        handleMessage(); // Call the handleMessage function when Enter is pressed
    }
});
