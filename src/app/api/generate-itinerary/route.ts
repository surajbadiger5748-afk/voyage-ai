import { NextResponse } from "next/server";

import { generateTripItinerary } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const itinerary = await generateTripItinerary(body);

    return NextResponse.json({
      status: "success",
      data: itinerary,
    });
  } catch (error) {
    console.error("API Route Error:", error);

    return NextResponse.json(
      {
        status: "error",
        error: "Failed to generate itinerary",
      },
      {
        status: 500,
      }
    );
  }
}