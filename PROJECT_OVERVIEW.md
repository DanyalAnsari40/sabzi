# Sabzi / WholeGrains – Project Overview

This doc explains how the project works and **where to make UI/UX changes** so everything keeps running.

---

## 1. Repo structure

Two **separate** Next.js apps; each is self-contained (own `app/`, `components/`, `lib/`, `styles`).

| App    | Folder   | Port  | Purpose |
|--------|----------|-------|---------|
| **Web**   | `web/`   | 3000 | Public site: home, categories, products, contact, request quote |
| **Admin** | `Admin/` | 3001 | Admin panel: dashboard, products, categories, RFQs, inquiries, analytics, settings |

- **Root** has only repo-level files (README, .gitignore, PROJECT_OVERVIEW.md, and a minimal package.json with convenience scripts). All app code lives in `web/` and `Admin/`.
- Each app uses `@/*` → its own folder (e.g. `web` imports from `web/components`, not from root).

---

## 2. How to run

**Web (public site)**

```bash
cd web
pnpm install
pnpm dev
```

→ http://localhost:3000

**Admin panel**

```bash
cd Admin
pnpm install
pnpm dev
```

→ http://localhost:3001

Run both from two terminals if you need web + admin at once.

---

## 3. Where to make UI/UX changes

### Web app (`web/`)

| What to change | File(s) |
|----------------|--------|
| **Global theme (colors, radius, fonts)** | `web/app/globals.css` — `:root` and `.dark` CSS variables, `@theme inline`, keyframes, utilities |
| **Navbar** (logo, links, mobile menu) | `web/components/public/navbar.tsx` |
| **Footer** (links, contact, legal) | `web/components/public/footer.tsx` |
| **Product cards** (list/grid) | `web/components/public/product-card.tsx` |
| **Category cards** | `web/components/public/category-card.tsx` |
| **Home page** (hero, sections, CTAs) | `web/app/page.tsx` |
| **Other pages** | `web/app/about/page.tsx`, `web/app/contact/page.tsx`, `web/app/categories/`, `web/app/products/`, `web/app/request-quote/page.tsx`, `web/app/search/page.tsx`, `web/app/buyer-portal/page.tsx` |
| **Shared UI primitives** (buttons, inputs, cards, etc.) | `web/components/ui/*` (shadcn-style components; use `cn()` and Tailwind) |

### Admin app (`Admin/`)

| What to change | File(s) |
|----------------|--------|
| **Global theme** | `Admin/app/globals.css` — same structure as web (vars, theme, animations) |
| **Sidebar** (nav links, logo, user/logout) | `Admin/components/admin/sidebar.tsx` |
| **Top header** (search, notifications, user) | `Admin/components/admin/header.tsx` |
| **Dashboard layout** (sidebar + header + content) | `Admin/app/(dashboard)/layout.tsx` |
| **Dashboard home** | `Admin/app/(dashboard)/page.tsx` |
| **Products / Categories / RFQs / Inquiries / Analytics / Settings** | `Admin/app/(dashboard)/products/`, `categories/`, `requests/`, `inquiries/`, `analytics/`, `settings/` |
| **Login** | `Admin/app/login/page.tsx` |
| **Shared UI primitives** | `Admin/components/ui/*` |

---

## 4. Design system (both apps)

- **Tailwind v4** + **PostCSS**; no separate `tailwind.config` — theme is in CSS.
- **Colors**: CSS variables in `globals.css`:
  - `--primary` (emerald green), `--secondary` (golden), `--accent` (teal), `--background`, `--foreground`, `--muted`, `--border`, `--card`, etc.
  - Use in components as `bg-primary`, `text-foreground`, `border-border`, etc.
- **Radius**: `--radius` (e.g. `0.875rem`); utilities like `rounded-lg` use it.
- **Fonts**: Geist (sans) and Geist Mono; set in `@theme inline` in `globals.css`.
- **Animations**: `animate-fade-in-up`, `animate-fade-in-down`, `hover-lift`, `animate-float`, etc. are defined in `globals.css` `@layer utilities`.
- **Components**: Radix-based UI in `components/ui/`; styling via `cn()` (from `lib/utils.ts`) and Tailwind. Change appearance by editing classes and/or `globals.css` variables.

To change the “look” globally: edit the `:root` (and optionally `.dark`) block in the app’s `app/globals.css`.

---

## 5. Data (mock only)

- **Web**: `web/lib/mock-data.ts` — `categories`, `products`, `inquiries`, `requestsForQuote`, etc.
- **Admin**: `Admin/lib/mock-data.ts` — same idea; types in `lib/types.ts` in each app.
- **Types**: `User`, `Category`, `Product`, `RequestForQuote`, `Inquiry`, `Dashboard`, etc. in `web/lib/types.ts` and `Admin/lib/types.ts`.

No backend/API yet; all lists and forms use this mock data. UI/UX changes don’t require changing data shape unless you add new fields or screens.

---

## 6. Routing

- **Web**: App Router — `app/page.tsx` (home), `app/categories/page.tsx`, `app/categories/[slug]/page.tsx`, `app/products/[id]/page.tsx`, `app/contact/`, `app/request-quote/`, `app/about/`, `app/search/`, `app/buyer-portal/`.
- **Admin**: `app/login/page.tsx` and `app/(dashboard)/*` (dashboard layout wraps all dashboard routes).

---

## 7. Optional env

- **Web**: `NEXT_PUBLIC_ADMIN_URL` — if set, “Admin Portal” in navbar/footer points to the Admin app (e.g. `http://localhost:3001` in dev). Not required for UI/UX work.

---

## 8. Images

- **Web**: Uses `/images/hero-banner.jpg`, `/images/apple.jpg`, etc. — place files in `web/public/images/`.
- **Category images**: In mock data, many use Unsplash URLs. Next.js may require `images.domains` or `images.remotePatterns` in `next.config.mjs` if you see image load errors; currently `images.unoptimized: true` is set.

---

## 9. Quick checklist for UI/UX work

1. **Run the app you’re changing**: `cd web` or `cd Admin` → `pnpm install` → `pnpm dev`.
2. **Global style**: Edit that app’s `app/globals.css` (colors, fonts, animations).
3. **Layout/chrome**: Navbar/footer in **web**; sidebar/header in **Admin**.
4. **Pages**: Edit the relevant `app/.../page.tsx` and any `components/public/` or `components/admin/` components.
5. **Shared primitives**: Adjust `components/ui/*` and/or `globals.css` so buttons, inputs, cards stay consistent.

Everything is set up so that UI/UX changes in these places will run without changing the overall architecture.
