import { useEffect, useRef, useState } from 'react'

import introCadre from '@/assets/home/intro-cadre.jpg'
import introCulture from '@/assets/home/intro-culture.png'
import introFigures from '@/assets/home/intro-figures.jpg'
import introHistoires from '@/assets/home/intro-histoires.jpg'
import introLitterature from '@/assets/home/intro-litterature.jpg'
import introMusiques from '@/assets/home/intro-musiques.jpg'
import feteVisual from '@/assets/home/une-b.png'
import { CollectionsShowcase } from '@/components/features/CollectionsShowcase'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import type { EspaceKey, Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const LEAD_TITLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
const LEAD_CHAPO = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.'
const CARD_TITLES = [
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet adipiscing',
] as const

type Rail = {
  title: string
  cards: Array<{ title: string; tag: string }>
}

type EspacePage = {
  title: string
  themes: string[]
  leadTag: string
  intro: string
  /** Opacité du visuel d’en-tête, comme sur la maquette. */
  introOpacity: string
  /** Absent : le visuel couvre tout l’en-tête. */
  introCrop?: { width: string; height: string; left: string; top: string }
  cardImage: string
  collections: string
  rails: Rail[]
}

function taggedRail(title: string, tag: string): Rail {
  return {
    title,
    cards: CARD_TITLES.map((cardTitle) => ({ title: cardTitle, tag })),
  }
}

function plainRail(title: string): Rail {
  return taggedRail(title, '')
}

const PAGES: Partial<Record<EspaceKey, EspacePage>> = {
  fetes: {
    title: 'Culture vivante',
    themes: ['Fêtes', 'Carnaval', 'Sports & jeux', 'Gastronomie', 'Savoir-faire', 'Danses', 'Chants'],
    leadTag: 'Fêtes',
    intro: introCulture,
    introOpacity: '0.08',
    cardImage: feteVisual,
    collections: 'Fêtes et traditions à retrouver dans les collections.',
    rails: [
      {
        title: 'Fêtes et célébrations',
        cards: [
          { title: 'Célébrer au fil des saisons', tag: 'Fêtes' },
          { title: 'Rituels et mémoire collective', tag: 'Fêtes' },
          { title: 'Des fêtes qui rassemblent', tag: 'Fêtes' },
        ],
      },
      {
        title: 'Savoir-faire & artisanat',
        cards: [
          { title: 'Les gestes qui se transmettent', tag: 'Savoir-faire' },
          { title: 'Au cœur des ateliers', tag: 'Savoir-faire' },
          { title: 'Matières et savoir-faire', tag: 'Savoir-faire' },
        ],
      },
      {
        title: 'Sur votre territoire',
        cards: [
          { title: 'Des traditions près de chez vous', tag: '' },
          { title: 'Rencontres en territoire occitan', tag: '' },
          { title: 'Une culture vivante à découvrir', tag: '' },
        ],
      },
    ],
  },
  langue: {
    title: 'Littérature',
    themes: [
      'Poésie',
      'Théâtre',
      'Linguistique',
      'Troubadours',
      'Renaissance d’oc',
      'Prix & Concours',
      'Œuvres littéraires',
      'Corpus',
      'Contes & fables',
    ],
    leadTag: 'Poésie',
    intro: introLitterature,
    introOpacity: '0.08',
    introCrop: { width: '104.58%', height: '259.15%', left: '-2.29%', top: '-11.38%' },
    cardImage: introLitterature,
    collections: 'Textes et regards critiques',
    rails: [
      taggedRail("Comprendre l'occitan", 'Linguistique'),
      taggedRail('Textes & littérature', 'Poésie'),
      taggedRail('Ressources pédagogiques', 'Contes & fables'),
    ],
  },
  portraits: {
    title: "Figures d'oc",
    themes: [],
    leadTag: '',
    intro: introFigures,
    introOpacity: '0.08',
    introCrop: { width: '100%', height: '437.2%', left: '0%', top: '-47.58%' },
    cardImage: introFigures,
    collections: 'Parcours, portraits, engagements',
    rails: [plainRail('Figures historiques'), plainRail("Créateurs d'aujourd'hui")],
  },
  musique: {
    title: 'Musiques',
    themes: ['Nova cançon', 'Œuvres musicales', 'Chansons actuelles', 'Organologie / Lutherie', 'Collectages'],
    leadTag: 'Collectages',
    intro: introMusiques,
    introOpacity: '0.08',
    introCrop: { width: '100%', height: '221.59%', left: '0%', top: '-43.96%' },
    cardImage: introMusiques,
    collections: 'Du son sous toutes ses formes',
    rails: [
      taggedRail('Archives sonores', 'Collectages'),
      taggedRail('Portraits de musiciens', 'Chansons actuelles'),
      taggedRail('Instruments & danses', 'Organologie / Lutherie'),
    ],
  },
  histoires: {
    title: 'Histoires de…',
    themes: ['Histoire des idées', 'Politique et société', 'Événements', 'Lieux'],
    leadTag: 'Histoire des idées',
    intro: introHistoires,
    introOpacity: '0.12',
    introCrop: { width: '100%', height: '438.09%', left: '0%', top: '-197.73%' },
    cardImage: introHistoires,
    collections: 'Événements, luttes, idées',
    rails: [
      taggedRail('Histoire des idées', 'Histoire des idées'),
      taggedRail('Politique et société', 'Politique et société'),
      plainRail('Sur votre territoire'),
    ],
  },
  cadre: {
    title: 'Plein cadre',
    themes: ['Photographie', 'Arts plastiques', 'Cinéma', 'Affiches et éphémères', "Films d'archives"],
    leadTag: 'Photographie',
    intro: introCadre,
    introOpacity: '0.08',
    introCrop: { width: '140.38%', height: '622.15%', left: '0%', top: '-250.9%' },
    cardImage: introCadre,
    collections: 'Des images en perspective',
    rails: [
      taggedRail('Photographie', 'Photographie'),
      taggedRail('Cinéma', 'Cinéma'),
      plainRail('Sur votre territoire'),
    ],
  },
}

const DRESSED_KEYS = ['fetes', 'langue', 'portraits', 'musique', 'histoires', 'cadre'] as const
export type DressedEspace = (typeof DRESSED_KEYS)[number]

export function isDressedEspace(key: EspaceKey): key is DressedEspace {
  return (DRESSED_KEYS as readonly string[]).includes(key)
}

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

export function EspacePageView({
  espace,
  go,
  onOpenGabarit,
  filtre,
}: {
  espace: DressedEspace
  go: (screen: Screen) => void
  onOpenGabarit: (espace: EspaceKey) => void
  filtre?: string | null
}) {
  const page = PAGES[espace]!
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const [theme, setTheme] = useState<string | null>(filtre && page.themes.includes(filtre) ? filtre : null)
  const rails = page.rails
    .map((rail) => ({
      ...rail,
      cards: theme ? rail.cards.filter((card) => card.tag === theme) : rail.cards,
    }))
    .filter((rail) => rail.cards.length > 0)

  useEffect(() => {
    railRefs.current.forEach((row) => {
      if (row) row.scrollLeft = 0
    })
  }, [theme])

  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader go={go} onLogo={() => go('home')} />

      <section className="relative overflow-hidden px-4 pb-6 pt-8">
        <div className="absolute inset-0 bg-[rgb(var(--color-surface-emphasis))]" />
        <div
          className="absolute inset-0 overflow-hidden mix-blend-luminosity"
          style={{ opacity: page.introOpacity }}
        >
          <img
            src={page.intro}
            alt=""
            className={
              page.introCrop
                ? 'absolute max-w-none'
                : 'absolute inset-0 size-full object-cover'
            }
            style={
              page.introCrop
                ? {
                    width: page.introCrop.width,
                    height: page.introCrop.height,
                    left: page.introCrop.left,
                    top: page.introCrop.top,
                  }
                : undefined
            }
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>Les espaces</p>
          <h1 className={typography.title}>{page.title}</h1>
        </div>
      </section>

      <section className="flex flex-col gap-6 px-4 pb-6 pt-6">
        <h2 className={typography.heading}>À la une</h2>
        <button
          type="button"
          onClick={() => onOpenGabarit(espace)}
          className="flex w-full flex-col gap-4 text-left"
        >
          <img src={page.cardImage} alt="" className="h-[200px] w-full object-cover" />
          <span className="flex flex-col gap-2">
            <span className={typography.cardTitle}>{LEAD_TITLE}</span>
            <span className={`${typography.editorialLead} text-[rgb(var(--color-text-secondary))]`}>{LEAD_CHAPO}</span>
            {page.leadTag ? (
              <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>{page.leadTag}</span>
            ) : null}
          </span>
        </button>
      </section>

      {page.themes.length > 0 ? (
        <div data-h-scroller="true" className="scrollbar-hidden flex gap-2 overflow-x-auto px-4 pt-6">
          {page.themes.map((item) => {
            const active = theme === item
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setTheme(active ? null : item)}
                className={`${typography.uiLabel} shrink-0 rounded-pill px-3 py-2 ${
                  active
                    ? 'bg-action text-[rgb(var(--color-action-content))]'
                    : 'bg-[rgb(var(--color-accent-sand))]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      ) : null}

      {rails.map((rail, index) => (
        <section key={rail.title} className="flex flex-col gap-6 px-4 pb-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className={typography.heading}>{rail.title}</h2>
            {rail.cards.length > 1 ? (
              <SliderArrows
                label={rail.title}
                onPrev={() => scrollRow(railRefs.current[index], -1)}
                onNext={() => scrollRow(railRefs.current[index], 1)}
              />
            ) : null}
          </div>
          <div
            ref={(node) => {
              railRefs.current[index] = node
            }}
            data-h-scroller="true"
            className="scrollbar-hidden -mr-4 flex gap-4 overflow-x-auto"
          >
            {rail.cards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => onOpenGabarit(espace)}
                className="flex w-60 shrink-0 flex-col gap-3 text-left"
              >
                <img src={page.cardImage} alt="" className="h-[140px] w-full object-cover" />
                <span className="flex flex-col gap-2">
                  <span className={typography.cardTitleCompact}>{card.title}</span>
                  {card.tag ? (
                    <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>{card.tag}</span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="px-4 py-6">
        <CollectionsShowcase caption={page.collections} onOpen={() => go('collections')} />
      </section>

      <SiteFooter go={go} />
    </div>
  )
}
