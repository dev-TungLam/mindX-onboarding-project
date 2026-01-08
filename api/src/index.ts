import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import * as appInsights from "applicationinsights";
import { MainRouter } from "./routes";

dotenv.config();

// Initialize Azure Application Insights
if (process.env.APP_INSIGHTS_CONNECTION_STRING) {
  appInsights.setup(process.env.APP_INSIGHTS_CONNECTION_STRING)
    .setAutoCollectConsole(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start();
}

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/api", new MainRouter().router);
    this.app.use("/", new MainRouter().router);

    // Root endpoint for simple verification
    this.app.get("/", (req, res) => {
      res.send("Hello World from Azure API");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.listen();
