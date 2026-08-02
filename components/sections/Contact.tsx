"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Download, Mail, Paperclip, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  ViberIcon,
  WhatsAppIcon,
} from "@/components/shared/SocialIcons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  contactBudgetIds,
  contactGoalIds,
  contactTimelineIds,
  siteConfig,
} from "@/content/site";
import { cn } from "@/lib/utils";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPT =
  ".jpg,.jpeg,.png,.webp,.gif,.pdf,.doc,.docx,.zip,.txt,image/jpeg,image/png,image/webp,image/gif,application/pdf";

type ContactValues = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

type ChoiceChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function ChoiceChip({ label, selected, onClick }: ChoiceChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-lg border px-3 py-2 text-left text-sm transition-colors duration-[var(--duration-fast)]",
        selected
          ? "border-brand/60 bg-brand-muted text-foreground"
          : "border-border bg-background/40 text-muted-foreground hover:border-gray-600 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [choiceError, setChoiceError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contactSchema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    message: z.string().max(4000),
    website: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const clearFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearChoices = () => {
    setGoal(null);
    setBudget(null);
    setTimeline(null);
    setChoiceError(null);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    setFileError(null);

    if (!next) {
      setFile(null);
      return;
    }

    if (next.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError(t("errors.fileTooLarge"));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(next);
  };

  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    setErrorKey(null);
    setChoiceError(null);

    const note = values.message.trim();
    if (!goal && note.length < 10) {
      setChoiceError(t("errors.choiceOrMessage"));
      return;
    }

    const goalLabel = goal ? t(`goals.${goal}` as "goals.website") : "";
    const budgetLabel = budget
      ? t(`budgets.${budget}` as "budgets.under1k")
      : "";
    const timelineLabel = timeline
      ? t(`timelines.${timeline}` as "timelines.asap")
      : "";

    const body = new FormData();
    body.append("name", values.name);
    body.append("email", values.email);
    body.append("message", note);
    body.append("goal", goalLabel);
    body.append("budget", budgetLabel);
    body.append("timeline", timelineLabel);
    body.append("website", values.website ?? "");
    if (file) body.append("attachment", file);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorKey(data?.error ?? "delivery_failed");
        setStatus("error");
        return;
      }

      setStatus("sent");
      reset();
      clearFile();
      clearChoices();
    } catch {
      setErrorKey("delivery_failed");
      setStatus("error");
    }
  };

  const errorMessage = (() => {
    if (status !== "error") return null;
    if (errorKey === "rate_limited") return t("errors.rateLimited");
    if (errorKey === "file_too_large") return t("errors.fileTooLarge");
    if (errorKey === "file_type") return t("errors.fileType");
    if (errorKey === "chat_not_found") return t("errors.chatNotFound");
    if (errorKey === "not_configured") {
      return t("error", { email: siteConfig.email });
    }
    return t("error", { email: siteConfig.email });
  })();

  return (
    <section id="contact" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-[#2AABEE]/45 bg-[#2AABEE]/10 p-6 transition-colors hover:border-[#2AABEE]"
            >
              <p className="flex items-center gap-2 text-sm text-[#7dd3fc]">
                <TelegramIcon className="text-[#2AABEE]" />
                {t("telegram")}
                <span className="text-muted-foreground">· {t("fastest")}</span>
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {siteConfig.links.telegramHandle}
              </p>
            </a>

            <a
              href={`tel:+${siteConfig.phoneDigits}`}
              className="block rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-5 transition-colors hover:border-[#25D366]"
            >
              <p className="flex items-center gap-2 text-sm text-[#86efac]">
                <Phone className="size-4" />
                {t("phone")}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {siteConfig.phone}
              </p>
            </a>

            <div className="grid gap-3 sm:grid-cols-2">
              <CTAButton
                href={siteConfig.links.whatsapp}
                variant="secondary"
                external
                className="justify-start border-[#25D366]/35 hover:border-[#25D366]"
              >
                <WhatsAppIcon className="text-[#25D366]" />
                {t("whatsapp")}
              </CTAButton>
              <CTAButton
                href={siteConfig.links.viber}
                variant="secondary"
                external
                className="justify-start border-[#7360f2]/35 hover:border-[#7360f2]"
              >
                <ViberIcon className="text-[#7360f2]" />
                {t("viber")}
              </CTAButton>
            </div>

            <a
              href={`mailto:${siteConfig.email}`}
              className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gray-600"
            >
              <p className="text-sm text-muted-foreground">{t("email")}</p>
              <p className="mt-2 break-all text-base font-medium text-foreground">
                {siteConfig.email}
              </p>
            </a>

            <ul className="space-y-2.5 rounded-2xl border border-border bg-surface/60 p-5">
              {(["scope", "quality", "reply"] as const).map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>{t(`promises.${key}`)}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-3 sm:grid-cols-3">
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
            <div className="mb-7 border-b border-border pb-6">
              <p className="text-base font-medium text-foreground">
                {t("formTitle")}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t("formLead")}
              </p>
            </div>

            <div className="space-y-7">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
                {...register("website")}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
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
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-foreground">
                  {t("goalLabel")}
                </legend>
                <p className="text-xs text-muted-foreground">{t("goalHint")}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {contactGoalIds.map((id) => (
                    <ChoiceChip
                      key={id}
                      label={t(`goals.${id}`)}
                      selected={goal === id}
                      onClick={() => {
                        setGoal((current) => (current === id ? null : id));
                        setChoiceError(null);
                      }}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-foreground">
                  {t("budgetLabel")}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {t("optional")}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {contactBudgetIds.map((id) => (
                    <ChoiceChip
                      key={id}
                      label={t(`budgets.${id}`)}
                      selected={budget === id}
                      onClick={() =>
                        setBudget((current) => (current === id ? null : id))
                      }
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-foreground">
                  {t("timelineLabel")}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {t("optional")}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {contactTimelineIds.map((id) => (
                    <ChoiceChip
                      key={id}
                      label={t(`timelines.${id}`)}
                      selected={timeline === id}
                      onClick={() =>
                        setTimeline((current) => (current === id ? null : id))
                      }
                    />
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {t("message")}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {t("optional")}
                  </span>
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">
                  {t("attachment")}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {t("optional")}
                  </span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  {t("attachmentHint")}
                </p>
                <input
                  ref={fileInputRef}
                  id="attachment"
                  type="file"
                  accept={ACCEPT}
                  onChange={onFileChange}
                  className="block w-full cursor-pointer rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:border-gray-600"
                />
                {file ? (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <span className="flex min-w-0 items-center gap-2 text-foreground">
                      <Paperclip className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{file.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={t("removeAttachment")}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : null}
                {fileError ? (
                  <p className="text-xs text-destructive">{fileError}</p>
                ) : null}
              </div>

              {choiceError ? (
                <p className="text-xs text-destructive">{choiceError}</p>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Mail className="size-4" />
                {isSubmitting ? t("sending") : t("send")}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t("replyNote")}
              </p>

              {status === "sent" ? (
                <p className="text-sm text-brand">{t("sentNote")}</p>
              ) : null}
              {errorMessage ? (
                <p className="text-sm text-destructive">{errorMessage}</p>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
