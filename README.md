# Veesioo - Full Stack Website

A modern, full-stack website for Veesioo digital agency built with Next.js 16, TypeScript, Tailwind CSS, Prisma, and NextAuth.

## Features

- 🏠 **Homepage** - Hero section, services preview, pricing, testimonials
- 📄 **About Us** - Company information and vision
- 👥 **Team** - Team members showcase
- 🛠 **Services** - Detailed services pages
- ⭐ **Reviews** - Client testimonials and ratings
- 📞 **Contact** - Contact form with database storage
- 🔐 **Admin Dashboard** - Full CMS functionality

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Seed the database with initial data:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default Admin Credentials:**
- Email: `admin@veesioo.com`
- Password: `admin123`

### Dashboard Features

- **Overview** - View statistics at a glance
- **Testimonials** - Add, view, and delete client testimonials
- **Messages** - View and manage contact form submissions
- **Services** - Manage service offerings
- **Team** - Manage team members

## Project Structure

```
veesi00/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeding script
│   └── dev.db             # SQLite database
├── src/
│   ├── app/
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── api/           # API routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── reviews/       # Reviews page
│   │   ├── services/      # Services page
│   │   ├── team/          # Team page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   └── lib/
│       └── prisma.ts      # Prisma client instance
├── public/
│   └── logo.png           # Company logo
└── package.json
```

## Pages

1. **Homepage** (`/`)
   - Hero section with CTAs
   - Why Choose Veesioo features
   - Services preview
   - Pricing packages
   - Testimonials carousel
   - Call-to-action section

2. **About Us** (`/about`)
   - Company overview
   - Mission and vision
   - Core values

3. **Team** (`/team`)
   - Team members grid
   - Roles and bios

4. **Services** (`/services`)
   - Detailed service descriptions
   - Features for each service

5. **Reviews** (`/reviews`)
   - Client testimonials
   - Statistics showcase

6. **Contact** (`/contact`)
   - Contact form
   - Company information
   - Location details

## API Routes

- `POST /api/contact` - Submit contact form
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add testimonial (admin)
- `DELETE /api/testimonials` - Delete testimonial (admin)
- `GET /api/services` - Get all services
- `POST /api/services` - Add service (admin)
- `DELETE /api/services` - Delete service (admin)
- `GET /api/team` - Get all team members
- `POST /api/team` - Add team member (admin)
- `DELETE /api/team` - Delete team member (admin)

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file for production:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## License

© 2026 Veesioo. All Rights Reserved.
