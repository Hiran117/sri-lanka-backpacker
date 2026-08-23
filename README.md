# LankaTrail 🌴

A backpacker's guide to Sri Lanka — public transport routes, costs, durations, hostels, food, and a live trip-progress tracker.

**Live site**: https://sri-lanka-backpacker.vercel.app

## Features
- Route planner covering the classic backpacker circuit (Colombo → Kandy → Ella → Nuwara Eliya → Mirissa → Galle)
- Per-destination guide: transport options with cost/duration, local sights, hostels, food
- Google Maps deep-link routing (no paid API)
- Member accounts (Google OAuth + email/password via NextAuth)
- GPS-verified check-ins per destination
- Live progress tracking (% of each stop explored)
- User reviews per destination
- SEO-optimized blog/guides section
- Fully responsive, mobile-first design

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth.js (Google OAuth + Credentials)
- **Database**: Supabase (Postgres)
- **Hosting**: Vercel

## Why I built this
Sri Lanka gets significant backpacker traffic, but public transport info (routes, costs, schedules) is scattered and hard to find in English. This project solves that with a route-first, trip-planning-focused approach rather than a generic travel blog.

## Local development
\`\`\`bash
npm install
npm run dev
\`\`\`
Requires a `.env.local` with Supabase and NextAuth credentials (see `.env.example`).