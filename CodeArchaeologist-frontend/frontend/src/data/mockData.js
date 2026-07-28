// ============================================================
// MOCK DATA — swap for real API responses when backend is ready
// Backend teammate: just replace these with real API calls in
// src/api/client.js — the components already consume the same shape
// ============================================================

export const MOCK_PROJECT = {
  id: 'proj_demo_001',
  name: 'fastapi / fastapi',
  url: 'https://github.com/fastapi/fastapi',
  language: 'Python',
  stars: '72k',
  analyzedAt: new Date().toISOString(),
  stats: {
    totalFiles: 248,
    totalLines: 42600,
    dependencies: 31,
    entryPoints: 3,
  },
  summary:
    'FastAPI is a modern, fast web framework for building APIs with Python based on standard type hints. The architecture follows a clean separation of concerns with routers, dependency injection, and middleware layers. Entry point is main.py which wires together routers, models, and the database layer.',
  patterns: ['Dependency Injection', 'Repository Pattern', 'Middleware Chain', 'OpenAPI Spec'],
  entryPoints: ['fastapi/__init__.py', 'fastapi/applications.py', 'fastapi/routing.py'],
};

export const MOCK_GRAPH_NODES = [
  { id: 'n1', type: 'entryNode', position: { x: 400, y: 40 },  data: { label: 'main.py',          type: 'entry',  lines: 42,  lang: 'Python', importance: 'high' } },
  { id: 'n2', type: 'moduleNode', position: { x: 130, y: 180 }, data: { label: 'routers/',          type: 'module', files: 6,   lang: 'Python', importance: 'high' } },
  { id: 'n3', type: 'moduleNode', position: { x: 400, y: 180 }, data: { label: 'models/',           type: 'module', files: 8,   lang: 'Python', importance: 'high' } },
  { id: 'n4', type: 'moduleNode', position: { x: 670, y: 180 }, data: { label: 'services/',         type: 'module', files: 5,   lang: 'Python', importance: 'high' } },
  { id: 'n5', type: 'fileNode',   position: { x: 40,  y: 340 }, data: { label: 'auth.py',           type: 'file',   lines: 210, lang: 'Python', importance: 'high' } },
  { id: 'n6', type: 'fileNode',   position: { x: 200, y: 340 }, data: { label: 'users.py',          type: 'file',   lines: 178, lang: 'Python', importance: 'high' } },
  { id: 'n7', type: 'fileNode',   position: { x: 340, y: 340 }, data: { label: 'User.py',           type: 'file',   lines: 95,  lang: 'Python', importance: 'medium' } },
  { id: 'n8', type: 'fileNode',   position: { x: 480, y: 340 }, data: { label: 'Post.py',           type: 'file',   lines: 80,  lang: 'Python', importance: 'medium' } },
  { id: 'n9', type: 'fileNode',   position: { x: 610, y: 340 }, data: { label: 'auth_service.py',  type: 'file',   lines: 340, lang: 'Python', importance: 'high' } },
  { id: 'n10', type: 'fileNode',  position: { x: 760, y: 340 }, data: { label: 'email_service.py', type: 'file',   lines: 122, lang: 'Python', importance: 'medium' } },
  { id: 'n11', type: 'dbNode',    position: { x: 130, y: 490 }, data: { label: 'database.py',      type: 'db',     lines: 65,  lang: 'Python', importance: 'high' } },
  { id: 'n12', type: 'dbNode',    position: { x: 400, y: 490 }, data: { label: 'schemas.py',       type: 'db',     lines: 140, lang: 'Python', importance: 'medium' } },
  { id: 'n13', type: 'fileNode',  position: { x: 640, y: 490 }, data: { label: 'config.py',        type: 'config', lines: 55,  lang: 'Python', importance: 'low' } },
];

export const MOCK_GRAPH_EDGES = [
  { id: 'e1-2',  source: 'n1', target: 'n2', animated: true,  style: { stroke: '#6366f1' } },
  { id: 'e1-3',  source: 'n1', target: 'n3', animated: true,  style: { stroke: '#6366f1' } },
  { id: 'e1-4',  source: 'n1', target: 'n4', animated: true,  style: { stroke: '#6366f1' } },
  { id: 'e2-5',  source: 'n2', target: 'n5', style: { stroke: '#8b5cf6' } },
  { id: 'e2-6',  source: 'n2', target: 'n6', style: { stroke: '#8b5cf6' } },
  { id: 'e3-7',  source: 'n3', target: 'n7', style: { stroke: '#8b5cf6' } },
  { id: 'e3-8',  source: 'n3', target: 'n8', style: { stroke: '#8b5cf6' } },
  { id: 'e4-9',  source: 'n4', target: 'n9', style: { stroke: '#8b5cf6' } },
  { id: 'e4-10', source: 'n4', target: 'n10', style: { stroke: '#8b5cf6' } },
  { id: 'e5-11', source: 'n5', target: 'n11', style: { stroke: '#10b981' } },
  { id: 'e6-11', source: 'n6', target: 'n11', style: { stroke: '#10b981' } },
  { id: 'e7-12', source: 'n7', target: 'n12', style: { stroke: '#10b981' } },
  { id: 'e9-12', source: 'n9', target: 'n12', style: { stroke: '#10b981' } },
  { id: 'e9-13', source: 'n9', target: 'n13', style: { stroke: '#64748b' } },
  { id: 'e10-13', source: 'n10', target: 'n13', style: { stroke: '#64748b' } },
];

export const MOCK_FILE_TREE = [
  {
    id: 'root', name: 'fastapi', type: 'folder', expanded: true,
    children: [
      {
        id: 'routers', name: 'routers', type: 'folder', expanded: false,
        children: [
          { id: 'auth_r',   name: 'auth.py',   type: 'file', lang: 'python', lines: 210, importance: 'high',   nodeId: 'n5' },
          { id: 'users_r',  name: 'users.py',  type: 'file', lang: 'python', lines: 178, importance: 'high',   nodeId: 'n6' },
          { id: 'posts_r',  name: 'posts.py',  type: 'file', lang: 'python', lines: 145, importance: 'medium', nodeId: null },
        ],
      },
      {
        id: 'models', name: 'models', type: 'folder', expanded: false,
        children: [
          { id: 'user_m',    name: 'User.py',    type: 'file', lang: 'python', lines: 95,  importance: 'high',   nodeId: 'n7' },
          { id: 'post_m',    name: 'Post.py',    type: 'file', lang: 'python', lines: 80,  importance: 'medium', nodeId: 'n8' },
          { id: 'comment_m', name: 'Comment.py', type: 'file', lang: 'python', lines: 60,  importance: 'low',    nodeId: null },
        ],
      },
      {
        id: 'services', name: 'services', type: 'folder', expanded: false,
        children: [
          { id: 'auth_s',  name: 'auth_service.py',  type: 'file', lang: 'python', lines: 340, importance: 'high',   nodeId: 'n9'  },
          { id: 'email_s', name: 'email_service.py', type: 'file', lang: 'python', lines: 122, importance: 'medium', nodeId: 'n10' },
        ],
      },
      { id: 'main',     name: 'main.py',     type: 'file', lang: 'python', lines: 42,  importance: 'high',   nodeId: 'n1'  },
      { id: 'database', name: 'database.py', type: 'file', lang: 'python', lines: 65,  importance: 'high',   nodeId: 'n11' },
      { id: 'schemas',  name: 'schemas.py',  type: 'file', lang: 'python', lines: 140, importance: 'medium', nodeId: 'n12' },
      { id: 'config',   name: 'config.py',   type: 'file', lang: 'python', lines: 55,  importance: 'medium', nodeId: 'n13' },
    ],
  },
];

export const MOCK_FILE_CONTENTS = {
  main:
`from fastapi import FastAPI
from routers import auth, users, posts
from database import engine
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI Demo", version="1.0.0")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])

@app.get("/health")
def health_check():
    return {"status": "ok"}`,

  auth_r:
`from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from services.auth_service import authenticate_user, create_access_token

router = APIRouter()

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}`,

  database:
`from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`,

  user_m:
`from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    posts = relationship("Post", back_populates="author")`,

  auth_s:
`from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")`,
};

export const MOCK_AI_EXPLANATIONS = {
  main: '**Entry Point** of the application. Creates the FastAPI app, initializes the database schema, and wires up all three routers (`/auth`, `/users`, `/posts`). Every HTTP request enters through this file first.',
  auth_r: '**Authentication Router** — defines the `POST /auth/login` endpoint. Uses FastAPI dependency injection to receive form data and a DB session, then delegates to `auth_service` for credential verification. Returns a JWT token on success.',
  database: '**Database Layer** — sets up the SQLAlchemy engine and session factory. The `get_db()` generator is used as a FastAPI dependency, ensuring each request gets its own session that closes automatically when the request completes.',
  user_m: '**User SQLAlchemy Model** — maps to the `users` table. Defines columns for id, email, hashed_password, and created_at. Has a one-to-many relationship with `Post` via SQLAlchemy `relationship()`.',
  auth_s: '**Auth Service** — core business logic for authentication. `verify_password` uses bcrypt to compare passwords. `authenticate_user` queries the DB and validates credentials. `create_access_token` signs a JWT with an expiry using the `jose` library.',
};

export const MOCK_CHALLENGES = [
  {
    id: 'c1', title: 'Trace the Login Flow', difficulty: 'Beginner',
    description: 'Follow a login request from the HTTP endpoint all the way to the database and back.',
    steps: [
      { id: 1, hint: 'Where does POST /auth/login get defined?',               file: 'routers/auth.py',          nodeId: 'n5' },
      { id: 2, hint: 'Which service handles password verification?',            file: 'services/auth_service.py', nodeId: 'n9' },
      { id: 3, hint: 'How does the service query the database?',               file: 'database.py',              nodeId: 'n11' },
      { id: 4, hint: 'What SQLAlchemy model does the user row map to?',        file: 'models/User.py',           nodeId: 'n7' },
    ],
  },
  {
    id: 'c2', title: 'Find the Entry Point', difficulty: 'Beginner',
    description: 'Identify where the application starts and how all routers are registered.',
    steps: [
      { id: 1, hint: 'Which file is the root of the application?',            file: 'main.py',          nodeId: 'n1' },
      { id: 2, hint: 'How are the routers included and what prefixes do they use?', file: 'main.py',    nodeId: 'n1' },
      { id: 3, hint: 'What prefix does the auth router use?',                 file: 'routers/auth.py',  nodeId: 'n5' },
    ],
  },
  {
    id: 'c3', title: 'Understand Dependency Injection', difficulty: 'Intermediate',
    description: 'Learn how FastAPI manages database sessions with its DI system.',
    steps: [
      { id: 1, hint: 'Find where get_db() is defined',                        file: 'database.py',      nodeId: 'n11' },
      { id: 2, hint: 'Which router endpoints use Depends(get_db)?',           file: 'routers/users.py', nodeId: 'n6'  },
      { id: 3, hint: 'What happens to the session when the function returns?', file: 'database.py',     nodeId: 'n11' },
    ],
  },
];

export const MOCK_CHAT_RESPONSES = [
  { triggers: ['auth', 'login', 'authentication', 'jwt', 'token'],
    response: '**Authentication** happens in two places:\n\n1. **`routers/auth.py`** — defines `POST /auth/login` using OAuth2PasswordRequestForm\n2. **`services/auth_service.py`** — verifies password with bcrypt and creates a signed JWT\n\n**Flow:** HTTP → Router → Service → DB query → JWT response' },
  { triggers: ['entry', 'start', 'main', 'begin', 'where does it start'],
    response: '**The application starts in `main.py`:**\n\n1. FastAPI app is instantiated\n2. `models.Base.metadata.create_all()` syncs the DB schema\n3. Three routers registered: `/auth`, `/users`, `/posts`\n\nThis is the single assembly point for the whole API.' },
  { triggers: ['database', 'db', 'sql', 'session', 'get_db'],
    response: '**Database access uses a session-per-request pattern:**\n\n- `database.py` creates the SQLAlchemy engine from `config.DATABASE_URL`\n- `get_db()` is a generator that yields one session per request and closes it via `finally`\n- Any route needing DB access declares `db: Session = Depends(get_db)` in its signature' },
  { triggers: ['model', 'schema', 'pydantic', 'orm', 'table'],
    response: 'This project has **two types of "models":**\n\n1. **SQLAlchemy Models** in `models/` — map to DB tables (User, Post, Comment)\n2. **Pydantic Schemas** in `schemas.py` — define request/response shapes for FastAPI validation and OpenAPI docs\n\nThey are intentionally separate — ORM models handle persistence, Pydantic handles API contracts.' },
  { triggers: ['dependency', 'inject', 'depends'],
    response: '**FastAPI Dependency Injection** is the core architectural pattern here:\n\n- `Depends(get_db)` — injects a DB session\n- `Depends(get_current_user)` — injects the authenticated user\n- `OAuth2PasswordRequestForm` — injects parsed login credentials\n\nThis keeps route handlers thin and testable — you swap a real DB for a mock in tests.' },
];

export const PROGRESS_STEPS = [
  { id: 1, label: 'Cloning Repository',        description: 'Downloading files from GitHub…',              icon: '⬇️', duration: 1800 },
  { id: 2, label: 'Parsing Files',             description: 'Reading code structure with Tree-sitter…',   icon: '🔍', duration: 2200 },
  { id: 3, label: 'Building Dependency Graph', description: 'Mapping connections between modules…',        icon: '🕸️', duration: 2500 },
  { id: 4, label: 'Running AI Analysis',       description: 'Gemini 2.5 Flash is studying the codebase…', icon: '🤖', duration: 3000 },
  { id: 5, label: 'Generating Insights',       description: 'Creating challenges and explanations…',      icon: '✨', duration: 1500 },
];

export const EXAMPLE_REPOS = [
  { label: 'fastapi/fastapi',   url: 'https://github.com/fastapi/fastapi',   lang: 'Python'     },
  { label: 'expressjs/express', url: 'https://github.com/expressjs/express', lang: 'JavaScript' },
  { label: 'django/django',     url: 'https://github.com/django/django',     lang: 'Python'     },
  { label: 'vuejs/vue',         url: 'https://github.com/vuejs/vue',         lang: 'JavaScript' },
];
