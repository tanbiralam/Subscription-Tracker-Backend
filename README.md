# Subscription-Tracker-Backend 🚀

[![npm version](https://img.shields.io/npm/v/subscriptiontracking-system?color=brightgreen&label=npm)](https://www.npmjs.com/package/subscriptiontracking-system)  
[![License](https://img.shields.io/github/license/tanbiralam/Subscription-Tracker-Backend?color=blue)](https://github.com/tanbiralam/Subscription-Tracker-Backend/blob/main/LICENSE)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/tanbiralam/Subscription-Tracker-Backend/nodejs.yml?branch=main&label=build&color=green)](https://github.com/tanbiralam/Subscription-Tracker-Backend/actions)  

---

Subscription-Tracker-Backend is a robust Node.js backend API designed to help you efficiently manage and track your recurring subscriptions. Built on Express.js and MongoDB, it features secure JWT authentication via Arcjet middleware and supports optional workflow automation through Upstash Workflow for seamless subscription management.

---

## ✨ Features

- **Secure User Authentication:** JWT-based signup, login, and session management with Arcjet middleware protection.  
- **Full Subscription CRUD:** Manage subscriptions with detailed metadata including billing cycles, costs, and next billing dates.  
- **Workflow Automation:** Native integration with Upstash Workflow to automate subscription reminders and related tasks.  
- **Enhanced Security:** Request inspection and security hardening using Arcjet middleware.  
- **Email Notifications:** Automated subscription reminders and alerts via Nodemailer SMTP integration.  
- **Advanced Date Handling:** Billing and expiry logic powered by Day.js for accurate date calculations.  
- **RESTful API:** Clean, paginated, and filterable endpoints with input validation and consistent error handling.  
- **Developer Tools:** Hot reloading with Nodemon, ESLint for code quality enforcement, and debug logging support.

---

## 📋 Prerequisites

- **Node.js** v16 or higher (LTS recommended)  
- **MongoDB** v5.x or higher (local or Atlas cloud instance)  
- **npm** v8 or higher  
- Access to an SMTP email account (e.g. Gmail SMTP) for email notifications  
- Optional: Upstash account for workflow automation [https://upstash.com](https://upstash.com)

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/tanbiralam/Subscription-Tracker-Backend.git
cd Subscription-Tracker-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` to add your MongoDB URI, JWT secret, email credentials, and optionally Upstash workflow token.

---

## 💻 Usage

### 1. Start development server with hot reload

```bash
npm run dev
```

Runs the server with Nodemon watching for file changes to reload automatically.

---

### 2. Start production server

```bash
npm start
```

Runs the server with Node.js without automatic reload.

---

### 3. API Usage Examples

Below are complete, runnable TypeScript examples demonstrating common usage patterns with robust error handling. Replace `http://localhost:3000` with your server URL.

---

#### Example 1: User Signup and Login

```typescript
import axios from 'axios';

interface SignupResponse {
  token: string;
  userId: string;
}

async function signupUser() {
  try {
    const response = await axios.post<SignupResponse>('http://localhost:3000/api/v1/auth/signup', {
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'StrongP@ssw0rd!',
    });

    console.log('Signup successful. JWT Token:', response.data.token);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Signup failed:', error.response?.data.message ?? error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

signupUser();
```

*Comments:*  
- Sends a POST request to sign up a new user.  
- Handles axios errors and unexpected exceptions.  
- Logs the JWT token received upon successful signup.

---

#### Example 2: Create a Subscription (Authenticated)

```typescript
import axios from 'axios';

interface Subscription {
  _id: string;
  name: string;
  billingCycle: string;
  cost: number;
  userId: string;
  nextBillingDate: string;
}

async function createSubscription(token: string) {
  try {
    const newSubscription = {
      name: 'Netflix',
      billingCycle: 'monthly',
      cost: 12.99,
      nextBillingDate: new Date('2025-07-01T00:00:00.000Z').toISOString(),
    };

    const response = await axios.post<Subscription>(
      'http://localhost:3000/api/v1/subscriptions',
      newSubscription,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('Subscription created:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to create subscription:', error.response?.data.message ?? error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Example usage (replace with valid JWT token)
// createSubscription('your-jwt-token-here');
```

*Comments:*  
- Requires a valid JWT token in the Authorization header.  
- Creates a new subscription record with billing cycle and cost.  
- Handles API response and errors gracefully.

---

#### Example 3: Fetch User Subscriptions with Pagination and Retry Logic

```typescript
import axios from 'axios';

interface Subscription {
  _id: string;
  name: string;
  billingCycle: string;
  cost: number;
  nextBillingDate: string;
}

interface SubscriptionsResponse {
  subscriptions: Subscription[];
  total: number;
  page: number;
  limit: number;
}

async function getSubscriptions(token: string, page = 1, limit = 10): Promise<void> {
  try {
    const response = await axios.get<SubscriptionsResponse>(
      `http://localhost:3000/api/v1/subscriptions?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(`Page ${response.data.page} of subscriptions:`, response.data.subscriptions);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn('Rate limit exceeded. Retrying after 2 seconds...');
        await new Promise(res => setTimeout(res, 2000));
        return getSubscriptions(token, page, limit);
      }
      console.error('Failed to fetch subscriptions:', error.response?.data.message ?? error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Example usage (replace with valid JWT token)
// getSubscriptions('your-jwt-token-here');
```

*Comments:*  
- Retrieves paginated subscription data for the authenticated user.  
- Implements basic rate limit retry with delay.  
- Logs subscriptions or errors accordingly.

---

## ⚙️ Configuration

The application uses environment variables to control its behavior. Below is a detailed list:

| Variable             | Description                                               | Example                                                                            | Notes                                                |
|----------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------|------------------------------------------------------|
| `PORT`               | Port for Express server                                   | `3000`                                                                             | Defaults to 3000 if unset                             |
| `MONGODB_URI`        | MongoDB connection string                                 | `mongodb+srv://user:pass@cluster0.mongodb.net/subscriptionDB?retryWrites=true&w=majority` | Must be valid MongoDB URI                             |
| `JWT_SECRET`         | Secret key to sign JWT tokens                             | `supersecret_jwt_key`                                                              | Keep secure; do not expose publicly                   |
| `EMAIL_HOST`         | SMTP host for sending emails                              | `smtp.gmail.com`                                                                   | Nodemailer SMTP host                                  |
| `EMAIL_PORT`         | SMTP port                                                | `587`                                                                              | Usually 587 for TLS                                   |
| `EMAIL_USER`         | SMTP user/email                                          | `your-email@gmail.com`                                                             | Used for SMTP authentication                          |
| `EMAIL_PASS`         | SMTP password                                            | `your-email-password`                                                              | Keep secret                                          |
| `UPSTASH_WORKFLOW_TOKEN` | Token for Upstash Workflow API integration (optional)    | `your_upstash_workflow_token`                                                      | Required only if workflow automation is enabled      |

Refer to the `.env.example` file for a ready-to-use template.

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. Commit your changes with clear, descriptive messages.  
4. Push your branch:  
   ```bash
   git push origin feature/your-feature
   ```  
5. Open a Pull Request describing your changes.

Please follow the existing code style and include tests where applicable. For breaking changes or major features, please open an issue first to discuss the approach.

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/tanbiralam/Subscription-Tracker-Backend/blob/main/LICENSE).

---