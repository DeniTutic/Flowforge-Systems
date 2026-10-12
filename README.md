# Flowforge Systems - Premium SaaS Agency Website

A premium, modern agency website built with Next.js, TypeScript, and Tailwind CSS. Designed to position Flowforge Systems as a high-end digital agency that builds systems, not just websites.

## 🚀 Features

- **Premium Design**: Clean, modern SaaS-style design inspired by Stripe, Vercel, and Linear
- **Value-Focused Copy**: Every section emphasizes results and growth, not features
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle hover effects and transitions throughout
- **High-Converting**: Strategic CTAs and clear value propositions
- **Productized Services**: Clear service packages designed for different growth stages

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans (self-hosted via `next/font`)
- **Node.js**: v24.x (matches the Vercel runtime; set in `engines`)

## 📦 Getting Started

### Prerequisites
- Node.js 24.x (the version Vercel builds with)
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm run start
```

### Available Scripts

- `npm run dev` - Start development server (hot reload enabled)
- `npm run build` - Create optimized production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality


## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── Portfolio.tsx       # Selected work (#work)
│   ├── Solution.tsx        # Problem → solution + process stepper (#process)
│   ├── Problem.tsx         # Compact problem strip (used inside Solution)
│   ├── Services.tsx        # Services grid
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Pricing.tsx         # Pricing tiers
│   ├── ProjectEstimator.tsx# AI-assisted ballpark estimate
│   ├── FAQ.tsx             # Accordion
│   ├── FinalCTA.tsx        # Closing CTA band
│   ├── Contact.tsx         # Contact form + "what happens next"
│   ├── Reveal.tsx          # Scroll-in wrapper
│   └── Footer.tsx          # Footer
└── ...
```

## 🎨 Design System

Tokens live in `tailwind.config.ts`; global rules and the `.btn-*` / `.card` / `.section-*` classes in `app/globals.css`.

### Colors ("forge" palette — one accent)
- **Ember (primary)**: `#C2410C` — buttons, links, icons. Passes WCAG AA on paper/white.
- **Ember bright**: `#EA580C` — glows, gradients, hover surfaces only (not body text).
- **Ink**: `#0B0F14` — text on light, canvas on dark.
- **Paper**: `#F7F6F3` — light canvas; cards are `#FFFFFF`.
- **Steel**: `#6B7280` / `#9AA3B2` — secondary text (light / dark).
- Emerald and rose are used only with semantic meaning (success / error / problem).

### Typography
- **Font**: Geist Sans, self-hosted through `next/font` (no FOUT)
- **Display**: semibold, `tracking-display` (-0.03em)
- **Section titles**: `.section-title`; leads: `.section-lead`

### Motion
- Enter: `<Reveal/>` — fade + 12px rise, once per block, honours `prefers-reduced-motion`
- Hover: 1px lift + shadow; no scale transforms
- Dark mode is applied before paint by an inline script in `app/layout.tsx`

## 📝 Customization

### Update Branding
- Change agency name in `components/Navbar.tsx` and `components/Footer.tsx`
- Update tagline in `components/Hero.tsx`

### Modify Content
- Edit service descriptions in `components/Services.tsx`
- Update portfolio projects in `components/Portfolio.tsx`
- Adjust pricing tiers in `components/Pricing.tsx`

### Colors
- Update primary color in `tailwind.config.ts`
- Modify color scheme in `app/globals.css`

## 🚀 Deployment

### Vercel 
1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

## 📄 License

This project is private and proprietary.

## 💡 Notes

- Contact and newsletter forms write to MongoDB (see `.env.example`); `/admin` lists submissions behind Basic Auth
- New contact enquiries are also emailed to `LEAD_NOTIFY_EMAIL` through Resend when `RESEND_API_KEY` is set; the email is best-effort and never blocks the form (see `lib/leadEmail.ts`)
- Enquiries are also copied to the shared sales sheet (brand `flowforge`, next to Hirehand's demo requests) when `LEAD_FORWARD_URL` and `LEAD_FORWARD_SECRET` are set; the receiver emails the owner with Reply-To the visitor. Best-effort, server-only (see `lib/salesSheet.ts`)
- Favicon, Apple icon and the Open Graph image are generated at build time from `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`
- The optional "How we work" video section renders only when `NEXT_PUBLIC_HOW_WE_WORK_VIDEO` or `NEXT_PUBLIC_LOOM_EMBED_URL` is set

Built with ❤️ for Flowforge Systems
