import Link from "next/link";
import { Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">VoyageAI</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js 15, Gemini API & Google Maps.
        </p>
        <div className="flex gap-4 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Terms</Link>
          <Link href="#" className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
