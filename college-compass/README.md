# College Compass Frontend

This folder contains the Next.js frontend for the College Compass application.

## Setup

Open a terminal in `college-compass/` and run:

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000`

## Frontend details

- `app/` - Next.js routes and page components
- `components/` - Shared UI components
- `lib/api.ts` - Axios API client for `http://localhost:5000/api`

## Notes

- The frontend expects the backend server to run on `http://localhost:5000`.
- The backend folder is in the repository root as a separate service.

## Recommended workflow

1. Start the backend in `backend/`:

```bash
npm run dev
```

2. Start the frontend in `college-compass/`:

```bash
npm run dev
```

3. Open the web app in your browser:

- `http://localhost:3000`
