<div align="center">

# ⚖️ Advokate
### Modern Role-Based Lawyer Hiring Platform

<img src="./public/home.png" alt="Advokate Banner" width="100%" />

<p align="center">
A modern MERN-based lawyer hiring platform that connects clients with professional lawyers through a secure, role-based marketplace.
</p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)
![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication-green?style=for-the-badge)

</div>

---
# 🌐 Live Demo

🔗 **https://advokate-client.vercel.app/**

---

# 📂 Source Code

[![Client Repository](https://img.shields.io/badge/Client-Repository-181717?style=for-the-badge&logo=github)](https://github.com/rohan-bhau/Advokate-client)

[![Server Repository](https://img.shields.io/badge/Server-Repository-181717?style=for-the-badge&logo=github)](https://github.com/rohan-bhau/Advokate-server)


---

# 📖 Project Overview

Advokate is a full-stack lawyer hiring marketplace where users can browse verified lawyers, send hiring requests, complete secure payments using Stripe, and leave reviews after successful hiring.

The platform provides three dedicated dashboards for **Users**, **Lawyers**, and **Admins**, ensuring secure role-based access and management of legal services.

---

# ✨ Core Features

## 👤 User Features

- Email & Google Authentication
- Better Auth Authentication System
- Update Profile
- Browse Verified Lawyers
- Advanced Search & Filtering
- View Lawyer Details
- Send Hiring Requests
- Pay Lawyers after Request Approval
- Stripe Payment Integration
- Hiring History
- Transaction History
- Review Lawyers
- Update Reviews
- Delete Reviews
- Responsive Dashboard

---

## ⚖️ Lawyer Features

- Lawyer Dashboard Overview
- Total Hires
- Pending Requests
- Revenue Overview
- Create Legal Service
- Edit Legal Service
- Delete Legal Service
- Request Admin Approval
- Accept Hiring Requests
- Reject Hiring Requests
- Mark Case as Won
- Hiring History
- Transaction History
- One-Time $149 Verification Payment

---

## 👑 Admin Features

- Dashboard Overview
- Analytics Dashboard
- Recent Activities
- Manage Users
- Change User Role
- Delete Users
- Approve Legal Profiles
- Reject Profile Requests
- Publish / Unpublish Services
- View All Transactions
- Monitor Lawyer Verification Payments

---

# 🚀 Additional Features

- Role-Based Authentication
- Protected Routes
- Better Auth
- Google Login
- JWT Session Management
- Stripe Payment Gateway
- Dynamic Dashboard
- Search & Filter
- Pagination
- Skeleton Loading
- Responsive Design
- Framer Motion Animations
- Toast Notifications
- Dark Mode Support
- Analytics Charts
- Review System
- Transaction Management

---

# 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- HeroUI
- Framer Motion
- Better Auth
- Stripe
- Recharts
- React Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB

---

# 📦 NPM Packages

## Main Dependencies

- better-auth
- @better-auth/mongo-adapter
- @stripe/stripe-js
- stripe
- next
- react
- react-dom
- mongodb
- framer-motion
- @heroui/react
- @heroui/styles
- react-hot-toast
- react-icons
- recharts
- next-themes
- @gravity-ui/icons

---

# 📁 Project Structure

```bash
src
│
├── app
├── components
├── hooks
├── lib
├── providers
├── services
├── types
├── utils
└── middleware.ts

public
│
├── home.png
└── assets
```

---

# 🔐 Authentication

- Email & Password Authentication
- Google Sign In
- Better Auth
- JWT Protected Routes
- Secure Session Management
- Role-Based Authorization

---

# 💳 Payment Flow

1. User sends hiring request.
2. Lawyer reviews the request.
3. Lawyer accepts or rejects the request.
4. After approval, the user can pay through Stripe.
5. Successful payment creates a transaction record.
6. User can review the lawyer after successful hiring.

---

# 📊 Dashboard Modules

## User Dashboard

- Profile Management
- Hiring History
- Payment History
- Transactions
- Reviews

---

## Lawyer Dashboard

- Dashboard Overview
- Manage Legal Profiles
- Hiring Requests
- Transactions
- Revenue Overview

---

## Admin Dashboard

- Dashboard Overview
- Analytics
- Manage Users
- Manage Lawyer Profiles
- Publish / Unpublish Profiles
- View All Transactions

---

# 🔒 Environment Variables

Create a `.env.local` file.

```env
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET

BETTER_AUTH_URL=YOUR_FRONTEND_URL

MONGO_URI=YOUR_MONGO_URI

MONGO_CLIENT_NAME=YOUR_MONGO_CLIENT_NAME

NEXT_PUBLIC_BASE_URL=YOUR_BACKEDN_URL

NEXT_PUBLIC_IMAGEBB_KEY=YOUR_IMAGEBB_KEY

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/rohan-bhau/Advokate-client.git
```

Move into the project

```bash
cd Advokate-client
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Start production server

```bash
npm start
```

---

# 🎯 Future Improvements

- Real-time Chat
- Video Consultation
- Lawyer Availability Calendar
- Email Notifications
- Advanced Analytics
- AI Legal Assistant
- Saved Lawyers
- Multi-language Support

---

# 👨‍💻 Author

## MD Rohan Mia

**MERN Stack Developer**

### GitHub

https://github.com/rohan-bhau

---

# 🌟 Support

If you like this project, don't forget to ⭐ the repository.

---

<div align="center">

### Built with ❤️ using Next.js, TypeScript, Better Auth, MongoDB & Stripe

</div>
