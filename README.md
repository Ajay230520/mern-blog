# MERN Blog App 📝

This is a simple personal blog app built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create accounts, write blog posts, and view posts created by other users.

## Features 🚀

- **User Authentication:** Users can sign up, log in, and log out securely using JWT (JSON Web Tokens).
- **Create, Update, Delete Posts:** Authenticated users can create new blog posts, edit their own posts, and delete them.
- **View Posts:** Users can view all posts created by other users.
- **Responsive Design:** The app is designed to be mobile-friendly and works well on different screen sizes.

## Tech Stack 💻

- **Frontend:** React.js, Redux Toolkit, Firebase (optional)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other Dependencies:** bcryptjs for password hashing, cookie-parser for handling cookies, dotenv for environment variables.

## Getting Started 🛠️

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both frontend and backend using `npm install`.
4. Create a `.env` file in the root directory for backend and another `.env` file in the `client` directory for frontend, and add the following environment variables:

   **Backend (.env file in root directory):**

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

**Frontend (client/.env file):**
REACT_APP_API_URL=http://localhost:3000
REACT_APP_JWT_SECRET=your_jwt_secret


5. Run the development server for backend using `npm run dev`.
6. Navigate to the `client` directory and run the frontend development server using `npm run dev`.
7. Visit `http://localhost:3000` in your browser to view the app.

## Available Scripts 📋

In the project directory, you can run:

- **Backend:**
- `npm run dev`: Runs the backend server in development mode using nodemon.
- `npm start`: Starts the production backend server.

- **Frontend (inside the `client` directory):**
- `npm run dev`: Runs the frontend app in development mode.
- `npm run build`: Builds the frontend app for production to the `build` folder.

## Firebase Integration (Optional) 🌐

This project includes Firebase as an optional dependency for additional features like authentication, storage, etc. If you want to use Firebase, follow these additional steps:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add Firebase configuration to your frontend `.env` file:

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key


3. Initialize Firebase SDK in your frontend code. Refer to the [Firebase documentation](https://firebase.google.com/docs/web/setup) for more details.

## License 📄

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author ✏️

[Ajay230520]

