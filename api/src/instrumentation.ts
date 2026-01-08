import * as dotenv from "dotenv";
import * as appInsights from "applicationinsights";

// Load env vars first
dotenv.config();

// Initialize Azure Application Insights
if (process.env.APP_INSIGHTS_CONNECTION_STRING) {
  console.log("Starting Application Insights...");
  appInsights.setup(process.env.APP_INSIGHTS_CONNECTION_STRING)
    .setAutoCollectConsole(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start();

  // Set Cloud Role Name
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "dev-TungLam-Onboarding-App";
  
  // Track startup event
  appInsights.defaultClient.trackEvent({ name: "AppInitialization", properties: { message: "App Insights Started" } });
  
  console.log("Application Insights started (telemetry active). Role: dev-TungLam-Onboarding-App");
} else {
  console.warn("APP_INSIGHTS_CONNECTION_STRING not found. Telemetry disabled.");
}
