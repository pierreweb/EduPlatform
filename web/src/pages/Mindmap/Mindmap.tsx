import { useLanguage } from '../../context/LanguageContext'
import tagsData from '../../data/tags.json'
import './Mindmap.css'

interface TaxonomyNode {
    id: string
    fr: string
    en: string
    children?: TaxonomyNode[]
}

const MindmapPage = () => {
    const { language, t } = useLanguage()
    const taxonomy = (tagsData as any).taxonomy as TaxonomyNode[]

    const renderNodes = (nodes: TaxonomyNode[], level: number = 0) => {
        return (
            <div className={level === 0 ? "subcategories-list" : "nested-children"}>
                {nodes.map(node => (
                    <div key={node.id} className={level === 0 ? "subcategory-item" : "nested-item"}>
                        {language === 'fr' ? node.fr : node.en}
                        {node.children && renderNodes(node.children, level + 1)}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <main className="mindmap-page">
            <div className="mindmap-container">
                <div className="mindmap-hub">
                    {t('nav.mindmap')}
                </div>

                <div className="mindmap-branches">
                    {taxonomy.map(category => (
                        <section
                            key={category.id}
                            className={`mindmap-branch branch-${category.id}`}
                        >
                            <div className="category-node">
                                {language === 'fr' ? category.fr : category.en}
                            </div>
                            {category.children && renderNodes(category.children, 0)}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default MindmapPage
