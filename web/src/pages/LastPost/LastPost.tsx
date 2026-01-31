import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import MediaEmbed from '../../components/MediaEmbed'
import './LastPost.css'

function LastPost() {
    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { t, language } = useLanguage()

    useEffect(() => {
        async function fetchLatest() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/items/latest`)

                if (response.status === 404) {
                    setItem(null)
                    setLoading(false)
                    return
                }

                if (!response.ok) {
                    throw new Error(t('lastpost.error'))
                }

                const data = await response.json()
                setItem(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur inconnue')
            } finally {
                setLoading(false)
            }
        }

        fetchLatest()
    }, [t])

    // Loading state
    if (loading) {
        return (
            <main className="last-post-page">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>{t('lastpost.loading')}</p>
                    </div>
                </div>
            </main>
        )
    }

    // Error state
    if (error) {
        return (
            <main className="last-post-page">
                <div className="container">
                    <div className="error-state">
                        <p className="error-message">{error}</p>
                        <Link to="/" className="btn btn-primary">{t('lastpost.empty.back')}</Link>
                    </div>
                </div>
            </main>
        )
    }

    // Empty state
    if (!item) {
        return (
            <main className="last-post-page">
                <div className="container">
                    <div className="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M12 18v-6" />
                            <path d="M9 15h6" />
                        </svg>
                        <h2>{t('lastpost.empty.title')}</h2>
                        <p>{t('lastpost.empty.desc')}</p>
                        <Link to="/" className="btn btn-primary">{t('lastpost.empty.back')}</Link>
                    </div>
                </div>
            </main>
        )
    }

    // Success state with item
    return (
        <main className="last-post-page">
            <div className="container">
                <header className="page-header">
                    <Link to="/" className="back-link">{t('lastpost.back')}</Link>
                    <h1>{t('lastpost.title')}</h1>
                    <time className="post-date">
                        {new Date(item.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </time>
                </header>

                <article className="post-content">
                    <MediaEmbed url={item.url} />

                    {item.comment && (
                        <div className="post-comment">
                            <p>{item.comment}</p>
                        </div>
                    )}
                </article>
            </div>
        </main>
    )
}

export default LastPost
