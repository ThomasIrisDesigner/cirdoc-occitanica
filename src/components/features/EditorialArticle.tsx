import * as React from 'react'
import type { ReactNode } from 'react'

import { GascogneMap } from '@/components/features/GascogneMap'
import {
  EDITORIAL_ARTICLE,
  type EditorialArticleContent,
  type EditorialBlock,
} from '@/data/editorialArticle'
import type { Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

export type Crumb = { label: string; to?: string }

type EditorialArticleProps = {
  header: ReactNode
  onNavigate: (screen: Screen) => void
  onPath: (path: string) => void
  crumbs: Crumb[]
  article?: EditorialArticleContent
}

function Note({ children }: { children: string }) {
  return (
    <p className="font-ui pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--occ-brand))]">
      {children}
    </p>
  )
}

function Visuel({ className }: { className?: string }) {
  return (
    <div
      className={[
        'flex items-center justify-center bg-[rgb(var(--occ-dark))]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-[10px] italic text-[rgb(var(--occ-gray))]">Visuel</span>
    </div>
  )
}

function Photo({
  src,
  alt,
  className,
  position,
}: {
  src?: string
  alt: string
  className?: string
  position?: string
}) {
  if (!src) return <Visuel className={className} />
  return (
    <img
      src={src}
      alt={alt}
      className={['h-full w-full object-cover', position, className].filter(Boolean).join(' ')}
    />
  )
}

function Legend({ caption, credit }: { caption: string; credit?: string }) {
  return (
    <figcaption className="border-l border-[rgb(var(--occ-dark))] py-1 pl-[17px] pr-4">
      <p className={typography.editorialCaption}>{caption}</p>
      {credit ? <p className={`${typography.editorialCredit} pt-2`}>{credit}</p> : null}
    </figcaption>
  )
}

function Byline({ author }: { author: string }) {
  const comma = author.indexOf(',')
  const name = (comma >= 0 ? author.slice(0, comma) : author).trim()
  const role = comma >= 0 ? author.slice(comma + 1).trim() : null

  return (
    <p className={typography.editorialByline}>
      Par <span className="font-semibold">{name}</span>
      {role ? <span className="font-normal"> - {role}</span> : null}
    </p>
  )
}

function VideoBlock({
  block,
}: {
  block: Extract<EditorialBlock, { type: 'video' }>
}) {
  const [playing, setPlaying] = React.useState(false)
  const src = `${block.embedSrc}${block.embedSrc.includes('?') ? '&' : '?'}autoplay=1`

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[310/174] overflow-hidden bg-[rgb(var(--occ-dark))]">
        {playing ? (
          <iframe
            src={src}
            title={block.title}
            className="h-full w-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="relative h-full w-full"
            aria-label={`Lire la vidéo : ${block.title}`}
          >
            <Photo src={block.posterSrc} alt="" className="absolute inset-0" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-7 w-11 items-center justify-center rounded-md bg-[rgb(var(--color-danger))]">
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[rgb(var(--occ-white))]" />
              </span>
            </span>
          </button>
        )}
      </div>
      <Legend caption={block.caption} credit={block.credit} />
    </figure>
  )
}

function CarouselBlock({
  block,
}: {
  block: Extract<EditorialBlock, { type: 'carousel' }>
}) {
  const [index, setIndex] = React.useState(0)
  const count = block.slides.length
  const slide = block.slides[index]

  function go(next: number) {
    setIndex((next + count) % count)
  }

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[310/174] overflow-hidden bg-[rgb(var(--occ-dark))]">
        <Photo src={slide.src} alt={slide.label} position={index === 1 ? 'object-[30%_center]' : index === 2 ? 'object-right' : 'object-left'} />
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
          {block.slides.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => setIndex(i)}
              className={[
                'h-2 w-2 rounded-full',
                i === index ? 'bg-[rgb(var(--occ-white))]' : 'bg-[rgb(var(--occ-white))]/50',
              ].join(' ')}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Image précédente"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(var(--occ-white))]/90 text-[rgb(var(--occ-dark))]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Image suivante"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(var(--occ-white))]/90 text-[rgb(var(--occ-dark))]"
        >
          ›
        </button>
      </div>
      <Legend caption={block.caption} credit={block.credit} />
    </figure>
  )
}

function BodyBlock({
  block,
  accent,
  isFirstHeading,
}: {
  block: EditorialBlock
  accent: string
  isFirstHeading: boolean
}) {
  if (block.type === 'heading') {
    return (
      <h2 className={[typography.editorialHeading, isFirstHeading ? '' : 'pt-6'].join(' ')}>
        {block.text}
      </h2>
    )
  }

  if (block.type === 'paragraph') {
    return <p className={typography.editorialBody}>{block.text}</p>
  }

  if (block.type === 'quote') {
    return (
      <figure
        className="border-l bg-[rgb(var(--occ-light))] py-4 pl-[17px] pr-4"
        style={{ borderColor: accent }}
      >
        <blockquote className={typography.editorialQuote}>{block.text}</blockquote>
        <p className={`${typography.editorialCredit} pt-2`}>{block.attribution}</p>
      </figure>
    )
  }

  if (block.type === 'pair') {
    return (
      <figure className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-[3/4] overflow-hidden bg-[rgb(var(--occ-dark))]">
            <Photo src={block.leftSrc} alt="" position="object-left" />
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-[rgb(var(--occ-dark))]">
            <Photo src={block.rightSrc} alt="" position="object-right" />
          </div>
        </div>
        <Legend caption={block.caption} credit={block.credit} />
      </figure>
    )
  }

  if (block.type === 'video') return <VideoBlock block={block} />
  if (block.type === 'carousel') return <CarouselBlock block={block} />

  return (
    <figure className="flex flex-col gap-2">
      <div className="aspect-[310/174] overflow-hidden bg-[rgb(var(--occ-dark))]">
        <Photo src={block.src} alt="" />
      </div>
      <Legend caption={block.caption} credit={block.credit} />
    </figure>
  )
}

/**
 * Gabarit de lecture. Niveaux : H1 (titre), H2 (intertitres).
 * Échelle reprise de Yroise : Outfit pour l'UI, Source Serif 4 pour le corps.
 */
export function EditorialArticle({
  header,
  onNavigate,
  onPath,
  crumbs,
  article = EDITORIAL_ARTICLE,
}: EditorialArticleProps) {
  const accent = `rgb(var(${article.kickerColorVar}))`
  const notes = article.notes
  let headingCount = 0

  return (
    <div className="min-h-[calc(100dvh-32px)] bg-[rgb(var(--occ-white))] text-[rgb(var(--occ-dark))]">
      {header}

      <article>
        <header className="px-5 pt-6">
          <nav aria-label="Fil d'Ariane">
            {notes?.breadcrumb ? <Note>{notes.breadcrumb}</Note> : null}
            <ol className="flex flex-wrap items-center gap-x-1.5">
              {crumbs.map((crumb, index) => {
                const current = index === crumbs.length - 1
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <span aria-hidden className="font-ui text-[12px] text-[rgb(var(--occ-gray))]">
                        /
                      </span>
                    ) : null}
                    {current || !crumb.to ? (
                      <span className="font-ui text-[12px] font-medium text-[rgb(var(--occ-dark))]">
                        {crumb.label}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onPath(crumb.to!)}
                        className="font-ui text-[12px] text-[rgb(var(--occ-gray))] underline decoration-[rgb(var(--occ-border))] underline-offset-2"
                      >
                        {crumb.label}
                      </button>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
          {notes?.kicker ? <div className="pt-4"><Note>{notes.kicker}</Note></div> : null}
          <p className={`${typography.editorialKicker} pt-4`} style={{ color: accent }}>
            {article.kicker}
          </p>
          {notes?.title ? <div className="pt-4"><Note>{notes.title}</Note></div> : null}
          <h1 className={`${typography.editorialTitle} ${notes?.title ? 'pt-1' : 'pt-3'}`}>
            {article.title}
          </h1>
          {notes?.chapo ? <div className="pt-4"><Note>{notes.chapo}</Note></div> : null}
          <p className={`${typography.editorialChapo} pt-3`}>{article.chapo}</p>
          {notes?.byline ? <div className="pt-4"><Note>{notes.byline}</Note></div> : null}
          <div className={notes?.byline ? 'pt-1' : 'pt-4'}>
            <Byline author={article.author} />
          </div>
          {notes?.meta ? <div className="pt-3"><Note>{notes.meta}</Note></div> : null}
          <p className={`${typography.editorialMeta} pt-2`}>{article.meta}</p>
        </header>

        {article.enBref ? (
          <dl className="mx-5 mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[rgb(var(--occ-border))] py-4">
            {article.enBref.map((item) => (
              <div key={item.label}>
                <dt className={typography.editorialLabel}>{item.label}</dt>
                <dd className={`${typography.editorialCaption} pt-1`}>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <figure className="flex flex-col gap-2 pt-6">
          {notes?.hero ? <div className="px-5"><Note>{notes.hero}</Note></div> : null}
          <div className="aspect-[310/174] overflow-hidden bg-[rgb(var(--occ-dark))]">
            <Photo src={article.heroSrc} alt="" />
          </div>
          <figcaption className="px-5">
            {notes?.legend ? <Note>{notes.legend}</Note> : null}
            <Legend caption={article.heroCaption} credit={article.heroCredit} />
          </figcaption>
        </figure>

        <div className={`${typography.editorialStack} px-5 pb-10 pt-6`}>
          {article.blocks.map((block, index) => {
            const isFirstHeading = block.type === 'heading' && headingCount === 0
            if (block.type === 'heading') headingCount += 1
            return (
              <div key={`${block.type}-${index}`}>
                {block.note ? <Note>{block.note}</Note> : null}
                <BodyBlock block={block} accent={accent} isFirstHeading={isFirstHeading} />
              </div>
            )
          })}
        </div>

        {article.sources?.length ? (
          <section className="border-t border-[rgb(var(--occ-border))] px-5 py-8">
            {notes?.sources ? <Note>{notes.sources}</Note> : null}
            <h2 className={typography.editorialLabel}>Sources</h2>
            <ul className="pt-3">
              {article.sources.map((source) => (
                <li
                  key={source.title}
                  className="border-b border-[rgb(var(--occ-border))] py-3 last:border-b-0"
                >
                  <p className={typography.editorialCaption}>{source.title}</p>
                  <p className={`${typography.editorialCredit} pt-1`}>{source.detail} ↗</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <aside className="bg-[rgb(var(--occ-light))] px-5 py-8">
        {notes?.autour ? <Note>{notes.autour}</Note> : null}
        <h2 className={typography.editorialLabel}>Autour de cet article</h2>

        {article.territoire ? (
          <button
            type="button"
            onClick={() => onNavigate(article.territoire!.screen)}
            className="mt-5 flex w-full items-center gap-4 text-left"
          >
            <div className="w-24 flex-none">
              <GascogneMap className="mt-0 rounded-md border-[rgb(var(--occ-border))]" />
            </div>
            <span>
              {notes?.territoire ? <Note>{notes.territoire}</Note> : null}
              <span className={typography.editorialLabel}>Territoire</span>
              <span className="font-ui block pt-1 text-[15px] font-semibold leading-snug">
                {article.territoire.name}
              </span>
              <span className={`${typography.editorialCaption} block pt-1`}>
                {article.territoire.line}
              </span>
            </span>
          </button>
        ) : null}

        {article.portrait ? (
          <button
            type="button"
            onClick={() => onNavigate(article.portrait!.screen)}
            className="mt-6 flex w-full items-center gap-4 text-left"
          >
            <Visuel className="h-16 w-16 flex-none rounded-full" />
            <span>
              {notes?.portrait ? <Note>{notes.portrait}</Note> : null}
              <span className={typography.editorialLabel}>Portrait</span>
              <span className="font-ui block pt-1 text-[15px] font-semibold leading-snug">
                {article.portrait.name}
              </span>
              <span className={`${typography.editorialCaption} block pt-1`}>
                {article.portrait.line}
              </span>
            </span>
          </button>
        ) : null}

        <div className="mt-8">
          {notes?.suggestions ? <Note>{notes.suggestions}</Note> : null}
          <h3 className={typography.editorialLabel}>À lire ensuite</h3>
          <ul className="pt-2">
            {article.suggestions.map((item) => (
              <li key={item.title} className="border-b border-[rgb(var(--occ-border))] last:border-b-0">
                <button
                  type="button"
                  onClick={() => onNavigate(item.screen)}
                  className="flex w-full items-center gap-3 py-3 text-left"
                >
                  <Visuel className="h-14 w-14 flex-none" />
                  <span className="min-w-0">
                    <span className={typography.editorialKicker} style={{ color: accent }}>
                      {item.type}
                    </span>
                    <span className={`${typography.editorialCaption} block pt-1 font-semibold text-[rgb(var(--occ-dark))]`}>
                      {item.title}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {article.maleta ? (
          <div className="mt-6 border-t border-[rgb(var(--occ-border))] pt-4">
            {notes?.maleta ? <Note>{notes.maleta}</Note> : null}
            <p className={`${typography.editorialCaption} text-[rgb(var(--occ-dark))]`}>
              {article.maleta}
            </p>
            <p className={`${typography.editorialCredit} pt-1`}>La Maleta ↗</p>
          </div>
        ) : null}

        {notes?.tags ? <div className="pt-6"><Note>{notes.tags}</Note></div> : null}
        <ul className={`flex flex-wrap gap-2 ${notes?.tags ? 'pt-2' : 'pt-6'}`}>
          {article.tags.map((tag) => (
            <li key={tag.label}>
              <button
                type="button"
                onClick={() => onNavigate(tag.screen)}
                className="font-ui inline-flex h-8 items-center rounded-full border border-[rgb(var(--occ-border))] bg-[rgb(var(--occ-white))] px-3 text-[12px] font-medium text-[rgb(var(--occ-dark))]"
              >
                {tag.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
