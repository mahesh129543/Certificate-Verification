# 🎓 Certificate Verification System

A secure and efficient web application designed to simplify the process of issuing and verifying internship certificates.

The system allows administrators to upload student data in bulk and enables students to instantly verify their certificates using a unique Certificate ID.

---

## 🚀 Features

### 🔐 Administrator Module

* Secure Login with JWT authentication
* Bulk upload student data using Excel (.xlsx) files
* Automatic data validation to prevent duplicates and errors
* Dashboard for managing certificate uploads

### 🎓 Student Module

* User Registration & Login
* Instant certificate verification using Certificate ID
* Digital certificate generation with professional design
* Download certificate as PDF
* Secure profile access

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Authentication:** JWT, BCrypt.js

**Tools & Libraries:**

* xlsx (Excel parsing)
* html2canvas & jspdf (PDF generation)
* multer (file handling)

---

## 📂 Project Structure

```
certificate-verification-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
```


---

## 📝 Usage

1. Register as Admin
2. Login and upload Excel file containing certificate data
3. Register as Student
4. Enter Certificate ID to verify and download certificate

---
