# BookBuddy : A Library Management System
BookBuddy is a powerful and user-friendly library management web app that allows users to **browse**, **add**, **update**,**delete** and **borrow** books seamlessly. Built with **React**, **Redux Toolkit**, **React Router**, and **Tailwind CSS**, it integrates with a backend API to provide real-time library functionality.


---

## 🔍 Project Overview

BookBuddy provides a clean and modern interface for book lovers, admins, or students to:

- Explore a collection of books
- Add new books to the system
- Update Delete existing book records
- Borrow books and track summaries
- View detailed information with a modal popup

It uses **Redux Toolkit Query (RTK Query)** for state management and API integration.

---

## 📂 Live 
  **Client:** [Visit the live site](https://bookbuddy-library.vercel.app/)
  
  **Server:** [Visit the live site](https://bookbuddy-server-chi.vercel.app/)








## 📂 Repositories

- **Client:** [Library-Management-Client (React TypeScript	Redux Toolkit  RTK Query Client)](https://github.com/Tanim-Ahmmed/Library-Management-System)  
- **Server:** [Library Management-Server (Node.js, Express.js, TypeScript,  Backend)](https://github.com/Tanim-Ahmmed/Library-Management-System-Server)

---

## 🛠️ Tech Stack

### Client

- React + TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS for styling
- React hot toast 
- SweetAlert2 for notifications
- date-fns for date filtering and manipulation

### Server

- Node.js with Express.js(TypeScript)
- MongoDB + Mongoose 
- bcrypt for password hashing
- CORS for cross-origin requests

---
## ✨ Key Features

 View all books with rich table view and dynamic status  
 Add new books with genre, ISBN, and description  
 Edit & update book details  
 Borrow books and track borrow summary  
 Book availability & copies tracking  
 Modals for book details and borrowing  
 Sweet confirmation on delete  
 Responsive UI for all devices  
 Centralized API with RTK Query

---

## 📝 Client Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tanim-Ahmmed/Library-Management-System
   cd Library-Management-System
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   Create a `.env` file and add your API URL:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser at `http://localhost:5173`

---

## 📝 Server Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tanim-Ahmmed/Library-Management-System-Server
   cd Library-Management-System-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The API will run on `http://localhost:5000`

---
## 🧭 Routes & Pages

| Route                 | Component         | Description                      |
|----------------------|------------------|----------------------------------|
| `/`                  | `Home`           | Landing page with hero & books  |
| `/books`             | `AllBooks`       | View all available books         |
| `/create-book`       | `AddBooks`       | Add a new book                   |
| `/update-book/:id`   | `UpdateBook`     | Update a book by its ID          |
| `/borrow-summary`    | `BorrowSummary`  | Summary of all borrowed books    |
| `*` (fallback)       | `ErrorPage`      | 404 page                         |

---

## 📡 API Endpoints

BookBuddy communicates with a backend via the following endpoints:

### 📘 Books Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/books`            | Get all books            |
| GET    | `/books/:id`        | Get book by ID           |
| POST   | `/books`            | Add a new book           |
| PUT    | `/books/:id`        | Update existing book     |
| DELETE | `/books/:id`        | Delete a book            |

### 📒 Borrow Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/borrow`        | Get all borrow summaries |
| POST   | `/borrow`        | Create a new borrow      |
