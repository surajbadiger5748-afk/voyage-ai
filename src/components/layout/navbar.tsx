import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Plane } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight text-xl">VoyageAI</span>
        </Link>
        
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:inline-block text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1">
            Planner
          </Link>
          <ThemeToggle />
          <Link href="/dashboard" className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium">
            Start Planning
          </Link>
        </nav>
      </div>
    </header>
  );
}
