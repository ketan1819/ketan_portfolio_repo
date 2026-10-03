import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { About, Skills, Architecture, Journey, Achievements, Certifications, ResumeCTA, Contact, Footer } from './components/Sections'
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><About /><Skills /><Projects /><Architecture /><Journey /><Achievements /><Certifications /><ResumeCTA /><Contact />
      </main>
      <Footer />
    </>
  )
}
