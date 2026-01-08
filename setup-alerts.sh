#!/bin/bash

# Configuration
RESOURCE_GROUP="mindx-intern-04-rg"
APP_INSIGHTS_NAME="dev-TungLam-Onboarding-App"
SUBSCRIPTION_ID="f244cdf7-5150-4b10-b3f2-d4bff23c5f45"
RESOURCE_ID="/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/microsoft.insights/components/$APP_INSIGHTS_NAME"

echo "Setting up alerts for $APP_INSIGHTS_NAME in $RESOURCE_GROUP..."

# 0. Create Action Group (Notifications)
ACTION_GROUP_NAME="MindX-Onboarding-Alerts"
EMAIL_2="lamnt01@mindx.com.vn"

echo "Re-creating Action Group: $ACTION_GROUP_NAME..."
# Delete existing to remove old receivers (e.g. personal email)
az monitor action-group delete \
  --name "$ACTION_GROUP_NAME" \
  --resource-group "$RESOURCE_GROUP" \

# Create fresh
az monitor action-group create \
  --name "$ACTION_GROUP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --short-name "MindXAlerts"

echo "Adding Email Receivers..."
# Add Work Email
az monitor action-group update \
  --name "$ACTION_GROUP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --add email_receivers name="WorkEmail" email_address="$EMAIL_2" use_common_alert_schema=true

# Get Action Group ID
ACTION_GROUP_ID=$(az monitor action-group show --name "$ACTION_GROUP_NAME" --resource-group "$RESOURCE_GROUP" --query id --output tsv)

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
  --action "$ACTION_GROUP_ID" \
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
  --action "$ACTION_GROUP_ID" \
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
  --action "$ACTION_GROUP_ID" \
  --description "Alert when exception count > 5"

echo "Alerts setup complete."
