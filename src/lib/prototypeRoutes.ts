export const ESPACE_KEYS = ['langue', 'musique', 'fetes', 'portraits', 'scene'] as const
export type EspaceKey = (typeof ESPACE_KEYS)[number]

export const TERRITOIRE_KEYS = ['gascogne', 'languedoc', 'pyrenees', 'provence'] as const
export type TerritoireKey = (typeof TERRITOIRE_KEYS)[number]

export type Screen =
  | 'home'
  | 'menu'
  | 'collections'
  | 'article'
  | `espace-${EspaceKey}`
  | `territoire-${TerritoireKey}`

function isEspaceKey(value: string): value is EspaceKey {
  return (ESPACE_KEYS as readonly string[]).includes(value)
}

function isTerritoireKey(value: string): value is TerritoireKey {
  return (TERRITOIRE_KEYS as readonly string[]).includes(value)
}

export function pathForScreen(screen: Screen): string {
  if (screen === 'home') return '/'
  if (screen === 'menu') return '/menu'
  if (screen === 'collections') return '/collections'
  if (screen === 'article') return '/espaces/musique/boha'
  if (screen.startsWith('espace-')) return `/espaces/${screen.slice('espace-'.length)}`
  return `/territoires/${screen.slice('territoire-'.length)}`
}

export function screenFromPath(pathname: string): Screen | null {
  if (pathname === '/') return 'home'
  if (pathname === '/menu') return 'menu'
  if (pathname === '/collections') return 'collections'
  if (pathname === '/article') return 'article'

  const espace = pathname.match(/^\/espaces\/([^/]+)$/)
  if (espace && isEspaceKey(espace[1])) return `espace-${espace[1]}`

  const territoire = pathname.match(/^\/territoires\/([^/]+)$/)
  if (territoire && isTerritoireKey(territoire[1])) return `territoire-${territoire[1]}`

  return null
}

/** Article sous un espace : /espaces/:espace/:slug */
export function articleFromPath(
  pathname: string,
): { espace: EspaceKey; slug: string } | null {
  const match = pathname.match(/^\/espaces\/([^/]+)\/([^/]+)$/)
  if (!match || !isEspaceKey(match[1])) return null
  return { espace: match[1], slug: match[2] }
}
