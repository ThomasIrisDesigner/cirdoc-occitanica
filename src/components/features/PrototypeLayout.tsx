import * as React from 'react'
import { LogOut, Network, Smartphone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { PROJECT_DISPLAY_NAME, PROJECT_TYPE } from '@/config/project'
import { logout } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/useMediaQuery'

type ViewMode = 'mobile' | 'desktop'

const HEADER_HEIGHT = 32
const MOBILE_MOCKUP_W = 390
const MOBILE_MOCKUP_H = 844
const MOBILE_PADDING = 32
const VIEW_MODE_STORAGE_KEY = 'proto-view-mode'

function readStoredMode(): ViewMode | null {
  try {
    const v = sessionStorage.getItem(VIEW_MODE_STORAGE_KEY)
    return v === 'mobile' || v === 'desktop' ? v : null
  } catch {
    return null
  }
}

export function PrototypeLayout({
  children,
  alwaysDesktop = false,
}: {
  children: React.ReactNode
  alwaysDesktop?: boolean
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [mode, setMode] = React.useState<ViewMode>(() => {
    const stored = readStoredMode()
    if (stored) return stored
    return PROJECT_TYPE === 'desktop' ? 'desktop' : 'mobile'
  })
  const [mobileScale, setMobileScale] = React.useState(1)

  const allowSwitch = PROJECT_TYPE === 'responsive'
  const effectiveMode: ViewMode = alwaysDesktop
    ? 'desktop'
    : isDesktop
      ? allowSwitch
        ? mode
        : PROJECT_TYPE === 'desktop'
          ? 'desktop'
          : 'mobile'
      : 'desktop'

  const onPrototype = pathname === '/prototype'
  const mobileActive = onPrototype && effectiveMode === 'mobile'
  const sitemapActive = pathname === '/sitemap'
  // Consultation sur téléphone : prototype plein écran, pas le mockup desktop
  const isRealMobileView = !isDesktop && effectiveMode === 'desktop'

  function selectView(next: ViewMode) {
    setMode(next)
    try {
      sessionStorage.setItem(VIEW_MODE_STORAGE_KEY, next)
    } catch {
      // ignore
    }
    if (!onPrototype) {
      navigate('/prototype')
    }
  }

  React.useEffect(() => {
    function recomputeScale() {
      const scale = Math.min(
        (window.innerHeight - HEADER_HEIGHT - MOBILE_PADDING * 2) /
          MOBILE_MOCKUP_H,
        (window.innerWidth - MOBILE_PADDING) / MOBILE_MOCKUP_W,
        1
      )
      setMobileScale(Number.isFinite(scale) ? Math.max(scale, 0) : 1)
    }

    recomputeScale()
    window.addEventListener('resize', recomputeScale)
    return () => window.removeEventListener('resize', recomputeScale)
  }, [])

  // Drag souris vertical sur le mockup mobile (simule le swipe)
  const mobileScrollRef = React.useRef<HTMLDivElement | null>(null)
  const dragDownRef = React.useRef(false)
  const dragStartYRef = React.useRef(0)
  const dragStartScrollRef = React.useRef(0)
  const dragMovedRef = React.useRef(false)

  return (
    <div className="min-h-dvh bg-primary text-surface">
      <div
        className={cn(
          'z-50 h-8 border-b border-surface/10 bg-primary text-surface',
          isRealMobileView ? 'relative' : 'fixed inset-x-0 top-0'
        )}
      >
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Link to="/prototype" className="truncate text-xs text-surface/70">
              Thomas Iris. Designer — {PROJECT_DISPLAY_NAME}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isDesktop && (
              <div className="flex items-center gap-2">
                <Link
                  to="/sitemap"
                  aria-label="Arborescence du site"
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-md bg-surface/10 text-surface/80 transition-colors hover:bg-surface/15 hover:text-surface',
                    sitemapActive && 'bg-secondary text-surface'
                  )}
                >
                  <Network className="h-4 w-4" />
                </Link>
                {allowSwitch && (
                  <button
                    type="button"
                    aria-label="Vue mobile"
                    onClick={() => selectView('mobile')}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-md bg-surface/10 text-surface/80 transition-colors hover:bg-surface/15 hover:text-surface',
                      mobileActive && 'bg-secondary text-surface'
                    )}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            <a
              href="/login"
              aria-label="Déconnexion"
              onClick={(e) => {
                e.preventDefault()
                logout()
                navigate('/login', { replace: true })
              }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-surface/70 transition-colors hover:bg-surface/10 hover:text-surface"
            >
              <LogOut className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className={isRealMobileView ? undefined : 'pt-8'}>
        {effectiveMode === 'mobile' ? (
          <div className="mx-auto flex h-[calc(100dvh-32px)] w-full items-center justify-center px-4 py-8">
            <div
              style={{
                width: MOBILE_MOCKUP_W * mobileScale,
                height: MOBILE_MOCKUP_H * mobileScale,
              }}
              className="flex-none"
            >
              <div
                className="origin-top"
                style={{
                  width: MOBILE_MOCKUP_W,
                  height: MOBILE_MOCKUP_H,
                  transformOrigin: 'top center',
                  transform: `scale(${mobileScale})`,
                }}
              >
                <div className="h-[844px] w-[390px] overflow-hidden rounded-[40px] bg-surface">
                  <div
                    ref={mobileScrollRef}
                    className="scrollbar-hidden h-full w-full overflow-y-auto md:cursor-grab"
                    onPointerDown={(e) => {
                      if (e.pointerType !== 'mouse' || e.button !== 0) return
                      const target = e.target as HTMLElement | null
                      if (target && typeof target.closest === 'function') {
                        if (target.closest('[data-h-scroller]')) return
                      }
                      const el = mobileScrollRef.current
                      if (!el) return
                      dragDownRef.current = true
                      dragMovedRef.current = false
                      dragStartYRef.current = e.clientY
                      dragStartScrollRef.current = el.scrollTop
                    }}
                    onPointerMove={(e) => {
                      if (!dragDownRef.current) return
                      if (e.pointerType !== 'mouse') return
                      const el = mobileScrollRef.current
                      if (!el) return
                      const dy = e.clientY - dragStartYRef.current
                      if (Math.abs(dy) > 5) dragMovedRef.current = true
                      if (dragMovedRef.current) {
                        el.scrollTop = dragStartScrollRef.current - dy
                      }
                    }}
                    onPointerUp={() => { dragDownRef.current = false }}
                    onPointerLeave={() => { dragDownRef.current = false }}
                    onPointerCancel={() => { dragDownRef.current = false }}
                    onClickCapture={(e) => {
                      if (dragMovedRef.current) {
                        e.stopPropagation()
                        e.preventDefault()
                        dragMovedRef.current = false
                      }
                    }}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'bg-background text-text',
              isRealMobileView ? 'min-h-dvh' : 'min-h-[calc(100dvh-32px)]'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

