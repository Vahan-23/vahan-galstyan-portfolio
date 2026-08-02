# Vahan Galstyan — Portfolio

Personal portfolio of a frontend developer. Dark technical-editorial look, bilingual (EN / RU), built to show real work and make contact easy.

**Repo:** [github.com/Vahan-23/vahan-galstyan-portfolio](https://github.com/Vahan-23/vahan-galstyan-portfolio)

## Features

- Homepage: hero, pricing teaser, projects, about, experience, contact
- Separate `/services` page with full offer list
- EN (default) + RU (`/ru`) via `next-intl` and flag switcher
- Smooth scroll (Lenis), Framer Motion, reduced-motion support
- Contact: Telegram, phone, WhatsApp, Viber, email, LinkedIn, GitHub
- SEO basics: metadata, sitemap, robots

## Live projects shown

| Project | Site |
| --- | --- |
| ARMTRUCK | [armtruck.am](https://armtruck.am) |
| OPNSTAGE | [opnstage.ru](https://www.opnstage.ru/) |
| MIJOCARUM | [mijocarum.am](https://mijocarum.am) |

## Stack

- **Next.js** (App Router) · **TypeScript** · **Tailwind CSS**
- **Framer Motion** · **Lenis** · **shadcn/ui** · **lucide-react**
- **next-intl** · **react-hook-form** · **zod**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project structure

```
app/[locale]/     Localized routes (home, services)
messages/         EN / RU copy (HY kept offline)
components/
  sections/       Page sections
  shared/         Nav, Footer, language switcher
  ui/             shadcn primitives
content/          Links, prices, project meta
i18n/             next-intl routing
hooks/            Lenis, reduced motion
lib/              Utils, motion helpers
public/           Resume PDF, images
```

## Contact form setup

The contact form posts to `/api/contact` and delivers messages (with optional photo/file) to your Telegram via Bot API.

1. Copy env template: `cp .env.example .env.local`
2. Create a bot with [@BotFather](https://t.me/BotFather) → `/newbot`
3. Paste the token into `TELEGRAM_BOT_TOKEN`
4. Open the bot and press **Start**
5. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy your `chat.id` into `TELEGRAM_CHAT_ID`
6. Restart `npm run dev`

On Vercel / hosting, add the same two variables in the project settings.

Allowed attachments: images, PDF, DOC/DOCX, ZIP, TXT — up to 8 MB.

## Contact

- **Telegram:** [@v8333333](https://t.me/v8333333)
- **Phone / WhatsApp / Viber:** +374 43 833830
- **Email:** vahangalstyan833@gmail.com
- **LinkedIn:** [vahan-galstyan-2862b4223](https://www.linkedin.com/in/vahan-galstyan-2862b4223/)
- **GitHub:** [Vahan-23](https://github.com/Vahan-23)

## License

Private portfolio project. All rights reserved unless otherwise noted.
