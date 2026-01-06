import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { AuthRouter } from "./auth.routes";

export class MainRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/health", new HealthRoutes().router);
    this.router.use("/auth", new AuthRouter().router);
  }
}
