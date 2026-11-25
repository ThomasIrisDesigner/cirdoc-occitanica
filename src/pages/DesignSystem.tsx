import * as React from 'react'
import { Link } from 'react-router-dom'

import { SearchField } from '@/components/features/SearchPanel'
import { PROJECT_DISPLAY_NAME } from '@/config/project'
import { typography, typeScale } from '@/styles/typography'

type ColorGroup = 'Fonds' | 'Textes' | 'Actions' | 'Repères' | 'Chrome prototype'

type ColorVar = {
  name: string
  value: string
  hex: string | null
  category: ColorGroup
}

const COLOR_GROUPS: ColorGroup[] = [
  'Fonds',
  'Textes',
  'Actions',
  'Repères',
  'Chrome prototype',
]

const COLOR_GROUP: Record<string, ColorGroup> = {
  '--color-background': 'Fonds',
  '--color-background-warm': 'Fonds',
  '--color-surface': 'Fonds',
  '--color-surface-subtle': 'Fonds',
  '--color-surface-emphasis': 'Fonds',
  '--color-footer': 'Fonds',
  '--color-collections-deep': 'Fonds',
  '--color-collections': 'Fonds',
  '--color-text': 'Textes',
  '--color-text-secondary': 'Textes',
  '--color-text-inverse': 'Textes',
  '--color-text-brand': 'Textes',
  '--color-action': 'Actions',
  '--color-action-hover': 'Actions',
  '--color-action-pressed': 'Actions',
  '--color-action-content': 'Actions',
  '--color-action-secondary-bg': 'Actions',
  '--color-action-secondary': 'Actions',
  '--color-selection': 'Actions',
  '--color-selection-content': 'Actions',
  '--color-focus': 'Actions',
  '--color-icon': 'Repères',
  '--color-border': 'Repères',
  '--color-border-on-dark': 'Repères',
  '--color-border-strong': 'Repères',
  '--color-accent-sand': 'Repères',
  '--color-accent-clay': 'Repères',
  '--color-placeholder': 'Repères',
  '--color-placeholder-soft': 'Repères',
  '--color-media': 'Repères',
  '--color-pagination': 'Repères',
  '--color-primary': 'Chrome prototype',
  '--color-secondary': 'Chrome prototype',
  '--color-muted': 'Chrome prototype',
  '--color-card-border': 'Chrome prototype',
  '--color-danger': 'Chrome prototype',
  '--color-success': 'Chrome prototype',
  '--color-warning': 'Chrome prototype',
}

function rgbTripletToHex(value: string) {
  const parts = value
    .trim()
    .replaceAll(',', ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((n) => Number(n))

  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null

  const [r, g, b] = parts.map((n) => Math.max(0, Math.min(255, Math.round(n))))
  return (
    '#' +
    [r, g, b]
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

function getCategory(name: string): ColorGroup {
  return COLOR_GROUP[name] ?? 'Repères'
}

function readCssVariablesFromRoot(): Record<string, string> {
  const out: Record<string, string> = {}

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }

    for (const rule of Array.from(rules)) {
      if (rule.type !== CSSRule.STYLE_RULE) continue
      const styleRule = rule as CSSStyleRule
      if (styleRule.selectorText !== ':root') continue

      const style = styleRule.style
      for (let i = 0; i < style.length; i++) {
        const prop = style[i]
        if (!prop?.startsWith('--')) continue
        const raw = style.getPropertyValue(prop).trim()
        if (raw) out[prop] = raw
      }
    }
  }

  return out
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-text">
          {title}
        </h2>
      </div>
      <div className="mt-3 border-t border-border" />
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function DesignSystem() {
  const [colors, setColors] = React.useState<ColorVar[]>([])
  const [tokens, setTokens] = React.useState<Record<string, string>>({})
  const [query, setQuery] = React.useState('boha')

  React.useEffect(() => {
    const vars = readCssVariablesFromRoot()
    setTokens(vars)
    const list = Object.entries(vars)
      .filter(([k]) => k.startsWith('--color-'))
      .map(([name, value]) => ({
        name,
        value,
        hex: rgbTripletToHex(value),
        category: getCategory(name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    setColors(list)
  }, [])

  const colorGroups = React.useMemo(() => {
    const groups: Record<ColorGroup, ColorVar[]> = {
      Fonds: [],
      Textes: [],
      Actions: [],
      Repères: [],
      'Chrome prototype': [],
    }
    for (const c of colors) groups[c.category].push(c)
    return groups
  }, [colors])

  const spaceTokens = Object.entries(tokens)
    .filter(([name]) => name.startsWith('--space-') || name.startsWith('--gutter-') || name === '--size-touch')
    .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))

  const radiusTokens = Object.entries(tokens)
    .filter(([name]) => name.startsWith('--radius-'))
    .sort(([a], [b]) => a.localeCompare(b))

  const measureTokens = Object.entries(tokens)
    .filter(([name]) => name.startsWith('--size-') && name !== '--size-touch')
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="min-h-dvh bg-background text-text">
      <header className="fixed inset-x-0 top-8 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <h1 className="text-sm font-semibold text-text">
            Design System — {PROJECT_DISPLAY_NAME}
          </h1>
          <Link to="/" className="text-sm text-text/70 hover:text-text">
            Retour au prototype
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
        <nav className="mb-10 flex flex-wrap gap-3 text-sm text-text/70">
          <a className="hover:text-text" href="#couleurs">
            Couleurs
          </a>
          <a className="hover:text-text" href="#typographie">
            Typographie
          </a>
          <a className="hover:text-text" href="#rayons">
            Rayons
          </a>
          <a className="hover:text-text" href="#ombres">
            Ombres
          </a>
          <a className="hover:text-text" href="#espacement">
            Espacement
          </a>
          <a className="hover:text-text" href="#composants">
            Composants
          </a>
        </nav>

        <div className="grid gap-14">
          <Section id="couleurs" title="COULEURS">
            <div className="grid gap-10">
              {COLOR_GROUPS.map(
                (group) =>
                  colorGroups[group].length ? (
                    <div key={group} className="grid gap-4">
                      <h3 className="text-sm font-semibold text-text/80">
                        {group}
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {colorGroups[group].map((c) => (
                          <div
                            key={c.name}
                            className="rounded-xl border border-border bg-surface p-3"
                          >
                            <div
                              className="h-20 w-full rounded-md border border-border"
                              style={{
                                background: `rgb(${c.value})`,
                              }}
                              aria-label={c.name}
                            />
                            <div className="mt-2">
                              <p className="text-[11px] font-semibold text-text">
                                {c.name}
                              </p>
                              <p className="text-[11px] text-text/70">
                                {c.hex ?? c.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null
              )}
            </div>
          </Section>

          <Section id="typographie" title="TYPOGRAPHIE">
            <p className="mb-6 text-sm text-[rgb(var(--color-text-secondary))]">
              Bricolage Grotesque pour l’interface, Source Serif 4 pour la lecture.
              Les classes <code>type-*</code> lisent les variables <code>--font-size-*</code>.
              Les titres de page restent à 40 px, les titres d’article à 34 px.
            </p>
            <div className="grid gap-4">
              {typeScale.map((t) => (
                <div
                  key={t.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border pb-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[rgb(var(--color-text-secondary))]">
                      {t.label}
                    </p>
                    <p className={t.className}>{t.sample}</p>
                  </div>
                  <p className="shrink-0 text-xs text-[rgb(var(--color-text-secondary))]">
                    {t.spec}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="rayons" title="RAYONS">
            <div className="flex flex-wrap gap-6">
              {radiusTokens.map(([name, value]) => (
                <div key={name} className="grid gap-2">
                  <div
                    className="h-16 w-28 border border-[rgb(var(--color-border-strong))] bg-[rgb(var(--color-accent-sand))]"
                    style={{ borderRadius: value }}
                  />
                  <p className="text-xs font-semibold text-text">{name}</p>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))]">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[rgb(var(--color-text-secondary))]">
              Les boutons d’action et les photos sont à angle droit. Le rayon de carte est défini et n’est pas utilisé sur les écrans habillés. Les pastilles sociales sont des cercles via <code>--radius-pill</code>.
            </p>
          </Section>

          <Section id="ombres" title="OMBRES">
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">
              Aucune ombre. La profondeur vient des aplats : sable, terracotta, noir des collections.
            </p>
          </Section>

          <Section id="espacement" title="ESPACEMENT">
            <p className="mb-6 text-sm text-[rgb(var(--color-text-secondary))]">
              Le bloc sable est le padding réel de la variable. <code>--gutter-page</code> (16 px) est la marge de la home, des espaces et des collections. <code>--gutter-prose</code> (24 px) est la marge de l’article, du menu et de la recherche. <code>--size-touch</code> (44 px) est la cible tactile, pas une marge.
            </p>
            <div className="grid gap-4">
              {spaceTokens.map(([name, value]) => (
                <div key={name} className="grid gap-2">
                  <p className="text-xs font-semibold text-text">
                    {name} · {value}
                  </p>
                  <div className="bg-[rgb(var(--color-accent-sand))]" style={{ padding: value }}>
                    <div className="bg-surface py-2 text-xs text-[rgb(var(--color-text-secondary))]">contenu</div>
                  </div>
                </div>
              ))}
            </div>
            {measureTokens.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-sm font-semibold text-text/80">Mesures de composants</h3>
                <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
                  Valeurs de maquette conservées au pixel. Ce ne sont pas des pas de la grille.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {measureTokens.map(([name, value]) => (
                    <li key={name} className="text-xs text-text">
                      <span className="font-semibold">{name}</span>
                      <span className="text-[rgb(var(--color-text-secondary))]"> · {value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Section>

          <Section id="composants" title="COMPOSANTS">
            <p className="mb-6 text-sm text-[rgb(var(--color-text-secondary))]">
              Composants du site. Survolez-les pour voir l’état hover. Le focus clavier utilise <code>.focus-ring</code>. Il n’y a pas d’état disabled ni d’erreur de formulaire dans la direction artistique.
            </p>
            <div className="grid gap-10">
              <div className="grid gap-3">
                <h3 className="text-sm font-semibold">Bouton d’action</h3>
                <button type="button" className={`${typography.uiAction} hit-action inline-flex h-11 items-center bg-action px-4 text-[rgb(var(--color-action-content))] focus-ring`}>
                  Découvrir
                </button>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                  Repos <code>--color-action</code> · survol et pression <code>--color-action-hover</code> / <code>--color-action-pressed</code> · texte <code>--color-action-content</code> · hauteur <code>--size-touch</code> · rayon 0
                </p>
              </div>

              <div className="grid gap-3">
                <h3 className="text-sm font-semibold">Pastilles</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" className={`${typography.uiLabel} chip rounded-pill bg-[rgb(var(--color-accent-sand))] px-4 py-2 focus-ring`}>
                    Instruments
                  </button>
                  <button type="button" aria-pressed="true" className={`${typography.uiLabel} chip rounded-pill bg-action px-3 py-2 text-[rgb(var(--color-action-content))] focus-ring`}>
                    Tout
                  </button>
                  <button type="button" className={`${typography.uiCaption} chip chip-line inline-flex items-center rounded-pill border border-[rgb(var(--color-border))] px-3 py-2 focus-ring`}>
                    Tag
                  </button>
                </div>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                  Repos sable · active terracotta · contour pour un tag d’article. Au survol, le fond s’approfondit. La pastille active passe sur <code>--color-action-hover</code>.
                </p>
              </div>

              <div className="grid gap-3">
                <h3 className="text-sm font-semibold">Lien éditorial</h3>
                <a href="#composants" className="hit inline-flex focus-ring">
                  <span className={`${typography.cardTitleCompact} hit-title`}>Les rondeaux gascons</span>
                </a>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                  Le souligné est déjà là, invisible. Au survol il prend la couleur du titre en <code>--motion-hover</code>. L’image ne bouge pas.
                </p>
              </div>

              <div className="grid max-w-md gap-3">
                <h3 className="text-sm font-semibold">Champ de recherche</h3>
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                  }}
                >
                  <SearchField
                    id="design-system-search"
                    labelledBy="design-system-search-label"
                    placeholder="Que recherchez-vous ?"
                    value={query}
                    onChange={setQuery}
                    submitLabel="Lancer la recherche"
                  />
                </form>
                <p id="design-system-search-label" className="sr-only">
                  Recherche
                </p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                  Hauteur 48 px, rayon <code>--radius-pill</code>, texte <code>.type-field</code>. Le focus colore le contour en <code>--color-focus</code>. Une recherche sans résultat affiche « Aucun article », pas un état d’erreur.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

