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

## Admin login (credentials in MongoDB)

1. **Create the admin user (once)** – from the Admin app root, call the seed API:
   ```bash
   cd Admin && pnpm dev
   ```
   Then in another terminal (or browser/Postman):
   ```bash
   curl -X POST http://localhost:3001/api/seed-admin
   ```
   Or open any tool and send **POST** to `http://localhost:3001/api/seed-admin`.

2. **Log in** at http://localhost:3001/login with:
   - **Email:** `admin@wholegrains.com`
   - **Password:** `Admin@123`

3. **Sign out** via “Sign Out” in the sidebar. Dashboard routes are protected; without a session you are redirected to `/login`.

## MongoDB (Web + Admin)

Both **web** and **Admin** use the same MongoDB Atlas database. Connection is configured via `.env.local` in each app folder.

- **Web:** `web/.env.local` → `MONGODB_URI`
- **Admin:** `Admin/.env.local` → `MONGODB_URI`

Copy from `.env.example` in each folder if needed. Default database name is `sabzi` (override with `MONGODB_DB_NAME`).

**Check connection (ready to use):**

- Web: http://localhost:3000/api/db  
- Admin: http://localhost:3001/api/db  

Response `{ ok: true, db: "connected", database: "sabzi" }` means MongoDB is working.

**In code (API routes / Server Components / Server Actions):**

```ts
import { getDb } from "@/lib/mongodb";

const db = await getDb();
const collection = db.collection("products"); // or "categories", "inquiries", etc.
```

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
