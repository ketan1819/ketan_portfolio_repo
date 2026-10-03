import { useEffect, useState } from 'react'
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { LINKS } from '../config'
const items = ['about', 'skills', 'projects', 'journey', 'contact']
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [light, setLight] = useState(document.documentElement.dataset.theme === 'light')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    items.forEach((i) => { const el = document.getElementById(i); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  const toggle = () => {
    const t = light ? 'dark' : 'light'
    document.documentElement.dataset.theme = t
    try { localStorage.setItem('theme', t) } catch { /* ignore */ }
    setLight(!light)
  }
  const link = (i: string) => `text-sm capitalize transition-colors hover:text-fg ${active === i ? 'text-fg' : 'text-muted'}`
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="font-extrabold tracking-wide">KETAN</a>
        <div className="hidden items-center gap-7 md:flex">
          {items.map((i) => <a key={i} href={`#${i}`} className={link(i)} aria-current={active === i ? 'true' : undefined}>{i}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href={LINKS.github} aria-label="GitHub" className="hidden text-muted hover:text-fg sm:block"><Github size={18} /></a>
          <a href={LINKS.linkedin} aria-label="LinkedIn" className="hidden text-muted hover:text-fg sm:block"><Linkedin size={18} /></a>
          <button onClick={toggle} aria-label="Toggle theme" className="text-muted hover:text-fg">{light ? <Moon size={18} /> : <Sun size={18} />}</button>
          <a href={LINKS.resume} className="hidden rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-slate-950 hover:opacity-90 md:block">Resume</a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && (
        <div className="flex flex-col gap-4 px-5 pb-6 md:hidden">
          {items.map((i) => <a key={i} href={`#${i}`} onClick={() => setOpen(false)} className={link(i) + ' text-base'}>{i}</a>)}
          <a href={LINKS.resume} className="rounded-lg bg-primary px-4 py-2 text-center font-semibold text-slate-950">Resume</a>
        </div>
      )}
    </header>
  )
}
