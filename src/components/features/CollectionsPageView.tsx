import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { IconSearch } from '@/components/features/HomeIcons'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import {
  COLLECTIONS_LEAD,
  COLLECTIONS_RAILS,
  type CollectionItem,
} from '@/data/collections'
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

function leavesSite(item: CollectionItem) {
  return item.destination === 'gallica' || item.destination === 'external'
}

function CountLine({ item }: { item: CollectionItem }) {
  return (
    <span className={`${typography.editorialSecondary} inline-flex items-center gap-2 text-[rgb(var(--color-accent-sand))]`}>
      {item.meta ?? `${item.count} documents`}
      {leavesSite(item) ? (
        <>
          <ExternalMark />
          <span className="sr-only">, nouvel onglet</span>
        </>
      ) : null}
    </span>
  )
}

function CollectionCard({ item, featured = false }: { item: CollectionItem; featured?: boolean }) {
  const className = featured
    ? 'flex w-full flex-col gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]'
    : 'flex w-60 shrink-0 flex-col gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]'
  const body = (
    <>
      <img
        src={item.image}
        alt=""
        className={featured ? 'h-[200px] w-full object-cover' : 'h-[140px] w-full object-cover'}
      />
      <span className="flex flex-col gap-2">
        <span className={featured ? typography.cardTitle : typography.cardTitleCompact}>{item.title}</span>
        {item.article ? (
          <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]}`}>Article</span>
        ) : (
          <CountLine item={item} />
        )}
      </span>
    </>
  )

  if (leavesSite(item)) {
    const href = item.destination === 'gallica' ? gallicaResultsUrl(item.query) : item.href
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    )
  }

  return (
    <Link to={`/collections/${item.slug}`} className={className}>
      {body}
    </Link>
  )
}

export function CollectionsPageView({ go }: { go: (screen: Screen) => void }) {
  const titleId = useId()
  const fieldRef = useRef<HTMLInputElement>(null)
  const railRefs = useRef<Array<HTMLDivElement | null>>([])
  const [query, setQuery] = useState('')

  return (
    <div className="bg-collections text-[rgb(var(--color-background-warm))]">
      <SiteHeader go={go} onLogo={() => go('home')} tone="dark" />

      <section className="px-4 pb-16 pt-8">
        <h1 className={typography.title}>Collections</h1>
        <form
          className="mt-6"
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
              <IconSearch className="size-[26px]" />
            </button>
          </div>
        </form>
        <a
          href={GALLICA_ADVANCED}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-2 self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]"
        >
          <span className={typography.footerTitle}>Recherche avancée</span>
          <span aria-hidden className="text-[rgb(var(--color-action))]">
            ↗
          </span>
          <span className="sr-only">, nouvel onglet</span>
        </a>
      </section>

      <section className="flex flex-col gap-6 px-4 pb-6 pt-6">
        <h2 className={typography.heading}>À la une</h2>
        <CollectionCard item={COLLECTIONS_LEAD} featured />
      </section>

      {COLLECTIONS_RAILS.map((rail, index) => (
        <section
          key={rail.title}
          className={`flex flex-col gap-6 px-4 pt-4 ${index === COLLECTIONS_RAILS.length - 1 ? 'pb-16' : 'pb-6'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className={typography.heading}>{rail.title}</h2>
            <SliderArrows
              label={rail.title}
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
            {rail.items.map((item) => (
              <CollectionCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}

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
            className="inline-flex min-h-11 items-center gap-2 self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]"
          >
            <span className={typography.footerTitle}>Voir les documents</span>
            <ExternalMark />
            <span className="sr-only">, nouvel onglet</span>
          </a>
        )}
      </section>

      <SiteFooter go={go} />
    </div>
  )
}
