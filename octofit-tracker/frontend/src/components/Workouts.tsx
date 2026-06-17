import React, { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse, isCodespaceNameSet } from '../api';

export default function Workouts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchJson('workouts/')
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
      <h2>Workouts</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {items.map((w, i) => (
            <div key={w._id || w.id || i} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{w.title || w.name || `Workout ${i + 1}`}</h5>
                  <p className="card-text small text-muted">{w.description || ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
