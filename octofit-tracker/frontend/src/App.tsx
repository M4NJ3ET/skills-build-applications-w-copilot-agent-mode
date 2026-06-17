import "./styles.css";
import { Link, Routes, Route } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import logo from "../../../docs/octofitapp-small.png";

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Octofit" height={36} className="me-2" />
            OctoFit Tracker
          </Link>
          <div>
            <Link className="btn btn-sm btn-outline-primary me-2" to="/activities">Activities</Link>
            <Link className="btn btn-sm btn-outline-primary me-2" to="/workouts">Workouts</Link>
            <Link className="btn btn-sm btn-outline-primary me-2" to="/teams">Teams</Link>
            <Link className="btn btn-sm btn-outline-primary me-2" to="/users">Users</Link>
            <Link className="btn btn-sm btn-outline-primary" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div className="p-4"><h1>Welcome to OctoFit Tracker</h1><p>Use the navigation to view data.</p></div>} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
