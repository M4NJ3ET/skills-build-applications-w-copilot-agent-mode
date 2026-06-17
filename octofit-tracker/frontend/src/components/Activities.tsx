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

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      {!isCodespaceNameSet() && (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set — using relative API paths.</div>
      )}
      <h2>Activities</h2>
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row">
          {items.length === 0 ? (
            <div className="col-12"><p className="text-muted">No activities found.</p></div>
          ) : (
            items.map((activity, i) => (
              <div key={activity._id || activity.id || i} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{activity.type || 'Activity'}</h5>
                    <p className="card-text">
                      <strong>User:</strong> {activity.user?.name || 'Unknown'}<br />
                      <strong>Duration:</strong> {activity.durationMinutes || 0} min<br />
                      <strong>Calories:</strong> {activity.calories || 0} cal<br />
                      <strong>Date:</strong> {formatDate(activity.date || new Date().toISOString())}
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
