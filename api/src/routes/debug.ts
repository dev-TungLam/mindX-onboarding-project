import { Router } from "express";

export class DebugRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Simulate 500 error to trigger "Failed Requests" and "Exceptions" alerts
    this.router.get("/error", (req, res) => {
      throw new Error("Simulated 500 Error for App Insights Alert Testing");
    });

    // Simulate slow response to trigger "High Response Time" alert
    this.router.get("/slow", (req, res) => {
      const duration = 2000; // 2 seconds
      setTimeout(() => {
        res.send(`Simulated slow response (${duration}ms)`);
      }, duration);
    });
  }
}
