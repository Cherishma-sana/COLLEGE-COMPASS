# College Compass

This repository contains the full College Compass project with two separate folders:

- `backend/` - Node.js + Express API built with TypeScript.
- `college-compass/` - Next.js frontend application.

## Run the application

### 1. Backend

Open a terminal in `backend/` and run:

```bash
npm install
npm run dev
```

The backend starts on `http://localhost:5000` by default.

### 2. Frontend

Open a terminal in `college-compass/` and run:

```bash
npm install
npm run dev
```

The frontend starts on `http://localhost:3000`.

### 3. Use both together

Run the backend and frontend in separate terminals, then open:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000`

## Folder structure

- `backend/` - API server and routes.
- `college-compass/` - Next.js frontend pages, components, and styles.

## Notes

- The frontend uses the backend API at `http://localhost:5000/api`.
- Make sure both folders are running at the same time to use the full app.
