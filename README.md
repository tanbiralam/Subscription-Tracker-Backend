# Subscription Tracking System

This is a Node.js application for tracking subscriptions, built with Express.js and MongoDB.

## Features

- User authentication (signup, login)
- Manage subscriptions (create, view, update, delete)
- Workflow management (potentially using Upstash Workflow)
- Security features including Arcjet middleware.

## Prerequisites

- Node.js (refer to `package.json` for version specifics if any)
- MongoDB

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd subscriptiontracking-system
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., `PORT`, `MONGODB_URI`, `JWT_SECRET`). Refer to `config/env.js` (if it exists) or the codebase for required variables.

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the server using `nodemon`, which will automatically restart the server on file changes.

5.  **Start the production server:**
    ```bash
    npm start
    ```

## API Endpoints

The application exposes the following API endpoints:

- `/api/v1/auth`: Authentication related endpoints (e.g., login, signup)
- `/api/v1/users`: User management endpoints
- `/api/v1/subscriptions`: Subscription management endpoints
- `/api/v1/workflows`: Workflow management endpoints

The root endpoint `/` will return a welcome message.

## Scripts

- `npm start`: Starts the application in production mode.
- `npm run dev`: Starts the application in development mode using `nodemon`.

## Dependencies

Key dependencies include:

- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `jsonwebtoken`: For generating JWTs for authentication
- `bcryptjs`: For hashing passwords
- `cookie-parser`: Middleware for parsing cookies
- `dotenv`: For loading environment variables
- `@arcjet/node`: Security middleware
- `@upstash/workflow`: (Likely for managing workflows)
- `nodemailer`: For sending emails (if implemented)
- `dayjs`: For date manipulation

Refer to the `package.json` file for a full list of dependencies.

## Development Dependencies

- `nodemon`: For automatically restarting the server during development.
- `eslint`: For code linting.

Refer to the `package.json` file for a full list of development dependencies.

## Project Structure (Simplified)

```
.
├── config/         # Environment variables and configuration
├── controllers/    # Request handlers
├── database/       # Database connection logic (mongodb.js)
├── middlewares/    # Custom middleware (e.g., error handling, Arcjet)
├── models/         # Mongoose schemas
├── routes/         # API route definitions
├── utils/          # Utility functions
├── app.js          # Main application entry point
├── package.json    # Project metadata and dependencies
└── README.md       # This file
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

(Specify your license here, e.g., MIT)
