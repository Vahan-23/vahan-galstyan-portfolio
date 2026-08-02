# Cursor Build Prompt — Vahan Galstyan Portfolio

> Paste this whole file into Cursor as your project brief. Then follow the **PHASES** — do NOT ask Cursor to build everything in one shot. Build phase by phase and review between each. This is the single biggest lever on final quality.

---

## 0. ROLE & GOAL

You are a senior frontend engineer and a senior product/visual designer working together on one deliverable.

Goal: a **personal portfolio for a Frontend Developer whose primary objective is to get hired for a full-time or contract frontend role.** A recruiter or engineering lead should, within ~30 seconds, understand: who this is, what they build, that they're credible, and how to contact them.

This is a real person's site, not a template demo. Optimize for **trust and clarity**, not maximalism. A restrained, precise, fast site reads as more senior than a heavy, effect-stuffed one.

**Non-negotiable honesty rules (read carefully):**
- Do NOT invent metrics, results, client names, or testimonials. Where real data is missing, insert a clearly marked `{{TODO: ...}}` placeholder and list every one at the end so the owner can fill it in. Never fabricate to fill a gap.
- Do NOT inflate seniority in copy. The real career path is: Freelance Frontend Developer → Frontend Developer Intern (Hadros) → Systems Engineer (Tinkoff) → System Administrator (InRetail). Present this as an honest, upward frontend trajectory backed by real infrastructure/deployment experience. No "senior 10x" language.
- No fake testimonials. Build the testimonials section only as an empty, clearly-placeholder structure the owner fills with real quotes — or omit it entirely if none exist.

---

## 1. ART DIRECTION (ONE coherent concept — do not blend six references)

Direction: **"Technical editorial."** Think Linear/Vercel restraint — dark, precise, typographic, engineered-feeling. NOT playful, NOT gradient-heavy, NOT glassmorphism everywhere.

- **Theme:** dark only. Near-black background (`#0A0A0B`-ish), not pure `#000`. One elevated surface tone for cards.
- **Accent:** exactly ONE accent color, used sparingly (links, focus rings, one hero highlight, CTA). Everything else is grayscale. Pick a cold, technical accent (electric blue or a restrained violet). No rainbow gradients.
- **Typography:** large, confident. A strong geometric/grotesque display for headings (e.g. Geist, Inter Tight, or Satoshi via next/font — self-hosted, no layout shift). Generous type scale; headings can be huge. Body stays highly legible.
- **Glass/blur:** allowed in ONE or two moments (sticky nav, maybe a card overlay) — not as a global aesthetic.
- **Motion philosophy:** motion clarifies hierarchy and rewards scrolling; it never blocks reading. Entrance animations are subtle (opacity + small translate, staggered). Everything respects `prefers-reduced-motion` and disables non-essential motion when set.
- **Spacing:** lots of it. Whitespace (blackspace) is the premium signal.

Define this as a real design-token system in Phase 1, then reuse tokens everywhere. No hardcoded hex values in components.

---

## 2. TECH STACK & PERFORMANCE GUARDRAILS

Use: **Next.js (latest, App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Lenis (smooth scroll) · shadcn/ui · lucide-react.**

- **GSAP:** only if a specific effect genuinely can't be done cleanly with Framer Motion. Justify before adding. Prefer Framer Motion.
- **Three.js:** default to NOT using it. Only introduce a 3D/canvas element if it earns its place, and if so it MUST be dynamically imported, lazy-loaded, paused offscreen, disabled under `prefers-reduced-motion`, and never block LCP. If in doubt, skip it — a fast site beats a 3D gimmick.
- Target **Lighthouse 95+** on mobile. This constrains the above: lazy-load heavy libs, ship minimal JS on first paint, use `next/image`, self-host fonts with `next/font`, avoid layout shift.
- Lenis must integrate cleanly with Framer Motion scroll and must not break anchor links, focus, or keyboard scrolling.

---

## 3. ARCHITECTURE

Clean, conventional App Router structure:

```
/app                     # routes: /, /services, custom not-found, loading, metadata
/components
  /ui                    # shadcn primitives
  /sections              # Hero, About, Skills, Projects, Experience, Process, FAQ, Contact
  /shared                # Nav, Footer, CTAButton, SectionHeading, ScrollProgress, etc.
/lib                     # utils, motion variants, constants
/content                 # typed data: projects.ts, experience.ts, skills.ts, services.ts, faq.ts
/hooks                   # useLenis, useReducedMotion, etc.
/public                  # images, favicon, og
```

- All page content lives in **typed data files in `/content`**, rendered by generic components. This is what makes it maintainable and reads as senior code.
- Shared motion variants in `/lib/motion.ts` — no copy-pasted animation configs.
- Strict TypeScript, no `any`. Meaningful component and prop names. Accessible by default (semantic landmarks, focus states, aria where needed, keyboard-navigable).

---

## 4. BUILD IN PHASES (do these in order, stop for review between each)

**PHASE 1 — Foundation.** Scaffold the Next.js app, Tailwind config with the full design-token system (colors, type scale, spacing, radii, shadows, motion durations/easings), font setup, Lenis provider, `useReducedMotion` hook, base layout, and shared primitives (SectionHeading, CTAButton, Container). No sections yet. Show me the tokens and one styled button/heading to approve the visual language.

**PHASE 2 — Hero.** Build the landing section to a finished standard. Huge headline, role, one-line value prop, three CTAs (`View Projects`, `Download Resume`, `Contact`). A subtle, cheap-to-render animated background (e.g. a faint grid/noise/aurora done in CSS or lightweight canvas — NOT a heavy 3D scene by default). Refined entrance animation. Subtle mouse-parallax on one element only. Stop and let me review before continuing.

**PHASE 3 — Core sections, one at a time:** About → Skills → Projects → Experience → Process → FAQ → Contact. Build, then pause after each for review.

**PHASE 4 — Services page** (`/services`), separate route.

**PHASE 5 — Shell & polish:** sticky nav with scroll-progress bar, footer, custom 404, loading states, page-transition treatment, SEO/meta/OG/sitemap/robots/structured data, favicon.

**PHASE 6 — Audit:** run through accessibility, `prefers-reduced-motion`, responsive breakpoints (mobile/tablet/desktop), and a Lighthouse-oriented pass. Report the `{{TODO}}` list.

---

## 5. SECTION CONTENT (real content — placeholders only where noted)

**Nav:** logo/name, anchor links, one primary CTA. Sticky, condenses on scroll, mobile drawer.

**Hero:**
- `VAHAN GALSTYAN`
- `Frontend Developer`
- Sub: *Building fast, accessible web applications with React, Next.js, and TypeScript — from UI architecture to production deployment.*
- CTAs: View Projects · Download Resume · Contact

**About:** first-person, honest, ~2 short paragraphs. Cover: frontend developer with commercial + freelance experience shipping production apps; core stack React / Next.js / TypeScript; comfortable with REST APIs, authentication, responsive design, reusable component systems, clean architecture; a real strength is an infrastructure/sysadmin background (Tinkoff, InRetail) meaning you understand deployment and how things run in production, not just the UI layer. Close on enjoying hard UI problems. No buzzword salad.

**Skills:** animated cards grouped as: *Languages* (JavaScript, TypeScript, HTML, CSS, Python) · *Frontend* (React, Next.js, React Hooks, Responsive Design, Bootstrap) · *Backend* (Node.js, REST APIs, PostgreSQL) · *Tools* (Git, GitHub, JIRA, Agile, Scrum, Unity). Keep cards understated — don't add fake percentage bars (they read as junior).

**Projects** — premium cards, each with image, tech stack, description, key features, your responsibilities, and result. `Live Demo` / `GitHub` / `Read More` buttons. **Leave live URLs, repo links, real screenshots, and measurable results as `{{TODO}}`.**
1. **Mijocarum.am** — event platform. Authentication, guest management, RSVP flow, interactive seating plan, fully responsive, multi-language, reusable component library. `{{TODO: live URL, repo, result metric}}`
2. **Armenian Truck Service** — Next.js corporate site. SEO-optimized, responsive, multi-language, contact forms, Google Maps integration. `{{TODO: live URL, repo}}`
3. **Statue Collector** — Unity mobile app (Android/iOS) with interactive 3D models and an experiential collection mechanic. `{{TODO: store links / demo}}`

**Experience** — vertical timeline, honest, no inflation:
- Freelance — Frontend Developer: React, Next.js, REST API integration, client communication, deployment.
- Hadros — Frontend Developer Intern: authentication, routing, TypeScript client work, Git workflow.
- Tinkoff — Systems Engineer: Ubuntu, servers, infrastructure.
- InRetail — System Administrator: networking, virtualization.
`{{TODO: dates for each role}}`

**Process:** 6 steps — Discovery, Design, Development, Testing, Deployment, Support. Short, concrete one-liners each.

**Testimonials:** build the layout but leave it as a clearly-marked empty placeholder the owner fills with real quotes. Do NOT generate fake ones. If left empty at launch, hide the section.

**FAQ:** accordion (shadcn). Real, useful answers to: redesign an existing site? build from Figma? integrate APIs? optimize performance? support/maintain existing projects? Answer honestly and concisely — yes, with a sentence on how.

**Contact:** large, high-conversion. Email, LinkedIn, GitHub, Telegram, Resume download, and a working contact form (validated with react-hook-form + zod; wire to a form endpoint or leave a clearly-marked `{{TODO: form handler}}`). Make the email and CTAs impossible to miss. `{{TODO: real links + email}}`

**Footer:** minimal — name, social icons, copyright, back-to-top.

**Services page (`/services`, separate route):** framed as freelance/contract offerings so it doesn't undercut the hiring narrative on the homepage. Clean pricing cards. Keep it scannable — consider grouping (Websites / Apps & Systems / Hourly) rather than 18 flat cards.
- Landing $300 · Business Website $700 · Corporate $1200 · Portfolio $500
- Dashboard $1500 · Admin Panel $1500 · Booking System $2500 · Restaurant Management $3000 · Custom CRM $4000 · Full SaaS $6000 · E-commerce $3500
- API Integration $500 · Website Optimization $400
- Hourly: Bug Fixing $50/hr · Frontend Consulting $70/hr · Code Review $60/hr · React Dev $60/hr · Next.js Dev $70/hr

**"Why hire me"** (can live on home or services): concise animated cards — fast communication, clean code, pixel-perfect, responsive, SEO-friendly, scalable, reusable components, attention to detail, problem solver. Short, no fluff.

---

## 6. EXTRAS / TECHNICAL

Favicon, OG image, full SEO metadata (App Router `metadata` API), `robots.txt`, `sitemap.xml`, JSON-LD structured data (Person + WebSite), custom 404, loading states, tasteful page transitions, micro-interactions on interactive elements, responsive `next/image`, self-hosted optimized fonts, code splitting + lazy loading for anything heavy, accessible throughout, scroll progress bar, dark mode only.

---

## 7. WHEN YOU'RE MISSING SOMETHING

If real data is needed and absent, do NOT invent it. Insert `{{TODO: ...}}`, keep building, and give me a consolidated checklist of every placeholder at the end. Ask me before making assumptions that affect structure or copy.
