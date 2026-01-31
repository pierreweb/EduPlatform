import { useLanguage } from '../../context/LanguageContext'
import tagsData from '../../data/tags.json'
import './Tags.css'

interface Tag {
    id: string
    fr: string
    en: string
}

function Tags() {
    const { t, language } = useLanguage()
    const tags = tagsData.tags as Tag[]

    return (
        <main className="tags-page">
            <div className="container">
                <header className="page-header">
                    <h1>{t('nav.tags')}</h1>
                </header>
                <div className="cloud-container">
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="cloud-item"
                        >
                            {language === 'fr' ? tag.fr : tag.en}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Tags
