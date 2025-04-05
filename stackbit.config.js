// Root stackbit.config.js - Simplified version for Netlify compatibility
module.exports = {
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "18",
  buildCommand: "cd frontend && npm run build",
  devCommand: "cd frontend && npm run dev",
  installCommand: "cd frontend && npm install",
  publishDir: "frontend/dist",
  assets: {
    referenceType: "static",
    staticDir: "frontend/public",
    uploadDir: "images",
    publicPath: "/"
  },
  cmsName: "git",
  contentSources: [
    {
      name: "content",
      label: "Content",
      rootPath: "frontend/src",
      globPatterns: ["**/*.{js,jsx,json}"]
    }
  ],
  experimental: {
    editMode: true,
    ssg: {
      name: "vite",
      dataDir: "frontend/src",
      devCommand: "cd frontend && npm run dev",
      buildCommand: "cd frontend && npm run build"
    }
  }
};
