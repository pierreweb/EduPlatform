# EduProject

Modern educational platform built with React + TypeScript + Vite (frontend) and Node.js + Express (backend).

## Prerequisites

- **Docker Desktop** (no local Node.js required)
- **Supabase account** (free tier available at [supabase.com](https://supabase.com))

## Quick Start

### 1. Clone and configure

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your Supabase credentials and admin email
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy:
   - `Project URL` → `SUPABASE_URL` and `VITE_SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY` and `VITE_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
3. Run the migration in **SQL Editor**:

```sql
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now(),
  tags text[],
  metadata jsonb
);
```

4. **Create admin user** in Supabase Auth:
   - Go to **Authentication → Users**
   - Click **Add User** → enter your admin email and password
   - Set `VITE_ADMIN_EMAIL` in `.env` to this email

### 3. Start development

```bash
docker compose up --build
```

## Services

| Service | URL | Description |
|---------|-----|-------------|
| **Web** | http://localhost:5173 | React frontend (Vite HMR) |
| **API** | http://localhost:3000 | Express backend |

## Admin Features

The admin login button appears in the header. When logged in as admin:
- An admin panel appears in the Hero section
- You can add items (URL + comment) directly from the frontend
- Items are stored in Supabase via the protected API

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check |
| `GET` | `/api/items` | — | List recent items |
| `POST` | `/api/items` | Bearer | Create item (admin only) |

### POST /api/items (Protected)

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"url":"https://example.com","comment":"My item"}'
```

## Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default: 3000) |
| `CORS_ORIGIN` | Allowed CORS origins |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only!) |

### Frontend (VITE_)

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key |
| `VITE_ADMIN_EMAIL` | Admin user email for access control |
| `VITE_API_URL` | API base URL (default: http://localhost:3000) |

## Security

- **helmet**: Security headers
- **Rate limiting**: 100 requests per 15 min per IP
- **CORS**: Restricted to `CORS_ORIGIN`
- **Service role key**: Server-side only, never exposed to frontend
- **Admin check**: Frontend checks `user.email === VITE_ADMIN_EMAIL`

## Commands

```bash
# Start dev environment
docker compose up --build

# Stop
docker compose down

# Rebuild with clean volumes
docker compose down -v && docker compose up --build

# View logs
docker compose logs -f api
docker compose logs -f web
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Supabase Auth
- **Backend**: Node.js 20, Express, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod

## Deployment to Hostinger

1.  **Prepare GitHub**: Ensure your project is pushed to GitHub.
2.  **Hostinger Panel**: Go to **Node.js Apps** section.
3.  **Import**: Click **Import Git Repository**.
4.  **Source**: Enter your GitHub repo URL: `https://github.com/YOUR_USERNAME/EduPlatform.git`.
5.  **Environment Variables**: In the Hostinger dashboard, manually add the environment variables listed in the **Environment Variables** section above (especially Supabase keys).
6.  **Deploy**: Hostinger will use the `build` and `start` scripts in the root `package.json` to deploy.
