# Orangic — Organic Essentials Storefront

A clean, responsive React storefront for thoughtful everyday goods: organic pantry staples, wellness, body care, and home & lifestyle products.

## Features

- **Shop / Products** (`/products`, `/shop`) — search, category / price / rating / availability filters, sorting (popular, price, newest, rated), load-more pagination
- **Product details** (`/products/:slug`) — gallery, rating, ingredients, nutrition & care, reviews, related products, quantity + add to cart / buy now / wishlist
- **Cart** (`/cart`) — quantity controls, order summary with subtotal, shipping, discount, and grand total (persisted in local storage)
- **Checkout** (`/checkout`) — multi-step mock checkout (customer → shipping → payment → review) with validation
- **Wishlist** (`/wishlist`) — save / remove / move to cart (persisted in local storage)
- **Search** (`/search`) — debounced live search with suggestions
- **Admin dashboard** (`/admin`) — overview with basic sales statistics, plus Products / Orders / Customers tables (mock data for orders & customers, live catalog data for products)
- **UX polish** — responsive mobile-first layout, product-card skeletons, loaders, empty states, error states, toast notifications, scroll reveals and reduced-motion support, light/dark theme

## Tech Stack

- **React 19** + **React Router 7** (lazy-loaded routes in `src/routes/`)
- **Vite 8** (dev server + production build)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Motion** (`motion/react`) for animations
- **ESLint + Prettier** for linting and formatting

## How to Run the Project

Prerequisites: **Node.js 18+** and **npm**.

```bash
npm install
npm run dev      # start dev server (http://localhost:5173 by default)
npm run lint     # run ESLint
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Important

- This project was **not** rewritten from scratch: all existing functionality was kept.
- It reuses the existing **components** (`src/components/`), **contexts** (`src/context/`), **hooks** (`src/hooks/`), **services** (`src/services/`), **routing** (`src/routes/` + `src/constants/routes.js`), and the existing **product data structure** (`src/data/products.js`, 30 products across the existing categories).
- Implementation is kept clean and responsive — no extra dependencies were added for this change.

