# 🎓 CollegeMart (CampusCart)

> A full-stack hyperlocal marketplace designed for college campuses. Buy, sell, and chat instantly with peers.

![CollegeMart Screenshot](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80) 
*(Replace this link with a real screenshot of your app once live)*

## 🚀 Features

- **🛍️ Campus Marketplace**: Buy and sell items specific to your college environment.
- **💬 Real-time Chat**: Integrated Socket.io messaging to negotiate deals instantly.
- **🔐 Secure Authentication**: JWT-based auth with encrypted passwords.
- **📱 Responsive Design**: Fully responsive UI built with React and TailwindCSS v4.
- **🏫 Campus Filtering**: (Planned) Filter items by Hostel or Department.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Deployment**: Vercel (Client) + Render (Server)

---

## 💻 How to Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yesaryann/CampusCart.git
cd CampusCart
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/collegemart  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_key_123
```

Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Or standard start
node index.js
```
*Server runs on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal, navigate to the client folder and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```
*Frontend runs on http://localhost:5173*

---

## 🌍 Deployment

This project is configured for seamless deployment.

### Backend (Render)
- **Repo**: Connect your GitHub repo to Render.
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Env Vars**: `MONGO_URI`, `JWT_SECRET`, `PORT=10000`

### Frontend (Vercel)
- **Repo**: Connect your GitHub repo to Vercel.
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Env Vars**: `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`

---

## 👨‍💻 Author

**Raj Aryan**
- [GitHub](https://github.com/yesaryann)
- [LinkedIn](https://www.linkedin.com/in/raj-aryan20/)

Made with ❤️ for Students.