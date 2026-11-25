import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import { IconCollections, IconSearch, IconYoutube } from '@/components/features/HomeIcons'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import {
  CIRDOC_YOUTUBE,
  COLLECTION_THEMES,
  COLLECTIONS_LEAD,
  COLLECTIONS_PHARES,
  DOCUMENTS_REMARQUABLES,
  EN_IMAGES,
  FONDS_ARCHIVES,
  YOUTUBE_FRAMES,
  type CollectionCard,
  type CollectionItem,
  type ImageCollection,
} from '@/data/collections'
import { PRESENTATION_ARTICLE_PATH } from '@/data/editorialArticle'
import { GALLICA_ADVANCED, gallicaResultsUrl } from '@/lib/gallica'
import type { Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const LEAD =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.'

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

function ExternalMark() {
  return (
    <span aria-hidden className="text-[rgb(var(--color-text-brand))]">
      ↗
    </span>
  )
}

const focusRing =
  'focus-ring-sand'

function holdPlaceholder(event: MouseEvent<HTMLAnchorElement>) {
  if (event.currentTarget.getAttribute('href') === '#') event.preventDefault()
}

function PlusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function RailCard({ item }: { item: CollectionCard | ImageCollection }) {
  const line = 'documents' in item ? item.documents : item.description
  const external = item.href.startsWith('http')
  const className = `hit flex w-60 shrink-0 flex-col gap-4 text-left ${focusRing}`
  const body = (
    <>
      <img src={item.image} alt="" className="h-[140px] w-full object-cover" />
      <span className="flex flex-col gap-2">
        <span className={`${typography.cardTitleCompact} hit-title`}>{item.title}</span>
        <span className={`${typography.editorialSecondary} text-[rgb(var(--color-accent-sand))]`}>
          {line}
        </span>
      </span>
      {external ? <span className="sr-only">, nouvel onglet</span> : null}
    </>
  )

  if (external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    )
  }

  return (
    <Link to={item.href} onClick={holdPlaceholder} className={className}>
      {body}
    </Link>
  )
}

function CardRail({ title, items }: { title: string; items: Array<CollectionCard | ImageCollection> }) {
  const rowRef = useRef<HTMLDivElement | null>(null)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className={typography.heading}>{title}</h2>
        <SliderArrows
          label={title}
          onPrev={() => scrollRow(rowRef.current, -1)}
          onNext={() => scrollRow(rowRef.current, 1)}
        />
      </div>
      <div
        ref={rowRef}
        data-h-scroller="true"
        className="scrollbar-hidden -mr-4 flex gap-4 overflow-x-auto"
      >
        {items.map((item) => (
          <RailCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}

function YoutubeBand() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % YOUTUBE_FRAMES.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [paused, reduced])

  return (
    <section>
      <div className="flex flex-col gap-4 bg-[rgb(var(--color-collections-deep))] p-4">
        <div className="relative h-[200px] overflow-hidden">
          {YOUTUBE_FRAMES.map((src, frame) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 size-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
                frame === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <span className="absolute left-0 top-0 grid size-10 place-items-center bg-[rgb(var(--color-text)/0.8)]">
            <IconYoutube className="h-4 w-auto text-[rgb(var(--color-action))]" />
          </span>
          {reduced ? null : (
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? 'Relancer le défilement des vidéos' : 'Mettre en pause le défilement des vidéos'}
              onClick={() => setPaused((current) => !current)}
              className="absolute bottom-2 right-2 grid size-11 place-items-center bg-[rgb(var(--color-text)/0.8)] text-[rgb(var(--color-background-warm))] focus-ring-sand"
            >
              <span aria-hidden className="text-xs font-bold">
                {paused ? '▶' : '❚❚'}
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className={typography.heading}>Nos vidéos sur YouTube</h2>
            <p className={typography.editorialSecondary}>Entretiens, collectages et archives filmées</p>
          </div>
          <a
            href={CIRDOC_YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className={`hit inline-flex min-h-11 items-center gap-2 self-start ${focusRing}`}
          >
            <span className={`${typography.footerTitle} hit-title`}>Voir la chaîne</span>
            <span aria-hidden>↗</span>
            <span className="sr-only">, nouvel onglet</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export function CollectionsPageView({ go }: { go: (screen: Screen) => void }) {
  const titleId = useId()
  const fondsId = useId()
  const fieldRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [fondsOpen, setFondsOpen] = useState(false)

  return (
    <div className="bg-collections text-[rgb(var(--color-background-warm))]">
      <SiteHeader go={go} onLogo={() => go('home')} tone="dark" />

      <div className="flex flex-col gap-10 px-4 pb-10 pt-8">
      <section>
        <h1 className={`${typography.title} flex items-end gap-3`}>
          <IconCollections className="mb-[var(--offset-collections-mark)] h-7 w-auto shrink-0 text-[rgb(var(--color-background-warm))]" />
          Collections
        </h1>
        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault()
            const term = query.trim()
            if (!term) {
              fieldRef.current?.focus()
              return
            }
            window.open(gallicaResultsUrl(term), '_blank', 'noopener,noreferrer')
          }}
        >
          <h2 id={titleId} className="sr-only">
            Rechercher dans les collections
          </h2>
          <div className="flex h-12 items-center overflow-hidden rounded-pill border border-border bg-[rgb(var(--color-background-warm))] text-text focus-within:border-[rgb(var(--color-focus))] focus-within:text-[rgb(var(--color-focus))]">
            <input
              ref={fieldRef}
              id={`${titleId}-field`}
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder={'17\u00a0857 ressources numérisées'}
              value={query}
              aria-labelledby={titleId}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent pl-4 font-ui text-base font-normal leading-6 text-text outline-none placeholder:text-[rgb(var(--color-text-secondary))]"
            />
            <button type="submit" aria-label="Rechercher dans Gallica" className="grid h-full w-12 shrink-0 place-items-center">
              <IconSearch className="size-[var(--size-icon-search)]" />
            </button>
          </div>
        </form>
        <a
          href={GALLICA_ADVANCED}
          target="_blank"
          rel="noopener noreferrer"
            className="hit mt-2 inline-flex min-h-11 items-center gap-2 self-start focus-ring"
          >
            <span className={`${typography.footerTitle} hit-title`}>Recherche avancée</span>
          <span aria-hidden>↗</span>
          <span className="sr-only">, nouvel onglet</span>
        </a>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={typography.heading}>À la une</h2>
        <Link to={PRESENTATION_ARTICLE_PATH} className={`hit flex w-full flex-col gap-4 text-left ${focusRing}`}>
          <img src={COLLECTIONS_LEAD.image} alt="" className="h-[200px] w-full object-cover" />
          <span className={`${typography.cardTitle} hit-title`}>{COLLECTIONS_LEAD.title}</span>
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={typography.heading}>Documents remarquables</h2>
        <div className="flex flex-col">
          {DOCUMENTS_REMARQUABLES.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={holdPlaceholder}
              className={`hit flex items-start gap-3 border-t border-[rgb(var(--color-border-on-dark))] py-4 text-left first:border-t-0 first:pt-0 last:pb-0 ${focusRing}`}
            >
              <img src={item.image} alt="" className="size-20 shrink-0 object-cover" />
              <span className="min-w-0 flex-1">
                <span className={`${typography.cardTitleCompact} hit-title block`}>{item.title}</span>
                <span className={`${typography.uiCategory} mt-2 block text-[rgb(var(--color-accent-clay))]`}>
                  {item.collection}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <CardRail title="Collections phares" items={COLLECTIONS_PHARES} />

      {COLLECTION_THEMES.map((theme) => (
        <CardRail key={theme.title} title={theme.title} items={theme.items} />
      ))}

      <CardRail title="En images" items={EN_IMAGES} />

      <section>
        <div className="border border-[rgb(var(--color-border-on-dark))] p-4">
          <h2 className={typography.heading}>
            <button
              type="button"
              aria-expanded={fondsOpen}
              aria-controls={fondsId}
              onClick={() => setFondsOpen((open) => !open)}
              className={`flex w-full items-center gap-4 text-left ${focusRing}`}
            >
              <span className="min-w-0 flex-1">
                <span className="block">Autres fonds d'archives</span>
                <span className={`${typography.editorialSecondary} mt-2 block`}>
                  {FONDS_ARCHIVES.length} fonds conservés par des partenaires
                </span>
              </span>
              <PlusMark
                className={`size-6 shrink-0 text-[rgb(var(--color-accent-sand))] ${fondsOpen ? 'rotate-45' : ''}`}
              />
            </button>
          </h2>
          {fondsOpen ? (
            <ul id={fondsId} className="mt-4">
              {FONDS_ARCHIVES.map((name) => (
                <li key={name} className="border-t border-[rgb(var(--color-border-on-dark))]">
                  <a
                    href="#"
                    onClick={holdPlaceholder}
                    className={`hit flex min-h-12 items-center py-3 ${typography.footerTitle} ${focusRing}`}
                  >
                    <span className="hit-title">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <YoutubeBand />
      </div>

      <SiteFooter go={go} />
    </div>
  )
}

export function CollectionEditorialView({
  item,
  go,
}: {
  item: CollectionItem
  go: (screen: Screen) => void
}) {
  return (
    <div className="bg-[rgb(var(--color-background-warm))] text-text">
      <SiteHeader go={go} onLogo={() => go('home')} />

      <section className="bg-[rgb(var(--color-surface-emphasis))] px-4 pb-8 pt-8">
        <p className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>
          {item.article ? 'Article' : 'Collections'}
        </p>
        <h1 className={`${typography.title} mt-3`}>{item.title}</h1>
        {item.article ? null : (
          <p className={`${typography.editorialLead} mt-1 text-[rgb(var(--color-text-secondary))]`}>
            {item.count} documents
          </p>
        )}
      </section>

      <section className="flex flex-col gap-6 px-4 py-6">
        <img src={item.image} alt="" className="h-[200px] w-full object-cover" />
        <p className={typography.reading}>{LEAD}</p>
        {item.article ? null : (
          <a
            href={gallicaResultsUrl(item.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="hit inline-flex min-h-11 items-center gap-2 self-start focus-ring"
          >
            <span className={`${typography.footerTitle} hit-title`}>Voir les documents</span>
            <ExternalMark />
            <span className="sr-only">, nouvel onglet</span>
          </a>
        )}
      </section>

      <SiteFooter go={go} />
    </div>
  )
}
