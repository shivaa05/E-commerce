# E-Commerce Frontend Application

A highly responsive and user-friendly e-commerce frontend interface built with **React**, **Vite**, **Tailwind CSS**, and **Zustand** for state management. This frontend connects seamlessly to our Express.js backend to provide a robust shopping experience for users and a comprehensive dashboard for administrators.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Key Technologies](#key-technologies)
- [Project Architecture](#project-architecture)

---

## ✨ Features

✅ **Modern & Fast UI** - Built with React & Vite for lightning-fast performance  
✅ **Responsive Design** - Fully responsive layouts using Tailwind CSS  
✅ **State Management** - Efficient global state handling with Zustand  
✅ **User Authentication** - Secure Login, Signup, OTP Verification, and Password Reset  
✅ **User Dashboard** - Manage profiles, view order history, and access wishlists  
✅ **Shopping Cart** - Add to cart, adjust quantities, and apply promotional coupons  
✅ **Secure Checkout** - Integrated standard checkout and payment forms (Stripe integration via backend)  
✅ **Admin Dashboard** - Dedicated interface for managing orders, products, customers, and coupons  
✅ **Protected Routes** - Role-based access control protecting admin and user-only routes  
✅ **Pagination** - Backend-connected pagination for efficient data rendering on large lists (Users, Products, Orders)

---

## 📁 Project Structure

```
frontend/
├── fonts/                            # Custom typography
├── public/                           # Public static assets
├── src/
│   ├── assets/                       # Images, icons, and SVG resources
│   ├── components/                   # Reusable UI components
│   │   ├── Admin/                    # Admin-specific components (e.g., AdminNav)
│   │   ├── User/                     # User-specific components (e.g., Checkout, HeroSection)
│   │   └── Protected.jsx             # Higher-Order Component for protecting routes
│   ├── pages/                        # Individual page views
│   │   ├── Admin/                    # Admin views (AdminHome, AdminOrders, AdminProducts, etc.)
│   │   └── User/                     # User views (Home, Cart, Profile, Signin, Signup, etc.)
│   ├── store/                        # Zustand global state stores
│   │   ├── AuthStore.js              # Authentication and user session state
│   │   ├── ProductStore.js           # Product data, catalog, and admin inventory state
│   │   └── UserStore.js              # User-specific dynamic states
│   ├── App.jsx                       # Main application routing and entry layout
│   ├── main.jsx                      # React DOM rendering entry point
│   └── index.css                     # Global styles and Tailwind directives
├── eslint.config.js                  # ESLint configuration
├── package.json                      # Project dependencies and scripts
├── vite.config.js                    # Vite bundler configuration
└── README.md                         # This file
```

### 📂 Detailed Directory Explanation

| Folder/File        | Purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| **components/**    | Reusable modular UI elements like Navbars, Footers, and Form items   |
| **pages/**         | Complete page layouts composed of multiple components                |
| **store/**         | Zustand store definitions for global data fetching and state caching |
| **assets/**        | Static graphical assets embedded directly into the bundle            |
| **App.jsx**        | Defines all React Router domains, paths, and layout scaffolding      |
| **main.jsx**       | Bootstraps the React application and mounts it to `index.html`       |
| **vite.config.js** | Configuration for the Vite development server and build tools        |

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download Git](https://git-scm.com/)

_Note: You must have the Backend server running simultaneously to interact with the API._

---

## 📥 Installation & Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/shivaa05/E-commerce.git

# Navigate to the frontend directory
cd E-commerce/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:

- **react** & **react-dom** - Core frontend framework
- **vite** - Next-generation frontend tooling and bundler
- **react-router-dom** - Routing implementation
- **zustand** - Global state management
- **axios** - Promise-based HTTP client for API requests
- **tailwindcss** - Utility-first CSS framework
- **lucide-react** - Beautifully crafted SVG icons
- **react-hot-toast** - Toast notification popups

### Step 3: Create .env File

In the `frontend` folder, create a `.env` file to point to your local or deployed backend. Vite requires environment variables to be prefixed with `VITE_`.

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3001

# Stripe Publishable Key (if required directly on frontend)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

This starts the Vite development server with Hot Module Replacement (HMR).

**Expected Output:**

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Launch the provided link (`http://localhost:5173/`) in your browser to view the application.

### Production Build

To build the application for production deployment:

```bash
npm run build
```

This generates a static `dist` folder. To preview the production build locally:

```bash
npm run preview
```

---

## 💻 Key Technologies

- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a faster and leaner development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zustand**: A small, fast, and scalable bearbones state management solution.
- **Axios**: Making asynchronous API calls handling configuration like `withCredentials: true` for secure cookie-based auth.
- **Lucide Icons**: Crisp and customizable icon library.

---

## 🏗️ Project Architecture

### State Management

Instead of Redux or Context API, this project uses **Zustand**. Data logic, API fetching functions, and states are cleanly bundled into specific stores (`ProductStore`, `AuthStore`). This ensures components remain lightweight and simply subscribe to necessary state changes.

### Admin Controls

The Admin interface is carefully separated from the standard user interface. It includes robust controls to:

- Navigate paginated datasets of users, products, and orders.
- Visually identify order statuses and mutate shipping/delivery states.
- Assign and revoke dynamic user coupons.
- View and manage product stock levels interactively.

### Protected Routing

Using the `Protected.jsx` component wrapper, routes are securely blocked preventing unauthorized users from accessing standard logged-in routes (like `/profile` or `/checkout`) or admin-only routes (like `/admin/*`). Unauthenticated attempts are seamlessly redirected to the sign-in page.
