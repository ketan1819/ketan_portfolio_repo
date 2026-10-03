import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { LINKS } from '../config'
import { FlowDiagram } from './ui'
const Btn = 'rounded-lg px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5'
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />Available for software engineering opportunities
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Ketan Sonawane<span className="text-primary">.</span>
            <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl text-transparent sm:text-5xl">Java Backend Developer</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">I build scalable backend systems, enterprise applications, REST APIs and cloud-based solutions using Java, Spring Boot and AWS.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={`${Btn} bg-primary text-slate-950`}>View my work</a>
            <a href={LINKS.resume} target="_blank" rel="noreferrer" className={`${Btn} border border-line hover:border-primary/60`}>Download resume</a>
          </div>
          <div className="mt-8 flex gap-5 text-muted">
            <a href={LINKS.github} aria-label="GitHub" className="hover:text-fg"><Github /></a>
            <a href={LINKS.linkedin} aria-label="LinkedIn" className="hover:text-fg"><Linkedin /></a>
            <a href={`mailto:${LINKS.email}`} aria-label="Email" className="hover:text-fg"><Mail /></a>
          </div>
        </motion.div>
        <div className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur">
          <p className="mb-4 font-mono text-xs text-muted">architecture / request-flow</p>
          <div className="flex flex-col items-center gap-1.5">
            <FlowDiagram nodes={['CLIENT', 'REST API', 'SPRING BOOT']} />
            <div className="mt-1.5 flex gap-6">
              {['MySQL', 'AWS'].map((n) => <div key={n} className="rounded-lg border border-primary/40 bg-primary/10 px-5 py-2 font-mono text-xs text-primary">{n}</div>)}
            </div>
          </div>
        </div>
      </div>
      <dl className="relative mx-auto mt-16 grid max-w-6xl grid-cols-3 gap-4 px-5">
        {[['300+', 'LeetCode Problems'], ['300+', 'CodeChef Problems'], ['4+', 'Featured Projects']].map(([v, l]) => (
          <div key={l} className="border-l border-line pl-4"><dd className="text-3xl font-extrabold">{v}</dd><dt className="text-sm text-muted">{l}</dt></div>
        ))}
      </dl>
    </section>
  )
}
