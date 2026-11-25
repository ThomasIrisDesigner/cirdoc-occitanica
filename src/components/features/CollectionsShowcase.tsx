import { useEffect, useState } from 'react'

import introCadre from '@/assets/home/intro-cadre.jpg'
import introFigures from '@/assets/home/intro-figures.jpg'
import introMusiques from '@/assets/home/intro-musiques.jpg'
import feteVisual from '@/assets/home/une-b.png'
import { IconCollections } from '@/components/features/HomeIcons'
import { typography } from '@/styles/typography'

const FRAMES = [feteVisual, introMusiques, introFigures, introCadre]
const FRAME_MS = 7000

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function IconPause() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <path d="M5.25 3.5v9M10.75 3.5v9" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <path d="M6.2 4.1v7.8L12.2 8 6.2 4.1Z" fill="currentColor" />
    </svg>
  )
}

export function CollectionsShowcase({
  caption,
  onOpen,
}: {
  caption: string
  onOpen: () => void
}) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const moving = !reduced && FRAMES.length > 1

  useEffect(() => {
    if (!moving || paused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % FRAMES.length)
    }, FRAME_MS)
    return () => window.clearInterval(id)
  }, [moving, paused])

  return (
    <div className="grid bg-collections p-4">
      <button
        type="button"
        onClick={onOpen}
        className="hit col-start-1 row-start-1 flex w-full flex-col gap-4 text-left text-[rgb(var(--color-background-warm))]"
      >
        <span className="relative block aspect-square w-full overflow-hidden">
          {FRAMES.map((src, frame) => (
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
            <IconCollections className="h-6 w-auto text-[rgb(var(--color-action))]" />
          </span>
        </span>
        <span className="flex flex-col gap-3 pb-2">
          <span className={`${typography.heading} hit-title`}>Voir les collections</span>
          <span className={typography.editorialSecondary}>{caption}</span>
        </span>
      </button>
      {moving ? (
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? 'Relancer le défilement des visuels' : 'Mettre en pause le défilement des visuels'}
          onClick={() => setPaused((current) => !current)}
          className="z-10 col-start-1 row-start-1 mr-2 mt-[calc(100%-40px)] grid size-8 place-items-center self-start justify-self-end bg-[rgb(var(--color-text)/0.8)] text-[rgb(var(--color-background-warm))] focus-ring-warm"
        >
          {paused ? <IconPlay /> : <IconPause />}
        </button>
      ) : null}
    </div>
  )
}
