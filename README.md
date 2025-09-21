

````markdown
# 🕒 Floating Question Timer

A **React + Vite + Tailwind** app for exam-style time management.  
Users can set a total exam duration and number of questions, then run a **floating timer** that tracks both **per-question time** and **overall progress**.

---

## ✨ Features

- **Timer Setup**
  - Set total time (minutes) and number of questions.
  - Automatically calculates per-question time allocation.

- **Floating Timer**
  - Displays **current question countdown**.
  - Shows **total exam countdown**.
  - Dual progress bars (per-question + total).
  - Pause/Resume and Reset controls.

- **UI**
  - Built with **React + TypeScript**.
  - Styled using **TailwindCSS** and **shadcn/ui** components.
  - Clean, centered timer interface with progress bars.

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Abiton198/floating-question-timer.git
cd floating-question-timer
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development

```bash
npm run dev
```

Vite will start a dev server (usually at `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

Build output will be in the `/dist` folder.

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── TimerSetup.tsx      # Input form for total minutes + questions
 │    ├── FloatingTimer.tsx   # Static centered timer with progress tracking
 │
 ├── AppLayout.tsx            # Handles setup screen ↔ timer screen switching
 ├── main.tsx                 # Vite entry point
 └── index.css                # Tailwind styles
```

---

## 🔧 Configuration

* Timer resets when clicking **Stop & Reset**.
* Default styling uses Tailwind (`bg-slate-900`, gradients, etc).
* Modify colors in `tailwind.config.js` or directly in component classes.

---

## 🌐 Deployment

This app can be easily deployed to **Netlify**, **Vercel**, or any static hosting service:

* **Netlify**:

  * Connect repo → Build command: `npm run build`
  * Publish directory: `dist`

* **Vercel**:

  * One-click deploy with Vite template.

---

## 🖥️ Notes on Floating Behavior

* In the browser (Netlify/Vercel deployment), the timer is **static and centered** inside the app window.
* If you want a **desktop floating always-on-top widget** (like Zoom toolbar), you’ll need to wrap this app in **Electron or Tauri**.

---

## 📜 License

MIT License © 2025 Abiton

```

---
