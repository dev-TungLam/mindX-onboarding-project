import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { LoginCallback } from "./pages/LoginCallback";
import "./App.css";
import ReactGA from "react-ga4";

// Helper to decode JWT without external library
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded = parseJwt(storedToken);
      setUser(decoded);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div className="card-header">
          <h1>Secure Dashboard</h1>
          <span className="status-badge">Authenticated</span>
        </div>

        {user && (
          <div className="user-info">
            <h3>Session Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>User Subject ID:</strong>
                <span>{user.sub || "N/A"}</span>
              </div>
              <div className="info-item">
                <strong>Identity Provider:</strong>
                <span>{user.iss || "N/A"}</span>
              </div>
              <div className="info-item">
                <strong>Audience (Client):</strong>
                <span>{user.aud || "N/A"}</span>
              </div>
              <div className="info-item">
                <strong>Session Expires:</strong>
                <span
                  className={user.exp * 1000 < Date.now() ? "expired" : "valid"}
                >
                  {user.exp ? formatDate(user.exp) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="token-box">
          <p className="token-title">ID Token (Base64 Encoded)</p>
          <div className="token-content">
            <code>{token || "No Token Found"}</code>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};



const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
