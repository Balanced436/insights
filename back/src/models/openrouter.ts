export const OR_DEFAULT_MODEL =  "google/gemini-2.0-flash-001"
export const OR_DEFAULT_SUMMARIZATION_PROMPT = "Résume ce texte:"
export const OR_COMPLETION_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"

export interface OpenRouterResponse { 
    choices: Array<{ 
        message: { 
            role: string; 
            content: string; 
        }; 
    }>; 
}