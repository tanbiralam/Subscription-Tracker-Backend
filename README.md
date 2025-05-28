# Subscription-Tracker-Backend 🚀

[![npm version](https://img.shields.io/npm/v/subscriptiontracking-system?color=brightgreen&label=npm)](https://www.npmjs.com/package/subscriptiontracking-system)  
[![License](https://img.shields.io/github/license/tanbiralam/Subscription-Tracker-Backend?color=blue)](https://github.com/tanbiralam/Subscription-Tracker-Backend/blob/main/LICENSE)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/tanbiralam/Subscription-Tracker-Backend/nodejs.yml?branch=main&label=build&color=green)](https://github.com/tanbiralam/Subscription-Tracker-Backend/actions)  

---

Subscription-Tracker-Backend is a robust Node.js API-first backend application designed to help you efficiently manage and track your recurring subscriptions. Built with Express.js and MongoDB, it features secure JWT authentication via Arcjet middleware and optional workflow automation powered by Upstash Workflow.

---

## ✨ Features

- **User Authentication:** Secure sign up, login, and JWT-based session management.
- **Subscription CRUD:** Create, read, update, and delete subscription records with metadata including billing cycle and cost.
- **Workflow Automation:** Integrate with Upstash Workflow for custom subscription-related automations.
- **Security Middleware:** Enhanced request inspection and security with Arcjet middleware.
- **Email Notifications:** Send subscription reminders and alerts using Nodemailer.
- **Date Handling:** Subscription billing and expiry calculations with Day.js.
- **Express.js API:** Clean RESTful endpoints with pagination, filtering, and validation.
- **Error Handling:** Centralized and consistent error management.
- **Development Tools:** Hot reload with Nodemon and code linting with ESLint.

---

## 📋 Prerequisites

- **Node.js** v16 or higher (LTS recommended)
- **MongoDB** 5.x or higher (local installation or Atlas cloud)
- **npm** v8 or higher

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/tanbiralam/Subscription-Tracker-Backend.git
cd Subscription-Tracker-Backend
2. **Install dependencies**

```bash
npm install
3. **Set up environment variables**

```bash
cp .env.example .env
Edit `.env` to add your MongoDB connection URI, JWT secret, email credentials, and Upstash workflow keys.

---

## 💻 Usage

### 1. Start development server with hot reload

```bash
npm run dev
Runs the server with `nodemon` watching for file changes.

---

### 2. Start production server

```bash
npm start
Runs the server using Node.js without reload.

---

### 3. API Usage Examples

All examples use TypeScript with `axios` for HTTP requests. Replace `http://localhost:3000` with your deployed or local server URL.

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
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Signup failed:', error.response?.data.message || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

signupUser();
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
      nextBillingDate: '2025-07-01T00:00:00.000Z',
    };

    const response = await axios.post<Subscription>(
      'http://localhost:3000/api/v1/subscriptions',
      newSubscription,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('Subscription created:', response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to create subscription:', error.response?.data.message || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Example usage: assume you have a valid JWT token string
// createSubscription('your-jwt-token-here');
---

#### Example 3: Fetch User Subscriptions with Pagination and Error Handling

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

async function getSubscriptions(token: string, page = 1, limit = 10) {
  try {
    const response = await axios.get<SubscriptionsResponse>(
      `http://localhost:3000/api/v1/subscriptions?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(`Page ${response.data.page} of subscriptions:`, response.data.subscriptions);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn('Rate limit exceeded. Retrying after delay...');
        await new Promise(res => setTimeout(res, 2000));
        return getSubscriptions(token, page, limit);
      }
      console.error('Failed to fetch subscriptions:', error.response?.data.message || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Example usage: getSubscriptions('your-jwt-token-here');
---

## ⚙️ Configuration

The application uses environment variables to configure its behavior. Below is a comprehensive list of supported variables with descriptions:

| Variable          | Description                                  | Example                              | Notes                                      |
|-------------------|----------------------------------------------|------------------------------------|--------------------------------------------|
| `PORT`            | Port number for the Express server           | `3000`                             | Default is 3000 if not specified            |
| `MONGODB_URI`     | MongoDB connection string                     | `mongodb+srv://user:pass@cluster0.mongodb.net/subscriptions?retryWrites=true&w=majority` | Must be a valid MongoDB URI                  |
| `JWT_SECRET`      | Secret key used to sign JWT tokens            | `supersecret_jwt_key`              | Keep this key secure and private            |
| `EMAIL_HOST`      | SMTP host for sending emails                   | `smtp.gmail.com`                   | Used by Nodemailer                           |
| `EMAIL_PORT`      | SMTP port                                      | `587`                             | Usually 587 for TLS                          |
| `EMAIL_USER`      | SMTP username                                  | `your-email@gmail.com`             | For authentication                           |
| `EMAIL_PASS`      | SMTP password                                  | `email_password`                   | Keep this secret                             |
| `UPSTASH_WORKFLOW_TOKEN` | API token for Upstash Workflow integration | `your_upstash_workflow_token`     | Required only if workflow automation is used |

Refer to `.env.example` for a sample template.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear messages.
4. Push your branch (`git push origin feature/your-feature`).
5. Open a Pull Request describing your changes.

Please ensure your code follows existing style conventions and includes appropriate tests if applicable.

For major features or breaking changes, open an issue first to discuss the design.

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/tanbiralam/Subscription-Tracker-Backend/blob/main/LICENSE).

---

# .env.example

```env
# Server configuration
PORT=3000

# MongoDB connection string
# Replace <username>, <password>, and <cluster-url> with your MongoDB Atlas or local credentials
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/subscriptionDB?retryWrites=true&w=majority

# JWT secret key for signing tokens
# Use a strong, unpredictable string. Keep this secret and do not commit to source control.
JWT_SECRET=your_jwt_secret_key_here

# Email SMTP configuration for sending subscription notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Upstash Workflow API token (optional)
# Get your token from https://console.upstash.com/workflows
UPSTASH_WORKFLOW_TOKEN=your_upstash_workflow_token_here
---

Thank you for choosing **Subscription-Tracker-Backend**! For questions