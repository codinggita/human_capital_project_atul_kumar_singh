# 🏗️ Human Capital Backend API

A comprehensive RESTful API built with **Node.js, Express, and MongoDB** to manage and analyze a global economic dataset of 190,332 records across 210 countries.

## 🚀 Features

- **Complete CRUD Operations:** Endpoints to create, read, update, and delete price indices.
- **Advanced Querying & Filtering:** Dynamic filter builder supporting `?year=`, `?country=`, `?month=`, etc.
- **Aggregation & Analytics:** Dedicated `/stats` and `/compare` routes utilizing MongoDB aggregation pipelines (`$group`, `$bucket`, etc.).
- **Robust Authentication:** Secure JWT-based authentication with bcrypt password hashing and Role-Based Access Control (RBAC).
- **Security & Validation:** Request rate-limiting (via `express-rate-limit`), input validation (via `express-validator`), and a centralized error handling middleware.
- **Optimized Performance:** Compound database indexing and paginated list endpoints.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT, bcryptjs, express-rate-limit

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Cluster (e.g., MongoDB Atlas)

### 1. Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/atulXdev/human_capital_project_atul_kumar_singh.git
cd human_capital_project_atul_kumar_singh/backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory (or copy the provided `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/human_capital
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Database Seeding
To populate the database with the initial dataset, ensure you have the `human_capital_project.json` file in the `backend/` directory, then run the seed script:
```bash
npm run seed
```
*(Note: The JSON file is large and should be added to `.gitignore` to prevent committing it.)*

### 4. Running the Server
Start the development server:
```bash
npm run dev
```
The API will be available at `http://localhost:5000/api/v1`.

## 📚 API Endpoints Overview

| Category | Endpoints | Description |
|---|---|---|
| **Health** | `GET /api/v1/health` | Check server status |
| **Prices** | `GET /api/v1/prices` | Fetch prices with pagination |
| | `POST /api/v1/prices` | Create a new price record |
| | `GET /api/v1/prices/:id` | Get specific price |
| **Search** | `GET /api/v1/search/prices?q=...` | Full-text and regex searches |
| **Stats** | `GET /api/v1/stats/value-distribution`| Get aggregated distribution stats |
| **Compare** | `GET /api/v1/compare?country1=IND&country2=USA` | Compare countries |
| **Auth** | `POST /api/v1/auth/register` | Register new user |
| | `POST /api/v1/auth/login` | Login for JWT token |

*Note: For the full detailed list of routes and parameters, please import the Postman collection.*

## 📬 Postman Collection
A complete Postman collection is provided in the `postman/` directory of the project. Import `Human_Capital_API.postman_collection.json` into Postman to explore and test all available endpoints easily.
