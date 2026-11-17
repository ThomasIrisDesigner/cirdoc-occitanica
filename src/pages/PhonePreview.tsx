import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Link } from 'react-router-dom'

import { typography } from '@/styles/typography'

function isLocalHost(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.endsWith('.local') ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  )
}

function prototypeRoot() {
  return new URL(import.meta.env.BASE_URL, window.location.origin).href
}

export function PhonePreview() {
  const [url, setUrl] = useState('')
  const [svg, setSvg] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function resolveUrl() {
      if (!isLocalHost(window.location.hostname)) return prototypeRoot()
      try {
        const response = await fetch('/__lan.json')
        if (!response.ok) return prototypeRoot()
        const data = (await response.json()) as { url?: string }
        return data.url || prototypeRoot()
      } catch {
        return prototypeRoot()
      }
    }

    resolveUrl().then(async (next) => {
      const markup = await QRCode.toString(next, {
        type: 'svg',
        margin: 2,
        errorCorrectionLevel: 'M',
        color: { dark: '#000000', light: '#ffffff' },
      })
      if (cancelled) return
      setUrl(next)
      setSvg(markup.replaceAll('#000000', 'currentColor').replaceAll('#ffffff', 'none'))
    })

    return () => {
      cancelled = true
    }
  }, [])

  async function copy() {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-32px)] w-full max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid size-72 place-items-center bg-surface text-text shadow-sm [&_svg]:size-64">
        {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null}
      </div>

      {url ? (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="font-ui text-sm text-text">{url}</p>
          <button type="button" onClick={copy} className={`${typography.uiLabel} text-[rgb(var(--color-text-brand))]`}>
            {copied ? 'Adresse copiée' : 'Copier l’adresse'}
          </button>
        </div>
      ) : null}

      <Link to="/" className={`${typography.pageSubtitle} mt-10 hover:text-text`}>
        Retour au prototype
      </Link>
    </div>
  )
}
