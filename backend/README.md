# Backend - College Compass

This folder contains the Node.js backend API for the College Compass application.

## Requirements

- Node.js
- npm

## Run locally

Open a terminal in `backend/` and run:

```bash
npm install
npm run dev
```

The backend server listens on `http://localhost:5000` by default.

## API

- `GET /` - Health check returns "Backend Running"
- `GET /api/colleges` - College list route
- `GET /api/colleges/:id` - Single college details route

## Database

This backend connects to PostgreSQL using the `pg` package and `DATABASE_URL` from `backend/.env`.

Example `.env` values:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

The application expects a `colleges` table with columns such as:

- `id`
- `name`
- `state`
- `location`
- `courses` (array)
- `rating`

The `courses` field is queried using PostgreSQL array syntax in the backend.

## Project structure

- `src/index.ts` - Server entrypoint
- `src/routes/colleges.ts` - Express routes for college data
- `src/db.ts` - PostgreSQL connection pool configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## Notes

- The frontend app uses this API at `http://localhost:5000/api`.
- Run the backend and frontend in separate terminals.
- Do not commit real database credentials to Git.
