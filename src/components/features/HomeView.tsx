import { useEffect, useRef, useState } from 'react'

import col1 from '@/assets/home/col-1.png'
import col2 from '@/assets/home/col-2.png'
import col3 from '@/assets/home/col-3.png'
import col4 from '@/assets/home/col-4.png'
import col5 from '@/assets/home/col-5.png'
import col6 from '@/assets/home/col-6.png'
import col7 from '@/assets/home/col-7.png'
import col8 from '@/assets/home/col-8.png'
import col9 from '@/assets/home/col-9.png'
import markCulture from '@/assets/home/mark-culture.png'
import markHistoires from '@/assets/home/mark-histoires.png'
import markImages from '@/assets/home/mark-images.png'
import markLitterature from '@/assets/home/mark-litterature-lecteur.png'
import markMusiques from '@/assets/home/mark-musiques.png'
import markPartage from '@/assets/home/mark-litterature.png'
import uneActive from '@/assets/home/une-c.png'
import uneNext from '@/assets/home/une-d.png'
import unePrev from '@/assets/home/une-b.png'
import vivaHero from '@/assets/home/viva-c.png'
import vivaThumb from '@/assets/home/viva-b.png'
import { IconChevron, IconCollections, IconContact, IconFacebook, IconInstagram, IconLinkedin, IconMail, IconMenu, IconSearch, IconYoutube } from '@/components/features/HomeIcons'
import { LanguagePair } from '@/components/features/LanguagePair'
import { Logo } from '@/components/features/Logo'
import { MenuPanel } from '@/components/features/MenuPanel'
import { SearchPanel } from '@/components/features/SearchPanel'
import type { EspaceKey, Screen, TerritoireKey } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const UNE_TITLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing'

const UNE_SLIDES = [
  { image: uneActive },
  { image: uneNext },
  { image: unePrev },
]

const ESPACES: Array<{
  label: string
  line: string
  image: string
  espace?: EspaceKey
}> = [
  { label: 'Culture vivante', line: 'Des pratiques qui rassemblent', image: markCulture, espace: 'fetes' },
  { label: 'Littérature', line: 'Textes et regards critiques', image: markLitterature, espace: 'langue' },
  { label: "Figures d'oc", line: 'Parcours, portraits, engagements', image: markPartage, espace: 'portraits' },
  { label: 'Musiques', line: 'Du son sous toutes ses formes', image: markMusiques, espace: 'musique' },
  { label: 'Histoires de…', line: 'Événements, luttes, idées', image: markHistoires, espace: 'histoires' },
  { label: 'Plein cadre', line: 'Des images en perspective', image: markImages, espace: 'cadre' },
]

const TERRITOIRES: Array<{ label: string; key: TerritoireKey | null }> = [
  { label: 'Gascogne', key: 'gascogne' },
  { label: 'Languedoc', key: 'languedoc' },
  { label: 'Pyrénées', key: 'pyrenees' },
  { label: 'Provence', key: 'provence' },
  { label: 'Limousin', key: null },
  { label: 'Périgord', key: null },
  { label: "Val d'Aran", key: null },
  { label: 'Dauphiné', key: null },
]

const COMPACTS: Array<{ category: string; title: string; image: string; espace?: EspaceKey }> = [
  { category: 'Littérature', title: 'Lorem ipsum dolor', image: vivaThumb, espace: 'langue' },
  { category: "Figures d'oc", title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', image: vivaThumb, espace: 'portraits' },
  { category: 'Musiques', title: 'Lorem ipsum', image: vivaHero, espace: 'musique' },
  { category: 'Histoires de…', title: 'Lorem ipsum dolor sit amet adipiscing', image: vivaThumb, espace: 'histoires' },
  { category: 'Plein cadre', title: 'Lorem ipsum dolor sit amet', image: vivaHero, espace: 'cadre' },
]

const MOSAIC: Array<
  Array<{
    src: string
    height: number
    opacity?: number
    fit?: 'cover-bottom' | 'contain'
    crop?: { width: number; height: number; left: number; top: number }
  }>
> = [
  [
    { src: col1, height: 112, fit: 'cover-bottom' },
    { src: col2, height: 140, crop: { width: 163.74, height: 100, left: -55.5, top: 0 } },
    { src: col3, height: 170, fit: 'contain' },
  ],
  [
    { src: col4, height: 139, crop: { width: 180.29, height: 98.55, left: -79.93, top: 2.16 } },
    { src: col5, height: 172, crop: { width: 114.51, height: 114.55, left: -7.26, top: -4.27 } },
    { src: col6, height: 142, opacity: 0.8, crop: { width: 100, height: 120.45, left: 0.37, top: -20.42 } },
  ],
  [
    { src: col7, height: 162, crop: { width: 211.25, height: 116.5, left: -60.54, top: -6.78 } },
    { src: col8, height: 120, opacity: 0.8, crop: { width: 157.82, height: 100, left: -46.25, top: 0 } },
    { src: col9, height: 140, crop: { width: 184.12, height: 100, left: -18.33, top: 0 } },
  ],
]

export function ActionButton({
  children,
  onClick,
}: {
  children: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${typography.uiAction} inline-flex h-11 items-center bg-action px-4 text-[rgb(var(--color-action-content))]`}
    >
      {children}
    </button>
  )
}

export function SliderArrows({
  label,
  onPrev,
  onNext,
}: {
  label: string
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="-mr-2 flex shrink-0 items-center">
      <button type="button" aria-label={`${label} précédents`} onClick={onPrev} className="grid size-11 place-items-center">
        <IconChevron direction="left" className="size-6" />
      </button>
      <button type="button" aria-label={`${label} suivants`} onClick={onNext} className="grid size-11 place-items-center">
        <IconChevron direction="right" className="size-6" />
      </button>
    </div>
  )
}

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

const UNE_ACTIVE_W = 294
const UNE_SIDE_W = 299
const UNE_ACTIVE_H = 337
const UNE_SIDE_H = 319
const UNE_GAP = 8
const UNE_SLIDE_MS = 520

function UneCarousel({ onDiscover }: { onDiscover: () => void }) {
  const count = UNE_SLIDES.length
  const loop = [...UNE_SLIDES, ...UNE_SLIDES, ...UNE_SLIDES]
  const windowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)
  const [windowW, setWindowW] = useState(358)
  const [pos, setPos] = useState(count)
  const [motion, setMotion] = useState(true)

  useEffect(() => {
    const el = windowRef.current
    if (!el) return
    const measure = () => setWindowW(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const logical = ((pos % count) + count) % count
  const translate = windowW / 2 - (pos * (UNE_SIDE_W + UNE_GAP) + UNE_ACTIVE_W / 2)

  function settle(next: number) {
    const normalized = (((next % count) + count) % count) + count
    if (normalized === next) {
      animating.current = false
      return
    }
    setMotion(false)
    setPos(normalized)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMotion(true)
        animating.current = false
      })
    })
  }

  function shift(delta: number) {
    if (delta === 0 || animating.current) return
    animating.current = true
    setMotion(true)
    setPos((current) => current + delta)
  }

  function goTo(index: number) {
    let delta = index - logical
    if (delta > count / 2) delta -= count
    if (delta < -count / 2) delta += count
    shift(delta)
  }

  return (
    <section className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className={typography.display}>À la Une</h1>
        <SliderArrows
          label="À la une"
          onPrev={() => shift(-1)}
          onNext={() => shift(1)}
        />
      </div>
      <div
        ref={windowRef}
        data-h-scroller="true"
        className="h-[337px] touch-pan-y overflow-hidden"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          if ((event.target as HTMLElement).closest('button')) return
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.dataset.dragX = String(event.clientX)
        }}
        onPointerUp={(event) => {
          const start = Number(event.currentTarget.dataset.dragX)
          delete event.currentTarget.dataset.dragX
          if (!Number.isFinite(start)) return
          const delta = event.clientX - start
          if (delta > 48) shift(-1)
          else if (delta < -48) shift(1)
        }}
        onPointerCancel={(event) => {
          delete event.currentTarget.dataset.dragX
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{
            gap: UNE_GAP,
            transform: `translate3d(${translate}px, 0, 0)`,
            transition: motion ? `transform ${UNE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
          }}
          onTransitionEnd={(event) => {
            if (event.target !== trackRef.current || event.propertyName !== 'transform') return
            settle(pos)
          }}
        >
          {loop.map((slide, index) => {
            const isActive = index === pos
            return (
              <article
                key={`${slide.image}-${index}`}
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: isActive ? UNE_ACTIVE_W : UNE_SIDE_W,
                  height: isActive ? UNE_ACTIVE_H : UNE_SIDE_H,
                  transition: motion
                    ? `width ${UNE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), height ${UNE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : 'none',
                }}
              >
                <img src={slide.image} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent to-[62%]" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: 'rgb(var(--color-text) / 0.5)',
                    opacity: isActive ? 0 : 1,
                    transition: motion ? `opacity ${UNE_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-4">
                  <p className={`${typography.cardTitle} text-center text-[rgb(var(--color-text-inverse))]`}>{UNE_TITLE}</p>
                  <ActionButton onClick={onDiscover}>Découvrir</ActionButton>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {UNE_SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Aller à la slide ${index + 1}`}
            aria-current={index === logical ? 'true' : undefined}
            onClick={() => goTo(index)}
            className={index === logical ? 'size-2 rounded-pill bg-action' : 'size-2 rounded-pill bg-pagination'}
          />
        ))}
      </div>
    </section>
  )
}

export function SiteHeader({
  go,
  onLogo,
  tone = 'light',
}: {
  go: (screen: Screen) => void
  onLogo?: () => void
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  const headerRef = useRef<HTMLElement>(null)
  const [chrome, setChrome] = useState<'top' | 'hidden' | 'compact'>('top')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const scroller = header.closest<HTMLElement>('[data-page-scroll]')
    const target: HTMLElement | Window = scroller ?? window
    const read = () => (target instanceof Window ? target.scrollY : target.scrollTop)
    let last = read()
    let up = 0

    const onScroll = () => {
      const y = read()
      const dy = y - last
      last = y
      if (y <= 88) {
        up = 0
        setChrome((current) => (current === 'top' ? current : 'top'))
        return
      }
      if (dy > 0) {
        up = 0
        setChrome((current) => (current === 'hidden' ? current : 'hidden'))
        return
      }
      if (dy < 0) {
        up += -dy
        if (up >= 12) setChrome((current) => (current === 'compact' ? current : 'compact'))
      }
    }

    target.addEventListener('scroll', onScroll, { passive: true })
    return () => target.removeEventListener('scroll', onScroll)
  }, [])
  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }
  const openMenu = () => {
    setSearchOpen(false)
    setMenuOpen(true)
  }
  const control = dark
    ? 'border-[rgb(var(--color-accent-sand))] text-[rgb(var(--color-accent-sand))]'
    : 'border-border'
  const compact = chrome === 'compact'
  const bar = [
    'pointer-events-auto flex items-center justify-between px-4',
    'transition-transform duration-200 ease-out motion-reduce:transition-none',
    dark
      ? 'bg-collections text-[rgb(var(--color-accent-sand))]'
      : 'bg-[rgb(var(--color-background-warm))] text-text',
    compact ? 'h-16 border-b py-2' : 'h-[88px] py-3',
    compact
      ? dark
        ? 'border-[rgb(var(--color-border-on-dark))]'
        : 'border-border'
      : 'border-transparent',
    chrome === 'hidden' ? '-translate-y-full' : 'translate-y-0',
  ].join(' ')
  const logo = <Logo light={dark} compact={compact} />
  return (
    <>
    <div aria-hidden className="h-[88px]" />
    <header ref={headerRef} className="pointer-events-none sticky top-0 z-30 -mt-[88px] h-[88px]">
      <div className={bar} {...(chrome === 'hidden' ? { inert: true } : {})}>
      {onLogo ? (
        <button type="button" onClick={onLogo} aria-label="Accueil" className="text-left">{logo}</button>
      ) : logo}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Rechercher"
          aria-expanded={searchOpen}
          aria-haspopup="dialog"
          onClick={openSearch}
          className={`grid size-12 place-items-center rounded-pill border ${control}`}
        >
          <IconSearch className="size-[26px]" />
        </button>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          onClick={openMenu}
          className={`grid size-12 place-items-center rounded-pill border ${control}`}
        >
          <IconMenu className="h-[18px] w-auto" />
        </button>
        <LanguagePair tone={tone} />
      </div>
      <MenuPanel
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={openSearch}
        onLogo={() => {
          setMenuOpen(false)
          onLogo?.()
        }}
        go={(screen) => {
          setMenuOpen(false)
          go(screen)
        }}
      />
      <SearchPanel
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onMenu={openMenu}
      />
      </div>
    </header>
    </>
  )
}

export function SiteFooter({ go }: { go: (screen: Screen) => void }) {
  return (
    <footer className="bg-footer px-4 pt-6 text-[rgb(var(--color-background-warm))]">
      <div className="py-6">
        <Logo light />
      </div>
      <div className="flex flex-col gap-3 py-4">
        <p className={`${typography.footerKicker} text-[rgb(var(--color-accent-sand))]`}>Nous contacter</p>
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconContact className="h-[21px] w-auto text-[rgb(var(--color-action-hover))]" />
          </span>
          <span>
            <span className={`${typography.footerTitle} block`}>L'équipe</span>
            <a
              href="https://www.oc-cultura.eu/oc/descobrir/lequipa/"
              className={typography.footerLinkQuiet}
            >
              www.oc-cultura.eu/oc/descobrir/lequipa/
            </a>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-4">
        <p className={`${typography.footerKicker} text-[rgb(var(--color-accent-sand))]`}>Suivez-nous</p>
        <div className="flex gap-4">
          <span aria-label="Facebook" className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconFacebook className="h-5 w-auto text-[rgb(var(--color-action-hover))]" />
          </span>
          <span aria-label="Courriel" className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconMail className="h-auto w-[18px] text-[rgb(var(--color-action-hover))]" />
          </span>
          <span aria-label="LinkedIn" className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconLinkedin className="h-[18px] w-auto text-[rgb(var(--color-action-hover))]" />
          </span>
          <span aria-label="Instagram" className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconInstagram className="size-[18px] text-[rgb(var(--color-action-hover))]" />
          </span>
          <span aria-label="YouTube" className="grid size-9 place-items-center rounded-[18px] bg-text">
            <IconYoutube className="h-auto w-5 text-[rgb(var(--color-action-hover))]" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <p className={`${typography.footerKicker} text-[rgb(var(--color-accent-sand))]`}>CIRDOC – Institut occitan de cultura</p>
        <div className="flex gap-6">
          <div className="space-y-1">
            <p className={typography.footerTitle}>Mediatèca occitana</p>
            <p className={typography.editorialSecondary}>1 bis boulevard Duguesclin</p>
            <p className={typography.editorialSecondary}>34500 Béziers</p>
          </div>
          <div className="space-y-1">
            <p className={typography.footerTitle}>Etnopòle occitan</p>
            <p className={typography.editorialSecondary}>Place Recaborde</p>
            <p className={typography.editorialSecondary}>64000 Pau</p>
          </div>
        </div>
      </div>
      <div className="flex h-8 items-center" aria-hidden>
        <div className="h-px w-full bg-[rgb(var(--color-action-hover))]" />
      </div>
      <div className={`${typography.footerLink} pb-6 pt-4`}>
        <button
          type="button"
          onClick={() => go('partenaires')}
          className="flex min-h-9 w-full items-center text-left"
        >
          Partenaires
        </button>
        {['Mentions légales et crédits', 'Entrepôt OAI-PMH', 'Informations sur les cookies'].map((label) => (
          <p key={label} className="flex min-h-9 items-center">{label}</p>
        ))}
        <div className="mt-2">
          {['Conditions d’utilisation', 'Données personnelles'].map((label) => (
            <p key={label} className="flex min-h-9 items-center">{label}</p>
          ))}
        </div>
        <div className="mt-2 flex h-8 items-center px-4" aria-hidden>
          <div className="h-px w-full bg-[rgb(var(--color-action-hover))]" />
        </div>
        <p className={`${typography.footerCredit} mt-2 text-center`}>
          © CIRDOC – Institut occitan de cultura
        </p>
      </div>
    </footer>
  )
}

export function HomeView({
  go,
  onOpenGabarit,
}: {
  go: (screen: Screen) => void
  onOpenGabarit: (espace: EspaceKey) => void
}) {
  const espacesRef = useRef<HTMLDivElement>(null)
  const territoiresRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader go={go} />

      <UneCarousel onDiscover={() => onOpenGabarit('musique')} />

      <section className="flex flex-col gap-6 px-4 pb-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className={typography.heading}>Les espaces</h2>
          <SliderArrows
            label="Espaces"
            onPrev={() => scrollRow(espacesRef.current, -1)}
            onNext={() => scrollRow(espacesRef.current, 1)}
          />
        </div>
        <div ref={espacesRef} data-h-scroller="true" className="scrollbar-hidden -mr-4 flex gap-3 overflow-x-auto">
          {ESPACES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={
                item.espace
                  ? () => {
                      const espace = item.espace
                      if (espace) go(`espace-${espace}`)
                    }
                  : undefined
              }
              className="flex h-28 w-72 shrink-0 items-center gap-4 bg-[rgb(var(--color-surface-emphasis))] px-3 py-4 text-left"
            >
              <img src={item.image} alt="" className="h-[62.72px] w-[50.58px] shrink-0" />
              <span className="min-w-0">
                <span className={`${typography.tileTitle} block text-[rgb(var(--color-text-brand))]`}>{item.label}</span>
                <span className={`${typography.uiCaption} mt-1 block text-[rgb(var(--color-text-secondary))]`}>{item.line}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className={typography.heading}>Nos territoires</h2>
          <SliderArrows
            label="Territoires"
            onPrev={() => scrollRow(territoiresRef.current, -1)}
            onNext={() => scrollRow(territoiresRef.current, 1)}
          />
        </div>
        <div ref={territoiresRef} data-h-scroller="true" className="scrollbar-hidden -mr-4 flex gap-2 overflow-x-auto">
          {TERRITOIRES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={
                item.key
                  ? () => {
                      const key = item.key
                      if (key) go(`territoire-${key}`)
                    }
                  : undefined
              }
              className={`${typography.uiLabel} shrink-0 rounded-pill bg-[rgb(var(--color-accent-sand))] px-4 py-2`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 px-4 py-10">
        <h2 className={typography.title}>Cultura viva !</h2>
        <button type="button" onClick={() => onOpenGabarit('fetes')} className="block w-full text-left">
          <img src={vivaHero} alt="" className="h-[180px] w-full object-cover" />
          <span className="flex flex-col gap-2 py-4">
            <span className={typography.cardTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
            <span className={`${typography.editorialLead} text-[rgb(var(--color-text-secondary))]`}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.
            </span>
            <span className={`${typography.uiCategory} pt-2 text-[rgb(var(--color-text-brand))]`}>Culture vivante</span>
          </span>
        </button>
        {COMPACTS.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={item.espace ? () => onOpenGabarit(item.espace!) : undefined}
            className="flex w-full items-start gap-3 border-t border-border pt-6 text-left"
          >
            <img src={item.image} alt="" className="size-20 shrink-0 object-cover" />
            <span className="min-w-0 flex-1">
              <span className={`${typography.cardTitleCompact} block`}>{item.title}</span>
              <span className={`${typography.uiCategory} mt-1 block text-[rgb(var(--color-text-brand))]`}>{item.category}</span>
            </span>
          </button>
        ))}
      </section>

      <section className="bg-collections px-4 text-[rgb(var(--color-background-warm))]">
        <div className="flex flex-col gap-4 pt-0">
          <span className="grid size-10 place-items-center bg-[rgb(var(--color-action-hover))]">
            <IconCollections className="h-6 w-auto text-text" />
          </span>
          <h2 className={typography.title}>Collections !</h2>
        </div>
        <p className={`${typography.editorialLead} mt-4`}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
        </p>
        <div className="relative mt-4 h-[441px]">
          <div className="flex h-full gap-2 overflow-hidden">
            {MOSAIC.map((column) => (
              <div key={column[0].src} className="flex min-w-0 flex-1 flex-col gap-2">
                {column.map((cell) => (
                  <div
                    key={cell.src}
                    className="relative w-full overflow-hidden"
                    style={{ height: cell.height, opacity: cell.opacity ?? 0.9 }}
                  >
                    {cell.crop ? (
                      <img
                        src={cell.src}
                        alt=""
                        className="absolute max-w-none"
                        style={{
                          width: `${cell.crop.width}%`,
                          height: `${cell.crop.height}%`,
                          left: `${cell.crop.left}%`,
                          top: `${cell.crop.top}%`,
                        }}
                      />
                    ) : (
                      <img
                        src={cell.src}
                        alt=""
                        className={`size-full ${cell.fit === 'contain' ? 'object-contain' : 'object-cover object-bottom'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-[321px] items-end justify-center bg-gradient-to-t from-black to-transparent pb-12">
            <ActionButton onClick={() => go('collections')}>Explorer</ActionButton>
          </div>
        </div>
      </section>

      <SiteFooter go={go} />
    </div>
  )
}
