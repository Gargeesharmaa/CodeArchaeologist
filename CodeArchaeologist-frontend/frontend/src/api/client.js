// API client
// .env
// VITE_API_URL=http://localhost:8000

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({
      detail: "Unknown error",
    }));

    throw new Error(err.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// Analyze Repository
export async function analyzeRepo(repoUrl) {
  const response = await fetch("http://localhost:8000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      repo_url: repoUrl, // FastAPI expects 'repo_url'
      branch: "main"      // Optional depending on your AnalyzeRequest model default
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze repository");
  }

  return response.json();
}