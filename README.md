# 💰 Expense & Finance Tracker

A full-stack expense and income tracking application that helps users manage their personal finances.
Users can register, log in, record transactions, and view monthly summaries in a clean dashboard.

This project demonstrates **full-stack development**, **REST API design**, **authentication**, and **Dockerized deployment**.

---

## 🚀 Features

- User authentication (register & login)
- JWT-based authorization
- Add, edit, and delete income & expense transactions
- Categorized transactions
- Monthly income / expense / balance summary
- Responsive dashboard UI
- Dockerized full-stack setup (frontend + backend + database)

---

## 🧱 Tech Stack

### Frontend
- Next.js (Pages Router)
- React
- Axios
- CSS (custom, responsive)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT authentication
- bcrypt for password hashing

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```
expense-tracker/
│
├── frontend/               # Next.js frontend
│   ├── pages/
│   ├── lib/
│   ├── styles/
│   ├── Dockerfile
│   └── .dockerignore
│
├── backend/                # Node.js / Express API
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env.example
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

### `backend/.env`

```env
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_random_secret_here
PORT=4000
```

> ⚠️ Never commit `.env` files.
> Use `.env.example` as a reference.

---

## ▶️ Running the Project (Docker – Recommended)

### Prerequisites
- Docker
- Docker Compose

### Start the app

From the project root:

```bash
docker-compose up --build
```

### Services
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- MongoDB: internal Docker network

---

## ▶️ Running Without Docker (Local Development)

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 🔑 Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Backend issues a JWT token
4. Token is stored in `localStorage`
5. Token is sent in the `Authorization` header for protected requests

---

## 📊 API Overview

### Auth
- `POST /api/auth/register` – Create account
- `POST /api/auth/login` – Login

### Transactions
- `GET /api/transactions` – List transactions
- `POST /api/transactions` – Create transaction
- `PUT /api/transactions/:id` – Update transaction
- `DELETE /api/transactions/:id` – Delete transaction
- `GET /api/transactions/summary/monthly` – Monthly summary

---

## 🧪 Testing (Planned / Optional)

- Backend unit & integration tests (Jest + Supertest)
- Auth route validation
- Protected route access checks

---

## 🛠 Future Improvements

- Charts (pie & bar)
- Budget limits & alerts
- Recurring transactions
- CSV import/export
- Multi-currency support
- Dark mode
- Refresh tokens
- Pagination for transactions

---

## 📌 Why This Project?

This project was built to demonstrate:

- Real-world full-stack architecture
- Clean API separation
- Authentication & authorization
- Dockerized development workflow
- Production-ready project structure

It is suitable as a **portfolio project** for:
- Frontend roles
- Backend roles
- Full-stack roles
- Junior to mid-level positions

---

## 👤 Author

**Your Name**
GitHub: https://github.com/MaciejSzpetmanski

---

## 📄 License

This project is licensed under the MIT License.
