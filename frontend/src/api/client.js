// API client — ready to connect to your teammates' FastAPI backend
// Set VITE_API_URL in a .env file (e.g. VITE_API_URL=http://localhost:8000)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

/** POST /api/analyze — submit a GitHub repo URL, returns { jobId } */
export async function analyzeRepo(repoUrl) {
  return request('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ repo_url: repoUrl }),
  });
}

/** GET /api/job/:jobId — poll job status: { step, progress, done, error } */
export async function getJobStatus(jobId) {
  return request(`/api/job/${jobId}`);
}

/** GET /api/project/:projectId — full analysis result (graph, metadata) */
export async function getProject(projectId) {
  return request(`/api/project/${projectId}`);
}

/** POST /api/chat/:projectId — AI chat query, returns { response } */
export async function sendChatMessage(projectId, message) {
  return request(`/api/chat/${projectId}`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

/** GET /api/project/:projectId/file/:fileId — file content + AI explanation */
export async function getFileDetails(projectId, fileId) {
  return request(`/api/project/${projectId}/file/${fileId}`);
}
