# AiChatbot

A full-stack AI chatbot application built with FastAPI and React.

## Tech Stack

**Backend**
- Python 3.12
- FastAPI
- Google Gemini API
- Uvicorn

**Frontend**
- React 18 + TypeScript
- Vite
- shadcn/ui + Radix UI
- SCSS
- Lucide React

**Infrastructure**
- Docker & Docker Compose
- Kubernetes

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Gemini API key from https://aistudio.google.com/apikey

### Setup

1. Clone the repository and enter the folder
2. Create backend/.env and add your key: GEMINI_API_KEY=your_key_here
3. Run scripts/start.sh (or scripts/start.bat on Windows)

## Scripts

| Script | Description |
|--------|-------------|
| scripts/build.sh | Build Docker images |
| scripts/start.sh | Start the application |
| scripts/stop.sh | Stop the application |

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /api/v1/chat | Send a message |

API docs available at http://localhost:8000/docs

## Kubernetes (Optional)

Apply manifests: kubectl apply -f k8s/
Check pods: kubectl get pods

## Features

- Multiple conversations with history
- Persistent storage via localStorage
- Dark / Light mode toggle
- Responsive card layout
- OpenAPI docs (Swagger)