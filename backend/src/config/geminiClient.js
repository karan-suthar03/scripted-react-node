import {GoogleGenAI, Type} from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyCb5DEh6coUJco_TAy1uLOWFzSdC6309Pg",
});

async function generatePaths(story, storyTitle, responseSize) {
    const systemInstructions = `
You are an AI that processes unfinished stories and suggests possible continuations.

You will be given:
- An unfinished story.
- The title of the story: "${storyTitle}"
- A desired word count per response: approximately ${responseSize} words.

Your task is to generate exactly 4 distinct narrative paths that logically continue the unfinished story.

Important rules for your writing:
- Start writing **exactly from the point where the story ends**, continuing the narrative seamlessly.
- **Do not repeat, paraphrase, or include any part of the input story** in your response, including the last words or earlier context.
- Continue as if writing the next words in the same sentence or thought, maintaining the flow.
- Maintain the tense, tone, and perspective of the original story.
- Write **new developments**, not conclusions. Leave room for the story to continue further.
- **It is acceptable to leave the sentence intentionally cut off, unfinished, or suggest suspense (e.g., "He turned the corner and—").**
- Avoid wrapping up the story or summarizing events.
- Do not skip ahead in time. Continue the flow of the last sentence naturally.
- For example, if the story ends with "ek baar ek dur sheher me kaka rehte the," do not include those words or any prior context in your response. Start directly with what happens next.

Formatting rules:
- Return exactly **4 narrative paths**.
- Each path must be returned as a JSON object in an array.
- Each JSON object must have a key named **"path"** whose value is a string containing the narrative continuation.

Do not speak to the user directly. Return only the JSON array exactly as specified.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: [
            { role: "user", parts: [{ text: story }] }
        ],
        config: {
            systemInstruction: systemInstructions,
            responseMimeType: 'application/json',
            responseJsonSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        path: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    });

    return JSON.parse(response.text);
}

export {
    generatePaths
}