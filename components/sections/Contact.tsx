"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Mail, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  GitHubIcon,
  LinkedInIcon,
  ViberIcon,
  WhatsAppIcon,
} from "@/components/shared/SocialIcons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const contactSchema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    message: z.string().min(10, t("errors.message")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactValues) => {
    // {{TODO: form handler — wire to Formspree / Resend / API route}}
    try {
      console.info("Contact form submission (handler TODO):", values);
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <a
              href={`tel:+${siteConfig.phoneDigits}`}
              className="block rounded-2xl border border-[#25D366]/50 bg-[#25D366]/15 p-6 transition-colors hover:border-[#25D366]"
            >
              <p className="flex items-center gap-2 text-sm text-[#86efac]">
                <Phone className="size-4" />
                {t("phone")}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {siteConfig.phone}
              </p>
            </a>

            <div className="grid gap-3 sm:grid-cols-2">
              <CTAButton
                href={siteConfig.links.whatsapp}
                variant="secondary"
                external
                className="justify-start border-[#25D366]/40 hover:border-[#25D366]"
              >
                <WhatsAppIcon className="text-[#25D366]" />
                {t("whatsapp")}
              </CTAButton>
              <CTAButton
                href={siteConfig.links.viber}
                variant="secondary"
                external
                className="justify-start border-[#7360f2]/40 hover:border-[#7360f2]"
              >
                <ViberIcon className="text-[#7360f2]" />
                {t("viber")}
              </CTAButton>
            </div>

            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-brand/40 bg-brand-muted p-6 transition-colors hover:border-brand"
            >
              <p className="text-sm text-muted-foreground">{t("telegram")}</p>
              <p className="mt-2 text-xl font-medium text-foreground md:text-2xl">
                {siteConfig.links.telegramHandle}
              </p>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-gray-600"
            >
              <p className="text-sm text-muted-foreground">{t("email")}</p>
              <p className="mt-2 break-all text-lg font-medium text-foreground">
                {siteConfig.email}
              </p>
            </a>

            <div className="grid gap-3 sm:grid-cols-2">
              <CTAButton
                href={siteConfig.links.telegram}
                variant="secondary"
                external
                className="justify-start"
              >
                <Send className="size-4" />
                {t("telegram")}
              </CTAButton>
              <CTAButton
                href={siteConfig.links.linkedin}
                variant="secondary"
                external
                className="justify-start"
              >
                <LinkedInIcon />
                {t("linkedin")}
              </CTAButton>
              <CTAButton
                href={siteConfig.links.github}
                variant="secondary"
                external
                className="justify-start"
              >
                <GitHubIcon />
                {t("github")}
              </CTAButton>
              <CTAButton
                href={siteConfig.resumePath}
                variant="secondary"
                download
                className="justify-start"
              >
                <Download className="size-4" />
                {t("resume")}
              </CTAButton>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            noValidate
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  placeholder={t("namePlaceholder")}
                  autoComplete="name"
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Mail className="size-4" />
                {isSubmitting ? t("sending") : t("send")}
              </Button>

              {status === "sent" ? (
                <p className="text-sm text-brand">{t("sentNote")}</p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-destructive">
                  {t("error", { email: siteConfig.email })}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
