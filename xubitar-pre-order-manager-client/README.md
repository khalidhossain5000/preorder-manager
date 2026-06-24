# Preorder Manager

A full-stack application for managing product preorders. Built with **Next.js** (frontend) and **Express + TypeScript + Prisma + SQLite** (backend).

---

## Project Structure

```
preorder-manager/
├── xubitar-pre-order-manager-client/   # Next.js frontend
└── xubitar-pre-order-manager-server/   # Express + Prisma backend
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/khalidhossain5000/preorder-manager.git
cd preorder-manager
```

---

### 2. Backend Setup (`xubitar-pre-order-manager-server`)

#### Navigate to the backend folder

```bash
cd xubitar-pre-order-manager-server
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

Create a `.env` file in the root of the backend folder:

```env
DATABASE_URL="file:./dev.db"
PORT=9000
```

#### Generate Prisma client

```bash
npx prisma generate
```

#### Run database migrations

```bash
npx prisma migrate deploy
```

> This will create the SQLite database (`dev.db`) and apply all migrations automatically.

#### Start the backend server

```bash
npm run dev
```

The backend will be running at: `http://localhost:9000`

---

### 3. Frontend Setup (`xubitar-pre-order-manager-client`)

Open a **new terminal** and navigate to the frontend folder:

```bash
cd xubitar-pre-order-manager-client
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

Create a `.env` file in the root of the frontend folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
```

#### Start the frontend development server

```bash
npm run dev
```

The frontend will be running at: `http://localhost:3000`

---

## Usage

1. Make sure the **backend** is running before starting the frontend.
2. Open your browser and go to `http://localhost:3000`.
3. You can now create, view, update, and delete preorders.

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | Next.js, TypeScript, Tailwind CSS       |
| Backend  | Node.js, Express, TypeScript            |
| Database | SQLite (via Prisma ORM)                 |
| ORM      | Prisma                                  |

---

## Features

- **Preorder List Page** — View all preorders with server-side filtering (All / Active / Inactive), sorting, and pagination
- **Create Preorder** — Add a new preorder record to the database
- **Update Preorder** — Edit an existing preorder with pre-filled form fields
- **Status Toggle** — Switch a preorder between Active and Inactive directly from the list
- **Delete** — Remove a preorder record from the database
- **Select / Select All** — Row-level checkbox selection support

---

## Troubleshooting

**Prisma client not found?**
```bash
npx prisma generate
```

**Database not created?**
```bash
npx prisma migrate deploy
```

**Port already in use?**
Change the `PORT` value in the backend `.env` file and update `NEXT_PUBLIC_API_URL` in the frontend `.env` accordingly.

**CORS error in browser?**
Make sure the backend is running and the `NEXT_PUBLIC_API_URL` in the frontend `.env` matches the backend URL exactly.