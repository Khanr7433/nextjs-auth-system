# 🔐 Next.js Authentication System

A comprehensive full-stack authentication system built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. This project demonstrates modern web development practices and implements a complete user authentication flow with email verification and password reset function.

## 🚀 Live Demo

[View Live Demo](https://nextjs-auth-system-phi.vercel.app/)

## ✨ Features

### 🔒 Authentication & Security

- **User Registration & Login** - Secure user authentication with JWT tokens
- **Email Verification** - Account activation through email verification
- **Password Reset** - Forgot password functionality with email-based reset
- **Protected Routes** - Middleware-based route protection
- **Password Hashing** - Secure password storage using bcryptjs
- **HTTP-Only Cookies** - Secure token storage in HTTP-only cookies

### 🎨 User Experience

- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Toast Notifications** - Real-time feedback with react-hot-toast
- **Loading States** - Smooth user experience with loading indicators
- **Form Validation** - Client-side validation for better UX
- **Profile Management** - User profile viewing and management

### 🏗️ Technical Features

- **TypeScript** - Full type safety across the application
- **MongoDB Integration** - Robust database operations with Mongoose
- **API Routes** - RESTful API endpoints with Next.js App Router
- **Middleware** - Route protection and authentication checks
- **Email Service** - Automated email sending with Nodemailer
- **Modern Tooling** - ESLint, Prettier, and Turbopack for development

## 📁 Project Structure

```
nextjs-auth-system/
├── src/
│   ├── app/                      # App Router pages and API routes
│   │   ├── api/                  # API endpoints
│   │   │   └── users/            # User-related API routes
│   │   │       ├── signup/       # User registration
│   │   │       ├── login/        # User authentication
│   │   │       ├── logout/       # User logout
│   │   │       ├── verifyEmail/  # Email verification
│   │   │       ├── forgotPassword/ # Password reset request
│   │   │       ├── resetPassword/  # Password reset
│   │   │       └── getUser/      # Get user profile
│   │   ├── login/                # Login page
│   │   ├── signup/               # Registration page
│   │   ├── profile/              # User profile pages
│   │   │   └── [id]/             # Dynamic user profile
│   │   ├── verifyEmail/          # Email verification page
│   │   ├── forgotPassword/       # Forgot password page
│   │   ├── resetPassword/        # Reset password page
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── db/
│   │   └── db.ts                 # MongoDB connection logic
│   ├── helpers/
│   │   ├── mailer.ts            # Email service utilities
│   │   └── grtDataFromToken.ts  # JWT token utilities
│   ├── model/
│   │   └── userModel.ts         # Mongoose user schema
│   └── middleware.ts            # Route protection middleware
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React version
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling

### Authentication & Security

- **[JSON Web Tokens](https://jwt.io/)** - Stateless authentication
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing
- **[Nodemailer](https://nodemailer.com/)** - Email service

### Development Tools

- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed on your machine
- **MongoDB** database (local or cloud)
- **Email service** credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Khanr7433/nextjs-auth-system.git
   cd nextjs-auth-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB Configuration
   MONGO_DB_URI=mongodb://localhost:27017
   # or for MongoDB Atlas:
   # MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net
   DATABASE_NAME=nextjs-auth-system

   # JWT Secret
   TOKEN_SECRET=your-super-secret-jwt-key

   # Email Configuration (Example with Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Application URL
   DOMAIN=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 API Endpoints

### Authentication Routes

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| `POST` | `/api/users/signup`  | Register new user        |
| `POST` | `/api/users/login`   | User login               |
| `GET`  | `/api/users/logout`  | User logout              |
| `GET`  | `/api/users/getUser` | Get current user profile |

### Email & Password Routes

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| `POST` | `/api/users/verifyEmail`    | Verify user email      |
| `POST` | `/api/users/forgotPassword` | Request password reset |
| `POST` | `/api/users/resetPassword`  | Reset user password    |

## 🔐 Authentication Flow

### Registration Process

1. User fills registration form
2. Password is hashed using bcryptjs
3. User data saved to MongoDB
4. Verification email sent
5. User clicks email link to verify account

### Login Process

1. User provides credentials
2. Password verified against hash
3. JWT token generated and stored in HTTP-only cookie
4. User redirected to profile page

### Password Reset Process

1. User requests password reset
2. Reset token generated and emailed
3. User clicks reset link
4. New password set and token invalidated

## 🛡️ Security Features

- **Password Hashing**: All passwords encrypted with bcryptjs
- **JWT Tokens**: Stateless authentication with HTTP-only cookies
- **Route Protection**: Middleware prevents unauthorized access
- **Input Validation**: Server-side validation for all inputs
- **Token Expiration**: Automatic token expiry for security
- **CSRF Protection**: HTTP-only cookies prevent XSS attacks

## 📱 Pages & Features

### Public Pages

- **Home (`/`)** - Landing page
- **Login (`/login`)** - User authentication
- **Signup (`/signup`)** - User registration
- **Forgot Password (`/forgotPassword`)** - Password reset request
- **Reset Password (`/resetPassword`)** - Password reset form
- **Verify Email (`/verifyEmail`)** - Email verification

### Protected Pages

- **Profile (`/profile`)** - User dashboard
- **User Profile (`/profile/[id]`)** - View specific user profile

## 🎯 Learning Objectives Achieved

Through building this project, I've learned:

### Next.js 15 Features

- ✅ App Router and file-based routing
- ✅ Server and Client Components
- ✅ API Routes with route handlers
- ✅ Middleware for request/response handling
- ✅ Dynamic routing with parameters
- ✅ Turbopack for faster development

### Authentication Concepts

- ✅ JWT token implementation
- ✅ Password hashing and security
- ✅ Email verification workflow
- ✅ Route protection strategies
- ✅ Session management with cookies

### Database Integration

- ✅ MongoDB setup and connection
- ✅ Mongoose schema design
- ✅ CRUD operations
- ✅ Data validation and constraints

### TypeScript Implementation

- ✅ Type definitions for APIs
- ✅ Interface design for data models
- ✅ Type-safe component development
- ✅ Error handling with types

### Modern Development Practices

- ✅ Environment variable management
- ✅ Error handling and validation
- ✅ Code organization and structure
- ✅ Security best practices
- ✅ Email service integration

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Set Environment Variables**
   Add all variables from `.env.local` to Vercel's environment settings.

### Other Deployment Options

- **Netlify** - Alternative serverless platform
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Rashid Khan**

- GitHub: [@Khanr7433](https://github.com/Khanr7433)
- Email: khan.rashid.7433@gmail.com.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guides
- [Vercel](https://vercel.com) - Deployment platform
- [MongoDB](https://www.mongodb.com) - Database solution
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

⭐ **If you found this project helpful, please give it a star!** ⭐
