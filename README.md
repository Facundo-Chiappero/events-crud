# Events CRUD

you can access the web site through this link [Events CRUD](https://events-crud.netlify.app/)

## Features

### Users

- Register and log in.
- View all available events with details (title, description, price, date, images if any).
- Log out using a dedicated button.

### Admins

- Create new events (green button at the top of the screen).
- Edit events (blue button with clipboard icon inside each event).
- Delete events (red button with trash can icon inside each event).
- By default, there is only one admin:

```bash
Email: admin@gmail.com
Password: admin
```

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Context API + useReducer for state management
- Axios for API requests

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (hosted on [Neon](https://neon.tech))

---

## Backend Structure

- `/backend/index.js` → Entry point of the backend server (run with `node index.js`)
- `/backend/controllers/` → Contains logic for handling requests
- `/backend/routes/` → Defines API routes
- `/backend/prisma/` → Prisma schema and database config

## Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Facundo-Chiappero/events-crud.git
cd events-crud
```

- with a cmd inside the root folder execute

```bash
npm i
npm run dev
```

- with another cmd inside the backend folder execute

```bash
npm i
npm run build
npm run start
```

## Frontend Commands

In the frontend folder, you can run the following commands:

- `npm run dev`: Starts the development server with hot reloading and opens the app in the browser.
- `npm run build`: Compiles and optimizes the frontend code for production.
- `npm run preview`: Previews the production build locally before deploying it.
- `npm run format`: Formats your JavaScript, JSX, TypeScript, and TSX files using Prettier.

## Backend Commands

In the backend folder, you can run the following commands:

- `npm run build`: Compiles the TypeScript code into JavaScript using `tsc`.
- `npm run start`: Executes the backend by running the compiled JavaScript with `node`.
- `npm run generate`: Generates the Prisma client based on the schema configuration.

- open `localhost:5173` in your browser to see the page
