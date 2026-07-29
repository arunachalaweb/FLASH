# Flash backend (Prisma + Express)

This folder contains a minimal MySQL backend scaffold using Prisma and Express for the Flash project.

Quick start

1. Copy environment example:

```bash
cp .env.example .env
# Edit DATABASE_URL to point to your MySQL server
```

2. Install dependencies:

```bash
cd backend
npm ci
```

3. Generate Prisma client and migrate (dev):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the server:

```bash
npm run dev
```

API
- GET /api/:table
- POST /api/:table
- PUT /api/:table/:id
- DELETE /api/:table/:id

Notes
- The scaffold maps a fixed set of table names to Prisma models in `prisma/schema.prisma`.
- Adjust models and mappings as needed to fit all your tables and data.
