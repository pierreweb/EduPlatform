import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import MediaEmbed from '../MediaEmbed'
import tagsData from '../../data/tags.json'
import './Hero.css'

const VIDEOS = tagsData.heroVideos

function Hero() {
    const { isAdmin } = useAuth()
    const { t } = useLanguage()
    const [videoIndex, setVideoIndex] = useState(0)

    const toggleVideo = () => {
        setVideoIndex((prev: number) => (prev + 1) % VIDEOS.length)
    }

    return (
        <section className="hero">
            <div className="hero-container container">
                {/* Left Column - Content + Video */}
                <div className="hero-left">
                    {/* Content Section */}
                    <div className="hero-content">
                        <h2 className="content-title">{t('hero.title')}</h2>
                        <p className="content-description">
                            {t('hero.description')}
                        </p>

                        {/* Video with non-rectangular frame */}
                        <div className="video-wrapper">
                            <MediaEmbed
                                url={VIDEOS[videoIndex]}
                                className="video-frame-organic"
                                autoPlay
                                muted
                                loop
                            />
                        </div>

                        {/* Prof Button Toggle */}
                        <div className="hero-actions">
                            <button className="btn-prof" onClick={toggleVideo}>
                                {t('hero.btn.prof')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Numbered Cards with Router Links */}
                <div className="hero-right">
                    <Link to="/principe" className="numbered-card">
                        <span className="number">1</span>
                        <div className="content">
                            <div className="title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18" />
                                    <path d="M9 21V9" />
                                </svg>
                                {t('hero.card.principe.title')}
                            </div>
                            <div className="subtitle">{t('hero.card.principe.subtitle')}</div>
                        </div>
                    </Link>

                    <Link to="/mindmap" className="numbered-card">
                        <span className="number">2</span>
                        <div className="content">
                            <div className="title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20" />
                                    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
                                </svg>
                                {t('hero.card.mindmap.title')}
                            </div>
                            <div className="subtitle">{t('hero.card.mindmap.subtitle')}</div>
                        </div>
                    </Link>

                    <Link to="/last" className="numbered-card">
                        <span className="number">3</span>
                        <div className="content">
                            <div className="title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <path d="M14 2v6h6" />
                                    <path d="M16 13H8" />
                                    <path d="M16 17H8" />
                                    <path d="M10 9H8" />
                                </svg>
                                {t('hero.card.last.title')}
                            </div>
                            <div className="subtitle">{t('hero.card.last.subtitle')}</div>
                        </div>
                    </Link>

                    {/* Admin-only button */}
                    {isAdmin && (
                        <Link to="/admin/add" className="numbered-card admin-card">
                            <span className="number admin">+</span>
                            <div className="content">
                                <div className="title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                    {t('hero.card.admin.title')}
                                </div>
                                <div className="subtitle">{t('hero.card.admin.subtitle')}</div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Hero
