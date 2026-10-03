import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
export const Chip = ({ children, strong }: { children: ReactNode; strong?: boolean }) => (
  <span className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${strong ? 'border-primary/50 bg-primary/10 text-primary' : 'border-line text-muted hover:border-primary/40'}`}>{children}</span>
)
export const Section = ({ id, title, sub, children }: { id: string; title: string; sub?: string; children: ReactNode }) => (
  <section id={id} className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-xl text-muted">{sub}</p>}
      <div className="mt-10">{children}</div>
    </motion.div>
  </section>
)
export const FlowDiagram = ({ nodes, horizontal }: { nodes: string[]; horizontal?: boolean }) => (
  <div className={`flex items-center gap-1.5 ${horizontal ? 'flex-wrap' : 'flex-col'}`} role="img" aria-label={nodes.join(' to ')}>
    {nodes.map((n, i) => (
      <div key={n} className={`flex items-center gap-1.5 ${horizontal ? '' : 'flex-col'}`}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}
          className="rounded-lg border border-line bg-surface px-4 py-2 font-mono text-xs shadow-sm transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary">{n}</motion.div>
        {i < nodes.length - 1 && (
          <svg width={horizontal ? 24 : 12} height={horizontal ? 12 : 24} aria-hidden className="text-primary">
            {horizontal ? <line x1="0" y1="6" x2="24" y2="6" className="flow" stroke="currentColor" strokeWidth="1.5" /> : <line x1="6" y1="0" x2="6" y2="24" className="flow" stroke="currentColor" strokeWidth="1.5" />}
          </svg>
        )}
      </div>
    ))}
  </div>
)
