import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { applySecurityMiddleware } from './middleware/security';
import itemsRouter from './routes/items';

const app = express();

const port = Number(process.env.PORT) || 3000;

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

// Serve static files from web/dist in production
const webDistPath = path.join(__dirname, '../../web/dist');
app.use(express.static(webDistPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (_req: Request, res: Response) => {
    const indexPath = path.join(webDistPath, 'index.html');
    res.sendFile(indexPath, (err: Error | null) => {
        if (err) {
            res.status(404).json({ error: 'Not found' });
        }
    });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, "0.0.0.0", () => {
     console.log(`API listening on ${port}`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API endpoints:`);
    console.log(`   GET  /health`);
    console.log(`   GET  /api/items`);
    console.log(`   POST /api/items`);
    console.log(`📁 Static files: ${webDistPath}`);
});


