import * as React from 'react'
import { LogOut, Monitor, Smartphone } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { PROJECT_DISPLAY_NAME, PROJECT_TYPE } from '@/config/project'
import { logout } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/useMediaQuery'

type ViewMode = 'mobile' | 'desktop'

const HEADER_HEIGHT = 32
const MOBILE_MOCKUP_W = 390
const MOBILE_MOCKUP_H = 844
const MOBILE_PADDING = 32

export function PrototypeLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [mode, setMode] = React.useState<ViewMode>(
    PROJECT_TYPE === 'desktop' ? 'desktop' : 'mobile'
  )
  const [mobileScale, setMobileScale] = React.useState(1)

  const allowSwitch = PROJECT_TYPE === 'responsive'
  const effectiveMode: ViewMode = isDesktop
    ? allowSwitch
      ? mode
      : PROJECT_TYPE === 'desktop'
        ? 'desktop'
        : 'mobile'
    : 'desktop'

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

  return (
    <div className="min-h-dvh bg-primary text-surface">
      <div className="fixed inset-x-0 top-0 z-50 h-8 border-b border-surface/10 bg-primary text-surface">
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Link to="/prototype" className="truncate text-xs text-surface/70">
              Thomas Iris. Designer — {PROJECT_DISPLAY_NAME}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className={cn('hidden md:flex items-center gap-2', !allowSwitch && 'hidden')}>
              <button
                type="button"
                aria-label="Vue mobile"
                onClick={() => setMode('mobile')}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md bg-surface/10 text-surface/80 transition-colors hover:bg-surface/15 hover:text-surface',
                  effectiveMode === 'mobile' && 'bg-secondary text-surface'
                )}
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Vue plein écran"
                onClick={() => setMode('desktop')}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md bg-surface/10 text-surface/80 transition-colors hover:bg-surface/15 hover:text-surface',
                  effectiveMode === 'desktop' && 'bg-secondary text-surface'
                )}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>

            <Link
              to="/design-system"
              className="text-xs text-surface/70 hover:text-surface"
            >
              DS
            </Link>

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

      <div className="pt-8">
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
                  <div className="h-full w-full overflow-y-auto">{children}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[calc(100dvh-32px)] bg-background text-text">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

