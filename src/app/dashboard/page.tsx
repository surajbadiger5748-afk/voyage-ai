"use client";

import { useTripStore } from "@/store/tripStore";
import { useItineraryStore } from "@/store/itineraryStore";
import { useUiStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Map as MapIcon,
  Calendar,
  Wallet,
  CheckCircle,
  Lightbulb,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getMockItinerary } from "@/lib/mock-data";
import { TripRequestType } from "@/lib/schemas";

export default function DashboardPage() {
  const { request, updateField } = useTripStore();

  const { itinerary, setItinerary } = useItineraryStore();

  const {
    isGenerating,
    error,
    setIsGenerating,
    setError,
  } = useUiStore();

  const handleGenerate = async () => {
    setIsGenerating(true);

    setError(null);

    setItinerary(null);

    try {
      if (!request.destination) {
        throw new Error("Please enter a destination");
      }

      const payload: TripRequestType = {
        destination: request.destination,

        days: request.days || 3,

        budget: request.budget || "moderate",

        travelStyle: request.travelStyle || "balanced",

        interests: request.interests || [],

        constraints: request.constraints || "",
      };

      const res = await fetch("/api/generate-itinerary", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.status === "error") {
        throw new Error(
          data.error || "Failed to generate itinerary"
        );
      }

      setItinerary(data.data);
    } catch (err: unknown) {
      console.warn(
        "API Error, falling back to mock data:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Using smart mock itinerary due to AI unavailability."
      );

      // FALLBACK EXPERIENCE
      setTimeout(() => {
        setItinerary(
          getMockItinerary(
            request.destination || "Unknown Destination",
            request.days || 3
          )
        );

        setIsGenerating(false);
      }, 1500);

      return;
    }

    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 h-full flex-1 flex flex-col">
      <div className="flex flex-col xl:flex-row gap-8 flex-1">
        {/* Sidebar */}
        <aside className="w-full xl:w-[400px] shrink-0">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              Trip Planner
            </h2>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Destination
                </label>

                <input
                  type="text"
                  value={request.destination || ""}
                  onChange={(e) =>
                    updateField(
                      "destination",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Tokyo, Paris, Bali"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={isGenerating}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Days
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={request.days || 3}
                    onChange={(e) =>
                      updateField(
                        "days",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Budget
                  </label>

                  <select
                    value={request.budget || "moderate"}
                    onChange={(e) =>
                      updateField(
                        "budget",
                        e.target.value as
                          | "budget"
                          | "moderate"
                          | "luxury"
                      )
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={isGenerating}
                  >
                    <option value="budget">Budget</option>

                    <option value="moderate">
                      Moderate
                    </option>

                    <option value="luxury">
                      Luxury
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Travel Style
                </label>

                <select
                  value={request.travelStyle || "balanced"}
                  onChange={(e) =>
                    updateField(
                      "travelStyle",
                      e.target.value as
                        | "relaxed"
                        | "balanced"
                        | "action-packed"
                    )
                  }
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={isGenerating}
                >
                  <option value="relaxed">
                    Relaxed
                  </option>

                  <option value="balanced">
                    Balanced
                  </option>

                  <option value="action-packed">
                    Action-Packed
                  </option>
                </select>
              </div>

              <Button
                className="w-full mt-4 h-12 text-md rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                onClick={handleGenerate}
                disabled={
                  isGenerating || !request.destination
                }
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating AI Trip...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>

              {error && (
                <div className="p-3 mt-4 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 rounded-lg flex items-start gap-2 border border-amber-200 dark:border-amber-900/50">
                  <AlertCircle className="h-5 w-5 shrink-0" />

                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col">
          {!itinerary && !isGenerating && (
            <div className="flex flex-col items-center justify-center flex-1 min-h-[500px] rounded-2xl border border-border bg-card/50 text-center p-8 border-dashed shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapIcon className="h-8 w-8 text-primary opacity-80" />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                No active itinerary
              </h3>

              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Fill out the planner form to generate a
                personalized itinerary.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center flex-1 min-h-[500px] rounded-2xl border border-border bg-card/50 p-8 shadow-sm">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />

              <h3 className="text-2xl font-bold mb-2">
                Crafting your perfect trip...
              </h3>

              <p className="text-muted-foreground">
                Generating personalized recommendations.
              </p>
            </div>
          )}

          {itinerary && !isGenerating && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-border shadow-sm">
                <h1 className="text-3xl font-extrabold mb-4 capitalize">
                  {request.destination} Itinerary
                </h1>

                <p className="text-lg text-foreground/90 leading-relaxed">
                  {itinerary.summary}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}