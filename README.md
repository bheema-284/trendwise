# 📊 Trendwise

**Trendwise** is a full-stack web application that combines a React frontend and a Node.js/Express backend. This project is organized into separate `frontend` and `backend` directories for ease of development and deployment.

---

## 📁 Project Structure

```
trendwise/
├── frontend/        # Frontend (React)
├── backend/         # Backend (Node.js, Express, MongoDB)

```

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

---

## 🖥️ Frontend - React (client)

### 📦 Install Dependencies

```bash
cd frontend
npm install
```

### 🏃‍♂️ Run Development Server

```bash
npm run dev
```

> The frontend runs on [http://localhost:5173](http://localhost:5173)

---

## 🔧 Backend - Node.js/Express (server)

### 📦 Install Dependencies

```bash
cd backend
npm install
```

### ⚙️ Set up Environment Variables

Create a `.env` file inside the `server/` directory with the following:

```env
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_email
GOOGLE_CLIENT_SECRET=your_google_id
CLIENT_URL=your_url
OPENAI_API_KEY=your_key
```

### 🏃‍♂️ Run Development Server

```bash
npm run dev
```

> The backend runs on [http://localhost:10000](http://localhost:10000)

---

## 🔗 API Endpoints

Base URL: `http://localhost:10000/api`

Example endpoints:

- `POST /auth/google` - Google OAuth login
- `GET /articles` - Fetch all articles
- `GET /api/article/:slug` - Fetch single article
- `POST /articles` - Create a new article
- `GET /api/comments/:slug` - Get comments for article
- `POST /api/generate` - Trigger ChatGPT article generation

(Modify based on your actual endpoints)

---

## 🌐 Deployment

You can deploy the frontend and backend separately on services like:

- **Frontend**: Vercel
- **Backend**: Render

Or deploy both using a full-stack platform like **Render**.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 👨‍💻 Author

**Bheema Guguloth**  
Built with ❤️ and MERN stack.
