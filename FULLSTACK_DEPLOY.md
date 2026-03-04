# 🚀 FULL-STACK DEPLOYMENT GUIDE

## Option 1: Railway (Recommended - Free & Easy) ⭐

### Why Railway?
- ✅ Free tier ($5 credit/month)
- ✅ PostgreSQL database included
- ✅ Automatic deployments from GitHub
- ✅ No credit card needed
- ✅ Perfect for Next.js + Prisma

### Deploy Steps:

#### 1. Sign Up
Go to: https://railway.app/
- Click "Start a New Project"
- Login with GitHub

#### 2. Deploy Database
- Click "New" → "Database" → "PostgreSQL"
- Wait for it to provision (1 minute)
- Copy the `DATABASE_URL` from Variables tab

#### 3. Deploy Your App
- Click "New" → "GitHub Repo"
- Select your repository: `vessioo`
- Railway will auto-detect Next.js

#### 4. Add Environment Variables
In Railway dashboard → Variables → Add:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-secret-key-here
```

#### 5. Update Prisma Schema
Change `schema.prisma` from SQLite to PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### 6. Deploy
- Railway will auto-build and deploy
- You get a URL like: `https://vessioo-production.up.railway.app`

---

## Option 2: Render (Free Alternative)

### Steps:
1. Go to: https://render.com/
2. New → "Web Service"
3. Connect GitHub repo
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

**Free tier:** 750 hours/month

---

## Option 3: Vercel + External Database

### Use Vercel for Frontend:
```bash
vercel --prod
```

### Use Railway/Supabase for Database:
1. Create PostgreSQL on Railway
2. Copy DATABASE_URL
3. Add to Vercel environment variables
4. Redeploy

---

## 📱 After Deployment: Build APK

Once deployed, you'll have a URL like:
```
https://vessioo-production.up.railway.app
```

### Build APK with PWA Builder:
1. Go to: https://www.pwabuilder.com/
2. Enter your Railway URL
3. Click "Build for Store"
4. Download Android APK
5. Install on your phone!

---

## 🔐 Environment Variables

Create `.env.production`:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-random-secret"
```

Generate secret:
```bash
openssl rand -base64 32
```

---

## 📊 Database Migration

After deploying with PostgreSQL:

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Seed database (optional)
npm run seed
```

---

## ✅ Recommended Workflow

1. **Sign up for Railway** (2 minutes)
2. **Create PostgreSQL database** (1 minute)
3. **Update schema.prisma** to PostgreSQL
4. **Push to GitHub**
5. **Connect Railway to GitHub**
6. **Add environment variables**
7. **Wait for deployment** (3 minutes)
8. **Get your URL**
9. **Use PWA Builder to create APK**

**Total time: ~10 minutes**

---

## 🎯 Quick Start Commands

```bash
# 1. Change to PostgreSQL
# Edit prisma/schema.prisma:
#   provider = "postgresql"

# 2. Install PostgreSQL adapter
npm install @prisma/adapter-libsql @libsql/client

# 3. Create migration
npx prisma migrate dev --name postgresql

# 4. Push to GitHub
git add .
git commit -m "Switch to PostgreSQL for deployment"
git push

# 5. Deploy on Railway
# Connect repo and add DATABASE_URL
```

---

Your app will be live and the APK will be downloadable! 🚀
