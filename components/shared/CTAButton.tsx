import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-brand text-brand-foreground hover:bg-brand/90 shadow-[var(--shadow-glow)]",
  secondary:
    "border border-border bg-transparent text-foreground hover:bg-surface-elevated hover:border-gray-600",
  ghost: "text-muted-foreground hover:text-foreground",
} as const;

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
  onClick,
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors duration-[var(--duration-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    className
  );

  const isProtocolLink =
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("viber:");

  if (external || download || isProtocolLink) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external && !isProtocolLink
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
