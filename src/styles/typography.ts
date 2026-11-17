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
  editorialTag:
    'font-ui text-xs font-semibold uppercase tracking-[0.08em] text-[rgb(var(--occ-dark))]',
  editorialStack: 'flex flex-col gap-6',

  /**
   * DA mobile. L'interligne 1.2 des titres 40 et 34 px fige l'interligne auto de Figma
   * (le titre Boha tient dans 123 px sur 3 lignes).
   * `editorialSecondary` porte le rôle prévu sous le nom editorialMeta :
   * cette clé est encore le style meta de l'article wireframe.
   */
  display: 'font-ui text-[40px] font-extrabold leading-[1.2]',
  title: 'font-ui text-[40px] font-bold leading-[1.2]',
  articleTitle: 'font-ui text-[34px] font-bold leading-[1.2]',
  heading: 'font-ui text-[20px] font-bold leading-6',
  cardTitle: 'font-ui text-[18px] font-bold leading-7',
  cardTitleCompact: 'font-ui text-base font-semibold leading-6',
  tileTitle: 'font-ui text-[22px] font-bold leading-none tracking-[1px]',
  reading: 'font-editorial text-[18px] font-normal leading-[30px]',
  editorialIntro: 'font-editorial text-[20px] font-semibold leading-[30px]',
  pullQuote: 'font-editorial text-[30px] font-semibold leading-[34px] tracking-[-0.01em]',
  editorialQuoteMark: 'font-editorial text-[96px] font-bold leading-[72px]',
  editorialLead: 'font-editorial text-sm font-normal leading-[22px]',
  editorialSecondary: 'font-editorial text-[13px] font-normal leading-5',
  uiAction: 'font-ui text-[13px] font-bold uppercase leading-4 tracking-[1px]',
  uiLabel: 'font-ui text-xs font-semibold leading-[18px]',
  uiCategory: 'font-ui text-[11px] font-semibold uppercase leading-4 tracking-[1px]',
  uiCaption: 'font-ui text-xs font-normal leading-4',
  uiCredit: 'font-ui text-[10px] font-normal leading-4',
  uiLangActive: 'font-ui text-xs font-bold leading-[18px]',
  uiLangInactive: 'font-ui text-xs font-medium leading-[18px]',
  uiActionSecondary: 'font-ui text-base font-bold leading-[18px]',
  footerKicker: 'font-ui text-xs font-bold uppercase leading-[18px] tracking-[1.5px]',
  footerTitle: 'font-ui text-sm font-semibold leading-5',
  footerLink: 'font-ui text-[13px] font-normal leading-5',
  footerLinkQuiet: 'font-ui text-xs font-normal leading-5 underline',
  footerCredit: 'font-ui text-xs font-normal leading-5',
} as const

export const typeScale = [
  { label: 'display', className: typography.display, sizePx: 40, weight: 800, spec: 'Bricolage Grotesque ExtraBold · 40 / 1.2', sample: 'À la Une' },
  { label: 'title', className: typography.title, sizePx: 40, weight: 700, spec: 'Bricolage Grotesque Bold · 40 / 1.2', sample: 'Cultura viva !' },
  { label: 'articleTitle', className: typography.articleTitle, sizePx: 34, weight: 700, spec: 'Bricolage Grotesque Bold · 34 / 1.2', sample: 'Boha, la cornemuse des Landes de Gascogne' },
  { label: 'heading', className: typography.heading, sizePx: 20, weight: 700, spec: 'Bricolage Grotesque Bold · 20 / 24', sample: 'Fêtes et célébrations' },
  { label: 'cardTitle', className: typography.cardTitle, sizePx: 18, weight: 700, spec: 'Bricolage Grotesque Bold · 18 / 28', sample: 'Célébrer les cultures vivantes' },
  { label: 'cardTitleCompact', className: typography.cardTitleCompact, sizePx: 16, weight: 600, spec: 'Bricolage Grotesque SemiBold · 16 / 24', sample: 'Les rondeaux gascons' },
  { label: 'tileTitle', className: typography.tileTitle, sizePx: 22, weight: 700, spec: 'Bricolage Grotesque Bold · 22 / 22 · approche 1 px', sample: 'Culture vivante' },
  { label: 'reading', className: typography.reading, sizePx: 18, weight: 400, spec: 'Source Serif 4 Regular · 18 / 30', sample: 'De toutes les cornemuses du domaine français, elle est la seule de type « clarinette ».' },
  { label: 'editorialIntro', className: typography.editorialIntro, sizePx: 20, weight: 600, spec: 'Source Serif 4 SemiBold · 20 / 30', sample: 'La cornemuse connue aujourd’hui sous le nom de boha.' },
  { label: 'pullQuote', className: typography.pullQuote, sizePx: 30, weight: 600, spec: 'Source Serif 4 SemiBold · 30 / 34 · approche −1 %', sample: 'La boha s’en distingue par son type organologique.' },
  { label: 'editorialQuoteMark', className: typography.editorialQuoteMark, sizePx: 96, weight: 700, spec: 'Source Serif 4 Bold · 96 / 72', sample: '“' },
  { label: 'editorialLead', className: typography.editorialLead, sizePx: 14, weight: 400, spec: 'Source Serif 4 Regular · 14 / 22', sample: 'Des cultures et des histoires à découvrir.' },
  { label: 'editorialSecondary', className: typography.editorialSecondary, sizePx: 13, weight: 400, spec: 'Source Serif 4 Regular · 13 / 20', sample: 'Une sélection issue des fonds patrimoniaux.' },
  { label: 'uiAction', className: typography.uiAction, sizePx: 13, weight: 700, spec: 'Bricolage Grotesque Bold · 13 / 16 · approche 1 px · capitales', sample: 'Découvrir' },
  { label: 'uiLabel', className: typography.uiLabel, sizePx: 12, weight: 600, spec: 'Bricolage Grotesque SemiBold · 12 / 18', sample: 'Instruments' },
  { label: 'uiCategory', className: typography.uiCategory, sizePx: 11, weight: 600, spec: 'Bricolage Grotesque SemiBold · 11 / 16 · approche 1 px · capitales', sample: 'Culture vivante' },
  { label: 'uiCaption', className: typography.uiCaption, sizePx: 12, weight: 400, spec: 'Bricolage Grotesque Regular · 12 / 16', sample: 'Joueur de boha · Occitanica' },
  { label: 'uiCredit', className: typography.uiCredit, sizePx: 10, weight: 400, spec: 'Bricolage Grotesque Regular · 10 px', sample: 'CIRDOC — Institut occitan de cultura' },
  { label: 'uiLangActive', className: typography.uiLangActive, sizePx: 12, weight: 700, spec: 'Bricolage Grotesque Bold · 12 / 18', sample: 'FR' },
  { label: 'uiLangInactive', className: typography.uiLangInactive, sizePx: 12, weight: 500, spec: 'Bricolage Grotesque Medium · 12 / 18', sample: 'OC' },
  { label: 'footerKicker', className: typography.footerKicker, sizePx: 12, weight: 700, spec: 'Bricolage Grotesque Bold · 12 / 18 · approche 1,5 px · capitales', sample: 'Nous contacter' },
  { label: 'footerTitle', className: typography.footerTitle, sizePx: 14, weight: 600, spec: 'Bricolage Grotesque SemiBold · 14 / 20', sample: 'Médiathèque occitane' },
  { label: 'footerLink', className: typography.footerLink, sizePx: 13, weight: 400, spec: 'Bricolage Grotesque Regular · 13 / 20', sample: 'Mentions légales et crédits' },
  { label: 'footerLinkQuiet', className: typography.footerLinkQuiet, sizePx: 12, weight: 400, spec: 'Bricolage Grotesque Regular · 12 / 20', sample: 'Contacter l’équipe' },
  { label: 'footerCredit', className: typography.footerCredit, sizePx: 12, weight: 400, spec: 'Bricolage Grotesque Regular · 12 / 20', sample: '© CIRDOC · Institut occitan de cultura' },
] as const

