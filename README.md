# Avion - E-Commerce Furniture Store

A modern, full-stack e-commerce application for furniture and homeware products built with Next.js 16.

## Features

- **Product Catalog** - Browse products by category with search and filtering
- **Shopping Cart** - Add, remove, and update quantities with persistent cart state
- **Secure Checkout** - Stripe payment integration for secure transactions
- **User Authentication** - Sign up, sign in, and account management with Clerk
- **Order History** - View past orders and track order status
- **Admin Dashboard** - Manage products, orders, and view analytics
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Loading States** - Skeleton loaders for better perceived performance

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui, Radix UI
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payments:** Stripe
- **State Management:** Zustand
- **Image Hosting:** Cloudinary
- **Email:** React Email + Resend
- **Icons:** Lucide React
- **Charts:** Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- Clerk account
- Cloudinary account

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...

# App
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=re_...
```

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/avion-ecommerce.git
   cd avion-ecommerce
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up the database
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── (customerFacing)/    # Customer-facing pages
│   │   ├── products/        # Product listing & details
│   │   ├── basket/          # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   ├── orders/          # Order history
│   │   └── search/          # Product search
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   └── actions/             # Server actions
├── components/              # Reusable UI components
├── lib/                     # Utility functions
└── store/                   # Zustand state stores
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run email` - Preview email templates

## License

This project is for educational purposes.
