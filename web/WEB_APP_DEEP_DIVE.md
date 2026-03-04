# Web App – Deep Dive: How It Works & UI/UX Change Guide

This doc explains how the **web** app is built so you can implement changes in depth at the UI level, plus concrete improvement suggestions.

---

## 1. How the web app is structured

### Entry and layout
- **`app/layout.tsx`** – Root layout: `<html>`, `<body>`, Vercel Analytics. Imports `globals.css`. Does **not** wrap pages in Navbar/Footer; each page does that itself.
- **`app/globals.css`** – Tailwind + design tokens (CSS variables for colors, radius, fonts), keyframes, and utility classes (`animate-fade-in-up`, `hover-lift`, etc.).

### Page pattern (every page)
- Same shell: `<div className="min-h-screen flex flex-col bg-background">` → `<Navbar />` → `<main className="flex-1">` → page content → `<Footer />`.
- **Navbar** and **Footer** are in `components/public/navbar.tsx` and `components/public/footer.tsx`; they are **not** in the root layout so each page controls its own chrome.

### Data
- **No API/backend.** All data comes from **`lib/mock-data.ts`**: `categories`, `products`, `inquiries`, `requestsForQuote`, etc.
- **Types** in `lib/types.ts`: `Product`, `Category`, `RequestForQuote`, `Inquiry`, `User`, etc.
- **Helpers** in mock-data: `getProductById`, `getProductsByCategory`, `getCategoryById`, etc. Pages import these and the arrays directly.

### Routing (App Router)
| Route | File | Purpose |
|-------|------|--------|
| `/` | `app/page.tsx` | Home: hero, stats, categories, featured products, CTA |
| `/about` | `app/about/page.tsx` | About: mission, values, why choose us |
| `/contact` | `app/contact/page.tsx` | Contact form + contact info cards |
| `/categories` | `app/categories/page.tsx` | All categories grid + all products grid |
| `/categories/[slug]` | `app/categories/[slug]/page.tsx` | Single category: breadcrumb, category header, products list |
| `/products/[id]` | `app/products/[id]/page.tsx` | Product detail: image, specs, quantity, “Request Quote”, related products |
| `/request-quote` | `app/request-quote/page.tsx` | RFQ: line items (product, qty, unit), company info form, submit |
| `/search` | `app/search/page.tsx` | Search + filters (category, price, stock, certifications), sort, product grid |
| `/buyer-portal` | `app/buyer-portal/page.tsx` | Buyer dashboard: orders, quotes, account tabs (mock data) |

### Shared UI
- **`components/public/`** – Site-specific: `navbar`, `footer`, `product-card`, `category-card`.
- **`components/ui/`** – Shadcn-style primitives (Button, Card, Input, Sheet, Dialog, etc.). Use `cn()` from `lib/utils` and Tailwind; styling is driven by `globals.css` variables.

### Styling
- **Tailwind v4**; theme is in CSS (`globals.css`): `:root` and `.dark` for colors, `@theme inline` for Tailwind mapping, custom keyframes and utilities.
- **Design tokens**: `--primary` (emerald), `--secondary` (gold), `--accent` (teal), `--background`, `--foreground`, `--muted`, `--border`, `--radius`, etc. Use as `bg-primary`, `text-foreground`, `rounded-lg`, etc.

---

## 2. Per-area behavior (for UI work)

### Home (`app/page.tsx`)
- **Data**: `categories`, `products` from mock-data; featured = first 6 products.
- **Sections**: Hero (headline, CTA, benefits, hero image), Stats (3 cards), Categories (grid of `CategoryCard`), Featured Products (grid of `ProductCard`), CTA (primary CTA to request quote).
- **UI hooks**: All links go to `/categories` or `/request-quote`. Hero image: `/images/hero-banner.jpg` (must exist in `public/images/`).

### Categories list (`app/categories/page.tsx`)
- Renders all categories with `CategoryCard`, then all products with `ProductCard`. No filters; just two grids.
- **Copy**: Second section title is “Featured Products”; consider “All Products” for clarity.

### Category by slug (`app/categories/[slug]/page.tsx`)
- **Server component.** Uses `generateStaticParams` from `categories` and finds category by `params.slug`. Uses `getProductsByCategory(category.id)`.
- **UI**: Breadcrumb (Back → Categories → category name), category header, product grid or empty state.

### Product detail (`app/products/[id]/page.tsx`)
- **Client component.** Uses `params.id` and `getProductById`. State: quantity input. “Request Quote” posts to `/request-quote?product=...&quantity=...&unit=...`.
- **Related**: Same category, same grid component. Price shown as `₹{product.price}` (no `.toFixed(2)` like on cards).

### Request quote (`app/request-quote/page.tsx`)
- **Client.** Reads `?product=&quantity=&unit=` and pre-fills one line item. State: `items[]` (productId, quantity, unit), company form. Add/remove rows; product select from `products`; unit follows product. Submit shows success card then redirects home after 3s.
- **Validation**: At least one item; company name, email, phone required. Contact Person is not marked required in UI but could be.

### Contact (`app/contact/page.tsx`)
- **Client.** Form state; submit shows success message and resets after 3s. No backend; validation for name, email, message.
- **Contact info**: Phone, email, address in cards (static).

### Search (`app/search/page.tsx`)
- **Client.** State: search query, selected categories, price range, min stock, certifications, sort. `useMemo` for filtered then sorted list. Sidebar filters; top bar: result count, sort select, “Filters” on mobile. Uses same `ProductCard` grid.
- **Not linked from navbar** – add a Search link or icon in the nav for discoverability.

### Buyer portal (`app/buyer-portal/page.tsx`)
- **Client.** Tabs: Orders, Quotes, Account. All data is local (orders/quotes arrays, account copy). Good candidate to later wire to auth + API.

### Navbar (`components/public/navbar.tsx`)
- **Client.** Scroll state for background/border. Links: Home, Products (/categories), About Us, Contact. Actions: Admin Portal (env `NEXT_PUBLIC_ADMIN_URL`), Request Quote. Mobile: Sheet (right) with same links + actions.
- **Missing**: No link to `/search` or Buyer Portal.

### Footer (`components/public/footer.tsx`)
- **Static.** Brand, contact (phone, email, address), Products (All + 3 hardcoded category labels but all link to `/categories`), Resources (Request Quote, About, Contact, Partner Portal), Company (Privacy, Terms, Cookie – all `#`). Copyright “© 2024” is hardcoded.

### Product card (`components/public/product-card.tsx`)
- Link to `/products/[id]`. Image, category, name, description, price per unit (₹), min order, up to 2 certifications, “View Details”. Low-stock badge if `stock <= 50`. Uses Next `Image`; product images can be local (`/images/...`) or external (need `remotePatterns` if you use external URLs).

### Category card (`components/public/category-card.tsx`)
- Link to `/categories/[slug]`. Image with overlay, “Popular” badge (same for all), name + description. Uses Next `Image`; category images in mock-data are Unsplash URLs – ensure `next.config.mjs` allows those domains if you use optimized images.

---

## 3. Suggested UI/UX changes (prioritized)

### High impact
1. **Add Search to navigation** – Link or icon in navbar to `/search` so users can find the search/filter page.
2. **Link Buyer Portal in nav or footer** – e.g. “My account” or “Buyer portal” for logged-in or all users (depending on product decision).
3. **Footer category links** – Replace “Vegetables”, “Fruits & Dairy”, “Proteins” with real links, e.g. `/categories/vegetables`, `/categories/fruits`, `/categories/proteins`, or drive from `categories` in mock-data.
4. **Dynamic copyright year** – Replace “© 2024” with `© ${new Date().getFullYear()}` (or a small component) so it stays current.
5. **Request Quote: mark Contact Person required** – If backend requires it, add “*” and `required` on the field and validate on submit.
6. **Categories page heading** – Change second section title from “Featured Products” to “All Products” when showing the full list.

### Consistency and polish
7. **Shared success state** – Contact and Request Quote both show a success message + optional redirect. Extract a reusable “FormSuccess” or “SuccessMessage” component (icon, title, text, optional button) for consistent look and behavior.
8. **Form loading states** – On Contact and Request Quote submit, show loading on the button (e.g. disabled + “Sending…” / “Submitting…”) and optional loading indicator to avoid double submit and improve feedback.
9. **Product detail price** – Use `₹{product.price.toFixed(2)}` (or a shared formatter) so decimals match the product cards.
10. **Breadcrumbs component** – Product and category pages use ad-hoc breadcrumbs. Create a small `Breadcrumb` component (e.g. `items: { label, href? }[]`) and reuse for consistent structure and styling.
11. **Currency** – Prices are hardcoded as ₹. If you might support more currencies, centralize in a small helper or component (e.g. `formatPrice(amount, currency)`).

### Content and config
12. **Footer “Follow us”** – Replace single `#` with real links (e.g. social icons + URLs) or remove if not used.
13. **Category card “Popular”** – Either remove, or drive from data (e.g. `category.isPopular` or “featured”) so only some categories show it.
14. **Product/category images** – Products use `/images/...`; categories use full Unsplash URLs. With `images.unoptimized: true` it works; if you turn optimization on, add `images.remotePatterns` in `next.config.mjs` for Unsplash (and any other external image host).
15. **Meta and titles** – Add `generateMetadata` (or equivalent) for product and category pages so document title and description include product/category name and a short description (better SEO and tabs).

### Accessibility and robustness
16. **Form labels** – You already use visible labels; ensure every input has an associated `label` (e.g. `htmlFor` / `id`) where it helps.
17. **Error feedback** – Contact and Request Quote use `alert()` for validation. Consider inline errors under fields or a toast so users don’t have to dismiss a browser dialog.
18. **Product detail `params`** – In Next 15+, route `params` in client components can be async. If you see hydration or missing `params`, read `id` from `useParams()` and handle loading state until you have it.

### Optional enhancements
19. **Dark mode** – CSS variables for `.dark` exist; add a theme toggle (e.g. in navbar or footer) and persist preference (e.g. `localStorage` + script in layout) so dark mode is usable.
20. **Empty / error states** – Search “no results”, category with no products, and 404-style product/category pages could use a shared empty-state component (illustration or icon, message, primary action) for consistency.
21. **Buyer portal** – Add a link from navbar or footer; when you add auth, gate this route and load orders/quotes from API instead of local arrays.

---

## 4. Where to edit for each kind of change

| Goal | Main files |
|------|------------|
| Global colors, fonts, radius, animations | `app/globals.css` |
| Navbar links, logo, mobile menu | `components/public/navbar.tsx` |
| Footer links, columns, copyright, social | `components/public/footer.tsx` |
| Product card layout, badges, price display | `components/public/product-card.tsx` |
| Category card layout, badge, overlay | `components/public/category-card.tsx` |
| Home sections and copy | `app/page.tsx` |
| Category list + all products | `app/categories/page.tsx` |
| Single category page | `app/categories/[slug]/page.tsx` |
| Product detail layout, specs, CTA | `app/products/[id]/page.tsx` |
| Request quote form and success | `app/request-quote/page.tsx` |
| Contact form and success | `app/contact/page.tsx` |
| Search + filters + sort | `app/search/page.tsx` |
| Buyer portal tabs and copy | `app/buyer-portal/page.tsx` |
| Shared success/empty/loading UI | New under `components/public/` or `components/ui/` |
| Breadcrumbs | New component + use in product/category pages |
| Image domains (external) | `next.config.mjs` → `images.remotePatterns` |
| Page titles/descriptions | `generateMetadata` in the relevant `page.tsx` |

---

## 5. Small fixes already done in codebase

- **About page** – Values section was using `<value.icon />` (lowercase), which React treats as a DOM element. Fixed by assigning `const Icon = value.icon` and rendering `<Icon />`.
- **Buyer portal** – `Plus` from `lucide-react` was imported at the bottom of the file; moved into the main icon import at the top.

Using this doc you can implement UI/UX changes in depth while keeping behavior and structure consistent across the app.
