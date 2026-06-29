# CampusConnect

CampusConnect is a MERN stack web application designed to help college students discover events matching their interests, skills, and hobbies while making it easy to establish meaningful networks and professional connections with peers.

---

##  Tech Stack

### Frontend
- **React.js** (initialized using Vite)
- **React Router DOM** (declarative routing)
- **Axios** (pre-configured HTTP client)
- **Vanilla CSS** (custom modular dark/light design system)

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (ODM)
- **JSON Web Tokens (JWT)** & **bcryptjs** (authentication)
- **dotenv** (environment configurations)

---

##  Folder Structure

```
CampusConnect/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Brand logos & icons
│   │   ├── components/         # Common UI Components (Navbar, Footer, etc.)
│   │   ├── pages/              # Routing views (Home, Login, Register, Profile, Events, Favorites, Connections)
│   │   ├── layouts/            # Page layouts (MainLayout)
│   │   ├── context/            # React Context API (AuthContext)
│   │   ├── hooks/              # Custom React hooks (placeholder)
│   │   ├── services/           # External service setups (api.js Axios client)
│   │   ├── utils/              # Client side utilities
│   │   ├── styles/             # Modular style files
│   │   ├── App.jsx             # React routing setup
│   │   ├── main.jsx            # Rendering entrypoint
│   │   └── index.css           # Core styling tokens & systems
│   ├── .env.example            # Environment variables setup for client
│   └── package.json            # Client configurations & scripts
│
├── server/                     # Express Backend
│   ├── config/                 # DB configuration (db.js)
│   ├── controllers/            # Controller layers (auth, event, favorite, connection)
│   ├── middleware/             # Authorization & error middlewares
│   ├── models/                 # Mongoose schemas (User, Event, ConnectionRequest)
│   ├── routes/                 # Express routing endpoints (auth, event, favorite, connection)
│   ├── utils/                  # Core helpers (token generation, matching algorithm)
│   ├── .env.example            # Environment variables setup for server
│   ├── app.js                  # Main Express app registry
│   ├── server.js               # Entrypoint & DB starter
│   └── package.json            # Server configuration & dependencies
│
├── .gitignore                  # Root level Git ignores
├── package.json                # Optional root task runner
└── README.md                   # Documentation guide
```

---

##  Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CampusConnect
   ```

2. **Install all dependencies**:
   Run the following command at the project root to install dependencies for the root concurrently package, client, and server:
   ```bash
   npm run install:all
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `server/` directory using `server/.env.example` as a template:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_uri
     JWT_SECRET=your_jwt_secret_key
     ```
   - Create a `.env` file in the `client/` directory using `client/.env.example` as a template:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

---

##  Running the Project

From the root project folder, you can run:

- **Run both Backend & Frontend concurrently**:
  ```bash
  npm run dev
  ```

Alternatively, you can run them individually:

- **Run Backend only**:
  ```bash
  npm run dev:server
  ```
  *(Starts Server on `http://localhost:5000` via nodemon)*

- **Run Frontend only**:
  ```bash
  npm run dev:client
  ```
  *(Starts Client on `http://localhost:5173` via Vite)*

