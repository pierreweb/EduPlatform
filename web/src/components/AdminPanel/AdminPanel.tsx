import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './AdminPanel.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function AdminPanel() {
    const { session, isAdmin } = useAuth()
    const [url, setUrl] = useState('')
    const [comment, setComment] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    // Only render for admin
    if (!isAdmin) {
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!session?.access_token) {
            setStatus('error')
            setMessage('Non authentifié')
            return
        }

        setStatus('loading')
        setMessage('')

        try {
            const response = await fetch(`${API_URL}/api/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ url, comment })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Erreur lors de l\'ajout')
            }

            setStatus('success')
            setMessage('Item ajouté avec succès!')
            setUrl('')
            setComment('')

            // Reset status after 3s
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
        <div className="admin-panel">
            <h3 className="admin-panel-title">
                <span className="admin-icon">⚡</span>
                Ajouter un item
            </h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-row">
                    <input
                        type="url"
                        placeholder="URL (https://...)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Commentaire (optionnel)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-row">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Ajout...' : 'Ajouter'}
                    </button>
                </div>
                {message && (
                    <p className={`form-message ${status}`}>{message}</p>
                )}
            </form>
        </div>
    )
}

export default AdminPanel
