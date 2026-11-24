import { useId } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

import { IconCollections, IconSearch } from '@/components/features/HomeIcons'
import { LanguagePair } from '@/components/features/LanguagePair'
import { Logo } from '@/components/features/Logo'
import { useOverlayLock } from '@/components/features/useOverlayLock'
import type { EspaceKey, Screen, TerritoireKey } from '@/lib/prototypeRoutes'
import { typography } from '@/styles/typography'

const ESPACES: Array<{ label: string; key: EspaceKey }> = [
  { label: 'Culture vivante', key: 'fetes' },
  { label: 'Littérature', key: 'langue' },
  { label: "Figures d'oc", key: 'portraits' },
  { label: 'Musiques', key: 'musique' },
  { label: 'Histoires de…', key: 'histoires' },
  { label: 'Plein cadre', key: 'cadre' },
]

const TERRITOIRES: Array<{ label: string; key: TerritoireKey | null }> = [
  { label: 'Gascogne', key: 'gascogne' },
  { label: 'Languedoc', key: 'languedoc' },
  { label: 'Pyrénées', key: 'pyrenees' },
  { label: 'Provence', key: 'provence' },
  { label: 'Limousin', key: null },
  { label: 'Périgord', key: null },
  { label: "Val d'Aran", key: null },
  { label: 'Dauphiné', key: null },
]

const rowFocus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[rgb(var(--color-focus))]'
const currentItem = 'text-[rgb(var(--color-action))]'

function GroupRule() {
  return <div className="mx-6 my-4 h-px bg-[rgb(var(--color-border-strong))]" aria-hidden />
}

export function MenuPanel({
  open,
  onClose,
  onSearch,
  onLogo,
  go,
}: {
  open: boolean
  onClose: () => void
  onSearch: () => void
  onLogo: () => void
  go: (screen: Screen) => void
}) {
  const titleId = useId()
  const { pathname } = useLocation()
  const { dialogRef, root, fixed } = useOverlayLock(open, onClose)
  const collectionsCurrent = pathname === '/collections' || pathname.startsWith('/collections/')

  if (!open || !root) return null

  const logo = <Logo />

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
        Menu
      </h1>
      <div className="flex shrink-0 touch-none items-center justify-between px-4 py-3">
        <button type="button" onClick={onLogo} aria-label="Accueil" className="text-left">
          {logo}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Rechercher"
            onClick={onSearch}
            className="chip-icon grid size-12 place-items-center rounded-pill border border-border"
          >
            <IconSearch className="size-[26px]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="chip-icon grid size-12 place-items-center rounded-pill border border-[rgb(var(--color-action))]"
          >
            <svg viewBox="0 0 16 16" className="size-[22px]" fill="none" aria-hidden>
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
            </svg>
          </button>
          <LanguagePair />
        </div>
      </div>

      <div className="scrollbar-hidden min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-none pb-8">
        <p className={`${typography.uiCategory} px-6 pb-2 pt-6 text-[rgb(var(--color-text-secondary))]`}>Les espaces</p>
        <ul>
          {ESPACES.map((espace) => {
            const current = pathname === `/espaces/${espace.key}` || pathname.startsWith(`/espaces/${espace.key}/`)
            return (
            <li key={espace.key}>
              <button
                type="button"
                onClick={() => go(`espace-${espace.key}`)}
                aria-current={current ? 'page' : undefined}
                className={`${typography.menuItem} flex w-full items-center px-6 py-4 text-left active:bg-[rgb(var(--color-surface-emphasis))] ${rowFocus} ${current ? currentItem : ''}`}
              >
                {espace.label}
              </button>
            </li>
            )
          })}
        </ul>

        <GroupRule />

        <p className={`${typography.uiCategory} px-6 pb-2 pt-4 text-[rgb(var(--color-text-secondary))]`}>Les documents</p>
        <button
          type="button"
          onClick={() => go('collections')}
          aria-current={collectionsCurrent ? 'page' : undefined}
          className={`${typography.menuItem} flex w-full items-center gap-2 px-6 py-4 text-left active:bg-[rgb(var(--color-surface-emphasis))] ${rowFocus} ${collectionsCurrent ? currentItem : ''}`}
        >
          <span
            aria-hidden
            className={`grid size-[28px] shrink-0 place-items-center ${collectionsCurrent ? 'bg-action' : 'bg-collections'}`}
          >
            <IconCollections className="h-[14px] w-auto text-[rgb(var(--color-background-warm))]" />
          </span>
          Collections
        </button>

        <GroupRule />

        <p className={`${typography.uiCategory} px-6 pb-2 pt-4 text-[rgb(var(--color-text-secondary))]`}>Territoires</p>
        <ul>
          {TERRITOIRES.map((territoire) => {
            const key = territoire.key
            return (
            <li key={territoire.label}>
              {key ? (
                <button
                  type="button"
                  onClick={() => go(`territoire-${key}`)}
                  aria-current={pathname === `/territoires/${key}` ? 'page' : undefined}
                  className={`${typography.menuItemQuiet} flex w-full items-center px-6 py-2 text-left active:bg-[rgb(var(--color-surface-emphasis))] ${rowFocus} ${pathname === `/territoires/${key}` ? currentItem : ''}`}
                >
                  {territoire.label}
                </button>
              ) : (
                <p className={`${typography.menuItemQuiet} px-6 py-2 text-[rgb(var(--color-text-secondary))]`}>
                  {territoire.label}
                </p>
              )}
            </li>
            )
          })}
        </ul>
      </div>
    </div>,
    root,
  )
}
