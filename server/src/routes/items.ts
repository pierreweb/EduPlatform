import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const router = Router();

// Zod schema for item validation (matches EduPlatform table)
const createItemSchema = z.object({
    url: z.string().url({ message: 'Invalid URL format' }),
    comment: z.string().optional()
});

// POST /api/items - Create a new item
router.post('/', async (req: Request, res: Response) => {
    try {
        // Check Supabase is configured
        if (!isSupabaseConfigured() || !supabase) {
            return res.status(503).json({
                error: 'Database not configured',
                message: 'Supabase credentials are not set. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
            });
        }

        // Validate request body
        const validation = createItemSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: validation.error.flatten().fieldErrors
            });
        }

        const { url, comment } = validation.data;

        // Insert into Supabase
        const { data, error } = await supabase
            .from('EduPlatform')
            .insert({
                url,
                comment: comment || null
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({
                error: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
        }

        return res.status(201).json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/items - List recent items
router.get('/', async (req: Request, res: Response) => {
    try {
        // Check Supabase is configured
        if (!isSupabaseConfigured() || !supabase) {
            return res.status(503).json({
                error: 'Database not configured',
                message: 'Supabase credentials are not set.'
            });
        }

        // Query parameters
        const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
        const offset = parseInt(req.query.offset as string) || 0;

        // Fetch items from Supabase
        const { data, error, count } = await supabase
            .from('EduPlatform')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Supabase query error:', error);
            return res.status(500).json({
                error: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
        }

        return res.json({
            items: data,
            total: count,
            limit,
            offset
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/items/latest - Get the most recent item
router.get('/latest', async (req: Request, res: Response) => {
    try {
        // Check Supabase is configured
        if (!isSupabaseConfigured() || !supabase) {
            return res.status(503).json({
                error: 'Database not configured',
                message: 'Supabase credentials are not set.'
            });
        }

        // Fetch most recent item
        const { data, error } = await supabase
            .from('EduPlatform')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            // PGRST116 = no rows returned
            if (error.code === 'PGRST116') {
                return res.status(404).json({
                    error: 'No items found',
                    message: 'Aucun post pour le moment'
                });
            }
            console.error('Supabase query error:', error);
            return res.status(500).json({
                error: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
        }

        return res.json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
