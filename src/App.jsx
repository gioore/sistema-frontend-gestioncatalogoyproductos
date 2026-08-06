import { Route, Routes } from 'react-router-dom'
import { CatalogPage } from './pages/CatalogPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { Navbar } from './components/layout/Navbar.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { ProductForm } from './components/producto/ProductForm.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/producto/nuevo" element={<ProductForm />} />
          <Route path="/producto/:id/editar" element={<ProductForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App