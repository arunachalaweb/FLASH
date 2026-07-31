# Flash Renewable Energy Solutions

A premium, self‑hosted website and admin portal for **Flash Renewable Energy Solutions**, built with **React 19**, **TanStack Start**, **TypeScript**, **Tailwind CSS**, and a **custom Express & SQLite (Prisma)** backend.

---

## ✨ Highlights
- **Full control:** No third‑party SaaS (Supabase, Lovable, etc.) – everything runs on your own VPS.
- **Modern stack:** React 19, TanStack Router, React Query, Tailwind 4, Vite 8.
- **Responsive UI:** Dark‑mode ready with glass‑morphism cards, subtle micro‑animations and vibrant teal accents.
- **Local backend:** Express server (port 4000) with SQLite + Prisma ORM.
- **Secure admin:** Token‑based sessions stored in browser local storage.
- **Easy deployments:** PM2 + Nginx reverse‑proxy configuration for production.

---

## 📸 Mockup
![Flash homepage mockup](file:///C:/Users/iamda/.gemini/antigravity-ide/brain/7da9c7cd-ee68-4957-b1f5-ceb6d3617924/flash_homepage_mockup_1785524584699.png)

---

## 🏗️ Architecture
- **Frontend & SSR** – TanStack Start (React, TypeScript, Tailwind).
- **Backend API** – Express.js on `http://localhost:4000`.
- **Database** – SQLite managed via Prisma ORM (`backend/prisma/dev.db`).
- **File uploads** – Stored in `backend/uploads/` and served at `/uploads/`.
- **Auth** – Simple admin token stored locally.

---

## 💻 Local Development
```bash
# Clone & install
git clone <repo-url>
cd FLASH
npm install

# Backend (inside ./backend)
cd backend
npm install
npx prisma db push               # initialise SQLite
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const p = new PrismaClient();
(async () => {
  const hash = await bcrypt.hash('admin123', 10);
  await p.adminUser.upsert({
    where: { username: 'admin' },
    update: { password: hash },
    create: { username: 'admin', password: hash }
  });
  console.log('Admin account set up.');
  await p.$disconnect();
})();
" # creates default admin (admin/admin123)
npm start                         # runs on http://localhost:4000

# Frontend (root)
cd ..
npm install
npm run dev                      # usually http://localhost:3000
```
> The dev server automatically selects an open port; the URL is shown in the console.

---

## 🚀 Production Deployment (Ubuntu VPS)
1. **Server setup**
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx git pm2
   ```
2. **Clone repo & install**
   ```bash
   git clone <repo-url> /var/www/FLASH
   cd /var/www/FLASH
   npm ci
   ```
3. **Build & start frontend**
   ```bash
   npm run build                    # creates .output for Node server
   PORT=3000 pm2 start .output/server/index.mjs --name flash-frontend
   ```
4. **Setup backend**
   ```bash
   cd backend
   npm ci
   npx prisma db push
   pm2 start src/server.js --name flash-backend
   ```
5. **Configure Nginx reverse proxy** (replace `example.com` with your domain)
   ```nginx
   server {
       listen 80;
       server_name example.com www.example.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /api {
           proxy_pass http://127.0.0.1:4000;
           proxy_set_header Host $host;
       }

       location /uploads {
           alias /var/www/FLASH/backend/uploads;
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```
6. **Persist PM2 processes**
   ```bash
   pm2 save
   sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
   ```

---

## 🔐 Admin Password Reset
```bash
cd backend
node -e "
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
(async () => {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { password: hash },
    create: { username: 'admin', password: hash },
  });
  console.log('Admin password reset to admin123');
  await prisma.$disconnect();
})();
" 
```

---

## 💾 SQLite Backup & Restore
```bash
# Backup
cp backend/prisma/dev.db /var/www/FLASH/backup_dev.db

# Restore
cp /var/www/FLASH/backup_dev.db backend/prisma/dev.db
```

---

## 📚 Useful Commands
- `npm run dev` – start Vite dev server.
- `npm run build` – create production bundle.
- `npm run preview` – preview production build locally.
- `npm run lint` – run ESLint.
- `npm run format` – format with Prettier.
- `pm2 status` – view running processes.
- `pm2 logs <name>` – stream logs.

---

## 🤝 Contributing
1. Fork the repo.
2. Create a feature branch.
3. Follow the existing coding style (Prettier + ESLint).
4. Submit a pull request.

---

## 📄 License
MIT – feel free to use, modify and deploy.
