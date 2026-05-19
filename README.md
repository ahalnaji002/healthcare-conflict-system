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
