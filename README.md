# NEOTECH - E-Commerce Platform

A production-ready, modern e-commerce web application built with React, featuring premium UI/UX, advanced animations, and a seamless shopping experience.

## Overview

NEOTECH is a full-featured e-commerce platform specializing in smart gadgets and electronics. The application delivers an Apple/Nike-level quality experience with smooth animations, responsive design, and intuitive user interactions.

## Features

### Core Features
- **Product Listing**: Dynamic product grid with loading states and error handling
- **Product Details**: Comprehensive product pages with images, ratings, and descriptions
- **Shopping Cart**: Real-time cart management with quantity updates and persistent storage
- **Checkout Flow**: Secure checkout with form validation and order confirmation
- **Authentication**: Simulated authentication with local storage persistence
- **Responsive Design**: Mobile-first approach supporting all device sizes

### Advanced Capabilities
- **Premium Animations**: Framer Motion-powered transitions and micro-interactions
- **Real-time Updates**: Cart updates with animated notifications
- **Error Handling**: Graceful error states and empty states
- **Skeleton Loaders**: Smooth loading experiences
- **Search Integration**: Products fetched from FakeStore API
- **Dark Theme**: Professional dark mode design with glassmorphism effects

## Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Routing**: React Router v6
- **State Management**: Context API (CartContext, AuthContext)
- **Animations**: Framer Motion 10+
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm
- **API**: FakeStore API

## Folder Structure

```
src/
├── App.tsx                  # Main app component with routing setup
├── index.css               # Global styles and Tailwind configuration
├── main.tsx                # React entry point
├── vite-env.d.ts          # Vite environment types
│
├── Components (Reusable)
│   ├── Navbar.tsx          # Navigation header with cart badge
│   ├── ProductList.tsx     # Grid layout for products with loading states
│   ├── ProductCard.tsx     # Individual product card with animations
│   ├── Cart.tsx            # Cart drawer/modal component
│   └── Checkout.tsx        # Checkout form with validation
│
├── Pages
│   ├── Home.tsx            # Homepage with hero and product listing
│   ├── ProductDetail.tsx   # Product detail page with dynamic routing
│   ├── CartPage.tsx        # Full cart page with order summary
│   └── CheckoutPage.tsx    # Checkout page with authentication flow
│
├── Context (State Management)
│   ├── CartContext.tsx     # Cart state, add/remove items, totals
│   └── AuthContext.tsx     # User authentication state and methods
│
└── Services & Hooks
    ├── api.ts              # API service layer for FakeStore API
    └── useProducts.ts      # Custom hook for product fetching
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd neotech
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Architecture & Design Patterns

### Context API Structure
The application uses two main contexts:
- **CartContext**: Manages shopping cart state, including items, quantities, and totals
- **AuthContext**: Manages user authentication state with simulated login/logout

### Custom Hooks
- **useProducts**: Fetches products from API with loading and error states

### Component Hierarchy
- App (Router + Providers)
  - AuthProvider
    - CartProvider
      - Navbar
      - Routes
        - Home (ProductList, ProductCard)
        - ProductDetail
        - CartPage
        - CheckoutPage

## Key Features Explained

### Shopping Cart
- Add/remove items with smooth animations
- Update quantities in real-time
- Persistent storage using localStorage
- Animated cart badge showing item count

### Product Pages
- Dynamic routing with URL-based product IDs
- Real-time price calculations
- Related product recommendations
- Rating and review display

### Checkout Process
1. Cart review and modification
2. User authentication (simulated)
3. Payment information collection
4. Address/billing details
5. Order confirmation with order number

### Animations & Interactions
- Navbar slide-in animation on page load
- Product cards lift and glow on hover
- Button scale and ripple effects
- Cart open/close slide transitions
- Page fade transitions
- Loading skeleton animations

## Design System

### Color Palette
- **Primary**: Cyan (#06B6D4)
- **Secondary**: Blue (#3B82F6)
- **Background**: Gray-900 (#111827)
- **Surface**: Gray-800 (#1F2937)
- **Text**: Gray-100 (#F3F4F6)
- **Accent**: Gradient from Cyan to Blue

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Heading Scale**: 7xl, 6xl, 5xl, 4xl, 3xl, 2xl, xl, lg, base, sm
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Spacing System
- 8px base unit for consistent spacing
- Tailwind spacing utilities (gap, p, m, etc.)

## Performance Optimizations

- Lazy image loading with native `loading="lazy"`
- Framer Motion for GPU-accelerated animations
- Code splitting with React Router
- Optimized build with Vite
- CSS-in-JS for minimal bundle size
- Skeletal loading for improved perceived performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Backend API integration with Node.js/Express
- Payment processing with Stripe
- User accounts and order history
- Product search and filtering
- Wishlist functionality
- Product reviews and ratings system
- Email notifications
- Admin dashboard
- Analytics integration
- PWA support
- Dark/Light theme toggle

## Security Considerations

- XSS protection through React's built-in escaping
- CSRF protection headers (for backend integration)
- Secure localStorage usage (no sensitive data)
- Form validation on client and server
- HTTPS in production

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Testing

Currently using manual testing. Future improvements:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Cypress/Playwright
- Visual regression testing

## Accessibility (a11y)

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios (WCAG AA compliant)
- Focus indicators on buttons and links

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, feature requests, or contributions, please open a GitHub issue or submit a pull request.

---

**Built with** ⚡ by a senior frontend engineer
**Powered by** React + TypeScript + Tailwind CSS + Framer Motion
