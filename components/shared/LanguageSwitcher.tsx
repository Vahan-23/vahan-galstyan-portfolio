"use client";

import type { ComponentType } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import { FlagEN, FlagRU } from "@/components/shared/FlagIcons";
import { cn } from "@/lib/utils";

const flagByLocale: Record<Locale, ComponentType<{ className?: string }>> = {
  en: FlagEN,
  ru: FlagRU,
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-border bg-surface/60 p-0.5",
        className
      )}
      role="group"
      aria-label={t("language")}
    >
      {locales.map((code) => {
        const Flag = flagByLocale[code];
        return (
          <button
            key={code}
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              locale === code
                ? "bg-background text-foreground ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={localeLabels[code]}
            aria-current={locale === code ? "true" : undefined}
            title={localeLabels[code]}
          >
            <Flag className="size-[1.05rem] shrink-0" />
            <span>{localeLabels[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
