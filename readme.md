# 🏠 StayFinder – Airbnb Clone (Internship Project)

StayFinder is a full-stack web application inspired by Airbnb. It allows users to list, browse, and book short- and long-term properties. This project was built as part of an internship assignment to showcase full-stack development skills, covering everything from authentication to payment integration.

---

## 🚀 Tech Stack

### Frontend

- **React.js**
- **Tailwind CSS** (with [shadcn/ui](https://ui.shadcn.com/))
- **Vite** (for fast development)
- **Axios** for API calls

### Backend

- **Node.js + Express**
- **JWT** and **session-based authentication**
- **bcrypt** for password hashing
- **Stripe** for mock payment integration

### Database

- **MongoDB** (via Mongoose ODM)

### Hosting

- **Frontend**: Deployed on [Vercel](https://vercel.com/)
- **Backend**: Deployed on [Render](https://render.com/)

---

## ✅ Features

### 👥 Authentication

- Register and login with form validation
- JWT-based auth and secure session handling
- Passwords hashed using bcrypt

### 🏘 Property Listings

- View all listings on the homepage
- Detailed listing page with images, description, calendar availability
- Hosts can create, update, or delete their listings (CRUD)

### 📅 Bookings

- Users can book properties
- Booking information saved to database

### 🔍 Search & Filters (Bonus)

- Filter properties by location, price range, and availability dates
- Search bar with real-time results

### 💳 Mock Payment Integration (Bonus)

- Stripe mock checkout implemented

---

## 📸 Screenshots

![alt text](/doc/image.png)
![alt text](/doc/image-1.png)
![alt text](/doc/image-2.png)
![alt text](/doc/image-3.png)
![alt text](/doc/image-4.png)

---

## 🧠 Unique Additions

While the app follows Airbnb's core model, here are some enhancements I would suggest if taken further:

1. **Split-Stay Booking** – Automatically find and suggest split stays if a property isn’t available for the full range.
2. **AI-Powered Recommendations** – Suggest local activities/events based on location and booking dates.

---

## 🔐 Security

- **JWT access tokens** with expiration to handle user sessions.
- **Hashed passwords** using bcrypt to protect user credentials.
- Backend API protected via middleware to ensure only authenticated users access protected routes.
- Frontend input validation and sanitized backend inputs to prevent injection attacks.

---

## 📈 Scalability Plan

To scale StayFinder:

- **Database Scaling**: Use MongoDB Atlas with sharding and replication.
- **Load Balancing**: Deploy the backend behind a load balancer (e.g., NGINX, AWS ELB).
- **Microservices**: Split payment, auth, and booking into microservices as the system grows.
- **Caching**: Use Redis to cache frequently accessed data like listings.
- **CDN**: Deliver static images and assets via a CDN like Cloudflare or AWS CloudFront.

---

## 🧪 Seed Data

Seeded database with sample users, listings, and bookings for testing purposes.

---

## 💻 Comfort Level

Yes, I’m fully comfortable working on both frontend and backend. If provided with UI designs (e.g., from Figma), I can accurately translate them into responsive, production-ready code.

---

## 🌐 Live Demo

- **Frontend**: [stayfinder-frontend.vercel.app](https://stayfinder-frontend.vercel.app)
- **Backend**: [stayfinder-api.onrender.com](https://stayfinder-api.onrender.com)
