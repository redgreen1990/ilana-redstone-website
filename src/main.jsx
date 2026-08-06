import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, Mail, Menu, X } from 'lucide-react'
import './styles.css'

const navItems = [
  ['Work', '#work'],
  ['Books', '#books'],
  ['About', '#about'],
]

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Ilana Redstone, home">IR<span>.</span></a>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="mailto:redstone@illinois.edu">Contact <ArrowRight size={15} /></a>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Entry({ onEnter }) {
  const scene = useRef(null)
  const move = (event) => {
    if (!scene.current) return
    const x = (event.clientX / window.innerWidth - .5) * 2
    const y = (event.clientY / window.innerHeight - .5) * 2
    scene.current.style.setProperty('--mx', x)
    scene.current.style.setProperty('--my', y)
  }

  return (
    <section className="entry" ref={scene} onPointerMove={move} aria-label="Enter the website">
      <div className="entry-top"><span>Ilana Redstone</span><span>Professor · Writer · Speaker</span></div>
      <div className="entry-center">
        <p className="entry-thesis"><span>Democracy is a way</span><span>of managing disagreement,</span><span>not a mechanism</span><span>for settling it.</span></p>
        <button onClick={onEnter}>Explore <ArrowRight size={17} /></button>
      </div>
    </section>
  )
}

function BookCard({ number, title, year, subtitle, light, cover }) {
  return (
    <article className={light ? 'book-card light' : 'book-card'}>
      <div className="book-meta"><span>{number}</span><span>{year}</span></div>
      {cover ? <img className="book-cover" src={cover} alt={`Cover of ${title}`} /> : <div className="future-cover"><span>Forthcoming</span><strong>{title}</strong><small>Ilana Redstone</small></div>}
      <div className="book-details"><h3>{title}</h3><p>{subtitle}</p></div>
    </article>
  )
}

function App() {
  const [entered, setEntered] = useState(false)
  return (
    <main id="top" className={entered ? 'entered' : 'not-entered'}>
      {!entered && <Entry onEnter={() => setEntered(true)} />}
      <Header />

      <section className="hero">
        <h1 className="hero-message reveal delay-1">The distinction matters for public trust, our political culture, and our <em>social and institutional life.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <a className="circle-link" href="#work" aria-label="Explore the work"><ArrowDown /></a>
        </div>
      </section>

      <section className="statement" id="work">
        <p className="eyebrow">The central question</p>
        <div className="statement-grid">
          <h2>The cost of <span>certainty.</span></h2>
          <div className="statement-copy">
            <p className="statement-intro">I examine how certainty shapes our institutions—and what democratic life asks of us instead.</p>
            <p>American institutions have increasingly forgotten the difference between managing disagreement and settling it. Courts, schools, corporations, and universities often treat contested moral and causal claims as already decided.</p>
            <p>My work examines how that shift happened, what it has cost, and what it would take to recover.</p>
          </div>
        </div>
      </section>

      <section className="books" id="books">
        <div className="section-heading">
          <h2><span>Books are</span> long-form arguments<br />for uncertain times.</h2>
        </div>
        <div className="book-grid">
          <BookCard number="01" year="April 7, 2027" title="Presumption of Guilt" cover="/presumption-of-guilt.jpg" subtitle="How Equating Inequality with Injustice Fractured American Democracy" />
          <BookCard light number="02" year="2024" title="The Certainty Trap" cover="/the-certainty-trap.webp" subtitle="Why We Need to Question Ourselves More—and How We Can Judge Others Less" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="portrait-wrap">
          <img src="/ilana-redstone.webp" alt="Portrait of Ilana Redstone" />
          <p>Photo, 2024</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About me</p>
          <h2>Social science,<br />law &amp; democratic theory.</h2>
          <p>I’m a professor at the University of Illinois Urbana-Champaign. I write, speak, and occasionally consult on questions at the intersection of institutions, culture, and public life.</p>
          <div className="about-links">
            <a href="mailto:redstone@illinois.edu">Speaking inquiries <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="contact">
        <p className="eyebrow">Get in touch</p>
        <a href="mailto:redstone@illinois.edu"><Mail size={30} /> redstone@illinois.edu</a>
      </section>

      <footer>
        <a className="wordmark inverse" href="#top">IR<span>.</span></a>
        <p>Ilana Redstone</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
