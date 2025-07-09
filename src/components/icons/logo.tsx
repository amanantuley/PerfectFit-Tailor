import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-7 w-7", className)}
    >
      <path d="M12 2v2.3a4.5 4.5 0 0 1-4.2 4.5H3" />
      <path d="M12 22v-2.3a4.5 4.5 0 0 0-4.2-4.5H3" />
      <path d="M21 8.8V3" />
      <path d="M12 12v0" />
      <path d="M12 2l7.1 5.9" />
      <path d="M12 22l7.1-5.9" />
    </svg>
  );
}
