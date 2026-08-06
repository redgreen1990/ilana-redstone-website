import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ExternalLink, Mail, Menu, X } from 'lucide-react'
import './styles.css'

const navItems = [
  ['Ideas', '#ideas'],
  ['Books', '#books'],
  ['About', '#about'],
]

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Ilana Redstone, home">
        <span>Ilana</span> Redstone
      </a>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="button button-small" href="mailto:redstone@illinois.edu">
          Contact <ArrowRight aria-hidden="true" size={16} />
        </a>
      </nav>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  )
}

function Book({ index, title, subtitle, date, cover, tone }) {
  return (
    <article className={`book book-${tone}`}>
      <div className="book-header">
        <span>{index}</span>
        <span>{date}</span>
      </div>
      <div className="book-visual">
        <img src={cover} alt={`Cover of ${title}`} />
      </div>
      <div className="book-copy">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </article>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Header />
      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Professor · Writer · Speaker</p>
            <h1>Disagreement is not a failure of democracy.</h1>
            <p className="hero-intro">I examine how certainty shapes institutions, public trust, and our capacity to live with people who see the world differently.</p>
            <div className="hero-actions">
              <a className="button" href="#books">Explore the books <ArrowDown aria-hidden="true" size={16} /></a>
              <a className="text-link" href="#ideas">Read the central idea <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
            <nav className="profile-links" aria-label="More from me">
              <a href="https://static1.squarespace.com/static/69f922f47fc8575320726a98/t/6a4bba8bb42e515132552948/1783347851525/Redstone_CV_July_2026.pdf" target="_blank" rel="noreferrer">Curriculum vitae <ExternalLink aria-hidden="true" size={14} /></a>
              <a href="https://thecertaintytrap.substack.com/" target="_blank" rel="noreferrer">Substack <ExternalLink aria-hidden="true" size={14} /></a>
              <a href="https://linktr.ee/ilanaredstone" target="_blank" rel="noreferrer">Linktree <ExternalLink aria-hidden="true" size={14} /></a>
            </nav>
          </div>
          <figure className="hero-portrait">
            <img src="/ilana-redstone.webp" alt="Ilana Redstone" />
            <figcaption>Ilana Redstone, 2024</figcaption>
          </figure>
        </section>

        <section className="ideas" id="ideas">
          <div className="section-label">
            <span>01</span>
            <p className="eyebrow">The central idea</p>
          </div>
          <div className="ideas-content">
            <h2>Democracy manages disagreement. It does not settle it.</h2>
            <div className="ideas-copy">
              <p className="lead">The distinction matters for public trust, political culture, and institutional life.</p>
              <p>Courts, schools, corporations, and universities increasingly treat contested moral and causal claims as already decided. When institutions confuse authority with certainty, disagreement begins to look like ignorance—or guilt.</p>
              <p>My work asks how that shift happened, what it has cost, and what it would take to recover a more durable democratic culture.</p>
            </div>
          </div>
          <div className="principles" aria-label="Themes in my work">
            <div><span>01</span><h3>Question certainty</h3><p>Separate confidence in a claim from the strength of the evidence behind it.</p></div>
            <div><span>02</span><h3>Protect disagreement</h3><p>Treat dissent as a feature of pluralistic life, not evidence of moral failure.</p></div>
            <div><span>03</span><h3>Rebuild trust</h3><p>Make institutional judgment more transparent, modest, and credible.</p></div>
          </div>
        </section>

        <section className="books-section" id="books">
          <div className="section-label dark-label">
            <span>02</span>
            <p className="eyebrow">Selected books</p>
          </div>
          <div className="books-heading">
            <h2>Long-form arguments for uncertain times.</h2>
            <p>Two books about the stories institutions tell, the judgments people make, and what happens when complexity is mistaken for moral clarity.</p>
          </div>
          <div className="book-grid">
            <Book index="01" date="Forthcoming · April 2027" title="Presumption of Guilt" cover="/presumption-of-guilt.jpg" tone="blue" subtitle="How Equating Inequality with Injustice Fractured American Democracy" />
            <Book index="02" date="Published · 2024" title="The Certainty Trap" cover="/the-certainty-trap.webp" tone="burgundy" subtitle="A case for questioning certainty and judging others with greater care" />
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-label">
            <span>03</span>
            <p className="eyebrow">About</p>
          </div>
          <div className="about-content">
            <h2>Working across social science, law, and democratic theory.</h2>
            <div className="about-copy">
              <p className="lead">I’m a professor, writer, and speaker focused on institutions, culture, and public life.</p>
              <p>I’m a professor at the University of Illinois Urbana–Champaign. My work brings sociological research into conversation with questions about judgment, inequality, and the conditions required for democratic trust.</p>
              <a className="text-link" href="mailto:redstone@illinois.edu">Invite me to speak <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
          </div>
        </section>

        <section className="contact" aria-labelledby="contact-heading">
          <p className="eyebrow">Speaking · Media · Academic inquiries</p>
          <h2 id="contact-heading">Continue the conversation.</h2>
          <a href="mailto:redstone@illinois.edu"><Mail aria-hidden="true" size={24} />redstone@illinois.edu</a>
        </section>
      </main>

      <footer>
        <a className="wordmark footer-wordmark" href="#top"><span>Ilana</span> Redstone</a>
        <p>Professor · Writer · Speaker</p>
        <p>© {new Date().getFullYear()} Ilana Redstone</p>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
