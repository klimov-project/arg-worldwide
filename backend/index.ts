import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  }),
);

app.use(express.json());

// MongoDB connection setup
const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/myapp';
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const mongoStatus =
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status: 'ok',
      environment: process.env.NODE_ENV || 'development',
      mongodb: mongoStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Example API route
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    message: 'Backend API is running',
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Vercel Serverless Function Handler
export default async (req: Request, res: Response) => {
  // Ensure MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    await connectMongoDB();
  }

  // Pass request to Express app
  return app(req, res);
};

// Local development server
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectMongoDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}
