/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <main className="container mx-auto px-4 py-8 md:px-8 h-full flex flex-col">
      <div className="flex flex-col xl:flex-row gap-8 flex-1">

        {/* SIDEBAR */}
        <aside className="w-full xl:w-[380px] shrink-0">
          <div className="sticky top-24 rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              Trip Planner
            </h2>

            <div className="space-y-5">

              {/* Destination */}
              <div className="space-y-2">
                <label
                  htmlFor="destination"
                  className="text-sm font-medium"
                >
                  Destination
                </label>

                <input
                  id="destination"
                  aria-label="Destination"
                  type="text"
                  value={request.destination || ""}
                  onChange={(e) =>
                    updateField(
                      "destination",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Tokyo, Paris, Bali"
                  className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={isGenerating}
                />
              </div>

              {/* Days + Budget */}
              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <label
                    htmlFor="days"
                    className="text-sm font-medium"
                  >
                    Days
                  </label>

                  <input
                    id="days"
                    aria-label="Trip duration in days"
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
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="budget"
                    className="text-sm font-medium"
                  >
                    Budget
                  </label>

                  <select
                    id="budget"
                    aria-label="Budget selection"
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
                    className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm"
                    disabled={isGenerating}
                  >
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <label
                  htmlFor="travelStyle"
                  className="text-sm font-medium"
                >
                  Travel Style
                </label>

                <select
                  id="travelStyle"
                  aria-label="Travel style"
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
                  className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm"
                  disabled={isGenerating}
                >
                  <option value="relaxed">
                    Relaxed
                  </option>

                  <option value="balanced">
                    Balanced
                  </option>

                  <option value="action-packed">
                    Action Packed
                  </option>
                </select>
              </div>

              {/* Button */}
              <Button
                aria-label="Generate AI itinerary"
                className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg"
                onClick={handleGenerate}
                disabled={
                  isGenerating || !request.destination
                }
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/40 p-4 text-sm flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />

                  <p>{error}</p>
                </div>
              )}

            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="flex-1">

          {/* EMPTY STATE */}
          {!itinerary && !isGenerating && (
            <div className="flex flex-col items-center justify-center min-h-[600px] rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">

              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MapIcon className="h-10 w-10 text-primary" />
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Plan Your Dream Journey
              </h2>

              <p className="max-w-lg text-muted-foreground text-lg">
                Enter your travel preferences and let AI craft
                a personalized travel experience.
              </p>
            </div>
          )}

          {/* LOADING */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center min-h-[600px] rounded-3xl border border-border bg-card/50">

              <Loader2 className="h-14 w-14 animate-spin text-primary mb-5" />

              <h2 className="text-3xl font-bold mb-3">
                Crafting Your Adventure
              </h2>

              <p className="text-muted-foreground">
                AI is building your personalized itinerary...
              </p>
            </div>
          )}

          {/* ITINERARY */}
          {itinerary && !isGenerating && (
            <div className="space-y-8">

              {/* HERO */}
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-background to-secondary/15 p-8 shadow-xl">

                <div className="relative z-10">

                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
                    ✈️ AI Generated Itinerary
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black mb-4 capitalize">
                    {request.destination}
                  </h1>

                  <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    {itinerary.summary}
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div className="grid md:grid-cols-3 gap-5">

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Duration</p>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {request.days} Days
                  </h3>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="h-5 w-5 text-secondary" />
                    <p className="font-semibold">Budget</p>
                  </div>

                  <h3 className="text-3xl font-bold capitalize">
                    {request.budget}
                  </h3>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Compass className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Travel Style</p>
                  </div>

                  <h3 className="text-3xl font-bold capitalize">
                    {request.travelStyle}
                  </h3>
                </div>

              </div>

              {/* TIMELINE */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

                <div className="flex items-center gap-3 mb-8">
                  <MapIcon className="h-6 w-6 text-primary" />

                  <h2 className="text-2xl font-bold">
                    Day-by-Day Journey
                  </h2>
                </div>

                <div className="space-y-6">

                  {(itinerary.dailyPlan || []).map(
                    (day: any, index: number) => (
                      <div
                        key={index}
                        className="relative rounded-2xl border border-border bg-background/60 p-6 hover:shadow-lg transition-all"
                      >
                        <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-primary to-secondary" />

                        <div className="pl-5">

                          <div className="mb-5">
                            <p className="text-sm font-medium text-primary mb-1">
                              Day {day.day || index + 1}
                            </p>

                            <h3 className="text-2xl font-bold">
                              {day.title || `Adventure ${index + 1}`}
                            </h3>
                          </div>

                          <div className="space-y-4">

                            {(day.activities || []).map(
                              (
                                activity: any,
                                activityIndex: number
                              ) => (
                                <div
                                  key={activityIndex}
                                  className="flex items-start gap-4 rounded-xl border border-border bg-card px-4 py-4"
                                >
                                  <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  </div>

                                  <div className="space-y-2 flex-1">

                                    <div className="flex items-center gap-2 flex-wrap">

                                      {activity?.time && (
                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                          {activity.time}
                                        </span>
                                      )}

                                      <p className="font-semibold">
                                        {activity?.title || "Activity"}
                                      </p>

                                    </div>

                                    {activity?.description && (
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {activity.description}
                                      </p>
                                    )}

                                    {activity?.location && (
                                      <p className="text-xs text-primary">
                                        📍 {activity.location}
                                      </p>
                                    )}

                                  </div>
                                </div>
                              )
                            )}

                          </div>
                        </div>
                      </div>
                    )
                  )}

                </div>
              </div>

              {/* GOOGLE MAP */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-primary" />

                  <h2 className="text-2xl font-bold">
                    Explore Destination
                  </h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border">

                  <iframe
                    title="destination-map"
                    aria-label="Destination map"
                    className="w-full h-[380px]"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      request.destination
                    )}&output=embed`}
                  />

                </div>
              </div>

              {/* TIPS */}
              <div className="rounded-3xl border border-border bg-gradient-to-br from-secondary/10 to-primary/10 p-8 shadow-sm">

                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    Smart Travel Tips
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  {[
                    "Book attractions early for better pricing.",
                    "Carry a portable charger during exploration.",
                    "Use local transportation passes to save money.",
                    "Try authentic local food experiences.",
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-background/70 p-5"
                    >
                      <div className="flex gap-3 items-start">
                        <MapPin className="h-5 w-5 text-primary mt-1" />

                        <p className="text-sm leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          )}

        </section>
      </div>
    </main>
  );
}