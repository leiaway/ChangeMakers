//import { classifyUserAI, generateHobbyRecommendations } from './geminiRequest.js';
const prompts = [
    "If you could wake up with any skill or talent, what would it be?",
    "If money wasn't a factor, how would you spend your days?",
    "When have you felt the most fulfilled in life?"
];

let currentPromptIndex = 0;
let userResponses = []; // Store responses

window.onload = function() {
    document.getElementById('start-button').addEventListener('click', startPrompts)
};


function startPrompts() {
    // Hide welcome page elements
    document.getElementById('top-div').style.display = 'none';
    document.getElementById('middle-div').style.display = 'none';
    document.getElementById('bottom-div').style.display = 'none';

    // Show chat interface
    document.getElementById('chat-box').style.display = 'block';
    document.getElementById('chat-container').style.display = 'flex';

    console.log('Displaying first prompt');
    displayPrompt();
}
function displayPrompt() {
    if (currentPromptIndex < prompts.length) {
        document.getElementById('prompt-header').textContent = prompts[currentPromptIndex];
        showOpenEndedResponseBox();
    } else {
        // Once all 3 prompts are answered, classify the user
        classifyUser();
    }
}

function showOpenEndedResponseBox() {
    // Show the textarea and send button for open-ended responses
    const inputDiv = document.getElementById('input-div');
    inputDiv.innerHTML = `
        <textarea id="user-input" placeholder="Enter your response here..." rows="4"></textarea>
        <button id="send-button">Send</button>
    `;

    document.getElementById('send-button').addEventListener('click', sendMessage);
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value;

    if (userMessage.trim() === '') return;

    userResponses.push(userMessage);
    inputField.value = '';
    currentPromptIndex++;
    displayPrompt();
}


function classifyUser() {
    // Simple logic to classify user as Category 1 or 2 based on responses
    const category = classifyBasedOnResponses(userResponses);

    if (category === 1) {
        // Show 5 agree/disagree statements for category 1
        showAgreementStatements();
    } else {
        // Go to the next phase directly for category 2
        showPathways();
    }
}

function classifyBasedOnResponses(responses) {
    // Example logic to classify user
    let category = 1;

    // Check responses for the user’s knowledge of their interests
    if (responses.some(response => response.toLowerCase().includes('passion') || response.toLowerCase().includes('interest'))) {
        category = 2;
    }

    return category;
}

function showAgreementStatements() {
    const statements = [
        "I often feel unsure about what I want in life.",
        "I struggle to identify what interests me.",
        "I enjoy trying new things, but don’t know what to focus on.",
        "I feel like I’m always searching for my passion.",
        "I feel uncertain about my future goals."
    ];

    let currentStatementIndex = 0;

    document.getElementById('prompt-header').textContent = statements[currentStatementIndex];

    // Switch to Agree/Disagree buttons
    const inputDiv = document.getElementById('input-div');
    inputDiv.innerHTML = `
        <button id="agree-button" class="response-button">Agree</button>
        <button id="disagree-button" class="response-button">Disagree</button>
    `;

    // Event listeners for "Agree" and "Disagree"
    document.getElementById('agree-button').addEventListener('click', () => handleResponse('Agree'));
    document.getElementById('disagree-button').addEventListener('click', () => handleResponse('Disagree'));

    function handleResponse(response) {
        userResponses.push(response);
        currentStatementIndex++;

        // Check if we have more statements to show or move to next phase
        if (currentStatementIndex < statements.length) {
            document.getElementById('prompt-header').textContent = statements[currentStatementIndex];
        } else {
            // After agreeing/disagreeing to 5 statements, move to the next phase
            showPathways();
        }
    }
}

/*
    document.getElementById('send-button').addEventListener('click', () => {
        const userInput = document.getElementById('user-input').value;
        if (userInput.toLowerCase() === "agree" || userInput.toLowerCase() === "disagree") {
            currentStatementIndex++;
            if (currentStatementIndex < statements.length) {
                document.getElementById('prompt-header').textContent = statements[currentStatementIndex];
            } else {
                // After agreeing/disagreeing to 5 statements, move to the next phase
                showPathways();
            }
        }
    });
}

function showPathways() {
    // Hide the current prompt and show the pathways
    document.getElementById('chat-box').style.display = 'none';

    const pathwaysDiv = document.createElement('div');
    pathwaysDiv.innerHTML = `
        <h2>Choose Your Pathway:</h2>
        <button id="artistic-pathway">Artistic Development</button>
        <button id="career-pathway">Career Development</button>
        <button id="personal-pathway">Personal Development</button>
    `;

    document.body.appendChild(pathwaysDiv);

    // Event listeners for pathway selection
    document.getElementById('artistic-pathway').addEventListener('click', () => showRecommendations('Artistic'));
    document.getElementById('career-pathway').addEventListener('click', () => showRecommendations('Career'));
    document.getElementById('personal-pathway').addEventListener('click', () => showRecommendations('Personal'));
}

async function showRecommendations(pathway) {
    // Get AI-based recommendations
    const recommendations = await generateHobbyRecommendations(pathway, userResponses);

    // Display recommended hobbies
    const recommendationDiv = document.createElement('div');
    recommendationDiv.innerHTML = `
        <h2>Recommended Hobbies for ${pathway} Development:</h2>
        <p>${recommendations}</p>
    `;
    document.body.appendChild(recommendationDiv);
}
function displayMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

    // Display recommended hobbies
    const recommendationDiv = document.createElement('div');
    recommendationDiv.innerHTML = `
        <h2>Recommended Hobbies for ${pathway} Development:</h2>
        <ul>
            ${recommendations.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    document.body.appendChild(recommendationDiv);
*/
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

