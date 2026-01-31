import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { isYouTube, getYouTubeId, isVideoFile } from '../../lib/media'
import './MediaEmbed.css'

interface MediaEmbedProps {
    url: string
    className?: string
    autoPlay?: boolean
    muted?: boolean
    loop?: boolean
}

function MediaEmbed({
    url,
    className = "video-frame",
    autoPlay = false,
    muted = true, // Default to true as requested by user
    loop = false
}: MediaEmbedProps) {
    const { t } = useLanguage()
    const [isMuted, setIsMuted] = useState(muted)

    const toggleAudio = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsMuted(!isMuted)
    }

    const renderAudioToggle = () => (
        <button
            className="audio-toggle-btn"
            onClick={toggleAudio}
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    )

    // YouTube embed
    if (isYouTube(url)) {
        const videoId = getYouTubeId(url)
        if (videoId) {
            const params = new URLSearchParams()
            if (autoPlay) params.append('autoplay', '1')
            if (isMuted) params.append('mute', '1')
            if (loop) {
                params.append('loop', '1')
                params.append('playlist', videoId)
            }

            const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`

            return (
                <div className="media-embed-wrapper">
                    <div className={className}>
                        <iframe
                            src={src}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {renderAudioToggle()}
                </div>
            )
        }
    }

    // Direct video file
    if (isVideoFile(url)) {
        return (
            <div className="media-embed-wrapper">
                <div className={className}>
                    <video
                        controls={!autoPlay}
                        src={url}
                        autoPlay={autoPlay}
                        muted={isMuted}
                        loop={loop}
                        playsInline
                    >
                        {t('lastpost.video.support')}
                    </video>
                </div>
                {renderAudioToggle()}
            </div>
        )
    }

    // Fallback: link only
    return (
        <div className="media-fallback">
            <p className="fallback-message">{t('lastpost.media.fallback')}</p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
            >
                {t('lastpost.media.open')}
            </a>
        </div>
    )
}

export default MediaEmbed
