# Sabzi / WholeGrains – B2B Wholesale Grocery

Monorepo with two deployable apps:

- **`web/`** – Public marketing site (home, categories, products, contact, request quote).
- **`Admin/`** – Admin panel (dashboard, products, categories, RFQs, inquiries, analytics, settings).

## Local development

### Web (public site)

```bash
cd web
pnpm install
pnpm dev
```

Runs at http://localhost:3000

### Admin panel

```bash
cd Admin
pnpm install
pnpm dev
```

Runs at http://localhost:3001

## Deploy on Vercel

1. **Web app**  
   - New project → Import this repo.  
   - Set **Root Directory** to `web`.  
   - Deploy.  
   - Optional: set env `NEXT_PUBLIC_ADMIN_URL` to your Admin app URL so “Admin Portal” links work.

2. **Admin app**  
   - New project → Import same repo.  
   - Set **Root Directory** to `Admin`.  
   - Deploy.  
   - Use a different subdomain or domain (e.g. `admin.yoursite.com`).

Each app has its own `vercel.json` in its root directory.
