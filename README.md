# 🏥 Healthcare Conflict System

A full-stack healthcare management platform designed to support patients affected by wars and humanitarian crises.

The system connects **Patients**, **Doctors**, **NGOs**, and **Administrators** in one centralized platform to improve medical follow-up, emergency response, and humanitarian assistance management.

---

# 🌟 Main Features

## 🔐 Authentication & Security
- Secure Login & Registration
- Email Verification
- JWT Authentication
- Role-Based Authorization
- Protected API Routes
- Password Validation
- Forgot Password Support

---

# 👥 User Roles

## 🧑 Patient
- Create an account
- Verify email
- View treatment plans
- Track medical progress
- Send emergency alerts
- Request humanitarian assistance
- Chat with assigned doctor
- Manage personal profile

---

## 👨‍⚕️ Doctor
- View assigned patients
- Access patient medical records
- Update treatment plans
- Receive emergency alerts
- Manage critical cases
- Communicate with patients
- Update personal profile

---

## 🏢 NGO
- Review humanitarian assistance requests
- Prioritize emergency cases
- Manage available resources
- View reports
- Update organization profile

---

## 🛡️ Administrator
- Dashboard with live statistics
- Manage all users
- Review Join Requests
- Approve / Reject registrations
- Activate / Suspend accounts
- Manage emergency alerts
- Assign patients to doctors
- View medical records
- Review reports
- Monitor system activity logs

---

# 🚨 Emergency Alert System

The platform includes a real-time emergency reporting module.

Features include:

- Share GPS location
- Manual location entry
- Emergency description
- Mobile number collection
- Instant alert submission
- Admin notification
- Doctor assignment
- Doctor-specific emergency dashboard
- Emergency status management
- Visual emergency notifications

---

# 📋 Humanitarian Assistance Module

Patients can request humanitarian assistance.

Administrators and NGOs can:

- Review requests
- Assign priorities
- Track request status
- Manage humanitarian support

---

# 💻 Technologies Used

## Frontend
- React.js
- Vite
- React Router
- Axios
- CSS3
- Material Symbols

---

## Backend
- Node.js
- Express.js
- JWT
- bcrypt.js
- Nodemailer

---

## Database
- MySQL
- phpMyAdmin
- XAMPP

---

# 📂 Project Structure

```text
healthcare-conflict-system
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── database
│   ├── uploads
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── layouts
│       ├── pages
│       │   ├── admin
│       │   ├── doctor
│       │   ├── ngo
│       │   ├── patient
│       │   └── public
│       ├── services
│       ├── styles
│       ├── App.jsx
│       └── main.jsx
│
├── database
│   └── healthcare_schema.sql
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ahalnaji002/healthcare-conflict-system.git
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd ../frontend
npm install
```

---

# 🗄️ Database Setup

1. Start **Apache** and **MySQL** using XAMPP.

2. Open phpMyAdmin.

```
http://localhost/phpmyadmin
```

3. Create database

```
healthcare_conflict_system
```

4. Import

```
database/healthcare_schema.sql
```

---

# ▶️ Running the Project

## Backend

```bash
cd backend
npm start
```

Runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🔐 API Protection

Most APIs require JWT authentication.

Example:

```
GET /api/auth/profile
```

Header

```
Authorization: Bearer <TOKEN>
```

---

# 📊 Current Implementation

## Authentication

- ✅ Login
- ✅ Patient Registration
- ✅ Join Request
- ✅ Email Verification
- ✅ Forgot Password
- ✅ JWT Authentication

### Patient

- ✅ Dashboard
- ✅ Medical Progress
- ✅ Treatment Plan
- ✅ Assistance Requests
- ✅ Emergency Alerts
- ✅ Chat
- ✅ Profile

### Doctor

- ✅ Dashboard
- ✅ Assigned Patients
- ✅ Medical Records
- ✅ Treatment Updates
- ✅ Emergency Cases
- ✅ Chat
- ✅ Profile

### NGO

- ✅ Dashboard
- ✅ Humanitarian Requests
- ✅ Resource Management
- ✅ Reports
- ✅ Profile

### Administrator

- ✅ Dashboard
- ✅ User Management
- ✅ Join Requests
- ✅ Emergency Management
- ✅ Medical Records
- ✅ Reports
- ✅ Activity Logs
- ✅ System Settings
- ✅ Doctor Assignment

---

# 🚀 Planned Improvements

- Real-time notifications (Socket.IO)
- Video consultation
- AI-assisted triage
- Multi-language support
- SMS notifications
- Mobile application
- Analytics Dashboard

---

# 👨‍💻 Development Team

- Ahmed Alnaji
- Ahmed Shakshak
- Jehad Alshannat
- Khaled Adnan Alzeaq
- Bayan Naseer Abu Naseer
- Mahmoud Saeed Srour
- Islam Alaa Elghalayini
- Abdelrahman Hayel Shat

---

# 📄 License

This project was developed for educational and graduation project purposes.

---

# ❤️ Vision

Our vision is to build a secure, scalable, and intelligent healthcare platform that improves communication between healthcare providers, humanitarian organizations, and patients affected by conflicts, ensuring faster medical response and better continuity of care.
