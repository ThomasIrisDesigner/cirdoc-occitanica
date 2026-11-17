import * as React from 'react'
import { ArrowLeft, ChevronDown, MapPin, Search, X } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { EditorialArticle } from '@/components/features/EditorialArticle'
import { EspaceCultureView } from '@/components/features/EspaceCultureView'
import { HomeView } from '@/components/features/HomeView'
import { GascogneMap } from '@/components/features/GascogneMap'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TERRITOIRE_SOUS_TITRES } from '@/data/territoires'
import { getEditorialArticle, articlePath, filtrePath, gabaritPath, EDITORIAL_SPECIMEN, type EditorialArticleContent } from '@/data/editorialArticle'
import {
  articleFromPath,
  pathForScreen,
  screenFromPath,
  type EspaceKey,
  type Screen,
  type TerritoireKey,
} from '@/lib/prototypeRoutes'

// ── Static data ───────────────────────────────────────────────────────────────

const espaces: Array<{
  key: EspaceKey
  label: string
  accroche: string
  colorVar: string
}> = [
  { key: 'fetes',     label: 'Culture vivante',   accroche: 'Des pratiques qui rassemblent',    colorVar: '--occ-espace-fetes' },
  { key: 'langue',    label: 'Littérature',       accroche: 'Textes et regards critiques',      colorVar: '--occ-espace-langue' },
  { key: 'portraits', label: "Figures d'oc",      accroche: 'Parcours, portraits, engagements', colorVar: '--occ-espace-portraits' },
  { key: 'musique',   label: 'Musiques',          accroche: 'Du son sous toutes ses formes',    colorVar: '--occ-espace-musique' },
  { key: 'scene',     label: 'La Scène occitane', accroche: 'Artistes, scènes, créations',      colorVar: '--occ-espace-scene' },
]

// Menu de la home : 6 espaces. Les deux derniers n'ont pas encore de page.
const MENU_ESPACES: Array<{
  label: string
  colorVar: string
  key?: EspaceKey
}> = [
  { key: 'fetes',     label: 'Culture vivante', colorVar: '--occ-espace-fetes' },
  { key: 'langue',    label: 'Littérature',     colorVar: '--occ-espace-langue' },
  { key: 'portraits', label: "Figures d'oc",    colorVar: '--occ-espace-portraits' },
  { key: 'musique',   label: 'Musiques',        colorVar: '--occ-espace-musique' },
  { label: 'Histoires de…', colorVar: '--occ-gray' },
  { label: 'Plein cadre',   colorVar: '--occ-gray' },
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
    voirAussi: ['fetes', 'musique'],
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
  docsCount: string
  sections: Array<{ title: string; badge: string; badgeColorVar: string; avatars?: boolean }>
  hasAgenda: boolean
  agendaItems: Array<{ date: string; lieu: string; title: string }>
}

const TERRITOIRES_CONFIG: Record<TerritoireKey, TerritoireConfig> = {
  gascogne: {
    label: 'Gascogne',
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

// Tags fictifs — à remplacer par les vraies localisations des contenus à l'intégration.
const TERRITOIRE_LOCALISATIONS: Record<TerritoireKey | 'limousin' | 'perigord', string[]> = {
  gascogne: ['Tout', 'Auch', 'Bordeaux', 'Pau', 'Bayonne', 'Gers'],
  languedoc: ['Tout', 'Toulouse', 'Montpellier', 'Nîmes', 'Carcassonne'],
  provence: ['Tout', 'Marseille', 'Aix-en-Provence', 'Arles', 'Nice'],
  pyrenees: ['Tout', 'Foix', 'Tarbes', 'Perpignan'],
  limousin: ['Tout', 'Limoges', 'Brive', 'Tulle'],
  perigord: ['Tout', 'Périgueux', 'Sarlat', 'Bergerac'],
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
  thematiques: [
    { key: 'langue' as EspaceKey,    label: 'Langue',            colorVar: '--occ-espace-langue',    count: '3 241 docs' },
    { key: 'musique' as EspaceKey,   label: 'Musique',           colorVar: '--occ-espace-musique',   count: '1 876 docs' },
    { key: 'fetes' as EspaceKey,     label: 'Fêtes & Traditions', colorVar: '--occ-espace-fetes',    count: '987 docs' },
    { key: 'portraits' as EspaceKey, label: 'Portraits',         colorVar: '--occ-espace-portraits', count: '2 134 docs' },
    { key: 'scene' as EspaceKey,     label: 'La Scène occitane', colorVar: '--occ-espace-scene',     count: '612 docs' },
  ],
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

// ── LanguageSwitcher ──────────────────────────────────────────────────────────

type LangCode = 'fr' | 'oc'

const LANG_STORAGE_KEY = 'occ-lang'
const LANG_OPTIONS: Array<{ code: LangCode; label: string }> = [
  { code: 'fr', label: 'FR - Français' },
  { code: 'oc', label: 'OC - Occitan' },
]

function readLang(): LangCode {
  try {
    return sessionStorage.getItem(LANG_STORAGE_KEY) === 'oc' ? 'oc' : 'fr'
  } catch {
    return 'fr'
  }
}

function LanguageSwitcher() {
  const [lang, setLang] = React.useState<LangCode>(readLang)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function choose(next: LangCode) {
    setLang(next)
    setOpen(false)
    try {
      sessionStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choisir la langue"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[rgb(var(--occ-dark))]"
      >
        {lang === 'fr' ? 'FR' : 'OC'}
        <ChevronDown
          className={['h-3.5 w-3.5 transition-transform', open ? 'rotate-180' : ''].join(' ')}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Langue"
          className="absolute right-0 top-full z-40 mt-2 w-36 overflow-hidden rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] py-1"
        >
          {LANG_OPTIONS.map((option) => {
            const selected = option.code === lang
            return (
              <li key={option.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => choose(option.code)}
                  className={[
                    'flex w-full items-center px-3 py-2 text-left text-[12px]',
                    selected
                      ? 'font-semibold text-[rgb(var(--occ-brand))]'
                      : 'text-[rgb(var(--occ-dark))] hover:bg-[rgb(var(--occ-light))]',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
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
        <LanguageSwitcher />
      </div>
    </div>
  )
}

// ── HorizontalScroller ────────────────────────────────────────────────────────

/** Position de la vignette dans le repère du scroll, indépendante du scale du mockup. */
function itemScrollLeft(scroller: HTMLElement, item: HTMLElement) {
  const visualWidth = scroller.getBoundingClientRect().width
  const scale = scroller.offsetWidth && visualWidth ? visualWidth / scroller.offsetWidth : 1
  const delta = item.getBoundingClientRect().left - scroller.getBoundingClientRect().left
  return scroller.scrollLeft + delta / scale
}

/** Nombre de vignettes qui tiennent entièrement dans la largeur visible. */
function visiblePageSize(scroller: HTMLElement, items: HTMLElement[], startIndex: number) {
  const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 0
  const padLeft = Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0
  const viewRight = scroller.clientWidth
  let used = padLeft
  let count = 0
  for (let i = startIndex; i < items.length; i++) {
    const right = used + items[i].offsetWidth
    if (right > viewRight + 1) break
    used = right + gap
    count += 1
  }
  return Math.max(1, count)
}

function firstFullyVisibleIndex(scroller: HTMLElement, items: HTMLElement[]) {
  const viewLeft = scroller.scrollLeft
  const viewRight = viewLeft + scroller.clientWidth
  for (let i = 0; i < items.length; i++) {
    const start = itemScrollLeft(scroller, items[i])
    const end = start + items[i].offsetWidth
    if (start >= viewLeft - 2 && end <= viewRight + 2) return i
  }
  return 0
}

function scrollSliderPage(scroller: HTMLElement, direction: -1 | 1) {
  const items = Array.from(scroller.children).filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  )
  if (items.length === 0) return
  const page = visiblePageSize(scroller, items, 0)
  const pageCount = Math.max(1, Math.ceil(items.length / page))
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
  if (pageCount <= 1 || max <= 1) return
  const atEnd = scroller.scrollLeft >= max - 1
  const current = firstFullyVisibleIndex(scroller, items)
  const pageIndex = atEnd ? pageCount - 1 : Math.floor(current / page)
  let nextPage = pageIndex + direction
  if (nextPage < 0) nextPage = pageCount - 1
  if (nextPage >= pageCount) nextPage = 0
  const nextIndex = Math.min(nextPage * page, items.length - 1)
  const padLeft = Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0
  const align = itemScrollLeft(scroller, items[nextIndex]) - padLeft
  const left = nextPage === 0 ? 0 : nextPage === pageCount - 1 ? max : Math.min(Math.max(0, align), max)
  scroller.scrollTo({ left, behavior: 'smooth' })
}

function HorizontalScroller({
  children,
  variant = 'default',
  scrollerRef,
}: {
  children: React.ReactNode
  variant?: 'default' | 'compact'
  scrollerRef?: React.RefObject<HTMLDivElement | null>
}) {
  const localRef = React.useRef<HTMLDivElement | null>(null)
  const ref = scrollerRef ?? localRef
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

function SliderArrows({ scrollerRef }: { scrollerRef: React.RefObject<HTMLDivElement | null> }) {
  const arrowClass =
    'grid h-6 w-6 place-items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[11px] text-[rgb(var(--occ-dark))]'

  return (
    <div className="flex flex-none gap-1">
      <button
        type="button"
        aria-label="Vignettes précédentes"
        onClick={() => {
          const el = scrollerRef.current
          if (el) scrollSliderPage(el, -1)
        }}
        className={arrowClass}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Vignettes suivantes"
        onClick={() => {
          const el = scrollerRef.current
          if (el) scrollSliderPage(el, 1)
        }}
        className={arrowClass}
      >
        →
      </button>
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
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <>
      {withDivider && <Divider />}
      <section className={['px-5 pt-6', className].filter(Boolean).join(' ')}>
        <header className="mb-3 flex items-center justify-between gap-3">
          <SectionLabel>{title}</SectionLabel>
          {withArrows && <SliderArrows scrollerRef={scrollerRef} />}
        </header>
        <div className="-mx-5">
          <HorizontalScroller scrollerRef={scrollerRef} variant={scrollerVariant}>
            {children}
          </HorizontalScroller>
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
  withDivider = true,
}: {
  title: string
  badge: string
  badgeColorVar: string
  onCardClick?: () => void
  withDivider?: boolean
}) {
  return (
    <SliderSection title={title} withDivider={withDivider}>
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

function AvatarSlider({
  title,
  withDivider = true,
  onCardClick,
}: {
  title: string
  withDivider?: boolean
  onCardClick?: () => void
}) {
  return (
    <SliderSection title={title} withDivider={withDivider}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          type="button"
          onClick={onCardClick}
          className="flex w-[72px] flex-none snap-start flex-col items-center gap-2"
        >
          <div className="h-12 w-12 rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))]" />
          <div className="h-2 w-full rounded bg-[rgb(var(--occ-med))]" />
          <div className="h-2 w-3/4 rounded bg-[rgb(var(--occ-light))]" />
        </button>
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

function espaceFromSection(title: string): EspaceKey | undefined {
  if (title === 'La Scène') return 'scene'
  if (title === 'Personnalités') return 'portraits'
  return espaces.find((item) => item.label === title)?.key
}

function HomeScreen({
  go,
  onOpenGabarit,
}: {
  go: (screen: Screen) => void
  onOpenGabarit: (espace: EspaceKey) => void
}) {
  return <HomeView go={go} onOpenGabarit={onOpenGabarit} />
}

// ── MenuScreen ────────────────────────────────────────────────────────────────

function MenuScreen({
  go,
  onOpenGabarit,
}: {
  go: (screen: Screen) => void
  onOpenGabarit: () => void
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
                {MENU_ESPACES.map((e) => (
                  <button
                    key={e.label}
                    type="button"
                    onClick={() => {
                      const key = e.key
                      if (key) go(`espace-${key}`)
                    }}
                    className={[
                      'flex w-full items-center gap-3 px-4 py-3 text-left',
                      e.key ? 'hover:bg-[rgb(var(--occ-light))]' : '',
                    ].join(' ')}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: rgbFromVar(e.colorVar) }}
                    />
                    <span className="text-[14px] font-semibold">{e.label}</span>
                    {e.key ? (
                      <span className="ml-auto text-[14px] text-[rgb(var(--occ-med))]">›</span>
                    ) : null}
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

          <button
            type="button"
            onClick={onOpenGabarit}
            className="flex w-full items-center justify-between rounded-lg border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-light))] px-4 py-3"
          >
            <span className="text-[14px] font-semibold">Gabarit article</span>
            <span className="text-[14px] text-[rgb(var(--occ-brand))]">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterTags({
  tags,
  activeColorVar,
  activeLabel,
  onActiveChange,
}: {
  tags: string[]
  activeColorVar: string
  activeLabel?: string | null
  onActiveChange?: (label: string) => void
}) {
  const indexFromLabel = (label?: string | null) => {
    if (!label) return 0
    const index = tags.findIndex((tag) => tag === label)
    return index >= 0 ? index : 0
  }
  const [activeTab, setActiveTab] = React.useState(() => indexFromLabel(activeLabel))

  React.useEffect(() => {
    setActiveTab(indexFromLabel(activeLabel))
  }, [activeLabel, tags])

  return (
    <div className="border-b border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))]">
      <HorizontalScroller variant="compact">
        {tags.map((t, idx) => {
          const active = idx === activeTab
          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                setActiveTab(idx)
                onActiveChange?.(t)
              }}
              className={[
                'h-8 flex-none whitespace-nowrap rounded-full px-4 text-[12px] font-semibold transition-colors',
                active
                  ? 'text-white'
                  : 'border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))] hover:bg-[rgb(var(--occ-light))]',
              ].join(' ')}
              style={active ? { background: rgbFromVar(activeColorVar) } : undefined}
            >
              {t}
            </button>
          )
        })}
      </HorizontalScroller>
    </div>
  )
}

// ── EspaceScreen — générique pour les 5 espaces ───────────────────────────────

function EspaceScreen({
  espaceKey,
  go,
  filtre,
  onOpenGabarit,
}: {
  espaceKey: EspaceKey
  go: (screen: Screen) => void
  filtre?: string | null
  onOpenGabarit: (espace: EspaceKey, sousEspace?: string) => void
}) {
  const espaceInfo = espaces.find((e) => e.key === espaceKey)!
  const config = ESPACES_CONFIG[espaceKey]
  const [activeFiltre, setActiveFiltre] = React.useState(() =>
    filtre && config.tabs.includes(filtre) ? filtre : config.tabs[0],
  )

  if (espaceKey === 'fetes') {
    return <EspaceCultureView go={go} onOpenGabarit={onOpenGabarit} />
  }

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

      <FilterTags
        tags={config.tabs}
        activeColorVar={espaceInfo.colorVar}
        activeLabel={filtre}
        onActiveChange={setActiveFiltre}
      />

      {/* À la une */}
      <section className="px-5 pt-6">
        <SectionLabel>À la une</SectionLabel>
        <button
          type="button"
          onClick={() => onOpenGabarit(espaceKey, activeFiltre)}
          className="mt-3 block w-full text-left"
        >
        <Card className="overflow-hidden border-[rgb(var(--occ-border))]">
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
        </button>
      </section>

      {/* Sections thématiques */}
      {config.sections.map((s) => (
        <SectionSlider
          key={s.title}
          title={s.title}
          badge={s.badge}
          badgeColorVar={s.badgeColorVar}
          onCardClick={() => onOpenGabarit(espaceKey, activeFiltre)}
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
  filtre,
  onOpenGabarit,
}: {
  terKey: TerritoireKey
  go: (screen: Screen) => void
  filtre?: string | null
  onOpenGabarit: (espace: EspaceKey) => void
}) {
  const config = TERRITOIRES_CONFIG[terKey]
  const [mapOpen, setMapOpen] = React.useState(false)

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      <MobileHeader backLabel="Retour" onBack={() => go('home')} onMenu={() => go('menu')} />

      {/* En-tête territoire — fond vert Occitanica */}
      <div
        className="px-5 py-5"
        style={{ background: rgbFromVar('--occ-brand') }}
      >
        <div className="text-[20px] font-extrabold text-white">{config.label}</div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="min-w-0 text-[12px] text-white/75">{TERRITOIRE_SOUS_TITRES[terKey]}</div>
          <button
            type="button"
            aria-expanded={mapOpen}
            aria-controls="territoire-carte"
            onClick={() => setMapOpen((open) => !open)}
            className="inline-flex shrink-0 items-center gap-1 text-[12px] text-white/90"
          >
            {mapOpen ? (
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            {mapOpen ? 'Fermer' : 'Carte'}
          </button>
        </div>

        <div
          id="territoire-carte"
          className={[
            'grid transition-[grid-template-rows] duration-300 ease-out',
            mapOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          ].join(' ')}
        >
          <div
            className={[
              'overflow-hidden transition-opacity duration-300',
              mapOpen ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            {terKey === 'gascogne' ? (
              <GascogneMap />
            ) : (
              <div className="mt-3 flex h-16 items-center justify-center rounded-lg border border-[rgb(var(--occ-border))] bg-[#dce8e8]">
                <span className="text-[11px] italic text-[rgb(var(--occ-gray))]">
                  Carte — {config.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterTags
        tags={TERRITOIRE_LOCALISATIONS[terKey]}
        activeColorVar="--occ-brand"
        activeLabel={filtre}
      />

      {/* Sections thématiques */}
      {config.sections.map((s, index) => {
        const sectionEspace = espaceFromSection(s.title)
        return s.avatars ? (
          <AvatarSlider
            key={s.title}
            title={s.title}
            withDivider={index > 0}
            onCardClick={sectionEspace ? () => onOpenGabarit(sectionEspace) : undefined}
          />
        ) : (
          <SectionSlider
            key={s.title}
            title={s.title}
            badge={s.badge}
            badgeColorVar={s.badgeColorVar}
            onCardClick={sectionEspace ? () => onOpenGabarit(sectionEspace) : undefined}
            withDivider={index > 0}
          />
        )
      })}

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
            onClick={() => go(`espace-${c.key}`)}
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
  article,
  filtre,
  territoire,
  go,
  goBack,
  onPath,
}: {
  article: EditorialArticleContent
  filtre?: string | null
  territoire?: string | null
  go: (screen: Screen) => void
  goBack: () => void
  onPath: (path: string) => void
}) {
  const espace = espaces.find((item) => item.key === article.espace)
  const fromGabarit = article.slug === EDITORIAL_SPECIMEN.slug
  const tabs = espace ? ESPACES_CONFIG[espace.key].tabs : []
  const sousEspace = fromGabarit
    ? filtre && tabs.includes(filtre)
      ? filtre
      : undefined
    : article.sousEspace
  const territoireKey =
    fromGabarit && territoire && territoire in TERRITOIRES_CONFIG
      ? (territoire as TerritoireKey)
      : undefined
  const crumbs = !espace
    ? []
    : territoireKey
      ? [
          {
            label: TERRITOIRES_CONFIG[territoireKey].label,
            to: `/territoires/${territoireKey}`,
          },
          { label: espace.label, to: `/espaces/${espace.key}` },
          ...(sousEspace
            ? [{ label: sousEspace, to: filtrePath(`/espaces/${espace.key}`, sousEspace) }]
            : []),
        ]
      : [
          { label: espace.label, to: `/espaces/${espace.key}` },
          ...(sousEspace
            ? [{ label: sousEspace, to: filtrePath(`/espaces/${espace.key}`, sousEspace) }]
            : []),
        ]

  return (
    <EditorialArticle
      article={article}
      crumbs={crumbs}
      header={<MobileHeader backLabel="Retour" onBack={goBack} onMenu={() => go('menu')} />}
      onNavigate={go}
      onPath={onPath}
    />
  )
}

// ── Prototype ─────────────────────────────────────────────────────────────────

export function Prototype() {
  const navigate = useNavigate()
  const { pathname, search, key } = useLocation()
  const params = new URLSearchParams(search)
  const filtre = params.get('filtre')
  const territoire = params.get('territoire')
  const articleRef = articleFromPath(pathname)
  const article = articleRef
    ? getEditorialArticle(articleRef.espace, articleRef.slug)
    : undefined
  const screen = screenFromPath(pathname)

  function go(next: Screen) {
    navigate(pathForScreen(next))
  }

  function openGabarit(espace: EspaceKey, sousEspace?: string, fromTerritoire?: TerritoireKey) {
    navigate(gabaritPath(espace, sousEspace, fromTerritoire))
  }

  function goBack() {
    if (key !== 'default') navigate(-1)
    else navigate('/')
  }

  if (articleRef && !article) {
    return <Navigate to="/" replace />
  }

  if (!article && !screen) {
    return <Navigate to="/" replace />
  }

  let content: React.ReactNode

  if (article) {
    content = (
      <ArticleScreen
        key={pathname}
        article={article}
        filtre={filtre}
        territoire={territoire}
        go={go}
        goBack={goBack}
        onPath={(path) => navigate(path)}
      />
    )
  } else if (screen === 'menu') {
    content = (
      <MenuScreen go={go} onOpenGabarit={() => navigate(articlePath(EDITORIAL_SPECIMEN))} />
    )
  } else if (screen === 'collections') {
    content = <CollectionsScreen go={go} />
  } else if (screen && screen.startsWith('espace-')) {
    const espaceKey = screen.slice('espace-'.length) as EspaceKey
    content = (
      <EspaceScreen
        key={`${screen}${search}`}
        espaceKey={espaceKey}
        go={go}
        filtre={filtre}
        onOpenGabarit={openGabarit}
      />
    )
  } else if (screen && screen.startsWith('territoire-')) {
    const terKey = screen.slice('territoire-'.length) as TerritoireKey
    content = (
      <TerritoireScreen
        key={`${screen}${search}`}
        terKey={terKey}
        go={go}
        filtre={filtre}
        onOpenGabarit={(espace) => openGabarit(espace, undefined, terKey)}
      />
    )
  } else {
    content = <HomeScreen go={go} onOpenGabarit={openGabarit} />
  }

  return (
    <main className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))]">
      {content}
    </main>
  )
}
