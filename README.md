# 🌬️ Whiff App

A real-time gas sensor monitoring dashboard built with **React** and **Vite**. Whiff tracks hazardous gas levels, displays live sensor readings, shows your location on an interactive map, and notifies emergency contacts when danger is detected.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?logo=leaflet&logoColor=white)

---

## ✨ Features

- **Live Sensor Dashboard** — Monitor Natural Gas, CO, Chlorine, and Smoke levels with color-coded status indicators
- **Danger Alerts** — Prominent alert banners when hazardous levels are detected
- **Interactive Map** — Real-time location display using OpenStreetMap + Leaflet with browser geolocation
- **Emergency Contacts** — View notified contacts and their SMS delivery status
- **Bottom Navigation** — Dashboard, History, Contacts, and Settings tabs
- **Modern UI** — Glassmorphic login, gradient backgrounds, smooth micro-animations

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Installation

1. **Clone or download** the project:

   ```bash
   git clone <your-repo-url>
   cd Whiff
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser** at the URL shown in your terminal (default: [http://localhost:5173](http://localhost:5173))

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
whiff_app/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── src/
    ├── main.jsx            # App entry point
    ├── App.jsx             # Router & route definitions
    ├── index.css           # Global styles & design tokens
    ├── components/
    │   ├── StatusBadge     # Color-coded status pill
    │   ├── SensorCard      # Gas level card with progress bar
    │   ├── ContactTile     # Emergency contact row
    │   └── MapWidget       # Leaflet map with geolocation
    ├── pages/
    │   ├── LoginPage       # Authentication screen
    │   └── DashboardPage   # Main sensor monitoring view
    └── layouts/
        └── AppShell        # Bottom navigation + page outlet
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [React-Leaflet](https://react-leaflet.js.org) | Interactive maps |
| [Leaflet](https://leafletjs.com) | Map rendering engine |
| [OpenStreetMap](https://www.openstreetmap.org) | Map tiles |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📄 License

This project is private and not published to any package registry.
