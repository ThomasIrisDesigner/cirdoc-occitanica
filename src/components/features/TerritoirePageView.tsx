import { useRef, useState } from 'react'

import introFigures from '@/assets/home/intro-figures.jpg'
import introLitterature from '@/assets/home/intro-litterature.jpg'
import introMusiques from '@/assets/home/intro-musiques.jpg'
import feteVisual from '@/assets/home/une-b.png'
import { GascogneMap } from '@/components/features/GascogneMap'
import { CollectionsShowcase } from '@/components/features/CollectionsShowcase'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import { TERRITOIRE_LOCALISATIONS, TERRITOIRE_SOUS_TITRES, TERRITOIRES_CONFIG } from '@/data/territoires'
import type { EspaceKey, Screen, TerritoireKey } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const CARD_TITLES = [
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet adipiscing',
] as const

const SECTION_ESPACE: Record<string, EspaceKey> = {
  Musique: 'musique',
  'Fêtes & Traditions': 'fetes',
  Personnalités: 'portraits',
  Langue: 'langue',
  'La Scène': 'scene',
  Portraits: 'portraits',
}

const SECTION_IMAGE: Record<string, string | undefined> = {
  Musique: introMusiques,
  'Fêtes & Traditions': feteVisual,
  Personnalités: introFigures,
  Langue: introLitterature,
  Portraits: introFigures,
}

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

export function TerritoirePageView({
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
  const places = TERRITOIRE_LOCALISATIONS[terKey]
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const [mapOpen, setMapOpen] = useState(false)
  const [place, setPlace] = useState(() => (filtre && places.includes(filtre) ? filtre : places[0]))

  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader go={go} onLogo={() => go('home')} />

      <section className="bg-[rgb(var(--color-surface-emphasis))] px-4 pb-8 pt-8">
        <p className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>Territoires</p>
        <h1 className={`${typography.title} mt-3`}>{config.label}</h1>
        <p className={`${typography.editorialLead} mt-1 text-[rgb(var(--color-text-secondary))]`}>
          {TERRITOIRE_SOUS_TITRES[terKey]}
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <button
            type="button"
            aria-expanded={mapOpen}
            aria-controls="territoire-carte"
            onClick={() => setMapOpen((open) => !open)}
            className={`${typography.editorialLead} underline decoration-[rgb(var(--color-text-secondary))] underline-offset-[3px]`}
          >
            {mapOpen ? 'Fermer' : 'Carte'}
          </button>
        </p>

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
            <GascogneMap tone="da" region={terKey === 'gascogne' ? 'gascogne' : null} />
          </div>
        </div>
      </section>

      <div data-h-scroller="true" className="scrollbar-hidden flex gap-2 overflow-x-auto px-4 pt-6">
        {places.map((item) => {
          const active = place === item
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setPlace(item)}
              className={`${typography.uiLabel} shrink-0 rounded-pill px-3 py-2 ${
                active ? 'bg-action text-[rgb(var(--color-action-content))]' : 'bg-[rgb(var(--color-accent-sand))]'
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>

      {config.sections.map((section, index) => {
        const espace = SECTION_ESPACE[section.title]
        return (
          <section key={section.title} className="flex flex-col gap-6 px-4 pb-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className={typography.heading}>{section.title}</h2>
              <SliderArrows
                label={section.title}
                onPrev={() => scrollRow(railRefs.current[index], -1)}
                onNext={() => scrollRow(railRefs.current[index], 1)}
              />
            </div>
            <div
              ref={(node) => {
                railRefs.current[index] = node
              }}
              data-h-scroller="true"
              className="scrollbar-hidden -mr-4 flex gap-4 overflow-x-auto"
            >
              {CARD_TITLES.map((title) => (
                <button
                  key={`${section.title}-${title}`}
                  type="button"
                  onClick={espace ? () => onOpenGabarit(espace) : undefined}
                  className="flex w-60 shrink-0 flex-col gap-3 text-left"
                >
                  {SECTION_IMAGE[section.title] ? (
                    <img src={SECTION_IMAGE[section.title]} alt="" className="h-[140px] w-full object-cover" />
                  ) : (
                    <span className="block h-[140px] w-full bg-[rgb(var(--color-surface-emphasis))]" />
                  )}
                  <span className="flex flex-col gap-2">
                    <span className={typography.cardTitleCompact}>{title}</span>
                    <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>
                      {section.badge}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )
      })}

      <section className="px-4 py-6">
        <CollectionsShowcase
          caption={`${config.docsCount} documents · Gallica`}
          onOpen={() => go('collections')}
        />
      </section>

      <SiteFooter go={go} />
    </div>
  )
}
