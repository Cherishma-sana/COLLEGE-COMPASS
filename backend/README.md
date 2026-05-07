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

## Project structure

- `src/index.ts` - Server entrypoint
- `src/routes/colleges.ts` - Express routes for college data
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## Notes

- The frontend app uses this API at `http://localhost:5000/api`.
- Run the backend and frontend in separate terminals.
