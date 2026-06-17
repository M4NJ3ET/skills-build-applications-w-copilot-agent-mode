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
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {items.length === 0 ? (
            <div className="col-12"><p className="text-muted">No workouts found.</p></div>
          ) : (
            items.map((workout, i) => (
              <div key={workout._id || workout.id || i} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{workout.type || workout.title || workout.name || `Workout ${i + 1}`}</h5>
                    <p className="card-text">
                      {workout.duration && <><strong>Duration:</strong> {workout.duration} min<br /></>}
                      {workout.description && <><strong>Description:</strong> {workout.description}<br /></>}
                      {workout.difficulty && <><strong>Difficulty:</strong> {workout.difficulty}</>}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
