# Svelte + Node App

This project is a full-stack application built with Svelte for the frontend and Node.js with Express for the backend. It demonstrates how to set up a modern web application using these technologies along with Tailwind CSS for styling.

## Project Structure

```
svelte-node-app
├── backend
│   ├── app.js               # Entry point for the Node.js backend application
│   ├── routes
│   │   └── index.js         # API routes for the backend application
│   └── package.json          # Backend dependencies and scripts
├── frontend
│   ├── public
│   │   └── index.html       # Main HTML file for the Svelte frontend application
│   ├── src
│   │   ├── App.svelte       # Main Svelte component
│   │   ├── main.js          # Entry point for the Svelte application
│   │   └── styles
│   │       └── tailwind.css # Tailwind CSS styles
│   ├── package.json          # Frontend dependencies and scripts
│   ├── postcss.config.cjs    # PostCSS configuration
│   ├── tailwind.config.cjs    # Tailwind CSS configuration
│   └── vite.config.js        # Vite configuration
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd svelte-node-app
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```
   cd backend
   node app.js
   ```

2. Start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

### Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API can be accessed at `http://localhost:5000/api`.

### License

This project is licensed under the MIT License.