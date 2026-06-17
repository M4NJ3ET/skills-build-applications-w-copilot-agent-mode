import React, { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse, isCodespaceNameSet } from '../api';

export default function Users() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchJson('users/')
      .then((d) => mounted && setItems(normalizeListResponse(d)))
      .catch((e) => mounted && setError(String(e)))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      {!isCodespaceNameSet() && (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set — using relative API paths.</div>
      )}
      <h2>Users</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {items.map((u, i) => (
            <div key={u._id || u.id || i} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">{u.name || u.username || `User ${i + 1}`}</div>
                <div className="small text-muted">{u.email || ''}</div>
              </div>
              <div className="badge bg-secondary rounded-pill">{u.points ?? '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
