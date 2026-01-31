import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import './AdminLogin.css'

function AdminLogin() {
    const { user, isAdmin, signIn, signOut, loading } = useAuth()
    const { t } = useLanguage()
    const [showForm, setShowForm] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    if (loading) {
        return null
    }

    // If logged in as admin, show logout button
    if (user && isAdmin) {
        return (
            <div className="admin-login">
                <span className="admin-badge">{t('admin.badge')}</span>
                <button onClick={signOut} className="btn btn-outline-secondary btn-sm">
                    {t('nav.logout')}
                </button>
            </div>
        )
    }

    // If logged in but not admin
    if (user && !isAdmin) {
        return (
            <div className="admin-login">
                <span className="admin-badge admin-badge-warning">{t('admin.badge.non')}</span>
                <button onClick={signOut} className="btn btn-outline-secondary btn-sm">
                    {t('nav.logout')}
                </button>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)

        const { error } = await signIn(email, password)

        if (error) {
            setError(error.message)
        } else {
            setShowForm(false)
            setEmail('')
            setPassword('')
        }

        setSubmitting(false)
    }

    if (!showForm) {
        return (
            <button
                onClick={() => setShowForm(true)}
                className="btn btn-outline-primary btn-sm"
            >
                {t('nav.login_admin')}
            </button>
        )
    }

    return (
        <div className="admin-login-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder={t('admin.login.form.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder={t('admin.login.form.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        disabled={submitting}
                    >
                        {submitting ? t('admin.login.submitting') : t('admin.login.submit')}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        {t('admin.login.cancel')}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin
