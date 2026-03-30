# Focus - Daily Reflection App

A minimal full-stack application with Vite + React frontend and Express.js backend.

## Project Structure

```
Focus/
├── frontend/          # Vite + React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/           # Express.js
│   ├── index.js
│   ├── package.json
│   └── .env
└── .env               # Environment variables
```

## Setup

### Backend Setup

```bash
# Install dependencies
cd backend
npm install

# Run development server
npm run dev
```

Backend runs on: http://localhost:8000
- Health check: http://localhost:8000/api/health

### Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev
```

Frontend runs on: http://localhost:5173

## Environment Variables

The `.env` file contains:
- `NOTION_KEY` - Notion integration key
- `NOTION_DATABASE_ID` - Notion database ID

## Development

- Backend: FastAPI with CORS enabled for local development
- Frontend: Vite with hot-reload and proxy to backend API
- Styling: Tailwind CSS with custom theme
