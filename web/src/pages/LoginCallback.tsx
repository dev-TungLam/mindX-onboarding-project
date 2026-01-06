import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LoginCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    const username = new URLSearchParams(window.location.search).get(
      "username"
    );

    console.log("LoginCallback reached.");
    console.log("Token:", token ? "Found" : "Missing");
    console.log("Username:", username);

    if (token) {
      localStorage.setItem("token", token);
      if (username) localStorage.setItem("username", username);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <div>Logging you in...</div>;
};
