import { z } from "zod";

// --- Reusable Validators ---

export const destinationValidator = z
  .string()
  .min(2, "Destination must be at least 2 characters")
  .max(100, "Destination is too long");

export const daysValidator = z
  .number()
  .int("Days must be an integer")
  .min(1, "Minimum 1 day")
  .max(30, "Maximum 30 days allowed");

export const budgetValidator = z.enum([
  "budget",
  "moderate",
  "luxury",
]);

export const travelStyleValidator = z.enum([
  "relaxed",
  "balanced",
  "action-packed",
]);

// --- Main Schema ---

export const tripRequestSchema = z
  .object({
    destination: destinationValidator,

    days: daysValidator,

    budget: budgetValidator,

    travelStyle: travelStyleValidator,

    interests: z
      .array(z.string())
      .max(10, "Maximum 10 interests allowed")
      .default([]),

    constraints: z
      .string()
      .max(500, "Constraints must be under 500 characters")
      .optional(),
  })
  .strict();

export type TripRequestType = z.infer<typeof tripRequestSchema>;

// --- Helper Validation Utilities ---

export interface ValidationErrorResponse {
  field: string;
  message: string;
}

/**
 * Standardized validation error formatting from Zod errors.
 */
export function formatValidationErrors(
  error: z.ZodError
): ValidationErrorResponse[] {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

/**
 * Validates payload size (e.g. for API protection).
 * @param payload The raw stringified payload
 * @param maxSizeKb Maximum allowed size in KB
 */
export function validatePayloadSize(
  payload: string,
  maxSizeKb: number = 10
): boolean {
  const bytes = new Blob([payload]).size;
  const sizeKb = bytes / 1024;

  return sizeKb <= maxSizeKb;
}