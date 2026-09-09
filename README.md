# Ozaib Portfolio — CMS Phase 4

Next.js + TypeScript + Tailwind + PostgreSQL + Prisma. No fake personal data is seeded.

## Setup
1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `AUTH_SECRET` (32+ chars), and optionally `NEXT_PUBLIC_SITE_URL`.
2. Run `npm install`.
3. Run `npm run db:generate` then `npm run db:push`.
4. Run `npm run admin:create` to create/update the private admin account.
5. Run `npm run dev`.

## Admin
- `/admin` overview
- `/admin/blog` posts
- `/admin/projects` projects
- `/admin/skills` skills
- `/admin/experience` experience
- `/admin/education` education
- `/admin/certifications` certifications
- `/admin/profile` profile + social links
- `/admin/settings` site/privacy settings

## Public
- `/` dynamic home
- `/projects` and `/projects/[slug]`
- `/blog` and `/blog/[slug]`
- `/skills`

The public pages remain usable with an empty database and simply show clean empty states.


## Phase 5
This phase focuses on the public portfolio experience: bilingual Arabic/English navigation with RTL/LTR switching, dark/light themes, dynamic profile/about/skills/projects/blog/contact pages, featured content on the home page, SEO metadata, robots and sitemap, and private admin-managed content.

### Before deployment
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `AUTH_SECRET`, and `NEXT_PUBLIC_SITE_URL`.
3. Run `npm install`.
4. Run `npm run db:generate` then `npm run db:push`.
5. Create the first admin with `npm run admin:create`.
6. Run `npm run build` and then deploy the project root to Vercel.

No personal biography, education, certifications, projects, or social URLs are pre-filled as factual claims. Add those from the private admin panel when ready.
