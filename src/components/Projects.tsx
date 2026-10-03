import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { projects, type Project } from '../data'
import { Chip, FlowDiagram, Section } from './ui'

function Detail({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  const h = 'mb-2 mt-6 font-mono text-xs text-primary'
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line bg-surface p-6 sm:rounded-2xl sm:p-8">
        <div className="flex items-start justify-between"><div><h3 className="text-2xl font-extrabold">{p.name}</h3><p className="text-muted">{p.subtitle}</p></div>
          <button onClick={onClose} aria-label="Close"><X /></button></div>
        <h4 className={h}>Overview</h4><p className="text-muted">{p.description}</p>
        <h4 className={h}>Problem</h4><p className="text-muted">{p.problem}</p>
        <h4 className={h}>Solution</h4><p className="text-muted">{p.solution}</p>
        <h4 className={h}>Architecture</h4><FlowDiagram nodes={p.flow} horizontal />
        <h4 className={h}>Technology</h4><div className="flex flex-wrap gap-2">{p.tech.map((t) => <Chip key={t}>{t}</Chip>)}</div>
        <h4 className={h}>Features</h4><ul className="list-inside list-disc text-muted">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        <h4 className={h}>Challenges and what I learned</h4><p className="font-mono text-xs text-muted">TODO: add your own notes here (src/data.ts).</p>
        <div className="mt-6 flex gap-3">
          {p.github && <a href={p.github} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm"><Github size={16} />GitHub</a>}
          {p.live && <a href={p.live} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-950"><ExternalLink size={16} />Live demo</a>}
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <Section id="projects" title="Featured Projects" sub="Systems I've designed, built and deployed.">
      <div className="space-y-6">
        {projects.map((p) => (
          <motion.article key={p.id} whileHover={{ y: -4 }} className="grid gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary/50 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="text-2xl font-extrabold">{p.name}</h3><p className="text-sm text-primary">{p.subtitle}</p>
              <p className="mt-3 text-muted">{p.description}</p>
              {p.metrics && <div className="mt-4 flex gap-6">{p.metrics.map((m) => <div key={m.label}><p className="text-2xl font-extrabold">{m.value}</p><p className="text-xs text-muted">{m.label}</p></div>)}</div>}
              <div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <Chip key={t}>{t}</Chip>)}</div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {p.github && <a href={p.github} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 hover:border-primary/60"><Github size={16} />GitHub</a>}
                {p.live && <a href={p.live} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 hover:border-primary/60"><ExternalLink size={16} />Live demo</a>}
                <button onClick={() => setOpen(p)} className="rounded-lg bg-primary px-4 py-2 font-semibold text-slate-950">Case study</button>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-line bg-bg/60 p-4"><FlowDiagram nodes={p.flow} /></div>
          </motion.article>
        ))}
      </div>
      {open && <Detail p={open} onClose={() => setOpen(null)} />}
    </Section>
  )
}
