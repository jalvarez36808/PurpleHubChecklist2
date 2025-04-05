import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Import routes
import documentsRouter from './routes/documents.js';
import authRouter from './routes/auth.js';
import resourcesRouter from './routes/resources.js';
import tasksRouter from './routes/tasks.js';
import adminRouter from './routes/admin.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Route registration
app.use('/api/documents', documentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/admin', adminRouter);

// Check if in development mode and add dev admin API paths
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/dev-admin', adminRouter);
  console.log('Development admin API routes enabled at /api/dev-admin');
}

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Function to find an available port
const findAvailablePort = async (startPort) => {
  const net = await import('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
    
    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
};

// Start server with dynamic port
const startServer = async () => {
  try {
    const preferredPort = parseInt(process.env.PORT) || 5001;
    const port = await findAvailablePort(preferredPort);
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      // Update the port in process.env for other parts of the application
      process.env.PORT = port.toString();
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();