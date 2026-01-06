# MindX Probation Project - Secured Dashboard

This project demonstrates a full-stack application deployed on Azure Kubernetes Service (AKS), featuring a React frontend (Vite) and an Express.js API. It implements OpenID Connect authentication and secure dashboard functionality.

**Live Demo**: [https://mindx-devtunglam.52.234.236.158.nip.io](https://mindx-devtunglam.52.234.236.158.nip.io)

## Architecture

- **Frontend**: React + TypeScript + Vite (`/web`)
- **Backend**: Node.js + Express (`/api`)
- **Infrastructure**: Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Nginx Ingress Controller.

## Prerequisites

- Docker
- Kubernetes CLI (`kubectl`)
- Azure CLI (`az`)
- Access to the `mindxprobationarc` Azure Container Registry.

## Secrets Management

> [!IMPORTANT]
> This repository **does not** contain the actual `CLIENT_SECRET`. Currently, it is injected via a Kubernetes Secret.

To deploy the API successfully, you must manually create the `api-secrets` secret in your cluster:

```bash
kubectl create secret generic api-secrets \
  --from-literal=CLIENT_SECRET='YOUR_ACTUAL_CLIENT_SECRET_BP64'
```

## Deployment

### 1. Build and Push Images

**Web (Frontend)**:

```bash
cd web
docker build -t mindxprobationarc.azurecr.io/web:v8 .
docker push mindxprobationarc.azurecr.io/web:v8
```

**API (Backend)**:

```bash
cd api
docker build -t mindxprobationarc.azurecr.io/api:v8 .
docker push mindxprobationarc.azurecr.io/api:v8
```

### 2. Update Kubernetes Config

Ensure the `deployment.yaml` files reference the correct image tags (`v8`) and that the API deployment references the `api-secrets`.

### 3. Apply Resources

```bash
# Apply Frontend
kubectl apply -f web/k8s/deployment.yaml

# Apply Backend
kubectl apply -f api/k8s/deployment.yaml
```

### 4. Verify Rollout

```bash
kubectl rollout status deployment/web-deployment
kubectl rollout status deployment/api-deployment
```

## Local Development

To run locally with the production redirect URI, you may need to use `port-forward` or configure your local hosts file to match the ingress domain.

```bash
# Frontend
cd web && npm run dev

# Backend
cd api && npm run dev
```

## Week 1: App Set Up on Azure Cloud

**Status:** Completed ✅

### Achievements

- **Infrastructure:**
  - Set up **Azure Kubernetes Service (AKS)** cluster.
  - Configured **Ingress Controller** for external access.
  - Implemented **HTTPS/SSL** with Cert-Manager and Let's Encrypt.
- **Application:**
  - Developed and containerized **Node.js/Express API** (Backend).
  - Developed and containerized **React Web App** (Frontend).
  - Deployed full-stack application to AKS.
- **Authentication & Security:**
  - Integrated **OpenID Connect** authentication (using MindX IDP).
  - Secured API endpoints with JWT validation.
  - Implemented protected routes on the Client.
