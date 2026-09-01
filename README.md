# Dhruvi Kamani – Portfolio (MERN)

An interactive portfolio site rebuilt from the original static `Practical_test` repo
(HTML/CSS/JS) into a full MERN stack app:

- **M**ongoDB — stores portfolio projects and contact-form messages
- **E**xpress — REST API (`/api/projects`, `/api/contact`)
- **R**eact — single-page app (Vite) with Home / About / Skills / Portfolio / Contact sections
- **N**ode — runs the Express server

## Project structure

```
portfolio-mern/
├── server/          # Express + MongoDB API
│   ├── config/db.js
│   ├── models/       Project.js, Message.js
│   ├── routes/        projects.js, contact.js
│   ├── seed.js        seeds sample projects
│   └── server.js
└── client/          # React (Vite) frontend
    └── src/
        ├── components/  Header, Home, About, Skills, Portfolio, Contact
        ├── hooks/useTypedText.js   (typed.js-style hero text effect)
        ├── assets/hero-bg.jpg      (background image from the original repo)
        └── App.jsx
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
# edit .env if your MongoDB URI is different from the default local one
npm run seed   # populates sample projects into MongoDB
npm run dev    # starts the API on http://localhost:5000
```

## 3. Frontend setup

In a second terminal:

```bash
cd client
npm install
npm run dev    # starts the React app on http://localhost:5173
```

Vite is configured to proxy any `/api/*` request to `http://localhost:5000`, so the
frontend and backend talk to each other automatically in development.

Open **http://localhost:5173** in your browser.

## 4. What's interactive

- **Hero section**: typed/deleted role text (Frontend Developer / YouTuber / Web Developer),
  recreated without the original `typed.js` dependency.
- **Nav bar**: highlights the section currently in view (via `IntersectionObserver`) and
  smooth-scrolls to a section on click.
- **Portfolio**: project cards are fetched live from MongoDB through `GET /api/projects`.
  Add/edit/remove projects via the API and the UI updates automatically.
- **Contact form**: submissions are POSTed to `/api/contact` and persisted in MongoDB
  (`Message` collection). Inspect them via `GET /api/contact` or any Mongo client.

## 5. API reference

| Method | Endpoint          | Description                       |
|--------|-------------------|------------------------------------|
| GET    | `/api/health`     | Health check                       |
| GET    | `/api/projects`   | List all projects                  |
| POST   | `/api/projects`   | Create a project                   |
| PUT    | `/api/projects/:id` | Update a project                 |
| DELETE | `/api/projects/:id` | Delete a project                 |
| POST   | `/api/contact`    | Submit the contact form            |
| GET    | `/api/contact`    | List submitted messages            |

## 6. Building for production

```bash
cd client
npm run build     # outputs static files to client/dist
```

Serve `client/dist` with any static host (or add `express.static` in `server.js`), and
point `CLIENT_ORIGIN` / API base URL at your deployed backend.
