import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import ScrollPhotoSection from './components/ScrollPhotoSection'
import Stats from './components/Stats'
import Collection from './components/Collection'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <Ticker />
          <ScrollPhotoSection />
          <Stats />
          <Collection />
          <Gallery />
          <Footer />
        </>
      )}
    </>
  )
}
