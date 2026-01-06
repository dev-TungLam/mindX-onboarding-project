import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

export class HealthRoutes {
  public router: Router;
  private healthController: HealthController;

  constructor() {
    this.router = Router();
    this.healthController = new HealthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.healthController.getHealth);
  }
}
