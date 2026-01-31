import express, { Request, Response, NextFunction } from 'express';
import { applySecurityMiddleware } from './middleware/security';
import itemsRouter from './routes/items';

const app = express();
const PORT = process.env.PORT || 3000;

// Apply security middleware
applySecurityMiddleware(app);

// Body parsing
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
});

// API routes
app.use('/api/items', itemsRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API endpoints:`);
    console.log(`   GET  /health`);
    console.log(`   GET  /api/items`);
    console.log(`   POST /api/items`);
});
