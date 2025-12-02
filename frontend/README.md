# Subscription Tracker Frontend

A modern, responsive React frontend for managing and tracking recurring subscriptions. Built with Vite, React, and React Router.

## Features

- User authentication (signup/login) with JWT
- Full CRUD operations for subscriptions
- Dashboard with subscription cards
- Real-time renewal date tracking and alerts
- Search and filter subscriptions by name and billing cycle
- Pagination support for large subscription lists
- Responsive design for mobile and desktop
- Form validation and error handling
- Loading states and user feedback

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Axios for API calls
- Day.js for date handling
- CSS3 with CSS variables for theming

## Prerequisites

- Node.js v16 or higher
- npm v8 or higher
- Backend API running (see backend README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set the API base URL:
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Production Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SubscriptionList.jsx
│   │   ├── SubscriptionCard.jsx
│   │   └── SubscriptionForm.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── subscription.service.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

## Usage

### Authentication

1. Sign up with name, email, and password
2. Log in with email and password
3. JWT token is stored in localStorage
4. Token is automatically attached to API requests

### Managing Subscriptions

1. View all subscriptions on the dashboard
2. Add new subscription using the form
3. Edit existing subscriptions
4. Delete subscriptions with confirmation
5. Filter by billing cycle
6. Search by subscription name

### Subscription Form Fields

- Name (required)
- Category (required)
- Price (required)
- Currency (USD, EUR, GBP)
- Billing Cycle (daily, weekly, monthly, yearly)
- Payment Method (required)
- Start Date (required)
- Next Renewal Date (optional, auto-calculated if not provided)
- Status (active, cancelled, expired)

## API Integration

The frontend communicates with the backend API through Axios interceptors that:

- Automatically attach JWT tokens to requests
- Handle 401 errors by redirecting to login
- Retry requests on 429 rate limit errors
- Provide consistent error handling

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 480px)
- Tablets (< 768px)
- Desktop (> 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
