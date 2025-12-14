import { GoogleGenAI } from "@google/genai";
import { SERVICES, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL, COMPANY_INSTAGRAM } from "../constants";

// Construct a rich context string so the AI knows everything about the business
const SYSTEM_INSTRUCTION = `
You are SmithAI, the intelligent virtual studio manager for ${COMPANY_NAME}, a premium photography and videography studio based in Davanagere, Karnataka, India.
Your mission is to provide accurate, helpful, and artistic assistance to potential clients.

--- STUDIO PROFILE ---
Name: ${COMPANY_NAME}
Location: ${COMPANY_ADDRESS}
Phone: ${COMPANY_PHONE}
Email: ${COMPANY_EMAIL}
Instagram: ${COMPANY_INSTAGRAM}
Philosophy: "We don't just take photographs, we capture feelings."
Stats: 500+ Projects, 15+ Expert Team Members, 100% Premium Quality.

--- SERVICES & PRICING (INR) ---
${SERVICES.map(s => `
- ${s.name}: ₹${s.price.toLocaleString('en-IN')}
  Description: ${s.description}
  Includes: ${s.features.join(', ')}
`).join('')}

--- KEY POLICIES & FAQ ---
1. Booking Process: Clients can book directly via the website page (/book). A non-refundable deposit is typically required to secure the date.
2. Cancellations: We offer a full refund if cancelled 48 hours in advance. Late cancellations (less than 48h) are subject to a 20% fee.
3. Travel: We are available for destination weddings worldwide. Travel fees apply based on location.
4. Turnaround Time: 
   - Portraits: 1-2 weeks.
   - Weddings/Large Events: 4-6 weeks for full editing.
5. Editing: Professional retouching is standard and included in all packages.
6. Equipment: We use state-of-the-art high-resolution cameras and drone technology.

--- RESPONSE GUIDELINES ---
- Tone: Professional, warm, creative, and concise (keep answers under 80 words unless detailed info is requested).
- Booking: If a user indicates intent to book, strictly guide them to the link: /book
- Contact: If asked for direct contact, provide the phone number or email.
- Formatting: Use bullet points for lists to improve readability.
`;

export const askSmithAI = async (query: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm sorry, I couldn't capture that thought perfectly. Please try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my creative brain. Please try again later.";
  }
};

interface VideoGenerationResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const generateTestimonialVideo = async (
  prompt: string, 
  imageBase64?: string, 
  imageMimeType?: string,
  onProgress?: (status: string) => void
): Promise<VideoGenerationResult> => {
  // 1. Ensure API Key is selected (Veo requirement)
  const win = window as any;
  
  onProgress?.("Verifying API access...");
  
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      try {
        await win.aistudio.openSelectKey();
        // Double check if key was actually selected
        if (!(await win.aistudio.hasSelectedApiKey())) {
           return { success: false, error: "API Key selection was cancelled." };
        }
      } catch (e) {
        console.error("User cancelled key selection", e);
        return { success: false, error: "API Key selection was cancelled." };
      }
    }
  }

  // 2. Create new instance with the potentially newly selected key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    let operation;
    
    // Construct the prompt to ensure it generates a testimonial style video
    const enhancedPrompt = `Cinematic shot of a happy client. The mood is positive and grateful. Context: ${prompt}`;
    
    onProgress?.("Analyzing prompt & assets...");

    if (imageBase64 && imageMimeType) {
      // Generate with Image Reference
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: enhancedPrompt,
        image: {
          imageBytes: imageBase64,
          mimeType: imageMimeType
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });
    } else {
      // Generate Text-to-Video only
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: enhancedPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });
    }

    onProgress?.("Scene direction initiated...");

    // 3. Poll for completion
    while (!operation.done) {
      onProgress?.("Rendering video frames...");
      // Wait 5 seconds between checks
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    onProgress?.("Finalizing & downloading...");

    // 4. Extract Video URI
    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      return { success: false, error: "Generation completed but no video URI was returned." };
    }

    // 5. Fetch the actual video bytes using the URI + Key
    const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch video bytes: ${response.statusText}`);
    }
    const blob = await response.blob();
    
    // 6. Return a blob URL for the frontend to play
    return { success: true, url: URL.createObjectURL(blob) };

  } catch (error: any) {
    console.error("Video Generation Failed:", error);
    
    let userMessage = "Failed to generate video. Please try again.";
    
    // Handle specific error cases
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes("Requested entity was not found")) {
       userMessage = "Access denied. Please ensure you selected a paid project in the API key dialog.";
       if (win.aistudio) {
           setTimeout(() => win.aistudio.openSelectKey(), 1000);
       }
    } else if (errorMessage.includes("429") || errorMessage.includes("Resource exhausted")) {
       userMessage = "System is busy (Quota Limit). Please wait a moment and try again.";
    } else if (errorMessage.includes("SAFETY") || errorMessage.includes("blocked")) {
       userMessage = "The content was flagged by safety filters. Please adjust your text or image.";
    }

    return { success: false, error: userMessage };
  }
};
