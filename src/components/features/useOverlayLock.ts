import { useEffect, useRef, useState } from 'react'

/** Bloque la page derrière un panneau plein écran et ferme le panneau du dessus avec Échap. */
export function useOverlayLock(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const dialogRef = useRef<HTMLDivElement>(null)
  const [root, setRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    setRoot(document.querySelector<HTMLElement>('[data-overlay-root]'))
  }, [open])

  useEffect(() => {
    if (!open || !root) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const dialog = dialogRef.current
    const locked: HTMLElement[] = []

    const mark = (el: HTMLElement | null) => {
      if (!el || el === dialog || el.hasAttribute('inert')) return
      el.setAttribute('inert', '')
      locked.push(el)
    }

    const pageScroll = root.querySelector<HTMLElement>(':scope > [data-page-scroll]')
    if (pageScroll) {
      mark(pageScroll)
    } else {
      for (const child of Array.from(root.children)) {
        if (child instanceof HTMLElement) mark(child)
      }
    }

    const lockDocument = root.dataset.overlayRoot === 'page'
    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    }
    if (lockDocument) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.width = '100%'
    }

    dialog?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const dialogs = [...document.querySelectorAll<HTMLElement>('[role="dialog"]')]
      const top = dialogs.reduce<HTMLElement | null>((best, el) => {
        if (!best) return el
        const z = Number(getComputedStyle(el).zIndex) || 0
        const bestZ = Number(getComputedStyle(best).zIndex) || 0
        return z >= bestZ ? el : best
      }, null)
      if (top !== dialog) return
      onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      for (const el of locked) el.removeAttribute('inert')
      if (lockDocument) {
        html.style.overflow = previousHtmlOverflow
        body.style.overflow = previousBody.overflow
        body.style.position = previousBody.position
        body.style.top = previousBody.top
        body.style.width = previousBody.width
        window.scrollTo(0, scrollY)
      }
      previous?.focus()
    }
  }, [open, root])

  return { dialogRef, root, fixed: root?.dataset.overlayRoot === 'page' }
}
