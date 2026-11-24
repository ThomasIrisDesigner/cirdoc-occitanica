import { useEffect, useState } from 'react'

import { IconDot } from '@/components/features/HomeIcons'
import { typography } from '@/styles/typography'

const LANG_STORAGE_KEY = 'occ-lang'

export function LanguagePair({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [lang, setLang] = useState<'fr' | 'oc'>(() => {
    try {
      return sessionStorage.getItem(LANG_STORAGE_KEY) === 'oc' ? 'oc' : 'fr'
    } catch {
      return 'fr'
    }
  })

  useEffect(() => {
    const sync = () => {
      try {
        setLang(sessionStorage.getItem(LANG_STORAGE_KEY) === 'oc' ? 'oc' : 'fr')
      } catch {
        // ignore
      }
    }
    window.addEventListener('occ-lang', sync)
    return () => window.removeEventListener('occ-lang', sync)
  }, [])

  function choose(next: 'fr' | 'oc') {
    setLang(next)
    try {
      sessionStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event('occ-lang'))
  }

  return (
    <div
      className={`flex h-12 items-stretch rounded-pill border px-1 ${
        tone === 'dark' ? 'border-[rgb(var(--color-accent-sand))]' : 'border-border'
      }`}
    >
      {(['fr', 'oc'] as const).map((code) => (
        <button key={code} type="button" onClick={() => choose(code)} className="chip-icon inline-flex items-center rounded-pill px-2" aria-pressed={lang === code}>
          {lang === code && <IconDot className="mr-1 size-1.5 text-[rgb(var(--color-action))]" />}
          <span className={lang === code ? typography.uiLangActive : typography.uiLangInactive}>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
