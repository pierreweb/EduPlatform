import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import './AdminAddLink.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function AdminAddLink() {
    const { isAdmin, loading } = useAuth()
    const navigate = useNavigate()
    const [url, setUrl] = useState('')
    const [comment, setComment] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    // Redirect non-admin users
    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/')
        }
    }, [isAdmin, loading, navigate])

    if (loading) {
        return <div className="admin-page-loading">Chargement...</div>
    }

    if (!isAdmin) {
        return <div className="admin-page-unauthorized">Non autorisé</div>
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        try {
            // Get current session and access token
            const { data: { session } } = await supabase.auth.getSession()

            if (!session?.access_token) {
                throw new Error('Session expirée. Veuillez vous reconnecter.')
            }

            const response = await fetch(`${API_BASE_URL}/api/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ url, comment: comment || undefined })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || `Erreur ${response.status}`)
            }

            setStatus('success')
            setMessage('Lien ajouté avec succès!')
            setUrl('')
            setComment('')

            // Reset after 3s
            setTimeout(() => {
                setStatus('idle')
                setMessage('')
            }, 3000)
        } catch (err) {
            setStatus('error')
            setMessage(err instanceof Error ? err.message : 'Erreur inconnue')
        }
    }

    return (
        <main className="admin-page">
            <div className="admin-container">
                <h1 className="admin-title">Ajouter un lien</h1>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label htmlFor="url">URL *</label>
                        <input
                            type="url"
                            id="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Commentaire</label>
                        <textarea
                            id="comment"
                            placeholder="Description optionnelle..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Ajout en cours...' : 'Ajouter le lien'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/')}
                        >
                            Retour
                        </button>
                    </div>

                    {message && (
                        <p className={`form-message ${status}`}>{message}</p>
                    )}
                </form>
            </div>
        </main>
    )
}

export default AdminAddLink
