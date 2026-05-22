import * as React from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Screen = 'home' | 'menu' | 'espace-musique' | 'article-musique'

type EspaceKey = 'langue' | 'musique' | 'fetes' | 'portraits' | 'scene'

const espaces: Array<{
  key: EspaceKey
  label: string
  accroche: string
  colorVar: string
}> = [
  {
    key: 'langue',
    label: 'Langue',
    accroche: 'Mots, paroles, littérature',
    colorVar: '--occ-espace-langue',
  },
  {
    key: 'musique',
    label: 'Musique',
    accroche: 'Sons, rythmes, traditions',
    colorVar: '--occ-espace-musique',
  },
  {
    key: 'fetes',
    label: 'Fêtes & Traditions',
    accroche: 'Rites, célébrations, PCI',
    colorVar: '--occ-espace-fetes',
  },
  {
    key: 'portraits',
    label: 'Portraits',
    accroche: 'Figures, histoires, visages',
    colorVar: '--occ-espace-portraits',
  },
  {
    key: 'scene',
    label: 'La Scène occitane',
    accroche: 'Artistes, scènes, créations',
    colorVar: '--occ-espace-scene',
  },
]

const territoires = [
  'Gascogne',
  'Languedoc',
  'Provence',
  'Pyrénées',
  'Limousin',
  'Périgord',
  "Val d'Aran",
  'Dauphiné',
  'Vivaro-alpin',
]

function rgbFromVar(varName: string) {
  return `rgb(var(${varName}))`
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[7px] text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(var(--occ-dark))]">
      {children}
    </div>
  )
}

function Divider() {
  return <div className="mt-3 h-px w-full bg-[rgb(var(--occ-border))]" />
}

function PlaceholderImage({ className }: { className?: string }) {
  return (
    <div
      className={[
        'bg-[rgb(var(--occ-dark))] opacity-90',
        'flex items-center justify-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-[10px] italic text-[rgb(var(--occ-gray))]">
        Visuel
      </span>
    </div>
  )
}

function Chip({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="whitespace-nowrap rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] px-3 py-1 text-[12px] font-medium text-[rgb(var(--occ-dark))]"
    >
      {label}
    </button>
  )
}

function MobileHeader({
  backLabel,
  onBack,
  onMenu,
  rightSlot,
}: {
  backLabel?: string
  onBack?: () => void
  onMenu?: () => void
  rightSlot?: React.ReactNode
}) {
  const showBack = Boolean(onBack)
  return (
    <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] px-5">
      <div className="flex min-w-0 items-center gap-2">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[rgb(var(--occ-brand))] hover:bg-[rgb(var(--occ-light))]"
            aria-label={backLabel ?? 'Retour'}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[rgb(var(--occ-light))]" />
            {onMenu ? (
              <button
                type="button"
                onClick={onMenu}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-3 text-[12px] font-semibold text-[rgb(var(--occ-dark))]"
                aria-label="Ouvrir le menu"
              >
                Menu
              </button>
            ) : (
              <span className="text-[12px] font-extrabold tracking-[0.12em] text-[rgb(var(--occ-brand))]">
                OCCITANICA
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {rightSlot}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-[rgb(var(--occ-dark))]"
          aria-label="Rechercher"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isDownRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const startScrollLeftRef = React.useRef(0)
  const draggedRef = React.useRef(false)
  const [isDragging, setIsDragging] = React.useState(false)

  React.useEffect(() => {
    // Ensure initial alignment on first item (no left "peek")
    const el = ref.current
    if (!el) return
    el.scrollLeft = 0
  }, [])

  return (
    <div
      ref={ref}
      className={[
        // Left aligned with titles (px-5). Right can "peek" (negative margin + extra padding).
        'flex gap-4 overflow-x-auto pb-3 pl-5 pr-14 -mr-5 touch-pan-x overscroll-x-contain [scrollbar-width:none] md:cursor-grab',
        isDragging ? 'snap-none md:cursor-grabbing' : 'snap-x snap-proximity',
      ].join(' ')}
      style={{ scrollPaddingLeft: 20, scrollPaddingRight: 56 }}
      onPointerDown={(e) => {
        const el = ref.current
        if (!el) return
        isDownRef.current = true
        draggedRef.current = false
        setIsDragging(true)
        startXRef.current = e.clientX
        startScrollLeftRef.current = el.scrollLeft
        try {
          el.setPointerCapture(e.pointerId)
        } catch {
          // ignore
        }
      }}
      onPointerMove={(e) => {
        const el = ref.current
        if (!el || !isDownRef.current) return
        const dx = e.clientX - startXRef.current
        if (Math.abs(dx) > 3) draggedRef.current = true
        el.scrollLeft = startScrollLeftRef.current - dx
      }}
      onPointerUp={() => {
        isDownRef.current = false
        setIsDragging(false)
      }}
      onPointerCancel={() => {
        isDownRef.current = false
        setIsDragging(false)
      }}
      onDragStart={(e) => {
        e.preventDefault()
      }}
    >
      {children}
    </div>
  )
}

function CardSkeletonLines() {
  return (
    <div className="space-y-1.5">
      <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
      <div className="h-2 w-7/12 rounded bg-[rgb(var(--occ-light))]" />
    </div>
  )
}

function HeroCarousel({
  title,
  onPrimaryAction,
  primaryLabel,
}: {
  title: string
  primaryLabel: string
  onPrimaryAction: () => void
}) {
  const baseSlides = React.useMemo(() => [0, 1, 2] as const, [])
  const slides = React.useMemo(
    () => [2, 0, 1, 2, 0] as const,
    []
  )
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const slideRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const rafRef = React.useRef<number | null>(null)
  const [active, setActive] = React.useState(0) // 0..2 (baseSlides index)
  const [styles, setStyles] = React.useState<
    Array<{ scale: number; opacity: number }>
  >(() => slides.map(() => ({ scale: 1, opacity: 1 })))

  const isDownRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const startScrollLeftRef = React.useRef(0)
  const draggingRef = React.useRef(false)
  const ignoreScrollRef = React.useRef(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [snapEnabled, setSnapEnabled] = React.useState(true)

  // Centered visual slide index in `slides` array
  // We start on index 1 => base slide 0 (first dot), with peek left/right.
  const centerIndex = React.useRef(1)

  const compute = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const rect = scroller.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2

    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY

    const next = slides.map((_, idx) => {
      const el = slideRefs.current[idx]
      if (!el) return { scale: 0.94, opacity: 0.85 }

      const r = el.getBoundingClientRect()
      const slideCenter = r.left + r.width / 2
      const dist = Math.abs(centerX - slideCenter)
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = idx
      }

      const t = Math.min(1, dist / (rect.width * 0.85))
      // Slight ease-out for softer feel
      const eased = Math.pow(t, 1.35)
      const scale = 1 - 0.06 * eased
      const opacity = 1 - 0.22 * eased
      return { scale, opacity }
    })

    centerIndex.current = bestIdx
    setActive(slides[bestIdx] ?? 0)
    setStyles(next)
  }, [slides])

  const centerSlideAt = React.useCallback((visualIdx: number, smooth = false) => {
    const scroller = scrollerRef.current
    const slide = slideRefs.current[visualIdx]
    if (!scroller || !slide) return

    const left =
      slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2
    scroller.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  React.useEffect(() => {
    // initial center (index 2 => base slide 1) so we have peek left/right immediately
    const scroller = scrollerRef.current
    if (scroller) {
      // wait layout
      requestAnimationFrame(() => {
        centerSlideAt(1, false)
        compute()
      })
    } else {
      compute()
    }
    function onResize() {
      compute()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [centerSlideAt, compute])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    function onScroll() {
      if (ignoreScrollRef.current) return
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [compute])

  const scrollToIndex = React.useCallback((baseIdx: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    // choose the closest occurrence of baseIdx around current center
    const current = centerIndex.current
    const candidates = slides
      .map((v, i) => ({ v, i }))
      .filter((x) => x.v === baseIdx)
      .map((x) => x.i)
    const best = candidates.sort((a, b) => Math.abs(a - current) - Math.abs(b - current))[0]
    const slide = slideRefs.current[best]
    if (!scroller || !slide) return

    const left =
      slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2
    scroller.scrollTo({ left, behavior: 'smooth' })
  }, [slides])

  const normalizeLoop = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const idx = centerIndex.current
    // if we are on the clones edges, jump to the corresponding "real" occurrence
    // slides = [2,0,1,2,0]
    // idx 0 (base2 clone-left) -> jump to idx 3 (base2)
    // idx 4 (base0 clone-right) -> jump to idx 1 (base0)
    if (idx === 0) {
      ignoreScrollRef.current = true
      centerSlideAt(3, false)
      window.setTimeout(() => {
        ignoreScrollRef.current = false
        compute()
      }, 0)
    } else if (idx === slides.length - 1) {
      ignoreScrollRef.current = true
      centerSlideAt(1, false)
      window.setTimeout(() => {
        ignoreScrollRef.current = false
        compute()
      }, 0)
    }
  }, [centerSlideAt, compute, slides.length])

  const snapToNearest = React.useCallback(() => {
    const idx = centerIndex.current
    centerSlideAt(idx, true)
  }, [centerSlideAt])

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[32px] font-extrabold tracking-tight text-[rgb(var(--occ-dark))]">
        {title}
      </h1>

      <div
        ref={scrollerRef}
        className={[
          '-mx-5 mt-4 flex gap-4 overflow-x-auto px-5 pb-2 touch-pan-x overscroll-x-contain [scrollbar-width:none] md:cursor-grab',
          snapEnabled ? 'snap-x snap-mandatory' : 'snap-none',
          isDragging ? 'md:cursor-grabbing' : '',
        ].join(' ')}
        style={{ scrollPaddingLeft: 20, scrollPaddingRight: 20 }}
        onPointerDown={(e) => {
          const el = scrollerRef.current
          if (!el) return
          isDownRef.current = true
          draggingRef.current = false
          setSnapEnabled(false)
          setIsDragging(true)
          startXRef.current = e.clientX
          startScrollLeftRef.current = el.scrollLeft
          try {
            el.setPointerCapture(e.pointerId)
          } catch {
            // ignore
          }
        }}
        onPointerMove={(e) => {
          const el = scrollerRef.current
          if (!el || !isDownRef.current) return
          const dx = e.clientX - startXRef.current
          if (Math.abs(dx) > 3) draggingRef.current = true
          el.scrollLeft = startScrollLeftRef.current - dx
        }}
        onPointerUp={() => {
          isDownRef.current = false
          setIsDragging(false)
          // Smoothly center the nearest slide, then re-enable snap.
          snapToNearest()
          window.setTimeout(() => {
            setSnapEnabled(true)
            normalizeLoop()
          }, 260)
        }}
        onPointerCancel={() => {
          isDownRef.current = false
          setIsDragging(false)
          snapToNearest()
          window.setTimeout(() => {
            setSnapEnabled(true)
            normalizeLoop()
          }, 260)
        }}
        onMouseLeave={() => {
          if (!isDownRef.current) return
          isDownRef.current = false
          setIsDragging(false)
          snapToNearest()
          window.setTimeout(() => {
            setSnapEnabled(true)
            normalizeLoop()
          }, 260)
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides.map((i, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}-${idx}`}
            ref={(el) => {
              slideRefs.current[idx] = el
            }}
            className="flex-none snap-center"
            style={{ width: 300 }}
          >
            <div
              className="relative origin-center overflow-hidden rounded-[22px] bg-[rgb(var(--occ-light))] shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
              style={{
                transform: `scale(${styles[idx]?.scale ?? 1})`,
                opacity: styles[idx]?.opacity ?? 1,
                transition: isDragging
                  ? 'none'
                  : 'transform 220ms ease, opacity 220ms ease',
                willChange: 'transform, opacity',
              }}
            >
              <PlaceholderImage className="h-[344px] w-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/75" />

              <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-center text-white">
                <div className="mx-auto max-w-[260px] space-y-3">
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-white/90" />
                    <div className="h-3 w-10/12 rounded bg-white/80" />
                  </div>
                  <div className="mx-auto h-2 w-7/12 rounded bg-white/50" />

                  <button
                    type="button"
                    onClick={onPrimaryAction}
                    className="mx-auto inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-[rgb(var(--occ-dark))]"
                  >
                    {primaryLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {baseSlides.map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Aller à la slide ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className="rounded-full"
            style={{
              width: i === active ? 22 : 8,
              height: 8,
              background:
                i === active
                  ? 'rgb(var(--occ-dark))'
                  : 'rgb(var(--occ-med))',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function HomeScreen({ go }: { go: (screen: Screen) => void }) {
  const musique = espaces.find((e) => e.key === 'musique')!

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader onMenu={() => go('menu')} />

      <HeroCarousel
        title="À la Une"
        primaryLabel="Découvrir"
        onPrimaryAction={() => go('article-musique')}
      />

      <Divider />

      {/* Espaces */}
      <div className="pt-6">
        <div className="flex items-end justify-between px-5">
          <SectionLabel>Les espaces à découvrir</SectionLabel>
          <div className="hidden gap-1 md:flex">
            {['←', '→'].map((a) => (
              <div
                key={a}
                className="grid h-5 w-5 place-items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[10px]"
              >
                {a}
              </div>
            ))}
          </div>
        </div>

        <HorizontalScroller>
          {espaces.map((e) => (
            <button
              key={e.key}
              type="button"
              onClick={() =>
                e.key === 'musique' ? go('espace-musique') : undefined
              }
              className="w-[168px] flex-none snap-start text-left"
            >
              <div className="relative h-[132px] overflow-hidden rounded-xl">
                <PlaceholderImage className="h-[132px] w-full" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(transparent 35%, ${rgbFromVar(
                      e.colorVar
                    )})`,
                    opacity: 0.92,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="text-[14px] font-bold text-white">
                    {e.label}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-white/75">
                    {e.accroche}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </HorizontalScroller>
      </div>

      {/* Territoires */}
      <div className="mt-4 border-y border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(var(--occ-gray))]">
            Territoires
          </div>
          <div className="hidden gap-1 md:flex">
            {['←', '→'].map((a) => (
              <div
                key={a}
                className="grid h-5 w-5 place-items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[10px]"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
        <HorizontalScroller>
          {territoires.slice(0, 8).map((t) => (
            <div key={t} className="snap-start">
              <Chip label={t} />
            </div>
          ))}
        </HorizontalScroller>
      </div>

      <Divider />

      {/* Hero “Cultura viva” + articles */}
      <div className="px-5 pt-6">
        <SectionLabel>Cultura viva !</SectionLabel>
        <Card className="overflow-hidden border-[rgb(var(--occ-border))]">
          <PlaceholderImage className="h-24 w-full" />
          <div className="p-3">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ color: rgbFromVar(musique.colorVar) }}
            >
              La Scène · Lo Mag
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
              <div className="h-2 w-8/12 rounded bg-[rgb(var(--occ-med))]" />
              <div className="h-2 w-6/12 rounded bg-[rgb(var(--occ-light))]" />
            </div>
          </div>
        </Card>

        <div className="mt-5 space-y-5 pb-8">
          {[
            { tag: 'Fêtes', colorVar: '--occ-espace-fetes' },
            { tag: 'Musique', colorVar: '--occ-espace-musique' },
          ].map((a, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go('article-musique')}
              className="flex w-full gap-3 border-t border-[rgb(var(--occ-border))] pt-3 text-left"
            >
              <div className="h-12 w-12 flex-none overflow-hidden rounded-md bg-[rgb(var(--occ-light))]">
                <PlaceholderImage className="h-12 w-12" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: rgbFromVar(a.colorVar) }}
                >
                  {a.tag}
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
                  <div className="h-2 w-8/12 rounded bg-[rgb(var(--occ-light))]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer quick placeholder */}
      <div className="border-t border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-5 py-8">
        <div className="text-[12px] font-extrabold tracking-[0.08em] text-[rgb(var(--occ-brand))]">
          OCCITANICA
        </div>
        <div className="mt-1 text-[12px] text-[rgb(var(--occ-gray))]">
          Institut occitan de cultura — CIRDOC
        </div>
        <div className="mt-4 grid gap-2 text-[12px] text-[rgb(var(--occ-gray))]">
          <div className="font-semibold uppercase tracking-[0.1em] text-[10px]">
            Espaces
          </div>
          <div className="flex flex-wrap gap-2">
            {espaces.map((e) => (
              <span key={e.key}>{e.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuScreen({
  go,
}: {
  go: (screen: Screen) => void
}) {
  const [menuEspacesOpen, setMenuEspacesOpen] = React.useState(true)
  const [menuTerritoiresOpen, setMenuTerritoiresOpen] = React.useState(false)

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader
        backLabel="Fermer le menu"
        onBack={() => go('home')}
        rightSlot={
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            aria-label="Fermer"
            onClick={() => go('home')}
          >
            <X className="h-5 w-5" />
          </Button>
        }
      />

      <div className="px-4 py-4">
        <div className="space-y-3">
          {/* Espaces accordion */}
          <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
            <button
              type="button"
              onClick={() => setMenuEspacesOpen((v) => !v)}
              className="flex w-full items-center justify-between bg-[rgb(var(--occ-white))] px-4 py-3"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--occ-gray))]">
                Espaces
              </span>
              <span className="text-[12px] text-[rgb(var(--occ-gray))]">
                {menuEspacesOpen ? '∧' : '∨'}
              </span>
            </button>
            {menuEspacesOpen ? (
              <div className="divide-y divide-[rgb(var(--occ-border))]">
                {espaces.map((e) => (
                  <button
                    key={e.key}
                    type="button"
                    onClick={() =>
                      e.key === 'musique' ? go('espace-musique') : go('home')
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[rgb(var(--occ-light))]"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: rgbFromVar(e.colorVar) }}
                    />
                    <span className="text-[14px] font-semibold">
                      {e.label}
                    </span>
                    <span className="ml-auto text-[14px] text-[rgb(var(--occ-med))]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Territoires accordion */}
          <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
            <button
              type="button"
              onClick={() => setMenuTerritoiresOpen((v) => !v)}
              className="flex w-full items-center justify-between bg-[rgb(var(--occ-white))] px-4 py-3"
            >
              <span className="text-[14px] font-semibold">Territoires</span>
              <span className="text-[12px] text-[rgb(var(--occ-gray))]">
                {menuTerritoiresOpen ? '∧' : '∨'}
              </span>
            </button>
            {menuTerritoiresOpen ? (
              <div className="max-h-80 overflow-auto px-4 pb-3">
                <div className="divide-y divide-[rgb(var(--occ-border))]">
                  {territoires.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => go('home')}
                      className="flex w-full items-center justify-between py-2 text-left text-[14px] hover:bg-[rgb(var(--occ-light))]"
                    >
                      <span>{t}</span>
                      <span className="text-[14px] text-[rgb(var(--occ-med))]">
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Collections (direct link) */}
          <div className="flex items-center justify-between rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-4 py-3">
            <span className="text-[14px] font-semibold">Collections</span>
            <span className="text-[14px] text-[rgb(var(--occ-brand))]">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EspaceMusiqueScreen({ go }: { go: (screen: Screen) => void }) {
  const musique = espaces.find((e) => e.key === 'musique')!
  const tabs = [
    'Chants & Voix',
    'Instruments',
    'Danses',
    'Artistes & Groupes',
    'Archives sonores',
  ]
  const [activeTab, setActiveTab] = React.useState(0)

  const sections = [
    { title: 'Archives sonores', badge: 'Archive' },
    { title: 'Portraits de musiciens', badge: 'Portrait' },
    { title: 'Instruments & danses', badge: 'PCI' },
  ]

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={() => go('home')} onMenu={() => go('menu')} />

      {/* Hero */}
      <div className="relative h-28">
        <PlaceholderImage className="h-28 w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(transparent 30%, ${rgbFromVar(
              musique.colorVar
            )})`,
            opacity: 0.95,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <div className="text-[20px] font-extrabold text-white">
            {musique.label}
          </div>
          <div className="mt-1 text-[12px] text-white/80">
            {musique.accroche}
          </div>
        </div>
      </div>

      {/* Tabs sous-espaces */}
      <div className="border-b border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))]">
        <HorizontalScroller>
          {tabs.map((t, idx) => {
            const active = idx === activeTab
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={[
                  'rounded-full px-3 py-1.5 text-[12px] font-semibold',
                  active
                    ? 'text-white'
                    : 'text-[rgb(var(--occ-dark))] border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))]',
                ].join(' ')}
                style={
                  active ? { background: rgbFromVar(musique.colorVar) } : undefined
                }
              >
                {t}
              </button>
            )
          })}
        </HorizontalScroller>
      </div>

      {/* À la une */}
      <div className="px-4 pt-4">
        <SectionLabel>À la une</SectionLabel>
        <Card className="overflow-hidden border-[rgb(var(--occ-border))]">
          <div className="relative">
            <PlaceholderImage className="h-24 w-full" />
            <div className="absolute left-2 top-2">
              <Badge
                className="border-0"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: rgbFromVar(musique.colorVar),
                }}
              >
                Article · Musique
              </Badge>
            </div>
          </div>
          <div className="p-3">
            <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
            <div className="mt-2 h-2 w-8/12 rounded bg-[rgb(var(--occ-med))]" />
            <div className="mt-2 h-2 w-6/12 rounded bg-[rgb(var(--occ-light))]" />
          </div>
        </Card>
      </div>

      {/* Sections */}
      {sections.map((s) => (
        <div key={s.title}>
          <Divider />
          <div className="px-4 pt-4">
            <div className="mb-3 flex items-end justify-between">
              <SectionLabel>{s.title}</SectionLabel>
              <div className="flex gap-1">
                {['←', '→'].map((a) => (
                  <div
                    key={a}
                    className="grid h-5 w-5 place-items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[10px]"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <HorizontalScroller>
              {Array.from({ length: 3 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => go('article-musique')}
                  className="w-[150px] flex-none text-left"
                >
                  <Card className="overflow-hidden border-[rgb(var(--occ-border))]">
                    <div className="relative">
                      <PlaceholderImage className="h-20 w-full" />
                      <span
                        className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: rgbFromVar(musique.colorVar) }}
                      >
                        {s.badge}
                      </span>
                    </div>
                    <div className="p-2">
                      <CardSkeletonLines />
                    </div>
                  </Card>
                </button>
              ))}
            </HorizontalScroller>
          </div>
        </div>
      ))}

      {/* Articles list */}
      <Divider />
      <div className="px-4 pt-4 pb-6">
        <SectionLabel>Articles</SectionLabel>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go('article-musique')}
              className="flex w-full gap-3 text-left"
            >
              <div className="h-14 w-14 flex-none overflow-hidden rounded-md border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))]">
                <PlaceholderImage className="h-14 w-14" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: rgbFromVar(musique.colorVar) }}
                >
                  Musique
                </div>
                <div className="mt-1">
                  <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
                  <div className="mt-2 h-2 w-7/12 rounded bg-[rgb(var(--occ-light))]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArticleMusiqueScreen({ go }: { go: (screen: Screen) => void }) {
  const musique = espaces.find((e) => e.key === 'musique')!
  const tags = ['Musique', 'Archives sonores', 'Patrimoine vivant', 'Gascogne']
  const suggestions = [
    { title: 'Archives sonores — collectage en Occitanie', tag: 'Archive' },
    { title: 'Portrait: une figure de la musique occitane', tag: 'Portrait' },
    { title: 'Instruments & danses — fiche PCI', tag: 'PCI' },
  ]

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader
        backLabel="Retour à Musique"
        onBack={() => go('espace-musique')}
        onMenu={() => go('menu')}
      />

      {/* Header visuel */}
      <div className="relative">
        <PlaceholderImage className="h-44 w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge
              className="border-0"
              style={{
                background: 'rgba(255,255,255,0.92)',
                color: rgbFromVar(musique.colorVar),
              }}
            >
              Article · Musique
            </Badge>
            <Badge className="border-0 bg-black/30 text-white">
              Lecture · 6 min
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-11/12 rounded bg-white/90" />
            <div className="h-3 w-8/12 rounded bg-white/80" />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center gap-2 text-[12px] text-[rgb(var(--occ-gray))]">
          <span>Publié le 14 juin 2026</span>
          <span className="text-[rgb(var(--occ-med))]">·</span>
          <span>Occitanica</span>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
              <div className="h-2 w-10/12 rounded bg-[rgb(var(--occ-light))]" />
              <div className="h-2 w-9/12 rounded bg-[rgb(var(--occ-light))]" />
            </div>
          ))}
        </div>

        <Divider />

        {/* Tags */}
        <div className="pt-4">
          <SectionLabel>Tags</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        </div>

        <Divider />

        {/* Suggestions */}
        <div className="pt-4 pb-6">
          <SectionLabel>Suggestions</SectionLabel>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go('article-musique')}
                className="flex w-full gap-3 rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] p-3 text-left hover:bg-[rgb(var(--occ-light))]"
              >
                <div className="h-14 w-14 flex-none overflow-hidden rounded-md bg-[rgb(var(--occ-light))]">
                  <PlaceholderImage className="h-14 w-14" />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.1em]"
                    style={{ color: rgbFromVar(musique.colorVar) }}
                  >
                    {s.tag}
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-10/12 rounded bg-[rgb(var(--occ-med))]" />
                    <div className="h-2 w-7/12 rounded bg-[rgb(var(--occ-light))]" />
                  </div>
                </div>
                <span className="text-[14px] text-[rgb(var(--occ-med))]">
                  ›
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Prototype() {
  const [screen, setScreen] = React.useState<Screen>('home')

  function go(next: Screen) {
    setScreen(next)
  }

  const content =
    screen === 'menu' ? (
      <MenuScreen go={go} />
    ) : screen === 'espace-musique' ? (
      <EspaceMusiqueScreen go={go} />
    ) : screen === 'article-musique' ? (
      <ArticleMusiqueScreen go={go} />
    ) : (
      <HomeScreen go={go} />
    )

  return (
    <main className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))]">
      {/* Mobile shell only; PrototypeLayout handles mockup */}
      {content}
    </main>
  )
}

