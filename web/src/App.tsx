import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SectionDivider } from './components/SectionDivider'
import PrincipePage from './pages/Principe'
import MindmapPage from './pages/Mindmap'
import PostsPage from './pages/Posts'
import LastPost from './pages/LastPost'
import CategoriesPage from './pages/Categories'
import TagsPage from './pages/Tags'
import AdminAddLink from './pages/AdminAddLink'

function HomePage() {
    return (
        <>
            <Header />
            <SectionDivider />
            <Hero />
        </>
    )
}

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/principe" element={<><Header /><SectionDivider /><PrincipePage /></>} />
                        <Route path="/mindmap" element={<><Header /><SectionDivider /><MindmapPage /></>} />
                        <Route path="/posts" element={<><Header /><SectionDivider /><PostsPage /></>} />
                        <Route path="/last" element={<><Header /><SectionDivider /><LastPost /></>} />
                        <Route path="/categories" element={<><Header /><SectionDivider /><CategoriesPage /></>} />
                        <Route path="/tags" element={<><Header /><SectionDivider /><TagsPage /></>} />
                        <Route path="/admin/add" element={<><Header /><SectionDivider /><AdminAddLink /></>} />
                    </Routes>
                </BrowserRouter>
            </LanguageProvider>
        </AuthProvider>
    )
}

export default App
