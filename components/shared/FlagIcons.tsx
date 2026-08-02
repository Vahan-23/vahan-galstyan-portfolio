import { cn } from "@/lib/utils";

type FlagProps = {
  className?: string;
};

/** SVG flags — emoji flags often don't render on Windows */
export function FlagEN({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("size-4 rounded-[2px] shadow-sm", className)}
      aria-hidden
    >
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagRU({ className }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("size-4 rounded-[2px] shadow-sm", className)}
      aria-hidden
    >
      <rect width="60" height="40" fill="#fff" />
      <rect y="13.33" width="60" height="13.34" fill="#0039A6" />
      <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
    </svg>
  );
}
