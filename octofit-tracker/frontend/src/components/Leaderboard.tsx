import React, { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse, isCodespaceNameSet } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchJson('leaderboard/')
      .then((d) => mounted && setItems(normalizeListResponse(d)))
      .catch((e) => mounted && setError(String(e)))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <div>
      {!isCodespaceNameSet() && (
        <div className="alert alert-warning">VITE_CODESPACE_NAME is not set — using relative API paths.</div>
      )}
      <h2>Leaderboard</h2>
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-light">
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>User</th>
                <th style={{ width: '100px' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={3} className="text-muted">No leaderboard data found.</td></tr>
              ) : (
                items.map((entry, i) => {
                  const rank = i + 1;
                  const score = entry.score ?? entry.points ?? 0;
                  const userName = entry.user?.name || entry.team?.name || entry.userName || entry.name || entry.username;
                  return (
                    <tr key={entry._id || entry.id || i} className={rank <= 3 ? 'table-warning' : ''}>
                      <td className="fw-bold">{getMedalEmoji(rank)} {rank}</td>
                      <td>{userName || `User ${rank}`}</td>
                      <td><span className="badge bg-success">{score}</span></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
