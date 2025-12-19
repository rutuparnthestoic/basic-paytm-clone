# Paytm Clone

A simple payment application clone that allows users to sign up, sign in, view their balance, search for other users, and transfer money.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Features

- **User Authentication:** Secure Signup and Signin pages.
- **Dashboard:** View current account balance.
- **User Search:** Search for other users by name.
- **Money Transfer:** Consistent money transfer implemented using Transactions in MongoDB. 
- **Responsive Design:** Optimized for mobile and desktop.
- **Toast Notifications:** Real-time feedback for actions.

## 🛠️ Local Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone <repository-url>
cd paytm
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
node index.js
```

### 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

## 📦 Deployment

This project is configured for deployment on **Vercel**.

### Backend Deployment
1. Push the `backend` folder to a GitHub repository.
2. Import the project into Vercel.
3. Set the Environment Variables (`MONGODB_URI`, `JWT_SECRET`) in the Vercel dashboard.
4. Deploy.

### Frontend Deployment
1. Push the `frontend` folder to a GitHub repository.
2. Import the project into Vercel.
3. Set the Environment Variable `VITE_BACKEND_URL` to your deployed backend URL (e.g., `https://your-backend.vercel.app`).
4. Deploy.

## 📂 Project Structure

```
paytm/
├── backend/          # Express server and database logic
│   ├── routes/       # API routes
│   ├── db.js         # Database schema and connection
│   ├── config.js     # Configuration (JWT Secret)
│   └── index.js      # Entry point
├── frontend/         # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   └── App.jsx     # Main application component
│   └── vite.config.js
└── README.md
```

