import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ExternalLink, Mail, Menu, X } from 'lucide-react'
import './styles.css'

const navItems = [
  ['About', '#about'],
  ['Central idea', '#ideas'],
  ['Books', '#books'],
  ['Book preview', '#preview'],
]

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

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

function Book({ index, title, subtitle, date, cover, tone, href }) {
  const BookElement = href ? 'a' : 'article'

  return (
    <BookElement className={`book book-${tone}`} href={href} target={href ? '_blank' : undefined} rel={href ? 'noreferrer' : undefined}>
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
    </BookElement>
  )
}

const cascadeGroups = [
  ['Agency, harm, and responsibility', [
    ['Power', "If disparities persist across employment, housing, education, and health at once, something must be sustaining those differences. Formerly, power was the observable capacity to decide, command resources, or compel. Under the revised definition, power is a position in a group hierarchy, regardless of a person's individual influence.", 'You hold power whether or not you ever exercise it.'],
    ['Harm', 'If inequality is unjust, then disparities themselves constitute injury. Formerly, harm was an injury to a specific person traceable to an act. Under the equation, it requires no identifiable actor or incident.', "You don't have to do anything to cause harm."],
    ['Lived experience', "If discrimination operates through mechanisms outsiders cannot observe, only those experiencing it can identify when it occurs. Formerly, a person's experience was evidence to be weighed alongside other evidence. Under the revised version, it makes the person experiencing harm the authority on whether it occurred.", "You don't get to decide whether that was harmful."],
    ['Intent and responsibility', "If discrimination no longer requires intent, what a person meant cannot bear on whether discrimination occurred. Formerly, intent distinguished deliberate acts from accidental ones, and moral responsibility attached to what a person chose. Under the equation, intent is set aside in favor of impact, and responsibility attaches to the effects a person's position perpetuates.", 'Impact matters more than intent. You are responsible for what you benefit from.'],
  ]],
  ['Identity and belonging', [
    ['Gender', 'If differences in outcomes between men and women are taken as evidence of discrimination, biology cannot be given explanatory force. Formerly, gender referred to the social meanings associated with sex while remaining related to biological sex. Under the revised definition, gender is entirely socially constructed and independent of biology.', 'Appeals to biology rationalize inequality.'],
    ['Gender identity', "If gender is independent of biology, membership in a gender category rests on self-definition. Formerly, identity described a person's understanding of self within shared social categories. Under the revised definition, gender identity is entirely self-authored and authoritative.", 'Only you can say what your gender is.'],
    ['Diversity', "If discrimination is measured by whether an institution's demographic makeup reflects the broader population, who is present becomes the measure. Formerly, diversity referred to a range of experience or perspective. Under the equation, it means demographic composition.", "If the room doesn't look like the population, racism is why."],
    ['Inclusion', 'Formerly, inclusion meant access to and participation in an institution. Under the revised definition, access and demographic representation are not enough; inclusion also requires a subjective sense of belonging.', "Access isn't enough if people don't feel they belong."],
  ]],
  ['Standards of fairness', [
    ['Colorblindness', "If disparities are evidence of discrimination, declining to attend to race means declining to see it. Formerly, colorblindness was the principle that race should not bear on how people are treated. Under the revised definition, it sustains a racist status quo.", 'Not seeing race is how racism survives.'],
    ['Neutrality', "If a rule's effects determine whether it discriminates, its even-handedness on its face is not a defense. Formerly, neutrality was the absence of preference in a rule. Under the equation, it's a property of facially neutral choices that can produce or sustain unequal effects.", 'There is no neutral. Neutrality is a side.'],
    ['Merit', "If unequal results indicate injustice, a selection standard is judged by the distribution it produces. Formerly, merit was a criterion for selection. Under the revised definition, it is understood as a justification for preserving unfair results.", 'Focusing on merit is a way of maintaining the status quo.'],
    ['Equity', "If equal treatment yields unequal outcomes, fairness has to be measured at the outcome. Formerly, equity was fairness in process. Under the revision, it's equality of results across groups.", 'Treating everyone the same is what preserves the gap.'],
  ]],
  ['Moral and political judgment', [
    ['Justice', "If disparity is injustice, its removal is what justice means. Formerly, justice meant the equal treatment of individuals. Under the revised version, it's the absence of group disparity.", 'There is no justice while the gap remains.'],
    ['Progress', 'If race-conscious policies are morally obligatory because they reduce inequality, and reducing inequality constitutes progress, then opposition to those policies becomes opposition to progress. Formerly, progress described change over time. Under the revised definition, it describes movement toward equality and endorses that movement in the same word.', "You're on the wrong side of history."],
    ['Care, fairness, trust', 'When eliminating inequality is treated as the self-evident goal, describing a policy as caring, fair, or trust-building can substitute for explaining why it is justified. Formerly, care, fairness, and trust named values that could be defined and weighed against competing values. Under the revised usage, the words both describe and endorse a policy, often without specifying what they mean.', "If you actually cared, you'd support this."],
  ]],
]

function Cascade() {
  return (
    <section className="cascade-section" id="preview" aria-labelledby="cascade-heading">
      <div className="cascade-shell">
        <p className="cascade-kicker">Book preview · <a href="#books"><em>Presumption of Guilt</em></a></p>
        <h2 id="cascade-heading">Treating one premise as settled reshapes the concepts around it</h2>
        <div className="cascade-equation" aria-label="Inequality is taken as proof of discrimination, and discrimination is understood as an expression of racism">
          <span>Inequality</span><b aria-hidden="true">→ <em>taken as proof of</em> →</b><span>Discrimination</span><b aria-hidden="true">→ <em>understood as an expression of</em> →</b><span>Racism</span>
        </div>
        <details className="cascade-explorer">
          <summary><span>Explore the concept map</span><small>15 terms</small></summary>
          <div className="cascade-explorer-content">
            <h3 className="cascade-map-title">Follow the logic</h3>
            <div className="cascade-list">
              {cascadeGroups.map(([group, entries], groupIndex) => (
                <section className="cascade-group" key={group} aria-labelledby={`cascade-group-${groupIndex}`}>
                  <h3 id={`cascade-group-${groupIndex}`}>{group}</h3>
                  {entries.map(([term, explanation, charge]) => (
                    <details key={term}>
                      <summary>{term}</summary>
                      <div className="cascade-entry-body"><p>{explanation}</p><p className="cascade-charge">“{charge}”</p></div>
                    </details>
                  ))}
                </section>
              ))}
            </div>
            <footer className="cascade-note"><p>The quotations in the entries above are representative formulations only.</p><p>Drawn from <a href="#books"><em>Presumption of Guilt</em></a> (Pitchstone, 2027), Chapter 9.</p></footer>
          </div>
        </details>
      </div>
    </section>
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
            <h1>Democracy is a system for managing disagreement, not settling it.</h1>
            <div className="hero-actions">
              <a className="button" href="#books">Explore the books <ArrowDown aria-hidden="true" size={16} /></a>
              <a className="text-link" href="#ideas">Read the central idea <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
            <div className="profile-block">
              <p className="profile-label">Elsewhere</p>
              <nav className="profile-links" aria-label="More from me">
                <a href="https://drive.google.com/file/d/1FGeHcUW3pKy-ToXiIJd73MARh_xxfF7t/view?usp=sharing" target="_blank" rel="noreferrer"><span className="profile-long-label">Curriculum vitae</span><span className="profile-short-label">CV</span> <ExternalLink aria-hidden="true" size={14} /></a>
                <a href="https://thecertaintytrap.substack.com/" target="_blank" rel="noreferrer">Substack <ExternalLink aria-hidden="true" size={14} /></a>
                <a href="https://linktr.ee/ilanaredstone" target="_blank" rel="noreferrer">Linktree <ExternalLink aria-hidden="true" size={14} /></a>
              </nav>
            </div>
          </div>
          <figure className="hero-portrait">
            <img src="https://drive.google.com/thumbnail?id=1HSHsivEtqBlPde7NsKyTcEL78LqGY3mr&amp;sz=w1600" alt="Ilana Redstone" />
            <figcaption>Ilana Redstone, 2024</figcaption>
          </figure>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="about-label">
            <span aria-hidden="true" />
            <p className="eyebrow">About Ilana</p>
          </div>
          <div className="about-copy">
            <h2 id="about-heading">Sociologist, writer, and professor.</h2>
            <p>Ilana Redstone is an associate professor in the Department of Sociology at the University of Illinois Urbana-Champaign. A sociologist and demographer by training, she writes for academic and public audiences about judgment, certainty, and institutional life. She lives in Champaign, Illinois.</p>
          </div>
        </section>

        <section className="ideas" id="ideas">
          <div className="section-label">
            <span>01</span>
            <p className="eyebrow">The central idea</p>
          </div>
          <div className="ideas-content">
            <h2>The ability to recognize the moral legitimacy of disagreement is necessary to sustain public trust and democratic culture.</h2>
            <div className="ideas-copy">
              <p>When courts, schools, corporations, and universities treat contested moral and causal claims as settled, their authority can make dissent look like ignorance—or guilt.</p>
              <p>My work asks how that shift happened, what it has cost, and what it would take to recover a more durable democratic culture.</p>
            </div>
          </div>
          <div className="principles" aria-label="Themes in my work">
            <div><span>01</span><h3>Question certainty</h3><p>Assess claims in terms of confidence, not certainty.</p></div>
            <div><span>02</span><h3>Protect dissent</h3><p>Resist equating opposing views with moral failure.</p></div>
            <div><span>03</span><h3>Rebuild trust</h3><p>Make institutions more transparent, modest, and credible.</p></div>
          </div>
        </section>

        <section className="books-section" id="books">
          <div className="section-label dark-label">
            <span>02</span>
            <p className="eyebrow">Selected books</p>
          </div>
          <div className="books-heading">
            <h2>Books for questions without easy answers.</h2>
            <p>For readers willing to stay with complexity.</p>
          </div>
          <div className="book-grid">
            <Book index="01" date="Forthcoming · April 2027" title="Presumption of Guilt" cover={assetUrl('presumption-of-guilt.jpg')} tone="blue" subtitle="How Equating Inequality with Injustice Fractured American Democracy" />
            <Book index="02" date="Published · September 2024" title="The Certainty Trap" cover={assetUrl('the-certainty-trap.webp')} tone="burgundy" subtitle="Why We Need to Question Ourselves More—and How We Can Judge Others Less" href="https://www.amazon.com/Certainty-Trap-Question-Ourselves-More/dp/1634310292/ref=tmm_pap_swatch_0" />
          </div>
        </section>

        <Cascade />

        <section className="contact" aria-labelledby="contact-heading">
          <p className="eyebrow">Speaking · Media · Academic inquiries</p>
          <h2 id="contact-heading">Questions? Let’s discuss.</h2>
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
