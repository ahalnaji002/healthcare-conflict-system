# 🏥 Healthcare Conflict System

A smart healthcare follow-up and humanitarian support system designed for war injuries and chronic patients.

The platform connects:
- 👨‍⚕️ Doctors
- 🧑‍🤝‍🧑 Patients
- 🏢 NGOs
- 🛡️ Admins

to improve communication, treatment follow-up, emergency coordination, and humanitarian assistance management.

---

# ✨ Features

## 🔐 Authentication System
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Access

---

## 👥 User Roles

### 🧑 Patient
- Register/Login
- View treatment plans
- Request humanitarian support
- Track medical progress

### 👨‍⚕️ Doctor
- Manage patients
- Update treatment plans
- Monitor patient status

### 🏢 NGO
- Receive support requests
- Manage humanitarian cases
- Track request priorities

### 🛡️ Admin
- Add Doctors
- Add NGOs
- Manage all users
- System monitoring

---

# 🛠️ Technologies Used

## Frontend
- React.js
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- JWT
- bcrypt.js

## Database
- MySQL
- phpMyAdmin
- XAMPP

---

# 📁 Project Structure

```bash
healthcare-conflict-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md


⚙️ Installation:

1️⃣ Clone Repository
git clone https://github.com/ahalnaji002/healthcare-conflict-system.git

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Install Frontend Dependencies
cd ../frontend
npm install

🗄️ Database Setup
Start XAMPP
Run:
Apache
MySQL

Create Database
Open phpMyAdmin:
http://localhost/phpmyadmin

Create database:
healthcare_conflict_system

▶️ Run Project
Start Backend
cd backend
npm start

Backend runs on:
http://localhost:5000

Start Frontend
cd frontend
npm run dev

Frontend runs on:
http://localhost:5173

🔒 Protected Routes Example
GET /api/auth/profile

Requires:
Authorization: Bearer TOKEN

📌 Current Progress
✅ Backend Setup
✅ Frontend Setup
✅ MySQL Connection
✅ User Authentication
✅ JWT Protection
✅ Register Page
✅ Login Page
✅ API Integration
✅ UI Design

🚀 Future Features
Patient Dashboard
Doctor Dashboard
NGO Dashboard
Emergency Requests
Notifications System
Medical Reports
Real-time Chat
File Uploads
Multi-language Support

👨‍💻 Team Members
Ahmed Alnaji
Ahmed Shakshak
Jihad Alshannat
Khaled Adnan Alzeaq
Bayan Naseer Abu Naseer
Mahmoud Saeed Srour
Islam Alaa Elghalayini
Abdelrahman Hayel shat 

📄 License

This project is developed for educational and graduation project purposes.

❤️ Vision

Building a smart humanitarian healthcare platform to support injured and chronic patients in conflict areas through technology.
