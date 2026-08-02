"use client";

import { ArrowUp, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const social = [
    { href: siteConfig.links.telegram, label: "Telegram", icon: Send },
    { href: siteConfig.links.github, label: "GitHub", icon: GitHubIcon },
    { href: siteConfig.links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {year} · {t("role")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {social.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gray-600 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <Link
            href="/#top"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gray-600 hover:text-foreground"
            aria-label={t("backToTop")}
          >
            <ArrowUp className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
