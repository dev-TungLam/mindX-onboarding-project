import React from "react";

export const Login: React.FC = () => {
  const handleLogin = () => {
    // Redirect to backend to start OIDC flow
    window.location.href = "/api/auth/login";
  };

  return (
    <div
      className="auth-container"
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Welcome</h2>
      <p>Please log in with your MindX account.</p>

      <button
        onClick={handleLogin}
        style={{
          padding: "0.75rem 1.5rem",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Login with MindX ID
      </button>
    </div>
  );
};
