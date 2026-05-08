import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Map, Compass, Wallet } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
          
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              Powered by Gemini 1.5 Pro
            </div>
            
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              Design Your Dream Trip with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                AI Precision
              </span>
            </h1>
            
            <p className="max-w-2xl text-xl text-muted-foreground mb-10">
              Personalized itineraries, smart budget estimation, and curated local experiences—instantly generated for your exact preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full h-14 px-8 text-lg font-medium bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Start Planning Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#how-it-works" className="inline-flex items-center justify-center rounded-full h-14 px-8 text-lg font-medium border border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all">
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* AI Travel Showcase / How it Works */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container mx-auto px-4 md:px-8">
             <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From Idea to Itinerary in Seconds</h2>
              <p className="mt-4 text-lg text-muted-foreground">Three simple steps to your perfect vacation.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border z-0" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-xl flex items-center justify-center text-2xl font-bold text-primary mb-6 ring-1 ring-border">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Tell us your dream</h3>
                <p className="text-muted-foreground">Input your destination, budget, travel style, and interests.</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-xl flex items-center justify-center text-2xl font-bold text-primary mb-6 ring-1 ring-border">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI Magically Plans</h3>
                <p className="text-muted-foreground">Our Gemini AI processes millions of data points to craft the perfect route.</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-xl flex items-center justify-center text-2xl font-bold text-primary mb-6 ring-1 ring-border">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Go</h3>
                <p className="text-muted-foreground">Get a day-by-day plan, budget breakdown, and packing list.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-24 bg-muted/50 border-y border-border/50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Smarter Travel Planning</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need for the perfect trip in one dashboard.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Map className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Day-by-Day Itineraries</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Logically routed daily plans that minimize transit time and maximize exploration. Complete with timing suggestions.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Wallet className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Budget Estimator</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Accurate cost breakdowns for accommodation, food, activities, and transport based on your travel style.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Compass className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Curated Experiences</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hidden gems, local food recommendations, and must-see attractions matched to your specific interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-12">Loved by Travelers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card text-left">
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&quot;VoyageAI saved me weeks of planning. The budget estimates were spot on, and the hidden cafes it recommended in Tokyo were incredible!&quot;</p>
                  <p className="font-semibold">— Sarah T.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
           <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
             <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">Ready to start exploring?</h2>
             <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
               Stop stressing over spreadsheets and endless tabs. Let VoyageAI craft your perfect itinerary in seconds.
             </p>
             <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full h-14 px-10 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-transform hover:scale-105">
                Launch Planner
             </Link>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
