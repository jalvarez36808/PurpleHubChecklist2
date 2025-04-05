# Purple Hub Deployment Guide

This document provides instructions for deploying the Purple Hub website to various hosting platforms.

## Build Instructions

Before deploying, you need to build the project:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies if you haven't already
npm install

# Build the project
npm run build
```

This will create a `dist` directory with the production-ready assets.

## Deployment Options

### Option 1: Vercel

Vercel offers a simple deployment process and excellent support for React applications:

1. Sign up at [Vercel](https://vercel.com/)
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` and follow the prompts
4. For subsequent deployments: `vercel --prod`

### Option 2: Firebase Hosting

1. Sign up for [Firebase](https://firebase.google.com/)
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Run `firebase login`
4. Initialize Firebase in your project: `firebase init hosting`
   - Set "dist" as the public directory
   - Configure as a single-page app (y)
5. Deploy: `firebase deploy --only hosting`

### Option 3: Render

1. Create an account on [Render](https://render.com/)
2. Create a new Static Site
3. Connect to your repository
4. Set the build command to `npm run build`
5. Set the publish directory to `dist`

### Option 4: Digital Ocean App Platform

1. Create an account on [Digital Ocean](https://www.digitalocean.com/)
2. Create a new App
3. Connect to your repository
4. Set the build command to `npm run build`
5. Set the output directory to `dist`

## SPA Routing Configuration

For proper client-side routing, you'll need to configure your hosting provider to serve the `index.html` file for all routes:

### Firebase
This is handled if you selected "Configure as a single-page app" during setup.

### Render
Add a `render.yaml` file:
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

### Digital Ocean
Add a `.do/routes.json` file:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Environment Variables

If your application requires environment variables like your Supabase connection details, configure them through your hosting provider's dashboard.

## SSL/TLS 

All the recommended hosting providers above provide free SSL certificates for your domain.

## Custom Domains

All the hosting providers mentioned support custom domains. Follow your provider's specific instructions to configure your domain. 