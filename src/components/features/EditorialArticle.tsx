import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import uneA from '@/assets/home/une-a.png'
import uneB from '@/assets/home/une-b.png'
import uneC from '@/assets/home/une-c.png'
import uneD from '@/assets/home/une-d.png'
import filetLine from '@/assets/article/filet-line.svg'
import filetMark from '@/assets/article/filet-mark.svg'
import playIcon from '@/assets/article/play.svg'
import plusIcon from '@/assets/article/plus.svg'
import { articlesSharingTags } from '@/components/features/EspacePageView'
import { SiteFooter, SiteHeader, SliderArrows } from '@/components/features/HomeView'
import { IconChevron, IconCollections } from '@/components/features/HomeIcons'
import { findCollectionCard, type CollectionCard } from '@/data/collections'
import {
  EDITORIAL_ARTICLE,
  gabaritPath,
  type EditorialArticleContent,
  type EditorialBlock,
  type TextRun,
} from '@/data/editorialArticle'
import type { EspaceKey, Screen } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

export type Crumb = { label: string; to?: string }

type Suggestion = NonNullable<EditorialArticleContent['lireAussi']>

type AroundItem = {
  title: string
  label: string
  open: () => void
}

type EditorialArticleProps = {
  onNavigate: (screen: Screen) => void
  onPath: (path: string) => void
  crumbs: Crumb[]
  article?: EditorialArticleContent
}

const RELATED_IMAGES = [uneB, uneA, uneD, uneC]

const SPACE_NAME: Record<EspaceKey, string> = {
  fetes: 'Culture vivante',
  langue: 'Littérature',
  portraits: "Figures d'oc",
  musique: 'Musiques',
  scene: 'La Scène occitane',
  histoires: 'Histoires de…',
  cadre: 'Plein cadre',
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-focus))]'

function scrollRow(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

function authorLine(author: string) {
  const comma = author.indexOf(',')
  if (comma < 0) return `Par ${author}`
  return `Par ${author.slice(0, comma).trim()} — ${author.slice(comma + 1).trim()}`
}

function suggestionSpace(screen: Screen) {
  if (screen === 'article') return SPACE_NAME.musique
  if (screen.startsWith('espace-')) {
    const key = screen.slice('espace-'.length) as EspaceKey
    return SPACE_NAME[key] ?? ''
  }
  return ''
}

function groupChapters(blocks: EditorialBlock[]) {
  const groups: EditorialBlock[][] = []
  let current: EditorialBlock[] = []
  for (const block of blocks) {
    if (block.type === 'heading' && current.length > 0) {
      groups.push(current)
      current = []
    }
    current.push(block)
  }
  if (current.length > 0) groups.push(current)
  return groups
}

function Visuel() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[rgb(var(--color-text))]">
      <span className={`${typography.uiCaption} text-[rgb(var(--color-text-secondary))]`}>Visuel</span>
    </div>
  )
}

function Photo({
  src,
  alt,
  position,
  fit = 'cover',
}: {
  src?: string
  alt: string
  position?: string
  fit?: 'cover' | 'contain'
}) {
  if (!src) return <Visuel />
  return (
    <img
      src={src}
      alt={alt}
      className={[
        'h-full w-full',
        fit === 'contain' ? 'object-contain' : 'object-cover',
        position,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

function InlineText({
  runs,
  onPath,
  tone = 'action',
}: {
  runs: string | TextRun[]
  onPath: (path: string) => void
  tone?: 'action' | 'text'
}) {
  if (typeof runs === 'string') return runs
  const line =
    tone === 'action'
      ? 'decoration-[rgb(var(--color-action))] decoration-[1.5px] underline-offset-[3px]'
      : 'decoration-current'
  return runs.map((run, index) =>
    typeof run === 'string' ? (
      <span key={index}>{run}</span>
    ) : (
      <a
        key={index}
        href={run.to}
        onClick={(event) => {
          event.preventDefault()
          onPath(run.to)
        }}
        className={`cursor-pointer text-inherit underline ${line} ${focusRing}`}
      >
        {run.text}
      </a>
    ),
  )
}

function Legend({
  caption,
  credit,
  onPath,
  transcript,
  className = '',
}: {
  caption: string | TextRun[]
  credit?: string | TextRun[]
  onPath: (path: string) => void
  transcript?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const transcriptId = useId()

  return (
    <figcaption
      className={`flex flex-col gap-1 border-l border-[rgb(var(--color-border))] py-1 pl-[17px] pr-4 ${className}`}
    >
      <p className={typography.uiCaption}>
        <InlineText runs={caption} onPath={onPath} tone="text" />
      </p>
      {credit ? (
        <p className={`${typography.uiCredit} uppercase text-[rgb(var(--color-text-secondary))]`}>
          <InlineText runs={credit} onPath={onPath} tone="text" />
        </p>
      ) : null}
      {transcript ? (
        <>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={transcriptId}
            onClick={() => setOpen((value) => !value)}
            className={`${typography.uiCaption} mt-2 w-fit cursor-pointer bg-transparent p-0 text-left underline decoration-current ${focusRing}`}
          >
            Transcription
          </button>
          {open ? (
            <p id={transcriptId} className={`${typography.uiCaption} mt-1`}>
              {transcript}
            </p>
          ) : null}
        </>
      ) : null}
    </figcaption>
  )
}

function ArticleClose() {
  return (
    <div className="flex items-center justify-center gap-2 p-6" aria-hidden>
      <img src={filetLine} alt="" className="block h-[4px] min-w-0 flex-1" />
      <img src={filetMark} alt="" className="block h-[14.833px] w-[20px] shrink-0" />
      <img src={filetLine} alt="" className="block h-[4px] min-w-0 flex-1" />
    </div>
  )
}

function QuoteMark() {
  return (
    <svg viewBox="8 0 50 38.5" className="h-[39px] w-[50px] shrink-0 text-[rgb(var(--color-text-brand))]" aria-hidden>
      <path
        fill="currentColor"
        d="M18.5183 38.4146C16.9939 38.4146 15.4695 38.1098 13.9451 37.5C12.5224 36.8902 11.2012 36.0264 9.98171 34.9085C9.37195 33.4858 8.86382 32.063 8.45732 30.6402C8.15244 29.1159 8 27.5915 8 26.0671C8 21.2907 8.91463 17.2256 10.7439 13.8719C12.6748 10.4167 15.1646 7.57113 18.2134 5.33536C21.2622 2.99796 24.4634 1.21951 27.8171 0L29.3415 3.35365C26.8008 4.67479 24.6159 5.99593 22.7866 7.31707C20.9573 8.53658 19.4329 10.0102 18.2134 11.7378C16.9939 13.4654 15.8252 15.7012 14.7073 18.4451L13.9451 14.1768L22.0244 18.75C24.3618 19.9695 26.0386 21.4939 27.0549 23.3232C28.0711 25.0508 28.5793 26.7276 28.5793 28.3537C28.5793 31.1992 27.6138 33.5874 25.6829 35.5183C23.8537 37.4492 21.4654 38.4146 18.5183 38.4146ZM47.1768 38.4146C45.6524 38.4146 44.128 38.1098 42.6037 37.5C41.1809 36.8902 39.8598 36.0264 38.6402 34.9085C38.0305 33.4858 37.5224 32.063 37.1159 30.6402C36.811 29.1159 36.6585 27.5915 36.6585 26.0671C36.6585 21.2907 37.5732 17.2256 39.4024 13.8719C41.3333 10.4167 43.8232 7.57113 46.872 5.33536C49.9207 2.99796 53.122 1.21951 56.4756 0L58 3.35365C55.4594 4.67479 53.2744 5.99593 51.4451 7.31707C49.6159 8.53658 48.0915 10.0102 46.872 11.7378C45.6524 13.4654 44.4837 15.7012 43.3659 18.4451L42.6037 14.1768L50.6829 18.75C53.0203 19.9695 54.6972 21.4939 55.7134 23.3232C56.7297 25.0508 57.2378 26.7276 57.2378 28.3537C57.2378 31.1992 56.2724 33.5874 54.3415 35.5183C52.5122 37.4492 50.124 38.4146 47.1768 38.4146Z"
      />
    </svg>
  )
}

function Quote({ text, attribution }: { text: string; attribution: string }) {
  return (
    <figure className="flex flex-col gap-3 py-6">
      <QuoteMark />
      <blockquote className={`${typography.pullQuote} text-[rgb(var(--color-text-brand))]`}>
        {text}
      </blockquote>
      <figcaption className={`${typography.uiCaption} text-[rgb(var(--color-text-secondary))]`}>
        {attribution}
      </figcaption>
    </figure>
  )
}

function FigureFrame({
  children,
  caption,
  credit,
  onPath,
  transcript,
}: {
  children: ReactNode
  caption: string | TextRun[]
  credit?: string | TextRun[]
  onPath: (path: string) => void
  transcript?: string
}) {
  return (
    <figure className="flex flex-col gap-2">
      {children}
      <Legend caption={caption} credit={credit} onPath={onPath} transcript={transcript} />
    </figure>
  )
}

function PairBlock({
  block,
  onPath,
}: {
  block: Extract<EditorialBlock, { type: 'pair' }>
  onPath: (path: string) => void
}) {
  const same = Boolean(block.leftSrc && block.rightSrc && block.leftSrc === block.rightSrc)
  const single = !block.leftSrc || !block.rightSrc || same

  return (
    <FigureFrame caption={block.caption} credit={block.credit} onPath={onPath}>
      {single ? (
        <div className="h-[294px] overflow-hidden bg-[rgb(var(--color-text))]">
          <Photo src={block.leftSrc ?? block.rightSrc} alt="" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <div className="h-[294px] overflow-hidden bg-[rgb(var(--color-text))]">
            <Photo src={block.leftSrc} alt="" position="object-left" />
          </div>
          <div className="h-[294px] overflow-hidden bg-[rgb(var(--color-text))]">
            <Photo src={block.rightSrc} alt="" position="object-right" />
          </div>
        </div>
      )}
    </FigureFrame>
  )
}

function clock(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(whole / 60)
  return `${minutes}:${String(whole % 60).padStart(2, '0')}`
}

function AudioBlock({
  block,
  onPath,
}: {
  block: Extract<EditorialBlock, { type: 'audio' }>
  onPath: (path: string) => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [length, setLength] = useState(block.duration ?? 0)

  useEffect(() => {
    if (!playing || block.src) return
    const id = window.setInterval(() => {
      setTime((current) => {
        if (current + 0.25 >= length) {
          setPlaying(false)
          return 0
        }
        return current + 0.25
      })
    }, 250)
    return () => window.clearInterval(id)
  }, [playing, block.src, length])

  function seek(value: number) {
    setTime(value)
    if (audioRef.current) audioRef.current.currentTime = value
  }

  function toggle() {
    const audio = audioRef.current
    if (!audio) {
      setPlaying((value) => !value)
      return
    }
    if (audio.paused) {
      void audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <FigureFrame
      caption={block.caption}
      credit={block.credit}
      onPath={onPath}
      transcript={block.transcript}
    >
      <div className="flex items-center gap-2 border border-[rgb(var(--color-border))] bg-surface py-1 pl-1 pr-3">
        {block.src ? (
          <audio
            ref={audioRef}
            src={block.src}
            preload="metadata"
            muted={muted}
            onLoadedMetadata={(event) => setLength(event.currentTarget.duration)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onEnded={() => setPlaying(false)}
          />
        ) : null}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause : ${block.title}` : `Lecture : ${block.title}`}
          className={`grid size-11 shrink-0 place-items-center text-[rgb(var(--color-action))] ${focusRing}`}
        >
          {playing ? (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path fill="currentColor" d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path fill="currentColor" d="M4 2.5v11l10-5.5z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={Math.max(length, 1)}
          step={0.1}
          value={Math.min(time, Math.max(length, 1))}
          aria-label="Position de lecture"
          aria-valuetext={`${clock(time)} sur ${clock(length)}`}
          onChange={(event) => seek(Number(event.target.value))}
          className="h-6 min-w-0 flex-1 accent-[rgb(var(--color-action))]"
        />
        <span className={`${typography.uiCaption} shrink-0 tabular-nums text-[rgb(var(--color-text-secondary))]`} aria-hidden>
          {clock(time)} / {clock(length)}
        </span>
        <button
          type="button"
          aria-pressed={muted}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
          onClick={() => setMuted((value) => !value)}
          className={`grid size-11 shrink-0 place-items-center text-text ${focusRing}`}
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path fill="currentColor" d="M2 6h2.5L8 3.2v9.6L4.5 10H2z" />
            {muted ? <path stroke="currentColor" strokeWidth="1.5" d="M10 6.5l4 3M14 6.5l-4 3" /> : null}
          </svg>
        </button>
      </div>
    </FigureFrame>
  )
}

function VideoBlock({
  block,
  onPath,
}: {
  block: Extract<EditorialBlock, { type: 'video' }>
  onPath: (path: string) => void
}) {
  const [playing, setPlaying] = useState(false)
  const src = `${block.embedSrc}${block.embedSrc.includes('?') ? '&' : '?'}autoplay=1`

  return (
    <FigureFrame caption={block.caption} credit={block.credit} onPath={onPath} transcript={block.transcript}>
      <div className="relative h-[192px] overflow-hidden bg-[rgb(var(--color-text))]">
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
            className={`relative h-full w-full ${focusRing}`}
            aria-label={`Lire la vidéo : ${block.title}`}
          >
            <span className="absolute inset-0">
              <Photo src={block.posterSrc} alt="" />
            </span>
            <span className="absolute inset-0 grid place-items-center">
              <img src={playIcon} alt="" />
            </span>
          </button>
        )}
      </div>
    </FigureFrame>
  )
}

function plain(runs: string | TextRun[]) {
  if (typeof runs === 'string') return runs
  return runs.map((run) => (typeof run === 'string' ? run : run.text)).join('')
}

function CarouselBlock({
  block,
  onPath,
}: {
  block: Extract<EditorialBlock, { type: 'carousel' }>
  onPath: (path: string) => void
}) {
  const [index, setIndex] = useState(0)
  const count = block.slides.length
  const slide = block.slides[index]

  function go(next: number) {
    setIndex((next + count) % count)
  }

  const position = `Image ${index + 1} sur ${count}`
  const captionText = plain(slide.caption)
  const creditText = slide.credit ? plain(slide.credit) : ''

  return (
    <div role="region" aria-roledescription="carrousel" aria-label="Visuels" className="bg-[rgb(var(--color-background-warm))]">
      <figure className="px-4 pt-4">
        <div className="relative h-[220px] overflow-hidden">
          {block.slides.map((item, i) => (
            <span
              key={item.label}
              aria-hidden={i === index ? undefined : true}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Photo src={item.src} alt="" fit="contain" />
            </span>
          ))}
        </div>
        <figcaption className="px-6 pb-2 pt-4 text-center">
          <div className="relative h-[52px]">
            {block.slides.map((item, i) => {
              const active = i === index
              return (
                <div
                  key={item.label}
                  aria-hidden={active ? undefined : true}
                  inert={active ? undefined : true}
                  className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  <p className={`${typography.uiCaption} line-clamp-2`}>
                    <InlineText runs={item.caption} onPath={onPath} tone="text" />
                  </p>
                  {item.credit ? (
                    <p className={`${typography.uiCredit} mt-1 uppercase text-[rgb(var(--color-text-secondary))]`}>
                      <InlineText runs={item.credit} onPath={onPath} tone="text" />
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </figcaption>
      </figure>
      {count > 1 ? (
        <div className="flex items-center justify-center pb-2">
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => go(index - 1)}
            className={`grid size-11 place-items-center ${focusRing}`}
          >
            <IconChevron direction="left" className="size-6" />
          </button>
          <p className={`${typography.uiCaption} min-w-14 text-center tabular-nums`} aria-hidden>
            {index + 1} / {count}
          </p>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {[position, captionText, creditText]
              .filter(Boolean)
              .map((part) => part.replace(/[.\s]+$/, ''))
              .join('. ')}
          </p>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => go(index + 1)}
            className={`grid size-11 place-items-center ${focusRing}`}
          >
            <IconChevron direction="right" className="size-6" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

function BodyBlock({ block, onPath }: { block: EditorialBlock; onPath: (path: string) => void }) {
  if (block.type === 'heading') {
    return <h2 className={typography.heading}>{block.text}</h2>
  }

  if (block.type === 'paragraph') {
    return (
      <p className={typography.reading}>
        <InlineText runs={block.text} onPath={onPath} />
      </p>
    )
  }

  if (block.type === 'quote') {
    return <Quote text={block.text} attribution={block.attribution} />
  }

  if (block.type === 'pair') return <PairBlock block={block} onPath={onPath} />
  if (block.type === 'video') return <VideoBlock block={block} onPath={onPath} />
  if (block.type === 'audio') return <AudioBlock block={block} onPath={onPath} />
  if (block.type === 'carousel') return <CarouselBlock block={block} onPath={onPath} />

  return (
    <FigureFrame caption={block.caption} credit={block.credit} onPath={onPath}>
      <div className="h-[294px] overflow-hidden bg-[rgb(var(--color-text))]">
        <Photo src={block.src} alt="" />
      </div>
    </FigureFrame>
  )
}

function CollectionDocuments({ item, onOpen }: { item: CollectionCard; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="hit flex w-full items-start gap-3 bg-collections text-left text-[rgb(var(--color-background-warm))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-accent-sand))]"
    >
      <img src={item.image} alt="" className="w-20 shrink-0 self-stretch object-cover" />
      <span className="flex min-w-0 flex-1 flex-col pb-2 pr-3 pt-3">
        <span className={`${typography.uiCategory} text-[rgb(var(--color-accent-clay))]`}>Collection à voir</span>
        <span className={`${typography.cardTitleCompact} hit-title mt-1`}>{item.title}</span>
        <span className={`${typography.editorialSecondary} -mt-1`}>{item.documents}</span>
      </span>
    </button>
  )
}

function ReadAlso({ item, onOpen }: { item: Suggestion; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`hit flex w-full min-h-20 items-start gap-3 bg-[rgb(var(--color-background-warm))] text-left ${focusRing}`}
    >
      <img src={RELATED_IMAGES[0]} alt="" className="w-20 shrink-0 self-stretch object-cover" />
      <span className="flex min-w-0 flex-1 flex-col gap-1 py-4 pr-3">
        <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>À lire aussi</span>
        <span className={`${typography.cardTitleCompact} hit-title`}>{item.title}</span>
      </span>
    </button>
  )
}

function RelatedRail({ items }: { items: AroundItem[] }) {
  const row = useRef<HTMLDivElement>(null)
  if (items.length === 0) return null

  return (
    <section className="flex flex-col gap-6 bg-[rgb(var(--color-background-warm))] px-6 pb-10 pt-10">
      <div className="flex items-center justify-between gap-2">
        <h2 className={typography.heading}>Autour de cet article</h2>
        {items.length > 1 ? (
          <SliderArrows
            label="Autour de cet article"
            onPrev={() => scrollRow(row.current, -1)}
            onNext={() => scrollRow(row.current, 1)}
          />
        ) : null}
      </div>
      <div
        ref={row}
        data-h-scroller="true"
        className="scrollbar-hidden -mr-6 flex gap-8 overflow-x-auto"
      >
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={item.open}
            className={`hit flex w-60 shrink-0 flex-col gap-3 text-left ${focusRing}`}
          >
            <img
              src={RELATED_IMAGES[index % RELATED_IMAGES.length]}
              alt=""
              className="h-60 w-full object-cover"
            />
            <span className="flex flex-col gap-2">
              <span className={`${typography.cardTitleCompact} hit-title`}>{item.title}</span>
              <span className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>
                {item.label}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

/**
 * Gabarit de lecture habillé.
 * H1 dans le bandeau crème, chapô sous l'image, modules du corps, tags, rebond.
 */
export function EditorialArticle({
  onNavigate,
  onPath,
  crumbs,
  article = EDITORIAL_ARTICLE,
}: EditorialArticleProps) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const chapters = groupChapters(article.blocks)
  const anchor = article.blocks.findIndex((block) => block.type === 'pair' || block.type === 'figure')
  const inline = anchor >= 0 ? article.lireAussi : undefined
  const readAlsoIndex =
    article.slug === 'titre-de-l-article' && article.blocks[anchor + 1]?.type === 'paragraph'
      ? anchor + 1
      : anchor
  const collection = article.collection ? findCollectionCard(article.collection) : undefined
  const lastParagraph = article.blocks.findLastIndex((block) => block.type === 'paragraph')
  const seen = new Set<string>([article.title, ...article.suggestions.map((item) => item.title)])
  const around: AroundItem[] = [
    ...article.suggestions.map((item) => ({
      title: item.title,
      label: suggestionSpace(item.screen),
      open: () => onNavigate(item.screen),
    })),
    ...articlesSharingTags(
      article.espace,
      article.tags.map((tag) => tag.label),
    )
      .filter((card) => {
        if (seen.has(card.title)) return false
        seen.add(card.title)
        return true
      })
      .map((card) => ({
        title: card.title,
        label: SPACE_NAME[article.espace] ?? '',
        open: () => onPath(gabaritPath(article.espace)),
      })),
  ]
  const footerTags = [...article.tags, ...(article.rebonds ?? [])]
  let cursor = 0

  return (
    <div className="bg-surface text-text">
      <SiteHeader go={onNavigate} onLogo={() => onNavigate('home')} />

      <article>
        <header className="flex flex-col gap-4 bg-[rgb(var(--color-surface-emphasis))] p-6">
          {crumbs.length > 0 ? (
            <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((crumb, index) => (
                <span key={crumb.label} className="inline-flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className={`${typography.uiCaption} text-[rgb(var(--color-text-secondary))]`}>
                      ›
                    </span>
                  ) : null}
                  {crumb.to ? (
                    <button
                      type="button"
                      onClick={() => onPath(crumb.to!)}
                      className={
                        index === 0
                          ? `${typography.uiCategory} text-[rgb(var(--color-text-brand))] ${focusRing}`
                          : `${typography.uiCaption} text-[rgb(var(--color-text-brand))] ${focusRing}`
                      }
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span
                      className={
                        index === 0
                          ? `${typography.uiCategory} text-[rgb(var(--color-text-brand))]`
                          : `${typography.uiCaption} text-[rgb(var(--color-text-brand))]`
                      }
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
          <h1 className={typography.articleTitle}>{article.title}</h1>
          {article.documentsUrl ? (
            <a
              href={article.documentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${typography.footerTitle} hit inline-flex min-h-11 items-center gap-2 self-start text-text ${focusRing}`}
            >
              <span aria-hidden className="grid size-[28px] shrink-0 place-items-center bg-action">
                <IconCollections className="h-[14px] w-auto text-[rgb(var(--color-background-warm))]" />
              </span>
              <span className="hit-title inline-flex items-center gap-2">
                Voir les documents
                <span aria-hidden>↗</span>
              </span>
              <span className="sr-only">, nouvel onglet</span>
            </a>
          ) : null}
          <p className={`${typography.uiCaption} text-[rgb(var(--color-text-secondary))]`}>
            {authorLine(article.author)}
          </p>
        </header>

        <figure className="bg-[rgb(var(--color-background-warm))]">
          <div className="h-[220px] overflow-hidden bg-[rgb(var(--color-text))]">
            <Photo src={article.heroSrc} alt="" />
          </div>
        </figure>

        <div className="flex flex-col gap-10 px-6 py-10">
          <p className={typography.editorialIntro}>{article.chapo}</p>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="flex flex-col gap-6">
              {chapter.map((block) => {
                const index = cursor
                cursor += 1
                return (
                  <div key={`${block.type}-${index}`} className="flex flex-col gap-6">
                    <BodyBlock block={block} onPath={onPath} />
                    {inline && index === readAlsoIndex ? (
                      <ReadAlso item={inline} onOpen={() => onNavigate(inline.screen)} />
                    ) : null}
                    {collection && index === lastParagraph ? (
                      <CollectionDocuments item={collection} onOpen={() => onPath('/collections')} />
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <ArticleClose />

        {article.sources?.length ? (
          <section className="px-6 pt-6 pb-12">
            <h2 className="sr-only">Sources et références</h2>
            <div className="border border-[rgb(var(--color-border))] p-4">
              <button
                type="button"
                aria-expanded={sourcesOpen}
                onClick={() => setSourcesOpen((open) => !open)}
                className={`flex w-full items-center gap-4 text-left ${focusRing}`}
              >
                <span className={`${typography.uiCategory} flex-1 text-[rgb(var(--color-text-brand))]`}>
                  Sources & références
                </span>
                <span className="grid size-11 place-items-center bg-[rgb(var(--color-background-warm))]">
                  <img
                    src={plusIcon}
                    alt=""
                    className={sourcesOpen ? 'rotate-45' : undefined}
                  />
                </span>
              </button>
              {sourcesOpen ? (
                <ul className="mt-4">
                  {article.sources.map((source, index) => (
                    <li
                      key={index}
                      className="border-t border-[rgb(var(--color-border))] py-4 last:pb-0"
                    >
                      <p className={typography.footerLink}>
                        <InlineText runs={source.title} onPath={onPath} tone="text" />
                      </p>
                      {source.detail ? (
                        <p className={`${typography.uiCaption} mt-1 text-[rgb(var(--color-text-secondary))]`}>
                          <InlineText runs={source.detail} onPath={onPath} tone="text" />
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ) : null}

        {footerTags.length > 0 ? (
          <section className="border-t border-[rgb(var(--color-border))] px-6 py-6">
            <h2 className={`${typography.uiCategory} text-text`}>Tags</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {footerTags.map((tag) => {
                const className = `${typography.uiCaption} inline-flex items-center rounded-pill border border-[rgb(var(--color-border))] px-3 py-2 ${focusRing}`
                return (
                  <li key={tag.label}>
                    {tag.href ? (
                      <button type="button" onClick={() => onPath(tag.href!)} className={`chip chip-line ${className}`}>
                        {tag.label}
                      </button>
                    ) : (
                      <span className={className}>{tag.label}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}
      </article>

      <RelatedRail items={around} />
      <SiteFooter go={onNavigate} />
    </div>
  )
}
