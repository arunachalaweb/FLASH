# Flash Renewable Energy Solutions

A premium website and administrative portal for Flash Renewable Energy Solutions, built with **React**, **TanStack Start**, and a custom local **Express & SQLite (Prisma)** backend.

This project is completely self-hosted, independent of third-party platforms like Supabase or Lovable wrappers, and runs entirely on a VPS.

---

## 🏗️ Architecture

- **Frontend & SSR**: TanStack Start (React 19, TypeScript, Tailwind CSS)
- **Backend & API**: Express.js server running on port `4000`
- **Database**: SQLite database managed via Prisma ORM
- **Uploads**: Stored locally on the server filesystem (`backend/uploads/`) and served statically at `/uploads/`
- **Authentication**: Local token-based admin session stored in browser local storage

---

## 💻 Local Development

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the Prisma database:
   ```bash
   npx prisma db push
   ```
4. Create the default admin credentials (`admin` / `admin123`):
   ```bash
   node -e '
   const { PrismaClient } = require("@prisma/client");
   const bcrypt = require("bcryptjs");
   const p = new PrismaClient();
   async function run() {
     const hash = await bcrypt.hash("admin123", 10);
     await p.adminUser.upsert({
       where: { username: "admin" },
       update: { password: hash },
       create: { username: "admin", password: hash }
     });
     console.log("Admin account set up.");
   }
   run().catch(console.error).finally(() => p.$disconnect());
   '
   ```
5. Start the backend:
   ```bash
   npm start
   ```
   *(Running on `http://localhost:4000`)*

### 2. Frontend Setup
1. Navigate to the root folder:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *(Usually running on `http://localhost:5173`)*

---

## 🚀 VPS Production Deployment (Hostinger VPS)

To deploy updates to the live Hostinger VPS:

### 1. Update Code from GitHub
SSH into your VPS and navigate to the project directory:
```bash
cd /var/www/FLASH/backend/FLASH
git reset --hard HEAD
git clean -fd
git pull
```

### 2. Build the Frontend
Compile the React code and package it specifically for a standard Node.js server environment:
```bash
npm install
NITRO_PRESET=node-server npm run build
```

### 3. Setup and Run the Servers with PM2

#### **Frontend Process (Port 3000)**
```bash
# If starting for the first time
PORT=3000 pm2 start .output/server/index.mjs --name "flash-prod-frontend"

# If updating an existing process
pm2 restart flash-prod-frontend
```

#### **Backend Process (Port 4000)**
```bash
cd backend
npm install
npx prisma db push

# If starting for the first time
pm2 start src/server.js --name "flash-backend"

# If updating an existing process
pm2 restart flash-backend --update-env
```

Save the PM2 configuration so it restarts automatically on server reboots:
```bash
pm2 save
```

---

## 🔑 Database & Password Administration

To forcefully reset the admin password on the local machine or VPS, run this script inside the `backend` folder:

```bash
node -e '
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const p = new PrismaClient();
async function forceReset() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const user = await p.adminUser.upsert({
    where: { username: "admin" },
    update: { password: hashedPassword },
    create: { username: "admin", password: hashedPassword }
  });
  console.log("Password reset successful for username:", user.username);
}
forceReset().catch(console.error).finally(() => p.$disconnect());
'
```
