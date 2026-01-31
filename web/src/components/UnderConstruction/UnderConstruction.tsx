import { useLanguage } from '../../context/LanguageContext'
import './UnderConstruction.css'

interface UnderConstructionProps {
    title: string
    icon: React.ReactNode
}

function UnderConstruction({ title, icon }: UnderConstructionProps) {
    const { t } = useLanguage()

    return (
        <main className="under-construction">
            <div className="uc-card">
                <div className="uc-icon">{icon}</div>
                <h1 className="uc-title">{title}</h1>
                <p className="uc-message">{t('uc.tag')}</p>
                <p className="uc-description">
                    {t('uc.message')}
                </p>
                <a href="/" className="btn btn-outline-primary">
                    {t('uc.back')}
                </a>
            </div>
        </main>
    )
}

export default UnderConstruction
