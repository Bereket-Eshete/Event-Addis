# EventAddis 🎉

**A Centralized Event Discovery and Management Platform for Addis Ababa**

EventAddis connects event seekers and organizers in one place, providing a seamless experience to discover, register, and manage events happening across Addis Ababa. Built with modern full-stack architecture using Next.js, NestJS, MongoDB, TypeScript, and Tailwind CSS.

## 🌟 Features

### For Event Attendees
- **Event Discovery**: Browse and search events by category, type, location, and price
- **Smart Filtering**: Advanced search with multiple filters and sorting options
- **Secure Booking**: Book events with integrated Chapa payment processing
- **Digital Tickets**: Download and view tickets
- **Favorites System**: Save events for later viewing
- **User Dashboard**: Track bookings, payments, and event history
- **Notifications**: Get updates about events and bookings

### For Event Organizers
- **Event Management**: Create, edit, and manage events with rich details
- **Analytics Dashboard**: Track event performance, bookings, and revenue
- **Attendee Management**: View and manage event registrations
- **Payment Tracking**: Monitor payments and generate reports
- **Communication Tools**: Send announcements and messages to attendees
- **Image Upload**: Upload event banners with Cloudinary integration

### General Features
- **Authentication**: Email/password and Google OAuth login
- **Password Reset**: Secure password recovery system
- **Responsive Design**: Mobile-first design with dark/light themes
- **Role-based Access**: Separate interfaces for attendees and organizers

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **NestJS** - Node.js framework with TypeScript
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Authentication and authorization
- **Passport.js** - Google OAuth integration

- **Cloudinary** - Image upload and management
- **Chapa** - Payment processing for Ethiopia

## 🚀 Live Demo

- **Frontend**: [https://event-addis.vercel.app](https://event-addis.vercel.app)
- **Backend API**: [https://event-addis.onrender.com](https://event-addis.onrender.com)

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Google OAuth credentials

- Chapa account for payments
- Cloudinary account for images

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Event-Addis.git
cd Event-Addis
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Configure your `.env` file:
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/event-addis
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
FRONTEND_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
CHAPA_PUBLIC_KEY=your-chapa-public-key
CHAPA_SECRET_KEY=your-chapa-secret-key
```

Start the backend:
```bash
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local
```

Configure your `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Start the frontend:
```bash
npm run dev
```

## 🏗️ Project Structure

```
Event-Addis/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── events/         # Events management
│   │   ├── bookings/       # Booking system
│   │   ├── dashboard/      # Dashboard APIs
│   │   ├── notifications/  # Notification system
│   │   ├── uploads/        # File upload handling
│   │   └── schemas/        # MongoDB schemas
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── app/               # App Router pages
│   │   ├── (auth)/        # Authentication pages
│   │   ├── dashboard/     # Organizer dashboard
│   │   ├── (dashboard)/   # User dashboard
│   │   └── discover/      # Public event discovery
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and API calls
│   └── package.json
└── README.md
```

## 🔐 Authentication Flow

1. **Registration**: Users sign up as attendees or organizers
2. **Email Verification**: Brevo sends verification emails
3. **Login**: JWT-based authentication with Google OAuth option
4. **Role-based Routing**: Automatic redirection based on user role

## 💳 Payment Integration

- **Chapa Payment Gateway**: Secure payments for Ethiopian users
- **Payment Verification**: Automatic booking confirmation
- **Receipt Generation**: Digital receipts for all transactions
- **Refund Support**: Built-in refund handling

### Test Payment Information
**Note**: The payment system is currently in test mode. Use these test numbers for successful transactions:

**Awash Bank Mobile Money**
- Phone: `0900123456`

*Any other phone numbers will return a failed payment status.*



## 🎨 UI/UX Features

- **Theme System**: Light and dark mode support
- **Responsive Design**: Mobile-first approach
- **Loading States**: Smooth user experience
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/google` - Google OAuth
- `POST /auth/forgot-password` - Password reset request

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event (organizers only)
- `GET /api/events/:id` - Get event details
- `POST /api/events/:id/book` - Book event

### Dashboard
- `GET /dashboard/organizer/stats` - Organizer statistics
- `GET /dashboard/user/bookings` - User bookings
- `GET /notifications` - Get notifications

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Backend Tests
```bash
cd backend
npm test              # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Run tests with coverage
npm run test:e2e      # Run integration tests
```

### Test Coverage
- **Frontend**: Unit tests for components, API functions, and auth hooks
- **Backend**: Unit tests for services and integration tests for endpoints
- **Testing Libraries**: Jest, React Testing Library, NestJS Testing

## 🚀 Deployment

### Backend (Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Bereket Eshete
- **Project Type**: Full-Stack Event Management Platform
- **Location**: Addis Ababa, Ethiopia

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NestJS team for the robust backend framework
- Tailwind CSS for the utility-first CSS framework
- Chapa for Ethiopian payment processing


## 📞 Support

For support, email bereketeshete63@gmail.com or create an issue in the repository.

---

**EventAddis** - Connecting Communities Through Amazing Events 🎉