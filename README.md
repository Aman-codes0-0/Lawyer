# ⚖️ LawFirm — Professional Legal Services Website

A modern, full-stack law firm website built with **Next.js 16**, **Prisma ORM**, **SQLite**, and **Tailwind CSS v4**. Features a fully responsive public-facing site with multi-language support and a protected admin dashboard.

---

##  Live Features

###  Public Pages
| Route | Description |
|-------|-------------|
| `/` | Hero section, stats, lawyer search, why-choose-us & CTA |
| `/about` | Firm history, values, and team overview |
| `/team` | All lawyers with designations and specializations |
| `/practice-areas` | Legal services offered |
| `/book-consultation` | Appointment booking form |
| `/contact` | Contact enquiry form |
| `/blog` | Published blog articles |
| `/faq` | Frequently asked questions |

###  Admin Dashboard (`/admin`)
| Route | Description |
|-------|-------------|
| `/admin/login` | Secure admin login (NextAuth) |
| `/admin/dashboard` | Overview & analytics |
| `/admin/dashboard/appointments` | View & manage appointment bookings |
| `/admin/dashboard/enquiries` | View & manage contact enquiries |
| `/admin/dashboard/lawyers` | Add, edit & remove lawyer profiles |

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Animations** | Framer Motion + Lenis (smooth scroll) |
| **Database** | SQLite (via Prisma ORM) |
| **Auth** | NextAuth.js v4 |
| **Icons** | Lucide React |
| **UI Components** | Base UI, shadcn |

---

##  Project Structure

```
lawyer/
└── frontend/
    ├── prisma/
    │   └── schema.prisma       # Database schema
    ├── public/                 # Static assets
    └── src/
        ├── app/                # Next.js App Router pages & API routes
        │   ├── admin/          # Admin dashboard (protected)
        │   ├── api/            # API route handlers
        │   ├── about/
        │   ├── blog/
        │   ├── book-consultation/
        │   ├── contact/
        │   ├── faq/
        │   ├── practice-areas/
        │   └── team/
        ├── components/         # Reusable UI components
        ├── context/            # React context (Language, Theme)
        └── lib/                # Utilities & helper functions
```

---

##  Database Models

The app uses **SQLite** with Prisma ORM and includes the following models:

- **User** — Admin users with role-based access (`ADMIN` / `SUPER_ADMIN`)
- **Lawyer** — Lawyer profiles (name, designation, experience, specialization, bar registration)
- **PracticeArea** — Services offered by the firm
- **Appointment** — Client booking requests with status tracking (`PENDING`, `APPROVED`, `REJECTED`, `RESCHEDULED`)
- **Blog** — Published and draft blog articles
- **ContactEnquiry** — Contact form submissions with read/unread status

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:Aman-codes0-0/Lawyer.git
cd Lawyer/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# Generate Prisma client & migrate database
npx prisma generate
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Environment Variables

Create a `.env` file inside the `frontend/` directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

##  Available Scripts

Run these from inside the `frontend/` directory:

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

##  Multi-Language Support

The site includes a built-in language context (`LanguageContext`) allowing easy addition of new locales. All UI strings are managed via translation keys accessed through the `useLanguage()` hook.

---

##  Design Highlights

- **Dark / Light mode** support via `next-themes`
- **Glassmorphism** UI elements and premium card styles
- **Smooth page scroll** powered by Lenis
- **Framer Motion** animations on all key sections
- **Gold & Navy** color palette for a premium legal brand feel
- Fully **responsive** across mobile, tablet, and desktop

---

##  Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

##  License

This project is private. All rights reserved © 2026 LawFirm.
