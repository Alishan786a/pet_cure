import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  FaClock,
  FaEnvelope,
  FaHeartPulse,
  FaHouseMedical,
  FaLocationDot,
  FaPaw,
  FaPhone,
  FaPills,
  FaStethoscope,
  FaStore,
  FaSyringe,
  FaTruckMedical,
} from 'react-icons/fa6'
import logo from './assets/logo.jpeg'
import { ContactForm } from './ContactForm'
import { DraggableWhatsApp } from './DraggableWhatsApp'
import { site, getSiteUrl } from './siteContent'
import { buildLocalBusinessJsonLd } from './seoJsonLd'
import './App.css'

const ABOUT_ICONS = [FaHouseMedical, FaTruckMedical, FaPills] as const
const SERVICE_ICONS = [FaStethoscope, FaHeartPulse, FaSyringe, FaStore] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function MediaPlaceholder({
  label,
  variant = 'wide',
  reduceMotion,
}: {
  label: string
  variant?: 'hero' | 'wide' | 'square'
  reduceMotion: boolean
}) {
  return (
    <div
      className={`media-ph media-ph--${variant}`}
      role="img"
      aria-label={label}
    >
      {reduceMotion ? (
        <div className="media-ph__shine media-ph__shine--static" aria-hidden />
      ) : (
        <motion.div
          className="media-ph__shine"
          aria-hidden
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      )}
      <span className="media-ph__cap">{label}</span>
    </div>
  )
}

const NAV: { id: string; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'hours', label: 'Hours' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scrollBar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.title = site.seo.title
    let mk = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    if (!mk) {
      mk = document.createElement('meta')
      mk.name = 'keywords'
      document.head.appendChild(mk)
    }
    mk.content = site.seo.keywords
  }, [])

  useEffect(() => {
    const base = getSiteUrl()
    if (!base) return

    const canonical = `${base}/`
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    const setMeta = (attr: 'property' | 'name', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', `${base}${site.seo.defaultOgImage}`)
    setMeta('name', 'twitter:image', `${base}${site.seo.defaultOgImage}`)
  }, [])

  useEffect(() => {
    const id = 'petcure-jsonld'
    const existing = document.getElementById(id)
    existing?.remove()
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = id
    s.textContent = JSON.stringify(buildLocalBusinessJsonLd())
    document.head.appendChild(s)
    return () => {
      s.remove()
    }
  }, [])

  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navOpen])

  const t = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

  const fadeUp = {
    initial: t.duration < 0.05 ? false : { opacity: 0, y: 26 },
    whileInView: t.duration < 0.05 ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-48px' },
    transition: t,
  }

  const stagger = reduceMotion ? 0 : 0.1

  return (
    <div className="site">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollBar, transformOrigin: '0%' }}
        aria-hidden
      />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="header">
        <div className="header__inner">
          <motion.a
            href="#"
            className="brand"
            initial={t.duration < 0.05 ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={t}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img src={logo} alt="" className="brand__logo" width={48} height={48} />
            <span className="brand__text">{site.clinicName}</span>
          </motion.a>

          <button
            type="button"
            className={`nav-toggle${navOpen ? ' nav-toggle--open' : ''}`}
            aria-expanded={navOpen}
            aria-controls="site-nav"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="visually-hidden">Menu</span>
          </button>

          <nav id="site-nav" className={`nav ${navOpen ? 'nav--open' : ''}`}>
            <ul className="nav__list">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    className="nav__link"
                    onClick={() => {
                      scrollToId(id)
                      setNavOpen(false)
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <a className="btn btn--primary nav__cta" href={`tel:${site.phoneTel}`} onClick={() => setNavOpen(false)}>
              <FaPhone className="btn__icon" aria-hidden />
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      </header>

      {navOpen ? (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={() => setNavOpen(false)} />
      ) : null}

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__grid">
            <div className="hero__copy">
              <motion.p
                className="eyebrow eyebrow--row"
                initial={t.duration < 0.05 ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...t, delay: stagger * 0 }}
              >
                <FaPaw className="eyebrow__icon" aria-hidden />
                {site.establishedNote}
              </motion.p>
              <motion.h1
                id="hero-heading"
                className="hero__title"
                initial={t.duration < 0.05 ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...t, delay: stagger * 1 }}
              >
                {site.tagline}
              </motion.h1>
              <motion.div
                className="hero__actions"
                initial={t.duration < 0.05 ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...t, delay: stagger * 2 }}
              >
                <a className="btn btn--primary" href={`tel:${site.phoneTel}`}>
                  <FaPhone className="btn__icon" aria-hidden />
                  Call {site.phoneDisplay}
                </a>
                <button type="button" className="btn btn--ghost" onClick={() => scrollToId('hours')}>
                  <FaClock className="btn__icon" aria-hidden />
                  {site.heroCta}
                </button>
              </motion.div>
            </div>
            <motion.div
              className="hero__visual"
              initial={t.duration < 0.05 ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...t, delay: stagger * 1.5 }}
            >
              <MediaPlaceholder
                label="Clinic photo — replace with your image"
                variant="hero"
                reduceMotion={!!reduceMotion}
              />
            </motion.div>
          </div>
        </section>

        <motion.section
          id="about"
          className="section section--alt"
          aria-labelledby="about-heading"
          {...fadeUp}
        >
          <div className="section__inner">
            <h2 id="about-heading" className="section__title section__title--row">
              <FaPaw className="section__title-ico" aria-hidden />
              {site.about.title}
            </h2>
            <p className="section__lead">{site.about.lead}</p>
            <div className="about-split">
              <ul className="cards">
                {site.about.points.map((p, i) => {
                  const AboutIcon = ABOUT_ICONS[i]
                  return (
                    <motion.li
                      key={p.title}
                      className="card"
                      initial={t.duration < 0.05 ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-32px' }}
                      transition={{ ...t, delay: i * 0.08 }}
                    >
                      <h3 className="card__title">
                        <AboutIcon className="card__ico" aria-hidden />
                        {p.title}
                      </h3>
                      <p className="card__text">{p.text}</p>
                    </motion.li>
                  )
                })}
              </ul>
              <MediaPlaceholder
                label="Team or clinic interior — replace with your image"
                variant="square"
                reduceMotion={!!reduceMotion}
              />
            </div>
          </div>
        </motion.section>

        <motion.section id="services" className="section" aria-labelledby="services-heading" {...fadeUp}>
          <div className="section__inner">
            <h2 id="services-heading" className="section__title section__title--row">
              <FaStethoscope className="section__title-ico" aria-hidden />
              {site.services.title}
            </h2>
            <p className="section__lead section__lead--narrow">{site.services.subtitle}</p>
            <div className="services-grid">
              {site.services.items.map((item, i) => {
                const SvcIcon = SERVICE_ICONS[i]
                return (
                  <motion.article
                    key={item}
                    className="service-card"
                    initial={t.duration < 0.05 ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-24px' }}
                    transition={{ ...t, delay: i * 0.07 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <div className="service-card__top">
                      <SvcIcon className="service-card__ico" aria-hidden />
                      <span className="service-card__num" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="service-card__text">{item}</p>
                  </motion.article>
                )
              })}
            </div>
            <motion.div className="section__banner" {...fadeUp}>
              <MediaPlaceholder
                label="Services or equipment — replace with your image"
                variant="wide"
                reduceMotion={!!reduceMotion}
              />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="hours"
          className="section section--alt"
          aria-labelledby="hours-heading"
          {...fadeUp}
        >
          <div className="section__inner section__inner--split">
            <div>
              <h2 id="hours-heading" className="section__title section__title--row">
                <FaClock className="section__title-ico" aria-hidden />
                {site.hours.title}
              </h2>
              <table className="hours-table">
                <tbody>
                  {site.hours.rows.map((row) => (
                    <tr key={row.day}>
                      <th scope="row">{row.day}</th>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="fine-print">{site.hours.note}</p>
            </div>
            <div id="contact" className="contact-block">
              <h2 className="section__title section__title--row">
                <FaEnvelope className="section__title-ico" aria-hidden />
                {site.contact.title}
              </h2>
              <p className="contact-block__text">{site.contact.body}</p>
              <ul className="contact-block__details">
                <li className="contact-block__item">
                  <FaPhone className="contact-block__ico" aria-hidden />
                  <div>
                    <span className="contact-block__label">Phone</span>
                    <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
                  </div>
                </li>
                <li className="contact-block__item">
                  <FaEnvelope className="contact-block__ico" aria-hidden />
                  <div>
                    <span className="contact-block__label">Email</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </li>
                <li className="contact-block__item">
                  <FaLocationDot className="contact-block__ico" aria-hidden />
                  <div>
                    <span className="contact-block__label">Address</span>
                    {site.address.lines.map((line) => (
                      <span key={line} className="contact-block__line">
                        {line}
                      </span>
                    ))}
                    <a className="contact-block__map" href={site.address.mapsUrl} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="section__inner section__visit-row">
            <div className="map-embed">
              <h3 className="map-embed__title">Find us</h3>
              <div className="map-embed__frame">
                <iframe
                  title="PET CURE clinic on Google Maps"
                  src={site.address.mapsEmbedSrc}
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
            <ContactForm />
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__name">{site.clinicName}</p>
          <p className="footer__legal">{site.footer.legal}</p>
          <p className="footer__disclaimer">{site.footer.disclaimer}</p>
        </div>
      </footer>

      <DraggableWhatsApp href={site.whatsAppHref} label="Chat on WhatsApp with PET CURE" />
    </div>
  )
}
