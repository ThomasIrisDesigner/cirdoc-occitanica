import * as React from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ── Types ─────────────────────────────────────────────────────────────────────

type EspaceKey = 'langue' | 'musique' | 'fetes' | 'portraits' | 'scene'
type TerritoireKey = 'gascogne' | 'languedoc' | 'pyrenees' | 'provence'
type Screen =
  | 'home'
  | 'menu'
  | 'collections'
  | 'article'
  | `espace-${EspaceKey}`
  | `territoire-${TerritoireKey}`

// ── Static data ───────────────────────────────────────────────────────────────

const espaces: Array<{
  key: EspaceKey
  label: string
  accroche: string
  colorVar: string
}> = [
  { key: 'langue',    label: 'Langue',            accroche: 'Mots, paroles, littérature',  colorVar: '--occ-espace-langue' },
  { key: 'musique',   label: 'Musique',            accroche: 'Sons, rythmes, traditions',   colorVar: '--occ-espace-musique' },
  { key: 'fetes',     label: 'Fêtes & Traditions', accroche: 'Rites, célébrations, PCI',    colorVar: '--occ-espace-fetes' },
  { key: 'portraits', label: 'Portraits',          accroche: 'Figures, histoires, visages', colorVar: '--occ-espace-portraits' },
  { key: 'scene',     label: 'La Scène occitane',  accroche: 'Artistes, scènes, créations', colorVar: '--occ-espace-scene' },
]

type EspaceConfig = {
  heroTag: string
  tabs: string[]
  sections: Array<{ title: string; badge: string; badgeColorVar: string }>
  hasAgenda: boolean
  agendaItems: Array<{ date: string; lieu: string; title: string }>
  hasAZ: boolean
  voirAussi: EspaceKey[]
}

const ESPACES_CONFIG: Record<EspaceKey, EspaceConfig> = {
  langue: {
    heroTag: 'Article · Langue',
    tabs: ['Textes', 'Grammaire', 'Littérature', 'Pédagogie', 'Phonologie'],
    sections: [
      { title: "Comprendre l'occitan",    badge: 'Article',   badgeColorVar: '--occ-espace-langue' },
      { title: 'Textes & littérature',    badge: 'Archive',   badgeColorVar: '--occ-dark' },
      { title: 'Ressources pédagogiques', badge: 'Ressource', badgeColorVar: '--occ-gray' },
    ],
    hasAgenda: false,
    agendaItems: [],
    hasAZ: false,
    voirAussi: ['portraits', 'musique'],
  },
  musique: {
    heroTag: 'Article · Musique',
    tabs: ['Chants & Voix', 'Instruments', 'Danses', 'Artistes & Groupes', 'Archives sonores'],
    sections: [
      { title: 'Archives sonores',       badge: 'Archive',  badgeColorVar: '--occ-dark' },
      { title: 'Portraits de musiciens', badge: 'Portrait', badgeColorVar: '--occ-espace-portraits' },
      { title: 'Instruments & danses',   badge: 'PCI',      badgeColorVar: '--occ-espace-fetes' },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '14 juin', lieu: 'Auch', title: 'Festival occitan' },
      { date: '21 juin', lieu: 'Foix', title: 'Fête de la musique — scène oc' },
    ],
    hasAZ: false,
    voirAussi: ['portraits', 'fetes'],
  },
  fetes: {
    heroTag: 'PCI · Fêtes',
    tabs: ['Fêtes', 'PCI', 'Artisanat', 'Rites', 'Calendrier'],
    sections: [
      { title: 'Fêtes et célébrations',    badge: 'PCI',   badgeColorVar: '--occ-espace-fetes' },
      { title: 'Savoir-faire & artisanat', badge: 'PCI',   badgeColorVar: '--occ-espace-fetes' },
      { title: 'Sur votre territoire',     badge: 'Vidéo', badgeColorVar: '--occ-brand' },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '24 juin', lieu: 'Carcassonne',    title: 'Fête de la Saint-Jean occitane' },
      { date: '15 août', lieu: 'Mont-de-Marsan', title: 'Festival des Landes' },
    ],
    hasAZ: false,
    voirAussi: ['musique', 'langue'],
  },
  portraits: {
    heroTag: 'Portrait',
    tabs: ['Historiques', 'Contemporains', 'Musiciens', 'Écrivains', 'Militants'],
    sections: [
      { title: 'Figures historiques',     badge: 'Portrait', badgeColorVar: '--occ-espace-portraits' },
      { title: "Créateurs d'aujourd'hui", badge: 'Portrait', badgeColorVar: '--occ-espace-portraits' },
    ],
    hasAgenda: false,
    agendaItems: [],
    hasAZ: true,
    voirAussi: ['scene', 'musique'],
  },
  scene: {
    heroTag: 'Article · Lo Mag',
    tabs: ['Concerts', 'Théâtre', 'Lo Mag', 'Danse', "À l'affiche"],
    sections: [
      { title: "À l'affiche",    badge: 'Article',  badgeColorVar: '--occ-espace-scene' },
      { title: 'Artistes',       badge: 'Portrait', badgeColorVar: '--occ-espace-portraits' },
      { title: 'Lu dans Lo Mag', badge: 'Article',  badgeColorVar: '--occ-espace-scene' },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '12 juil.', lieu: 'Montpellier', title: 'Canto lo Vent' },
      { date: '4 août',   lieu: 'Avignon',     title: 'Scène occitane au Festival' },
    ],
    hasAZ: false,
    voirAussi: ['portraits', 'musique'],
  },
}

type TerritoireConfig = {
  label: string
  region: string
  docsCount: string
  sections: Array<{ title: string; badge: string; badgeColorVar: string; avatars?: boolean }>
  hasAgenda: boolean
  agendaItems: Array<{ date: string; lieu: string; title: string }>
}

const TERRITOIRES_CONFIG: Record<TerritoireKey, TerritoireConfig> = {
  gascogne: {
    label: 'Gascogne',
    region: 'Sud-Ouest occitan',
    docsCount: '1 240',
    sections: [
      { title: 'Musique',            badge: 'Archive',  badgeColorVar: '--occ-espace-musique' },
      { title: 'Fêtes & Traditions', badge: 'PCI',      badgeColorVar: '--occ-espace-fetes' },
      { title: 'Personnalités',      badge: 'Portrait', badgeColorVar: '--occ-espace-portraits', avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '08 août', lieu: 'Dax',            title: 'Fêtes de Dax' },
      { date: '15 août', lieu: 'Mont-de-Marsan', title: 'Festival des Landes' },
    ],
  },
  languedoc: {
    label: 'Languedoc',
    region: "Cœur de l'Occitanie",
    docsCount: '2 180',
    sections: [
      { title: 'Langue',             badge: 'Article',  badgeColorVar: '--occ-espace-langue' },
      { title: 'Fêtes & Traditions', badge: 'PCI',      badgeColorVar: '--occ-espace-fetes' },
      { title: 'La Scène',           badge: 'Article',  badgeColorVar: '--occ-espace-scene' },
      { title: 'Personnalités',      badge: 'Portrait', badgeColorVar: '--occ-espace-portraits', avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '12 juil.', lieu: 'Montpellier', title: 'Canto lo Vent' },
      { date: '3 août',   lieu: 'Béziers',     title: 'Festival occitan' },
    ],
  },
  pyrenees: {
    label: 'Pyrénées',
    region: 'Occitan & gascon pyrénéen',
    docsCount: '890',
    sections: [
      { title: 'Musique',            badge: 'Archive',  badgeColorVar: '--occ-espace-musique' },
      { title: 'Fêtes & Traditions', badge: 'PCI',      badgeColorVar: '--occ-espace-fetes' },
      { title: 'Personnalités',      badge: 'Portrait', badgeColorVar: '--occ-espace-portraits', avatars: true },
    ],
    hasAgenda: false,
    agendaItems: [],
  },
  provence: {
    label: 'Provence',
    region: 'Occitan provençal',
    docsCount: '760',
    sections: [
      { title: 'Langue',        badge: 'Article',  badgeColorVar: '--occ-espace-langue' },
      { title: 'Portraits',     badge: 'Portrait', badgeColorVar: '--occ-espace-portraits' },
      { title: 'La Scène',      badge: 'Article',  badgeColorVar: '--occ-espace-scene' },
      { title: 'Personnalités', badge: 'Portrait', badgeColorVar: '--occ-espace-portraits', avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: '5 juil.', lieu: 'Aix-en-Provence', title: 'Fèsto Vierginenco' },
    ],
  },
}

// Territoire pills on home — only the 4 with full pages get navigation
const TERRITOIRE_PILLS: Array<{ key: TerritoireKey | null; label: string }> = [
  { key: 'gascogne',  label: 'Gascogne' },
  { key: 'languedoc', label: 'Languedoc' },
  { key: 'provence',  label: 'Provence' },
  { key: 'pyrenees',  label: 'Pyrénées' },
  { key: null,        label: 'Limousin' },
  { key: null,        label: 'Périgord' },
  { key: null,        label: "Val d'Aran" },
  { key: null,        label: 'Dauphiné' },
]

const COLLECTIONS_DATA = {
  thematiques: espaces.map((e, i) => ({
    label: e.label,
    colorVar: e.colorVar,
    count: ['3 241 docs', '1 876 docs', '987 docs', '2 134 docs', '612 docs'][i],
  })),
  territoires: [
    { label: 'Gascogne',  count: '1 243 docs' },
    { label: 'Languedoc', count: '2 476 docs' },
    { label: 'Provence',  count: '894 docs' },
    { label: 'Pyrénées',  count: '612 docs' },
    { label: 'Limousin',  count: '438 docs' },
  ],
  types: [
    { label: 'Bibliothèque',      icon: '📄', count: '4 821 docs', shade: '#2c3e50' },
    { label: 'Archives sonores',  icon: '🎵', count: '3 247 docs', shade: '#1a5276' },
    { label: 'Vidéothèque',       icon: '▶',  count: '1 893 docs', shade: '#4a235a' },
    { label: 'Iconothèque',       icon: '🖼',  count: '2 104 docs', shade: '#784212' },
    { label: 'Ressources langue', icon: 'Aa', count: '892 docs',   shade: '#1e8449' },
    { label: 'Expositions',       icon: '✦',  count: '3 expos',    shade: '#922b21' },
  ],
  periodes: [
    { label: 'Moyen Âge',      span: '10e–15e s.', count: '800 docs',   shade: '#1c2833' },
    { label: 'Époque moderne', span: '16e–18e s.', count: '1 240 docs', shade: '#2e4057' },
    { label: '19e siècle',     span: '1800–1900',  count: '2 340 docs', shade: '#1a4a4a' },
    { label: '20e siècle',     span: '1900–2000',  count: '3 870 docs', shade: '#2d4a1e' },
    { label: 'Contemporain',   span: '2000 →',     count: '1 450 docs', shade: '#4a1942' },
  ],
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function rgbFromVar(varName: string) {
  return `rgb(var(${varName}))`
}

// ── Primitives ────────────────────────────────────────────────────────────────

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
      className="inline-flex h-8 flex-none items-center whitespace-nowrap rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] px-4 text-[12px] font-medium text-[rgb(var(--occ-dark))] transition-colors hover:bg-[rgb(var(--occ-light))]"
    >
      {label}
    </button>
  )
}

// ── MobileHeader ──────────────────────────────────────────────────────────────

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
    <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] px-5">
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

// ── HorizontalScroller ────────────────────────────────────────────────────────

function HorizontalScroller({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'compact'
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isDownRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const startScrollLeftRef = React.useRef(0)
  const didDragRef = React.useRef(false)
  const [isDragging, setIsDragging] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollLeft = 0
  }, [])

  // default : "peek" à droite pour suggérer du contenu hors-écran (cartes, sliders)
  // compact : padding symétrique pour barre de chips / tabs
  const paddingClasses =
    variant === 'compact'
      ? 'gap-2 pl-5 pr-5 py-3'
      : 'gap-4 pl-5 pr-14 -mr-5 pb-3'
  const scrollPaddingRight = variant === 'compact' ? 20 : 56

  return (
    <div
      ref={ref}
      data-h-scroller="true"
      className={[
        'scrollbar-hidden flex overflow-x-auto overscroll-x-contain md:cursor-grab',
        paddingClasses,
        isDragging ? 'snap-none md:cursor-grabbing select-none' : 'snap-x snap-proximity',
      ].join(' ')}
      style={{ scrollPaddingLeft: 20, scrollPaddingRight }}
      onPointerDown={(e) => {
        const el = ref.current
        if (!el) return
        // Laisse le navigateur gérer nativement le toucher (scroll vertical / horizontal)
        if (e.pointerType !== 'mouse') return
        if (e.button !== 0) return
        isDownRef.current = true
        didDragRef.current = false
        setIsDragging(false)
        startXRef.current = e.clientX
        startScrollLeftRef.current = el.scrollLeft
      }}
      onPointerMove={(e) => {
        const el = ref.current
        if (!el || !isDownRef.current) return
        if (e.pointerType !== 'mouse') return
        const dx = e.clientX - startXRef.current
        if (Math.abs(dx) > 5) {
          didDragRef.current = true
          setIsDragging(true)
        }
        if (didDragRef.current) {
          el.scrollLeft = startScrollLeftRef.current - dx
        }
      }}
      onPointerUp={() => { isDownRef.current = false; setIsDragging(false) }}
      onPointerLeave={() => { isDownRef.current = false; setIsDragging(false) }}
      onPointerCancel={() => { isDownRef.current = false; setIsDragging(false) }}
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.stopPropagation()
          e.preventDefault()
          didDragRef.current = false
        }
      }}
      onDragStart={(e) => { e.preventDefault() }}
    >
      {children}
    </div>
  )
}

// ── CardSkeletonLines ─────────────────────────────────────────────────────────

function CardSkeletonLines() {
  return (
    <div className="space-y-1.5">
      <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
      <div className="h-2 w-7/12 rounded bg-[rgb(var(--occ-light))]" />
    </div>
  )
}

// ── SliderArrows — flèches décoratives de navigation ──────────────────────────

function SliderArrows() {
  return (
    <div className="flex flex-none gap-1">
      {['←', '→'].map((a) => (
        <div
          key={a}
          aria-hidden
          className="grid h-6 w-6 place-items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[11px] text-[rgb(var(--occ-dark))]"
        >
          {a}
        </div>
      ))}
    </div>
  )
}

// ── SliderSection — header (titre + flèches) + scroller, partagé partout ──────

function SliderSection({
  title,
  withArrows = true,
  withDivider = false,
  scrollerVariant = 'default',
  className,
  children,
}: {
  title: React.ReactNode
  withArrows?: boolean
  withDivider?: boolean
  scrollerVariant?: 'default' | 'compact'
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      {withDivider && <Divider />}
      <section className={['px-5 pt-6', className].filter(Boolean).join(' ')}>
        <header className="mb-3 flex items-center justify-between gap-3">
          <SectionLabel>{title}</SectionLabel>
          {withArrows && <SliderArrows />}
        </header>
        <div className="-mx-5">
          <HorizontalScroller variant={scrollerVariant}>{children}</HorizontalScroller>
        </div>
      </section>
    </>
  )
}

// ── SectionSlider — slider de cards "type + titre" pour Espace/Territoire ─────

function SectionSlider({
  title,
  badge,
  badgeColorVar,
  onCardClick,
}: {
  title: string
  badge: string
  badgeColorVar: string
  onCardClick?: () => void
}) {
  return (
    <SliderSection title={title} withDivider>
      {Array.from({ length: 3 }).map((_, idx) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          type="button"
          onClick={onCardClick}
          className="w-[150px] flex-none snap-start text-left"
        >
          <Card className="overflow-hidden border-[rgb(var(--occ-border))]">
            <div className="relative">
              <PlaceholderImage className="h-20 w-full" />
              <span
                className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{ color: rgbFromVar(badgeColorVar) }}
              >
                {badge}
              </span>
            </div>
            <div className="p-2">
              <CardSkeletonLines />
            </div>
          </Card>
        </button>
      ))}
    </SliderSection>
  )
}

// ── AvatarSlider — slider de personnalités avec avatar rond ───────────────────

function AvatarSlider({ title }: { title: string }) {
  return (
    <SliderSection title={title} withDivider>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className="flex w-[72px] flex-none snap-start flex-col items-center gap-2"
        >
          <div className="h-12 w-12 rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))]" />
          <div className="h-2 w-full rounded bg-[rgb(var(--occ-med))]" />
          <div className="h-2 w-3/4 rounded bg-[rgb(var(--occ-light))]" />
        </div>
      ))}
    </SliderSection>
  )
}

// ── AgendaModule ──────────────────────────────────────────────────────────────

function AgendaModule({
  items,
  accentColorVar,
}: {
  items: Array<{ date: string; lieu: string; title: string }>
  accentColorVar: string
}) {
  return (
    <>
      <Divider />
      <section className="px-5 pt-6 pb-2">
        <SectionLabel>Agenda</SectionLabel>
        <div className="mt-3 space-y-0">
          {items.map((ev, i) => (
            <div
              key={ev.title}
              className={[
                'flex gap-3 py-3',
                i > 0 ? 'border-t border-[rgb(var(--occ-border))]' : '',
              ].join(' ')}
            >
              <div className="w-9 flex-none text-center">
                <div
                  className="text-[13px] font-extrabold leading-none"
                  style={{ color: rgbFromVar(accentColorVar) }}
                >
                  {ev.date.split(' ')[0]}
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-wider text-[rgb(var(--occ-gray))]">
                  {ev.date.split(' ')[1]}
                </div>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[rgb(var(--occ-dark))]">
                  {ev.title}
                </div>
                <div className="text-[11px] text-[rgb(var(--occ-gray))]">{ev.lieu}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2 text-center">
          <span
            className="text-[12px] font-semibold"
            style={{ color: rgbFromVar(accentColorVar) }}
          >
            Voir tout l'agenda →
          </span>
        </div>
      </section>
    </>
  )
}

// ── CollectionsCtaBlock ───────────────────────────────────────────────────────

function CollectionsCtaBlock({
  label,
  accentColorVar,
  onPress,
}: {
  label: string
  accentColorVar: string
  onPress?: () => void
}) {
  return (
    <>
      <Divider />
      <section className="px-5 pt-6">
        <button
          type="button"
          onClick={onPress}
          className="relative w-full overflow-hidden rounded-xl"
        >
          <PlaceholderImage className="h-16 w-full" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `${rgbFromVar(accentColorVar)}cc` }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.09em] text-white">
              {label}
            </div>
            <div className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-[rgb(var(--occ-dark))]">
              Explorer les collections
            </div>
          </div>
        </button>
      </section>
    </>
  )
}

// ── HeroCarousel ──────────────────────────────────────────────────────────────

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
  const slides = React.useMemo(() => [2, 0, 1, 2, 0] as const, [])
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const slideRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const rafRef = React.useRef<number | null>(null)
  const [active, setActive] = React.useState(0)
  const [styles, setStyles] = React.useState<Array<{ scale: number; opacity: number }>>(
    () => slides.map(() => ({ scale: 1, opacity: 1 })),
  )
  const isDownRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const startScrollLeftRef = React.useRef(0)
  const didDragRef = React.useRef(false)
  const ignoreScrollRef = React.useRef(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [snapEnabled, setSnapEnabled] = React.useState(true)
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
      if (dist < bestDist) { bestDist = dist; bestIdx = idx }
      const t = Math.min(1, dist / (rect.width * 0.85))
      const eased = Math.pow(t, 1.35)
      return { scale: 1 - 0.06 * eased, opacity: 1 - 0.22 * eased }
    })
    centerIndex.current = bestIdx
    setActive(slides[bestIdx] ?? 0)
    setStyles(next)
  }, [slides])

  const centerSlideAt = React.useCallback((visualIdx: number, smooth = false) => {
    const scroller = scrollerRef.current
    const slide = slideRefs.current[visualIdx]
    if (!scroller || !slide) return
    const left = slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2
    scroller.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) {
      requestAnimationFrame(() => { centerSlideAt(1, false); compute() })
    } else {
      compute()
    }
    function onResize() { compute() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [centerSlideAt, compute])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    function onScroll() {
      if (ignoreScrollRef.current) return
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => { rafRef.current = null; compute() })
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [compute])

  const scrollToIndex = React.useCallback((baseIdx: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const current = centerIndex.current
    const candidates = slides.map((v, i) => ({ v, i })).filter((x) => x.v === baseIdx).map((x) => x.i)
    const best = candidates.sort((a, b) => Math.abs(a - current) - Math.abs(b - current))[0]
    const slide = slideRefs.current[best]
    if (!scroller || !slide) return
    const left = slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2
    scroller.scrollTo({ left, behavior: 'smooth' })
  }, [slides])

  const normalizeLoop = React.useCallback(() => {
    const idx = centerIndex.current
    if (idx === 0) {
      ignoreScrollRef.current = true
      centerSlideAt(3, false)
      window.setTimeout(() => { ignoreScrollRef.current = false; compute() }, 0)
    } else if (idx === slides.length - 1) {
      ignoreScrollRef.current = true
      centerSlideAt(1, false)
      window.setTimeout(() => { ignoreScrollRef.current = false; compute() }, 0)
    }
  }, [centerSlideAt, compute, slides.length])

  const snapToNearest = React.useCallback(() => {
    centerSlideAt(centerIndex.current, true)
  }, [centerSlideAt])

  const afterDrag = React.useCallback(() => {
    snapToNearest()
    window.setTimeout(() => { setSnapEnabled(true); normalizeLoop() }, 260)
  }, [snapToNearest, normalizeLoop])

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[32px] font-extrabold tracking-tight text-[rgb(var(--occ-dark))]">
        {title}
      </h1>
      <div
        ref={scrollerRef}
        data-h-scroller="true"
        className={[
          'scrollbar-hidden -mx-5 mt-4 flex gap-4 overflow-x-auto px-5 pb-2 overscroll-x-contain md:cursor-grab',
          snapEnabled ? 'snap-x snap-mandatory' : 'snap-none',
          isDragging ? 'md:cursor-grabbing' : '',
        ].join(' ')}
        style={{ scrollPaddingLeft: 20, scrollPaddingRight: 20 }}
        onPointerDown={(e) => {
          const el = scrollerRef.current
          if (!el) return
          // Laisse le navigateur gérer nativement le toucher
          if (e.pointerType !== 'mouse') return
          if (e.button !== 0) return
          isDownRef.current = true
          didDragRef.current = false
          setSnapEnabled(false)
          setIsDragging(false)
          startXRef.current = e.clientX
          startScrollLeftRef.current = el.scrollLeft
        }}
        onPointerMove={(e) => {
          const el = scrollerRef.current
          if (!el || !isDownRef.current) return
          if (e.pointerType !== 'mouse') return
          const dx = e.clientX - startXRef.current
          if (Math.abs(dx) > 5) {
            didDragRef.current = true
            setIsDragging(true)
          }
          if (didDragRef.current) {
            el.scrollLeft = startScrollLeftRef.current - dx
          }
        }}
        onPointerUp={() => { isDownRef.current = false; setIsDragging(false); afterDrag() }}
        onPointerLeave={() => { if (!isDownRef.current) return; isDownRef.current = false; setIsDragging(false); afterDrag() }}
        onPointerCancel={() => { isDownRef.current = false; setIsDragging(false); afterDrag() }}
        onClickCapture={(e) => {
          if (didDragRef.current) {
            e.stopPropagation()
            e.preventDefault()
            didDragRef.current = false
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides.map((i, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}-${idx}`}
            ref={(el) => { slideRefs.current[idx] = el }}
            className="flex-none snap-center"
            style={{ width: 300 }}
          >
            <div
              className="relative origin-center overflow-hidden rounded-[22px] bg-[rgb(var(--occ-light))] shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
              style={{
                transform: `scale(${styles[idx]?.scale ?? 1})`,
                opacity: styles[idx]?.opacity ?? 1,
                transition: isDragging ? 'none' : 'transform 220ms ease, opacity 220ms ease',
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
              background: i === active ? 'rgb(var(--occ-dark))' : 'rgb(var(--occ-med))',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── HomeScreen ────────────────────────────────────────────────────────────────

function HomeScreen({ go }: { go: (screen: Screen) => void }) {
  const musique = espaces.find((e) => e.key === 'musique')!

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader onMenu={() => go('menu')} />

      <HeroCarousel
        title="À la Une"
        primaryLabel="Découvrir"
        onPrimaryAction={() => go('article')}
      />

      <Divider />

      {/* Espaces */}
      <SliderSection title="Les espaces à découvrir">
        {espaces.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => go(`espace-${e.key}`)}
            className="w-[168px] flex-none snap-start text-left"
          >
            <div className="relative h-[132px] overflow-hidden rounded-xl">
              <PlaceholderImage className="h-[132px] w-full" />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(transparent 35%, ${rgbFromVar(e.colorVar)})`,
                  opacity: 0.92,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="text-[14px] font-bold text-white">{e.label}</div>
                <div className="mt-1 text-[11px] leading-snug text-white/75">{e.accroche}</div>
              </div>
            </div>
          </button>
        ))}
      </SliderSection>

      {/* Territoires */}
      <div className="mt-6 border-y border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] pb-3">
        <SliderSection
          title="Territoires"
          scrollerVariant="compact"
          className="!pt-4"
        >
          {TERRITOIRE_PILLS.map((t) => (
            <div key={t.label} className="snap-start">
              <Chip
                label={t.label}
                onClick={t.key ? () => go(`territoire-${t.key!}`) : undefined}
              />
            </div>
          ))}
        </SliderSection>
      </div>

      <Divider />

      {/* Cultura viva */}
      <section className="px-5 pt-6">
        <SectionLabel>Cultura viva !</SectionLabel>
        <Card className="mt-3 overflow-hidden border-[rgb(var(--occ-border))]">
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

        <div className="mt-5 space-y-5">
          {[
            { tag: 'Fêtes', colorVar: '--occ-espace-fetes' },
            { tag: 'Musique', colorVar: '--occ-espace-musique' },
          ].map((a) => (
            <button
              key={a.tag}
              type="button"
              onClick={() => go('article')}
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
      </section>

      {/* Bloc Collections */}
      <section className="px-5 pt-6 pb-8">
        <button
          type="button"
          onClick={() => go('collections')}
          className="relative w-full overflow-hidden rounded-xl border border-[rgb(var(--occ-border))]"
        >
          <PlaceholderImage className="h-28 w-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-6 py-2 text-[13px] font-bold text-[rgb(var(--occ-dark))]">
              Explorer les collections
            </span>
          </div>
        </button>
      </section>

      {/* Footer */}
      <div className="border-t border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-5 py-8">
        <div className="text-[12px] font-extrabold tracking-[0.08em] text-[rgb(var(--occ-brand))]">
          OCCITANICA
        </div>
        <div className="mt-1 text-[12px] text-[rgb(var(--occ-gray))]">
          Institut occitan de cultura — CIRDOC
        </div>
        <div className="mt-4 grid gap-2 text-[12px] text-[rgb(var(--occ-gray))]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em]">Espaces</div>
          <div className="flex flex-wrap gap-2">
            {espaces.map((e) => (
              <button
                key={e.key}
                type="button"
                onClick={() => go(`espace-${e.key}`)}
                className="hover:underline"
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MenuScreen ────────────────────────────────────────────────────────────────

function MenuScreen({ go }: { go: (screen: Screen) => void }) {
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
                    onClick={() => go(`espace-${e.key}`)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[rgb(var(--occ-light))]"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: rgbFromVar(e.colorVar) }}
                    />
                    <span className="text-[14px] font-semibold">{e.label}</span>
                    <span className="ml-auto text-[14px] text-[rgb(var(--occ-med))]">›</span>
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
                  {TERRITOIRE_PILLS.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => t.key ? go(`territoire-${t.key}`) : undefined}
                      className={[
                        'flex w-full items-center justify-between py-2 text-left text-[14px]',
                        t.key ? 'hover:bg-[rgb(var(--occ-light))]' : 'opacity-50',
                      ].join(' ')}
                    >
                      <span>{t.label}</span>
                      {t.key ? (
                        <span className="text-[14px] text-[rgb(var(--occ-med))]">›</span>
                      ) : (
                        <span className="text-[10px] text-[rgb(var(--occ-gray))]">bientôt</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Collections */}
          <button
            type="button"
            onClick={() => go('collections')}
            className="flex w-full items-center justify-between rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-4 py-3"
          >
            <span className="text-[14px] font-semibold">Collections</span>
            <span className="text-[14px] text-[rgb(var(--occ-brand))]">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── EspaceScreen — générique pour les 5 espaces ───────────────────────────────

function EspaceScreen({
  espaceKey,
  go,
}: {
  espaceKey: EspaceKey
  go: (screen: Screen) => void
}) {
  const espaceInfo = espaces.find((e) => e.key === espaceKey)!
  const config = ESPACES_CONFIG[espaceKey]
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={() => go('home')} onMenu={() => go('menu')} />

      {/* Hero espace */}
      <div className="relative h-28">
        <PlaceholderImage className="h-28 w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(transparent 30%, ${rgbFromVar(espaceInfo.colorVar)})`,
            opacity: 0.95,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-3">
          <div className="text-[20px] font-extrabold text-white">{espaceInfo.label}</div>
          <div className="mt-1 text-[12px] text-white/80">{espaceInfo.accroche}</div>
        </div>
      </div>

      {/* Tabs sous-espaces */}
      <div className="border-b border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))]">
        <HorizontalScroller variant="compact">
          {config.tabs.map((t, idx) => {
            const active = idx === activeTab
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={[
                  'h-8 flex-none whitespace-nowrap rounded-full px-4 text-[12px] font-semibold transition-colors',
                  active
                    ? 'text-white'
                    : 'border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))] hover:bg-[rgb(var(--occ-light))]',
                ].join(' ')}
                style={active ? { background: rgbFromVar(espaceInfo.colorVar) } : undefined}
              >
                {t}
              </button>
            )
          })}
        </HorizontalScroller>
      </div>

      {/* À la une */}
      <section className="px-5 pt-6">
        <SectionLabel>À la une</SectionLabel>
        <Card className="mt-3 overflow-hidden border-[rgb(var(--occ-border))]">
          <div className="relative">
            <PlaceholderImage className="h-24 w-full" />
            <div className="absolute left-2 top-2">
              <Badge
                className="border-0"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: rgbFromVar(espaceInfo.colorVar),
                }}
              >
                {config.heroTag}
              </Badge>
            </div>
          </div>
          <div className="p-3">
            <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
            <div className="mt-2 h-2 w-8/12 rounded bg-[rgb(var(--occ-med))]" />
            <div className="mt-2 h-2 w-6/12 rounded bg-[rgb(var(--occ-light))]" />
          </div>
        </Card>
      </section>

      {/* Sections thématiques */}
      {config.sections.map((s) => (
        <SectionSlider
          key={s.title}
          title={s.title}
          badge={s.badge}
          badgeColorVar={s.badgeColorVar}
          onCardClick={() => go('article')}
        />
      ))}

      {/* Index A-Z — Portraits uniquement */}
      {config.hasAZ && (
        <>
          <Divider />
          <section className="px-5 pt-6">
            <SectionLabel>Index A-Z</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {'ABCDEFGIJLMNOPRSTV'.split('').map((l) => (
                <div
                  key={l}
                  className="grid h-8 w-8 place-items-center rounded bg-[rgb(var(--occ-light))] text-[12px] font-bold"
                >
                  {l}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Module Agenda */}
      {config.hasAgenda && (
        <AgendaModule items={config.agendaItems} accentColorVar={espaceInfo.colorVar} />
      )}

      {/* Accès Collections filtré */}
      <CollectionsCtaBlock
        label={`Archives ${espaceInfo.label}`}
        accentColorVar={espaceInfo.colorVar}
        onPress={() => go('collections')}
      />

      {/* Voir aussi */}
      <Divider />
      <section className="px-5 pt-6 pb-8">
        <SectionLabel>Voir aussi</SectionLabel>
        <div className="mt-3 flex gap-3">
          {config.voirAussi.map((key) => {
            const autre = espaces.find((e) => e.key === key)!
            return (
              <button
                key={key}
                type="button"
                onClick={() => go(`espace-${key}`)}
                className="flex flex-1 items-center gap-2 rounded-lg border border-[rgb(var(--occ-border))] px-3 py-2 transition-colors hover:bg-[rgb(var(--occ-light))]"
              >
                <span
                  className="h-2 w-2 flex-none rounded-full"
                  style={{ background: rgbFromVar(autre.colorVar) }}
                />
                <span className="text-[12px] font-semibold">{autre.label}</span>
                <span className="ml-auto text-[rgb(var(--occ-med))]">›</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

// ── TerritoireScreen ──────────────────────────────────────────────────────────

function TerritoireScreen({
  terKey,
  go,
}: {
  terKey: TerritoireKey
  go: (screen: Screen) => void
}) {
  const config = TERRITOIRES_CONFIG[terKey]

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={() => go('home')} onMenu={() => go('menu')} />

      {/* En-tête territoire — fond vert Occitanica */}
      <div
        className="px-5 py-5"
        style={{ background: rgbFromVar('--occ-brand') }}
      >
        <div className="text-[20px] font-extrabold text-white">{config.label}</div>
        <div className="mt-1 text-[12px] text-white/75">{config.region}</div>
      </div>

      {/* Mini carte OSM */}
      <div className="mx-5 mt-4 flex h-16 items-center justify-center rounded-lg border border-[rgb(var(--occ-border))] bg-[#dce8e8]">
        <span className="text-[11px] italic text-[rgb(var(--occ-gray))]">
          Carte — {config.label}
        </span>
      </div>

      {/* Sections thématiques */}
      {config.sections.map((s) =>
        s.avatars ? (
          <AvatarSlider key={s.title} title={s.title} />
        ) : (
          <SectionSlider
            key={s.title}
            title={s.title}
            badge={s.badge}
            badgeColorVar={s.badgeColorVar}
            onCardClick={() => go('article')}
          />
        ),
      )}

      {/* Module Agenda */}
      {config.hasAgenda && (
        <AgendaModule items={config.agendaItems} accentColorVar="--occ-brand" />
      )}

      {/* Accès Collections Gallica */}
      <Divider />
      <section className="px-5 pt-6 pb-8">
        <button
          type="button"
          onClick={() => go('collections')}
          className="relative w-full overflow-hidden rounded-xl"
        >
          <PlaceholderImage className="h-16 w-full" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: `${rgbFromVar('--occ-brand')}cc` }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.09em] text-white">
              {config.docsCount} documents · Gallica
            </div>
            <div className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-[rgb(var(--occ-dark))]">
              Consulter les archives ↗
            </div>
          </div>
        </button>
      </section>
    </div>
  )
}

// ── CollectionsScreen ─────────────────────────────────────────────────────────

function CollectionsScreen({ go }: { go: (screen: Screen) => void }) {
  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={() => go('home')} onMenu={() => go('menu')} />

      {/* Titre */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="text-[26px] font-extrabold tracking-tight">Collections</h1>
        <p className="mt-1 text-[12px] text-[rgb(var(--occ-gray))]">
          Documents numérisés · Archives · Fonds patrimoniaux
        </p>
      </div>

      {/* Barre de recherche → Gallica */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3 rounded-lg border-2 border-[rgb(var(--occ-brand))] px-4 py-3">
          <Search className="h-4 w-4 flex-none text-[rgb(var(--occ-brand))]" />
          <span className="flex-1 text-[12px] text-[rgb(var(--occ-gray))]">
            Rechercher dans les collections…
          </span>
          <div
            className="rounded px-3 py-1 text-[11px] font-bold text-white"
            style={{ background: rgbFromVar('--occ-brand') }}
          >
            Gallica ↗
          </div>
        </div>
      </div>

      {/* Par thématique */}
      <SliderSection title="Par thématique" withDivider>
        {COLLECTIONS_DATA.thematiques.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() =>
              go(`espace-${espaces.find((e) => e.label === c.label)?.key ?? 'musique'}`)
            }
            className="w-[100px] flex-none snap-start text-left"
          >
            <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
              <div className="relative h-16">
                <PlaceholderImage className="h-16 w-full" />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(transparent 25%, ${rgbFromVar(c.colorVar)}e8)` }}
                />
                <div className="absolute inset-x-0 bottom-0 px-2 pb-2">
                  <div className="text-[10px] font-bold text-white">{c.label}</div>
                </div>
              </div>
              <div className="px-2 py-1.5">
                <span className="text-[9px] text-[rgb(var(--occ-gray))]">{c.count}</span>
              </div>
            </div>
          </button>
        ))}
      </SliderSection>

      {/* Par territoire */}
      <SliderSection title="Par territoire" withDivider>
        {COLLECTIONS_DATA.territoires.map((t) => (
          <div key={t.label} className="w-[100px] flex-none snap-start">
            <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
              <div className="relative h-16 bg-[#dce8e8]">
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(transparent 25%, ${rgbFromVar('--occ-brand')}e8)` }}
                />
                <div className="absolute inset-x-0 bottom-0 px-2 pb-2">
                  <div className="text-[10px] font-bold text-white">{t.label}</div>
                </div>
              </div>
              <div className="px-2 py-1.5">
                <span className="text-[9px] text-[rgb(var(--occ-gray))]">{t.count}</span>
              </div>
            </div>
          </div>
        ))}
      </SliderSection>

      {/* Par type de document */}
      <SliderSection title="Par type de document" withDivider>
        {COLLECTIONS_DATA.types.map((tp) => (
          <div key={tp.label} className="w-[100px] flex-none snap-start">
            <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
              <div
                className="flex h-16 items-center justify-center"
                style={{ background: tp.shade }}
              >
                <span className="text-2xl">{tp.icon}</span>
              </div>
              <div className="px-2 py-1.5">
                <div className="text-[10px] font-semibold leading-tight">{tp.label}</div>
                <div className="mt-0.5 text-[9px] text-[rgb(var(--occ-gray))]">{tp.count}</div>
              </div>
            </div>
          </div>
        ))}
      </SliderSection>

      {/* Par période */}
      <SliderSection title="Par période" withDivider className="pb-8">
        {COLLECTIONS_DATA.periodes.map((p) => (
          <div key={p.label} className="w-[100px] flex-none snap-start">
            <div className="overflow-hidden rounded-lg border border-[rgb(var(--occ-border))]">
              <div
                className="flex h-16 flex-col items-center justify-center gap-1 px-2"
                style={{ background: p.shade }}
              >
                <span className="text-center text-[10px] font-extrabold leading-tight text-white">
                  {p.label}
                </span>
                <span className="text-[8px] tracking-wide text-white/60">{p.span}</span>
              </div>
              <div className="px-2 py-1.5">
                <span className="text-[9px] text-[rgb(var(--occ-gray))]">{p.count}</span>
              </div>
            </div>
          </div>
        ))}
      </SliderSection>
    </div>
  )
}

// ── ArticleScreen ─────────────────────────────────────────────────────────────

function ArticleScreen({
  go,
  goBack,
}: {
  go: (screen: Screen) => void
  goBack: () => void
}) {
  const musique = espaces.find((e) => e.key === 'musique')!
  const tags = ['Musique', 'Archives sonores', 'Patrimoine vivant', 'Gascogne']
  const suggestions = [
    { title: 'Archives sonores — collectage en Occitanie', tag: 'Archive' },
    { title: 'Portrait : une figure de la musique occitane', tag: 'Portrait' },
    { title: 'Instruments & danses — fiche PCI', tag: 'PCI' },
  ]

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={goBack} onMenu={() => go('menu')} />

      {/* Header visuel */}
      <div className="relative">
        <PlaceholderImage className="h-44 w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge
              className="border-0"
              style={{ background: 'rgba(255,255,255,0.92)', color: rgbFromVar(musique.colorVar) }}
            >
              Article · Musique
            </Badge>
            <Badge className="border-0 bg-black/30 text-white">Lecture · 6 min</Badge>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-11/12 rounded bg-white/90" />
            <div className="h-3 w-8/12 rounded bg-white/80" />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <section className="px-5 pt-5">
        <div className="mb-3 flex items-center gap-2 text-[12px] text-[rgb(var(--occ-gray))]">
          <span>Publié le 14 juin 2026</span>
          <span className="text-[rgb(var(--occ-med))]">·</span>
          <span>Occitanica</span>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="space-y-2">
              <div className="h-2 w-11/12 rounded bg-[rgb(var(--occ-med))]" />
              <div className="h-2 w-10/12 rounded bg-[rgb(var(--occ-light))]" />
              <div className="h-2 w-9/12 rounded bg-[rgb(var(--occ-light))]" />
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="px-5 pt-6">
        <SectionLabel>Tags</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </div>
      </section>

      <Divider />

      <section className="px-5 pt-6 pb-8">
        <SectionLabel>Suggestions</SectionLabel>
        <div className="mt-3 space-y-3">
          {suggestions.map((s) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go('article')}
              className="flex w-full gap-3 rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] p-3 text-left transition-colors hover:bg-[rgb(var(--occ-light))]"
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
              <span className="text-[14px] text-[rgb(var(--occ-med))]">›</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Prototype ─────────────────────────────────────────────────────────────────

export function Prototype() {
  const [screen, setScreen] = React.useState<Screen>('home')
  const [prevScreen, setPrevScreen] = React.useState<Screen>('home')

  function go(next: Screen) {
    setPrevScreen(screen)
    setScreen(next)
  }

  function goBack() {
    setScreen(prevScreen)
    setPrevScreen('home')
  }

  let content: React.ReactNode

  if (screen === 'menu') {
    content = <MenuScreen go={go} />
  } else if (screen === 'collections') {
    content = <CollectionsScreen go={go} />
  } else if (screen === 'article') {
    content = <ArticleScreen go={go} goBack={goBack} />
  } else if (screen.startsWith('espace-')) {
    const key = screen.slice('espace-'.length) as EspaceKey
    content = <EspaceScreen espaceKey={key} go={go} />
  } else if (screen.startsWith('territoire-')) {
    const key = screen.slice('territoire-'.length) as TerritoireKey
    content = <TerritoireScreen terKey={key} go={go} />
  } else {
    content = <HomeScreen go={go} />
  }

  return (
    <main className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))]">
      {content}
    </main>
  )
}
