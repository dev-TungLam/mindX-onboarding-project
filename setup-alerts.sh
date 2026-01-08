#!/bin/bash

# Configuration
RESOURCE_GROUP="mindx-intern-04-rg"
APP_INSIGHTS_NAME="dev-TungLam-Onboarding-App"
SUBSCRIPTION_ID="f244cdf7-5150-4b10-b3f2-d4bff23c5f45"
RESOURCE_ID="/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/microsoft.insights/components/$APP_INSIGHTS_NAME"

echo "Setting up alerts for $APP_INSIGHTS_NAME in $RESOURCE_GROUP..."

# 1. Failed Requests > 0
echo "Creating alert: Failed Requests > 0..."
az monitor metrics alert create \
  --name "High Failed Requests" \
  --resource-group "$RESOURCE_GROUP" \
  --scopes "$RESOURCE_ID" \
  --condition "count requests/failed > 0" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --severity 1 \
  --description "Alert when there are failed requests"

# 2. Server Response Time > 1s (1000ms)
echo "Creating alert: Server Response Time > 1s..."
az monitor metrics alert create \
  --name "High Response Time" \
  --resource-group "$RESOURCE_GROUP" \
  --scopes "$RESOURCE_ID" \
  --condition "avg requests/duration > 1000" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --severity 2 \
  --description "Alert when average response time is > 1s"

# 3. Exceptions > 5
echo "Creating alert: Exceptions > 5..."
az monitor metrics alert create \
  --name "High Exception Rate" \
  --resource-group "$RESOURCE_GROUP" \
  --scopes "$RESOURCE_ID" \
  --condition "count exceptions/count > 5" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --severity 1 \
  --description "Alert when exception count > 5"

echo "Alerts setup complete."
