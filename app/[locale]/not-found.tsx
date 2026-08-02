import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center pt-28">
      <Container>
        <p className="text-sm font-medium tracking-[0.14em] text-brand uppercase">
          {t("code")}
        </p>
        <h1 className="text-h1 mt-4 text-foreground">{t("title")}</h1>
        <p className="mt-4 max-w-md text-muted-foreground">{t("description")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/">{t("home")}</CTAButton>
          <CTAButton href="/#projects" variant="secondary">
            {t("projects")}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
