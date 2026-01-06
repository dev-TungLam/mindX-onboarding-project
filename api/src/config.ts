export const CLIENT_ID = process.env.CLIENT_ID || "mindx-onboarding";
export const AUTH_ENDPOINT =
  process.env.AUTH_ENDPOINT || "https://id-dev.mindx.edu.vn/auth";
export const TOKEN_ENDPOINT =
  process.env.TOKEN_ENDPOINT || "https://id-dev.mindx.edu.vn/token";

export const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:3000/api/auth/callback";
export const FRONTEND_CALLBACK_URL =
  process.env.FRONTEND_CALLBACK_URL || "http://localhost:5173/login/callback";
