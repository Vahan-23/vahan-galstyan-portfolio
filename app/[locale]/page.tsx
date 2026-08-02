import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PricingTeaser />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
