import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'

import { IconMenu, IconSearch } from '@/components/features/HomeIcons'
import { LanguagePair } from '@/components/features/LanguagePair'
import { Logo } from '@/components/features/Logo'
import { useOverlayLock } from '@/components/features/useOverlayLock'
import { GALLICA_ADVANCED, gallicaResultsUrl } from '@/lib/gallica'
import { typography } from '@/styles/typography'

const RESOURCES = [
  {
    name: 'La Maleta',
    description: 'Ressources pédagogiques',
    href: 'https://maleta.occitanica.eu/',
  },
  {
    name: 'Campus',
    description: 'Formations en ligne',
    href: 'https://www.occitanica.eu/campus',
  },
  {
    name: 'IEO',
    description: "Institut d'estudis occitans",
    href: 'https://ieo-oc.org/',
  },
] as const

export function SearchField({
  id,
  labelledBy,
  placeholder,
  value,
  onChange,
  submitLabel,
  inputRef,
}: {
  id: string
  labelledBy: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  submitLabel: string
  inputRef?: RefObject<HTMLInputElement | null>
}) {
  return (
    <div className="flex h-12 items-center overflow-hidden rounded-pill border border-border bg-surface text-text focus-within:border-[rgb(var(--color-focus))] focus-within:text-[rgb(var(--color-focus))]">
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        aria-labelledby={labelledBy}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent pl-4 type-field text-text outline-none placeholder:text-[rgb(var(--color-text-secondary))]"
      />
      <button type="submit" aria-label={submitLabel} className="grid h-full w-12 shrink-0 place-items-center">
        <IconSearch className="size-[var(--size-icon-search)]" />
      </button>
    </div>
  )
}

function ExternalMark() {
  return (
    <span aria-hidden className="text-[rgb(var(--color-text-brand))]">
      ↗
    </span>
  )
}

export function SearchPanel({
  open,
  onClose,
  onMenu,
}: {
  open: boolean
  onClose: () => void
  onMenu: () => void
}) {
  const titleId = useId()
  const articlesTitleId = useId()
  const collectionsTitleId = useId()
  const collectionsRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [articles, setArticles] = useState('')
  const [collections, setCollections] = useState('')
  const { dialogRef, root, fixed } = useOverlayLock(open, onClose)

  useEffect(() => {
    if (!open || pathname !== '/recherche') return
    setArticles(new URLSearchParams(search).get('q') ?? '')
  }, [open, pathname, search])

  if (!open || !root) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 z-40 flex touch-none flex-col overflow-hidden bg-[rgb(var(--color-background-warm))] text-text outline-none`}
    >
      <h1 id={titleId} className="sr-only">
        Recherche
      </h1>
      <div className="flex shrink-0 touch-none items-center justify-between px-4 py-3">
        <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="text-left">
          <Logo />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="chip-icon grid size-12 place-items-center rounded-pill border border-[rgb(var(--color-action))]"
          >
            <svg viewBox="0 0 16 16" className="size-[var(--size-icon-22)]" fill="none" aria-hidden>
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-haspopup="dialog"
            onClick={onMenu}
            className="chip-icon grid size-12 place-items-center rounded-pill border border-border"
          >
            <IconMenu className="h-[var(--size-icon-18)] w-auto" />
          </button>
          <LanguagePair />
        </div>
      </div>

      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-none px-6 pb-8">
        <section className="flex flex-col gap-4 py-6">
          <h2 id={articlesTitleId} className={typography.heading}>
            Rechercher un article
          </h2>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const term = articles.trim()
              if (!term) return
              onClose()
              navigate(`/recherche?q=${encodeURIComponent(term)}`)
            }}
          >
            <SearchField
              id={`${titleId}-articles`}
              labelledBy={articlesTitleId}
              placeholder="Que recherchez-vous ?"
              value={articles}
              onChange={setArticles}
              submitLabel="Lancer la recherche"
            />
          </form>
        </section>

        <div className="h-px bg-[rgb(var(--color-border))]" />

        <section className="flex flex-col py-6">
          <h2 id={collectionsTitleId} className={typography.heading}>
            Rechercher dans nos collections
          </h2>
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault()
              const term = collections.trim()
              if (!term) {
                collectionsRef.current?.focus()
                return
              }
              window.open(gallicaResultsUrl(term), '_blank', 'noopener,noreferrer')
            }}
          >
            <SearchField
              id={`${titleId}-collections`}
              labelledBy={collectionsTitleId}
              placeholder={"17\u00a0857 ressources numérisées"}
              value={collections}
              onChange={setCollections}
              submitLabel="Rechercher dans Gallica"
              inputRef={collectionsRef}
            />
          </form>
          <a
            href={GALLICA_ADVANCED}
            target="_blank"
            rel="noopener noreferrer"
            className="hit mt-2 inline-flex min-h-11 items-center gap-2 self-start focus-ring"
          >
            <span className={`${typography.footerTitle} hit-title`}>Recherche avancée</span>
            <ExternalMark />
            <span className="sr-only">, nouvel onglet</span>
          </a>
        </section>

        <div className="h-px bg-[rgb(var(--color-border))]" />

        <section className="flex flex-col gap-2 pt-6">
          <h2 className={typography.heading}>Nos autres ressources</h2>
          <ul>
            {RESOURCES.map((resource) => (
              <li key={resource.name} className="border-b border-[rgb(var(--color-border))] last:border-b-0">
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hit flex min-h-11 flex-col justify-center gap-1 py-3 focus-ring"
                >
                  <span className="flex items-center gap-2">
                    <span className={`${typography.footerTitle} hit-title`}>{resource.name}</span>
                    <ExternalMark />
                  </span>
                  <span className={`${typography.editorialSecondary} text-[rgb(var(--color-text-secondary))]`}>
                    {resource.description}
                  </span>
                  <span className="sr-only">, nouvel onglet</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>,
    root,
  )
}
