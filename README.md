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

## 📋 Server Requirements & Prerequisites

To run this application in production on an Ubuntu VPS, you need:

- **Operating System**: Ubuntu 22.04 LTS or newer (recommended)
- **Node.js**: `v20.x` or `v22.x` (LTS releases)
- **Package Manager**: `npm` (bundled with Node.js)
- **Process Manager**: `PM2` (installed globally: `npm install -g pm2`)
- **Web Server**: `Nginx` (acting as a reverse proxy)
- **SSL Certificate**: Let's Encrypt / Certbot (for HTTPS)

---

## 💻 Local Development Setup

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

## 🚀 VPS Production Deployment (Step-by-Step)

### 1. Initial VPS Server Setup
If deploying on a fresh server, run these commands to set up the environment:

```bash
# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js (v22)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install global utilities
sudo npm install -g pm2

# 4. Install Nginx and Git
sudo apt install nginx git -y
```

### 2. Configure Nginx Reverse Proxy
Create or modify your Nginx default site configuration (typically `/etc/nginx/sites-available/default`) to map traffic:

```nginx
server {
    listen 80;
    server_name flashrenewable.com www.flashrenewable.com;

    # Frontend Server Proxy (TanStack Start)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API Server Proxy
    location /api {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static local file uploads
    location /uploads {
        alias /var/www/FLASH/backend/FLASH/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```
Test and reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### 3. Deploying Application Updates

To deploy updates to the live Hostinger VPS:

#### **Step 3.1: Pull latest code from GitHub**
```bash
cd /var/www/FLASH/backend/FLASH
git reset --hard HEAD
git clean -fd
git pull
```

#### **Step 3.2: Build and start the Frontend**
```bash
# Install packages
npm install

# Compile the build specifically for Node.js
NITRO_PRESET=node-server npm run build

# Start/Restart frontend using PM2
pm2 delete flash-prod-frontend 2>/dev/null || true
PORT=3000 pm2 start .output/server/index.mjs --name "flash-prod-frontend"
```

#### **Step 3.3: Sync and start the Backend**
```bash
cd backend
npm install

# Push any new Prisma schema adjustments
npx prisma db push

# Start/Restart backend using PM2
pm2 delete flash-backend 2>/dev/null || true
pm2 start src/server.js --name "flash-backend"
```

#### **Step 3.4: Save PM2 config**
Ensure all servers automatically start on system reboots:
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

---

## 💾 Database Backup & Restore

Since the project uses SQLite, backups are simple file copies. To back up or restore the live database, manage the `backend/prisma/dev.db` file directly:

- **Backup**:
  ```bash
  cp /var/www/FLASH/backend/FLASH/backend/prisma/dev.db /var/www/FLASH/backup_dev.db
  ```
- **Restore**:
  ```bash
  cp /var/www/FLASH/backup_dev.db /var/www/FLASH/backend/FLASH/backend/prisma/dev.db
  ```
