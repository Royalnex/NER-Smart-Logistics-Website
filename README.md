# NER Smart Logistics & Accessibility Platform

An explainable command center for monitoring roads, transport corridors, and accessibility across the North Eastern Region of India.

## What is included

- React + Vite frontend with React Router, Tailwind CSS, Axios, Recharts, Leaflet, and responsive layouts.
- Express backend with JWT authentication, admin/viewer roles, risk scoring, route CRUD, alert actions, and analytics endpoints.
- Optional MongoDB/Mongoose persistence for shared deployments, with transparent JSON persistence in `backend/data/store.json` as a zero-setup fallback.
- 18 seeded routes, 9 alerts, weather/terrain/road factors, and demo accounts for an immediate functional walkthrough.

## Run locally

### 1. Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure the backend (optional)

```bash
cp backend/.env.example backend/.env
```

`JWT_SECRET` is optional for the demo because the server has a safe development fallback. Set it for any real deployment. If `MONGODB_URI` is set, the backend tries MongoDB during startup and uses the MongoDB collections for users, routes, and alerts. If MongoDB cannot be reached, the server logs a warning and continues with the JSON fallback; no database setup is required for local development.

When MongoDB is enabled, the connection attempt defaults to a short 1.5-second server-selection timeout so an unavailable database does not prevent the API from starting. Set `MONGODB_SERVER_SELECTION_TIMEOUT_MS` or `MONGODB_CONNECT_TIMEOUT_MS` when a different timeout is needed.

### 3. Start both applications

From the project root:

```bash
npm run dev
```

- Frontend: `http://localhost:5000`
- Backend API: `http://localhost:5050`
- Vite proxies `/api` requests to the backend.

You can also run each service independently:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

### 4. Seed/reset demo data

The complete demo dataset is committed in `backend/data/store.json`. Run:

```bash
npm run seed
```

With no reachable `MONGODB_URI`, the command resets the local JSON store. With a reachable `MONGODB_URI`, it replaces the MongoDB users, routes, and alerts collections with the committed demo dataset. To reset JSON data after using the admin CRUD tools, run the command again or restore `backend/data/store.json` from git.

The active storage mode is exposed by `GET /api/health`, which returns either `"mongodb"` or `"json-fallback"` in its `storage` field.

## Demo access

- Admin: `admin@nerlogistics.in` / `password`
- Viewer: `viewer@nerlogistics.in` / `password`

Admins can add/edit/delete routes, publish alerts, and resolve alerts. Viewers can browse the live map, route directory, alerts, and analytics in read-only mode.

## API overview

`POST /api/auth/register`, `POST /api/auth/login`, `GET /api/routes`, `POST /api/routes`, `PUT /api/routes/:id`, `DELETE /api/routes/:id`, `GET /api/routes/:id/risk`, `GET /api/alerts`, `POST /api/alerts`, `PUT /api/alerts/:id/resolve`, and `GET /api/analytics/summary`.

The scoring engine is in `backend/riskEngine.js`. It adds explainable points for weather, terrain, road condition, and past incidents, then returns a 0–100 score, Low/Medium/High category, factors, and a recommendation.
