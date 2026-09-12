# 🎓 College Compass

College Compass is a full-stack college discovery platform that helps students **search, explore, compare, and save colleges** in one place.

The application provides college listings with search and filters, detailed college information, college comparison, and user authentication with saved colleges.

---

## 🚀 Features

### 1. College Listing & Search

Students can browse colleges and find relevant institutions using:

- College name search
- Location search
- State filtering
- Course filtering
- Pagination
- College rating-based sorting
- College details navigation

The college listing API supports pagination and filtering so that large datasets can be handled efficiently.

---

### 2. College Detail Page

Each college has a dedicated detail page containing:

- College name
- Location
- State
- Courses
- Fees
- Rating
- Placement percentage
- Description

Students can also save a college from the detail page when logged in.

---

### 3. Compare Colleges

Students can select up to **3 colleges** and compare them side by side.

Comparison includes:

- Location
- Fees
- Rating
- Placement percentage
- Courses

This makes it easier for students to evaluate multiple colleges before making a decision.

---

### 4. Authentication

College Compass provides user authentication using:

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Logout
- Protected saved-college APIs

Passwords are never stored as plain text.

---

### 5. Saved Colleges

Logged-in users can:

- Save colleges
- View saved colleges
- Remove saved colleges

Saved colleges are associated with the authenticated user in PostgreSQL.

---

## 🏗️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Next.js API Route Handlers
- TypeScript
- Node.js

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- bcryptjs

### Deployment

- Vercel
- PostgreSQL/Neon

---

## 📁 Project Structure

```text
COLLEGE-COMPASS/
│
├── college-compass/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── colleges/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── saved-colleges/
│   │   │       ├── [collegeId]/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── college/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── colleges/
│   │   │   └── page.tsx
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx
│   │   │
│   │   ├── saved-colleges/
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── Navbar.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── prisma.ts
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── public/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── prisma.config.ts
│   └── .env.local
│
└── README.md