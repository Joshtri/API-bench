import Benefits from './components/Benefits.jsx'
import Faq from './components/Faq.jsx'
import Footer, { FinalCta } from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Nav from './components/Nav.jsx'
import Problem from './components/Problem.jsx'
import Proof from './components/Proof.jsx'
import Steps from './components/Steps.jsx'
import Tagline from './components/Tagline.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Problem />
        <Benefits />
        <Tagline />
        <Steps />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
