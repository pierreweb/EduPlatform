export interface Item {
    id: string;
    url: string;
    comment: string | null;
    created_at: string;
    tags?: string[];
    metadata?: any;
}
