# Linx - Modern Job Portal

A full-stack job portal application built with React, Node.js, and MongoDB. Connect job seekers with employers through a modern, responsive platform.

## 🚀 Features

### For Job Seekers

- **Browse Jobs**: Search and filter job listings
- **Apply for Jobs**: Easy application process
- **Save Jobs**: Bookmark interesting positions
- **Profile Management**: Create and manage your professional profile
- **Dashboard**: Track applications and job search progress

### For Employers

- **Post Jobs**: Create detailed job listings
- **Manage Applications**: Review and manage job applications
- **Company Dashboard**: Monitor job posting performance
- **Candidate Search**: Find qualified candidates

### Technical Features

- **Modern UI**: Built with Tailwind CSS and Framer Motion
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live job listings and applications
- **Authentication**: Secure user authentication and authorization
- **3D Elements**: Interactive Spline 3D models

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation
- **Spline** - 3D elements

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/Linx.git
   cd Linx
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   Create `.env` file in the backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. **Start the application**

   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both frontend and backend servers:

   - Frontend: http://localhost:5173 (or next available port)
   - Backend: http://localhost:3000

## 🎯 Quick Start

### Test the Application

1. **Visit the homepage**: http://localhost:5173
2. **Test registration**: Create a new account
3. **Test job posting**: Use the test job posting form
4. **Browse jobs**: View posted job listings

### Test Routes (No Authentication Required)

- **Homepage**: `/`
- **Test Post Job**: `/post-job-test`
- **View Jobs**: `/view-jobs`
- **CSS Test**: `/simple-css-test`
- **Dashboard Test**: `/dashboard-test`

### Protected Routes (Requires Authentication)

- **Dashboard**: `/dashboard`
- **Post Job**: `/post-job`
- **Profile**: `/profile`

## 📁 Project Structure

```
Linx/
├── backend/                 # Backend server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── views/          # Legacy views
│   │   └── App.jsx         # Main app component
│   └── package.json
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
# Root directory
npm run dev          # Start both frontend and backend
npm run build        # Build frontend for production

# Backend directory
npm run start        # Start backend server
npm run dev          # Start with nodemon

# Frontend directory
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Database Schema

#### User Model

```javascript
{
  username: String (required),
  email: String (required),
  password: String (required),
  name: String (required),
  role: String (user/employer/dev/admin),
  createdAt: Date
}
```

#### Job Model

```javascript
{
  title: String (required),
  description: String (required),
  location: String,
  category: String,
  company: String,
  salary: String,
  requirements: String,
  postedBy: ObjectId (ref: User),
  createdAt: Date
}
```

## 🚀 Deployment

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend Deployment

1. Set up environment variables
2. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name** - [GitHub](https://github.com/YourUsername)

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful styling
- Framer Motion for smooth animations
- Spline for 3D elements
- MongoDB Atlas for database hosting

---

**Linx** - Connecting talent with opportunity 🚀
