import { Link } from 'react-router-dom'
import { AdminLogin } from '../AdminLogin'
import { useLanguage } from '../../context/LanguageContext'
import './Header.css'

function Header() {
    const { t, toggleLanguage } = useLanguage()

    return (
        <header className="header">
            <div className="header-container container">
                <Link to="/" className="header-logo">
                    <span className="logo-badge">EP</span>
                    <span className="logo-text">EduPlatform</span>
                </Link>

                <nav className="header-nav">
                    <ul className="nav-list">
                        <li><Link to="/principe" className="nav-link">{t('nav.principe')}</Link></li>
                        <li><Link to="/mindmap" className="nav-link">{t('nav.mindmap')}</Link></li>
                        <li><Link to="/posts" className="nav-link">{t('nav.last_post')}</Link></li>
                        <li><Link to="/categories" className="nav-link">{t('nav.categories')}</Link></li>
                        <li><Link to="/tags" className="nav-link">{t('nav.tags')}</Link></li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button
                        onClick={toggleLanguage}
                        className="lang-toggle-btn"
                        aria-label="Switch language"
                    >
                        {t('lang.toggle')}
                    </button>
                    <AdminLogin />
                </div>

                <button className="mobile-menu-toggle" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}

export default Header
