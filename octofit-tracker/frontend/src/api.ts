export const getApiBase = () => {
  const codeName = import.meta.env.VITE_CODESPACE_NAME;
  if (codeName) {
    return `https://${codeName}-8000.app.github.dev/api/`;
  }
  // Safe fallback to relative API path when env is not set
  return '/api/';
};

export const isCodespaceNameSet = () => !!import.meta.env.VITE_CODESPACE_NAME;

export async function fetchJson(path: string) {
  const base = getApiBase();
  const url = base + path.replace(/^\/*/, '');
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`Fetch error ${res.status}`);
  return res.json();
}

export function normalizeListResponse(data: any) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.results && Array.isArray(data.results)) return data.results;
  // try common keys
  if (data.items && Array.isArray(data.items)) return data.items;
  return [];
}
