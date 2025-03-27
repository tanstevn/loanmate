# **loanmate**

A lending platform designed to streamline loan applications and approvals for various financial needs, including vehicle loans, home improvement financing, and personal loans.

This repository consists of two main parts:

### **1. Backend (Node.js + Express + TypeScript)**

The backend is a RESTful API built with **Node.js**, **Express**, and **TypeScript**, ensuring a structured, maintainable, and scalable architecture. It handles business logic, loan processing, and database management.

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** In-memory database that is located at /infrastructure/repositories.
- **Architecture:** Adheres to **Clean Architecture** and follows a **Vertical Slice Architecture** pattern.
- **Mediator Pattern:** Implements a custom-built **Mediator** class to facilitate decoupled communication between request handlers. Instead of calling services or repositories directly, requests (commands or queries) are sent to the **Mediator**, which delegates execution to the appropriate handler. This promotes modularity, testability, and separation of concerns.

### **2. Frontend (Vite + React + TypeScript)**

The frontend is a **React** application built with **Vite** for fast development and performance. It provides a user-friendly interface where users can apply for loans, track their applications, and manage loan repayments.

- **Framework:** React.js
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Built-in React Hooks
- **Styling:** Tailwind
- **Form Handling:** Uses **react-hook-form** for efficient and optimized form management.
- **Schema Validation:** Implements **Zod** for validating form inputs with TypeScript support.

## **Getting Started**

### **Clone the Repository**

```bash
git clone https://github.com/tanstevn/loanmate.git
cd loanmate
```

### **Setup Instructions**

```bash
# Open a terminal for the **backend**, install its dependencies and run the application:
cd backend
npm install
npm start

# Open another terminal for the **frontend**, install its dependencies and run the application:
cd frontend
npm install
npm start
```

Happy testing! :)
