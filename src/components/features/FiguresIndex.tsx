import { useId, useRef, useState } from 'react'

import { FIGURES } from '@/data/figures'
import { SliderArrows } from '@/components/features/HomeView'
import { typography } from '@/styles/typography'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

type Person = { name: string; image?: string }

function groupByLetter() {
  const groups = new Map<string, Person[]>()
  for (const figure of FIGURES) {
    const person: Person = {
      name: figure.name,
      image: 'image' in figure ? figure.image : undefined,
    }
    const list = groups.get(figure.letter)
    if (list) list.push(person)
    else groups.set(figure.letter, [person])
  }
  return groups
}

const GROUPS = groupByLetter()

function scrollLetters(row: HTMLDivElement | null, direction: -1 | 1) {
  if (!row) return
  row.scrollBy({ left: direction * Math.round(row.clientWidth * 0.72), behavior: 'smooth' })
}

export function FiguresIndex({ onOpen }: { onOpen: () => void }) {
  const headingId = useId()
  const lettersRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  const names = open ? GROUPS.get(open) : undefined

  return (
    <section aria-labelledby={headingId} className="px-4 pt-8 pb-6">
      <div className="flex flex-col gap-6 bg-[rgb(var(--color-surface-emphasis))] px-4 pb-4 pt-6">
        <div className="flex flex-col gap-3">
          <p className={`${typography.uiCategory} text-[rgb(var(--color-text-brand))]`}>Index</p>
          <div className="flex items-center justify-between">
            <h2 id={headingId} className={typography.heading}>
              Toutes les figures
            </h2>
            <SliderArrows
              label="Toutes les figures"
              onPrev={() => scrollLetters(lettersRef.current, -1)}
              onNext={() => scrollLetters(lettersRef.current, 1)}
            />
          </div>
        </div>
        <div
          ref={lettersRef}
          data-h-scroller="true"
          className="scrollbar-hidden -mr-4 mb-4 flex gap-2 overflow-x-auto pr-4"
        >
          {LETTERS.map((letter) => {
            const available = GROUPS.has(letter)
            const active = open === letter
            if (!available) {
              return (
                <span
                  key={letter}
                  className={`${typography.cardTitleCompact} grid size-10 shrink-0 place-items-center text-[rgb(var(--color-text-secondary))]`}
                >
                  {letter}
                </span>
              )
            }
            return (
              <button
                key={letter}
                type="button"
                aria-pressed={active}
                aria-expanded={active}
                onClick={() => setOpen(active ? null : letter)}
                className={`${typography.cardTitleCompact} chip chip-warm grid size-10 shrink-0 place-items-center rounded-pill focus-ring ${
                  active
                    ? 'bg-action text-[rgb(var(--color-action-content))]'
                    : 'bg-[rgb(var(--color-background-warm))] text-text'
                }`}
              >
                {letter}
              </button>
            )
          })}
        </div>
        {names ? (
          <ul className="-mx-4 flex flex-col">
            {names.map((person) => (
              <li key={person.name}>
                <button
                  type="button"
                  onClick={onOpen}
                  className="group hit flex w-full items-center gap-4 px-4 py-2 text-left transition-colors hover:bg-[rgb(var(--color-background-warm))] active:bg-[rgb(var(--color-background-warm))] focus-ring"
                >
                  {person.image ? (
                    <img
                      src={person.image}
                      alt=""
                      className="size-12 shrink-0 rounded-control object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="size-12 shrink-0 rounded-control bg-[rgb(var(--color-background-warm))] group-hover:bg-surface group-active:bg-surface"
                    />
                  )}
                  <span className={`${typography.reading} hit-title`}>{person.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
