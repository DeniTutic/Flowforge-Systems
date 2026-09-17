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
- **Font**: Inter (Google Fonts)
- **Node.js**: v18+ recommended

## 📦 Getting Started

### Prerequisites
- Node.js 18.17 or later
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
│   ├── Problem.tsx         # Problem section
│   ├── Solution.tsx        # Solution section
│   ├── Services.tsx        # Services grid
│   ├── Benefits.tsx        # Benefits grid
│   ├── Portfolio.tsx       # Portfolio projects
│   ├── SocialProof.tsx     # Social proof stats
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Pricing.tsx         # Pricing tiers
│   ├── FinalCTA.tsx        # Final call-to-action
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
└── ...
```

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Text**: `#0f172a` (Slate)
- **Background**: White/Light Gray

### Typography
- **Font**: Inter
- **Headings**: Bold, large sizes
- **Body**: Regular weight, clear hierarchy

### Components
- Rounded cards (`rounded-2xl`)
- Soft shadows
- Subtle hover effects
- Smooth transitions

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

- The contact form currently logs to console - integrate with your backend/email service
- Portfolio projects use placeholder data - replace with real projects
- Social links in footer are placeholders - update with your actual links

Built with ❤️ for Flowforge Systems
