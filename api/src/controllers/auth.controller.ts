import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  TOKEN_ENDPOINT,
  FRONTEND_CALLBACK_URL,
} from "../config";

const CLIENT_SECRET = process.env.CLIENT_SECRET as string;

export class AuthController {
  public login(req: Request, res: Response) {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
    });

    res.redirect(`${AUTH_ENDPOINT}?${params.toString()}`);
  }

  public async callback(req: Request, res: Response) {
    console.log("Received OIDC Callback. Query Params:", req.query);
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    try {
      const tokenResponse = await axios.post(
        TOKEN_ENDPOINT,
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code as string,
          redirect_uri: REDIRECT_URI,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { id_token, access_token } = tokenResponse.data;

      console.log("Token exchange successful. ID Token received.");
      const decoded: any = jwt.decode(id_token);
      console.log("Decoded User:", decoded?.email);

      const frontendRedirect = `${FRONTEND_CALLBACK_URL}?token=${id_token}&username=${decoded.email}`;
      console.log("Redirecting to Frontend:", frontendRedirect);

      res.redirect(frontendRedirect);
    } catch (error: any) {
      console.error("Callback error:", error.response?.data || error.message);
      res.status(500).json({ message: "Authentication failed" });
    }
  }

  public register(req: Request, res: Response) {
    res.status(405).json({ message: "Register via MindX ID" });
  }
}
