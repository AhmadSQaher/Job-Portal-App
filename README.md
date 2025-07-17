🧑‍💼 LINX Job Portal App
A full-stack job portal built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend. Users can sign up, browse jobs, and apply. Employers can post jobs and manage listings. Admins can oversee the platform.

🚀 Features
- 🔐 User authentication (JWT-based)
- 👤 Role-based dashboards: User, Employer, Admin
- 📄 Resume upload (via link)
- 🧭 Job posting and browsing
- 🛡️ Protected routes and access control
- 🌐 RESTful API with MongoDB

🛠️ Tech Stack
| Frontend | Backend | Database | 
| React + Vite | Node + Express | MongoDB | 
| Material UI | JWT Auth | Mongoose | 



📦 Installation
1. Clone the repo
git clone https://github.com/AhmadSQaher/Job-Portal-App.git
cd Job-Portal-App


2. Install dependencies
npm install --prefix backend
npm install --prefix frontend


3. Set up environment variables
Create a .env file in backend/:
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/linx


4. Seed the database (optional)
node backend/seed/seed.js


5. Run the app
npm run dev



📁 Folder Structure
job-portal-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
└── README.md



👨‍🏫 Author
Ahmad S. Qaher
COMP229-003 — Semester 5
Project: Full-Stack Job Portal