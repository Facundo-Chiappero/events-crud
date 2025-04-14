# Events CRUD

**IMPORTANT**

The API in production is actually connected to my mercado pago account, any purchase you do will send me the money.

you can access the web site through this link [Events CRUD](https://events-crud.netlify.app/)

## Features

### Users

- Register and log in.
- View all available events with details (title, description, price, date, images if any).
- Log out using a dedicated button.
- Buy a ticket for an event

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

- `/backend/index.ts` → Entry point of the backend server (run with `npm run build` and then `npm run start`)
- `/backend/controllers/` → Contains logic for handling requests
- `/backend/routes/` → Defines API routes
- `/backend/prisma/` → Prisma schema and database config
- `/backend/utils/` → Constants file to avoid using magic strings

## Frontend Structure

- `/src/components/` → Every component
- `/src/reducer/` → Defines the reducer and its initial state
- `/src/hooks/useStore` → Context Provider for the store made with the reducer, with this every component has the same state
- `/src/hooks/useEventManager` → Provides the dispatchers and states
- `/src/context/` → Auth context, checks if theres a user saved in localStorage
- `/src/modals/` → Every modal
- `/src/utils/` → Constants file to avoid using magic strings

## Installation Instructions

### Local deploy

**IMPORTANT**
Step 4 is needed every time you change something in `backend` folder

#### 1. Clone the repository

```bash
git clone https://github.com/Facundo-Chiappero/events-crud.git
cd events-crud
```

#### 2. Install dependencies

- with a cmd inside the root folder execute

```bash
npm i
```

- with another cmd inside the backend folder execute

```bash
npm i
```

#### 3. Set the environment variables

`backend/.env`

```bash
DATABASE_URL="your-postgreSQL-database"
FRONTEND='your-frontend-url'
BACKEND='your-backend-url'
MP_ACCESS_TOKEN="your-development-mercado-pago-access-token"
```

`.env.local`

```bash
VITE_MP_PUBLIC_KEY="your-development-mercado-pago-public-key"
```

#### 4. Prepare the environment

- With a cmd inside the backend folder execute

```bash
npm run tunnel
```

- Copy the url in `src/utils/frontendConsts.ts` replacing the development value of `BACKEND` and do the same with the variable named `BACKEND` inside the `backend/.env` file

- Using another cmd inside the backend folder execute

```bash
npm run build
npm run start
```

- Using a third cmd inside the root folder execute

```bash
npm run dev
```

- Enter the url given by `npm run tunnel` in your browser (chrome, safari, or whatever you use), enter the link bellow the blue button

- Copy the numbers and paste on the input field

- Enter Mercado Pago web site and replace the url in the section webhooks

### Production deploy

#### 1. Clone the repository

```bash
git clone https://github.com/Facundo-Chiappero/events-crud.git
cd events-crud
```

#### 2. Hosting

- Upload the folder to a hosting service (i used [render](render.com) for backend and [netlify](netlify.com) for frontend)

- Set the environment variables
  `backend/.env`

```bash
DATABASE_URL="your-postgreSQL-database"
FRONTEND='your-frontend-url'
BACKEND='your-backend-url'
MP_ACCESS_TOKEN="your-development-mercado-pago-access-token"
```

`.env.local`

```bash
VITE_MP_PUBLIC_KEY="your-development-mercado-pago-public-key"
```

- For render you will need to specify the following commands

```bash
npm install
npm run build
npm run start
```

- Also you may need to specify the folder to use, which is `backend`

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
- `npm run tunnel`: Opens a secure tunnel to expose the local server (port 3000) for receiving webhooks from the Mercado Pago API

- open `localhost:5173` in your browser to see the page
