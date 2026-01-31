import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Express } from 'express';

export function applySecurityMiddleware(app: Express): void {
    // Helmet - Security headers
    app.use(helmet());

    // CORS - Restrict origins
    const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
    app.use(cors({
        origin: corsOrigin.split(',').map(o => o.trim()),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));

    // Rate limiting - 100 requests per 15 minutes per IP
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: 'Too many requests, please try again later.' }
    });
    app.use('/api', limiter);
}
