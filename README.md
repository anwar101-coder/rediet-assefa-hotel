# Rediet Assefa Hotel Website

A modern, responsive hotel website built for **Rediet Assefa Hotel** in Butajira, Ethiopia.

The website provides visitors with information about the hotel, rooms and suites, amenities, nearby attractions, guest reviews, and booking-related information. It also includes a secure administrative dashboard for authorized staff to manage room information and availability.

## 🌐 Live Website

**Production:**  
https://rediet-assefa-hotel.vercel.app/

> The production website is currently hosted on Vercel. A custom domain will be connected after client approval.

---

## ✨ Features

### Public Website

- Modern luxury hotel landing page
- Responsive design for desktop, tablet, and mobile
- Hotel introduction and welcome section
- Rooms & Suites showcase
- Room details and availability
- Hotel amenities
- Nearby attractions
- Guest reviews
- Contact and footer sections
- Smooth navigation and responsive UI
- SEO-friendly page metadata

### 🏨 Room Management

The website includes an administrative dashboard that allows authorized hotel staff to:

- Add new rooms
- Edit existing rooms
- Delete rooms
- Update room descriptions
- Set room prices
- Set room capacity
- Specify bed types
- Add room amenities
- Add main and gallery images
- Control room display order
- Mark rooms as available or unavailable

Changes made through the dashboard are reflected on the public rooms section.

### 🔐 Authentication & Security

- Supabase authentication
- Protected administrative routes
- Role-based admin access
- Admin-only room management
- Secure database access through Supabase Row Level Security
- Authentication state handling

---

## 🛠️ Technologies Used

### Frontend

- React
- TypeScript
- TanStack Router
- TanStack Start
- TanStack React Query
- Vite
- Tailwind CSS
- Radix UI
- Lucide React

### Backend & Services

- Supabase
  - Authentication
  - PostgreSQL database
  - Row Level Security

### Deployment

- Vercel
- GitHub

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── site/
│   │   ├── Navbar
│   │   ├── Hero
│   │   ├── Welcome
│   │   ├── FeaturedRooms
│   │   ├── Amenities
│   │   ├── Attractions
│   │   ├── Reviews
│   │   └── Footer
│   │
│   └── ui/
│       └── Reusable UI components
│
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── rooms.tsx
│   ├── auth.tsx
│   └── _authenticated/
│       └── admin.tsx
│
├── integrations/
│   └── supabase/
│
├── lib/
│   └── Application utilities
│
├── styles.css
└── router.tsx

public/
└── Static assets

.github/
└── workflows/
    └── Deployment configuration
