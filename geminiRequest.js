// Import the Google Gemini API client
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API with your API Key
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a response based on the user's input
async function generateAIResponse(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Error generating AI response:', error);
        return "Sorry, there was an issue generating a response.";
    }
}

// Function to classify the user into Category 1 or Category 2 based on responses
async function classifyUserAI(responses) {
    // Combine user responses into a prompt for classification
    const prompt = `Classify this user based on their responses to the following questions:
    1. If you could wake up with any skill or talent, what would it be? Response: "${responses[0]}"
    2. If money wasn't a factor, how would you spend your days? Response: "${responses[1]}"
    3. When have you felt the most fulfilled in life? Response: "${responses[2]}"
    Are they someone who knows their interests (Category 2) or someone who is unsure and doesn't know where to start (Category 1)?`;

    // Get classification result from Gemini AI
    const classificationResult = await generateAIResponse(prompt);
    console.log('Classification result:', classificationResult);

    // Based on the response, return the category
    if (classificationResult.toLowerCase().includes('category 1')) {
        return 1; // User is Category 1
    } else if (classificationResult.toLowerCase().includes('category 2')) {
        return 2; // User is Category 2
    } else {
        // Default to Category 1 if unable to classify
        return 1;
    }
}

// Function to generate hobby recommendations based on the user's pathway choice
async function generateHobbyRecommendations(pathway, userResponses) {
    // Create a personalized prompt based on the user’s pathway selection and responses
    const userProfile = `User's responses:
    1. If you could wake up with any skill or talent, what would it be? Response: "${userResponses[0]}"
    2. If money wasn't a factor, how would you spend your days? Response: "${userResponses[1]}"
    3. When have you felt the most fulfilled in life? Response: "${userResponses[2]}"
    `;

    let prompt = "";
    switch (pathway) {
        case "Artistic":
            prompt = `${userProfile} Recommend some hobbies related to artistic development like painting, photography, or music.`;
            break;
        case "Career":
            prompt = `${userProfile} Recommend some hobbies related to career development such as project management, data analysis, or sales.`;
            break;
        case "Personal":
            prompt = `${userProfile} Recommend some hobbies related to personal development like meditation, journaling, or yoga.`;
            break;
        default:
            prompt = `${userProfile} Suggest some hobbies that align with personal interests and passions.`;
            break;
    }

    // Get hobby recommendations from Gemini AI
    const recommendationResult = await generateAIResponse(prompt);
    console.log('Hobby recommendations:', recommendationResult);

    return recommendationResult;
}

// Export functions to be used in the main script
export { classifyUserAI, generateHobbyRecommendations };
