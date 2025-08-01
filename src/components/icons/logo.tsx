import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <rect width="40" height="40" rx="8" fill="hsl(var(--primary))"/>
      <path d="M20 13a2 2 0 100-4 2 2 0 000 4z" fill="hsl(var(--primary-foreground))"/>
      <path d="M13 17c0-1.657 1.343-3 3-3h8c1.657 0 3 1.343 3 3v6a3 3 0 01-3 3h-8a3 3 0 01-3-3v-6z" fill="hsl(var(--primary-foreground))"/>
      <path d="M19 27h2v4h-2v-4z" fill="hsl(var(--primary-foreground))"/>
      <path d="M16 32h8v2h-8v-2z" fill="hsl(var(--primary-foreground))"/>
    </svg>
  );
}
