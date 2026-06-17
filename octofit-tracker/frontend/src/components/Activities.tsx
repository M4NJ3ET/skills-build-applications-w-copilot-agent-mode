import React, { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse, isCodespaceNameSet } from '../api';

export default function Activities() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('activities/')
      .then((d) => {
        if (!mounted) return;
        setItems(normalizeListResponse(d));
      })
      .catch((e) => setError(String(e)))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      {!isCodespaceNameSet() && (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set — using relative API paths.</div>
      )}
      <h2>Activities</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {items.map((it, i) => (
            <div key={it._id || it.id || i} className="list-group-item">
              <div className="fw-bold">{it.title || it.name || 'Activity'}</div>
              <div className="text-muted small">{it.description || JSON.stringify(it)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
