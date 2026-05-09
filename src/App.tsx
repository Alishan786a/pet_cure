import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
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
import {
  blurIn,
  fadeUp,
  fadeUpTight,
  scaleIn,
  slideInRight,
  springPop,
  springSnappy,
  springSoft,
  staggerContainer,
  transitionBase,
  viewportOnce,
} from './motionPresets'
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
  const [headerDense, setHeaderDense] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const r = !!reduceMotion

  const { scrollY, scrollYProgress } = useScroll()
  const scrollBar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroParallaxY = useTransform(heroScroll, [0, 1], [0, r ? 0 : 52])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHeaderDense((d) => {
      const next = latest > 36
      return d === next ? d : next
    })
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

      <motion.header
        className={`header${headerDense ? ' header--dense' : ''}`}
        initial={r ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transitionBase(r, 0.65)}
      >
        <div className="header__inner">
          <motion.a
            href="#"
            className="brand"
            initial={r ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transitionBase(r, 0.55), delay: r ? 0 : 0.08 }}
            whileHover={r ? undefined : { x: 2 }}
            whileTap={r ? undefined : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <motion.img
              src={logo}
              alt=""
              className="brand__logo"
              width={48}
              height={48}
              whileHover={r ? undefined : { scale: 1.06, rotate: -3 }}
              transition={springSoft}
            />
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
              {NAV.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={r ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitionBase(r, 0.4), delay: r ? 0 : 0.12 + i * 0.05 }}
                >
                  <motion.button
                    type="button"
                    className="nav__link"
                    whileHover={r ? undefined : { y: -1 }}
                    whileTap={r ? undefined : { scale: 0.97 }}
                    transition={springSnappy}
                    onClick={() => {
                      scrollToId(id)
                      setNavOpen(false)
                    }}
                  >
                    {label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              className="btn btn--primary nav__cta"
              href={`tel:${site.phoneTel}`}
              onClick={() => setNavOpen(false)}
              whileHover={r ? undefined : { scale: 1.03, y: -1 }}
              whileTap={r ? undefined : { scale: 0.97 }}
              transition={springPop}
            >
              <FaPhone className="btn__icon" aria-hidden />
              Call {site.phoneDisplay}
            </motion.a>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {navOpen ? (
          <motion.button
            key="nav-backdrop"
            type="button"
            className="nav-backdrop"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: r ? 0 : 0.22 }}
            onClick={() => setNavOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <main id="main">
        <section ref={heroRef} className="hero" aria-labelledby="hero-heading">
          <div className="hero__grid">
            <motion.div
              className="hero__copy"
              variants={staggerContainer(r, 0.13, 0.05)}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="eyebrow eyebrow--row" variants={fadeUpTight(r)}>
                <FaPaw className="eyebrow__icon" aria-hidden />
                {site.establishedNote}
              </motion.p>
              <motion.h1 id="hero-heading" className="hero__title" variants={blurIn(r)}>
                {site.tagline}
              </motion.h1>
              <motion.div className="hero__actions" variants={fadeUp(r)}>
                <motion.a
                  className="btn btn--primary"
                  href={`tel:${site.phoneTel}`}
                  whileHover={r ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={r ? undefined : { scale: 0.97 }}
                  transition={springPop}
                >
                  <FaPhone className="btn__icon" aria-hidden />
                  Call {site.phoneDisplay}
                </motion.a>
                <motion.button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => scrollToId('hours')}
                  whileHover={r ? undefined : { scale: 1.03, y: -2 }}
                  whileTap={r ? undefined : { scale: 0.98 }}
                  transition={springPop}
                >
                  <FaClock className="btn__icon" aria-hidden />
                  {site.heroCta}
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              className="hero__visual"
              initial={r ? false : { opacity: 0, scale: 0.92, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ ...transitionBase(r, 0.62), delay: r ? 0 : 0.22 }}
              style={{ y: heroParallaxY }}
            >
              <MediaPlaceholder
                label="Clinic photo — replace with your image"
                variant="hero"
                reduceMotion={r}
              />
            </motion.div>
          </div>
        </section>

        <motion.section
          id="about"
          className="section section--alt"
          aria-labelledby="about-heading"
          initial={r ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={transitionBase(r, 0.5)}
        >
          <motion.div
            className="section__inner"
            variants={staggerContainer(r, 0.09, 0.02)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2 id="about-heading" className="section__title section__title--row" variants={fadeUp(r)}>
              <FaPaw className="section__title-ico" aria-hidden />
              {site.about.title}
            </motion.h2>
            <motion.p className="section__lead" variants={fadeUp(r)}>
              {site.about.lead}
            </motion.p>
            <motion.div className="about-split" variants={staggerContainer(r, 0.14, 0.06)}>
              <motion.ul className="cards" variants={staggerContainer(r, 0.1, 0)}>
                {site.about.points.map((p, i) => {
                  const AboutIcon = ABOUT_ICONS[i]
                  return (
                    <motion.li
                      key={p.title}
                      className="card"
                      variants={slideInRight(r)}
                      whileHover={r ? undefined : { y: -6, boxShadow: '0 16px 40px rgb(18 16 14 / 12%)' }}
                      whileTap={r ? undefined : { scale: 0.99 }}
                      transition={springSoft}
                    >
                      <h3 className="card__title">
                        <motion.span
                          className="card__ico-wrap"
                          whileHover={r ? undefined : { rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.45 }}
                        >
                          <AboutIcon className="card__ico" aria-hidden />
                        </motion.span>
                        {p.title}
                      </h3>
                      <p className="card__text">{p.text}</p>
                    </motion.li>
                  )
                })}
              </motion.ul>
              <motion.div variants={scaleIn(r)}>
                <MediaPlaceholder
                  label="Team or clinic interior — replace with your image"
                  variant="square"
                  reduceMotion={r}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="services"
          className="section"
          aria-labelledby="services-heading"
          initial={r ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={transitionBase(r, 0.45)}
        >
          <motion.div
            className="section__inner"
            variants={staggerContainer(r, 0.08, 0.02)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2 id="services-heading" className="section__title section__title--row" variants={fadeUp(r)}>
              <FaStethoscope className="section__title-ico" aria-hidden />
              {site.services.title}
            </motion.h2>
            <motion.p className="section__lead section__lead--narrow" variants={fadeUp(r)}>
              {site.services.subtitle}
            </motion.p>
            <motion.div
              className="services-grid"
              variants={staggerContainer(r, 0.09, 0.02)}
            >
              {site.services.items.map((item, i) => {
                const SvcIcon = SERVICE_ICONS[i]
                return (
                  <motion.article
                    key={item}
                    className="service-card"
                    variants={fadeUpTight(r)}
                    whileHover={
                      r
                        ? undefined
                        : {
                            y: -8,
                            scale: 1.02,
                            boxShadow: '0 20px 48px rgb(18 16 14 / 14%)',
                          }
                    }
                    whileTap={r ? undefined : { scale: 0.98 }}
                    transition={springSoft}
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
            </motion.div>
            <motion.div className="section__banner" variants={scaleIn(r)}>
              <MediaPlaceholder
                label="Services or equipment — replace with your image"
                variant="wide"
                reduceMotion={r}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="hours"
          className="section section--alt"
          aria-labelledby="hours-heading"
          initial={r ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={transitionBase(r, 0.5)}
        >
          <motion.div
            className="section__inner section__inner--split"
            variants={staggerContainer(r, 0.12, 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp(r)}>
              <h2 id="hours-heading" className="section__title section__title--row">
                <FaClock className="section__title-ico" aria-hidden />
                {site.hours.title}
              </h2>
              <table className="hours-table">
                <tbody>
                  {site.hours.rows.map((row, ri) => (
                    <motion.tr
                      key={row.day}
                      initial={r ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ ...transitionBase(r, 0.4), delay: r ? 0 : ri * 0.06 }}
                    >
                      <th scope="row">{row.day}</th>
                      <td>{row.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <p className="fine-print">{site.hours.note}</p>
            </motion.div>
            <motion.div id="contact" className="contact-block" variants={slideInRight(r)}>
              <h2 className="section__title section__title--row">
                <FaEnvelope className="section__title-ico" aria-hidden />
                {site.contact.title}
              </h2>
              <p className="contact-block__text">{site.contact.body}</p>
              <ul className="contact-block__details">
                <motion.li
                  className="contact-block__item"
                  initial={r ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...transitionBase(r, 0.35), delay: r ? 0 : 0.05 }}
                  whileHover={r ? undefined : { x: 4 }}
                >
                  <FaPhone className="contact-block__ico" aria-hidden />
                  <div>
                    <span className="contact-block__label">Phone</span>
                    <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
                  </div>
                </motion.li>
                <motion.li
                  className="contact-block__item"
                  initial={r ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...transitionBase(r, 0.35), delay: r ? 0 : 0.1 }}
                  whileHover={r ? undefined : { x: 4 }}
                >
                  <FaEnvelope className="contact-block__ico" aria-hidden />
                  <div>
                    <span className="contact-block__label">Email</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </motion.li>
                <motion.li
                  className="contact-block__item"
                  initial={r ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...transitionBase(r, 0.35), delay: r ? 0 : 0.15 }}
                  whileHover={r ? undefined : { x: 4 }}
                >
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
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            className="section__inner section__visit-row"
            initial={r ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ ...transitionBase(r, 0.65), delay: r ? 0 : 0.08 }}
          >
            <motion.div
              className="map-embed"
              whileHover={r ? undefined : { scale: 1.01 }}
              transition={springSoft}
            >
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
            </motion.div>
            <motion.div
              initial={r ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ ...transitionBase(r, 0.55), delay: r ? 0 : 0.12 }}
            >
              <ContactForm />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="footer">
        <motion.div
          className="footer__inner"
          variants={staggerContainer(r, 0.14, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        >
          <motion.p className="footer__name" variants={fadeUpTight(r)}>
            {site.clinicName}
          </motion.p>
          <motion.p className="footer__legal" variants={fadeUpTight(r)}>
            {site.footer.legal}
          </motion.p>
          <motion.p className="footer__disclaimer" variants={fadeUpTight(r)}>
            {site.footer.disclaimer}
          </motion.p>
        </motion.div>
      </footer>

      <DraggableWhatsApp href={site.whatsAppHref} label="Chat on WhatsApp with PET CURE" />
    </div>
  )
}
