# Just Pick Already

> Stop overthinking. Just pick already.

A free, no-login browser game where you walk a stickman through themed zones, make choices in dilemma scenarios, and get an AI-generated personality profile at the end.

**Live at [justpickalready.in](https://justpickalready.in)**

## Features

- 5 themed zones — Social, Relationships, Career, Moral, Impulse vs Logic
- Scenario-based dilemma questions with no right or wrong answers
- AI-generated personality breakdown based on your choices
- No accounts, no login, fully anonymous

## Tech Stack

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion**
- **Prisma** + **PostgreSQL** (Supabase)
- **Google Gemini** (`@google/genai`)
- **Zustand**
- **React Hook Form** + **Zod**
- **TanStack Query**
- **Resend**
- **Recharts**
- **Vercel**

## Getting Started

### Installation

```bash
git clone https://github.com/maulik-koli/just-pick-already.git
cd just-pick-already
npm install
```

### Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

```env
NODE_ENV=           # development | production

GEMINI_MODEL_CODE=  # e.g. gemini-2.0-flash
GEMINI_API_KEY=     # Google AI Studio API key

DATABASE_URL=       # Supabase pooled connection string
DIRECT_URL=         # Supabase direct connection string

EMAIL_API_KEY=      # Resend API key
```

### Run Locally

```bash
npm run dev
```

Runs on [http://localhost:3110](http://localhost:3110).

> **Note:** `npm run build` also runs `prisma migrate deploy && prisma generate` before the Next.js build.

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push and open a Pull Request

Please keep PRs focused — one feature or fix per PR.

## License

MIT © [Maulik Koli](https://github.com/maulik-koli)