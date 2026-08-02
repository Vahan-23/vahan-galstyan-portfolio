import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { LenisProvider } from "@/components/shared/LenisProvider";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { siteConfig } from "@/content/site";
import { locales, routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const pathLocale = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: [
      "Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Vahan Galstyan",
      "Yerevan",
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      url: `${siteConfig.url}${pathLocale}`,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteConfig.url}${pathLocale}`,
      languages: {
        en: siteConfig.url,
        ru: `${siteConfig.url}/ru`,
        "x-default": siteConfig.url,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: "Frontend Developer",
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Yerevan",
          addressCountry: "AM",
        },
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          siteConfig.links.telegram,
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Frontend Development",
          "REST APIs",
        ],
      },
      {
        "@type": "WebSite",
        name: `${siteConfig.name} Portfolio`,
        url: siteConfig.url,
        description: t("description"),
        inLanguage: locale,
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    ],
  };

  return (
    <html
      lang={locale as Locale}
      className={`dark ${geistSans.variable} ${geistMono.variable} ${notoSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <ScrollProgress />
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
