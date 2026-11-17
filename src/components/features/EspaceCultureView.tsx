import { useEffect, useRef, useState } from 'react'

import introCulture from '@/assets/home/intro-culture.png'
import feteVisual from '@/assets/home/une-b.png'
import { IconCollections } from '@/components/features/HomeIcons'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import type { EspaceKey, Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const THEMES = ['Fêtes', 'PCI', 'Artisanat', 'Rites']

const RAILS: Array<{
  title: string
  cards: Array<{ title: string; tag: string }>
}> = [
  {
    title: 'Fêtes et célébrations',
    cards: [
      { title: 'Célébrer au fil des saisons', tag: 'Rites' },
      { title: 'Rituels et mémoire collective', tag: 'Fêtes' },
      { title: 'Des fêtes qui rassemblent', tag: 'PCI' },
    ],
  },
  {
    title: 'Savoir-faire & artisanat',
    cards: [
      { title: 'Les gestes qui se transmettent', tag: 'Artisanat' },
      { title: 'Au cœur des ateliers', tag: 'PCI' },
      { title: 'Matières et savoir-faire', tag: 'PCI' },
    ],
  },
  {
    title: 'Sur votre territoire',
    cards: [
      { title: 'Des traditions près de chez vous', tag: 'Vidéo' },
      { title: 'Rencontres en territoire occitan', tag: 'Vidéo' },
      { title: 'Une culture vivante à découvrir', tag: 'Vidéo' },
    ],
  },
]

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

export function EspaceCultureView({
  go,
  onOpenGabarit,
}: {
  go: (screen: Screen) => void
  onOpenGabarit: (espace: EspaceKey) => void
}) {
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const [theme, setTheme] = useState<string | null>(null)
  const rails = RAILS.map((rail) => ({
    ...rail,
    cards: theme ? rail.cards.filter((card) => card.tag === theme) : rail.cards,
  })).filter((rail) => rail.cards.length > 0)

  useEffect(() => {
    railRefs.current.forEach((row) => {
      if (row) row.scrollLeft = 0
    })
  }, [theme])

  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader onMenu={() => go('menu')} onLogo={() => go('home')} />

      <section className="relative overflow-hidden px-4 pb-6 pt-8">
        <div className="absolute inset-0 bg-[rgb(var(--color-surface-emphasis))]" />
        <img
          src={introCulture}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-[0.08] mix-blend-luminosity"
        />
        <div className="relative flex flex-col gap-3">
          <p className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>Les espaces</p>
          <h1 className={typography.title}>Culture vivante</h1>
        </div>
      </section>

      <section className="flex flex-col gap-6 px-4 pb-6 pt-6">
        <h2 className={typography.heading}>À la une</h2>
        <button
          type="button"
          onClick={() => onOpenGabarit('fetes')}
          className="flex w-full flex-col gap-4 text-left"
        >
          <img src={feteVisual} alt="" className="h-[200px] w-full object-cover" />
          <span className="flex flex-col gap-2">
            <span className={typography.cardTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
            <span className={`${typography.editorialLead} text-[rgb(var(--color-text-secondary))]`}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </span>
            <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>PCI · Fêtes</span>
          </span>
        </button>
      </section>

      <div data-h-scroller="true" className="scrollbar-hidden flex gap-2 overflow-x-auto px-4 pt-6">
        {THEMES.map((item) => {
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
                onClick={() => onOpenGabarit('fetes')}
                className="flex w-60 shrink-0 flex-col gap-3 text-left"
              >
                <img src={feteVisual} alt="" className="h-[140px] w-full object-cover" />
                <span className="flex flex-col gap-2">
                  <span className={typography.cardTitleCompact}>{card.title}</span>
                  <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>{card.tag}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="px-4 py-6">
        <button
          type="button"
          onClick={() => go('collections')}
          className="flex w-full items-center gap-4 bg-collections p-4 text-left text-[rgb(var(--color-background-warm))]"
        >
          <span className="relative size-[100px] shrink-0">
            <img src={feteVisual} alt="" className="size-full object-cover" />
            <span className="absolute bottom-0 left-0 grid size-10 place-items-center bg-[rgb(var(--color-text)/0.8)]">
              <IconCollections className="h-6 w-auto text-[rgb(var(--color-background-warm))]" />
            </span>
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-3">
            <span className={typography.heading}>Voir les collections</span>
            <span className={typography.editorialSecondary}>Fêtes et traditions à retrouver dans les collections.</span>
          </span>
        </button>
      </section>

      <SiteFooter />
    </div>
  )
}
