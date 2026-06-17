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
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={3} className="text-muted">No users found.</td></tr>
              ) : (
                items.map((user, i) => (
                  <tr key={user._id || user.id || i}>
                    <td className="fw-bold">{user.name || user.username || `User ${i + 1}`}</td>
                    <td>{user.email || '-'}</td>
                    <td>{user.team?.name || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
