// Allowlist for iframe embedding (security)
export const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'youtu.be']

/**
 * Extract YouTube video ID from various URL formats
 */
export function getYouTubeId(url: string): string | null {
    try {
        const parsed = new URL(url)
        const host = parsed.hostname.replace(/^www\./, '')

        if (host === 'youtube.com') {
            return parsed.searchParams.get('v')
        }
        if (host === 'youtu.be') {
            return parsed.pathname.slice(1)
        }
    } catch {
        return null
    }
    return null
}

/**
 * Check if URL is a direct video file (.mp4, .webm)
 */
export function isVideoFile(url: string): boolean {
    try {
        const parsed = new URL(url)
        const path = parsed.pathname.toLowerCase()
        return path.endsWith('.mp4') || path.endsWith('.webm')
    } catch {
        return false
    }
}

/**
 * Check if URL is from YouTube (allowlisted for iframe)
 */
export function isYouTube(url: string): boolean {
    try {
        const parsed = new URL(url)
        const host = parsed.hostname.replace(/^www\./, '')
        return YOUTUBE_HOSTS.some(h => host === h || host.endsWith('.' + h))
    } catch {
        return false
    }
}
