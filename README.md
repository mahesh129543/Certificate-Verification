🎓 Certificate Verification System

A secure and efficient web application designed to streamline the process of issuing and verifying internship certificates. This system allows administrators to bulk upload student data and enables students to verify their credentials instantly using a unique Certificate ID.

🚀 Features

🔐 For Administrators (Institution/Company)

Secure Login: Role-based authentication using JWT.

Bulk Upload: Upload student data via Excel (.xlsx) sheets effortlessly.

Data Validation: Automatic validation of data to prevent duplicates and errors.

Dashboard: A clean interface to manage uploads.

🎓 For Students (Users)

User Registration & Login: Create a secure account to access the portal.

Instant Verification: Verify internship details by entering a unique Certificate ID.

Digital Certificate: View a generated digital certificate with a professional design.

PDF Download: Download the official certificate as a high-quality PDF.

Profile Management: View profile details (Name/Email) via a secure badge.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS (for styling), Axios

Backend: Node.js, Express.js

Database: MongoDB (Atlas Cloud)

Authentication: JWT (JSON Web Tokens), BCrypt.js

Tools: * xlsx (Excel Parsing)

html2canvas & jspdf (PDF Generation)

multer (File Handling)

📂 Project Structure

certificate-verification-system/
│
├── backend/                 # Node.js & Express Server
│   ├── models/              # Mongoose Models (User, Admin, Certificate)
│   ├── routes/              # API Routes (Auth, Certificate Upload/Verify)
│   ├── middleware/          # Auth Middleware
│   └── server.js            # Entry Point
│
└── frontend/                # React.js Client
    ├── src/
    │   ├── components/      # Reusable Components (CertificateTemplate)
    │   ├── pages/           # Pages (Home, Login, Register, AdminDashboard)
    │   └── App.jsx          # Main App Component


⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

1. Clone the Repository

git clone [https://github.com/your-username/certificate-verification-system.git](https://github.com/your-username/certificate-verification-system.git)
cd certificate-verification-system


2. Backend Setup

Navigate to the backend folder and install dependencies.

cd backend
npm install


Create a .env file in the backend folder and add your credentials:

DB_URL=mongodb+srv://<your-db-username>:<your-db-password>@cluster.mongodb.net/certificateDB
JWT_SECRET=your_super_secret_key_here
PORT=5000


Start the Backend Server:

npm run dev


3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies.

cd frontend
npm install


Start the React Application:

npm run dev


The app will run on http://localhost:5173.

📝 Usage Guide

Register an Admin Account:

Go to /register, select "Admin" role, and create an account.

Upload Data:

Login as Admin.

Upload an Excel file with columns: Certificate ID, Student Name, Internship Domain, Start Date, End Date.

Verify Certificate:

Go to /register, create a "Student" account.

Login and enter a valid Certificate ID (e.g., CERT101).

View and download the certificate.

🤝 Contributing

Contributions are welcome! If you'd like to improve this project, feel free to fork the repository and submit a pull request.

📞 Contact

Created by Alok kumar. 📧 Email: alokkumarpatel13@gmail.com

🔗 LinkedIn: www.linkedin.com/in/alok-kumar-n121023

Developed during my internship at Amdox Technology.
