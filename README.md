# 🏛️ CodeArchaeologist

> **AI-Powered Codebase Visualization & Architecture Explorer **

CodeArchaeologist acts like a senior developer sitting right next to you on day one. Paste any public GitHub repository link, and it generates an **interactive visual dependency map**, **AI architecture explanations**, and **guided learning quests** in under 5 minutes.

---

## 📸 Overview & Key Features

* 🕸️ **Interactive 2D Dependency Graph**: Visualizes connections between entry points, modules, code files, and databases using **React Flow**.
* 🤖 **AI Codebase Assistant**: Real-time Q&A interface (Gemini 2.5 Flash) to query code logic (*"Where is authentication handled?"* or *"Trace the database connection"*).
* 🏆 **Guided Learning Challenges**: Step-by-step interactive quests (*"Trace Login Flow"*, *"Find Entry Point"*) that guide developers through unfamiliar codebases.
* 🌗 **Dual-Theme Support**: Instant toggle between Dark Mode and Light Mode with persistent `localStorage` storage and high-contrast glassmorphism visual design.
* 📜 **Native Code Viewer**: Click any node or file to open an accessible overlay modal displaying full code snippets alongside plain-English AI explanations.
* 🚀 **Zero Page Reloads**: Built with React Router and header navigation history (`← Back`, `🏠 Home`).

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Core** | React 19, JavaScript (ES6+), Vite | Fast, responsive single-page web app |
| **Routing & State** | React Router v7, React Hooks | Client-side routing without page reloads |
| **Graph Visualization** | `@xyflow/react` (React Flow 2D) | Interactive canvas for codebase nodes & edges |
| **UI & Styling** | Vanilla CSS Modules, CSS Custom Properties | Custom Glassmorphism, Dual Dark/Light themes |
| **Motion & Animations** | Framer Motion | Smooth tab transitions and entrance effects |
| **Icons** | Lucide React | Clean, scalable icon system |
| **Backend Target** | FastAPI (Python), Uvicorn | High-performance AI microservice |
| **AI & AST Parsing** | LangChain / LangGraph, Gemini 2.5 Flash, Tree-sitter | Code parsing, graph generation, and LLM reasoning |

---

## 🚀 Quick Start for Developers

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Gargeesharmaa/CodeArchaeologist.git
   cd CodeArchaeologist
   ```

2. **Switch to the `frontend` branch**:
   ```bash
   git checkout frontend
   ```

3. **Navigate to the `frontend` directory & install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🔌 Backend Integration Guide (For Teammates)

The frontend is currently powered by a mock data layer (`src/data/mockData.js`), allowing you to test the complete visual UI offline.

To connect your **FastAPI / Python backend**:

### 1. Environment Variable
Create a `.env` file inside `frontend/`:
```env
VITE_API_URL=http://localhost:8000
```

### 2. Required API Endpoints

The frontend client in `src/api/client.js` is pre-configured to communicate with the following REST API endpoints:

#### A. Submit Repository for Analysis
* **Endpoint**: `POST /api/analyze`
* **Request Body**:
  ```json
  { "repo_url": "https://github.com/fastapi/fastapi" }
  ```
* **Response**:
  ```json
  { "jobId": "job_12345", "status": "queued" }
  ```

#### B. Poll Progress Status
* **Endpoint**: `GET /api/job/:jobId`
* **Response**:
  ```json
  {
    "step": 3,
    "progress": 60,
    "done": false,
    "currentTask": "Building Dependency Graph"
  }
  ```

#### C. Fetch Full Project Graph & Analysis
* **Endpoint**: `GET /api/project/:projectId`
* **Response**:
  ```json
  {
    "id": "proj_demo_001",
    "name": "fastapi / fastapi",
    "summary": "FastAPI is a modern web framework...",
    "stats": { "totalFiles": 248, "totalLines": 42600, "dependencies": 31, "entryPoints": 3 },
    "patterns": ["Dependency Injection", "Repository Pattern"],
    "nodes": [
      { "id": "n1", "type": "entryNode", "position": { "x": 400, "y": 40 }, "data": { "label": "main.py", "type": "entry", "lines": 42 } },
      { "id": "n5", "type": "fileNode", "position": { "x": 40, "y": 340 }, "data": { "label": "auth.py", "type": "file", "lines": 210 } }
    ],
    "edges": [
      { "id": "e1-5", "source": "n1", "target": "n5", "animated": true }
    ]
  }
  ```

#### D. AI Chat Query
* **Endpoint**: `POST /api/chat/:projectId`
* **Request Body**:
  ```json
  { "message": "Where is authentication handled?" }
  ```
* **Response**:
  ```json
  {
    "response": "Authentication is handled in routers/auth.py and services/auth_service.py...",
    "highlightedNodes": ["n5", "n9"]
  }
  ```

#### E. Fetch Code Snippet & Explanation
* **Endpoint**: `GET /api/project/:projectId/file/:fileId`
* **Response**:
  ```json
  {
    "fileName": "routers/auth.py",
    "content": "from fastapi import APIRouter...",
    "explanation": "This file handles the /login route and token verification..."
  }
  ```

---

## 📂 Project Structure Map

```text
frontend/
├── index.html                     # Entry HTML file with color-scheme meta
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
└── src/
    ├── main.jsx                   # JavaScript entry point
    ├── App.jsx                    # React Router definitions
    ├── index.css                  # Global design tokens, dark/light themes
    ├── api/
    │   └── client.js              # Fetch API helper functions for backend
    ├── data/
    │   └── mockData.js            # Mock graph, files, and AI responses
    ├── pages/
    │   ├── Landing.jsx            # Home screen (Hero, Features, How-it-Works)
    │   ├── Analyze.jsx            # URL input & validation screen
    │   ├── Loading.jsx            # Animated step-by-step progress screen
    │   └── Dashboard.jsx          # Main 3-panel workspace dashboard
    └── components/
        ├── layout/
        │   └── Navbar.jsx         # Top Header with Back button, Logo & Theme Switcher
        └── dashboard/
            ├── FileTree.jsx       # Left panel file explorer tree
            ├── GraphNode.jsx      # Custom React Flow graph nodes
            ├── AIChat.jsx         # Right panel AI Chat assistant
            ├── ChallengePanel.jsx # Center tab: Guided quest challenges
            ├── ArchOverview.jsx   # Center tab: Architectural metrics & patterns
            └── CodeViewerDialog.jsx # Native <dialog> code inspection modal
```

---

## 📜 License

This project is created for hackathon demonstration. Feel free to build upon it!
