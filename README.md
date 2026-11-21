# ⚖️ LawFirm (LexPrime) — Decoupled Legal Services Platform

A modern, full-stack law firm web platform built with a **React (Vite)** frontend and a **Hono** API. The primary local backend runs as a Cloudflare Worker using Wrangler's local D1 SQLite emulation, keeping it compatible with Cloudflare D1.

---

## 🏛️ Project Architecture

```text
lawyer/
├── backend/                      # Hono API for Node and Cloudflare Workers
│   ├── worker.js                 # Cloudflare Worker entry point (Hono + D1)
│   ├── home.js                   # Optional Node.js + SQLite server
│   ├── db.js                     # Local Node SQLite database
│   ├── migrations/               # D1-compatible SQL migrations
│   ├── wrangler.jsonc            # Wrangler Worker and D1 binding config
│   └── package.json
│
├── frontend/                     # Pure React 19 + Vite Single-Page Application
│   ├── src/
│   │   ├── App.tsx               # React Router v7 routes
│   │   ├── pages/                # Public, Lawyer, and Admin views
│   │   ├── components/           # UI components, Navbars, Themes
│   │   ├── context/              # LanguageContext (EN/HI), LawyerAuthContext
│   │   └── lib/api.ts            # Client API connecting to backend
│   ├── vite.config.ts            # Proxy configured for /api -> http://localhost:5000
│   └── package.json
│
├── nextjs-backup/                # Archived original Next.js fullstack codebase
├── package.json                  # Root orchestration (concurrently)
└── README.md
```

---

## 🚀 Quick Start

### 1. Run Everything Together (Recommended)

From the root directory:
```bash
npm install
npm --prefix backend install
```
Copy `backend/.dev.vars.example` to `backend/.dev.vars` and set a strong local `JWT_SECRET` and `ADMIN_PASSWORD`, then start:
```bash
npm run dev
```
This applies migrations to Wrangler's local D1 database, then runs the Hono Worker on port 5000 alongside Vite on port 5173. No remote Cloudflare resources are used.

---

### 2. Run Separately

#### Backend Worker (Wrangler + local D1)
```bash
cd backend
npm install
```
Copy `.dev.vars.example` to `.dev.vars` and set a strong local `JWT_SECRET` and `ADMIN_PASSWORD`, then run:
```bash
npm run dev:worker
```
- API Server: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

Wrangler uses the `DB` binding in `wrangler.jsonc` and stores local D1 data under `backend/.wrangler/`. The configured `database_id` is a local placeholder; create a Cloudflare D1 database and replace it before any remote migration or deployment. No remote upload has been performed.

#### Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
- React Web App: `http://localhost:5173`

---

## 📋 Features

### Public Portal
- **`/`**: Home page with lawyer search, hero section, statistics, and booking CTA.
- **`/about`**: Firm overview and core principles.
- **`/team`**: Comprehensive lawyer directory.
- **`/book-consultation`**: Interactive consultation booking with date/time pickers.
- **`/contact`**: Client inquiry form.
- **`/faq` & `/blog`**: Legal FAQ accordion and published articles.
- **Bilingual Support**: English & Hindi language switcher.
- **Themes**: Dark & Light mode toggle.

### Lawyer Portal (`/lawyer`)
- **`/lawyer/signup`**: Bar registration verification and registration.
- **`/lawyer/login`**: Secure JWT authentication with HTTP-only cookies.
- **`/lawyer/dashboard`**: Lawyer control center for consultation requests and profiles.

### Admin Dashboard (`/admin`)
- **`/admin/login`**: Admin authentication (`admin@lexprime.com` / `admin123`).
- **`/admin/dashboard`**: Overview statistics and real-time database counts.
- **`/admin/dashboard/appointments`**: Status management (Pending, Approved, Rejected, Rescheduled).
- **`/admin/dashboard/enquiries`**: Client message management (Mark read / Delete).
- **`/admin/dashboard/lawyers`**: Practitioner directory.

---

## 🔌 API Endpoints (Backend: `home.js`)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/health` | Backend status & uptime |
| `GET` | `/api/appointments` | Fetch all consultation bookings |
| `POST` | `/api/appointments` | Create consultation booking |
| `PATCH` | `/api/appointments/:id` | Update booking status |
| `DELETE` | `/api/appointments/:id` | Delete booking |
| `GET` | `/api/enquiries` | Fetch contact messages |
| `POST` | `/api/enquiries` | Submit contact message |
| `PATCH` | `/api/enquiries/:id` | Mark enquiry read/unread |
| `DELETE` | `/api/enquiries/:id` | Delete enquiry |
| `POST` | `/api/lawyer/register` | Lawyer signup & JWT issuance |
| `POST` | `/api/lawyer/login` | Lawyer login |
| `GET` | `/api/lawyer/me` | Fetch authenticated lawyer profile |
| `POST` | `/api/lawyer/logout` | Clear lawyer session cookie |
| `GET` | `/api/lawyer/list` | List registered lawyers |
| `POST` | `/api/admin/login` | Admin login |
| `GET` | `/api/admin/stats` | Real-time counts for admin dashboard |
