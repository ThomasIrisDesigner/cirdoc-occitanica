export const typography = {
  projectKicker: 'text-xs tracking-widest text-text/70 uppercase',
  pageTitle: 'text-2xl font-semibold tracking-tight text-text',
  pageSubtitle: 'text-sm text-text/70',
  footer: 'text-xs text-text/50',
} as const

export const typeScale = [
  { label: 'Display', className: 'text-4xl font-semibold tracking-tight text-text', sizePx: 36, weight: 600 },
  { label: 'H1', className: 'text-2xl font-semibold tracking-tight text-text', sizePx: 24, weight: 600 },
  { label: 'H2', className: 'text-xl font-semibold tracking-tight text-text', sizePx: 20, weight: 600 },
  { label: 'Body', className: 'text-sm text-text', sizePx: 14, weight: 400 },
  { label: 'Small', className: 'text-xs text-text/70', sizePx: 12, weight: 400 },
] as const

