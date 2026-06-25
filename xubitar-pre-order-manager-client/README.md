# Preorder Manager

A full-stack preorder management application built as a job assessment project. It allows users to create, view, update, delete, filter, sort, and paginate preorders through a clean and responsive UI.

**Live Demo:**

- 🌐 Frontend: [https://xubitar-pre-order-manager.vercel.app](https://xubitar-pre-order-manager.vercel.app)
- 🚀 Backend API: [https://preorder-manager-chip.onrender.com](https://preorder-manager-chip.onrender.com)

---

## ⚡ Quick Setup

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/khalidhossain5000/preorder-manager.git
cd preorder-manager
```

---

### 2. Backend Setup (`xubitar-pre-order-manager-server`)

```bash
cd xubitar-pre-order-manager-server
```

**Install dependencies:**

```bash
npm install
```

**Create environment file:**

Create a `.env` file in the root of the server folder:

```env
CORS_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
PORT=5000
```

**Run Prisma migrations and generate client:**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Seed sample data:**

```bash
npx prisma db seed
```

> If no seed script exists, you can manually insert data via Prisma Studio (see below).

**Start the development server:**

```bash
npm run dev
```

The backend will be running at: `http://localhost:5000`

**Optional — Open Prisma Studio to view/manage database:**

```bash
npx prisma studio
```

---

### 3. Frontend Setup (`xubitar-pre-order-manager-client`)

Open a new terminal and navigate to the client folder:

```bash
cd xubitar-pre-order-manager-client
```

**Install dependencies:**

```bash
npm install
```

**Create environment file:**

Create a `.env.local` file in the root of the client folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Start the development server:**

```bash
npm run dev
```

The frontend will be running at: `http://localhost:3000`

---

### 4. Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
preorder-manager/
├── xubitar-pre-order-manager-client/   # Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── .env.local
│   └── package.json
│
└── xubitar-pre-order-manager-server/   # Express + TypeScript Backend
    ├── generated/                       # Prisma generated client
    ├── prisma/
    │   ├── migrations/
    │   └── schema/
    ├── src/
    │   ├── lib/
    │   ├── modules/
    │   │   ├── config/
    │   │   └── preorder/
    │   │       ├── controller.preorder.ts
    │   │       ├── interface.preorder.ts
    │   │       ├── route.preorder.ts
    │   │       └── service.preorder.ts
    │   ├── types/
    │   ├── utils/
    │   ├── app.ts
    │   └── server.ts
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── dev.db
    ├── package.json
    ├── package-lock.json
    ├── prisma.config.ts
    ├── tsconfig.json
    └── tsup.config.ts
```

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js, React, Tailwind CSS        |
| Backend    | Node.js, Express, TypeScript        |
| Database   | SQLite (via Prisma ORM)             |
| Deployment | Vercel (frontend), Render (backend) |

---

## ✨ Features

- 📋 **Preorder List** — View all preorders in a paginated table
- 🔍 **Filter** — Filter by status: All / Active / Inactive (server-side)
- 🔃 **Sort** — Sort by multiple fields (server-side)
- 📄 **Pagination** — Server-side pagination
- ✅ **Row & Select All Checkboxes** — Multi-row selection support
- 🔄 **Status Toggle** — Switch Active/Inactive directly in the list with instant DB update
- 🗑️ **Delete** — Remove a preorder from the database
- ✏️ **Update Preorder** — Edit existing preorder with pre-filled form
- ➕ **Create Preorder** — Add a new preorder via a dedicated page
- ⏳ **Loading States** — Loader shown during save/update operations

---

## 🔌 API Endpoint Reference

Base URL (Local): `http://localhost:5000`

Base URL (Live): `https://preorder-manager-chip.onrender.com`

| Method   | Endpoint                    | Description                                |
| -------- | --------------------------- | ------------------------------------------ |
| `POST`   | `/create`                   | Create a new preorder                      |
| `GET`    | `/`                         | Get all preorders (filter, sort, paginate) |
| `GET`    | `/:id`                      | Get a single preorder by ID                |
| `PATCH`  | `/update-status/:id/status` | Toggle Active/Inactive status              |
| `PUT`    | `/update-preorder/:id`      | Update a preorder by ID                    |
| `DELETE` | `/delete/:id`               | Delete a preorder by ID                    |

### Query Parameters for `GET /`

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `status`  | `string` | Filter by `active` or `inactive` |
| `sort`    | `string` | Field to sort by                 |
| `order`   | `string` | `asc` or `desc`                  |
| `page`    | `number` | Page number (default: `1`)       |
| `limit`   | `number` | Items per page (default: `10`)   |

---

### Live API Endpoint Reference

Base URL: `https://preorder-manager-chip.onrender.com`

| Method   | Full Endpoint                                                         |
| -------- | --------------------------------------------------------------------- |
| `POST`   | `https://preorder-manager-chip.onrender.com/create`                   |
| `GET`    | `https://preorder-manager-chip.onrender.com/?page=1&limit=10`         |
| `GET`    | `https://preorder-manager-chip.onrender.com/:id`                      |
| `PATCH`  | `https://preorder-manager-chip.onrender.com/update-status/:id/status` |
| `PUT`    | `https://preorder-manager-chip.onrender.com/update-preorder/:id`      |
| `DELETE` | `https://preorder-manager-chip.onrender.com/delete/:id`               |

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

---

## 📬 Contact

For any queries, feel free to reach out.
