# E-Commerce Backend API

A fully functional e-commerce backend built with **Express.js**, **MongoDB**, **Stripe**, and **Cloudinary**. This backend provides complete REST API endpoints for user authentication, product management, order processing, and admin operations.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)

---

## ✨ Features

✅ **User Authentication** - Register, Login, OTP Verification, Password Reset  
✅ **User Management** - Profile updates, Password change, User profiles  
✅ **Product Management** - Create, Read, Update, Delete products  
✅ **Order Management** - Place orders, Track orders, Order status updates  
✅ **Payment Integration** - Stripe payment gateway with webhook support  
✅ **Admin Panel** - User management, Role-based access control  
✅ **File Upload** - Image uploads to Cloudinary  
✅ **Email Notifications** - OTP and password reset emails via Nodemailer  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **CORS Support** - Cross-origin request handling

---

## 📁 Project Structure

```
backend/
├── config/
│   └── generateToken.js              # JWT token generation utility
├── controllers/
│   ├── admin.controller.js           # Admin operations (user management)
│   ├── auth.controller.js            # Authentication logic
│   ├── order.controller.js           # Order management logic
│   ├── payment.controller.js         # Payment & Stripe webhook handling
│   └── product.controller.js         # Product CRUD operations
├── middleware/
│   └── isAuth.js                     # JWT authentication middleware
├── models/
│   ├── order.model.js                # Order schema & database model
│   ├── payment.model.js              # Payment schema & database model
│   ├── product.model.js              # Product schema & database model
│   └── user.model.js                 # User schema & database model
├── routes/
│   ├── admin.route.js                # Admin endpoints
│   ├── auth.route.js                 # Authentication endpoints
│   ├── order.route.js                # Order endpoints
│   └── product.route.js              # Product endpoints
├── uploads/                          # Temporary file storage for uploads
├── utils/
│   ├── cloudinary.js                 # Cloudinary image upload configuration
│   ├── db.js                         # MongoDB connection setup
│   ├── generatePaymentIntent.js      # Stripe payment intent generation
│   └── sendMail.js                   # Email sending utility
├── package.json                      # Project dependencies
├── server.js                         # Main application entry point
└── README.md                         # This file
```

### 📂 Detailed Directory Explanation

| Folder/File      | Purpose                                                         |
| ---------------- | --------------------------------------------------------------- |
| **config/**      | Configuration utilities like JWT token generation               |
| **controllers/** | Business logic for handling requests and responses              |
| **middleware/**  | Express middleware for authentication & validation              |
| **models/**      | MongoDB schemas and data structures                             |
| **routes/**      | API endpoint definitions and routing                            |
| **uploads/**     | Temporary storage for file uploads before processing            |
| **utils/**       | Helper functions (DB connection, email, payments, file uploads) |
| **server.js**    | Entry point - Express app configuration and port setup          |

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** Atlas Account or Local MongoDB - [Setup MongoDB](https://www.mongodb.com/docs/manual/installation/)
- **Stripe Account** - [Create Stripe Account](https://dashboard.stripe.com/register)
- **Cloudinary Account** - [Create Cloudinary Account](https://cloudinary.com/)
- **Gmail Account** - For sending emails (App Password required)
- **Git** - [Download Git](https://git-scm.com/)

---

## 📥 Installation & Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/ecommerce-backend.git

# Using SSH
git clone git@github.com:yourusername/ecommerce-backend.git

# Navigate to the project directory
cd ecommerce-backend/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **stripe** - Payment processing
- **cloudinary** - Image hosting
- **nodemailer** - Email sending
- **cors** - Cross-origin support
- **dotenv** - Environment variables
- **express-fileupload** - File upload handling
- **cookie-parser** - Cookie management

### Step 3: Create .env File

In the `backend` folder, create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Stripe Configuration
STRIPE_API_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Gmail)
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Step 4: Setup MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file as `MONGODB_URL`

---

## ▶️ Running the Project

### Development Mode (with Hot Reload)

```bash
npm start
```

This uses **nodemon** to automatically restart the server when files change.

### Production Mode

```bash
node server.js
```

**Expected Output:**

```
server is running on port: 3001
```

Once running, your API will be available at: `http://localhost:3001`

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3001`

All protected endpoints require a **JWT token** in the `Authorization` header or as a cookie.

---

## 🔐 Authentication Routes

### `POST /api/auth/register`

**Description:** Register a new user  
**Auth:** Not required  
**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** User created with JWT token

---

### `POST /api/auth/login`

**Description:** Login existing user  
**Auth:** Not required  
**Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** JWT token and user details

---

### `GET /api/auth/logout`

**Description:** Logout user (clear cookies)  
**Auth:** Required  
**Response:** Success message

---

### `GET /api/auth/me`

**Description:** Get current logged-in user profile  
**Auth:** Required  
**Response:** User profile details

---

### `POST /api/auth/update-profile`

**Description:** Update user profile information  
**Auth:** Required  
**Body:**

```json
{
  "name": "Updated Name",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

**Response:** Updated user details

---

### `POST /api/auth/change-password`

**Description:** Change user password  
**Auth:** Required  
**Body:**

```json
{
  "oldPassword": "currentPassword",
  "newPassword": "newPassword123"
}
```

**Response:** Password updated successfully

---

### `POST /api/auth/send-otp`

**Description:** Send OTP to email for password reset  
**Auth:** Not required  
**Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:** OTP sent to email

---

### `POST /api/auth/verify-otp`

**Description:** Verify OTP sent to email  
**Auth:** Not required  
**Body:**

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:** OTP verified status

---

### `POST /api/auth/reset-password`

**Description:** Reset password using verified OTP  
**Auth:** Not required  
**Body:**

```json
{
  "email": "john@example.com",
  "newPassword": "newPassword123"
}
```

**Response:** Password reset successfully

---

## 📦 Product Routes

### `POST /api/product/create`

**Description:** Create a new product  
**Auth:** Required  
**Body:** (multipart/form-data)

```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50
}
```

**File:** Product image (uploaded to Cloudinary)  
**Response:** Created product with Cloudinary URL

---

### `GET /api/product/get-all`

**Description:** Get all products  
**Auth:** Required  
**Query Params:**

- `page` - Pagination page number
- `category` - Filter by category

**Response:** Array of all products with pagination

---

### `GET /api/product/get-product-by-id/:id`

**Description:** Get a specific product by ID  
**Auth:** Required  
**Params:** `id` - Product MongoDB ID  
**Response:** Single product details

---

### `PUT /api/product/update/:id`

**Description:** Update product details  
**Auth:** Required  
**Params:** `id` - Product MongoDB ID  
**Body:**

```json
{
  "name": "Updated Name",
  "price": 79.99,
  "stock": 30
}
```

**Response:** Updated product details

---

### `DELETE /api/product/delete/:id`

**Description:** Delete a product  
**Auth:** Required  
**Params:** `id` - Product MongoDB ID  
**Response:** Product deleted successfully

---

## 🛒 Order Routes

### `POST /api/order/place-order`

**Description:** Place a new order  
**Auth:** Required  
**Body:**

```json
{
  "items": [
    {
      "productId": "mongodb_id",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "totalPrice": 199.98,
  "shippingAddress": "123 Main St"
}
```

**Response:** Order created with order ID and status

---

### `GET /api/order/my-orders`

**Description:** Get all orders of logged-in user  
**Auth:** Required  
**Response:** Array of user's orders

---

### `GET /api/order/all`

**Description:** Get all orders (Admin)  
**Auth:** Required  
**Response:** Array of all orders in the system

---

### `GET /api/order/one/:id`

**Description:** Get a specific order by ID  
**Auth:** Required  
**Params:** `id` - Order MongoDB ID  
**Response:** Single order details with items

---

### `POST /api/order/update-status/:id`

**Description:** Update order status  
**Auth:** Required  
**Params:** `id` - Order MongoDB ID  
**Body:**

```json
{
  "status": "shipped"
}
```

**Response:** Updated order with new status

---

## 💳 Payment Routes

### `POST /api/payment/webhook`

**Description:** Stripe webhook for payment events  
**Auth:** Not required (Stripe signature verification)  
**Triggers:** - Payment successful

- Payment failed
- Refund processed

**Response:** Webhook processed

---

## 👨‍💼 Admin Routes

### `GET /api/admin/get-all-users`

**Description:** Get all users (Admin only)  
**Auth:** Required  
**Response:** Array of all users

---

### `DELETE /api/admin/delete-user/:id`

**Description:** Delete a user  
**Auth:** Required  
**Params:** `id` - User MongoDB ID  
**Response:** User deleted successfully

---

### `PUT /api/admin/update-user-role/:id`

**Description:** Update user role (Admin/User)  
**Auth:** Required  
**Params:** `id` - User MongoDB ID  
**Body:**

```json
{
  "role": "admin"
}
```

**Response:** User role updated

---

## 🛡️ Authentication & Authorization

### JWT Token Usage

Include JWT token in requests using either:

**Option 1: Authorization Header**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3001/api/auth/me
```

**Option 2: Cookies**

```bash
# Token automatically sent in cookies if set during login
```

### Middleware: isAuth.js

The `isAuth` middleware:

- Verifies JWT token from headers or cookies
- Extracts user ID from token
- Attaches user info to request object
- Denies access if token is invalid or expired

---

## 🛠️ Technologies Used

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| **Express.js** | Web framework           |
| **MongoDB**    | NoSQL database          |
| **Mongoose**   | MongoDB ODM             |
| **JWT**        | Secure authentication   |
| **Bcrypt**     | Password encryption     |
| **Stripe**     | Payment processing      |
| **Cloudinary** | Image hosting & CDN     |
| **Nodemailer** | Email service           |
| **CORS**       | Cross-origin requests   |
| **Nodemon**    | Development auto-reload |

---

## 🏗️ Project Architecture

```
Client Request
    ↓
Express Server (server.js)
    ↓
Routes (routes/)
    ↓
Controllers (controllers/) - Business Logic
    ↓
Middleware (middleware/) - Authentication & Validation
    ↓
Models (models/) - MongoDB Schemas
    ↓
Database (MongoDB)
    ↓
External Services (Cloudinary, Stripe, Email)
```

### Data Flow Example: Create Product

1. **Client** sends POST to `/api/product/create`
2. **Route** receives request and passes to controller
3. **Middleware** (`isAuth`) verifies JWT token
4. **Controller** validates data and processes image upload
5. **Cloudinary** stores image and returns URL
6. **Model** saves product to MongoDB
7. **Response** sent back to client with product details

---

## 🔒 Security Features

✅ **Password Hashing** - Bcrypt for secure password storage  
✅ **JWT Tokens** - Secure token-based authentication  
✅ **CORS** - Controlled cross-origin access  
✅ **Middleware Protection** - Protected routes with `isAuth`  
✅ **Stripe Webhook Verification** - Signature validation for webhooks  
✅ **Environment Variables** - Sensitive data not in code  
✅ **OTP Verification** - Email-based OTP for password reset

---

## 📝 Environment Variables Summary

| Variable                | Description                         |
| ----------------------- | ----------------------------------- |
| `PORT`                  | Server port (default: 3001)         |
| `MONGODB_URL`           | MongoDB connection string           |
| `JWT_SECRET`            | JWT signing secret key              |
| `FRONTEND_URL`          | Frontend domain for CORS            |
| `STRIPE_API_KEY`        | Stripe secret key                   |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature secret            |
| `CLOUDINARY_NAME`       | Cloudinary account name             |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                  |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret               |
| `SENDER_EMAIL`          | Email for sending OTP/notifications |
| `SENDER_PASSWORD`       | Email app password                  |

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `MONGODB_URL not found`  
**Solution:** Check `.env` file and ensure `MONGODB_URL` is set correctly

**Issue:** `JWT is not valid`  
**Solution:** Ensure token is included in request headers or cookies

**Issue:** `Cloudinary upload fails`  
**Solution:** Verify Cloudinary credentials and cloud name

**Issue:** `Port 3001 already in use`  
**Solution:** Change PORT in `.env` or kill process using the port

---

## 📧 Contact & Support

- **Author:** Shiva Verma
- **License:** ISC
- **Version:** 1.0.0

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [JWT Guide](https://jwt.io/introduction)

---

**Last Updated:** March 2026  
**Status:** ✅ Production Ready
