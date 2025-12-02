# Subscription Tracker - Frontend Setup Guide

## Overview

The frontend is a modern React application that provides a user-friendly interface for managing subscriptions. It connects to the existing backend API and provides full CRUD functionality with authentication.

## Quick Start

### 1. Backend Setup (First)

Before starting the frontend, ensure the backend is running:

```bash
# From the project root
npm install
npm run dev
```

The backend should be running on `http://localhost:3000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Environment Configuration

The frontend requires the backend API URL to be configured:

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Features Implemented

### Authentication
- User registration with name, email, and password
- User login with JWT token management
- Protected routes requiring authentication
- Automatic token refresh and error handling
- Logout functionality

### Subscription Management
- View all subscriptions in a responsive grid layout
- Create new subscriptions with comprehensive form validation
- Edit existing subscriptions
- Delete subscriptions with confirmation
- Real-time renewal date tracking with visual indicators
- Status badges (active, cancelled, expired)
- Category-based organization

### Search and Filtering
- Search subscriptions by name
- Filter by billing cycle (daily, weekly, monthly, yearly)
- Pagination for large subscription lists

### User Experience
- Loading spinners for async operations
- Error messages with clear feedback
- Form validation with required field indicators
- Responsive design for mobile, tablet, and desktop
- Smooth transitions and hover effects
- Empty state messages

## Component Architecture

```
src/
├── components/
│   ├── Login.jsx              # Login form and authentication
│   ├── Signup.jsx             # User registration form
│   ├── Dashboard.jsx          # Main subscription dashboard
│   ├── Header.jsx             # Navigation and user menu
│   ├── ProtectedRoute.jsx     # Route guard for authenticated pages
│   ├── SubscriptionList.jsx   # List container with filters
│   ├── SubscriptionCard.jsx   # Individual subscription card
│   └── SubscriptionForm.jsx   # Create/edit subscription form
├── context/
│   └── AuthContext.jsx        # Global authentication state
├── services/
│   ├── api.js                 # Axios instance with interceptors
│   ├── auth.service.js        # Authentication API calls
│   └── subscription.service.js # Subscription API calls
├── App.jsx                    # Main app with routing
├── App.css                    # Global styles
└── index.css                  # Base styles
```

## API Integration

The frontend communicates with the backend through these endpoints:

### Authentication
- `POST /api/v1/auth/sign-up` - User registration
- `POST /api/v1/auth/sign-in` - User login

### Subscriptions
- `GET /api/v1/subscriptions/user/:id` - Get user subscriptions
- `POST /api/v1/subscriptions` - Create subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription

## Design System

### Color Palette
- Primary: `#2563eb` (Blue)
- Secondary: `#64748b` (Gray)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)

### Typography
- Font: System fonts (Apple, Segoe UI, Roboto)
- Heading sizes: 32px, 28px, 24px, 20px
- Body text: 15px
- Small text: 14px, 13px

### Spacing
- Base unit: 8px
- Common spacing: 8px, 16px, 24px, 32px

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: < 768px
- Desktop: > 768px

## Common Development Tasks

### Adding a New Component

1. Create component file in `src/components/`
2. Import and use in parent component or add to routing
3. Add any required styles to `App.css`

### Adding a New API Endpoint

1. Add service method in appropriate service file
2. Use the service in your component
3. Handle loading and error states

### Styling Guidelines

- Use CSS variables for colors (defined in `App.css`)
- Follow the existing class naming convention
- Ensure responsive design with media queries
- Test on multiple viewport sizes

## Testing the Application

### Manual Testing Flow

1. Sign up with new user credentials
2. Log in with the created account
3. Add a new subscription with all required fields
4. Edit the subscription details
5. Test search and filter functionality
6. Test pagination if you have 10+ subscriptions
7. Delete a subscription
8. Log out and verify redirect

### Common Issues and Solutions

**Issue: CORS errors**
Solution: Ensure backend is running and has CORS enabled

**Issue: 401 Unauthorized**
Solution: Check if JWT token is stored in localStorage and backend is accepting requests

**Issue: Network errors**
Solution: Verify VITE_API_BASE_URL in .env matches backend URL

## Production Build

```bash
npm run build
```

Output will be in the `dist/` directory and can be served with any static file server.

## Browser Support

Tested and working on:
- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

## Next Steps

Potential enhancements:
- Add subscription analytics and spending insights
- Implement email reminder preferences
- Add export functionality for subscription data
- Integrate with payment providers
- Add dark mode support
- Implement subscription sharing/family accounts

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend API is running
3. Ensure environment variables are set correctly
4. Review the backend logs for API errors
