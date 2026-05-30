import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import CollectionPage from './pages/CollectionPage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Technology from './components/Technology'
import About from './components/About'
import Journal from './components/Journal'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import SearchOverlay from './components/SearchOverlay'
import ProtectedRoute from './components/ProtectedRoute'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import ReturnsPage from './pages/ReturnsPage'
import SizeChartPage from './pages/SizeChartPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'
import AthletesPage from './pages/AthletesPage'
import SustainabilityPage from './pages/SustainabilityPage'
import CareersPage from './pages/CareersPage'
import MethodPage from './pages/MethodPage'
import CollectionLayoutPage from './pages/CollectionLayoutPage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmailConfirmPage from './pages/EmailConfirmPage'
import AccountLayout from './pages/AccountLayout'
import AccountPage from './pages/AccountPage'
import OrdersPage from './pages/OrdersPage'
import AddressesPage from './pages/AddressesPage'

function MainPage() {
  const [shopCategory, setShopCategory] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleCategorySelect = (cat: string | null) => {
    setShopCategory(cat)
    setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <Navbar onCategorySelect={handleCategorySelect} onSearchOpen={() => setSearchOpen(true)} />
      <Hero />
      <Shop category={shopCategory} setCategory={setShopCategory} />
      <Technology />
      <About />
      <Journal />
      <Footer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"              element={<MainPage />} />
            <Route path="/login"         element={<LoginPage />} />
            <Route path="/register"      element={<RegisterPage />} />
            <Route path="/auth/confirm"  element={<EmailConfirmPage />} />
            <Route path="/contact"       element={<ContactPage />} />
            <Route path="/faq"           element={<FAQPage />} />
            <Route path="/returns"       element={<ReturnsPage />} />
            <Route path="/size-chart"    element={<SizeChartPage />} />
            <Route path="/privacy"       element={<PrivacyPage />} />
            <Route path="/terms"         element={<TermsPage />} />
            <Route path="/cookies"       element={<CookiesPage />} />
            <Route path="/athletes"      element={<AthletesPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/careers"       element={<CareersPage />} />
            <Route path="/method"        element={<MethodPage />} />
            <Route path="/collection-v3" element={<CollectionLayoutPage />} />
            <Route path="/products/:slug"       element={<ProductPage />} />
            <Route path="/collections/:category" element={<CollectionPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<AccountLayout />}>
                <Route index element={<AccountPage />} />
                <Route path="orders"    element={<OrdersPage />} />
                <Route path="addresses" element={<AddressesPage />} />
              </Route>
            </Route>
          </Routes>
          <CookieBanner />
          <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#F0EDE6', border: '1px solid #222', fontFamily: 'Barlow, sans-serif', fontSize: '13px' } }} />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
    </HelmetProvider>
  )
}
