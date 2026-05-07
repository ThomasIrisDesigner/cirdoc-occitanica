import * as React from 'react'
import { Link } from 'react-router-dom'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PROJECT_DISPLAY_NAME } from '@/config/project'
import { typeScale } from '@/styles/typography'

type ColorVar = {
  name: string
  value: string
  hex: string | null
  category: 'Principaux' | 'Neutres' | 'États' | 'Autres'
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

function getCategory(name: string): ColorVar['category'] {
  if (
    name === '--color-primary' ||
    name === '--color-secondary' ||
    name === '--color-background'
  )
    return 'Principaux'
  if (
    name === '--color-muted' ||
    name === '--color-surface' ||
    name === '--color-border' ||
    name === '--color-text' ||
    name === '--color-card-border'
  )
    return 'Neutres'
  if (
    name === '--color-success' ||
    name === '--color-danger' ||
    name === '--color-warning'
  )
    return 'États'
  return 'Autres'
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
    <section id={id} className="scroll-mt-20">
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

  React.useEffect(() => {
    const vars = readCssVariablesFromRoot()
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
    const groups: Record<string, ColorVar[]> = {
      Principaux: [],
      Neutres: [],
      États: [],
      Autres: [],
    }
    for (const c of colors) groups[c.category].push(c)
    return groups
  }, [colors])

  const spacing = [
    { px: 4, tw: 'p-1' },
    { px: 8, tw: 'p-2' },
    { px: 12, tw: 'p-3' },
    { px: 16, tw: 'p-4' },
    { px: 24, tw: 'p-6' },
    { px: 32, tw: 'p-8' },
    { px: 48, tw: 'p-12' },
    { px: 64, tw: 'p-16' },
  ] as const

  return (
    <div className="min-h-dvh bg-background text-text">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <h1 className="text-sm font-semibold text-text">
            Design System — {PROJECT_DISPLAY_NAME}
          </h1>
          <Link to="/prototype" className="text-sm text-text/70 hover:text-text">
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
              {(['Principaux', 'Neutres', 'États', 'Autres'] as const).map(
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
            <div className="grid gap-4">
              {typeScale.map((t) => (
                <div
                  key={t.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border pb-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text/70">
                      {t.label}
                    </p>
                    <p className={t.className}>Aa — Exemple de texte</p>
                  </div>
                  <p className="shrink-0 text-xs text-text/70">
                    {t.sizePx}px · {t.weight}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="espacement" title="ESPACEMENT">
            <div className="grid gap-3">
              {spacing.map((s) => (
                <div
                  key={s.px}
                  className="grid grid-cols-[64px_1fr_90px] items-center gap-4"
                >
                  <p className="text-xs font-semibold text-text">{s.px}px</p>
                  <div className="h-3 rounded bg-primary/20">
                    <div
                      className="h-3 rounded bg-primary"
                      style={{ width: `${s.px}px` }}
                    />
                  </div>
                  <p className="text-xs text-text/70">{s.tw}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="composants" title="COMPOSANTS">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Boutons</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Inputs</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <p className="text-xs font-semibold text-text/70">
                        Normal
                      </p>
                      <Input placeholder="Placeholder" />
                    </div>
                    <div className="grid gap-2">
                      <p className="text-xs font-semibold text-text/70">
                        Focus
                      </p>
                      <Input autoFocus placeholder="AutoFocus" />
                    </div>
                    <div className="grid gap-2">
                      <p className="text-xs font-semibold text-text/70">
                        Erreur
                      </p>
                      <Input
                        placeholder="Erreur"
                        className="border-danger focus-visible:ring-danger/30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <p className="text-xs font-semibold text-text/70">
                        Disabled
                      </p>
                      <Input placeholder="Disabled" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Badges</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Cards</h3>
                </CardHeader>
                <CardContent>
                  <Card className="max-w-md">
                    <CardHeader>
                      <h4 className="text-sm font-semibold">Titre de card</h4>
                      <p className="text-sm text-text/70">
                        Sous-titre discret
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text/70">
                        Exemple de contenu dans une card.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Alerts</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Alert variant="info">
                      <AlertTitle>Info</AlertTitle>
                      <AlertDescription>
                        Message d'information.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="success">
                      <AlertTitle>Succès</AlertTitle>
                      <AlertDescription>
                        Action réalisée avec succès.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="error">
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        Une erreur est survenue.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

