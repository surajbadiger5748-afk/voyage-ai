import { GoogleGenerativeAI } from "@google/generative-ai";
import { TripRequestType } from "./schemas";
import { generateItineraryPrompt } from "./prompts";
import { TripResponse } from "@/types";
import { getMockItinerary } from "./mock-data";

// Environment setup
const API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Validates the raw JSON payload to ensure it matches
 * the expected TripResponse structure.
 */
export function validateGeminiJson(data: unknown): TripResponse {
  if (!data || typeof data !== "object") {
    throw new Error("Parsed data is not an object.");
  }

  const parsed = data as TripResponse;

  if (!Array.isArray(parsed.dailyPlan) || parsed.dailyPlan.length === 0) {
    throw new Error("Missing or empty 'dailyPlan' array.");
  }

  if (
    !parsed.budgetBreakdown ||
    typeof parsed.budgetBreakdown.accommodation !== "number"
  ) {
    throw new Error("Missing or invalid 'budgetBreakdown'.");
  }

  return parsed;
}

/**
 * Safely parses the text returned by Gemini.
 */
export function parseGeminiResponse(text: string): TripResponse {
  try {
    // Strip markdown formatting if present
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    return validateGeminiJson(parsed);
  } catch (error: unknown) {
    throw new Error(
      `Failed to parse Gemini response: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Executes a single generation attempt with timeout protection.
 */
async function generateWithTimeout(
  prompt: string,
  timeoutMs: number
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Gemini API timeout"));
    }, timeoutMs);

    model
      .generateContent(prompt)
      .then((result) => {
        clearTimeout(timer);
        resolve(result.response.text());
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Core function to generate the trip itinerary
 * with retry logic and graceful fallbacks.
 */
export async function generateTripItinerary(
  request: TripRequestType,
  retries = 2
): Promise<TripResponse> {
  // Fallback if API key missing
  if (!API_KEY) {
    console.warn(
      "GEMINI_API_KEY not found. Using realistic mock fallback."
    );

    return getMockItinerary(
      request.destination,
      request.days
    );
  }

  const prompt = generateItineraryPrompt(request);

  const timeoutMs = 25000;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const responseText = await generateWithTimeout(
        prompt,
        timeoutMs
      );

      return parseGeminiResponse(responseText);
    } catch (error: unknown) {
      console.error(
        `Gemini generation attempt ${attempt} failed:`,
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      if (attempt === retries + 1) {
        console.warn(
          "All generation attempts failed. Falling back to mock data."
        );

        return getMockItinerary(
          request.destination,
          request.days
        );
      }

      // Exponential backoff
      await new Promise((res) =>
        setTimeout(res, 1000 * attempt)
      );
    }
  }

  // Final fallback
  return getMockItinerary(
    request.destination,
    request.days
  );
}