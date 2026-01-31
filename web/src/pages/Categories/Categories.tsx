import { useLanguage } from '../../context/LanguageContext'
import tagsData from '../../data/tags.json'
import './Categories.css'

interface Category {
    id: string
    fr: string
    en: string
}

function Categories() {
    const { t, language } = useLanguage()
    const categories = tagsData.categories as Category[]

    const getCategoryClass = (id: string) => {
        if (id === 'linkedin_profile' || id === 'post_linkedin') return 'cat-linkedin'
        if (id === 'youtube_channel') return 'cat-youtube'
        if (id === 'website') return 'cat-website'
        if (id === 'online_courses') return 'cat-online'
        return ''
    }

    return (
        <main className="categories-page">
            <div className="container">
                <header className="page-header">
                    <h1>{t('nav.categories')}</h1>
                </header>
                <div className="cloud-container">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`cloud-item ${getCategoryClass(cat.id)}`}
                        >
                            {language === 'fr' ? cat.fr : cat.en}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Categories
