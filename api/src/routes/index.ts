import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { AuthRouter } from "./auth.routes";
import { DebugRouter } from "./debug";

export class MainRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/health", new HealthRoutes().router);
    this.router.use("/auth", new AuthRouter().router);
    this.router.use("/debug", new DebugRouter().router);
  }
}
