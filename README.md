# Human Capital Project

Welcome to the **Human Capital** project! This repository contains a full-stack web application designed to analyze, visualize, and manage comprehensive human capital datasets (containing 190k+ records). The application is split into a **Frontend** (React + Vite) and a **Backend** (Node.js + Express + MongoDB).

## 📁 Repository Structure

This repository strictly contains only the following components:

- `frontend/` - The React application built with Vite and Recharts.
- `backend/` - The Node.js and Express RESTful API.
- `README.md` - This file.

---

## 🎨 Frontend

The frontend is a modern, responsive, and highly visual dashboard built to provide insights into human capital trends, statistics, and analytics.

### Technologies Used
- **React 19**: Component-based UI library.
- **Vite**: Ultra-fast build tool and development server.
- **React Router DOM**: Client-side routing for seamless navigation.
- **Recharts**: For rendering dynamic and interactive data visualizations.
- **CSS Variables**: For an elegant design system and dark theme implementation.

### Features
- **Analytics Dashboard**: Interactive charts and statistics for visualizing human capital data.
- **Data Binding & Real-time Search**: Debounced API queries for real-time search functionality.
- **Responsive Layout**: Modern, sleek dark mode UI with a fully accessible navigation shell.

### Getting Started (Frontend)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## ⚙️ Backend

The backend provides a robust and secure RESTful API that serves the frontend with data from a massive dataset.

### Technologies Used
- **Node.js & Express 5**: Server runtime and web framework.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM).
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Bcrypt.js**: For password hashing.
- **Express Validator**: For robust API payload validation.
- **Express Rate Limit**: To prevent brute-force attacks and manage API traffic.

### API Endpoints
The backend exposes multiple endpoints including, but not limited to:
- `GET /api/v1/health` - System health check.
- **Analytics & Trends**: Endpoints to fetch global stats, price trends, and data comparisons.
- **Search API**: Optimized endpoints for querying human capital metrics.
- **Authentication**: User login, registration, and session management.

*Note: The original dataset is ~48MB containing over 190,000 records. Please ensure MongoDB is properly configured before running the backend.*

### Getting Started (Backend)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Copy `.env.example` to `.env` (if provided) or create a `.env` file.
   - Set your `MONGO_URI`, `JWT_SECRET`, and `PORT`.
4. Run the development server (uses nodemon):
   ```bash
   npm run dev
   ```
5. Run in production mode:
   ```bash
   npm start
   ```

---

## 🚀 Deployment

- **Frontend**: Configured for seamless deployment on platforms like Vercel or Netlify.
- **Backend**: Configured for seamless deployment on platforms like Render or Heroku.

## 📄 License
This project is licensed under the ISC License.
