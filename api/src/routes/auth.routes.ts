import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/login",
      this.authController.login.bind(this.authController)
    );
    this.router.get(
      "/callback",
      this.authController.callback.bind(this.authController)
    );
    this.router.post(
      "/register",
      this.authController.register.bind(this.authController)
    ); // Should return 405 or redirect
  }
}
