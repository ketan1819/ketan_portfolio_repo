import { useState, useEffect, useRef, type FormEvent } from 'react'
import { animate, useInView } from 'framer-motion'
import { Download } from 'lucide-react'
import { LINKS, FORM_ENDPOINT } from '../config'
import { architectures, certs, journey, skills, stats } from '../data'
import { Chip, FlowDiagram, Section } from './ui'

const card = 'rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary/40'

export function About() {
  const cols = [
    ['Backend Engineering', ['Java', 'Spring Boot', 'REST APIs', 'JPA / Hibernate', 'Spring Security', 'Microservices']],
    ['Cloud & DevOps', ['AWS', 'Docker', 'CI/CD', 'Linux', 'Cloud Architecture', 'Serverless']],
    ['Databases', ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Database Design']],
  ] as const
  return (
    <Section id="about" title="About Me" sub="Building systems, solving problems, learning continuously.">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-muted">
          <p>I'm a Computer Engineering graduate focused on Java backend development and cloud technologies.</p>
          <p>I enjoy designing REST APIs, building enterprise applications, working with relational databases, and deploying applications using cloud technologies.</p>
          <p>My current focus is on Java, Spring Boot, backend architecture, AWS and system design.</p>
        </div>
        <div className="grid gap-4">
          {cols.map(([t, items]) => (
            <div key={t} className={card}><h3 className="mb-3 font-bold">{t}</h3><div className="flex flex-wrap gap-2">{items.map((i) => <Chip key={i}>{i}</Chip>)}</div></div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Skills() {
  return (
    <Section id="skills" title="Technical Arsenal" sub="Java, Spring Boot and AWS are the core. Everything else supports them.">
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <div key={s.cat} className={card}>
            <h3 className="mb-3 font-bold">{s.cat}</h3>
            <div className="flex flex-wrap gap-2">
              {s.primary.map((i) => <Chip key={i} strong>{i}</Chip>)}
              {s.other.map((i) => <Chip key={i}>{i}</Chip>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Architecture() {
  return (
    <Section id="architecture" title="How I Build Systems" sub="Three patterns I work with, and how a request moves through each.">
      <div className="grid gap-4 md:grid-cols-3">
        {architectures.map((a) => (
          <div key={a.title} className={`${card} flex flex-col items-center`}>
            <h3 className="mb-5 self-start font-bold">{a.title}</h3>
            <FlowDiagram nodes={a.nodes} />
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Journey() {
  return (
    <Section id="journey" title="My Engineering Journey">
      <ol className="relative ml-2 space-y-8 border-l border-line pl-8">
        {journey.map((j) => (
          <li key={j.when} className="relative">
            <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
            <p className="font-mono text-xs text-primary">{j.when}</p>
            <h3 className="text-lg font-bold">{j.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">{j.items.map((i) => <Chip key={i}>{i}</Chip>)}</div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, { duration: 1, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix } })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>{to}{suffix}</span>
}

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={card}><p className="text-4xl font-extrabold"><Count to={s.value} suffix={s.suffix} /></p><p className="mt-1 text-sm text-muted">{s.label}</p></div>
        ))}
      </div>
    </Section>
  )
}

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <div className="grid gap-4 sm:grid-cols-2">
        {certs.map((c) => (
          <div key={c.name} className={card}>
            <h3 className="font-bold">{c.name}</h3><p className="text-sm text-muted">{c.issuer}</p>
            {c.url ? <a href={c.url} className="mt-3 inline-block text-sm text-primary">View certificate</a> : <p className="mt-3 font-mono text-xs text-muted">Certificate link: to be added</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}

export function ResumeCTA() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="rounded-3xl border border-line bg-gradient-to-br from-primary/15 to-secondary/15 p-10 text-center">
        <h2 className="text-3xl font-extrabold">Interested in my work?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Download my resume to explore my skills, projects and experience.</p>
        <a href={LINKS.resume} download className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-slate-950"><Download size={18} />Download resume</a>
      </div>
    </section>
  )
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error' | 'unconfigured'>('idle')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!FORM_ENDPOINT) return setStatus('unconfigured')
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } })
      setStatus(r.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }
  const field = 'w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm'
  return (
    <Section id="contact" title="Let's Build Something" sub="I'm currently interested in Java Backend Development, Spring Boot and Cloud opportunities.">
      <div className="grid gap-10 md:grid-cols-2">
        <ul className="space-y-3 text-muted">
          <li><a className="hover:text-fg" href={`mailto:${LINKS.email}`}>Email: {LINKS.email}</a></li>
          <li><a className="hover:text-fg" href={LINKS.linkedin}>LinkedIn</a></li>
          <li><a className="hover:text-fg" href={LINKS.github}>GitHub</a></li>
        </ul>
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm">Name<input name="name" required className={field} /></label>
          <label className="block text-sm">Email<input name="email" type="email" required className={field} /></label>
          <label className="block text-sm">Message<textarea name="message" rows={4} required className={field} /></label>
          <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-slate-950">Send message</button>
          <p role="status" className="text-sm text-muted">
            {status === 'sent' && 'Message sent.'}{status === 'error' && 'Sending failed. Email me directly instead.'}
            {status === 'unconfigured' && 'Form not connected yet. Set FORM_ENDPOINT in src/config.ts.'}
          </p>
        </form>
      </div>
    </Section>
  )
}

export const Footer = () => (
  <footer className="mt-24 border-t border-line px-5 py-10 text-center text-sm text-muted">
    <p className="font-bold text-fg">KETAN SONAWANE</p>
    <p>Java Backend Developer</p><p>Spring Boot • AWS • Backend Engineering</p>
    <p className="mt-3 space-x-4"><a href={LINKS.github}>GitHub</a><a href={LINKS.linkedin}>LinkedIn</a><a href={`mailto:${LINKS.email}`}>Email</a></p>
    <p className="mt-4">© 2026 Ketan Sonawane</p>
  </footer>
)

