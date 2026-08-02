"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinkKeys, siteConfig } from "@/content/site";
import { CTAButton } from "@/components/shared/CTAButton";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { cn } from "@/lib/utils";

function PhoneLink({ className }: { className?: string }) {
  return (
    <a
      href={`tel:+${siteConfig.phoneDigits}`}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-80",
        className
      )}
      aria-label={siteConfig.phone}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#25D366] text-[#052e16]">
        <Phone className="size-4" strokeWidth={2.25} />
      </span>
      <span className="tabular-nums">{siteConfig.phone}</span>
    </a>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-base)]",
        scrolled || open
          ? "glass border-b border-border py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={t("primary")}
        >
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <CTAButton href="/#contact" className="h-9 px-4">
            {t("hireMe")}
          </CTAButton>
          <PhoneLink />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <a
            href={`tel:+${siteConfig.phoneDigits}`}
            className="inline-flex size-9 items-center justify-center rounded-lg bg-[#25D366] text-[#052e16] transition-opacity hover:opacity-90"
            aria-label={siteConfig.phone}
          >
            <Phone className="size-4" strokeWidth={2.25} />
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="container-page flex flex-col gap-1 border-t border-border py-4 lg:hidden"
          aria-label={t("mobile")}
        >
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 px-1">
            <CTAButton
              href="/#contact"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {t("hireMe")}
            </CTAButton>
            <PhoneLink />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
