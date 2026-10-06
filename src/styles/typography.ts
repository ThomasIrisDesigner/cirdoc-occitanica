export const typography = {
  projectKicker: 'text-xs tracking-widest text-text/70 uppercase',
  pageTitle: 'text-2xl font-semibold tracking-tight text-text',
  pageSubtitle: 'text-sm text-text/70',
  footer: 'text-xs text-text/50',

  /**
   * Gabarit article — échelle Yroise.
   * H1 32px semibold · chapô 19px · intertitre H2 24px bold · corps serif 19px.
   */
  editorialKicker:
    'font-ui text-xs font-bold uppercase tracking-[3px] leading-[1.4]',
  editorialTitle:
    'font-ui text-[2rem] font-semibold leading-[1.2] tracking-[0.1px] text-[rgb(var(--occ-dark))]',
  editorialChapo:
    'font-ui text-[1.1875rem] font-normal leading-[1.4] tracking-[0.1px] text-[rgb(var(--occ-dark))]',
  editorialByline:
    'font-ui text-xs font-normal uppercase tracking-[2px] leading-[1.5] text-[rgb(var(--occ-dark))]',
  editorialMeta:
    'font-ui text-xs font-normal uppercase tracking-[2px] leading-[1.5] text-[rgb(var(--occ-gray))]',
  editorialHeading:
    'font-ui text-2xl font-bold leading-[1.5] tracking-[0.5px] text-[rgb(var(--occ-dark))]',
  editorialBody:
    'font-editorial text-[1.1875rem] font-normal leading-[1.6] text-[rgb(var(--occ-dark))]',
  editorialQuote:
    'font-editorial text-xl font-semibold italic leading-[1.6] text-[rgb(var(--occ-dark))]',
  editorialCaption:
    'font-ui text-sm font-normal leading-[1.5] tracking-[0.1px] text-[rgb(var(--occ-gray))]',
  editorialCredit:
    'font-ui text-xs font-normal uppercase tracking-[2px] leading-[1.5] text-[rgb(var(--occ-dark))]',
  editorialLabel:
    'font-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(var(--occ-gray))]',
  editorialStack: 'flex flex-col gap-6',
} as const

export const typeScale = [
  { label: 'Display', className: 'text-4xl font-semibold tracking-tight text-text', sizePx: 36, weight: 600 },
  { label: 'H1', className: 'text-2xl font-semibold tracking-tight text-text', sizePx: 24, weight: 600 },
  { label: 'H2', className: 'text-xl font-semibold tracking-tight text-text', sizePx: 20, weight: 600 },
  { label: 'Body', className: 'text-sm text-text', sizePx: 14, weight: 400 },
  { label: 'Small', className: 'text-xs text-text/70', sizePx: 12, weight: 400 },
] as const

