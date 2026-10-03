import { useState, useEffect, useRef, type FormEvent } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { LINKS, FORM_ENDPOINT } from '../config'
import { architectures, certs, journey, skills, stats } from '../data'
import { Chip, FlowDiagram, Section } from './ui'

const card = 'rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary/40'

function MicroservicesDiagram() {
  const services = [
    { name: 'Order Service', db: 'Order DB', color: 'border-primary/40 bg-primary/10 text-primary' },
    { name: 'Inventory Service', db: 'Inventory DB', color: 'border-secondary/40 bg-secondary/10 text-secondary' },
    { name: 'Payment Service', db: 'Payment DB', color: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' },
  ]
  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="API Gateway branches to independent Order, Inventory, and Payment services, each connected to its own database">
      <div className="relative mx-auto h-[350px] min-w-[480px] max-w-[560px]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 560 350" preserveAspectRatio="none" aria-hidden>
          <defs><marker id="micro-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
          {[92, 280, 468].map((x) => <g key={x} className="text-primary"><path d={`M280 72 C280 98 ${x} 96 ${x} 124`} fill="none" stroke="currentColor" strokeWidth="1.7" markerEnd="url(#micro-arrow)" className="flow" /><path d={`M${x} 190 L${x} 256`} fill="none" stroke="currentColor" strokeWidth="1.7" markerStart="url(#micro-arrow)" markerEnd="url(#micro-arrow)" className="flow" /></g>)}
        </svg>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-xl border border-primary/50 bg-primary/10 px-6 py-3 font-mono text-sm font-semibold text-primary shadow-lg shadow-primary/10">API Gateway</div>
        <div className="absolute inset-x-0 top-[124px] grid grid-cols-3 gap-3 px-1">
          {services.map((service, index) => (
            <motion.div key={service.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className={`flex min-h-[66px] items-center justify-center rounded-xl border px-2 text-center font-mono text-xs font-semibold shadow-lg ${service.color}`}>
              {service.name}
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-0 top-[266px] grid grid-cols-3 gap-3 px-1">
          {services.map((service) => (
            <div key={service.db} className="mx-auto flex h-[60px] w-28 items-center justify-center rounded-[50%/18%] border border-line bg-surface pt-1 font-mono text-xs text-muted shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
              {service.db}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function About() {
  const cols = [
    ['Backend Engineering', ['Java', 'Spring Boot', 'REST APIs', 'JPA / Hibernate', 'Spring Security', 'Microservices']],
    ['Cloud & DevOps', ['AWS', 'Docker', 'CI/CD', 'Linux', 'Cloud Architecture', 'Serverless']],
    ['Databases', ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Database Design']],
  ] as const
  return (
    <Section id="about" title="About Me" sub="Building systems, solving problems, learning continuously.">
      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`${card} h-full border-primary/20 bg-gradient-to-br from-primary/10 via-surface to-surface`}>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Backend developer · Cloud enthusiast</p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>I'm a Computer Engineering graduate focused on Java backend development and cloud technologies.</p>
            <p>I enjoy designing REST APIs, building enterprise applications, working with relational databases, and deploying applications using cloud technologies.</p>
            <p>My current focus is on Java, Spring Boot, backend architecture, AWS and system design.</p>
          </div>
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
            {a.title === 'Microservices' ? <MicroservicesDiagram /> : <FlowDiagram nodes={a.nodes} />}
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
        <a href={LINKS.resume} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-slate-950"><Download size={18} />Download resume</a>
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
        <ul className="space-y-4 text-muted">
          <li><a className="inline-flex items-center gap-3 transition-colors hover:text-primary" href={`mailto:${LINKS.email}`}><Mail size={18} aria-hidden /> <span>Email <span className="text-fg">{LINKS.email}</span></span></a></li>
          <li><a className="inline-flex items-center gap-3 transition-colors hover:text-primary" href={LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden /> <span>LinkedIn</span></a></li>
          <li><a className="inline-flex items-center gap-3 transition-colors hover:text-primary" href={LINKS.github} target="_blank" rel="noreferrer"><Github size={18} aria-hidden /> <span>GitHub</span></a></li>
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
