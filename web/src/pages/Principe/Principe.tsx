import { useLanguage } from '../../context/LanguageContext'
import './Principe.css'

function PrincipePage() {
    const { t } = useLanguage()

    return (
        <main className="principe-page">
            <div className="container">
                <header className="principe-header">
                    <h1 className="principe-title">{t('principe.title')}</h1>
                    <p className="principe-intro">{t('principe.intro')}</p>
                </header>

                <section className="principe-section">
                    <h2 className="section-title">{t('principe.selection.title')}</h2>
                    <p className="principe-text">{t('principe.selection.text')}</p>
                </section>

                <section className="principe-section">
                    <h2 className="section-title">{t('principe.trust.title')}</h2>
                    <div className="trust-grid">
                        <div className="trust-card">
                            <h3>{t('principe.trust.item1.title')}</h3>
                            <p>{t('principe.trust.item1.text')}</p>
                        </div>
                        <div className="trust-card">
                            <h3>{t('principe.trust.item2.title')}</h3>
                            <p>{t('principe.trust.item2.text')}</p>
                        </div>
                        <div className="trust-card">
                            <h3>{t('principe.trust.item3.title')}</h3>
                            <p>{t('principe.trust.item3.text')}</p>
                        </div>
                    </div>
                </section>

                <section className="principe-section">
                    <h2 className="section-title">{t('principe.compare.title')}</h2>
                    <div className="comparison-container">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>{t('principe.compare.header.feat')}</th>
                                    <th>{t('principe.compare.header.acad')}</th>
                                    <th>{t('principe.compare.header.self')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{t('principe.compare.row1.feat')}</td>
                                    <td>{t('principe.compare.row1.acad')}</td>
                                    <td>{t('principe.compare.row1.self')}</td>
                                </tr>
                                <tr>
                                    <td>{t('principe.compare.row2.feat')}</td>
                                    <td>{t('principe.compare.row2.acad')}</td>
                                    <td>{t('principe.compare.row2.self')}</td>
                                </tr>
                                <tr>
                                    <td>{t('principe.compare.row3.feat')}</td>
                                    <td>{t('principe.compare.row3.acad')}</td>
                                    <td>{t('principe.compare.row3.self')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="principe-footer">
                    <p>{t('principe.footer')}</p>
                </div>
            </div>
        </main>
    )
}

export default PrincipePage
