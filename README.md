# AI E-Commerce Recommendation Platform

An AI-powered full-stack E-Commerce platform built using React, Node.js, Express, PostgreSQL, and Google Gemini AI.

The platform provides intelligent shopping assistance through AI-powered product recommendations, product comparison, review summarization, and personalized suggestions while supporting complete e-commerce functionality such as authentication, cart management, wishlist, orders, reviews, and admin product management.

---

## Live Demo

Frontend: [`https://ai-e-commerce-recommendation-agent.vercel.app/`](https://ai-e-commerce-recommendation-agent.vercel.app/)

Backend API: [`https://ai-e-commerce-recommendation-agent.onrender.com](https://ai-e-commerce-recommendation-agent.onrender.com/)'

---

## Features

### User Features

* User Registration & Login
* JWT Authentication
* Profile Management
* Product Browsing
* Product Details Page
* Product Reviews & Ratings
* Wishlist Management
* Shopping Cart
* Order Placement
* Order History
* Order Details

### AI Features

* AI Shopping Assistant
* AI Product Comparison
* AI Review Summarization
* AI Personalized Recommendations

### Admin Features

* Admin Dashboard
* View Users
* View Orders
* View Reviews
* Add Products
* Edit Products
* Delete Products

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt

### Database

* PostgreSQL
* Neon Database

### AI Integration

* Google Gemini API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Structure

```text
AI-E-commerce-Recommendation-Agent

├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── styles
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── database
│   ├── services
│   ├── schema.sql
│   ├── seed.sql
│   └── server.js
│
└── README.md
```

---

## Database Schema

Main Tables:

* users
* products
* orders
* order_items
* reviews
* wishlist
* categories

Schema setup is available in:

```text
backend/schema.sql
```

Sample data:

```text
backend/seed.sql
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AI-E-commerce-Recommendation-Agent.git

cd AI-E-commerce-Recommendation-Agent
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key

GEMINI_API=your_gemini_api_key
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Configure API URL

```js
baseURL: "http://localhost:3000/api"
```

Run Frontend

```bash
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

### Products

```http
GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```

### Reviews

```http
GET /api/review

POST /api/review/products
```

### Orders

```http
GET /api/orders

GET /api/orders/:id

POST /api/orders
```

### Wishlist

```http
GET /api/wishlist

POST /api/wishlist

DELETE /api/wishlist/:id
```

### AI Routes

```http
POST /api/ai/shopping-assistant

POST /api/ai/compare

GET /api/ai/personalized

GET /api/ai/review-summary/:id
```

---

## AI Functionality

### AI Shopping Assistant

Users can ask shopping-related questions and receive AI-generated answers.

### AI Product Comparison

Compare two products using AI-generated insights.

### AI Review Summary

Summarizes customer reviews into concise insights.

### Personalized Recommendations

Analyzes user behavior and preferences to generate personalized product suggestions.

---

## Security Features

* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes
* Admin Authorization Middleware
* PostgreSQL Parameterized Queries
* Environment Variables

---

## Future Improvements

* Product Images Upload
* Category Filtering
* Pagination UI
* Payment Gateway Integration
* Dark Mode
* Email Notifications
* Admin Analytics Dashboard
* Product Search Autocomplete

---

## Author

**Priyanshu Kumawat**

B.Tech Electrical Engineering Student

GitHub: `(https://github.com/PRIYANSHUKUMAWAT1906)`

LinkedIn: `(https://www.linkedin.com/in/priyanshu-kumawat-73b569322/)`

Portfolio:`(https://my-portfolio-oj4w.onrender.com/)`
---

## License

This project is developed for learning, portfolio, and educational purposes. 🚀

---

